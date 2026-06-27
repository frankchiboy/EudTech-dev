const { execFileSync } = require('child_process');
const { readFileSync } = require('fs');
const path = require('path');

const siteUrl = 'sc-domain:eudaemonia.tech';
const userProject = process.env.GOOGLE_SEARCH_CONSOLE_QUOTA_PROJECT || 'personal-gmail-vault';
const sitemaps = [
  'https://eudaemonia.tech/sitemap-index.xml',
  'https://eudaemonia.tech/sitemap.xml',
  'https://eudaemonia.tech/image-sitemap.xml'
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

async function submitSitemap(token, sitemap) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(
    sitemap
  )}`;
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Goog-User-Project': userProject
    }
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Search Console sitemap submit failed for ${sitemap}: ${response.status} ${body}`);
  }

  return { sitemap, status: response.status };
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

  return JSON.parse(body);
}

async function main() {
  const sitemapPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
  const sitemapXml = readFileSync(sitemapPath, 'utf8');
  if (!sitemapXml.includes('https://eudaemonia.tech/configurator')) {
    throw new Error('public/sitemap.xml does not contain the configurator URL.');
  }

  const token = getAccessToken();
  const submitted = [];
  for (const sitemap of sitemaps) {
    submitted.push(await submitSitemap(token, sitemap));
  }

  const listed = await listSitemaps(token);
  console.log(
    JSON.stringify(
      {
        ok: true,
        siteUrl,
        userProject,
        submitted,
        indexedSitemaps: (listed.sitemap || []).map((item) => ({
          path: item.path,
          lastSubmitted: item.lastSubmitted,
          errors: item.errors,
          warnings: item.warnings
        }))
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
