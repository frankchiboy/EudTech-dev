import { getDeployStore, getStore } from '@netlify/blobs';

const COMINO_API_ORIGIN = 'https://prod.comino.com';
const CACHE_STORE_NAME = 'comino-configurator-cache-v1';
const CACHE_VERSION = 1;
const REQUIRED_MODULES = ['gpu', 'cpu', 'ram', 'storage', 'storage_1', 'storage_2', 'storage_3', 'storage_4', 'psu', 'network'];
const REQUEST_TIMEOUT_MS = 12_000;

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

const hasCompleteDeviceOptions = (payload) => {
  if (!payload?.device || !Array.isArray(payload.options)) return false;
  const modules = new Set(payload.options
    .filter((option) => typeof option?.name === 'string' && option.name.trim())
    .map((option) => String(option.module_type || '').toLowerCase()));
  return REQUIRED_MODULES.every((moduleKey) => modules.has(moduleKey));
};

const hasCompleteDeviceList = (payload) => Array.isArray(payload?.devices) && payload.devices.length > 0;

async function fetchComino(path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${COMINO_API_ORIGIN}${path}`, {
      method: 'GET',
      signal: controller.signal,
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`Comino API responded with ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
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
  const deviceId = requestUrl.searchParams.get('device');
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
