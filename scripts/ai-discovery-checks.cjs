const organization = require('../src/data/organization.json');
const authority = require('../src/data/authoritySources.json');
const root = 'https://eudaemonia.tech';
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(m => [m[1].toLowerCase(), m[2] ?? m[3]]));
const tags = (html, name) => [...html.matchAll(new RegExp('<' + name + '\\b[^>]*>', 'gi'))].map(m => attrs(m[0]));
const textOnly = html => html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const blocking = value => /(?:^|[\s,:])(?:noindex|none|nosnippet)(?:$|[\s,;])|max-snippet\s*:\s*0(?:$|[\s,;])/i.test(value || '');
function robotsAllows(body, agent, pathname) {
  const groups = [];
  let group;
  for (const raw of body.split(/\r?\n/)) {
    const m = raw.replace(/#.*/, '').trim().match(/^([\w-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const [, key, value] = m;
    if (key.toLowerCase() === 'user-agent') {
      if (!group || group.started) { group = { agents: [], rules: [], started: false }; groups.push(group); }
      group.agents.push(value.toLowerCase());
    } else if (group && /^(allow|disallow)$/i.test(key)) {
      group.started = true;
      if (value) group.rules.push({ allow: key.toLowerCase() === 'allow', value });
    }
  }
  const scored = groups.map(g => ({ ...g, score: Math.max(-1, ...g.agents.map(a => a === '*' ? 0 : agent.toLowerCase().includes(a) ? a.length : -1)) }));
  const best = Math.max(-1, ...scored.map(g => g.score));
  const matching = scored.filter(g => g.score === best && best >= 0).flatMap(g => g.rules).filter(rule => {
    const end = rule.value.endsWith('$');
    const pattern = (end ? rule.value.slice(0, -1) : rule.value).split('*').map(p => p.replace(/[.*+?^\x24{}()|[\]\\]/g, '\\$&')).join('.*');
    return new RegExp('^' + pattern + (end ? '$' : '')).test(pathname);
  }).sort((a, b) => b.value.replace(/[*$]/g, '').length - a.value.replace(/[*$]/g, '').length || Number(b.allow) - Number(a.allow));
  return matching[0]?.allow ?? true;
}
function flatten(value) {
  if (Array.isArray(value)) return value.flatMap(flatten);
  if (!value || typeof value !== 'object') return [];
  return [value, ...Object.values(value).flatMap(flatten)];
}
function checkPage(result, pathname, { allowPreviewNoindex = false } = {}) {
  const errors = [], fail = message => errors.push(pathname + ' [' + result.userAgent + ']: ' + message);
  if (result.status !== 200) fail('HTTP ' + result.status);
  if (!result.contentType.includes('text/html')) fail('expected HTML');
  if (blocking(result.xRobotsTag) && !allowPreviewNoindex) fail('blocking X-Robots-Tag');
  const html = result.body || '';
  for (const m of tags(html, 'meta')) if (/^(robots|googlebot|bingbot)$/i.test(m.name || '') && blocking(m.content)) fail('blocking ' + m.name + ' meta');
  const canonical = tags(html, 'link').filter(l => l.rel?.toLowerCase() === 'canonical'), expected = root + pathname;
  if (canonical.length !== 1 || canonical[0].href !== expected) fail('incorrect canonical');
  const en = pathname.startsWith('/en/'), zh = en ? pathname.slice(3) : pathname;
  if (tags(html, 'html')[0]?.lang !== (en ? 'en' : 'zh-TW')) fail('incorrect language');
  const alternatives = tags(html, 'link').filter(l => l.rel === 'alternate');
  for (const [lang, href] of [['zh-Hant', root + zh], ['en', root + '/en' + zh], ['x-default', root + zh]]) {
    const matches = alternatives.filter(l => l.hreflang?.toLowerCase() === lang.toLowerCase());
    if (matches.length !== 1 || matches[0].href !== href) fail('incorrect ' + lang + ' alternate');
  }
  if ((html.match(/<h1\b/gi) || []).length !== 1) fail('expected one H1');
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
  if (textOnly(main).length < 250) fail('missing prerendered main content');
  const schemas = [];
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attrs(m[1]).type !== 'application/ld+json') continue;
    try { schemas.push(...flatten(JSON.parse(m[2]))); } catch { fail('invalid JSON-LD'); }
  }
  const entity = schemas.find(n => n['@type'] === 'Organization' && n['@id'] === organization['@id'] && n.legalName);
  if (!entity || entity.legalName !== organization.legalName || entity.taxID !== organization.taxID) fail('inconsistent Organization identity');
  if (entity?.sameAs?.includes('https://www.comino.com/en/company')) fail('partner directory incorrectly used as sameAs');
  if (!schemas.some(n => ['WebPage','AboutPage','CollectionPage','Article'].includes(n['@type']) && n.url === expected)) fail('missing page-specific schema');
  if (zh === '/about/') {
    if (!tags(main, 'section').some(s => s.id === 'verified-company-identity')) fail('missing company identity anchor');
    if (/legal_name|tax_id|registered_address|eudtech_name|ai_system_integrator_description/.test(textOnly(main))) fail('internal field codes exposed');
    for (const value of [organization.taxID, organization.foundingDate]) if (!textOnly(main).includes(value)) fail('missing company fact ' + value);
    for (const source of authority.sources) if (!main.includes(source.description[en ? 'en' : 'zh'])) fail('missing source scope ' + source.id);
  }
  return errors;
}
function checkFile(result, pathname) {
  const errors = [], fail = message => errors.push(pathname + ': ' + message), body = result.body || '';
  if (result.status !== 200) fail('HTTP ' + result.status);
  if (/^\s*(?:<!doctype html|<html)/i.test(body)) fail('HTML fallback instead of discovery file');
  if (pathname.endsWith('.json')) {
    if (!/application\/(?:feed\+)?json/.test(result.contentType)) fail('expected JSON content type');
    try {
      const data = JSON.parse(body);
      if (pathname === '/ai-discovery.json') {
        if (JSON.stringify(data.entity) !== JSON.stringify(organization)) fail('entity differs from source');
        if (JSON.stringify(data.authority) !== JSON.stringify(authority)) fail('authority differs from source');
      } else if (!Array.isArray(data.items) || !data.items.length) fail('empty feed');
    } catch { fail('invalid JSON'); }
  } else if (pathname.endsWith('.xml')) {
    if (!/xml/i.test(result.contentType) || !/<(?:sitemapindex|urlset|rss)\b/.test(body)) fail('invalid XML discovery response');
  } else if (!/^text\/(?:plain|markdown)/i.test(result.contentType) || body.trim().length < 50) fail('missing text discovery content');
  return errors;
}
module.exports = { robotsAllows, checkPage, checkFile, textOnly };
