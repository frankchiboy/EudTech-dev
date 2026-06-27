const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');

const { SITE_ORIGIN, CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();
const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';
const requiredPageUrls = [
  canonicalPageUrl(`${siteOrigin}/configurator`, siteOrigin),
  ...CONFIGURATOR_PRODUCT_SEO.map((product) => canonicalPageUrl(`${siteOrigin}${product.configuratorHref}`, siteOrigin)),
  canonicalPageUrl(`${siteOrigin}/solutions`, siteOrigin),
  ...CONFIGURATOR_SEO_PAGES.map((page) => canonicalPageUrl(`${siteOrigin}/solutions/${page.slug}`, siteOrigin))
];
const requiredDiscoveryUrls = [
  `${siteOrigin}/robots.txt`,
  `${siteOrigin}/sitemap-index.xml`,
  `${siteOrigin}/sitemap.xml`,
  `${siteOrigin}/image-sitemap.xml`,
  `${siteOrigin}/feed.xml`,
  `${siteOrigin}/llms.txt`
];

function unique(values) {
  return [...new Set(values)];
}

async function fetchText(url, options = {}) {
  const cacheBustedUrl = options.cacheBust === false ? url : `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
  const response = await fetch(cacheBustedUrl, {
    redirect: options.redirect || 'follow',
    cache: 'no-store'
  });
  const text = await response.text();
  return {
    url,
    status: response.status,
    redirected: response.redirected,
    finalUrl: response.url.replace(/[?&]t=\d+$/, ''),
    location: response.headers.get('location'),
    text
  };
}

function collectXmlLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
}

function collectJsonLd(html) {
  return [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g)].map((match) => {
    try {
      return JSON.parse(match[1]);
    } catch {
      return null;
    }
  }).filter(Boolean);
}

function getMetaContent(html, selector) {
  return html.match(selector)?.[1] || '';
}

function assert(condition, errors, message) {
  if (!condition) {
    errors.push(message);
  }
}

async function checkRedirects(errors) {
  const checks = [
    [`${siteOrigin}/configurator`, canonicalPageUrl(`${siteOrigin}/configurator`, siteOrigin)],
    [`${siteOrigin}/configurator/28`, canonicalPageUrl(`${siteOrigin}/configurator/28`, siteOrigin)],
    [`${siteOrigin}/configurator/29`, canonicalPageUrl(`${siteOrigin}/configurator/29`, siteOrigin)],
    [`${siteOrigin}/solutions`, canonicalPageUrl(`${siteOrigin}/solutions`, siteOrigin)],
    [`${siteOrigin}/solutions/gpu-server-quote`, canonicalPageUrl(`${siteOrigin}/solutions/gpu-server-quote`, siteOrigin)]
  ];

  const results = [];
  for (const [url, expectedLocation] of checks) {
    const result = await fetchText(url, { redirect: 'manual', cacheBust: false });
    results.push({
      url,
      status: result.status,
      location: result.location
    });
    assert(result.status === 301 || result.status === 308, errors, `${url} should redirect to canonical page URL.`);
    assert(result.location === new URL(expectedLocation).pathname, errors, `${url} redirects to ${result.location}, expected ${new URL(expectedLocation).pathname}.`);
  }

  return results;
}

function checkDiscoveryFiles(discovery, errors) {
  const robots = discovery.find((item) => item.url.endsWith('/robots.txt'))?.text || '';
  const sitemapIndex = discovery.find((item) => item.url.endsWith('/sitemap-index.xml'))?.text || '';
  const sitemap = discovery.find((item) => item.url.endsWith('/sitemap.xml'))?.text || '';
  const imageSitemap = discovery.find((item) => item.url.endsWith('/image-sitemap.xml'))?.text || '';
  const feed = discovery.find((item) => item.url.endsWith('/feed.xml'))?.text || '';
  const llms = discovery.find((item) => item.url.endsWith('/llms.txt'))?.text || '';
  const sitemapLocs = new Set(collectXmlLocs(sitemap));
  const imageSitemapLocs = new Set(collectXmlLocs(imageSitemap).filter((loc) => loc.startsWith(siteOrigin) && !/\.(jpg|jpeg|png|webp|svg)$/i.test(loc)));
  const sitemapIndexLocs = new Set(collectXmlLocs(sitemapIndex));

  for (const url of requiredDiscoveryUrls) {
    const item = discovery.find((entry) => entry.url === url);
    assert(item?.status === 200, errors, `${url} should return HTTP 200.`);
  }

  assert(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`), errors, 'robots.txt missing sitemap.xml.');
  assert(robots.includes(`Sitemap: ${siteOrigin}/image-sitemap.xml`), errors, 'robots.txt missing image-sitemap.xml.');
  assert(robots.includes(`Sitemap: ${siteOrigin}/sitemap-index.xml`), errors, 'robots.txt missing sitemap-index.xml.');
  assert(sitemapIndexLocs.has(`${siteOrigin}/sitemap.xml`), errors, 'sitemap-index.xml missing sitemap.xml.');
  assert(sitemapIndexLocs.has(`${siteOrigin}/image-sitemap.xml`), errors, 'sitemap-index.xml missing image-sitemap.xml.');

  for (const url of requiredPageUrls) {
    assert(sitemapLocs.has(url), errors, `sitemap.xml missing ${url}.`);
    assert(imageSitemapLocs.has(url), errors, `image-sitemap.xml missing ${url}.`);
    assert(feed.includes(url) || url.includes('/configurator/'), errors, `feed.xml missing ${url}.`);
    assert(llms.includes(url), errors, `llms.txt missing ${url}.`);
  }
}

async function checkPages(errors) {
  const pages = [];
  for (const url of unique(requiredPageUrls)) {
    const result = await fetchText(url);
    const html = result.text;
    const canonical = getMetaContent(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i);
    const ogUrl = getMetaContent(html, /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)/i);
    const description = getMetaContent(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i);
    const robots = getMetaContent(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i);
    const jsonLd = collectJsonLd(html);

    pages.push({
      url,
      status: result.status,
      canonical,
      ogUrl,
      jsonLdTypes: jsonLd.map((item) => item['@type']).filter(Boolean)
    });

    assert(result.status === 200, errors, `${url} should return HTTP 200.`);
    assert(canonical === url, errors, `${url} canonical is ${canonical || 'missing'}.`);
    assert(ogUrl === url, errors, `${url} og:url is ${ogUrl || 'missing'}.`);
    assert(description.length > 40, errors, `${url} meta description is missing or too short.`);
    assert(/index/i.test(robots) && /follow/i.test(robots), errors, `${url} robots meta should include index, follow.`);
    assert(jsonLd.length > 0, errors, `${url} missing JSON-LD.`);
    assert(jsonLd.some((item) => item['@type'] === 'BreadcrumbList'), errors, `${url} missing BreadcrumbList JSON-LD.`);
  }

  return pages;
}

async function main() {
  const errors = [];
  const discovery = [];
  for (const url of requiredDiscoveryUrls) {
    discovery.push(await fetchText(url));
  }

  checkDiscoveryFiles(discovery, errors);
  const pages = await checkPages(errors);
  const redirects = await checkRedirects(errors);

  const result = {
    ok: errors.length === 0,
    siteOrigin,
    checkedDiscoveryUrls: requiredDiscoveryUrls.length,
    checkedPageUrls: unique(requiredPageUrls).length,
    redirects,
    pages,
    errors
  };

  console.log(JSON.stringify(result, null, 2));
  if (errors.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
