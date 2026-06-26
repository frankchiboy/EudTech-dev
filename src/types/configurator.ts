export const CONFIGURATOR_MODULES = [
  'gpu',
  'cpu',
  'motherboard',
  'network',
  'packaging',
  'platform',
  'psu',
  'ram',
  'storage',
  'storage_1',
  'storage_2',
  'storage_3',
  'storage_4',
  'nvlink'
] as const;

export type ConfiguratorModule = typeof CONFIGURATOR_MODULES[number];

export interface ConfiguratorDefaults {
  [key: string]: number | undefined;
  cpu?: number;
  gpu?: number;
  psu?: number;
  ram?: number;
  motherboard?: number;
  storage?: number;
}

export interface ConfiguratorDevice {
  id: number;
  name: string;
  type: string;
  price: number;
  usage: string[];
  gpu_slots: number;
  ram_slots: number;
  cpu_values: number;
  power: number;
  photo: string;
  defaults: ConfiguratorDefaults;
}

export interface ConfiguratorOptionAddon {
  id?: number;
  name?: string;
  component_type?: string;
  quantity?: number;
  price?: number;
  unique_id?: string;
}

export interface ConfiguratorOption {
  id?: number;
  name: string;
  module_type: string;
  unique_id?: string;
  type?: string;
  volume: number;
  capacity: number;
  brand?: string | null;
  price?: number;
  addon?: boolean;
  power?: number;
  custom_values: number[];
  recommended?: boolean;
  addons?: ConfiguratorOptionAddon[];
}

export interface ConfiguratorSpecItem extends ConfiguratorOption {
  total_quantity: number;
  quantity?: number;
}

export interface ConfiguratorSpec {
  gpu?: ConfiguratorSpecItem;
  cpu?: ConfiguratorSpecItem;
  motherboard?: ConfiguratorSpecItem;
  network?: ConfiguratorSpecItem;
  packaging?: ConfiguratorSpecItem;
  platform?: ConfiguratorSpecItem;
  psu?: ConfiguratorSpecItem;
  ram?: ConfiguratorSpecItem;
  storage?: ConfiguratorSpecItem;
  storage_1?: ConfiguratorSpecItem;
  storage_2?: ConfiguratorSpecItem;
  storage_3?: ConfiguratorSpecItem;
  storage_4?: ConfiguratorSpecItem;
  nvlink?: ConfiguratorSpecItem;
  device?: ConfiguratorDevice;
  price?: number;
  [key: string]: ConfiguratorSpecItem | ConfiguratorDevice | number | undefined;
}

export interface ConfiguratorDevicesResponse {
  devices: Array<ConfiguratorDevice & { options: ConfiguratorOption[] }>;
}

export interface ConfiguratorDeviceResponse {
  device: ConfiguratorDevice;
  options: ConfiguratorOption[];
  benchmarks?: unknown[];
}

export interface ConfiguratorValidation {
  [key: string]: string | undefined;
  psu?: string;
  gpu?: string;
  cpu?: string;
  button?: string;
  important?: string;
}

export interface ConfiguratorBackgroundPoint {
  title: string;
  top: number;
  left: number;
}

export interface ConfiguratorBackgroundImage {
  url: string;
  points: ConfiguratorBackgroundPoint[];
}
