const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { englishRoutes } = require('./seo-public-pages.cjs');
const procurement = require('../src/data/cominoProcurement.json');
const discoveryDates = require('../public/discovery-lastmod.json');
const serviceQuestions = require('../src/data/serviceQuestions.json');
const { checkPage, checkFile } = require('./ai-discovery-checks.cjs');
const { CONFIGURATOR_SEO_PAGES, getRelatedConfiguratorSeoPages, getConfiguratorGuideSources, getConfiguratorGuideSourceHref } = require('./read-configurator-seo-pages.cjs').readConfiguratorSeoPages();
const dist = path.resolve(__dirname, '../dist');
const text = value => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const canonicalPathByAlias = new Map(Object.keys(discoveryDates.entries).map(value => {
  const canonicalPath = new URL(value).pathname;
  return [canonicalPath === '/' ? '/' : canonicalPath.replace(/\/$/, ''), canonicalPath];
}));
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
  assert.match(html, /<main[^>]+id="main-content"[^>]+tabindex="-1"/i, `Skip-link destination must receive focus: ${pathname}`);
  assert.ok(html.includes(en ? 'Skip to main content' : '跳到主要內容'), `Skip link must use the page language: ${pathname}`);
  assert.ok(html.includes(`aria-label="${en ? 'EudTech home' : 'EudTech 首頁'}"`), `Home link must use the page language: ${pathname}`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `One visible H1 required: ${pathname}`);
  assert.ok(!html.includes('<!--$!-->'), `Unresolved React suspense: ${pathname}`);
  for (const href of [...html.matchAll(/\bhref="(\/[^\"]*)"/g)].map(match => match[1])) {
    const link = new URL(href, 'https://eudaemonia.tech');
    const alias = link.pathname === '/' ? '/' : link.pathname.replace(/\/$/, '');
    const canonicalPath = canonicalPathByAlias.get(alias);
    if (canonicalPath) assert.equal(link.pathname, canonicalPath, `Internal page link must use canonical trailing slash: ${pathname} -> ${href}`);
  }
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
  const schemas = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  assert.ok(schemas.some(schema => schema['@type'] === 'BreadcrumbList'), `Missing BreadcrumbList: ${pathname}`);
  for (const schema of schemas) {
    if (schema['@type'] === 'FAQPage') for (const faq of schema.mainEntity) {
      assert.ok(body.includes(text(faq.name)), `FAQ question missing from visible content: ${pathname}`);
      assert.ok(body.includes(text(faq.acceptedAnswer.text)), `FAQ answer missing from visible content: ${pathname}`);
    }
  }
  rendered++;
}
assert.equal(rendered, 72);
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
for (const p of ['solutions/pqc/index.html', 'en/solutions/pqc/index.html']) {
  const html = fs.readFileSync(path.join(dist, p), 'utf8');
  assert.match(html, /<link[^>]+rel="stylesheet"[^>]+href="\/assets\/PqcAdvisoryPage-[^"]+\.css"/, `PQC first-paint styles missing: ${p}`);
  assert.ok(html.includes('Chung-hao (Frank) Hsu') && html.includes('Hung-Jr Shiu'), `PQC expert credentials must render without JavaScript: ${p}`);
}
for (const p of ['index.html', 'en/index.html']) {
  const html = fs.readFileSync(path.join(dist, p), 'utf8');
  assert.ok(html.includes('fetchPriority="high"') && html.includes('960w,') && html.includes('2560w'), `Responsive priority hero missing: ${p}`);
}
const inboundGuides = new Set();
const discoveryText = fs.readFileSync(path.join(dist, 'llms-full.txt'), 'utf8');
let serviceAnswerPermalinks = 0;
for (const service of serviceQuestions.services) for (const en of [false, true]) {
  const pathname = `${en ? '/en' : ''}${service.path}`;
  const html = fs.readFileSync(path.join(dist, pathname, 'index.html'), 'utf8');
  assert.deepEqual(checkPage({ status: 200, contentType: 'text/html', body: html, userAgent: 'build' }, pathname), [], `Service answer parity: ${pathname}`);
  serviceAnswerPermalinks += service.questions.length;
}
assert.deepEqual(checkFile({ status: 200, contentType: 'text/plain', body: discoveryText }, '/llms-full.txt'), [], 'Service discovery answers must match visible pages');
let answerPermalinks = 0;
for (const page of CONFIGURATOR_SEO_PAGES) {
  assert.equal(new Set(page.relatedSlugs).size, 4, `Four distinct related guides required: ${page.slug}`);
  assert.ok(!page.relatedSlugs.includes(page.slug), `A guide must not recommend itself: ${page.slug}`);
  const related = getRelatedConfiguratorSeoPages(page.slug);
  assert.equal(related.length, page.relatedSlugs.length, `Unknown related guide: ${page.slug}`);
  page.relatedSlugs.forEach(slug => inboundGuides.add(slug));
  for (const en of [false, true]) {
    const prefix = en ? '/en' : '';
    const pathname = `${prefix}/solutions/${page.slug}/`;
    const html = fs.readFileSync(path.join(dist, pathname, 'index.html'), 'utf8');
    const section = html.match(/<section id="related-guides"[\s\S]*?<\/section>/)?.[0];
    assert.ok(section, `Missing related guides section: ${pathname}`);
    const links = [...section.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
    assert.deepEqual(links, [`${prefix}/resources/`, ...page.relatedSlugs.map(slug => `${prefix}/solutions/${slug}/`)], `Visible related links must match editorial selection and language: ${pathname}`);
    const schemas = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
    const faqSchema = schemas.find(schema => schema['@type'] === 'FAQPage');
    const pageUrl = `https://eudaemonia.tech${pathname}`;
    assert.equal(faqSchema['@id'], `${pageUrl}#questions`, `FAQ section identifier: ${pathname}`);
    const allIds = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(allIds).size, allIds.length, `Duplicate HTML IDs: ${pathname}`);
    assert.equal(new Set(Array.from(page.faqs, faq => faq.id)).size, page.faqs.length, `Duplicate answer IDs: ${pathname}`);
    for (const faq of page.faqs) {
      assert.match(faq.id, /^faq-[a-z0-9]+(?:-[a-z0-9]+)*$/, `Invalid answer anchor: ${pathname}`);
      const question = faqSchema.mainEntity.find(item => item.url === `${pageUrl}#${faq.id}`);
      assert.equal(question?.['@id'], `${pageUrl}#${faq.id}`, `Question schema must resolve to the answer: ${pathname}`);
      assert.ok(allIds.includes(faq.id) && html.includes(`href="#${faq.id}"`), `Visible answer permalink missing: ${pathname}`);
      assert.ok(discoveryText.includes(`${pageUrl}#${faq.id}`), `Discovery answer link missing: ${pathname}`);
      answerPermalinks++;
    }
    const sourceSection = html.match(/<section id="reference-sources"[\s\S]*?<\/section>/)?.[0];
    assert.ok(sourceSection, `Manufacturer sources missing: ${pathname}`);
    const sourceLinks = [...sourceSection.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
    const sources = getConfiguratorGuideSources(page.slug);
    const expectedSourceLinks = Array.from(sources, source => getConfiguratorGuideSourceHref(source, en));
    assert.ok(sources.length >= 2 && new Set(expectedSourceLinks).size === sources.length, `Distinct relevant sources required: ${pathname}`);
    assert.deepEqual(sourceLinks, expectedSourceLinks, `Source URLs must match the page language: ${pathname}`);
    for (const source of sources) {
      assert.ok(text(sourceSection).includes(source.description[en ? 'en' : 'zh']), `Source scope missing: ${pathname}`);
      assert.ok(discoveryText.includes(getConfiguratorGuideSourceHref(source, en)), `Discovery source missing: ${pathname}`);
      if (source.hrefZh) {
        const document = procurement.documents.find(doc => doc.href === source.href);
        assert.ok(document && source.hrefZh === document.readerHrefZh.replace(/\.html$/, '').toLowerCase(), `Translation route drift: ${source.id}`);
        assert.ok(fs.existsSync(path.join(dist, en ? document.href : document.readerHrefZh)), `Missing source document: ${source.id}`);
      }
    }
    const article = schemas.find(schema => schema['@type'] === 'Article');
    if (article) {
      assert.deepEqual(article.citation, sourceLinks, `Article citations must match visible sources: ${pathname}`);
      assert.equal(article.author['@id'], 'https://eudaemonia.tech/#organization', `Article author identity: ${pathname}`);
    }
    const modifiedAt = discoveryDates.entries[pageUrl].modifiedAt;
    assert.ok(html.includes(`<time dateTime="${modifiedAt}">${modifiedAt}</time>`) || html.includes(`<time datetime="${modifiedAt}">${modifiedAt}</time>`), `Visible revision date mismatch: ${pathname}`);
    assert.ok((html.match(/<a\b[^>]*rel="author"[^>]*>/g) || []).some(link => link.includes(`href="${prefix}/about/#verified-company-identity"`)), `Missing visible publisher link: ${pathname}`);
    const list = schemas.find(schema => schema['@id'] === `https://eudaemonia.tech${pathname}#related-guides`);
    assert.ok(list, `Related guides schema must identify a real section: ${pathname}`);
    assert.deepEqual(list.itemListElement.map(item => item.url), links.slice(1).map(href => `https://eudaemonia.tech${href}`), `Related schema and visible links must agree: ${pathname}`);
    assert.deepEqual(list.itemListElement.map(item => item.name), Array.from(related, item => item.title[en ? 'en' : 'zh']), `Related schema labels must use the page language: ${pathname}`);
    assert.ok(html.includes(`aria-label="${en ? 'Breadcrumb' : '目前位置'}"`) && html.includes('aria-current="page"'), `Missing visible hierarchy: ${pathname}`);
  }
}
assert.equal(inboundGuides.size, CONFIGURATOR_SEO_PAGES.length, 'Every guide needs a relevant inbound guide link');
for (const p of ['contact/index.html', 'en/contact/index.html']) {
  const html = fs.readFileSync(path.join(dist, p), 'utf8');
  const organization = require('../src/data/organization.json');
  assert.match(html, new RegExp('<a[^>]+href="mailto:' + organization.email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"'), `Contact email must work without JavaScript: ${p}`);
  assert.match(html, /<a[^>]+href="https:\/\/outlook\.office\.com\/book\/[^"]+"[^>]+target="_blank"[^>]+rel="noopener noreferrer"/, `Booking must be a native, safe link: ${p}`);
  const schemas = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const contact = schemas.find(schema => schema['@type'] === 'ContactPage');
  assert.equal(contact?.url, `https://eudaemonia.tech/${p.replace('index.html', '')}`, `Contact schema must match the page language: ${p}`);
  assert.equal(contact?.mainEntity?.['@id'], organization['@id'], `Contact page must identify the same organization: ${p}`);
}
console.log(JSON.stringify({ ok: true, renderedPages: rendered, liveConfiguratorFallbacks: dynamic, visibleFaqParity: true, guideSources: CONFIGURATOR_SEO_PAGES.length * 2, answerPermalinks, serviceAnswerPermalinks, procurementCitations: procurement.faqs.length * 2 }));
