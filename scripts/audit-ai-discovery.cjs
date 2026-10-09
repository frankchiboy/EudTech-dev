#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const origin = String(process.env.SITE_ORIGIN || 'https://eudaemonia.tech').replace(/\/$/, '');
const outputArg = process.argv.find(value => value.startsWith('--output='));
const output = outputArg ? path.resolve(outputArg.slice('--output='.length)) : '';
const agents = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot'];
const requiredFiles = ['/robots.txt', '/sitemap-index.xml', '/llms.txt', '/llms-full.txt', '/feed.xml', '/feed.json', '/ai-discovery.json'];
const pages = ['/', '/about/', '/solutions/ai-infrastructure/'];

async function probe(url, userAgent = 'EudTech-AI-Discovery-Audit/1.0') {
  const response = await fetch(url, { headers: { 'user-agent': userAgent, accept: 'text/html,application/json,text/plain,*/*' }, redirect: 'follow' });
  const body = await response.text();
  return {
    url,
    userAgent,
    status: response.status,
    contentType: response.headers.get('content-type') || '',
    bytes: Buffer.byteLength(body),
    blocked: /captcha|access denied|cf-chl|challenge-platform/i.test(body),
    body
  };
}

async function main() {
  const [robots, ...fileResults] = await Promise.all(requiredFiles.map(file => probe(`${origin}${file}`)));
  const userAgentResults = await Promise.all(agents.map(agent => probe(`${origin}/solutions/ai-infrastructure/`, agent)));
  const pageResults = await Promise.all(pages.map(page => probe(`${origin}${page}`)));
  let authority;
  try { authority = JSON.parse(fileResults.find(item => item.url.endsWith('/ai-discovery.json'))?.body || ''); } catch (_) { authority = undefined; }
  const errors = [];
  for (const result of [robots, ...fileResults, ...userAgentResults, ...pageResults]) {
    if (result.status !== 200) errors.push(`${result.url} returned ${result.status} for ${result.userAgent}`);
    if (result.blocked) errors.push(`${result.url} returned a challenge or access denial for ${result.userAgent}`);
  }
  for (const agent of agents.filter(agent => !['Googlebot', 'Bingbot'].includes(agent))) {
    if (!robots.body.includes(`User-agent: ${agent}`)) errors.push(`robots.txt does not explicitly allow ${agent}`);
  }
  if (!authority?.authority?.sources?.length) errors.push('ai-discovery.json has no authority source records');
  const html = pageResults.map(result => result.body).join('\n');
  for (const marker of ['application/ld+json', 'https://eudaemonia.tech/#organization', 'rel="canonical"']) {
    if (!html.includes(marker)) errors.push(`rendered pages missing ${marker}`);
  }
  if (!/hrefLang="en"|hreflang="en"/i.test(html)) errors.push('rendered pages missing English hreflang');
  const report = {
    ok: errors.length === 0,
    checkedAt: new Date().toISOString(),
    origin,
    summary: { agents: agents.length, discoveryFiles: requiredFiles.length, pages: pages.length, errors: errors.length },
    agents: userAgentResults.map(({ userAgent, status, contentType, bytes, blocked }) => ({ userAgent, status, contentType, bytes, blocked })),
    discoveryFiles: [robots, ...fileResults].map(({ url, status, contentType, bytes, blocked }) => ({ url, status, contentType, bytes, blocked })),
    authoritySources: authority?.authority?.sources?.map(({ id, type, url, status }) => ({ id, type, url, status })) || [],
    errors
  };
  if (output) {
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
  }
  console.log(JSON.stringify(report, null, 2));
  if (!report.ok) process.exit(1);
}

main().catch(error => { console.error(error.message || String(error)); process.exit(1); });
