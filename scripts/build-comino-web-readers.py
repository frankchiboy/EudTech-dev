#!/usr/bin/env python3
"""Create browser-readable editions from the reviewed, unchanged Chinese PDFs.

Requires PyMuPDF and Pillow. No browser PDF plug-in or remote reader is used.
Generated HTML and page images are committed for the static hosting build.
"""
import hashlib
from html import escape
import json
from pathlib import Path

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
REFERENCE = json.loads((ROOT / "src/data/cominoProcurement.json").read_text())
TRANSLATIONS = json.loads((ROOT / "docs/comino-document-translations-zh.json").read_text())

STYLE = """
:root { color-scheme: light dark; --bg:#f2f6f4; --ink:#152f27; --muted:#50685e; --panel:#fff; --line:#ccddd5; --accent:#087f50; }
* { box-sizing:border-box; } html { scroll-padding-top:100px; }
body { margin:0; background:var(--bg); color:var(--ink); font:16px/1.7 system-ui,-apple-system,"Noto Sans TC",sans-serif; }
a { color:var(--accent); text-underline-offset:4px; } a:focus-visible,button:focus-visible,summary:focus-visible { outline:3px solid #f29f05; outline-offset:4px; }
header,main,footer { max-width:1480px; margin:auto; padding:24px; }
header { padding-top:36px; } .brand { font-weight:750; text-decoration:none; letter-spacing:.04em; } .eyebrow { color:var(--accent); font-size:.85rem; margin:24px 0 8px; }
h1 { font-size:clamp(1.7rem,3vw,2.6rem); line-height:1.3; margin:0 0 16px; } .note { color:var(--muted); max-width:80ch; }
.actions { display:flex; gap:12px; flex-wrap:wrap; margin:20px 0; } .actions a,button { border:1px solid var(--line); border-radius:8px; padding:9px 14px; background:var(--panel); color:var(--ink); font:inherit; text-decoration:none; cursor:pointer; }
.actions a.primary { background:var(--accent); border-color:var(--accent); color:#fff; }
.toolbar { position:sticky; top:0; z-index:1; background:var(--panel); border-block:1px solid var(--line); }
.toolbar-inner { max-width:1480px; margin:auto; padding:10px 24px; display:flex; gap:12px; align-items:center; }
.pages { display:flex; gap:6px; overflow-x:auto; padding:5px 2px; flex:1; } .pages a { flex:0 0 auto; min-width:36px; padding:3px 8px; border:1px solid var(--line); text-align:center; border-radius:6px; text-decoration:none; }
#zoom { white-space:nowrap; } .page { scroll-margin-top:100px; margin:0 0 36px; }
.page-heading { display:flex; flex-wrap:wrap; align-items:baseline; justify-content:space-between; gap:8px; margin-bottom:12px; }
h2 { font-size:1.2rem; margin:0; } .page-heading a { font-size:.9rem; }
.page-view { overflow:auto; border:1px solid var(--line); border-radius:8px; background:#fff; }
.page-image { display:block; width:100%; height:auto; } body.zoomed .page-image { width:1684px; max-width:none; }
details { margin-top:10px; background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:12px 16px; } summary { cursor:pointer; color:var(--muted); }
pre { white-space:pre-wrap; overflow-wrap:anywhere; font:inherit; font-size:.95rem; } footer { color:var(--muted); border-top:1px solid var(--line); }
@media(max-width:600px) { header,main,footer { padding:20px 14px; } .toolbar-inner { padding:8px 14px; } #zoom { font-size:.85rem; padding:8px; } }
@media(prefers-color-scheme:dark) { :root { --bg:#101915; --ink:#e8f3ed; --muted:#b8ccc0; --panel:#19291f; --line:#354b3d; --accent:#54d997; } .actions a.primary { color:#092116; } }
"""


