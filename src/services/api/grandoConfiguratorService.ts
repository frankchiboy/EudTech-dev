import {
  ConfiguratorDeviceResponse,
  ConfiguratorDevicesResponse
} from '../../types/configurator';
import {
  getFallbackDeviceResponse,
  getFallbackDevicesResponse
} from '../../data/configuratorFallbackData';

export const GRANDO_API_BASE_URL = 'https://prod.comino.com';
export const GRANDO_CONFIGURATOR_BASE_URL = 'https://configurator.grando.ai';

export type ConfiguratorDataSource = 'official_live' | 'official_cache' | 'fallback';

export type ConfiguratorDataResult<T> = {
  data: T;
  source: ConfiguratorDataSource;
};

// The Comino proxy refreshes a verified upstream cache when it expires.  The
// first request may therefore take longer than a browser-only API request;
// keep the user on the authoritative dataset instead of prematurely switching
// to a reduced local fallback.
const CONFIGURATOR_REQUEST_TIMEOUT_MS = 15_000;
const CONFIGURATOR_PROXY_URL = '/api/comino-configurator';

const fetchJson = async <T>(url: string): Promise<T> => {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), CONFIGURATOR_REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(url, { method: 'GET', signal: controller.signal });
  } finally {
    globalThis.clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Grando API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

const fetchOfficialConfiguratorData = async <T>(deviceId?: string | number): Promise<ConfiguratorDataResult<T>> => {
  const search = deviceId === undefined ? '' : `?device=${encodeURIComponent(String(deviceId))}`;
  const response = await fetchJson<{
    ok: boolean;
    source?: 'official_live' | 'official_cache';
    payload?: T;
  }>(`${CONFIGURATOR_PROXY_URL}${search}`);

  if (!response.ok || !response.payload || !response.source) {
    throw new Error('Verified Comino configurator data is unavailable.');
  }

  return { data: response.payload, source: response.source };
};

export const getConfiguratorDevices = async () => {
  try {
    const result = await fetchOfficialConfiguratorData<ConfiguratorDevicesResponse>();
    const data = result.data;
    if (!Array.isArray(data.devices)) {
      throw new Error('Grando API response did not include devices.');
    }
    return { data: data.devices, source: result.source } satisfies ConfiguratorDataResult<ConfiguratorDevicesResponse['devices']>;
  } catch (error) {
    const fallback = getFallbackDevicesResponse();
    if (!fallback.devices.length) {
      throw error;
    }
    return {
      data: fallback.devices,
      source: 'fallback' as const
    } satisfies ConfiguratorDataResult<ConfiguratorDevicesResponse['devices']>;
  }
};

export const getConfiguratorDevice = async (deviceId: string | number) => {
  try {
    const result = await fetchOfficialConfiguratorData<ConfiguratorDeviceResponse>(deviceId);
    const data = result.data;
    if (!data.device || !Array.isArray(data.options)) {
      throw new Error('Grando API response did not include a valid device.');
    }
    return { data, source: result.source } satisfies ConfiguratorDataResult<ConfiguratorDeviceResponse>;
  } catch (error) {
    const fallback = getFallbackDeviceResponse(deviceId);
    if (!fallback) {
      throw error;
    }
    return {
      data: fallback,
      source: 'fallback' as const
    } satisfies ConfiguratorDataResult<ConfiguratorDeviceResponse>;
  }
};

export const getConfiguratorAssetUrl = (path?: string) => {
  if (!path) {
    return `${GRANDO_CONFIGURATOR_BASE_URL}/image/image.png`;
  }

  if (path.startsWith('http')) {
    return path;
  }

  if (path.startsWith('/media/')) {
    return `${GRANDO_API_BASE_URL}${path}`;
  }

  if (path.startsWith('/')) {
    if (
      path.startsWith('/images/') ||
      path.startsWith('/comino-') ||
      path.startsWith('/grando-') ||
      path.startsWith('/vendor/')
    ) {
      return path;
    }
    return `${GRANDO_CONFIGURATOR_BASE_URL}${path}`;
  }

  return `${GRANDO_CONFIGURATOR_BASE_URL}/${path}`;
};
