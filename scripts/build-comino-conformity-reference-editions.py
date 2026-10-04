#!/usr/bin/env python3
"""Build clearly labelled Traditional Chinese reference editions for Comino declarations.

These files are structured translations of key fields visible in the manufacturer's
publicly indexed text. They do not reproduce an unavailable source PDF, signature,
or page layout. The generated PDF and HTML state this boundary prominently.
"""
from html import escape
import json
from pathlib import Path

import fitz
from PIL import Image
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUT = PUBLIC / "vendor/comino/documents"
DATA = json.loads((ROOT / "src/data/cominoConformity.json").read_text())
FONT = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
SITE = "https://eudaemonia.tech"

pdfmetrics.registerFont(TTFont("EudUnicode", FONT))

GREEN = colors.HexColor("#087F50")
DARK = colors.HexColor("#16362C")
MUTED = colors.HexColor("#50685E")
LIGHT = colors.HexColor("#EDF6F1")
AMBER = colors.HexColor("#FFF4D6")
LINE = colors.HexColor("#C9DDD4")

base = getSampleStyleSheet()
styles = {
    "brand": ParagraphStyle("brand", parent=base["Normal"], fontName="EudUnicode", fontSize=9, leading=13, textColor=GREEN, spaceAfter=3 * mm),
    "title": ParagraphStyle("title", parent=base["Title"], fontName="EudUnicode", fontSize=20, leading=25, textColor=DARK, alignment=TA_LEFT, spaceAfter=1.5 * mm),
    "subtitle": ParagraphStyle("subtitle", parent=base["Normal"], fontName="EudUnicode", fontSize=8.8, leading=12.5, textColor=MUTED, spaceAfter=2.5 * mm),
    "h2": ParagraphStyle("h2", parent=base["Heading2"], fontName="EudUnicode", fontSize=11.3, leading=14.5, textColor=DARK, spaceBefore=1.8 * mm, spaceAfter=1 * mm),
    "body": ParagraphStyle("body", parent=base["BodyText"], fontName="EudUnicode", fontSize=8.2, leading=11.4, textColor=DARK, spaceAfter=1 * mm),
    "small": ParagraphStyle("small", parent=base["BodyText"], fontName="EudUnicode", fontSize=7.1, leading=9.7, textColor=MUTED),
    "label": ParagraphStyle("label", parent=base["BodyText"], fontName="EudUnicode", fontSize=8.2, leading=12, textColor=GREEN),
    "center": ParagraphStyle("center", parent=base["BodyText"], fontName="EudUnicode", fontSize=8.5, leading=12, alignment=TA_CENTER, textColor=MUTED),
}


def p(text, style="body"):
    return Paragraph(escape(str(text)).replace("\n", "<br/>"), styles[style])


def bullet_text(items):
    return "<br/>".join(f"• {escape(zh_item(str(item)))}" for item in items)


def zh_item(value):
    replacements = {
        "EMC report ": "EMC 報告 ",
        "Safety report ": "安全報告 ",
        "Safety test reports No.: blank in indexed source text": "安全測試報告編號：可檢索來源文字中此欄為空白",
        "Manufacturer states no Candidate List SVHC is used": "原廠聲明未使用 REACH 候選清單中的 SVHC",
        "Indexed source text lists nine substance limits and does not list PBDE": "可檢索來源文字列出 9 項物質限值，未列 PBDE",
        "REACH downstream-user declaration": "REACH 下游使用者聲明",
        "2015/863/EU RoHS amendment": "2015/863/EU RoHS 修正指令",
        "Lead ": "鉛 ", "Mercury ": "汞 ", "Cadmium ": "鎘 ",
        "Hexavalent chromium ": "六價鉻 ", "PBB ": "多溴聯苯（PBB） ",
        "PBDE ": "多溴二苯醚（PBDE） ", "DEHP ": "鄰苯二甲酸二（2-乙基己基）酯（DEHP） ",
        "BBP ": "鄰苯二甲酸丁苄酯（BBP） ", "DBP ": "鄰苯二甲酸二丁酯（DBP） ",
        "DIBP ": "鄰苯二甲酸二異丁酯（DIBP） ",
    }
    if value in replacements:
        return replacements[value]
    for source, translated in replacements.items():
        if value.startswith(source):
            return translated + value[len(source):]
    return value


def draw_page(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 16 * mm, 192 * mm, 16 * mm)
    canvas.setFont("EudUnicode", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 10 * mm, "EudTech 優達盟資訊科技 · Comino 原廠公開文字繁中查閱稿")
    canvas.drawRightString(192 * mm, 10 * mm, f"第 {doc.page} 頁")
    canvas.restoreState()


