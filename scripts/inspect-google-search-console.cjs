const { execFileSync } = require('child_process');
const { canonicalPageUrl, withoutTrailingPageSlash } = require('./seo-url-helpers.cjs');

const siteUrl = 'sc-domain:eudaemonia.tech';
const siteOrigin = 'https://eudaemonia.tech';
const userProject = process.env.GOOGLE_SEARCH_CONSOLE_QUOTA_PROJECT || 'personal-gmail-vault';
const defaultPaths = [
  '/configurator',
  '/configurator/28',
  '/configurator/29',
  '/solutions',
  '/solutions/gpu-server-quote',
  '/solutions/nvidia-h200-server'
];

function getAccessToken() {
  const env = { ...process.env };
  delete env.GOOGLE_APPLICATION_CREDENTIALS;

  try {
    return execFileSync('gcloud', ['auth', 'application-default', 'print-access-token'], {
      env,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    }).trim();
  } catch (error) {
    throw new Error(
      `Unable to get Google ADC access token. Run gcloud auth application-default login with the Search Console scope first. ${error.message}`
    );
  }
}

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
  const token = getAccessToken();
  const inspected = [];
  const errors = [];
  for (const url of getInspectionUrls()) {
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
