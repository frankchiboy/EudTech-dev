const { canonicalPageUrl, withoutTrailingPageSlash } = require('./seo-url-helpers.cjs');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { getSearchConsoleAccessToken } = require('./google-search-console-auth.cjs');

const siteUrl = 'sc-domain:eudaemonia.tech';
const siteOrigin = 'https://eudaemonia.tech';
const userProject = process.env.GOOGLE_SEARCH_CONSOLE_QUOTA_PROJECT || 'personal-gmail-vault';
const { CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();
const defaultPaths = [
  '/configurator',
  ...CONFIGURATOR_PRODUCT_SEO.map((product) => product.configuratorHref),
  '/solutions',
  ...CONFIGURATOR_SEO_PAGES.map((page) => `/solutions/${page.slug}`)
];

function getInspectionUrls() {
  const includeAliases = process.argv.includes('--include-aliases');
  const args = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
  if (args.length) {
    return args;
  }

  const canonicalUrls = defaultPaths.map((routePath) => canonicalPageUrl(`${siteOrigin}${routePath}`, siteOrigin));
  if (!includeAliases) {
    return canonicalUrls;
  }

  return [...new Set(canonicalUrls.flatMap((url) => [url, withoutTrailingPageSlash(url)]))];
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function shouldRequireIndexed(inspectionUrl) {
  if (!hasFlag('fail-on-unindexed')) {
    return false;
  }

  if (hasFlag('include-aliases') && !inspectionUrl.endsWith('/')) {
    return false;
  }

  return true;
}

function shouldRequireCanonicalMatch(inspectionUrl) {
  if (!hasFlag('fail-on-canonical-mismatch')) {
    return false;
  }

  if (hasFlag('include-aliases') && !inspectionUrl.endsWith('/')) {
    return false;
  }

  return true;
}

async function inspectUrl(token, inspectionUrl) {
  const response = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
      'X-Goog-User-Project': userProject
    },
    body: JSON.stringify({
      inspectionUrl,
      siteUrl,
      languageCode: 'zh-TW'
    })
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`URL Inspection failed for ${inspectionUrl}: ${response.status} ${body}`);
  }

  const parsed = JSON.parse(body);
  const indexStatus = parsed.inspectionResult?.indexStatusResult || {};
  const expectedCanonical = canonicalPageUrl(inspectionUrl, siteOrigin);
  const googleCanonicalMatches = !indexStatus.googleCanonical || indexStatus.googleCanonical === expectedCanonical;
  const userCanonicalMatches = !indexStatus.userCanonical || indexStatus.userCanonical === expectedCanonical;

  return {
    inspectionUrl,
    expectedCanonical,
    verdict: indexStatus.verdict,
    coverageState: indexStatus.coverageState,
    robotsTxtState: indexStatus.robotsTxtState,
    indexingState: indexStatus.indexingState,
    pageFetchState: indexStatus.pageFetchState,
    lastCrawlTime: indexStatus.lastCrawlTime,
    googleCanonical: indexStatus.googleCanonical,
    userCanonical: indexStatus.userCanonical,
    googleCanonicalMatches,
    userCanonicalMatches,
    referringUrls: indexStatus.referringUrls || [],
    sitemap: indexStatus.sitemap || []
  };
}

async function main() {
  const inspectionUrls = getInspectionUrls();
  if (hasFlag('list-urls')) {
    console.log(
      JSON.stringify(
        {
          ok: true,
          siteUrl,
          userProject,
          count: inspectionUrls.length,
          inspectionUrls
        },
        null,
        2
      )
    );
    return;
  }

  const token = getSearchConsoleAccessToken();
  const inspected = [];
  const errors = [];
  for (const url of inspectionUrls) {
    const result = await inspectUrl(token, url);
    inspected.push(result);

    if (shouldRequireIndexed(result.inspectionUrl) && result.coverageState !== '已提交並建立索引') {
      errors.push(`${result.inspectionUrl} is not indexed: ${result.coverageState || result.verdict || 'unknown status'}`);
    }

    if (shouldRequireCanonicalMatch(result.inspectionUrl)) {
      if (!result.googleCanonicalMatches) {
        errors.push(
          `${result.inspectionUrl} Google canonical is ${result.googleCanonical}; expected ${result.expectedCanonical}`
        );
      }

      if (!result.userCanonicalMatches) {
        errors.push(
          `${result.inspectionUrl} user canonical is ${result.userCanonical}; expected ${result.expectedCanonical}`
        );
      }
    }
  }

  console.log(
    JSON.stringify(
      {
        ok: errors.length === 0,
        siteUrl,
        userProject,
        inspected,
        errors
      },
      null,
      2
    )
  );

  if (errors.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
