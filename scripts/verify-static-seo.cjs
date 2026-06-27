const fs = require('fs');
const path = require('path');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');

const distDir = path.resolve(__dirname, '..', 'dist');
const { CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();

function readRouteHtml(routePath) {
  const htmlPath = path.join(distDir, ...routePath.split('/').filter(Boolean), 'index.html');
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Missing static SEO HTML: ${routePath}`);
  }

  return fs.readFileSync(htmlPath, 'utf8');
}

function collectJsonLd(routePath) {
  const html = readRouteHtml(routePath);
  const matches = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (!matches.length) {
    throw new Error(`Missing JSON-LD scripts: ${routePath}`);
  }

  return matches.map((match) => {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      throw new Error(`Invalid JSON-LD in ${routePath}: ${error.message}`);
    }
  });
}

function hasType(items, type) {
  return items.some((item) => item && item['@type'] === type);
}

function requireType(routePath, items, type) {
  if (!hasType(items, type)) {
    throw new Error(`Missing ${type} JSON-LD in ${routePath}`);
  }
}

function requireQuoteAction(routePath, item) {
  if (!item?.potentialAction || item.potentialAction['@type'] !== 'QuoteAction' || !item.potentialAction.target) {
    throw new Error(`Missing QuoteAction target in ${routePath}`);
  }
}

function assertConfiguratorProduct(routePath, expectedProductId) {
  const items = collectJsonLd(routePath);
  requireType(routePath, items, 'WebApplication');
  requireType(routePath, items, 'BreadcrumbList');
  requireType(routePath, items, 'Product');

  const product = items.find((item) => item?.['@type'] === 'Product');
  if (product.productID !== expectedProductId) {
    throw new Error(`Unexpected Product productID in ${routePath}: ${product.productID}`);
  }
  if (product.offers) {
    throw new Error(`Configurator product should not emit Offer without a public price: ${routePath}`);
  }

  requireQuoteAction(routePath, product);
}

for (const product of CONFIGURATOR_PRODUCT_SEO) {
  assertConfiguratorProduct(product.configuratorHref, product.productId);
}

for (const page of CONFIGURATOR_SEO_PAGES) {
  const routePath = `/solutions/${page.slug}`;
  const items = collectJsonLd(routePath);
  requireType(routePath, items, 'BreadcrumbList');
  requireType(routePath, items, page.kind === 'comparison' || page.kind === 'guide' || page.kind === 'checklist' ? 'Article' : 'Service');
  requireType(routePath, items, 'FAQPage');

  const service = items.find((item) => item?.['@type'] === 'Service');
  if (service) {
    requireQuoteAction(routePath, service);
  }
}

console.log(
  JSON.stringify(
    {
      ok: true,
      configuratorProductPages: CONFIGURATOR_PRODUCT_SEO.length,
      solutionPages: CONFIGURATOR_SEO_PAGES.length
    },
    null,
    2
  )
);
