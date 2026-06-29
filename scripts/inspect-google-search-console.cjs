const fs = require('fs');
const path = require('path');
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
  '/configurator-links.html',
  ...CONFIGURATOR_PRODUCT_SEO.map((product) => product.configuratorHref),
  '/solutions',
  ...CONFIGURATOR_SEO_PAGES.map((page) => `/solutions/${page.slug}`)
];

function getInspectionUrls() {
  const includeAliases = process.argv.includes('--include-aliases');
  const includeDoubleSlashAliases = process.argv.includes('--include-double-slash-aliases');
  const args = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
  if (args.length) {
    return args;
  }

  const canonicalUrls = defaultPaths.map((routePath) => canonicalPageUrl(`${siteOrigin}${routePath}`, siteOrigin));
  if (!includeAliases && !includeDoubleSlashAliases) {
    return canonicalUrls;
  }

  return [
    ...new Set(
      canonicalUrls.flatMap((url) => {
        const urls = [url];
        if (includeAliases) {
          urls.push(withoutTrailingPageSlash(url));
        }
        if (includeDoubleSlashAliases) {
          urls.push(url.replace(`${siteOrigin}/configurator/`, `${siteOrigin}/configurator//`));
        }
        return urls;
      })
    )
  ];
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function getArgValue(name, fallback = '') {
  const prefix = `--${name}=`;
  const matched = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return matched ? matched.slice(prefix.length) : fallback;
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

function isCanonicalInspectionUrl(inspectionUrl) {
  return inspectionUrl === canonicalPageUrl(inspectionUrl, siteOrigin);
}

function shouldRequireIndexed(inspectionUrl) {
  if (!hasFlag('fail-on-unindexed')) {
    return false;
  }

  if (!isCanonicalInspectionUrl(inspectionUrl)) {
    return false;
  }

  return true;
}

function shouldRequireCanonicalMatch(inspectionUrl) {
  if (!hasFlag('fail-on-canonical-mismatch')) {
    return false;
  }

  if (!isCanonicalInspectionUrl(inspectionUrl)) {
    return false;
  }

  return true;
}

function isIndexed(result) {
  return result.coverageState === '已提交並建立索引' ||
    result.coverageState === 'Submitted and indexed' ||
    (result.verdict === 'PASS' && result.pageFetchState === 'SUCCESSFUL');
}

function isDiscoveredNotIndexed(result) {
  return String(result.coverageState || '').includes('尚未建立索引') ||
    String(result.coverageState || '').includes('Discovered') ||
    String(result.coverageState || '').includes('not indexed');
}

function hasDoubleSlashPath(value) {
  if (!value) {
    return false;
  }

  try {
    return new URL(value).pathname.includes('//');
  } catch {
    return false;
  }
}

function groupByCoverageState(results) {
  return results.reduce((groups, result) => {
    const key = result.coverageState || result.verdict || 'unknown';
    groups[key] = (groups[key] || 0) + 1;
    return groups;
  }, {});
}

function buildSummary(inspected, errors) {
  const canonicalInspections = inspected.filter((result) => result.inspectionUrl === result.expectedCanonical);
  const aliasInspections = inspected.filter((result) => result.inspectionUrl !== result.expectedCanonical);
  const indexedCanonical = canonicalInspections.filter(isIndexed);
  const discoveredNotIndexedCanonical = canonicalInspections.filter(isDiscoveredNotIndexed);
  const canonicalMismatches = canonicalInspections.filter(
    (result) => !result.googleCanonicalMatches || !result.userCanonicalMatches
  );
  const doubleSlashUserCanonical = canonicalInspections.filter((result) => hasDoubleSlashPath(result.userCanonical));
  const canonicalWithoutSitemap = canonicalInspections.filter((result) => !Array.isArray(result.sitemap) || result.sitemap.length === 0);
  const canonicalWithFeed = canonicalInspections.filter((result) => (result.sitemap || []).includes(`${siteOrigin}/feed.xml`));

  return {
    inspectedCount: inspected.length,
    canonicalCount: canonicalInspections.length,
    aliasCount: aliasInspections.length,
    indexedCanonicalCount: indexedCanonical.length,
    unindexedCanonicalCount: canonicalInspections.length - indexedCanonical.length,
    discoveredNotIndexedCanonicalCount: discoveredNotIndexedCanonical.length,
    canonicalMismatchCount: canonicalMismatches.length,
    doubleSlashUserCanonicalCount: doubleSlashUserCanonical.length,
    canonicalWithoutSitemapCount: canonicalWithoutSitemap.length,
    canonicalWithFeedCount: canonicalWithFeed.length,
    coverageStates: groupByCoverageState(canonicalInspections),
    indexedCanonicalUrls: indexedCanonical.map((result) => result.inspectionUrl),
    unindexedCanonicalUrls: canonicalInspections
      .filter((result) => !isIndexed(result))
      .map((result) => ({
        url: result.inspectionUrl,
        coverageState: result.coverageState || result.verdict || 'unknown',
        lastCrawlTime: result.lastCrawlTime || null
      })),
    canonicalMismatches: canonicalMismatches.map((result) => ({
      url: result.inspectionUrl,
      expectedCanonical: result.expectedCanonical,
      googleCanonical: result.googleCanonical || null,
      userCanonical: result.userCanonical || null,
      googleCanonicalMatches: result.googleCanonicalMatches,
      userCanonicalMatches: result.userCanonicalMatches,
      lastCrawlTime: result.lastCrawlTime || null
    })),
    doubleSlashUserCanonical: doubleSlashUserCanonical.map((result) => ({
      url: result.inspectionUrl,
      userCanonical: result.userCanonical,
      lastCrawlTime: result.lastCrawlTime || null
    })),
    canonicalWithoutSitemap: canonicalWithoutSitemap.map((result) => result.inspectionUrl),
    errorsCount: errors.length
  };
}

function markdownList(items, renderItem = (item) => String(item)) {
  if (!items.length) {
    return ['- None'];
  }

  return items.map((item) => `- ${renderItem(item)}`);
}

function renderSummaryMarkdown(result) {
  const summary = result.summary;
  const coverageRows = Object.entries(summary.coverageStates)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([state, count]) => `| ${state} | ${count} |`);

  return [
    '# Search Console Indexing Summary',
    '',
    `Generated at: ${new Date().toISOString()}`,
    `Site: ${result.siteUrl}`,
    `User project: ${result.userProject}`,
    '',
    '## Totals',
    '',
    '| Metric | Count |',
    '|---|---:|',
    `| Inspected URLs | ${summary.inspectedCount} |`,
    `| Canonical URLs | ${summary.canonicalCount} |`,
    `| Alias URLs | ${summary.aliasCount} |`,
    `| Indexed canonical URLs | ${summary.indexedCanonicalCount} |`,
    `| Unindexed canonical URLs | ${summary.unindexedCanonicalCount} |`,
    `| Discovered but not indexed canonical URLs | ${summary.discoveredNotIndexedCanonicalCount} |`,
    `| Canonical mismatches | ${summary.canonicalMismatchCount} |`,
    `| Double-slash user canonical records | ${summary.doubleSlashUserCanonicalCount} |`,
    `| Canonical URLs without sitemap signal | ${summary.canonicalWithoutSitemapCount} |`,
    `| Canonical URLs with feed.xml signal | ${summary.canonicalWithFeedCount} |`,
    '',
    '## Coverage States',
    '',
    '| State | Count |',
    '|---|---:|',
    ...(coverageRows.length ? coverageRows : ['| None | 0 |']),
    '',
    '## Unindexed Canonical URLs',
    '',
    ...markdownList(summary.unindexedCanonicalUrls, (item) => `${item.url} (${item.coverageState}${item.lastCrawlTime ? `, last crawl ${item.lastCrawlTime}` : ''})`),
    '',
    '## Canonical Mismatches',
    '',
    ...markdownList(summary.canonicalMismatches, (item) => `${item.url} (expected ${item.expectedCanonical}, Google ${item.googleCanonical || 'none'}, user ${item.userCanonical || 'none'})`),
    '',
    '## Double-Slash User Canonical Records',
    '',
    ...markdownList(summary.doubleSlashUserCanonical, (item) => `${item.url} -> ${item.userCanonical}${item.lastCrawlTime ? `, last crawl ${item.lastCrawlTime}` : ''}`),
    ''
  ].join('\n');
}

function writeOutput(outputPath, result) {
  if (!outputPath) {
    return;
  }

  const absolutePath = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, `${JSON.stringify(result, null, 2)}\n`);
}

function writeSummaryOutput(outputPath, result) {
  if (!outputPath) {
    return;
  }

  const absolutePath = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, `${renderSummaryMarkdown(result)}\n`);
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
  const outputPath = getArgValue('output');
  const summaryOutputPath = getArgValue('summary-output');
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

    if (shouldRequireIndexed(result.inspectionUrl) && !isIndexed(result)) {
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

  const inspectedResults = inspected.filter(Boolean);
  const result = {
    ok: errors.length === 0,
    siteUrl,
    userProject,
    requestTimeoutMs,
    concurrency,
    outputPath: outputPath || undefined,
    summaryOutputPath: summaryOutputPath || undefined,
    summary: buildSummary(inspectedResults, errors),
    inspected: inspectedResults,
    errors
  };

  writeOutput(outputPath, result);
  writeSummaryOutput(summaryOutputPath, result);
  console.log(JSON.stringify(result, null, 2));

  if (errors.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
