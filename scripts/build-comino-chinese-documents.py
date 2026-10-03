#!/usr/bin/env python3
"""Build attributed Traditional Chinese editions, retaining the original artwork.

Requires PyMuPDF and Noto Sans CJK TC (COMINO_CJK_FONT can override the font).
Every source text block must be explicitly translated, preserved, or replaced
as part of a table/group. The source SHA-256 locks the reviewed OEM edition.
"""

import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import tempfile

import fitz
from fontTools import subset

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public/vendor/comino/documents"
OUTPUT = ROOT / "output/pdf"
DATA = json.loads((ROOT / "docs/comino-document-translations-zh.json").read_text())
FONT = os.environ.get("COMINO_CJK_FONT", "/Library/Fonts/NotoSansCJKtc-Regular.otf")
GREEN = (0, 0.746, 0.369)
REPORT = []


def rgb(value):
    return tuple(((value >> shift) & 255) / 255 for shift in (16, 8, 0))


def write(page, rect, text, size, color, tag, rotate=0):
    """Commit only a fitting layout; fail instead of silently dropping text."""
    rect = fitz.Rect(rect)
    requested = size
    while size >= min(requested, 5.5):
        shape = page.new_shape()
        remainder = shape.insert_textbox(
            rect, text, fontname="TC", fontsize=size, color=color,
            rotate=rotate, lineheight=1.22,
        )
        if remainder >= 0:
            shape.commit()
            REPORT.append({"tag": tag, "font": round(size, 2), "requested": requested,
                           "rect": list(rect), "remaining": round(remainder, 2), "text": text})
            return
        size = round(size - 0.2, 3)
    raise ValueError(f"Text does not fit: {tag}, {rect}, {text!r}")


