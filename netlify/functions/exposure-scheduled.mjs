import { getDeployStore, getStore } from '@netlify/blobs';
import { manifestEntryMap, resolveIndexNowDelta } from './indexnow-delta.mjs';

const INDEXNOW_KEY = 'd6fd206f713cd936d87b58a6010aa751';
const DEFAULT_HOST = 'eudaemonia.tech';
const DEFAULT_ENDPOINT = 'https://api.indexnow.org/indexnow';
const INDEXNOW_STORE = 'configurator-indexnow';
const INDEXNOW_STATE_KEY = 'production-url-hashes';

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

const isProduction = () =>
  globalThis.Netlify?.context?.deploy?.context === 'production' || getEnv('CONTEXT') === 'production';

const indexNowStore = () => (
  isProduction()
    ? getStore(INDEXNOW_STORE, { consistency: 'strong' })
    : getDeployStore(INDEXNOW_STORE)
);

export default async () => {
  const host = getEnv('INDEXNOW_HOST') || DEFAULT_HOST;
  const endpoint = getEnv('INDEXNOW_ENDPOINT') || DEFAULT_ENDPOINT;
  const keyLocation = `https://${host}/${INDEXNOW_KEY}.txt`;
  const manifestUrl = `https://${host}/discovery-lastmod.json`;

  const manifestResponse = await fetch(manifestUrl, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  const manifestBody = await manifestResponse.text();

  if (!manifestResponse.ok) {
    console.error('Scheduled exposure manifest fetch failed:', {
      manifestUrl,
      status: manifestResponse.status,
      body: manifestBody.slice(0, 500)
    });
    return json(502, {
      ok: false,
      error: 'Discovery manifest fetch failed',
      status: manifestResponse.status
    });
  }

  let manifest;
  try {
    manifest = JSON.parse(manifestBody);
  } catch {
    return json(422, { ok: false, error: 'Discovery manifest is not valid JSON' });
  }

  const currentEntries = manifestEntryMap(manifest, host);
  if (Object.keys(currentEntries).length === 0) {
    console.error('Scheduled exposure found no manifest entries:', { manifestUrl, host });
    return json(422, {
      ok: false,
      error: 'No IndexNow manifest entries found'
    });
  }

  const store = indexNowStore();
  const previousState = await store.get(INDEXNOW_STATE_KEY, { type: 'json' });
  const previousEntries = previousState?.entries && typeof previousState.entries === 'object'
    ? previousState.entries
    : {};
  const delta = resolveIndexNowDelta(currentEntries, previousEntries);

  if (delta.urlList.length === 0) {
    return json(200, {
      ok: true,
      mode: 'delta',
      submittedUrlCount: 0,
      changedUrlCount: 0,
      deletedUrlCount: 0,
      manifestUrl
    });
  }

  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList: delta.urlList
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
    mode: 'delta',
    submittedUrlCount: delta.urlList.length,
    changedUrlCount: delta.changedUrlCount,
    deletedUrlCount: delta.deletedUrlCount,
    manifestUrl,
    body: indexNowBody
  };

  if (!indexNowResponse.ok) {
    console.error('Scheduled exposure IndexNow submit failed:', result);
    return json(502, result);
  }

  await store.setJSON(INDEXNOW_STATE_KEY, {
    version: 1,
    entries: currentEntries,
    updatedAt: new Date().toISOString()
  });

  console.log('Scheduled exposure IndexNow submit completed:', result);
  return json(200, result);
};

export const config = {
  schedule: '@weekly'
};
