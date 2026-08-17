import { getDeployStore, getStore } from '@netlify/blobs';
import sharp from 'sharp';

const COMINO_API_ORIGIN = 'https://prod.comino.com';
const COMINO_CONFIGURATOR_ORIGIN = 'https://configurator.grando.ai';
const CACHE_STORE_NAME = 'comino-configurator-cache-v1';
const CACHE_VERSION = 1;
const REQUIRED_MODULES = ['gpu', 'cpu', 'ram', 'storage', 'storage_1', 'storage_2', 'storage_3', 'storage_4', 'psu', 'network'];
const REQUEST_TIMEOUT_MS = 9_000;
const REQUEST_DEADLINE_MS = 25_000;
const REQUEST_MAX_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [250, 750];

// These are both official Comino CPU-2566 assets.  The upstream image service
// has intermittently returned 503 for one of the pair, so the sibling asset is
// a safe same-CPU fallback.  No other CPU family is substituted.
const OFFICIAL_IMAGE_ALTERNATES = Object.freeze({
  '/image/background/cpu/amd/2566/7007_52_WCB_MoBo_BUNDLE_INSTALL_02.jpg': [
    '/image/background/cpu/amd/2566/7007_52_WCB_MoBo_BUNDLE_INSTALL_03.jpg'
  ],
  '/image/background/cpu/amd/2566/7007_52_WCB_MoBo_BUNDLE_INSTALL_03.jpg': [
    '/image/background/cpu/amd/2566/7007_52_WCB_MoBo_BUNDLE_INSTALL_02.jpg'
  ]
});

const json = (status, body, headers = {}) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store', ...headers }
});

const isProduction = () =>
  globalThis.Netlify?.context?.deploy?.context === 'production' || process.env.CONTEXT === 'production';

const cacheStore = () =>
  isProduction() ? getStore({ name: CACHE_STORE_NAME, consistency: 'strong' }) : getDeployStore(CACHE_STORE_NAME);

const validDeviceId = (value) => /^\d+$/.test(value || '') && Number(value) > 0;
const cacheKey = (deviceId) => (deviceId ? `devices/${deviceId}.json` : 'devices/index.json');
const imageCacheKey = (assetPath, mobile) => `images-v3/${mobile ? 'mobile' : 'desktop'}/${assetPath.replace(/^\/+/, '')}`;
const validImagePath = (value) =>
  /^\/image\/background\/(?:default|psu|gpu|cpu)\/[A-Za-z0-9_./-]+\.jpg$/.test(value || '') &&
  !value.includes('..');

const hasCompleteDeviceOptions = (payload) => {
  if (!payload?.device || !Array.isArray(payload.options)) return false;
  const modules = new Set(payload.options
    .filter((option) => typeof option?.name === 'string' && option.name.trim())
    .map((option) => String(option.module_type || '').toLowerCase()));
  return REQUIRED_MODULES.every((moduleKey) => modules.has(moduleKey));
};

const hasCompleteDeviceList = (payload) => Array.isArray(payload?.devices) && payload.devices.length > 0;

async function fetchComino(path) {
  const response = await fetchWithRetry(`${COMINO_API_ORIGIN}${path}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store'
  }, 'Comino API');
  if (!response.ok) throw new Error(`Comino API responded with ${response.status}`);
  return response.json();
}

async function fetchCominoConfiguratorImage(assetPath, requestDeadline, mobile) {
  const response = await fetchWithRetry(`${COMINO_CONFIGURATOR_ORIGIN}${assetPath}`, {
      method: 'GET',
      headers: { Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8' },
      cache: 'no-store'
  }, 'Comino configurator image', requestDeadline);
  const contentType = response.headers.get('content-type') || '';
  if (!response.ok || !contentType.startsWith('image/')) {
    throw new Error(`Comino configurator image responded with ${response.status}`);
  }
  const original = Buffer.from(await response.arrayBuffer());
  const transformer = sharp(original, { failOn: 'none' }).rotate();
  if (mobile) {
    transformer.resize({ width: 960, withoutEnlargement: true });
  }
  const optimized = await transformer.webp({ quality: 84, smartSubsample: true }).toBuffer();
  return { body: optimized, contentType: 'image/webp' };
}

const isRetryableStatus = (status) => status === 408 || status === 425 || status === 429 || status >= 500;

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchWithRetry(url, init, label, requestDeadline = Date.now() + REQUEST_DEADLINE_MS) {
  const deadline = requestDeadline;
  let lastError;

  for (let attempt = 0; attempt < REQUEST_MAX_ATTEMPTS; attempt += 1) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) break;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), Math.min(REQUEST_TIMEOUT_MS, remaining));
    try {
      const response = await fetch(url, { ...init, signal: controller.signal });
      if (response.ok || !isRetryableStatus(response.status) || attempt === REQUEST_MAX_ATTEMPTS - 1) {
        return response;
      }
      await response.body?.cancel();
      lastError = new Error(`${label} responded with ${response.status}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    } finally {
      clearTimeout(timeout);
    }

    const delay = RETRY_DELAYS_MS[attempt] || RETRY_DELAYS_MS.at(-1) || 0;
    if (Date.now() + delay >= deadline) break;
    await wait(delay);
  }

  throw lastError || new Error(`${label} request timed out`);
}

