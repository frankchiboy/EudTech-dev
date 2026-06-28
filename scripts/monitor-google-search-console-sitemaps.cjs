const { getSearchConsoleAccessToken } = require('./google-search-console-auth.cjs');

const siteUrl = 'sc-domain:eudaemonia.tech';
const userProject = process.env.GOOGLE_SEARCH_CONSOLE_QUOTA_PROJECT || 'personal-gmail-vault';
const expectedSitemaps = [
  'https://eudaemonia.tech/sitemap-index.xml',
  'https://eudaemonia.tech/sitemap.xml',
  'https://eudaemonia.tech/image-sitemap.xml'
];
const maxDownloadAgeDays = Number(process.env.GOOGLE_SEARCH_CONSOLE_MAX_SITEMAP_DOWNLOAD_AGE_DAYS || '14');
const pendingGraceMinutes = Number(process.env.GOOGLE_SEARCH_CONSOLE_PENDING_GRACE_MINUTES || '30');

async function listSitemaps(token) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`;
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Goog-User-Project': userProject
    }
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Search Console sitemap list failed: ${response.status} ${body}`);
  }

  return JSON.parse(body).sitemap || [];
}

async function main() {
  const token = getSearchConsoleAccessToken();
  const listed = await listSitemaps(token);
  const indexedSitemaps = listed.map((item) => ({
    path: item.path,
    lastSubmitted: item.lastSubmitted,
    lastDownloaded: item.lastDownloaded,
    isPending: item.isPending || false,
    errors: Number(item.errors || 0),
    warnings: Number(item.warnings || 0)
  }));
  const byPath = new Map(indexedSitemaps.map((item) => [item.path, item]));
  const errors = [];
  const now = Date.now();

  for (const sitemap of expectedSitemaps) {
    const item = byPath.get(sitemap);
    if (!item) {
      errors.push(`Search Console is missing ${sitemap}`);
      continue;
    }

    if (item.errors !== 0) {
      errors.push(`${sitemap} has ${item.errors} Search Console errors`);
    }
    if (item.warnings !== 0) {
      errors.push(`${sitemap} has ${item.warnings} Search Console warnings`);
    }
    if (!item.lastSubmitted) {
      errors.push(`${sitemap} has no lastSubmitted timestamp`);
    }
    const lastSubmittedTime = item.lastSubmitted ? Date.parse(item.lastSubmitted) : NaN;
    const withinPendingGrace =
      item.isPending &&
      Number.isFinite(lastSubmittedTime) &&
      Number.isFinite(pendingGraceMinutes) &&
      pendingGraceMinutes > 0 &&
      now - lastSubmittedTime <= pendingGraceMinutes * 60 * 1000;
    if (item.isPending && !withinPendingGrace) {
      errors.push(`${sitemap} is still pending in Search Console`);
    }
    if (!item.lastDownloaded) {
      errors.push(`${sitemap} has no lastDownloaded timestamp`);
    } else if (Number.isFinite(maxDownloadAgeDays) && maxDownloadAgeDays > 0) {
      const lastDownloadedTime = Date.parse(item.lastDownloaded);
      const maxAgeMs = maxDownloadAgeDays * 24 * 60 * 60 * 1000;
      if (!Number.isFinite(lastDownloadedTime) || now - lastDownloadedTime > maxAgeMs) {
        errors.push(`${sitemap} lastDownloaded is older than ${maxDownloadAgeDays} days: ${item.lastDownloaded}`);
      }
    }
  }

  const result = {
    ok: errors.length === 0,
    siteUrl,
    userProject,
    maxDownloadAgeDays,
    pendingGraceMinutes,
    expectedSitemaps,
    indexedSitemaps,
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
