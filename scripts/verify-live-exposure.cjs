const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');
const sharp = require('sharp');
const {
  SOCIAL_IMAGE_WIDTH,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_MAX_BYTES,
  getConfiguratorSocialPreviewRoutes
} = require('./configurator-social-preview-routes.cjs');

const { SITE_ORIGIN, CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();
const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';
const expectedDeployCommit = getFlagValue('--expect-commit') || process.env.EXPECTED_DEPLOY_COMMIT || '';
const waitForCommitMs = Number(getFlagValue('--wait-for-commit-ms') || process.env.WAIT_FOR_DEPLOY_COMMIT_MS || '0');
const socialPreviewRoutes = getConfiguratorSocialPreviewRoutes();
const socialPreviewByUrl = new Map(socialPreviewRoutes.map((route) => [route.canonicalUrl, route]));
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

function getFlagValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : '';
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchText(url, options = {}) {
  const cacheBustedUrl = options.cacheBust === false ? url : `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
  const attempts = options.attempts || 4;
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(cacheBustedUrl, {
        redirect: options.redirect || 'follow',
        cache: 'no-store'
      });
      const text = await response.text();
      const result = {
        url,
        status: response.status,
        contentType: response.headers.get('content-type') || '',
        redirected: response.redirected,
        finalUrl: response.url.replace(/[?&]t=\d+$/, ''),
        location: response.headers.get('location'),
        text
      };

      if (response.status < 500 || attempt === attempts) {
        return result;
      }
      lastError = new Error(`${url} returned HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
      if (attempt === attempts) {
        break;
      }
    }

    await sleep(1500 * attempt);
  }

  throw lastError;
}

async function fetchImageInfo(url, options = {}) {
  const cacheBustedUrl = options.cacheBust === false ? url : `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
  const attempts = options.attempts || 4;
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(cacheBustedUrl, {
        cache: 'no-store'
      });
      const buffer = Buffer.from(await response.arrayBuffer());
      const metadata = response.ok ? await sharp(buffer).metadata() : {};
      const result = {
        url,
        status: response.status,
        contentType: response.headers.get('content-type') || '',
        bytes: buffer.byteLength,
        width: metadata.width,
        height: metadata.height,
        format: metadata.format
      };

      if (response.status < 500 || attempt === attempts) {
        return result;
      }
      lastError = new Error(`${url} returned HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
      if (attempt === attempts) {
        break;
      }
    }

    await sleep(1500 * attempt);
  }

  throw lastError;
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

async function checkBuildMetadata(errors) {
  const url = `${siteOrigin}/build-meta.json`;
  const deadline = Date.now() + (Number.isFinite(waitForCommitMs) && waitForCommitMs > 0 ? waitForCommitMs : 0);

  async function readMetadata() {
    const result = await fetchText(url);
    const metadata = {
      url,
      status: result.status,
      available: result.status === 200,
      commit: null,
      shortCommit: null,
      branch: null,
      builtAt: null,
      source: null,
      contentType: result.contentType,
      expectedDeployCommit: expectedDeployCommit || null,
      waitForCommitMs: waitForCommitMs || 0
    };

    if (result.status !== 200 || !/application\/json/i.test(result.contentType || '')) {
      metadata.available = false;
      return metadata;
    }

    try {
      const parsed = JSON.parse(result.text);
      metadata.commit = parsed.commit || null;
      metadata.shortCommit = parsed.shortCommit || null;
      metadata.branch = parsed.branch || null;
      metadata.builtAt = parsed.builtAt || null;
      metadata.source = parsed.source || null;
    } catch {
      metadata.parseError = `${url} is not valid JSON.`;
    }

    return metadata;
  }

  let metadata = await readMetadata();
  while (
    expectedDeployCommit &&
    waitForCommitMs > 0 &&
    metadata.commit !== expectedDeployCommit &&
    Date.now() < deadline
  ) {
    await sleep(10000);
    metadata = await readMetadata();
  }

  const result = {
    url,
    ...metadata
  };

  if (!result.available) {
    if (expectedDeployCommit) {
      errors.push(`${url} should return HTTP 200 JSON when verifying expected deploy commit ${expectedDeployCommit}.`);
    }
    return result;
  }

  if (result.parseError) {
    errors.push(result.parseError);
    return result;
  }

  assert(/^[0-9a-f]{40}$/i.test(result.commit || ''), errors, `${url} commit is missing or not a full Git SHA.`);
  assert(
    !expectedDeployCommit || result.commit === expectedDeployCommit,
    errors,
    `${url} commit is ${result.commit || 'missing'}, expected ${expectedDeployCommit}.`
  );

  return result;
}