def build(key):
    spec = DATA[key]
    source = ASSETS / spec["source"]
    assert hashlib.sha256(source.read_bytes()).hexdigest() == spec["sha256"]
    doc = fitz.open(source)
    assert len(doc) == len(spec["pages"])
    coverage = []
    preserved_text = {}
    for number, page in enumerate(doc, 1):
        cfg = spec["pages"][str(number)]
        raw = page.get_text("dict")["blocks"]
        blocks = {i: b for i, b in enumerate(raw) if b["type"] == 0}
        headers = {i for i, b in blocks.items() if key == "server" and 2 <= number <= 13
                   and b["bbox"][1] < 50}
        replaced = {int(i) for i in cfg.get("replace", {})}
        pairs = {int(i) for i in cfg.get("pairs", {})}
        grouped = {i for g in cfg.get("groups", []) for i in g["ids"]}
        preserved = set(cfg.get("preserve", []))
        empty = {i for i, b in blocks.items() if not "".join(
            s["text"] for line in b["lines"] for s in line["spans"]).strip()}
        missing = set(blocks) - headers - replaced - pairs - grouped - preserved - empty
        assert not missing, f"Untranslated blocks: {key} page {number}: {missing}"
        assert not preserved & (replaced | grouped | pairs | headers)
        coverage.append({"page": number, "sourceTextBlocks": len(blocks),
                         "translatedBlocks": len(headers | replaced | grouped | pairs),
                         "preservedBlocks": len(preserved), "unhandled": []})
        links = page.get_links()
        preserved_text[number] = ["".join(s["text"] for line in blocks[i]["lines"]
                                         for s in line["spans"]) for i in preserved]
        for i in headers | replaced | pairs | grouped:
            # Text bounding boxes can overlap the next line's descenders.
            # Redact the centre of each span, avoiding neighbouring model IDs.
            for line in blocks[i]["lines"]:
                for span in line["spans"]:
                    rect = fitz.Rect(span["bbox"])
                    if abs(line["dir"][0]) > 0.5:
                        inset = rect.height * 0.3
                        rect.y0 += inset
                        rect.y1 -= inset
                    else:
                        inset = rect.width * 0.3
                        rect.x0 += inset
                        rect.x1 -= inset
                    page.add_redact_annot(rect, fill=False, cross_out=False)
        page.apply_redactions(images=0, graphics=0, text=0)
        page.insert_font(fontname="TC", fontfile=FONT)

        def put(rect, text, font, color, name, rotate=0):
            write(page, rect, text, font, color, f"{key}/{number}/{name}", rotate)

        if headers:
            put([25.5, 10, 425, 46], spec["headers"][number - 1], 20, (1, 1, 1), "header")
            put([433, 17, 780, 37], "GRANDO 伺服器／可上架工作站規格書", 9, (1, 1, 1), "running-title")
            put([793, 17, 824, 37], str(number), 9, (1, 1, 1), "page-number")
        for i, text in cfg.get("replace", {}).items():
            b = blocks[int(i)]
            span = b["lines"][0]["spans"][0]
            override = cfg.get("overrides", {}).get(i, {})
            rect = list(b["bbox"])
            rect[2] += 1
            rect[3] += 2
            put(override.get("rect", rect), text, override.get("font", span["size"]),
                override.get("color", rgb(span["color"])), i, override.get("rotate", 0))
        for group in cfg.get("groups", []):
            span = blocks[group["ids"][0]]["lines"][0]["spans"][0]
            for j, run in enumerate(group.get("runs", [group])):
                put(run["rect"], run["text"], run.get("font", span["size"]),
                    run.get("color", rgb(span["color"])), f"group-{group['ids']}-{j}")
        for i, values in cfg.get("pairs", {}).items():
            x0, y0, _, y1 = blocks[int(i)]["bbox"]
            left = x0 < 400
            label_rect = [25.5 if left else 433.7, y0, 143 if left else 545, y1 + 3]
            value_rect = [153 if left else 555.4, y0, 407 if left else 816, y1 + 3]
            put(label_rect, values[0], 8.4, GREEN, f"pair-{i}-label")
            put(value_rect, values[1], 8.4, (0.137, 0.122, 0.125), f"pair-{i}-value")

        # Some diagram labels are outlines embedded in the artwork, not text.
        # Replace only their reviewed white-background label areas.
        for j, label in enumerate(cfg.get("artworkLabels", [])):
            page.draw_rect(label["rect"], color=None, fill=(1, 1, 1), overlay=True)
            put(label["rect"], label["text"], label["font"], (0.137, 0.122, 0.125), f"artwork-label-{j}")

        dark = key == "server" and number in (3, 4, 13, 14)
        for j, note in enumerate(cfg.get("notes", [])):
            put(note["rect"], note["text"], note["font"], (0.9, 0.9, 0.9) if dark else (0.32, 0.32, 0.32), f"note-{j}")
        footer = DATA["attribution"] + (f"  {number}/2" if key == "guide" else "")
        put([115 if number == 1 and key == "server" else 25.5, 584, 816, 594.5],
            footer, 5.5, (0.85, 0.85, 0.85) if dark else (0.4, 0.4, 0.4), "attribution")
        # Redactions may remove intersecting URI annotations. Retain their targets.
        remaining_uris = {(l.get("uri"), tuple(l["from"])) for l in page.get_links()}
        for link in links:
            if link.get("kind") == fitz.LINK_URI and (link.get("uri"), tuple(link["from"])) not in remaining_uris:
                page.insert_link({"kind": fitz.LINK_URI, "from": link["from"], "uri": link["uri"]})
    doc.set_metadata({"title": spec["title"], "author": "EudTech 優達盟資訊科技（繁體中文翻譯）",
                      "subject": DATA["attribution"], "keywords": "Comino, GRANDO, 繁體中文, 翻譯",
                      "creator": "EudTech / reviewed Comino original / " + DATA["edition"]})
    if key == "server":
        doc.set_toc([[1, title or ("封面" if i == 1 else "原廠聯絡資訊"), i]
                     for i, title in enumerate(spec["headers"], 1)])
    path = OUTPUT / spec["output"]
    doc.save(path, garbage=4, deflate=True)
    doc.close()
    check = fitz.open(path)
    assert len(check) == len(spec["pages"])
    assert all("EudTech" in p.get_text() for p in check)
    assert all("\ufffd" not in p.get_text() for p in check)
    for number, page in enumerate(check, 1):
        normalize = lambda text: re.sub(r"\s", "", text)
        actual = normalize(page.get_text())
        expected = preserved_text[number] + [r["text"] for r in REPORT
                                              if r["tag"].startswith(f"{key}/{number}/")]
        for text in expected:
            assert normalize(text) in actual, f"Missing output text: {key}/{number}: {text}"
    shutil.copyfile(path, ASSETS / spec["output"])
    return {"document": key, "file": spec["output"], "pages": len(check),
            "bytes": path.stat().st_size, "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            "coverage": coverage}


if __name__ == "__main__":
    OUTPUT.mkdir(parents=True, exist_ok=True)
    # Pre-subset the large CJK font while retaining every authored glyph.
    # Leave original manufacturer fonts untouched.
    with tempfile.TemporaryDirectory(prefix="comino-cjk-") as font_dir:
        options = subset.Options()
        # CID-keyed CFF fonts need their original glyph IDs for PDF rendering.
        options.retain_gids = True
        font = subset.load_font(FONT, options)
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(text=json.dumps(DATA, ensure_ascii=False) + "GRANDO 伺服器／可上架工作站規格書0123456789")
        subsetter.subset(font)
        FONT = str(Path(font_dir) / "TC.otf")
        subset.save_font(font, FONT, options)
        results = [build(key) for key in ("server", "guide")]
    (OUTPUT / "translation-verification.json").write_text(json.dumps({"documents": results, "layouts": REPORT}, ensure_ascii=False, indent=2))
    print(json.dumps([{k: v for k, v in r.items() if k != "coverage"} for r in results], ensure_ascii=False, indent=2))
