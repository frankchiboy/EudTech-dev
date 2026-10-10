const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ts = require('typescript');
const { createRequire } = require('node:module');

function readConfiguratorSeoPages() {
  const sourcePath = path.resolve(__dirname, '..', 'src', 'data', 'configuratorSeoPages.ts');
  const source = fs.readFileSync(sourcePath, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
      target: ts.ScriptTarget.ES2020
    }
  }).outputText;

  const module = { exports: {} };
  vm.runInNewContext(compiled, {
    exports: module.exports,
    module,
    require: createRequire(sourcePath),
    URL,
    console
  });

  const productSourcePath = path.resolve(__dirname, '..', 'src', 'data', 'configuratorProductSeo.ts');
  const productSource = fs.readFileSync(productSourcePath, 'utf8');
  const productCompiled = ts.transpileModule(productSource, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    }
  }).outputText;

  const productModule = { exports: {} };
  vm.runInNewContext(productCompiled, {
    exports: productModule.exports,
    module: productModule,
    require,
    console
  });

  return {
    SITE_ORIGIN: module.exports.SITE_ORIGIN,
    CONFIGURATOR_SEO_PAGES: module.exports.CONFIGURATOR_SEO_PAGES,
    getRelatedConfiguratorSeoPages: module.exports.getRelatedConfiguratorSeoPages,
    getConfiguratorGuideSources: module.exports.getConfiguratorGuideSources,
    getConfiguratorGuideSourceHref: module.exports.getConfiguratorGuideSourceHref,
    CONFIGURATOR_PRODUCT_SEO: productModule.exports.CONFIGURATOR_PRODUCT_SEO
  };
}

module.exports = { readConfiguratorSeoPages };
