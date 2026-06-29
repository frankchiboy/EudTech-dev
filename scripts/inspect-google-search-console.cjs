const { canonicalPageUrl, withoutTrailingPageSlash } = require('./seo-url-helpers.cjs');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { getSearchConsoleAccessToken } = require('./google-search-console-auth.cjs');

const siteUrl = 'sc-domain:eudaemonia.tech';
const siteOrigin = 'https://eudaemonia.tech';
const userProject = process.env.GOOGLE_SEARCH_CONSOLE_QUOTA_PROJECT || 'personal-gmail-vault';
const { CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();
const DEFAULT_REQUEST_TIMEOUT_MS = 15000;
const DEFAULT_CONCURRENCY = 4;
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

function readNumberArg(name, fallback) {
  const prefix = `--${name}=`;
  const inlineArg = process.argv.find((arg) => arg.startsWith(prefix));
  const value = inlineArg ? inlineArg.slice(prefix.length) : process.env[name.toUpperCase().replace(/-/g, '_')];
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid --${name} value: ${value}`);
  }

  return parsed;
}

function readIntegerArg(name, fallback) {
  const parsed = readNumberArg(name, fallback);
  if (!Number.isInteger(parsed)) {
    throw new Error(`Invalid --${name} value: ${parsed}`);
  }

  return parsed;
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

async function inspectUrl(token, inspectionUrl, requestTimeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
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
    }),
    signal: controller.signal
  }).finally(() => clearTimeout(timeout));

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
  const requestTimeoutMs = readNumberArg('request-timeout-ms', DEFAULT_REQUEST_TIMEOUT_MS);
  const concurrency = Math.min(readIntegerArg('concurrency', DEFAULT_CONCURRENCY), inspectionUrls.length || 1);
  if (hasFlag('list-urls')) {
    console.log(
      JSON.stringify(
        {
          ok: true,
          siteUrl,
          userProject,
          requestTimeoutMs,
          concurrency,
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
  const inspected = new Array(inspectionUrls.length);
  const errors = [];
  let nextIndex = 0;

  async function inspectNextUrl() {
    const index = nextIndex;
    nextIndex += 1;
    if (index >= inspectionUrls.length) {
      return;
    }

    const url = inspectionUrls[index];
    let result;
    try {
      result = await inspectUrl(token, url, requestTimeoutMs);
    } catch (error) {
      const message = error.name === 'AbortError' ? `timed out after ${requestTimeoutMs}ms` : error.message;
      errors.push(`${url} inspection failed: ${message}`);
      await inspectNextUrl();
      return;
    }
    inspected[index] = result;

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

    await inspectNextUrl();
  }

  await Promise.all(Array.from({ length: concurrency }, inspectNextUrl));

  console.log(
    JSON.stringify(
      {
        ok: errors.length === 0,
        siteUrl,
        userProject,
        requestTimeoutMs,
        concurrency,
        inspected: inspected.filter(Boolean),
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
