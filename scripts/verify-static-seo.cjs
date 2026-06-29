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
const MIN_STATIC_SEO_TEXT_LENGTH = 1200;
const MIN_STATIC_SEO_HIGHLIGHTS = 3;
const MIN_STATIC_SEO_SPEC_ROWS = 3;
const MIN_STATIC_SEO_CHECKLIST_ITEMS = 3;
const MIN_STATIC_SEO_FAQ_ITEMS = 4;
const MIN_STATIC_SEO_RELATED_LINKS = 4;

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

function getRssAlternateHref(html) {
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const rssLink = links.find(
    (tag) =>
      /rel=["'][^"']*\balternate\b[^"']*["']/i.test(tag) &&
      /type=["']application\/rss\+xml["']/i.test(tag)
  );
  return rssLink?.match(/href=["']([^"']+)["']/i)?.[1] || '';
}

function hasType(items, type) {
  return items.some((item) => item && item['@type'] === type);
}

function findType(items, type) {
  return items.find((item) => item && item['@type'] === type);
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

function bodyText(html) {
  return (html.match(/<body[\s\S]*?<\/body>/i)?.[0] || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function relatedInternalLinks(html) {
  const section = html.match(/<section[^>]+aria-labelledby=["']static-seo-related["'][\s\S]*?<\/section>/i)?.[0] || '';
  return [...section.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({
      href: match[1],
      text: match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    }));
}

function staticSection(html, id) {
  return html.match(new RegExp(`<section[^>]+aria-labelledby=["']${id}["'][\\s\\S]*?<\\/section>`, 'i'))?.[0] || '';
}

function htmlText(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function listItemCount(html, sectionId) {
  return [...staticSection(html, sectionId).matchAll(/<li\b/gi)].length;
}

function tableRowCount(html, sectionId) {
  return [...staticSection(html, sectionId).matchAll(/<tr\b/gi)].length;
}

function visibleFaqQuestions(html) {
  return [...staticSection(html, 'static-seo-faq').matchAll(/<li\b[^>]*>\s*<strong>([\s\S]*?)<\/strong>/gi)]
    .map((match) => htmlText(match[1]))
    .filter(Boolean);
}

function requireAtLeast(routePath, label, actual, expected) {
  if (actual < expected) {
    throw new Error(`${routePath} static SEO ${label} needs at least ${expected}; found ${actual}.`);
  }
}

function assertFaqSchema(routePath, questions, items) {
  const faqSchema = findType(items, 'FAQPage');
  if (!faqSchema) {
    throw new Error(`${routePath} missing FAQPage JSON-LD for visible static SEO FAQs.`);
  }

  const schemaQuestions = (faqSchema.mainEntity || []).map((item) => item.name).filter(Boolean);
  requireAtLeast(routePath, 'FAQ schema entries', schemaQuestions.length, MIN_STATIC_SEO_FAQ_ITEMS);

  const missingQuestions = questions.filter((question) => !schemaQuestions.includes(question));
  if (missingQuestions.length > 0) {
    throw new Error(`${routePath} FAQPage JSON-LD is missing visible FAQ questions: ${missingQuestions.join(', ')}`);
  }
}

function assertStaticSeoFallback(route, jsonLd) {
  const html = readRouteHtml(route.path);
  if (!html.includes('data-static-seo-fallback')) {
    throw new Error(`${route.path} missing static SEO body fallback.`);
  }

  const text = bodyText(html);
  if (text.length < MIN_STATIC_SEO_TEXT_LENGTH) {
    throw new Error(`${route.path} static SEO body fallback is too short: ${text.length} characters.`);
  }

  if (!text.includes(route.title)) {
    throw new Error(`${route.path} static SEO body fallback missing title text.`);
  }

  if (!text.includes('info@eudaemonia.tech')) {
    throw new Error(`${route.path} static SEO body fallback missing quote contact email.`);
  }

  requireAtLeast(route.path, 'highlight items', listItemCount(html, 'static-seo-highlights'), MIN_STATIC_SEO_HIGHLIGHTS);
  requireAtLeast(route.path, 'spec rows', tableRowCount(html, 'static-seo-specs'), MIN_STATIC_SEO_SPEC_ROWS);
  requireAtLeast(route.path, 'checklist items', listItemCount(html, 'static-seo-checklist'), MIN_STATIC_SEO_CHECKLIST_ITEMS);

  const faqQuestions = visibleFaqQuestions(html);
  requireAtLeast(route.path, 'FAQ items', faqQuestions.length, MIN_STATIC_SEO_FAQ_ITEMS);
  assertFaqSchema(route.path, faqQuestions, jsonLd);

  const links = relatedInternalLinks(html);
  if (links.length < MIN_STATIC_SEO_RELATED_LINKS) {
    throw new Error(`${route.path} static SEO body fallback needs at least ${MIN_STATIC_SEO_RELATED_LINKS} related internal links; found ${links.length}.`);
  }

  const invalidLinks = links.filter((link) => !link.href.startsWith('https://eudaemonia.tech/') || !link.text);
  if (invalidLinks.length > 0) {
    throw new Error(`${route.path} static SEO related links must use crawlable EudTech URLs and anchor text.`);
  }

  const selfLinks = links.filter((link) => link.href === route.canonicalUrl);
  if (selfLinks.length > 0) {
    throw new Error(`${route.path} static SEO related links should not point to the same canonical URL.`);
  }
}

function assertSocialMeta(route) {
  const html = readRouteHtml(route.path);
  const jsonLd = collectJsonLd(route.path, html);
  const canonical = getCanonicalHref(html);
  const rssAlternate = getRssAlternateHref(html);
  const description = getMetaContent(html, 'name', 'description');
  const robots = getMetaContent(html, 'name', 'robots');
  const ogTitle = getMetaContent(html, 'property', 'og:title');
  const ogDescription = getMetaContent(html, 'property', 'og:description');
  const ogImage = getMetaContent(html, 'property', 'og:image');
  const ogImageSecureUrl = getMetaContent(html, 'property', 'og:image:secure_url');
  const ogImageAlt = getMetaContent(html, 'property', 'og:image:alt');
  const ogImageWidth = getMetaContent(html, 'property', 'og:image:width');
  const ogImageHeight = getMetaContent(html, 'property', 'og:image:height');
  const ogUrl = getMetaContent(html, 'property', 'og:url');
  const ogType = getMetaContent(html, 'property', 'og:type');
  const ogSiteName = getMetaContent(html, 'property', 'og:site_name');
  const ogLocale = getMetaContent(html, 'property', 'og:locale');
  const articlePublishedTime = getMetaContent(html, 'property', 'article:published_time');
  const articleModifiedTime = getMetaContent(html, 'property', 'article:modified_time');
  const twitterCard = getMetaContent(html, 'name', 'twitter:card');
  const twitterTitle = getMetaContent(html, 'name', 'twitter:title');
  const twitterDescription = getMetaContent(html, 'name', 'twitter:description');
  const twitterImage = getMetaContent(html, 'name', 'twitter:image');
  const twitterImageAlt = getMetaContent(html, 'name', 'twitter:image:alt');
  const twitterUrl = getMetaContent(html, 'name', 'twitter:url');
  const expectedUrl = route.canonicalUrl;

  requireEqual(route.path, 'canonical', canonical, expectedUrl);
  requireEqual(route.path, 'RSS alternate link', rssAlternate, `${new URL(expectedUrl).origin}/feed.xml`);
  requireEqual(route.path, 'og:url', ogUrl, expectedUrl);
  requireEqual(route.path, 'twitter:url', twitterUrl, expectedUrl);
  requireEqual(route.path, 'og:image', ogImage, route.socialImageUrl);
  requireEqual(route.path, 'og:image:secure_url', ogImageSecureUrl, route.socialImageUrl);
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
  assertStaticSeoFallback(route, jsonLd);

  if (!/index/i.test(robots) || !/follow/i.test(robots)) {
    throw new Error(`${route.path} robots meta should include index, follow.`);
  }

  if (route.ogType === 'article') {
    requireNonEmpty(route.path, 'article:published_time', articlePublishedTime);
    requireNonEmpty(route.path, 'article:modified_time', articleModifiedTime);
  }

  return { html, jsonLd };
}

function assertWebPageSchema(routePath, expectedUrl, expectedImage, items) {
  const expectedType = routePath === '/solutions' ? 'CollectionPage' : 'WebPage';
  const schema = findType(items, expectedType);

  if (!schema) {
    throw new Error(`Missing ${expectedType} page JSON-LD in ${routePath}`);
  }

  requireEqual(routePath, `${expectedType} url`, schema.url, expectedUrl);
  requireEqual(routePath, `${expectedType} @id`, schema['@id'], `${expectedUrl}#webpage`);
  requireEqual(routePath, `${expectedType} inLanguage`, schema.inLanguage, 'zh-TW');
  requireEqual(routePath, `${expectedType} image`, schema.primaryImageOfPage?.url, expectedImage);
  requireEqual(routePath, `${expectedType} image width`, String(schema.primaryImageOfPage?.width), String(SOCIAL_IMAGE_WIDTH));
  requireEqual(routePath, `${expectedType} image height`, String(schema.primaryImageOfPage?.height), String(SOCIAL_IMAGE_HEIGHT));
  requireNonEmpty(routePath, `${expectedType} image caption`, schema.primaryImageOfPage?.caption);

  if (!schema.publisher?.['@id']?.endsWith('#organization')) {
    throw new Error(`${routePath} ${expectedType} publisher should point to #organization.`);
  }

  if (!schema.isPartOf?.['@id']?.endsWith('#website')) {
    throw new Error(`${routePath} ${expectedType} isPartOf should point to #website.`);
  }
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
  assertWebPageSchema(route.path, route.canonicalUrl, route.socialImageUrl, jsonLd);
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
      checkedSocialPreviewTags: true,
      checkedRelatedInternalLinks: true
    },
    null,
    2
  )
);
