#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { robotsAllows, checkPage, checkFile, textOnly } = require('./ai-discovery-checks.cjs');
const serviceQuestions = require('../src/data/serviceQuestions.json');
const origin = String(process.env.SITE_ORIGIN || 'https://eudaemonia.tech').replace(/\/$/, '');
const outputArg = process.argv.find(value => value.startsWith('--output='));
const output = outputArg ? path.resolve(outputArg.slice('--output='.length)) : '';
const allowPreviewNoindex = process.argv.includes('--preview') && new URL(origin).hostname.endsWith('--website-eudtech.netlify.app');
const agents = ['Googlebot','Bingbot','OAI-SearchBot','ChatGPT-User','PerplexityBot','Perplexity-User','ClaudeBot','Claude-User','Claude-SearchBot'];
const requiredFiles = ['/robots.txt','/sitemap-index.xml','/sitemap.xml','/llms.txt','/llms-full.txt','/feed.xml','/feed.json','/ai-discovery.json'];
const pages = ['/','/about/','/solutions/ai-infrastructure/','/solutions/aws/','/solutions/pqc/','/solutions/social-intelligence/','/resources/','/contact/'].flatMap(p => [p, '/en' + p]);
const botPages = ['/solutions/ai-infrastructure/', ...serviceQuestions.services.map(service => service.path)]
  .flatMap(pathname => [pathname, '/en' + pathname]);
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function probe(pathname, userAgent = 'EudTech-AI-Discovery-Audit/2.0') {
  const url = origin + pathname;
  let result;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': userAgent }, redirect: 'follow', signal: AbortSignal.timeout(15000) });
      const body = await response.text();
      result = { url, pathname, userAgent, status: response.status, contentType: response.headers.get('content-type') || '', xRobotsTag: response.headers.get('x-robots-tag') || '', finalUrl: response.url, bytes: Buffer.byteLength(body), body };
      if (![403,429].includes(response.status) && response.status < 500) return result;
    } catch (error) { result = { url, pathname, userAgent, status: 0, contentType: '', bytes: 0, body: '', error: error.message }; }
    if (attempt < 3) await wait(attempt * 500);
  }
  return result;
}
async function main() {
  const expectedCommit = process.argv.find(value => value.startsWith('--expect-commit='))?.split('=')[1];
  if (expectedCommit) {
    const deadline = Date.now() + 600000;
    let deployed = false;
    do {
      const metadata = await probe('/build-meta.json?verify=' + Date.now());
      try { deployed = metadata.status === 200 && JSON.parse(metadata.body).commit === expectedCommit; } catch { /* retry malformed or transient responses */ }
      if (deployed) break;
      if (Date.now() < deadline) await wait(15000);
    } while (Date.now() < deadline);
    if (!deployed) throw new Error('Expected revision is not deployed: ' + expectedCommit);
  }
  const jobs = [...requiredFiles.map(p => [p]), ...pages.map(p => [p]), ...agents.flatMap(a => botPages.map(p => [p, a]))];
  let next = 0;
  const results = new Array(jobs.length);
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (next < jobs.length) { const index = next++; results[index] = await probe(...jobs[index]); }
  }));
  const files = results.slice(0, requiredFiles.length);
  const pageResults = results.slice(requiredFiles.length, requiredFiles.length + pages.length);
  const botResults = results.slice(requiredFiles.length + pages.length), robots = files[0].body;
  const errors = files.flatMap(r => checkFile(r, r.pathname));
  for (const r of [...pageResults, ...botResults]) {
    errors.push(...checkPage(r, r.pathname, { allowPreviewNoindex }));
    if (r.finalUrl !== r.url) errors.push(r.pathname + ': unexpected redirect to ' + r.finalUrl);
  }
  for (const agent of agents) for (const pathname of [...pages, ...requiredFiles]) {
    if (!robotsAllows(robots, agent, pathname)) errors.push('robots.txt blocks ' + agent + ' from ' + pathname);
  }
  for (const r of botResults) {
    const baseline = pageResults.find(p => p.pathname === r.pathname);
    if (textOnly(r.body) !== textOnly(baseline.body)) errors.push(r.pathname + ': visible text differs for ' + r.userAgent);
  }
  const report = {
    ok: errors.length === 0, checkedAt: new Date().toISOString(), origin,
    mode: allowPreviewNoindex ? 'preview (hosting noindex exempted)' : 'production',
    summary: { agents: agents.length, botPageChecks: botResults.length, discoveryFiles: files.length, pages: pages.length, errors: errors.length },
    limitations: ['Synthetic user-agent requests do not verify access from provider IP ranges, search indexing or AI citations.', 'Authority records are checked against the source manifest; this audit does not re-verify third-party claims.'],
    results: results.map(({ body, ...r }) => r), errors
  };
  if (output) { fs.mkdirSync(path.dirname(output), { recursive: true }); fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n'); }
  console.log(JSON.stringify({ ...report, results: undefined, report: output || undefined }, null, 2));
  if (!report.ok) process.exitCode = 1;
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
