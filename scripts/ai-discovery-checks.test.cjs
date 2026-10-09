const { test } = require('node:test');
const assert = require('node:assert/strict');
const { robotsAllows, checkPage, checkFile } = require('./ai-discovery-checks.cjs');
const organization = require('../src/data/organization.json');
const root = 'https://eudaemonia.tech';
const page = pathname => {
  const en = pathname.startsWith('/en/'), zh = en ? pathname.slice(3) : pathname;
  return '<html lang="' + (en ? 'en' : 'zh-TW') + '"><head><link rel="canonical" href="' + root + pathname + '">' +
    [['zh-Hant',zh],['en','/en' + zh],['x-default',zh]].map(([lang, path]) => '<link rel="alternate" hreflang="' + lang + '" href="' + root + path + '">').join('') +
    '<script type="application/ld+json">' + JSON.stringify([organization, {'@type':'WebPage',url:root + pathname}]) +
    '</script></head><body><main><h1>GPU systems</h1><p>' + 'Useful visible product information. '.repeat(12) + '</p></main></body></html>';
};
const response = body => ({body, status:200, contentType:'text/html', userAgent:'Googlebot'});
test('each bilingual page must independently have correct canonical, alternates and schema', () => {
  for (const pathname of ['/solutions/ai-infrastructure/','/en/solutions/ai-infrastructure/']) {
    const html = page(pathname);
    assert.deepEqual(checkPage(response(html),pathname),[]);
    assert.ok(checkPage(response(html.replace('rel="canonical"','rel="invalid"')),pathname).some(e=>e.includes('canonical')));
    assert.ok(checkPage(response(html.replace('hreflang="en"','hreflang="fr"')),pathname).some(e=>e.includes('en alternate')));
    assert.ok(checkPage(response(html.replace('"taxID":"93583557"','"taxID":"00000000"')),pathname).some(e=>e.includes('identity')));
  }
});
test('reject noindex and snippet suppression in headers and HTML', () => {
  const html = page('/');
  for (const value of ['noindex, follow','none','nosnippet','max-snippet:0','googlebot: noindex']) {
    assert.ok(checkPage({...response(html),xRobotsTag:value},'/').length);
    assert.ok(checkPage(response(html.replace('<head>','<head><meta name="robots" content="' + value + '">')),'/').length);
  }
  assert.deepEqual(checkPage({...response(html),xRobotsTag:'noindex'},'/',{allowPreviewNoindex:true}),[]);
  assert.ok(checkPage(response(html.replace('<head>','<head><meta name="robots" content="noindex">')),'/',{allowPreviewNoindex:true}).length);
});
test('reject invalid JSON-LD, empty app shells, 403 and HTTP-200 challenge pages', () => {
  const html=page('/');
  assert.ok(checkPage(response(html.replace('[{"@type"','[{broken"@type"')),'/').some(e=>e.includes('JSON-LD')));
  assert.ok(checkPage(response('<html><body><div id="root"></div></body></html>'),'/').length);
  assert.ok(checkPage({...response(html),status:403},'/').length);
  assert.ok(checkPage(response('<html><title>Access denied</title><body>Verify you are human</body></html>'),'/').length);
  assert.deepEqual(checkPage(response(html.replace('</head>','<script>const captcha = true</script></head>')),'/'),[]);
});
test('company directory cannot be used as entity sameAs', () => {
  const html=page('/').replace('"sameAs":[','"sameAs":["https://www.comino.com/en/company",');
  assert.ok(checkPage(response(html),'/').some(e=>e.includes('sameAs')));
});
test('robots handles named-agent override, groups, longest path, equal allow, wildcard and end anchor', () => {
  const rules='User-agent: *\nDisallow: /\nUser-agent: OAI-SearchBot\nUser-agent: ChatGPT-User\nAllow: /\nDisallow: /private/\nAllow: /private/public/\nDisallow: /*.pdf$\n';
  assert.equal(robotsAllows(rules,'Googlebot','/about/'),false);
  assert.equal(robotsAllows(rules,'OAI-SearchBot','/about/'),true);
  assert.equal(robotsAllows(rules,'ChatGPT-User','/private/a'),false);
  assert.equal(robotsAllows(rules,'OAI-SearchBot','/private/public/a'),true);
  assert.equal(robotsAllows(rules,'OAI-SearchBot','/file.pdf'),false);
  assert.equal(robotsAllows(rules,'OAI-SearchBot','/file.pdf/page'),true);
  assert.equal(robotsAllows('User-agent: *\nDisallow: /a\nAllow: /a','Googlebot','/a'),true);
  assert.equal(robotsAllows('User-agent: OAI-SearchBot\nDisallow: /about/\nUser-agent: OAI-SearchBot\nAllow: /about/','OAI-SearchBot','/about/'),true);
  assert.equal(robotsAllows('User-agent: *\nDisallow:','Googlebot','/'),true);
});
test('200 HTML fallback, malformed JSON and mismatched authority cannot pass as discovery data', () => {
  assert.ok(checkFile(response(page('/')),'/ai-discovery.json').length);
  assert.ok(checkFile({...response('{broken'),contentType:'application/json'},'/feed.json').length);
  assert.ok(checkFile({...response('{}'),contentType:'application/json'},'/ai-discovery.json').length);
  const data={entity:organization,authority:require('../src/data/authoritySources.json')};
  assert.deepEqual(checkFile({...response(JSON.stringify(data)),contentType:'application/json'},'/ai-discovery.json'),[]);
});