const imageResponse = (body, contentType, source) => new Response(body, {
  status: 200,
  headers: {
    'Content-Type': contentType || 'image/jpeg',
    'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    'X-Eudtech-Configurator-Image-Source': source
  }
});

async function getConfiguratorImage(store, assetPath, mobile) {
  const key = imageCacheKey(assetPath, mobile);
  const candidates = [assetPath, ...(OFFICIAL_IMAGE_ALTERNATES[assetPath] || [])];
  const errors = [];
  const requestDeadline = Date.now() + REQUEST_DEADLINE_MS;

  for (const candidate of candidates) {
    try {
      const fetched = await fetchCominoConfiguratorImage(candidate, requestDeadline, mobile);
      await store.set(key, fetched.body, {
        metadata: {
          contentType: fetched.contentType,
          obtainedAt: new Date().toISOString(),
          origin: COMINO_CONFIGURATOR_ORIGIN,
          assetPath,
          sourceAssetPath: candidate
        }
      });
      return imageResponse(
        fetched.body,
        fetched.contentType,
        candidate === assetPath ? 'official_live' : 'official_live_alternate'
      );
    } catch (error) {
      errors.push(`${candidate}: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  }

  const cached = await store.getWithMetadata(key, { type: 'arrayBuffer' });
  if (cached?.data) {
    return imageResponse(cached.data, cached.metadata?.contentType, 'official_cache');
  }

  console.error('Comino configurator image unavailable:', errors.join('; '));
  return json(503, { ok: false, error: 'The requested Comino configurator image is unavailable and no verified cache exists.' });
}

async function readVerifiedCache(store, deviceId) {
  const cached = await store.get(cacheKey(deviceId), { type: 'json' });
  if (!cached?.payload || cached.version !== CACHE_VERSION) return null;
  const isValid = deviceId ? hasCompleteDeviceOptions : hasCompleteDeviceList;
  return isValid(cached.payload) ? cached : null;
}

export default async (request) => {
  if (request.method !== 'GET') return json(405, { ok: false, error: 'Method not allowed' });
  const requestUrl = new URL(request.url);
  const assetPath = requestUrl.searchParams.get('asset');
  const mobile = requestUrl.searchParams.get('mobile') === '1';
  const deviceId = requestUrl.searchParams.get('device');
  if (assetPath) {
    if (!validImagePath(assetPath)) return json(400, { ok: false, error: 'Invalid image asset path' });
    return getConfiguratorImage(cacheStore(), assetPath, mobile);
  }
  if (deviceId && !validDeviceId(deviceId)) return json(400, { ok: false, error: 'Invalid device id' });

  const store = cacheStore();
  const vendorPath = deviceId ? `/devices/${deviceId}/` : '/devices/';
  const isValid = deviceId ? hasCompleteDeviceOptions : hasCompleteDeviceList;

  try {
    const payload = await fetchComino(vendorPath);
    if (!isValid(payload)) throw new Error('Comino API response is not a complete configurator dataset');
    const obtainedAt = new Date().toISOString();
    await store.setJSON(cacheKey(deviceId), { version: CACHE_VERSION, obtainedAt, origin: COMINO_API_ORIGIN, payload });
    return json(200, { ok: true, source: 'official_live', obtainedAt, payload }, {
      'X-Eudtech-Configurator-Source': 'official_live'
    });
  } catch (error) {
    const cached = await readVerifiedCache(store, deviceId);
    if (cached) {
      return json(200, { ok: true, source: 'official_cache', obtainedAt: cached.obtainedAt, payload: cached.payload }, {
        'X-Eudtech-Configurator-Source': 'official_cache'
      });
    }
    console.error('Comino configurator source unavailable:', error instanceof Error ? error.message : 'unknown error');
    return json(503, { ok: false, error: 'The Comino configurator source is unavailable and no verified complete cache exists.' });
  }
};

export const config = { path: '/api/comino-configurator' };
