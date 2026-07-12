const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ts = require('typescript');

const sourcePath = path.resolve(__dirname, '..', 'src', 'utils', 'seo', 'canonicalUrl.ts');
const source = fs.readFileSync(sourcePath, 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020
  }
}).outputText;
const compiledModule = { exports: {} };
vm.runInNewContext(compiled, { URL, exports: compiledModule.exports, module: compiledModule });
const { canonicalPageUrl } = compiledModule.exports;
const cases = [
  ['https://eudaemonia.tech/configurator/28?utm_source=linkedin#quote', 'https://eudaemonia.tech/configurator/28/'],
  ['/solutions/gpu-server-quote/?gclid=abc123', 'https://eudaemonia.tech/solutions/gpu-server-quote/'],
  ['/configurator-links.html?utm_campaign=rfq#section', 'https://eudaemonia.tech/configurator-links.html']
];

const errors = cases
  .map(([input, expected]) => ({ input, expected, actual: canonicalPageUrl(input) }))
  .filter((result) => result.actual !== result.expected);

if (errors.length > 0) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, checked: cases.length }, null, 2));
