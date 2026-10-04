const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const reference = require('../src/data/cominoProcurement.json');
const conformity = require('../src/data/cominoConformity.json');

// Read the final HTML so image discovery follows the same localized content that
// visitors receive. The earlier public sitemap remains a development fallback.
const decode = value => value.replace(/&(?:amp|quot|apos|lt|gt|#39|#x27|#\d+|#x[\da-f]+);/gi, entity => {
  const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>', '&#39;': "'", '&#x27;': "'" };
  return named[entity.toLowerCase()] ?? String.fromCodePoint(parseInt(entity.slice(2, -1).replace(/^x/i, ''), /^&#x/i.test(entity) ? 16 : 10));
});
const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(m => [m[1].toLowerCase(), decode(m[2] ?? m[3])]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(m => attributes(m[0]));

function collectImages(html, pageUrl) {
  const origin = new URL(pageUrl).origin;
  const meta = tags(html, 'meta');
  assert.ok(!meta.some(m => m.name === 'robots' && /noindex|noimageindex/i.test(m.content)), `Blocked image page: ${pageUrl}`);
  const candidates = meta.filter(m => m.property === 'og:image').map(m => m.content);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
  for (const img of tags(main, 'img')) {
    // Decorative images and icons do not need their own search result.
    if (!img.alt?.trim() || img['aria-hidden'] === 'true' || img.role === 'presentation') continue;
    if (img.src) candidates.push(img.src);
  }
  return [...new Set(candidates.filter(Boolean).map(src => new URL(src, pageUrl)).filter(url =>
    url.protocol === 'https:' && url.origin === origin && !url.hash
  ).map(url => url.href))];
}

function localImagePath(imageUrl, dist) {
  const url = new URL(imageUrl);
  if (url.pathname === '/.netlify/images') {
    const source = new URL(url.searchParams.get('url'), url.origin);
    if (source.origin !== url.origin) return null;
    return path.join(dist, decodeURIComponent(source.pathname));
  }
  return path.join(dist, decodeURIComponent(url.pathname));
}

function generate(dist) {
  const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
  const pages = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => decode(m[1]));
  const documentPaths = new Map([...reference.documents, ...conformity.documents].map(doc => [doc.readerHrefZh.replace(/\.html$/, '').toLowerCase(), doc.readerHrefZh]));
  const entries = [];
  for (const pageUrl of pages) {
    const pathname = new URL(pageUrl).pathname;
    const file = path.join(dist, documentPaths.get(pathname) || `${pathname}/index.html`);
    const html = fs.readFileSync(file, 'utf8');
    assert.equal(tags(html, 'link').find(link => link.rel === 'canonical')?.href, pageUrl, `Image page canonical: ${pageUrl}`);
    const images = collectImages(html, pageUrl);
    for (const imageUrl of images) {
      const local = localImagePath(imageUrl, dist);
      if (local) assert.ok(fs.existsSync(local) && fs.statSync(local).isFile(), `Missing image on ${pageUrl}: ${imageUrl}`);
    }
    if (images.length) entries.push({ pageUrl, images });
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.map(({ pageUrl, images }) => `  <url>\n    <loc>${escape(pageUrl)}</loc>\n${images.map(imageUrl => `    <image:image><image:loc>${escape(imageUrl)}</image:loc></image:image>`).join('\n')}\n  </url>`).join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(dist, 'image-sitemap.xml'), xml);
  return { ok: true, pages: entries.length, imageReferences: entries.reduce((n, entry) => n + entry.images.length, 0), uniqueImages: new Set(entries.flatMap(entry => entry.images)).size };
}

module.exports = { collectImages, localImagePath, generate };
if (require.main === module) console.log(JSON.stringify(generate(path.resolve(__dirname, '../dist'))));