async function checkRedirects(errors) {
  const checks = [
    [`${siteOrigin}/configurator`, canonicalPageUrl(`${siteOrigin}/configurator`, siteOrigin)],
    ...CONFIGURATOR_PRODUCT_SEO.map((product) => [
      `${siteOrigin}${product.configuratorHref}`,
      canonicalPageUrl(`${siteOrigin}${product.configuratorHref}`, siteOrigin)
    ]),
    [`${siteOrigin}/solutions`, canonicalPageUrl(`${siteOrigin}/solutions`, siteOrigin)],
    ...CONFIGURATOR_SEO_PAGES.map((page) => [
      `${siteOrigin}/solutions/${page.slug}`,
      canonicalPageUrl(`${siteOrigin}/solutions/${page.slug}`, siteOrigin)
    ])
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
    assert(feed.includes(url), errors, `feed.xml missing ${url}.`);
    assert(llms.includes(url), errors, `llms.txt missing ${url}.`);
  }

  for (const route of socialPreviewRoutes) {
    assert(imageSitemap.includes(route.socialImageUrl), errors, `image-sitemap.xml missing ${route.socialImageUrl}.`);
  }

  assert(!/<image:(?:title|caption)>/i.test(imageSitemap), errors, 'image-sitemap.xml should not include deprecated image:title or image:caption tags.');
}

