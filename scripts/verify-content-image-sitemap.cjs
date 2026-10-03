const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { collectImages, localImagePath } = require('./generate-content-image-sitemap.cjs');
const origin = 'https://eudaemonia.tech';
const dist = path.resolve(__dirname, '../dist');
const xml = fs.readFileSync(path.join(dist, 'image-sitemap.xml'), 'utf8');
const records = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => ({
  url: m[1].match(/<loc>(.*?)<\/loc>/)[1],
  images: [...m[1].matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map(i => i[1].replace(/&amp;/g, '&'))
}));
assert.equal(new Set(records.map(record => record.url)).size, records.length, 'Duplicate image page');
assert.ok(!/<image:(caption|geo_location|title|license)>/.test(xml), 'Deprecated image sitemap tags');
for (const record of records) {
  assert.ok(record.images.length > 0 && record.images.length <= 1000);
  assert.equal(new Set(record.images).size, record.images.length, `Duplicate images: ${record.url}`);
}
for (const en of [false, true]) {
  const record = records.find(item => item.url === `${origin}/${en ? 'en/' : ''}solutions/ai-infrastructure/`);
  for (const image of [`liquid-airflow${en ? '-en' : ''}.webp`, `monitoring-qdc${en ? '-en' : ''}.webp`]) {
    assert.ok(record?.images.includes(`${origin}/vendor/comino/sales-kit-0911/${image}`), `Missing localized technical image: ${image}`);
  }
  assert.ok(!record.images.some(image => image.endsWith(en ? '/liquid-airflow.webp' : '/liquid-airflow-en.webp')), 'Wrong diagram language');
  assert.ok(records.some(item => item.url === `${origin}/${en ? 'en/' : ''}products/5/` && item.images.some(image => image.includes('/.netlify/images?url='))), 'Missing rendered product image');
}
const fixture = `<meta property="og:image" content="/share.webp"><header><img src="/nav.svg" alt="Logo"></header><main><img alt="Diagram" src="/diagram.webp"><img src="/diagram.webp" alt="Duplicate"><img src="/.netlify/images?url=%2Fproduct.jpg&amp;w=1920" alt="Product"><img src="/decorative.png" alt=""><img src="/hidden.png" alt="Hidden" aria-hidden="true"><img src="https://unverified.example/photo.jpg" alt="External"><img src="data:image/png;base64,AAAA" alt="Inline"></main>`;
assert.deepEqual(collectImages(fixture, `${origin}/en/example/`), [`${origin}/share.webp`, `${origin}/diagram.webp`, `${origin}/.netlify/images?url=%2Fproduct.jpg&w=1920`]);
assert.equal(localImagePath(`${origin}/.netlify/images?url=%2Fproduct.jpg&w=1920`, dist), path.join(dist, 'product.jpg'));
assert.throws(() => collectImages(`<meta name="robots" content="noindex">${fixture}`, origin));
console.log(JSON.stringify({ ok: true, imagePages: records.length, localizedDiagrams: true, productImages: true, safeXmlAndFiltering: true }));
