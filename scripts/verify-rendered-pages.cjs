const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { englishRoutes } = require('./seo-public-pages.cjs');
const procurement = require('../src/data/cominoProcurement.json');
const dist = path.resolve(__dirname, '../dist');
const text = value => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
let rendered = 0, dynamic = 0;
for (const route of englishRoutes()) for (const en of [false, true]) {
  const pathname = `${en ? '/en' : ''}${route.path}`;
  const html = fs.readFileSync(path.join(dist, pathname, 'index.html'), 'utf8');
  assert.ok(!html.includes('\0') && !html.includes('\ufffd'), `Corrupted text: ${pathname}`);
  if (/^\/configurator(?:\/|$)/.test(route.path)) {
    assert.ok(!html.includes('data-rendered="true"'), `Dynamic configurator must not hydrate stale availability: ${pathname}`);
    dynamic++;
    continue;
  }
  assert.ok(html.includes('id="root" data-rendered="true"'), `Missing rendered app: ${pathname}`);
  assert.ok(!html.includes('data-static-seo-fallback'), `Separate SEO copy must not replace the actual page: ${pathname}`);
  assert.ok(html.includes('id="main-content"') && html.includes('<nav') && html.includes('<footer'), `Missing actual page layout: ${pathname}`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `One visible H1 required: ${pathname}`);
  assert.ok(!html.includes('<!--$!-->'), `Unresolved React suspense: ${pathname}`);
  const title = html.match(/<title\b[^>]*>(.*?)<\/title>/)[1];
  const meta = (kind, name) => html.match(new RegExp(`<meta[^>]+${kind}="${name}"[^>]+content="([^"]*)"`))?.[1];
  const description = meta('name', 'description');
  assert.ok(description && description.length >= 25, `Missing page description: ${pathname}`);
  assert.equal(meta('property', 'og:title'), title, `Social title mismatch: ${pathname}`);
  assert.equal(meta('name', 'twitter:title'), title, `Twitter title mismatch: ${pathname}`);
  assert.equal(meta('property', 'og:description'), description, `Social description mismatch: ${pathname}`);
  assert.equal(meta('property', 'og:locale'), en ? 'en_US' : 'zh_TW', `Social language mismatch: ${pathname}`);
  assert.ok(html.includes('https://eudaemonia.tech/#organization') && html.includes('https://eudaemonia.tech/#website'), `Missing linked publisher: ${pathname}`);
  const body = text(html.match(/<body>[\s\S]*?<\/body>/)[0]);
  assert.ok(body.length > 400, `Incomplete page content: ${pathname}`);
  for (const match of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const schema = JSON.parse(match[1]);
    if (schema['@type'] === 'FAQPage') for (const faq of schema.mainEntity) {
      assert.ok(body.includes(text(faq.name)), `FAQ question missing from visible content: ${pathname}`);
      assert.ok(body.includes(text(faq.acceptedAnswer.text)), `FAQ answer missing from visible content: ${pathname}`);
    }
  }
  rendered++;
}
assert.equal(rendered, 70);
assert.equal(dynamic, 24);
assert.ok(!fs.existsSync(path.join(dist, 'entry-server.js')), 'Server code must not be published');
assert.ok(!fs.existsSync(path.join(dist, '.vite/manifest.json')), 'Build manifest must stay outside the published directory');
for (const p of ['solutions/ai-infrastructure/index.html', 'en/solutions/ai-infrastructure/index.html']) {
  const html = fs.readFileSync(path.join(dist, p), 'utf8');
  assert.match(html, /<link[^>]+rel="stylesheet"[^>]+href="\/assets\/AiInfrastructureSolutionPage-[^"]+\.css"/, `First-paint styles missing: ${p}`);
  assert.match(html, /<link[^>]+rel="modulepreload"[^>]+href="\/assets\/AiInfrastructureSolutionPage-[^"]+\.js"/, `Route code preload missing: ${p}`);
  const en = p.startsWith('en/');
  const pageUrl = `https://eudaemonia.tech/${en ? 'en/' : ''}solutions/ai-infrastructure/`;
  const schemas = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const faqSchema = schemas.find(schema => schema['@type'] === 'FAQPage');
  assert.equal(faqSchema?.mainEntity.length, procurement.faqs.length, `Missing procurement answers: ${p}`);
  for (const faq of procurement.faqs) {
    const question = faqSchema.mainEntity.find(item => item.url === `${pageUrl}#${faq.id}`);
    assert.ok(question && html.includes(`id="${faq.id}"`), `Question permalink does not resolve: ${p}#${faq.id}`);
    const doc = procurement.documents.find(item => item.id === faq.documentId);
    assert.ok(doc, `Question references an unknown document: ${faq.id}`);
    const citation = new URL(question.acceptedAnswer.citation);
    const sourceFile = en ? doc.href : doc.readerHrefZh;
    assert.equal(citation.origin, 'https://eudaemonia.tech');
    assert.equal(citation.pathname, en ? doc.href : doc.readerHrefZh.replace(/\.html$/, '').toLowerCase());
    assert.equal(citation.hash, en ? `#page=${faq.page}` : `#page-${faq.page}`);
    assert.ok(html.includes(`href="${citation.href}"`), `Schema citation must be a visible source link: ${faq.id}`);
    assert.ok(fs.existsSync(path.join(dist, sourceFile)), `Missing source document: ${sourceFile}`);
    if (!en) {
      const reader = fs.readFileSync(path.join(dist, sourceFile), 'utf8');
      assert.ok(reader.includes(`id="page-${faq.page}"`), `Source page anchor does not resolve: ${citation.href}`);
    }
  }
}
for (const p of ['index.html', 'en/index.html']) {
  const html = fs.readFileSync(path.join(dist, p), 'utf8');
  assert.ok(html.includes('fetchPriority="high"') && html.includes('960w,') && html.includes('2560w'), `Responsive priority hero missing: ${p}`);
}
console.log(JSON.stringify({ ok: true, renderedPages: rendered, liveConfiguratorFallbacks: dynamic, visibleFaqParity: true, procurementCitations: procurement.faqs.length * 2 }));
