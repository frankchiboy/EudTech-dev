const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { englishRoutes } = require('./seo-public-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');
const reference = require('../src/data/cominoProcurement.json');
const conformity = require('../src/data/cominoConformity.json');
const dates = require('../public/discovery-lastmod.json').entries;
const origin = 'https://eudaemonia.tech';
const dist = path.resolve(__dirname, '../dist');
const sitemap = fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
assert.equal(new Set(urls).size,urls.length,'Duplicate sitemap URLs');
const canon = p => canonicalPageUrl(p,origin);
let count=0;
for (const route of englishRoutes()) for (const en of [false,true]) {
  const pathname=(en?'/en':'')+route.path, url=canon(pathname);
  const file=path.join(dist,pathname,'index.html');
  assert.ok(fs.existsSync(file),`Missing static page ${pathname}`);
  const html=fs.readFileSync(file,'utf8');
  assert.ok(urls.includes(url),`Missing sitemap URL ${url}`);
  assert.equal((html.match(/<link[^>]+rel="canonical"/g)||[]).length,1,`Duplicate canonical ${url}`);
  assert.ok(html.includes(`rel="canonical" href="${url}"`),`Wrong canonical ${url}`);
  assert.ok(html.includes(`<html lang="${en?'en':'zh-TW'}"`),`Wrong language ${url}`);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`Expected one H1 ${url}`);
  assert.ok(!/content="noindex/.test(html),`Indexable page blocked ${url}`);
  assert.ok(!/undefined/.test(html.match(/<head>[\s\S]*?<\/head>/)?.[0].replace(/<script[\s\S]*?<\/script>/g,'') || ''),`Undefined metadata ${url}`);
  const title=html.match(/<title\b[^>]*>(.*?)<\/title>/)?.[1];
  assert.ok(title && !title.includes('| EudTech | EudTech'),`Invalid title ${url}`);
  for (const [lang,href] of [['zh-Hant',canon(route.path)],['en',canon(`/en${route.path}`)],['x-default',canon(route.path)]]) {
    assert.ok(html.toLowerCase().includes(`hreflang="${lang}" href="${href}"`.toLowerCase()),`Missing reciprocal alternate ${url} ${lang}`);
  }
  const schemas=[...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match=>JSON.parse(match[1]));
  for (const data of schemas) {
    if (data['@type']==='Article' || data['@type']==='WebPage' || data['@type']==='CollectionPage') {
      assert.equal(data.url,url,`Schema URL ${url}`);
      assert.equal(data.dateModified,dates[url].modifiedAt,`Unstable content date ${url}`);
    }
  }
  if (/^\/configurator(?:\/|$)/.test(route.path)) {
    const types=new Set(schemas.map(schema=>schema['@type']));
    for (const type of ['Organization','WebSite','WebPage','BreadcrumbList','WebApplication','ItemList']) {
      assert.ok(types.has(type),`Missing ${type} schema ${url}`);
    }
    if (route.path !== '/configurator') assert.ok(types.has('Service'),`Missing Service schema ${url}`);
  }
  const image=html.match(/property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(image?.startsWith('https://'),`Social image must be absolute ${url}`);
  if (image.startsWith(origin)) assert.ok(fs.existsSync(path.join(dist,new URL(image).pathname)),`Missing social image ${image}`);
  count++;
}
for (const doc of [...reference.documents, ...conformity.documents]) {
  const url=origin+doc.readerHrefZh.replace(/\.html$/,'').toLowerCase();
  const html=fs.readFileSync(path.join(dist,doc.readerHrefZh),'utf8');
  assert.ok(urls.includes(url),`Document missing from sitemap ${url}`);
  assert.ok(html.includes(`rel="canonical" href="${url}"`),`Document canonical ${url}`);
  assert.ok(html.includes('DigitalDocument') && html.includes('<pre>'),'Document must expose searchable text and metadata');
  assert.ok(fs.existsSync(path.join(dist,doc.hrefZh)),'Chinese PDF missing');
}
for (const file of ['404.html','en/404.html']) assert.ok(fs.readFileSync(path.join(dist,file),'utf8').includes('noindex, follow'));
const redirects=fs.readFileSync(path.join(dist,'_redirects'),'utf8');
assert.ok(!/\/\*\s+\/index\.html\s+200/.test(redirects),'Soft-404 SPA fallback must not return');
assert.ok(redirects.includes('/* /404.html 404') && redirects.includes('/en/* /en/404.html 404'),'Missing real 404 rules');
console.log(JSON.stringify({ok:true,bilingualPages:count,documentPages:reference.documents.length+conformity.documents.length,sitemapUrls:urls.length,reciprocalHreflang:true,stableDates:true,real404:true},null,2));
