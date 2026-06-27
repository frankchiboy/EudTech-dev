const { execFileSync } = require('child_process');

const siteUrl = 'sc-domain:eudaemonia.tech';
const userProject = process.env.GOOGLE_SEARCH_CONSOLE_QUOTA_PROJECT || 'personal-gmail-vault';
const expectedSitemaps = [
  'https://eudaemonia.tech/sitemap-index.xml',
  'https://eudaemonia.tech/sitemap.xml',
  'https://eudaemonia.tech/image-sitemap.xml'
];
const maxDownloadAgeDays = Number(process.env.GOOGLE_SEARCH_CONSOLE_MAX_SITEMAP_DOWNLOAD_AGE_DAYS || '14');

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
  const token = getAccessToken();
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
    if (item.isPending) {
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
