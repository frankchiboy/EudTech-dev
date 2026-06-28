const fs = require('fs');
const path = require('path');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const {
  SOCIAL_IMAGE_WIDTH,
  SOCIAL_IMAGE_HEIGHT,
  getConfiguratorSocialPreviewRoutes
} = require('./configurator-social-preview-routes.cjs');

const distDir = path.resolve(__dirname, '..', 'dist');
const { CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();
const expectedRoutes = getConfiguratorSocialPreviewRoutes();

function readRouteHtml(routePath) {
  const htmlPath = path.join(distDir, ...routePath.split('/').filter(Boolean), 'index.html');
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Missing static SEO HTML: ${routePath}`);
  }

  return fs.readFileSync(htmlPath, 'utf8');
}

function collectJsonLd(routePath, html) {
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

function getMetaContent(html, attribute, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<meta[^>]+${attribute}=["']${escapedName}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i');
  return html.match(pattern)?.[1] || '';
}

function getCanonicalHref(html) {
  return html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i)?.[1] || '';
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

function requireEqual(routePath, label, actual, expected) {
  if (actual !== expected) {
    throw new Error(`${routePath} ${label} is ${actual || 'missing'}, expected ${expected}.`);
  }
}

function requireNonEmpty(routePath, label, actual) {
  if (!actual) {
    throw new Error(`${routePath} missing ${label}.`);
  }
}

function assertSocialMeta(route) {
  const html = readRouteHtml(route.path);
  const canonical = getCanonicalHref(html);
  const description = getMetaContent(html, 'name', 'description');
  const robots = getMetaContent(html, 'name', 'robots');
  const ogTitle = getMetaContent(html, 'property', 'og:title');
  const ogDescription = getMetaContent(html, 'property', 'og:description');
  const ogImage = getMetaContent(html, 'property', 'og:image');
  const ogImageAlt = getMetaContent(html, 'property', 'og:image:alt');
  const ogImageWidth = getMetaContent(html, 'property', 'og:image:width');
  const ogImageHeight = getMetaContent(html, 'property', 'og:image:height');
  const ogUrl = getMetaContent(html, 'property', 'og:url');
  const ogType = getMetaContent(html, 'property', 'og:type');
  const ogSiteName = getMetaContent(html, 'property', 'og:site_name');
  const ogLocale = getMetaContent(html, 'property', 'og:locale');
  const twitterCard = getMetaContent(html, 'name', 'twitter:card');
  const twitterTitle = getMetaContent(html, 'name', 'twitter:title');
  const twitterDescription = getMetaContent(html, 'name', 'twitter:description');
  const twitterImage = getMetaContent(html, 'name', 'twitter:image');
  const twitterImageAlt = getMetaContent(html, 'name', 'twitter:image:alt');
  const twitterUrl = getMetaContent(html, 'name', 'twitter:url');
  const expectedUrl = route.canonicalUrl;

  requireEqual(route.path, 'canonical', canonical, expectedUrl);
  requireEqual(route.path, 'og:url', ogUrl, expectedUrl);
  requireEqual(route.path, 'twitter:url', twitterUrl, expectedUrl);
  requireEqual(route.path, 'og:image', ogImage, route.socialImageUrl);
  requireEqual(route.path, 'twitter:image', twitterImage, route.socialImageUrl);
  requireEqual(route.path, 'og:image:alt', ogImageAlt, route.imageAlt);
  requireEqual(route.path, 'twitter:image:alt', twitterImageAlt, route.imageAlt);
  requireEqual(route.path, 'og:image:width', ogImageWidth, String(SOCIAL_IMAGE_WIDTH));
  requireEqual(route.path, 'og:image:height', ogImageHeight, String(SOCIAL_IMAGE_HEIGHT));
  requireEqual(route.path, 'og:type', ogType, route.ogType);
  requireEqual(route.path, 'og:site_name', ogSiteName, 'EudTech');
  requireEqual(route.path, 'og:locale', ogLocale, 'zh_TW');
  requireEqual(route.path, 'twitter:card', twitterCard, 'summary_large_image');
  requireNonEmpty(route.path, 'description', description);
  requireNonEmpty(route.path, 'og:title', ogTitle);
  requireNonEmpty(route.path, 'og:description', ogDescription);
  requireNonEmpty(route.path, 'twitter:title', twitterTitle);
  requireNonEmpty(route.path, 'twitter:description', twitterDescription);

  if (!/index/i.test(robots) || !/follow/i.test(robots)) {
    throw new Error(`${route.path} robots meta should include index, follow.`);
  }

  return { html, jsonLd: collectJsonLd(route.path, html) };
}

function assertConfiguratorProduct(routePath, expectedProductId, items) {
  requireType(routePath, items, 'WebApplication');
  requireType(routePath, items, 'BreadcrumbList');
  requireType(routePath, items, 'Service');

  if (hasType(items, 'Product')) {
    throw new Error(`Configurator quote page should not emit Product rich-result JSON-LD without public price/review data: ${routePath}`);
  }

  const service = items.find((item) => item?.['@type'] === 'Service');
  if (service.identifier !== expectedProductId) {
    throw new Error(`Unexpected Service identifier in ${routePath}: ${service.identifier}`);
  }

  requireQuoteAction(routePath, service);
}

for (const route of expectedRoutes) {
  const { jsonLd } = assertSocialMeta(route);
  if (route.productId) {
    assertConfiguratorProduct(route.path, route.productId, jsonLd);
  }
}

for (const page of CONFIGURATOR_SEO_PAGES) {
  const routePath = `/solutions/${page.slug}`;
  const html = readRouteHtml(routePath);
  const items = collectJsonLd(routePath, html);
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
      solutionPages: CONFIGURATOR_SEO_PAGES.length,
      checkedStaticRoutes: expectedRoutes.length,
      checkedSocialPreviewTags: true
    },
    null,
    2
  )
);
