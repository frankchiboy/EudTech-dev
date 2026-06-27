const fs = require('fs');
const path = require('path');

const INDEXNOW_KEY = 'd6fd206f713cd936d87b58a6010aa751';
const DEFAULT_HOST = 'eudaemonia.tech';
const DEFAULT_ENDPOINT = 'https://api.indexnow.org/indexnow';

const host = process.env.INDEXNOW_HOST || DEFAULT_HOST;
const endpoint = process.env.INDEXNOW_ENDPOINT || DEFAULT_ENDPOINT;
const keyLocation = `https://${host}/${INDEXNOW_KEY}.txt`;
const sitemapPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
const keyPath = path.resolve(__dirname, '..', 'public', `${INDEXNOW_KEY}.txt`);
const isDryRun = process.argv.includes('--dry-run');

function readUrlsFromSitemap() {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => match[1].trim())
    .filter((url) => url.startsWith(`https://${host}/`));
}

async function submitIndexNow(urlList) {
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList
  };

  if (isDryRun) {
    console.log(JSON.stringify({ endpoint, payload }, null, 2));
    return;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload)
  });

  const body = await response.text();
  console.log(JSON.stringify({ status: response.status, ok: response.ok, body }, null, 2));

  if (!response.ok) {
    process.exit(1);
  }
}

if (!fs.existsSync(keyPath)) {
  throw new Error(`Missing IndexNow key file: ${keyPath}`);
}

const keyFileValue = fs.readFileSync(keyPath, 'utf8').trim();
if (keyFileValue !== INDEXNOW_KEY) {
  throw new Error('IndexNow key file does not match script key');
}

const urlList = readUrlsFromSitemap();
if (urlList.length === 0) {
  throw new Error(`No sitemap URLs found for host ${host}`);
}

submitIndexNow(urlList).catch((error) => {
  console.error(error);
  process.exit(1);
});
