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

export type ConfiguratorDataSource = 'live' | 'fallback';

export type ConfiguratorDataResult<T> = {
  data: T;
  source: ConfiguratorDataSource;
};

const CONFIGURATOR_REQUEST_TIMEOUT_MS = 4000;

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

export const getConfiguratorDevices = async () => {
  try {
    const data = await fetchJson<ConfiguratorDevicesResponse>(`${GRANDO_API_BASE_URL}/devices/`);
    if (!Array.isArray(data.devices)) {
      throw new Error('Grando API response did not include devices.');
    }
    return { data: data.devices, source: 'live' as const } satisfies ConfiguratorDataResult<ConfiguratorDevicesResponse['devices']>;
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
    const data = await fetchJson<ConfiguratorDeviceResponse>(`${GRANDO_API_BASE_URL}/devices/${deviceId}/`);
    if (!data.device || !Array.isArray(data.options)) {
      throw new Error('Grando API response did not include a valid device.');
    }
    return { data, source: 'live' as const } satisfies ConfiguratorDataResult<ConfiguratorDeviceResponse>;
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