async function checkPages(errors) {
  const pages = [];
  for (const url of unique(requiredPageUrls)) {
    const result = await fetchText(url);
    const html = result.text;
    const canonical = getMetaContent(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i);
    const ogUrl = getMetaContent(html, /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)/i);
    const ogImage = getMetaContent(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i);
    const ogImageAlt = getMetaContent(html, /<meta[^>]+property=["']og:image:alt["'][^>]+content=["']([^"']+)/i);
    const ogImageWidth = getMetaContent(html, /<meta[^>]+property=["']og:image:width["'][^>]+content=["']([^"']+)/i);
    const ogImageHeight = getMetaContent(html, /<meta[^>]+property=["']og:image:height["'][^>]+content=["']([^"']+)/i);
    const ogType = getMetaContent(html, /<meta[^>]+property=["']og:type["'][^>]+content=["']([^"']+)/i);
    const twitterCard = getMetaContent(html, /<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']+)/i);
    const twitterImage = getMetaContent(html, /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)/i);
    const twitterImageAlt = getMetaContent(html, /<meta[^>]+name=["']twitter:image:alt["'][^>]+content=["']([^"']+)/i);
    const twitterUrl = getMetaContent(html, /<meta[^>]+name=["']twitter:url["'][^>]+content=["']([^"']+)/i);
    const description = getMetaContent(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i);
    const robots = getMetaContent(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i);
    const jsonLd = collectJsonLd(html);
    const socialPreview = socialPreviewByUrl.get(url);

    pages.push({
      url,
      status: result.status,
      canonical,
      ogUrl,
      ogImage,
      twitterImage,
      jsonLdTypes: jsonLd.map((item) => item['@type']).filter(Boolean)
    });

    assert(result.status === 200, errors, `${url} should return HTTP 200.`);
    assert(canonical === url, errors, `${url} canonical is ${canonical || 'missing'}.`);
    assert(ogUrl === url, errors, `${url} og:url is ${ogUrl || 'missing'}.`);
    assert(twitterUrl === url, errors, `${url} twitter:url is ${twitterUrl || 'missing'}.`);
    assert(Boolean(socialPreview), errors, `${url} missing local social preview route definition.`);
    assert(ogImage === socialPreview?.socialImageUrl, errors, `${url} og:image is ${ogImage || 'missing'}.`);
    assert(twitterImage === socialPreview?.socialImageUrl, errors, `${url} twitter:image is ${twitterImage || 'missing'}.`);
    assert(ogImageAlt === socialPreview?.imageAlt, errors, `${url} og:image:alt is ${ogImageAlt || 'missing'}.`);
    assert(twitterImageAlt === socialPreview?.imageAlt, errors, `${url} twitter:image:alt is ${twitterImageAlt || 'missing'}.`);
    assert(ogImageWidth === String(SOCIAL_IMAGE_WIDTH), errors, `${url} og:image:width is ${ogImageWidth || 'missing'}.`);
    assert(ogImageHeight === String(SOCIAL_IMAGE_HEIGHT), errors, `${url} og:image:height is ${ogImageHeight || 'missing'}.`);
    assert(ogType === socialPreview?.ogType, errors, `${url} og:type is ${ogType || 'missing'}.`);
    assert(twitterCard === 'summary_large_image', errors, `${url} twitter:card should be summary_large_image.`);
    assert(description.length > 40, errors, `${url} meta description is missing or too short.`);
    assert(/index/i.test(robots) && /follow/i.test(robots), errors, `${url} robots meta should include index, follow.`);
    assert(jsonLd.length > 0, errors, `${url} missing JSON-LD.`);
    assert(jsonLd.some((item) => item['@type'] === 'BreadcrumbList'), errors, `${url} missing BreadcrumbList JSON-LD.`);
  }

  return pages;
}

async function checkSocialPreviewImages(errors) {
  const images = [];
  const uniqueImages = [...new Map(socialPreviewRoutes.map((route) => [route.socialImageUrl, route])).values()];

  for (const route of uniqueImages) {
    const image = await fetchImageInfo(route.socialImageUrl);
    images.push(image);
    assert(image.status === 200, errors, `${route.socialImageUrl} should return HTTP 200.`);
    assert(/^image\/jpe?g/i.test(image.contentType), errors, `${route.socialImageUrl} content-type is ${image.contentType || 'missing'}.`);
    assert(image.format === 'jpeg', errors, `${route.socialImageUrl} format is ${image.format || 'missing'}.`);
    assert(image.width === SOCIAL_IMAGE_WIDTH && image.height === SOCIAL_IMAGE_HEIGHT, errors, `${route.socialImageUrl} is ${image.width || 'missing'}x${image.height || 'missing'}.`);
    assert(image.bytes < SOCIAL_IMAGE_MAX_BYTES, errors, `${route.socialImageUrl} is ${image.bytes} bytes, expected below ${SOCIAL_IMAGE_MAX_BYTES}.`);
  }

  return images;
}

async function main() {
  const errors = [];
  const discovery = [];
  for (const url of requiredDiscoveryUrls) {
    discovery.push(await fetchText(url));
  }

  checkDiscoveryFiles(discovery, errors);
  const buildMetadata = await checkBuildMetadata(errors);
  const pages = await checkPages(errors);
  const socialPreviewImages = await checkSocialPreviewImages(errors);
  const redirects = await checkRedirects(errors);

  const result = {
    ok: errors.length === 0,
    siteOrigin,
    checkedDiscoveryUrls: requiredDiscoveryUrls.length,
    checkedPageUrls: unique(requiredPageUrls).length,
    checkedSocialPreviewImages: socialPreviewImages.length,
    buildMetadata,
    redirects,
    pages,
    socialPreviewImages,
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
