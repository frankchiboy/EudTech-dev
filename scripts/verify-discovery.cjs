const fs = require('fs');
const path = require('path');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');
const { getConfiguratorSocialPreviewRoutes } = require('./configurator-social-preview-routes.cjs');

const { SITE_ORIGIN, CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();
const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';
const publicDir = path.resolve(__dirname, '..', 'public');
const pageUrl = (routePath) => canonicalPageUrl(`${siteOrigin}${routePath}`, siteOrigin);
const configuratorLinkIndexUrl = pageUrl('/configurator-links.html');
const solutionHubUrl = pageUrl('/solutions');
const solutionUrls = CONFIGURATOR_SEO_PAGES.map((page) => pageUrl(`/solutions/${page.slug}`));
const productUrls = CONFIGURATOR_PRODUCT_SEO.map((product) => pageUrl(product.configuratorHref));
const requiredPageUrls = [pageUrl('/configurator'), ...productUrls, solutionHubUrl, ...solutionUrls];
const requiredIndexUrls = [...requiredPageUrls, configuratorLinkIndexUrl];
const socialPreviewRoutes = getConfiguratorSocialPreviewRoutes();

const readPublicFile = (filename) => fs.readFileSync(path.join(publicDir, filename), 'utf8');
const collectXmlLocs = (xml) => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
const collectImageLocs = (xml) => [...xml.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map((match) => match[1].trim());
const collectFeedLinks = (xml) => [...xml.matchAll(/<link>(.*?)<\/link>/g)].map((match) => match[1].trim());
const collectJsonFeedLinks = (jsonFeed) => (jsonFeed.items || []).map((item) => item.url).filter(Boolean);

const sitemapXml = readPublicFile('sitemap.xml');
const imageSitemapXml = readPublicFile('image-sitemap.xml');
const sitemapIndexXml = readPublicFile('sitemap-index.xml');
const feedXml = readPublicFile('feed.xml');
const feedJsonText = readPublicFile('feed.json');
const llmsText = readPublicFile('llms.txt');
const llmsFullText = readPublicFile('llms-full.txt');
const robotsText = readPublicFile('robots.txt');
const headersText = readPublicFile('_headers');
const configuratorLinksHtml = readPublicFile('configurator-links.html');
const lastmodManifestText = readPublicFile('discovery-lastmod.json');
const rootDir = path.resolve(__dirname, '..');
const netlifyToml = fs.readFileSync(path.join(rootDir, 'netlify.toml'), 'utf8');
const llmsDiscoveryEdgeFunction = fs.readFileSync(path.join(rootDir, 'netlify', 'edge-functions', 'llms-discovery-headers.js'), 'utf8');

const sitemapLocs = new Set(collectXmlLocs(sitemapXml));
const imageSitemapPageLocs = new Set(collectXmlLocs(imageSitemapXml).filter((loc) => loc.startsWith(`${siteOrigin}/solutions`) || loc === `${siteOrigin}/` || loc.startsWith(`${siteOrigin}/configurator`)));
const imageSitemapImageLocs = new Set(collectImageLocs(imageSitemapXml));
const sitemapIndexLocs = new Set(collectXmlLocs(sitemapIndexXml));
const feedLinks = new Set(collectFeedLinks(feedXml));
let feedJson;
let lastmodManifest;
try {
  feedJson = JSON.parse(feedJsonText);
} catch (error) {
  feedJson = undefined;
}
try {
  lastmodManifest = JSON.parse(lastmodManifestText);
} catch (error) {
  lastmodManifest = undefined;
}
const feedJsonLinks = new Set(feedJson ? collectJsonFeedLinks(feedJson) : []);
const errors = [];

const requireAll = (label, values, predicate) => {
  values.forEach((value) => {
    if (!predicate(value)) {
      errors.push(`${label} missing ${value}`);
    }
  });
};

requireAll('sitemap.xml', requiredIndexUrls, (url) => sitemapLocs.has(url));
requireAll('image-sitemap.xml', requiredPageUrls, (url) => imageSitemapPageLocs.has(url));
requireAll('feed.xml', requiredIndexUrls, (url) => feedLinks.has(url));
requireAll('feed.json', requiredIndexUrls, (url) => feedJsonLinks.has(url));
requireAll('llms.txt', requiredIndexUrls, (url) => llmsText.includes(url));
requireAll('llms-full.txt', requiredIndexUrls, (url) => llmsFullText.includes(url));
requireAll('configurator-links.html', requiredPageUrls, (url) => configuratorLinksHtml.includes(`href="${url}"`));
requireAll('llms-full.txt product ids', CONFIGURATOR_PRODUCT_SEO.map((product) => product.productId), (productId) =>
  llmsFullText.includes(productId)
);
requireAll(
  'llms-full.txt product exposure notes',
  CONFIGURATOR_PRODUCT_SEO.flatMap((product) => (product.exposureNotes || []).map((note) => note.zh)),
  (note) => llmsFullText.includes(note)
);
requireAll(
  'llms-full.txt explicit related product urls',
  CONFIGURATOR_PRODUCT_SEO.flatMap((product) =>
    (product.relatedProductIds || [])
      .map((id) => CONFIGURATOR_PRODUCT_SEO.find((candidate) => candidate.id === id))
      .filter(Boolean)
      .map((relatedProduct) => pageUrl(relatedProduct.configuratorHref))
  ),
  (url) => llmsFullText.includes(url)
);
requireAll('llms-full.txt solution slugs', CONFIGURATOR_SEO_PAGES.map((page) => page.slug), (slug) => llmsFullText.includes(slug));
requireAll('sitemap-index.xml', [`${siteOrigin}/sitemap.xml`, `${siteOrigin}/image-sitemap.xml`, `${siteOrigin}/feed.xml`], (url) => sitemapIndexLocs.has(url));
requireAll('robots.txt', [`${siteOrigin}/sitemap.xml`, `${siteOrigin}/image-sitemap.xml`, `${siteOrigin}/feed.xml`, `${siteOrigin}/sitemap-index.xml`], (url) =>
  robotsText.includes(`Sitemap: ${url}`)
);
requireAll('image-sitemap.xml page loc', socialPreviewRoutes.map((route) => route.canonicalUrl), (url) => imageSitemapPageLocs.has(url));
requireAll('image-sitemap.xml image loc', socialPreviewRoutes.map((route) => route.socialImageUrl), (url) => imageSitemapImageLocs.has(url));

for (const route of socialPreviewRoutes) {
  const imagePath = path.join(publicDir, decodeURIComponent(route.socialImage.replace(/^\//, '')));
  if (!fs.existsSync(imagePath)) {
    errors.push(`missing social preview image file ${route.socialImage}`);
  }
}

if (/<image:(?:title|caption)>/i.test(imageSitemapXml)) {
  errors.push('image-sitemap.xml should not include deprecated image:title or image:caption tags');
}

const requiredHeaderRules = [
  '/build-meta.json',
  '/robots.txt',
  '/sitemap.xml',
  '/sitemap-index.xml',
  '/image-sitemap.xml',
  '/feed.xml',
  '/feed.json',
  '/discovery-lastmod.json',
  '/configurator-links.html',
  '/llms*.txt',
  '/social/configurator/*',
  '/assets/*'
];

requireAll('public/_headers', requiredHeaderRules, (rule) => headersText.includes(rule));

if (!/\/social\/configurator\/\*[\s\S]*max-age=86400[\s\S]*stale-while-revalidate=604800/i.test(headersText)) {
  errors.push('public/_headers missing social preview cache-control rule.');
}

if (!/\/sitemap\.xml[\s\S]*max-age=3600[\s\S]*must-revalidate/i.test(headersText)) {
  errors.push('public/_headers missing sitemap cache-control rule.');
}

if (!/\/sitemap-index\.xml[\s\S]*max-age=3600[\s\S]*must-revalidate/i.test(headersText)) {
  errors.push('public/_headers missing sitemap index cache-control rule.');
}

if (!/\/feed\.json[\s\S]*max-age=3600[\s\S]*must-revalidate/i.test(headersText)) {
  errors.push('public/_headers missing JSON feed cache-control rule.');
}

if (!/\/discovery-lastmod\.json[\s\S]*max-age=3600[\s\S]*must-revalidate/i.test(headersText)) {
  errors.push('public/_headers missing discovery manifest cache-control rule.');
}

if (!/\/configurator-links\.html[\s\S]*max-age=3600[\s\S]*must-revalidate/i.test(headersText)) {
  errors.push('public/_headers missing configurator link index cache-control rule.');
}

if (!feedJson || feedJson.version !== 'https://jsonfeed.org/version/1.1') {
  errors.push('feed.json missing valid JSON Feed version.');
}

if (!lastmodManifest || lastmodManifest.version !== 1 || !lastmodManifest.entries) {
  errors.push('discovery-lastmod.json missing a valid manifest.');
} else {
  requiredIndexUrls.forEach((url) => {
    const metadata = lastmodManifest.entries[url];
    const sitemapEntry = sitemapXml.match(new RegExp(`<url>\\s*<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>\\s*<lastmod>([^<]+)</lastmod>`, 'i'));
    if (!metadata || !/^\d{4}-\d{2}-\d{2}$/.test(metadata.modifiedAt || '') || !/^[a-f0-9]{64}$/i.test(metadata.hash || '')) {
      errors.push(`discovery-lastmod.json missing valid metadata for ${url}`);
    } else if (!sitemapEntry || sitemapEntry[1] !== metadata.modifiedAt) {
      errors.push(`sitemap.xml lastmod does not match manifest for ${url}`);
    }
  });
  (feedJson?.items || []).forEach((item) => {
    const metadata = lastmodManifest.entries[item.url];
    if (metadata && item.date_modified !== `${metadata.modifiedAt}T00:00:00+08:00`) {
      errors.push(`feed.json date_modified does not match manifest for ${item.url}`);
    }
  });
}

if (!/\/build-meta\.json[\s\S]*max-age=0[\s\S]*must-revalidate/i.test(headersText)) {
  errors.push('public/_headers missing build metadata cache-control rule.');
}

if (!configuratorLinksHtml.includes(`<link rel="canonical" href="${configuratorLinkIndexUrl}">`)) {
  errors.push('configurator-links.html missing canonical link.');
}

if (!configuratorLinksHtml.includes(`<link rel="alternate" type="application/rss+xml" title="EudTech Configurator Updates" href="${siteOrigin}/feed.xml">`)) {
  errors.push('configurator-links.html missing RSS alternate link.');
}

if (!configuratorLinksHtml.includes(`<link rel="alternate" type="application/feed+json" title="EudTech Configurator Updates" href="${siteOrigin}/feed.json">`)) {
  errors.push('configurator-links.html missing JSON feed alternate link.');
}

if (!configuratorLinksHtml.includes(`<link rel="alternate" type="text/markdown" title="EudTech LLM Summary" href="${siteOrigin}/llms.txt">`)) {
  errors.push('configurator-links.html missing llms.txt alternate link.');
}

if (!configuratorLinksHtml.includes(`<link rel="alternate" type="text/markdown" title="EudTech Full LLM Context" href="${siteOrigin}/llms-full.txt">`)) {
  errors.push('configurator-links.html missing llms-full.txt alternate link.');
}

if (!netlifyToml.includes('function = "llms-discovery-headers"')) {
  errors.push('netlify.toml missing llms discovery edge function.');
}

if (!llmsDiscoveryEdgeFunction.includes('rel="llms-txt"') || !llmsDiscoveryEdgeFunction.includes('rel="llms-full-txt"')) {
  errors.push('llms discovery edge function missing Link header values.');
}

if (!llmsDiscoveryEdgeFunction.includes('X-Llms-Txt')) {
  errors.push('llms discovery edge function missing X-Llms-Txt header.');
}

if (!/<meta name="robots" content="index, follow">/i.test(configuratorLinksHtml)) {
  errors.push('configurator-links.html should be index, follow.');
}

if (!configuratorLinksHtml.includes('application/ld+json')) {
  errors.push('configurator-links.html missing JSON-LD.');
}

const duplicateSlugs = CONFIGURATOR_SEO_PAGES.filter(
  (page, index, pages) => pages.findIndex((item) => item.slug === page.slug) !== index
).map((page) => page.slug);
if (duplicateSlugs.length > 0) {
  errors.push(`duplicate solution slugs: ${duplicateSlugs.join(', ')}`);
}

if (errors.length > 0) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      solutionPageCount: CONFIGURATOR_SEO_PAGES.length,
      configuratorProductPages: CONFIGURATOR_PRODUCT_SEO.length,
      checkedUrls: requiredIndexUrls.length,
      configuratorLinkIndex: true,
      socialPreviewImages: socialPreviewRoutes.length,
      sitemapIndexCount: sitemapIndexLocs.size,
      jsonFeed: true,
      llmsFull: true
    },
    null,
    2
  )
);