def build_pdf(spec):
    path = OUT / Path(spec["hrefZh"]).name
    path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(path), pagesize=A4, rightMargin=15 * mm, leftMargin=15 * mm,
                            topMargin=12 * mm, bottomMargin=19 * mm,
                            title=spec["title"]["zh"], author="EudTech 優達盟資訊科技有限公司",
                            subject="Comino 原廠公開索引文字之繁體中文關鍵欄位查閱稿")
    story = [
        p("EudTech · 採購證據查閱稿", "brand"),
        p(spec["title"]["zh"], "title"),
        p(f"原廠文件名稱：{spec['sourceTitle']}　｜　文件日期：{spec['date']}　｜　檢閱日期：{DATA['reviewedAt']}", "subtitle"),
    ]
    boundary = Table([[p("文件性質與重要界線", "label")], [p(DATA["translationBoundary"]["zh"], "small")]], colWidths=[174 * mm])
    boundary.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), AMBER), ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#D89A13")),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm), ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 1.6 * mm), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.6 * mm),
    ]))
    story += [boundary, Spacer(1, 2 * mm), p("一、已核對的關鍵欄位", "h2")]
    rows = [
        [p("聲明者", "label"), p(spec["issuer"]), p("簽署資訊", "label"), p(spec["signer"])],
        [p("主型號", "label"), p(spec["model"]), p("涵蓋子型號", "label"), p("、".join(spec["submodels"]))],
        [p("產品名稱", "label"), p("、".join(spec["products"])), p("文件日期", "label"), p(spec["date"])],
    ]
    table = Table(rows, colWidths=[23 * mm, 61 * mm, 23 * mm, 73 * mm])
    table.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.5, LINE), ("BACKGROUND", (0, 0), (0, -1), LIGHT),
        ("BACKGROUND", (2, 0), (2, -1), LIGHT), ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 2.5 * mm), ("RIGHTPADDING", (0, 0), (-1, -1), 2.5 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm),
    ]))
    story += [table, Spacer(1, 1.8 * mm), p(spec["summary"]["zh"])]
    blocks = [
        ("二、聲明所列法規／範圍", spec["directives"]),
        ("三、所列標準或物質限值", spec["standards"]),
        ("四、所列報告與聲明", spec["reports"]),
    ]
    for heading, items in blocks:
        translated = [zh_item(str(item)) for item in items]
        if spec["kind"] == "RoHS / REACH" and heading.startswith("三、"):
            pairs = [translated[i:i+2] for i in range(0, len(translated), 2)]
            rows = [[p(cell, "body") for cell in pair + ([""] if len(pair) == 1 else [])] for pair in pairs]
            body = Table(rows, colWidths=[88 * mm, 88 * mm])
            body.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), .6 * mm)]))
        else:
            body = Paragraph("<br/>".join(f"• {escape(item)}" for item in translated), styles["body"])
        story.append(KeepTogether([p(heading, "h2"), body]))
    story += [
        p("五、採購使用方式", "h2"),
        p("本查閱稿可協助確認文件名稱、型號、子型號、日期、指令／標準與引用報告。正式投標、驗收或法規判定前，須取得可驗證的原廠英文 PDF，核對簽章、完整內容、最終交付型號、BOM 與引用報告；本稿不能取代原廠聲明或主管機關判定。"),
        p("六、原廠英文文件網址", "h2"), p(spec["source"], "small"), Spacer(1, 1.5 * mm),
    ]
    fcc = Table([[p("FCC 查核提醒", "label"), p(DATA["fccBoundary"]["zh"], "small")]], colWidths=[30 * mm, 144 * mm])
    fcc.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT), ("BOX", (0, 0), (-1, -1), 0.8, GREEN),
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm), ("TOPPADDING", (0, 0), (-1, -1), 1.6 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.6 * mm),
    ]))
    story.append(fcc)
    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
    return path


