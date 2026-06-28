const fs = require('fs');
const path = require('path');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');
const { getConfiguratorSocialPreviewRoutes } = require('./configurator-social-preview-routes.cjs');

const { SITE_ORIGIN, CONFIGURATOR_SEO_PAGES } = readConfiguratorSeoPages();
const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';
const publicDir = path.resolve(__dirname, '..', 'public');
const pageUrl = (routePath) => canonicalPageUrl(`${siteOrigin}${routePath}`, siteOrigin);
const solutionHubUrl = pageUrl('/solutions');
const solutionUrls = CONFIGURATOR_SEO_PAGES.map((page) => pageUrl(`/solutions/${page.slug}`));
const requiredSolutionUrls = [solutionHubUrl, ...solutionUrls];
const socialPreviewRoutes = getConfiguratorSocialPreviewRoutes();

const readPublicFile = (filename) => fs.readFileSync(path.join(publicDir, filename), 'utf8');
const collectXmlLocs = (xml) => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
const collectImageLocs = (xml) => [...xml.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map((match) => match[1].trim());
const collectFeedLinks = (xml) => [...xml.matchAll(/<link>(.*?)<\/link>/g)].map((match) => match[1].trim());

const sitemapXml = readPublicFile('sitemap.xml');
const imageSitemapXml = readPublicFile('image-sitemap.xml');
const sitemapIndexXml = readPublicFile('sitemap-index.xml');
const feedXml = readPublicFile('feed.xml');
const llmsText = readPublicFile('llms.txt');
const robotsText = readPublicFile('robots.txt');

const sitemapLocs = new Set(collectXmlLocs(sitemapXml));
const imageSitemapPageLocs = new Set(collectXmlLocs(imageSitemapXml).filter((loc) => loc.startsWith(`${siteOrigin}/solutions`) || loc === `${siteOrigin}/` || loc.startsWith(`${siteOrigin}/configurator`)));
const imageSitemapImageLocs = new Set(collectImageLocs(imageSitemapXml));
const sitemapIndexLocs = new Set(collectXmlLocs(sitemapIndexXml));
const feedLinks = new Set(collectFeedLinks(feedXml));
const errors = [];

const requireAll = (label, values, predicate) => {
  values.forEach((value) => {
    if (!predicate(value)) {
      errors.push(`${label} missing ${value}`);
    }
  });
};

requireAll('sitemap.xml', requiredSolutionUrls, (url) => sitemapLocs.has(url));
requireAll('image-sitemap.xml', requiredSolutionUrls, (url) => imageSitemapPageLocs.has(url));
requireAll('feed.xml', requiredSolutionUrls, (url) => feedLinks.has(url));
requireAll('llms.txt', requiredSolutionUrls, (url) => llmsText.includes(url));
requireAll('sitemap-index.xml', [`${siteOrigin}/sitemap.xml`, `${siteOrigin}/image-sitemap.xml`], (url) => sitemapIndexLocs.has(url));
requireAll('robots.txt', [`${siteOrigin}/sitemap.xml`, `${siteOrigin}/image-sitemap.xml`, `${siteOrigin}/sitemap-index.xml`], (url) =>
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
      checkedUrls: requiredSolutionUrls.length,
      socialPreviewImages: socialPreviewRoutes.length,
      sitemapIndexCount: sitemapIndexLocs.size
    },
    null,
    2
  )
);