def build(spec, translation):
    pdf_path = PUBLIC / spec["hrefZh"].lstrip("/")
    pdf = fitz.open(pdf_path)
    assert len(pdf) == len(translation["pages"])
    digest = hashlib.sha256(pdf_path.read_bytes()).hexdigest()
    stem = pdf_path.stem
    image_dir = pdf_path.parent / (stem + "-pages")
    image_dir.mkdir(exist_ok=True)
    title = spec["title"]["zh"] + " " + spec["version"]
    canonical = "https://eudaemonia.tech" + spec["readerHrefZh"].removesuffix(".html").lower()
    metadata = json.dumps({"@context": "https://schema.org", "@type": "DigitalDocument", "name": title,
                           "url": canonical, "inLanguage": "zh-Hant", "dateModified": REFERENCE["translatedAt"],
                           "isBasedOn": spec["source"], "encoding": {"@type": "MediaObject", "contentUrl": "https://eudaemonia.tech" + spec["hrefZh"], "encodingFormat": "application/pdf"}}, ensure_ascii=False).replace("<", "\\u003c")
    pages = []
    for i, page in enumerate(pdf, 1):
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
        image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        image_file = image_dir / f"page-{i:02}.webp"
        image.save(image_file, "WEBP", quality=95, method=6)
        image_href = "/" + str(image_file.relative_to(PUBLIC))
        page_title = (translation.get("headers") or ["安裝與啟動", "操作、監控與維護"])[i-1]
        if not page_title:
            page_title = "封面" if i == 1 else "原廠聯絡資訊"
        text = page.get_text(sort=True)
        assert "繁體中文譯本" in text
        pages.append(f'''<section class="page" id="page-{i}" aria-labelledby="heading-{i}">
<div class="page-heading"><h2 id="heading-{i}">第 {i} 頁 · {escape(page_title)}</h2><a href="{image_href}" target="_blank" rel="noopener">另開本頁大圖</a></div>
<div class="page-view"><img class="page-image" src="{image_href}" width="{pix.width}" height="{pix.height}" alt="{escape(title)}繁體中文譯本，第 {i} 頁：{escape(page_title)}" loading="{'eager' if i == 1 else 'lazy'}" decoding="async"></div>
<details><summary>本頁文字（可搜尋與複製）</summary><pre>{escape(text)}</pre></details>
</section>''')
    navigation = ''.join(f'<a href="#page-{n}" aria-label="跳至第 {n} 頁">{n}</a>' for n in range(1, len(pdf)+1))
    size = f"{pdf_path.stat().st_size / 1_000_000:.1f} MB"
    html = f'''<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(title)}｜繁體中文線上閱讀｜EudTech</title>
<meta name="description" content="{escape(title)}完整繁體中文譯本，共 {len(pdf)} 頁。線上閱讀、放大圖表或下載 PDF。">
<meta name="source-pdf-sha256" content="{digest}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:title" content="{escape(title)}｜繁體中文線上閱讀｜EudTech"><meta property="og:description" content="{escape(spec['description']['zh'])}">
<meta property="og:url" content="{canonical}"><meta property="og:locale" content="zh_TW"><meta property="og:type" content="article">
<meta property="og:image" content="https://eudaemonia.tech/social/configurator/solutions-ai-infrastructure.jpg"><meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="{canonical}"><script type="application/ld+json">{metadata}</script><style>{STYLE}</style></head>
<body><header><a class="brand" href="/solutions/ai-infrastructure/#procurement">EudTech · 機關採購參考</a>
<p class="eyebrow">繁體中文線上閱讀 · 共 {len(pdf)} 頁</p><h1>{escape(title)}</h1>
<p class="note">{escape(REFERENCE['translationNote']['zh'])}</p>
<p class="note">完整圖文與原文頁碼對應。可用下方頁碼跳頁、放大閱讀，或展開本頁文字。翻譯日期：{REFERENCE['translatedAt']}。</p>
<div class="actions"><a class="primary" href="{spec['hrefZh']}" download>下載中文版 PDF（{size}）</a><a href="{escape(spec['source'])}" target="_blank" rel="noopener">原廠英文原文</a><a href="/solutions/ai-infrastructure/#procurement">返回採購參考</a></div></header>
<div class="toolbar"><div class="toolbar-inner"><nav class="pages" aria-label="文件頁碼">{navigation}</nav><button id="zoom" type="button" aria-pressed="false" hidden>放大閱讀</button></div></div>
<main>{''.join(pages)}</main><footer>EudTech 優達盟資訊科技 · 原廠文件繁體中文譯本</footer>
<script>
const zoom = document.getElementById('zoom');
zoom.hidden = false;
zoom.addEventListener('click', () => {{
  const active = document.body.classList.toggle('zoomed');
  zoom.setAttribute('aria-pressed', String(active));
  zoom.textContent = active ? '適合螢幕' : '放大閱讀';
}});
</script></body></html>'''
    destination = PUBLIC / spec["readerHrefZh"].lstrip("/")
    destination.write_text(html)
    return {"reader": spec["readerHrefZh"], "pages": len(pdf), "pdfSha256": digest,
            "imageBytes": sum(p.stat().st_size for p in image_dir.glob('*.webp'))}


if __name__ == '__main__':
    print(json.dumps([build(spec, TRANSLATIONS[key]) for spec, key in
                      zip(REFERENCE['documents'], ['server', 'guide'])], ensure_ascii=False, indent=2))
