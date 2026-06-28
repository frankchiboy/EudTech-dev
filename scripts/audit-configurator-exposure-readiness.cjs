const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');
const { evaluateMarketingPlatformEnv } = require('./marketing-platform-env.cjs');
const {
  SOCIAL_IMAGE_WIDTH,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_MAX_BYTES,
  getConfiguratorSocialPreviewRoutes
} = require('./configurator-social-preview-routes.cjs');

const args = new Set(process.argv.slice(2));
const failOnExternalGaps = args.has('--fail-on-external-gaps');
const failOnProductionProbes = args.has('--fail-on-production-probes');
const writeReport = args.has('--write-report');

const rootDir = path.resolve(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');
const publicDir = path.join(rootDir, 'public');
const reportsDir = path.join(rootDir, 'reports');
const { SITE_ORIGIN, CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();
const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';
const pageUrl = (routePath) => canonicalPageUrl(`${siteOrigin}${routePath}`, siteOrigin);
const socialPreviewRoutes = getConfiguratorSocialPreviewRoutes();

const requiredEnv = {
  quoteEmail: ['QUOTE_SENDER_EMAIL', 'GMAIL_OAUTH_CLIENT_ID', 'GMAIL_OAUTH_CLIENT_SECRET', 'GMAIL_OAUTH_REFRESH_TOKEN']
};

const read = (filename) => fs.readFileSync(path.join(rootDir, filename), 'utf8');
const exists = (filename) => fs.existsSync(path.join(rootDir, filename));
const lineCount = (filename) => read(filename).trim().split(/\r?\n/).filter(Boolean).length;
const csvContainsField = (filename, value) => exists(filename) && read(filename).includes(`"${value}"`);
const csvContainsUrlPrefix = (filename, value) => exists(filename) && (
  read(filename).includes(`"${value}"`) || read(filename).includes(`"${value}?`)
);

function publicAssetPath(assetPath) {
  return path.join(publicDir, decodeURIComponent(assetPath.replace(/^\//, '')));
}

function envGroupStatus(keys, mode = 'all') {
  const present = keys.filter((key) => Boolean(process.env[key]));
  const missing = keys.filter((key) => !process.env[key]);
  const ready = mode === 'any' ? present.length > 0 : missing.length === 0;
  return { ready, present, missing };
}

async function probeProductionQuoteFunction() {
  const endpoint = `${siteOrigin}/.netlify/functions/send-email`;
  try {
    const healthResponse = await fetch(endpoint);
    let healthPayload = {};
    try {
      healthPayload = await healthResponse.json();
    } catch {
      healthPayload = {};
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    let payload = {};
    try {
      payload = await response.json();
    } catch {
      payload = {};
    }

    const error = typeof payload.error === 'string' ? payload.error : '';
    const postReady = response.status === 400 && error.includes('Missing required quote fields');
    const healthReady = healthResponse.ok && healthPayload.ok === true;

    return {
      endpoint,
      status: response.status,
      healthStatus: healthResponse.status,
      ready: postReady,
      healthReady,
      error: error || undefined
    };
  } catch (error) {
    return {
      endpoint,
      ready: false,
      error: error instanceof Error ? error.message : 'Production quote function probe failed'
    };
  }
}

async function probeProductionMarketingEventFunction() {
  const endpoint = `${siteOrigin}/.netlify/functions/marketing-event`;
  const expectedEvents = [
    'page_view',
    'marketing_attribution',
    'configurator_lead_intent',
    'linkedin_quote_conversion'
  ];

  try {
    const healthResponse = await fetch(endpoint);
    let payload = {};
    try {
      payload = await healthResponse.json();
    } catch {
      payload = {};
    }

    const eventResponse = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        event_id: 'exposure-readiness-probe',
        source: 'exposure_readiness_audit',
        page_location: pageUrl('/configurator'),
        page_path: '/configurator'
      })
    });
    let eventPayload = {};
    try {
      eventPayload = await eventResponse.json();
    } catch {
      eventPayload = {};
    }

    const acceptedEvents = Array.isArray(payload.acceptedEvents) ? payload.acceptedEvents : [];
    const acceptedEventsReady = expectedEvents.every((eventName) => acceptedEvents.includes(eventName));
    const healthReady = healthResponse.ok && payload.ok === true && payload.endpoint === 'marketing-event';
    const postReady = eventResponse.status === 202 && eventPayload.ok === true && eventPayload.event === 'page_view';

    return {
      endpoint,
      status: healthResponse.status,
      postStatus: eventResponse.status,
      ready: healthReady && postReady && acceptedEventsReady,
      healthReady,
      postReady,
      acceptedEventsReady,
      acceptedEvents
    };
  } catch (error) {
    return {
      endpoint,
      ready: false,
      error: error instanceof Error ? error.message : 'Production marketing event function probe failed'
    };
  }
}

async function inspectSocialPreviewImages() {
  const images = [];

  for (const route of socialPreviewRoutes) {
    const filename = publicAssetPath(route.socialImage);
    const sourceFilename = publicAssetPath(route.sourceImage);
    const item = {
      path: route.path,
      canonicalUrl: route.canonicalUrl,
      sourceImage: route.sourceImage,
      socialImage: route.socialImage,
      socialImageUrl: route.socialImageUrl,
      exists: fs.existsSync(filename),
      sourceExists: fs.existsSync(sourceFilename)
    };

    if (item.exists) {
      const metadata = await sharp(filename).metadata();
      item.width = metadata.width;
      item.height = metadata.height;
      item.format = metadata.format;
      item.size = fs.statSync(filename).size;
      item.ready =
        item.sourceExists &&
        item.width === SOCIAL_IMAGE_WIDTH &&
        item.height === SOCIAL_IMAGE_HEIGHT &&
        item.format === 'jpeg' &&
        item.size < SOCIAL_IMAGE_MAX_BYTES;
    } else {
      item.ready = false;
    }

    images.push(item);
  }

  return images;
}

const canonicalUrls = [
  pageUrl('/configurator'),
  pageUrl('/configurator/28'),
  pageUrl('/configurator/29'),
  pageUrl('/solutions'),
  ...CONFIGURATOR_SEO_PAGES.map((page) => pageUrl(`/solutions/${page.slug}`))
];

async function main() {
  const checks = [];
  const addCheck = (category, name, ready, detail = {}) => {
    checks.push({ category, name, ...detail, ready: Boolean(ready) });
  };

  const sitemap = read('public/sitemap.xml');
  const imageSitemap = read('public/image-sitemap.xml');
  const feed = read('public/feed.xml');
  const llms = read('public/llms.txt');
  const robots = read('public/robots.txt');
  const workflow = read('.github/workflows/exposure-public.yml');
  const packageJson = JSON.parse(read('package.json'));
  const configuratorSource = read('src/components/configurator/GrandoConfigurator.tsx');
  const marketingEventsSource = read('src/components/analytics/MarketingEvents.tsx');
  const marketingEventFunctionSource = read('netlify/functions/marketing-event.mjs');
  const promotionKeywordsPath = 'docs/configurator-promotion-keywords.csv';
  const promotionLinksPath = 'docs/configurator-promotion-links.csv';
  const googleAdsEditorKeywordsPath = 'docs/configurator-google-ads-editor-keywords.csv';
  const searchAdCopyPath = 'docs/configurator-search-ad-copy.csv';
  const organicPostsPath = 'docs/configurator-organic-posts.csv';
  const linkedinUrlParametersPath = 'docs/configurator-linkedin-url-parameters.csv';
  const promotionAssetsPath = 'docs/configurator-promotion-assets.md';
  const quoteFunctionProbe = await probeProductionQuoteFunction();
  const marketingEventFunctionProbe = await probeProductionMarketingEventFunction();
  const marketingPlatformEnv = evaluateMarketingPlatformEnv(process.env);
  const socialPreviewImages = await inspectSocialPreviewImages();

  addCheck('search_discovery', 'canonical landing pages defined', canonicalUrls.length >= 17, {
    count: canonicalUrls.length
  });
  addCheck('search_discovery', 'sitemap contains all landing pages', canonicalUrls.every((url) => sitemap.includes(url)), {
    missing: canonicalUrls.filter((url) => !sitemap.includes(url))
  });
  addCheck('search_discovery', 'image sitemap contains all landing pages', canonicalUrls.every((url) => imageSitemap.includes(url)), {
    missing: canonicalUrls.filter((url) => !imageSitemap.includes(url))
  });
  addCheck('search_discovery', 'RSS feed contains solution pages', CONFIGURATOR_SEO_PAGES.every((page) => feed.includes(pageUrl(`/solutions/${page.slug}`))), {
    solutionPages: CONFIGURATOR_SEO_PAGES.length
  });
  addCheck('search_discovery', 'llms.txt contains configurator topics', canonicalUrls.every((url) => llms.includes(url)), {
    missing: canonicalUrls.filter((url) => !llms.includes(url))
  });
  addCheck('search_discovery', 'robots points to sitemap index and sitemaps', ['sitemap.xml', 'image-sitemap.xml', 'sitemap-index.xml'].every((file) => robots.includes(`${siteOrigin}/${file}`)));
  addCheck('social_preview', 'social preview images exist for every landing page', socialPreviewImages.every((image) => image.exists && image.sourceExists), {
    missing: socialPreviewImages.filter((image) => !image.exists || !image.sourceExists)
  });
  addCheck('social_preview', 'social preview images use 1200x630 JPEG format', socialPreviewImages.every((image) => image.width === SOCIAL_IMAGE_WIDTH && image.height === SOCIAL_IMAGE_HEIGHT && image.format === 'jpeg'), {
    invalid: socialPreviewImages.filter((image) => image.width !== SOCIAL_IMAGE_WIDTH || image.height !== SOCIAL_IMAGE_HEIGHT || image.format !== 'jpeg')
  });
  addCheck('social_preview', 'social preview images stay under 5 MB platform limit', socialPreviewImages.every((image) => image.size < SOCIAL_IMAGE_MAX_BYTES), {
    invalid: socialPreviewImages.filter((image) => image.size >= SOCIAL_IMAGE_MAX_BYTES),
    maxBytes: SOCIAL_IMAGE_MAX_BYTES
  });
  addCheck('social_preview', 'image sitemap uses generated social preview images', socialPreviewImages.every((image) => imageSitemap.includes(image.socialImageUrl)), {
    missing: socialPreviewImages.filter((image) => !imageSitemap.includes(image.socialImageUrl))
  });
  addCheck('social_preview', 'image sitemap excludes deprecated image title and caption tags', !/<image:(?:title|caption)>/i.test(imageSitemap));

  addCheck('promotion_assets', 'promotion asset overview exists', exists(promotionAssetsPath), {
    path: promotionAssetsPath
  });
  addCheck('promotion_assets', 'Google Ads keyword CSV exists', exists(promotionKeywordsPath), {
    path: promotionKeywordsPath,
    rows: exists(promotionKeywordsPath) ? lineCount(promotionKeywordsPath) - 1 : 0
  });
  addCheck('promotion_assets', 'UTM link CSV exists', exists(promotionLinksPath), {
    path: promotionLinksPath,
    rows: exists(promotionLinksPath) ? lineCount(promotionLinksPath) - 1 : 0
  });
  addCheck('promotion_assets', 'Google Ads Editor keyword CSV exists', exists(googleAdsEditorKeywordsPath), {
    path: googleAdsEditorKeywordsPath,
    rows: exists(googleAdsEditorKeywordsPath) ? lineCount(googleAdsEditorKeywordsPath) - 1 : 0
  });
  addCheck('promotion_assets', 'search ad copy CSV exists', exists(searchAdCopyPath), {
    path: searchAdCopyPath,
    rows: exists(searchAdCopyPath) ? lineCount(searchAdCopyPath) - 1 : 0
  });
  addCheck('promotion_assets', 'organic post CSV exists', exists(organicPostsPath), {
    path: organicPostsPath,
    rows: exists(organicPostsPath) ? lineCount(organicPostsPath) - 1 : 0
  });
  addCheck('promotion_assets', 'LinkedIn URL parameter CSV exists', exists(linkedinUrlParametersPath), {
    path: linkedinUrlParametersPath,
    rows: exists(linkedinUrlParametersPath) ? lineCount(linkedinUrlParametersPath) - 1 : 0
  });
  addCheck('promotion_assets', 'keyword CSV covers every landing page', canonicalUrls.every((url) => csvContainsField(promotionKeywordsPath, url)), {
    missing: canonicalUrls.filter((url) => !csvContainsField(promotionKeywordsPath, url))
  });
  addCheck('promotion_assets', 'UTM link CSV covers every landing page', canonicalUrls.every((url) => csvContainsField(promotionLinksPath, url)), {
    missing: canonicalUrls.filter((url) => !csvContainsField(promotionLinksPath, url))
  });
  addCheck('promotion_assets', 'organic copy covers every landing page', canonicalUrls.every((url) => csvContainsField(organicPostsPath, url)), {
    missing: canonicalUrls.filter((url) => !csvContainsField(organicPostsPath, url))
  });
  addCheck('promotion_assets', 'organic copy covers three outreach contexts per landing page', exists(organicPostsPath) && lineCount(organicPostsPath) - 1 === canonicalUrls.length * 3, {
    expectedRows: canonicalUrls.length * 3,
    rows: exists(organicPostsPath) ? lineCount(organicPostsPath) - 1 : 0
  });
  addCheck('promotion_assets', 'search ad copy rows are length-valid', exists(searchAdCopyPath) && !read(searchAdCopyPath).split(/\r?\n/).some((line) => line.endsWith('"no"')), {
    invalidRows: exists(searchAdCopyPath) ? read(searchAdCopyPath).split(/\r?\n/).filter((line) => line.endsWith('"no"')).length : null
  });
  addCheck('promotion_assets', 'Google Ads Editor keywords cover every landing page', canonicalUrls.every((url) => csvContainsUrlPrefix(googleAdsEditorKeywordsPath, url)), {
    missing: canonicalUrls.filter((url) => !csvContainsUrlPrefix(googleAdsEditorKeywordsPath, url))
  });
  addCheck('promotion_assets', 'LinkedIn URL parameters cover every landing page', canonicalUrls.every((url) => csvContainsField(linkedinUrlParametersPath, url)), {
    missing: canonicalUrls.filter((url) => !csvContainsField(linkedinUrlParametersPath, url))
  });

  addCheck('external_tracking', 'marketing platform env values use valid formats', marketingPlatformEnv.invalidVariables.length === 0, {
    invalid: marketingPlatformEnv.invalidVariables.map((variable) => ({
      key: variable.key,
      expected: variable.expected
    }))
  });
  addCheck('external_tracking', 'first-party marketing event endpoint env is configured', marketingPlatformEnv.groups.firstParty.ready, {
    present: marketingPlatformEnv.groups.firstParty.present,
    missing: marketingPlatformEnv.groups.firstParty.missing,
    invalid: marketingPlatformEnv.groups.firstParty.invalid
  });

  addCheck('conversion_path', 'quote email function exists', exists('netlify/functions/send-email.mjs'), {
    path: 'netlify/functions/send-email.mjs'
  });
  addCheck('conversion_path', 'production quote email function has mail env', quoteFunctionProbe.ready, quoteFunctionProbe);
  addCheck('conversion_path', 'production quote email health check is available', quoteFunctionProbe.healthReady, {
    ...quoteFunctionProbe,
    required: failOnProductionProbes
  });
  addCheck('conversion_path', 'quote submit success event exists', configuratorSource.includes('quote_submit_success'));
  addCheck('conversion_path', 'quote form open event exists', configuratorSource.includes('quote_form_open'));
  addCheck('conversion_path', 'share event exists', configuratorSource.includes("'share'"));
  addCheck('conversion_path', 'share button uses Web Share API with clipboard fallback', configuratorSource.includes('navigator.share') && configuratorSource.includes('copyToClipboard(shareUrl || currentUrl)'));
  addCheck('conversion_path', 'share URL uses first-party UTM tracking', ['utm_source', "'share'", 'utm_medium', "'referral'", 'utm_campaign', 'utm_content'].every((token) => configuratorSource.includes(token)));
  addCheck('conversion_path', 'share event includes configuration URL and share method', configuratorSource.includes('configurationUrl: shareUrl || currentUrl') && configuratorSource.includes('shareMethod'));
  addCheck('conversion_path', 'marketing attribution included in quote message', configuratorSource.includes('Marketing attribution'));

  addCheck('first_party_measurement', 'marketing event function exists', exists('netlify/functions/marketing-event.mjs'), {
    path: 'netlify/functions/marketing-event.mjs'
  });
  addCheck(
    'first_party_measurement',
    'production marketing event endpoint is available',
    marketingEventFunctionProbe.ready,
    {
      ...marketingEventFunctionProbe,
      required: failOnProductionProbes
    }
  );
  addCheck('first_party_measurement', 'frontend sends first-party marketing events', marketingEventsSource.includes('sendFirstPartyEvent'));
  addCheck('first_party_measurement', 'frontend sends page views to first-party endpoint', marketingEventsSource.includes("event: 'page_view'"));
  addCheck('first_party_measurement', 'frontend sends attribution to first-party endpoint', marketingEventsSource.includes("event: 'marketing_attribution'"));
  addCheck('first_party_measurement', 'frontend sends configurator lead events to first-party endpoint', marketingEventsSource.includes("event: 'configurator_lead_intent'"));
  addCheck('first_party_measurement', 'frontend sends share method with configurator lead events', marketingEventsSource.includes('share_method: detail.shareMethod'));
  addCheck('first_party_measurement', 'frontend sends quote conversion to first-party endpoint', marketingEventsSource.includes("event: 'linkedin_quote_conversion'"));
  addCheck('first_party_measurement', 'marketing event function preserves sanitized configurator URL and share method', marketingEventFunctionSource.includes("'share_method'") && marketingEventFunctionSource.includes("'url'") && marketingEventFunctionSource.includes('configurator.url = sanitizeUrl(configurator.url)'));

  addCheck('automation', 'public exposure workflow runs on main push', workflow.includes('push:') && workflow.includes('- main'));
  addCheck('automation', 'public exposure workflow verifies promotion assets', workflow.includes('verify:promotion-assets'));
  addCheck('automation', 'public exposure workflow verifies social preview images', workflow.includes('verify:social-images'));
  addCheck('automation', 'scheduled Netlify IndexNow function exists', exists('netlify/functions/exposure-scheduled.mjs'));
  addCheck('automation', 'package exposes social image generation command', Boolean(packageJson.scripts?.['generate:social-images']));
  addCheck('automation', 'package exposes social image verification command', Boolean(packageJson.scripts?.['verify:social-images']));
  addCheck('automation', 'package exposes readiness command', Boolean(packageJson.scripts?.['audit:exposure-readiness']));
  addCheck('automation', 'package exposes strict exposure command', Boolean(packageJson.scripts?.['exposure:strict']));

  const localQuoteEmailEnv = envGroupStatus(requiredEnv.quoteEmail);
  const externalReadiness = {
    analytics: marketingPlatformEnv.groups.analytics,
    googleAds: marketingPlatformEnv.groups.googleAds,
    linkedIn: marketingPlatformEnv.groups.linkedIn,
    quoteEmail: {
      ready: localQuoteEmailEnv.ready || quoteFunctionProbe.ready,
      present: localQuoteEmailEnv.present,
      missing: quoteFunctionProbe.ready ? [] : localQuoteEmailEnv.missing,
      productionProbe: quoteFunctionProbe
    }
  };

  const externalGaps = Object.entries(externalReadiness)
    .filter(([, value]) => !value.ready)
    .map(([name, value]) => ({ name, missing: value.missing }));

  const failedChecks = checks.filter((check) => !check.ready && check.required !== false);
  const result = {
    ok: failedChecks.length === 0 && (!failOnExternalGaps || externalGaps.length === 0),
    onSiteReady: failedChecks.length === 0,
    externalTrackingReady: externalGaps.length === 0,
    failOnExternalGaps,
    failOnProductionProbes,
    landingPages: canonicalUrls.length,
    solutionPages: CONFIGURATOR_SEO_PAGES.length,
    configuratorProductPages: CONFIGURATOR_PRODUCT_SEO.length,
    socialPreviewImages,
    checks,
    failedChecks,
    externalReadiness,
    externalGaps,
    marketingPlatformEnv
  };

  if (writeReport) {
    fs.mkdirSync(reportsDir, { recursive: true });
    fs.writeFileSync(path.join(reportsDir, 'configurator-exposure-readiness.json'), `${JSON.stringify(result, null, 2)}\n`);
  }

  console.log(JSON.stringify(result, null, 2));

  if (!result.ok) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
