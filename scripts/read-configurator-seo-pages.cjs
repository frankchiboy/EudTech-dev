const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ts = require('typescript');

function readConfiguratorSeoPages() {
  const sourcePath = path.resolve(__dirname, '..', 'src', 'data', 'configuratorSeoPages.ts');
  const source = fs.readFileSync(sourcePath, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    }
  }).outputText;

  const module = { exports: {} };
  vm.runInNewContext(compiled, {
    exports: module.exports,
    module,
    require,
    console
  });

  return {
    SITE_ORIGIN: module.exports.SITE_ORIGIN,
    CONFIGURATOR_SEO_PAGES: module.exports.CONFIGURATOR_SEO_PAGES
  };
}

module.exports = { readConfiguratorSeoPages };