def build_reader(spec, pdf_path):
    document = fitz.open(pdf_path)
    page_dir = OUT / f"{pdf_path.stem}-pages"
    page_dir.mkdir(exist_ok=True)
    rendered = []
    extracted = []
    for number, page in enumerate(document, 1):
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
        image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        image_path = page_dir / f"page-{number:02}.webp"
        image.save(image_path, "WEBP", quality=91, method=6)
        rendered.append((number, image_path, pix.width, pix.height))
        extracted.append(page.get_text(sort=True))
    canonical = SITE + spec["readerHrefZh"].removesuffix(".html")
    image_sections = "".join(
        f'<section class="page" id="page-{n}"><h2>第 {n} 頁</h2><img src="/{escape(str(path.relative_to(PUBLIC)))}" width="{width}" height="{height}" alt="{escape(spec["title"]["zh"])}，第 {n} 頁" loading="{"eager" if n == 1 else "lazy"}" decoding="async"><details><summary>本頁可搜尋文字</summary><pre>{escape(extracted[n-1])}</pre></details></section>'
        for n, path, width, height in rendered
    )
    json_ld = json.dumps({
        "@context": "https://schema.org", "@type": "DigitalDocument", "name": spec["title"]["zh"],
        "url": canonical, "inLanguage": "zh-Hant", "dateModified": DATA["reviewedAt"],
        "isBasedOn": spec["source"], "publisher": {"@id": f"{SITE}/#organization"},
        "encoding": {"@type": "MediaObject", "contentUrl": SITE + spec["hrefZh"], "encodingFormat": "application/pdf"}
    }, ensure_ascii=False).replace("<", "\\u003c")
    html = f'''<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(spec['title']['zh'])}｜繁中查閱稿｜EudTech</title><meta name="description" content="{escape(spec['summary']['zh'])}">
<meta name="robots" content="index, follow, max-image-preview:large"><meta name="source-pdf-sha256" content="unavailable-source-host-refused-connection">
<link rel="canonical" href="{canonical}"><meta property="og:title" content="{escape(spec['title']['zh'])}｜繁中查閱稿｜EudTech"><meta property="og:description" content="{escape(spec['summary']['zh'])}"><meta property="og:url" content="{canonical}"><meta property="og:type" content="article"><meta property="og:locale" content="zh_TW"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">{json_ld}</script>
<style>:root{{--bg:#f2f6f4;--panel:#fff;--ink:#15352b;--muted:#50685e;--accent:#087f50;--line:#c9ddd4}}*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--ink);font:16px/1.75 system-ui,-apple-system,"Noto Sans TC",sans-serif}}a{{color:var(--accent);text-underline-offset:4px}}header,main,footer{{max-width:1080px;margin:auto;padding:28px}}h1{{font-size:clamp(1.7rem,4vw,2.65rem);line-height:1.25}}.eyebrow{{color:var(--accent);font-weight:700;letter-spacing:.08em}}.boundary{{border:1px solid #d89a13;background:#fff4d6;padding:16px 18px;border-radius:10px}}.actions{{display:flex;gap:12px;flex-wrap:wrap;margin:22px 0}}.actions a{{border:1px solid var(--line);background:var(--panel);padding:9px 14px;border-radius:8px;text-decoration:none}}.actions .primary{{background:var(--accent);color:#fff}}.facts{{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:24px 0}}.facts div,.page{{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:18px}}dt{{font-weight:700}}dd{{margin:4px 0 0;color:var(--muted)}}.page{{margin:28px 0}}.page img{{display:block;width:100%;height:auto;border:1px solid var(--line)}}details{{margin-top:12px}}pre{{white-space:pre-wrap;overflow-wrap:anywhere;font:14px/1.6 system-ui}}footer{{color:var(--muted);border-top:1px solid var(--line)}}@media(max-width:650px){{header,main,footer{{padding:20px 14px}}.facts{{grid-template-columns:1fr}}}}</style></head>
<body><header><a href="/solutions/ai-infrastructure/#model-declarations">EudTech · 機關採購參考</a><p class="eyebrow">原廠公開索引文字 · 繁體中文關鍵欄位查閱稿</p><h1>{escape(spec['title']['zh'])}</h1><p>{escape(spec['summary']['zh'])}</p><p class="boundary"><strong>文件界線：</strong>{escape(DATA['translationBoundary']['zh'])}</p><div class="actions"><a class="primary" href="{spec['hrefZh']}" download>下載繁中查閱稿 PDF</a><a href="{escape(spec['source'])}" target="_blank" rel="noopener">原廠英文 PDF 網址</a><a href="/solutions/ai-infrastructure/#model-declarations">返回型號聲明</a></div><dl class="facts"><div><dt>主型號</dt><dd>{escape(spec['model'])}</dd></div><div><dt>子型號</dt><dd>{escape(' · '.join(spec['submodels']))}</dd></div><div><dt>文件日期</dt><dd>{escape(spec['date'])}</dd></div><div><dt>檢閱日期</dt><dd>{DATA['reviewedAt']}</dd></div></dl></header><main>{image_sections}<section class="boundary"><h2>FCC 證據邊界</h2><p>{escape(DATA['fccBoundary']['zh'])}</p></section></main><footer>EudTech 優達盟資訊科技有限公司 · 本頁不是 Comino 核發文件；可驗證英文原文優先。</footer></body></html>'''
    destination = PUBLIC / spec["readerHrefZh"].lstrip("/")
    destination.write_text(html)
    return {"id": spec["id"], "pdf": str(pdf_path.relative_to(ROOT)), "reader": str(destination.relative_to(ROOT)), "pages": len(document), "sourceSha256": None}


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    results = []
    for item in DATA["documents"]:
        results.append(build_reader(item, build_pdf(item)))
    report = ROOT / "docs/comino-conformity-reference-editions.json"
    report.write_text(json.dumps({"generatedAt": DATA["reviewedAt"], "documents": results}, ensure_ascii=False, indent=2))
    print(json.dumps(results, ensure_ascii=False, indent=2))
