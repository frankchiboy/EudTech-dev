const INDEXNOW_KEY = 'd6fd206f713cd936d87b58a6010aa751';
const DEFAULT_HOST = 'eudaemonia.tech';
const DEFAULT_ENDPOINT = 'https://api.indexnow.org/indexnow';

const getEnv = (key) =>
  globalThis.Netlify?.env?.get?.(key) ||
  (typeof process !== 'undefined' ? process.env?.[key] : '') ||
  '';

const json = (status, body) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store'
    }
  });

const collectSitemapUrls = (xml, host) =>
  [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => match[1].trim())
    .filter((url) => url.startsWith(`https://${host}/`));

export default async () => {
  const host = getEnv('INDEXNOW_HOST') || DEFAULT_HOST;
  const endpoint = getEnv('INDEXNOW_ENDPOINT') || DEFAULT_ENDPOINT;
  const keyLocation = `https://${host}/${INDEXNOW_KEY}.txt`;
  const sitemapUrl = `https://${host}/sitemap.xml`;

  const sitemapResponse = await fetch(sitemapUrl, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  const sitemapBody = await sitemapResponse.text();

  if (!sitemapResponse.ok) {
    console.error('Scheduled exposure sitemap fetch failed:', {
      sitemapUrl,
      status: sitemapResponse.status,
      body: sitemapBody.slice(0, 500)
    });
    return json(502, {
      ok: false,
      error: 'Sitemap fetch failed',
      status: sitemapResponse.status
    });
  }

  const urlList = collectSitemapUrls(sitemapBody, host);
  if (urlList.length === 0) {
    console.error('Scheduled exposure found no sitemap URLs:', { sitemapUrl, host });
    return json(422, {
      ok: false,
      error: 'No sitemap URLs found'
    });
  }

  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList
  };

  const indexNowResponse = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload)
  });
  const indexNowBody = await indexNowResponse.text();

  const result = {
    ok: indexNowResponse.ok,
    endpoint,
    status: indexNowResponse.status,
    submittedUrlCount: urlList.length,
    body: indexNowBody
  };

  if (!indexNowResponse.ok) {
    console.error('Scheduled exposure IndexNow submit failed:', result);
    return json(502, result);
  }

  console.log('Scheduled exposure IndexNow submit completed:', result);
  return json(200, result);
};

export const config = {
  schedule: '@weekly'
};
