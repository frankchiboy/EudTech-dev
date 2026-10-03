const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ts = require('typescript');
const { createRequire } = require('module');

function readPublicProducts(english = false) {
  const source = path.resolve(__dirname, '../src/data/productData.ts');
  const compiled = ts.transpileModule(fs.readFileSync(source, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true }
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(compiled, { module, exports: module.exports, require: createRequire(source) });
  return ['getEudTechProducts', 'getCominoProducts', 'getCyabraProducts']
    .flatMap(key => module.exports[key](english))
    .filter(product => !product.comingSoon)
    .map(({ icon, ...product }) => product);
}
module.exports = { readPublicProducts };
