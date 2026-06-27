const { execFileSync } = require('child_process');
const { canonicalPageUrl, withoutTrailingPageSlash } = require('./seo-url-helpers.cjs');

const siteUrl = 'sc-domain:eudaemonia.tech';
const siteOrigin = 'https://eudaemonia.tech';
const userProject = process.env.GOOGLE_SEARCH_CONSOLE_QUOTA_PROJECT || 'personal-gmail-vault';
const defaultScopes = [
  { label: 'configurator', pageContains: withoutTrailingPageSlash(canonicalPageUrl(`${siteOrigin}/configurator`, siteOrigin)) },
  { label: 'solutions', pageContains: withoutTrailingPageSlash(canonicalPageUrl(`${siteOrigin}/solutions`, siteOrigin)) }
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

function getArgValue(name, fallback) {
  const prefix = `--${name}=`;
  const matched = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return matched ? matched.slice(prefix.length) : fallback;
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

function getDateRange() {
  const end = getArgValue('end', '');
  const start = getArgValue('start', '');
  if (start && end) {
    return { startDate: start, endDate: end };
  }

  const days = Number(getArgValue('days', '28'));
  if (!Number.isFinite(days) || days < 1 || days > 365) {
    throw new Error('--days must be a number between 1 and 365.');
  }

  const endDate = new Date();
  endDate.setUTCDate(endDate.getUTCDate() - 2);
  const startDate = new Date(endDate);
  startDate.setUTCDate(startDate.getUTCDate() - days + 1);

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  };
}

function getRowLimit() {
  const rowLimit = Number(getArgValue('row-limit', '25'));
  if (!Number.isFinite(rowLimit) || rowLimit < 1 || rowLimit > 25000) {
    throw new Error('--row-limit must be a number between 1 and 25000.');
  }

  return rowLimit;
}

async function querySearchAnalytics(token, { startDate, endDate, dimensions, pageContains, rowLimit }) {
  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
        'X-Goog-User-Project': userProject
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions,
        rowLimit,
        dimensionFilterGroups: [
          {
            filters: [
              {
                dimension: 'page',
                operator: 'contains',
                expression: pageContains
              }
            ]
          }
        ]
      })
    }
  );

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Search Analytics query failed: ${response.status} ${body}`);
  }

  return JSON.parse(body).rows || [];
}

function normalizeRow(row, dimensions) {
  const keys = row.keys || [];
  return {
    ...Object.fromEntries(dimensions.map((dimension, index) => [dimension, keys[index] || ''])),
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0
  };
}

async function buildScopeReport(token, scope, dateRange, rowLimit) {
  const topQueries = await querySearchAnalytics(token, {
    ...dateRange,
    dimensions: ['query', 'page'],
    pageContains: scope.pageContains,
    rowLimit
  });
  const topPages = await querySearchAnalytics(token, {
    ...dateRange,
    dimensions: ['page'],
    pageContains: scope.pageContains,
    rowLimit
  });

  return {
    ...scope,
    topQueries: topQueries.map((row) => normalizeRow(row, ['query', 'page'])),
    topPages: topPages.map((row) => normalizeRow(row, ['page']))
  };
}

async function main() {
  const token = getAccessToken();
  const dateRange = getDateRange();
  const rowLimit = getRowLimit();
  const scopes = [];

  for (const scope of defaultScopes) {
    scopes.push(await buildScopeReport(token, scope, dateRange, rowLimit));
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        siteUrl,
        userProject,
        dateRange,
        rowLimit,
        scopes
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
