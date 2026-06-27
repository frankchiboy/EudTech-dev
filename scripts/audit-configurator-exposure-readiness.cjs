const fs = require('fs');
const path = require('path');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');

const args = new Set(process.argv.slice(2));
const failOnExternalGaps = args.has('--fail-on-external-gaps');
const writeReport = args.has('--write-report');

const rootDir = path.resolve(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');
const publicDir = path.join(rootDir, 'public');
const reportsDir = path.join(rootDir, 'reports');
const { SITE_ORIGIN, CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();
const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';
const pageUrl = (routePath) => canonicalPageUrl(`${siteOrigin}${routePath}`, siteOrigin);

const requiredEnv = {
  analytics: ['VITE_GTM_ID', 'VITE_GA_MEASUREMENT_ID'],
  googleAds: ['VITE_GOOGLE_ADS_ID', 'VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL'],
  linkedIn: ['VITE_LINKEDIN_PARTNER_ID', 'VITE_LINKEDIN_QUOTE_CONVERSION_ID'],
  quoteEmail: ['QUOTE_SENDER_EMAIL', 'GMAIL_OAUTH_CLIENT_ID', 'GMAIL_OAUTH_CLIENT_SECRET', 'GMAIL_OAUTH_REFRESH_TOKEN']
};

const read = (filename) => fs.readFileSync(path.join(rootDir, filename), 'utf8');
const exists = (filename) => fs.existsSync(path.join(rootDir, filename));
const lineCount = (filename) => read(filename).trim().split(/\r?\n/).filter(Boolean).length;

function envGroupStatus(keys, mode = 'all') {
  const present = keys.filter((key) => Boolean(process.env[key]));
  const missing = keys.filter((key) => !process.env[key]);
  const ready = mode === 'any' ? present.length > 0 : missing.length === 0;
  return { ready, present, missing };
}

async function probeProductionQuoteFunction() {
  const endpoint = `${siteOrigin}/.netlify/functions/send-email`;
  try {
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
    return {
      endpoint,
      status: response.status,
      ready: response.status === 400 && error.includes('Missing required quote fields'),
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
    checks.push({ category, name, ready, ...detail });
  };

  const sitemap = read('public/sitemap.xml');
  const imageSitemap = read('public/image-sitemap.xml');
  const feed = read('public/feed.xml');
  const llms = read('public/llms.txt');
  const robots = read('public/robots.txt');
  const workflow = read('.github/workflows/exposure-public.yml');
  const packageJson = JSON.parse(read('package.json'));
  const promotionKeywordsPath = 'docs/configurator-promotion-keywords.csv';
  const promotionLinksPath = 'docs/configurator-promotion-links.csv';
  const promotionAssetsPath = 'docs/configurator-promotion-assets.md';
  const quoteFunctionProbe = await probeProductionQuoteFunction();

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
  addCheck('promotion_assets', 'keyword CSV covers every landing page', canonicalUrls.every((url) => read(promotionKeywordsPath).includes(url)), {
    missing: canonicalUrls.filter((url) => !read(promotionKeywordsPath).includes(url))
  });
  addCheck('promotion_assets', 'UTM link CSV covers every landing page', canonicalUrls.every((url) => read(promotionLinksPath).includes(url)), {
    missing: canonicalUrls.filter((url) => !read(promotionLinksPath).includes(url))
  });

  addCheck('conversion_path', 'quote email function exists', exists('netlify/functions/send-email.mjs'), {
    path: 'netlify/functions/send-email.mjs'
  });
  addCheck('conversion_path', 'production quote email function has mail env', quoteFunctionProbe.ready, quoteFunctionProbe);
  addCheck('conversion_path', 'quote submit success event exists', read('src/components/configurator/GrandoConfigurator.tsx').includes('quote_submit_success'));
  addCheck('conversion_path', 'quote form open event exists', read('src/components/configurator/GrandoConfigurator.tsx').includes('quote_form_open'));
  addCheck('conversion_path', 'share event exists', read('src/components/configurator/GrandoConfigurator.tsx').includes("'share'"));
  addCheck('conversion_path', 'marketing attribution included in quote message', read('src/components/configurator/GrandoConfigurator.tsx').includes('Marketing attribution'));

  addCheck('automation', 'public exposure workflow runs on main push', workflow.includes('push:') && workflow.includes('- main'));
  addCheck('automation', 'public exposure workflow verifies promotion assets', workflow.includes('verify:promotion-assets'));
  addCheck('automation', 'scheduled Netlify IndexNow function exists', exists('netlify/functions/exposure-scheduled.mjs'));
  addCheck('automation', 'package exposes readiness command', Boolean(packageJson.scripts?.['audit:exposure-readiness']));
  addCheck('automation', 'package exposes strict exposure command', Boolean(packageJson.scripts?.['exposure:strict']));

  const localQuoteEmailEnv = envGroupStatus(requiredEnv.quoteEmail);
  const externalReadiness = {
    analytics: envGroupStatus(requiredEnv.analytics, 'any'),
    googleAds: envGroupStatus(requiredEnv.googleAds),
    linkedIn: envGroupStatus(requiredEnv.linkedIn),
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

  const failedChecks = checks.filter((check) => !check.ready);
  const result = {
    ok: failedChecks.length === 0 && (!failOnExternalGaps || externalGaps.length === 0),
    onSiteReady: failedChecks.length === 0,
    externalTrackingReady: externalGaps.length === 0,
    failOnExternalGaps,
    landingPages: canonicalUrls.length,
    solutionPages: CONFIGURATOR_SEO_PAGES.length,
    configuratorProductPages: CONFIGURATOR_PRODUCT_SEO.length,
    checks,
    failedChecks,
    externalReadiness,
    externalGaps
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
