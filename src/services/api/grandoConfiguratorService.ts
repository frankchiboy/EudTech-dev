import {
  ConfiguratorDeviceResponse,
  ConfiguratorDevicesResponse
} from '../../types/configurator';

export const GRANDO_API_BASE_URL = 'https://prod.comino.com';
export const GRANDO_CONFIGURATOR_BASE_URL = 'https://configurator.grando.ai';

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error(`Grando API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const getConfiguratorDevices = async () => {
  const data = await fetchJson<ConfiguratorDevicesResponse>(`${GRANDO_API_BASE_URL}/devices/`);
  return data.devices;
};

export const getConfiguratorDevice = async (deviceId: string | number) => {
  return fetchJson<ConfiguratorDeviceResponse>(`${GRANDO_API_BASE_URL}/devices/${deviceId}/`);
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
    return `${GRANDO_CONFIGURATOR_BASE_URL}${path}`;
  }

  return `${GRANDO_CONFIGURATOR_BASE_URL}/${path}`;
};
