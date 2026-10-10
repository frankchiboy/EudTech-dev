const comparison = require('../src/data/h200RtxComparison.json');
const comparisonPath = '/solutions/h200-vs-rtx-pro-6000/';
const decode = text => text.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

function checkGpuComparison(html, pathname, schemas) {
  if (!pathname.endsWith(comparisonPath)) return [];
  const errors = [], language = pathname.startsWith('/en/') ? 'en' : 'zh';
  const section = html.match(/<section id="gpu-comparison"[\s\S]*?<\/section>/)?.[0] || '';
  const text = decode(section);
  for (const key of ['title', 'summary', 'scope', 'boundary']) {
    if (!text.includes(comparison[key][language])) errors.push('missing comparison ' + key);
  }
  const header = [...section.matchAll(/<th scope="col"[^>]*>([\s\S]*?)<\/th>/g)].map(match => decode(match[1]));
  if (JSON.stringify(header.slice(1)) !== JSON.stringify(comparison.columns)) errors.push('incorrect GPU edition columns');
  const rows = [...section.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].slice(1);
  if (rows.length !== comparison.rows.length) errors.push('missing comparison rows');
  comparison.rows.forEach((row, index) => {
    const html = rows[index]?.[1] || '';
    const cells = [...html.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)].map(match => decode(match[1]));
    if (JSON.stringify(cells) !== JSON.stringify(row.values)) errors.push('incorrect values or edition order: ' + row.label.en);
    if (!decode(html).includes(row.label[language]) || !html.includes('scope="row"')) errors.push('missing row heading: ' + row.label.en);
    if (row.note && !text.includes(row.note[language])) errors.push('missing power qualification');
  });
  for (const id of comparison.sourceIds) {
    if (!section.includes(`id="comparison-source-${id}"`)) errors.push('missing comparison source ' + id);
  }
  const article = schemas.find(schema => schema['@type'] === 'Article');
  const expected = `https://eudaemonia.tech${pathname}#${comparison.id}`;
  if (article?.hasPart?.['@id'] !== expected || article?.hasPart?.text !== comparison.summary[language]) errors.push('comparison schema differs from visible answer');
  if (!html.includes(`href="#${comparison.id}"`)) errors.push('missing comparison permalink');
  return errors;
}

function checkGpuComparisonReference(body) {
  const errors = [];
  for (const language of ['zh', 'en']) {
    for (const key of ['title', 'summary', 'scope', 'boundary']) if (!body.includes(comparison[key][language])) errors.push('comparison reference missing ' + language + '/' + key);
    if (!body.includes(`https://eudaemonia.tech${language === 'en' ? '/en' : ''}${comparisonPath}#${comparison.id}`)) errors.push('comparison reference missing localized URL');
  }
  for (const row of comparison.rows) for (const [index, value] of row.values.entries()) {
    if (!body.includes(`${comparison.columns[index]}: ${value}`)) errors.push('comparison reference missing edition value');
  }
  return errors;
}
module.exports = { checkGpuComparison, checkGpuComparisonReference, comparisonPath };
