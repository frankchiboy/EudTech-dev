const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
const { buildSync } = require('esbuild');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');

function load(entry) {
  const filename = path.resolve(__dirname, entry);
  const { outputFiles } = buildSync({ entryPoints:[filename], bundle:true, write:false, platform:'node', format:'cjs', jsx:'automatic', external:['react','react-dom','react-router-dom','react-router-dom/server'] });
  const compiled = new Module(filename, module);
  compiled.filename = filename;
  compiled.paths = module.paths;
  compiled._compile(outputFiles[0].text, filename);
  return compiled.exports;
}
const { canonicalNavigationPath } = load('../src/utils/seo/navigationUrl.ts');
const { languagePath } = load('../src/utils/seo/languageUrl.ts');
const { SiteLink } = load('../src/components/common/SiteLink.tsx');
test('navigation preserves encoded query values and fragments while normalizing published paths', () => {
  assert.equal(canonicalNavigationPath('/configurator/28?request=true&utm_campaign=a%26b#quote'),'/configurator/28/?request=true&utm_campaign=a%26b#quote');
  assert.equal(canonicalNavigationPath('/en//contact#contact-options'),'/en/contact/#contact-options');
  assert.equal(canonicalNavigationPath('/about/'),'/about/');
});
test('external links, file downloads, operational paths and relative links stay untouched', () => {
  for (const value of ['mailto:quote@eudaemonia.tech','https://example.com/contact','//example.com/contact','/api/comino-configurator','/.netlify/functions/send-email','/vendor/comino/documents/file.pdf','../contact','#quote','?request=true']) {
    assert.equal(canonicalNavigationPath(value),value);
  }
});
test('language switching is canonical and reversible without losing inquiry parameters', () => {
  const zh='/configurator/28/?request=true#quote';
  assert.equal(languagePath(zh,true),'/en' + zh);
  assert.equal(languagePath(languagePath(zh,true),false),zh);
  assert.equal(languagePath('/en',true),'/en/');
  assert.equal(languagePath('/en/',false),'/');
});
test('router links preserve basename, state-independent destination, query, hash, and new-tab semantics', () => {
  const render=(basename,to,extra={})=>renderToStaticMarkup(React.createElement(StaticRouter,{basename,location:basename},React.createElement(SiteLink,{to,...extra},'Contact')));
  assert.match(render('/','/contact'),/href="\/contact\/"/);
  assert.match(render('/en/','/contact'),/href="\/en\/contact\/"/);
  assert.match(render('/en/','/'),/href="\/en\/"/);
  assert.match(render('/en/',{pathname:'/configurator/28',search:'?request=true',hash:'#quote'}),/href="\/en\/configurator\/28\/\?request=true#quote"/);
  assert.match(render('/','/contact',{target:'_blank',rel:'noopener'}),/target="_blank"/);
});
