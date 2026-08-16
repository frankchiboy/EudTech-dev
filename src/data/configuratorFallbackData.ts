import {
  ConfiguratorDevice,
  ConfiguratorOption,
  ConfiguratorDevicesResponse,
  ConfiguratorDeviceResponse
} from '../types/configurator';

/**
 * EudTech's locally maintained configuration baseline.
 *
 * This data is intentionally limited to model, GPU, GPU count, and CPU platform
 * facts already published in configuratorProductSeo.ts. It contains no vendor
 * price, availability, delivery, or unverified component assumptions.
 */
type FallbackProduct = {
  id: number;
  name: string;
  type: string;
  image: string;
  gpuName: string;
  gpuId: string;
  gpuBrand: string;
  gpuMemory: number;
  gpuSlots: number;
  cpuName: string;
  cpuId: string;
  cpuBrand: string;
  cpuValues: number;
  usages: string[];
};

const products: FallbackProduct[] = [
  {
    id: 27,
    name: 'INTEGRATION KIT 8x H200',
    type: 'Integration Kit',
    image: '/grando-8gpu-server.jpg',
    gpuName: 'NVIDIA H200 141GB',
    gpuId: 'h200-141gb',
    gpuBrand: 'NVIDIA',
    gpuMemory: 141,
    gpuSlots: 8,
    cpuName: 'AMD DUAL EPYC 9004 / 9005',
    cpuId: '2566',
    cpuBrand: 'AMD',
    cpuValues: 2,
    usages: ['AI TRAINING', 'AI INFERENCE', 'LIFE SCIENCE', 'CAE SIMULATIONS']
  },
  {
    id: 36,
    name: 'INTEGRATION KIT 8x PRO 6000',
    type: 'Integration Kit',
    image: '/grando-8gpu-server.jpg',
    gpuName: 'NVIDIA RTX PRO 6000 Blackwell 96GB',
    gpuId: 'rtx-pro-6000-96gb',
    gpuBrand: 'NVIDIA',
    gpuMemory: 96,
    gpuSlots: 8,
    cpuName: 'AMD DUAL EPYC 9004 / 9005',
    cpuId: '2566',
    cpuBrand: 'AMD',
    cpuValues: 2,
    usages: ['AI TRAINING', 'AI INFERENCE', 'CG & RENDERING', 'CAE SIMULATIONS']
  },
  {
    id: 29,
    name: 'SERVER 6xH200',
    type: 'Server',
    image: '/grando-8gpu-server.jpg',
    gpuName: 'NVIDIA H200 141GB',
    gpuId: 'h200-141gb',
    gpuBrand: 'NVIDIA',
    gpuMemory: 141,
    gpuSlots: 6,
    cpuName: 'AMD DUAL EPYC 9004 / 9005',
    cpuId: '2566',
    cpuBrand: 'AMD',
    cpuValues: 2,
    usages: ['AI TRAINING', 'AI INFERENCE', 'LIFE SCIENCE', 'CAE SIMULATIONS']
  },
  {
    id: 28,
    name: 'SERVER 4xH200',
    type: 'Server',
    image: '/grando-8gpu-server.jpg',
    gpuName: 'NVIDIA H200 141GB',
    gpuId: 'h200-141gb',
    gpuBrand: 'NVIDIA',
    gpuMemory: 141,
    gpuSlots: 4,
    cpuName: 'AMD SINGLE EPYC 9004 / 9005',
    cpuId: '1288',
    cpuBrand: 'AMD',
    cpuValues: 1,
    usages: ['AI TRAINING', 'AI INFERENCE', 'LIFE SCIENCE', 'CAE SIMULATIONS']
  },
  {
    id: 23,
    name: 'SERVER 8x PRO 6000',
    type: 'Server',
    image: '/grando-8gpu-server.jpg',
    gpuName: 'NVIDIA RTX PRO 6000 Blackwell 96GB',
    gpuId: 'rtx-pro-6000-96gb',
    gpuBrand: 'NVIDIA',
    gpuMemory: 96,
    gpuSlots: 8,
    cpuName: 'AMD DUAL EPYC 9004 / 9005',
    cpuId: '2566',
    cpuBrand: 'AMD',
    cpuValues: 2,
    usages: ['AI TRAINING', 'AI INFERENCE', 'CG & RENDERING', 'CAE SIMULATIONS']
  },
  {
    id: 34,
    name: 'WORKSTATION 2x PRO 6000',
    type: 'Desktop Workstation',
    image: '/comino-workstation-front.png',
    gpuName: 'NVIDIA RTX PRO 6000 Blackwell 96GB',
    gpuId: 'rtx-pro-6000-96gb',
    gpuBrand: 'NVIDIA',
    gpuMemory: 96,
    gpuSlots: 2,
    cpuName: 'AMD Ryzen Threadripper PRO',
    cpuId: '5770',
    cpuBrand: 'AMD',
    cpuValues: 1,
    usages: ['AI TRAINING', 'AI INFERENCE', 'CG & RENDERING', 'VIRTUAL PRODUCTION']
  },
  {
    id: 30,
    name: 'WORKSTATION 2xH200',
    type: 'Desktop Workstation',
    image: '/comino-workstation-front.png',
    gpuName: 'NVIDIA H200 141GB',
    gpuId: 'h200-141gb',
    gpuBrand: 'NVIDIA',
    gpuMemory: 141,
    gpuSlots: 2,
    cpuName: 'AMD Ryzen Threadripper PRO',
    cpuId: '5770',
    cpuBrand: 'AMD',
    cpuValues: 1,
    usages: ['AI TRAINING', 'AI INFERENCE', 'LIFE SCIENCE', 'CG & RENDERING']
  },
  {
    id: 22,
    name: 'RACKABLE WS 6x R9700',
    type: 'Rackable Workstation',
    image: '/grando-rackable-01.jpg',
    gpuName: 'AMD Radeon AI PRO R9700 32GB',
    gpuId: '7977',
    gpuBrand: 'AMD',
    gpuMemory: 32,
    gpuSlots: 6,
    cpuName: 'AMD SINGLE EPYC 9004 / 9005',
    cpuId: '1288',
    cpuBrand: 'AMD',
    cpuValues: 1,
    usages: ['AI TRAINING', 'AI INFERENCE', 'CG & RENDERING', 'CAE SIMULATIONS']
  },
  {
    id: 13,
    name: 'WORKSTATION 2x5090',
    type: 'Desktop Workstation',
    image: '/comino-workstation-front.png',
    gpuName: 'NVIDIA GeForce RTX 5090 32GB',
    gpuId: '5090',
    gpuBrand: 'NVIDIA',
    gpuMemory: 32,
    gpuSlots: 2,
    cpuName: 'AMD Ryzen Threadripper PRO',
    cpuId: '5770',
    cpuBrand: 'AMD',
    cpuValues: 1,
    usages: ['AI TRAINING', 'AI INFERENCE', 'CG & RENDERING', 'VIRTUAL PRODUCTION']
  },
  {
    id: 5,
    name: 'RACKABLE WS 4x PRO 6000',
    type: 'Rackable Workstation',
    image: '/grando-rackable-01.jpg',
    gpuName: 'NVIDIA RTX PRO 6000 Blackwell 96GB',
    gpuId: 'rtx-pro-6000-96gb',
    gpuBrand: 'NVIDIA',
    gpuMemory: 96,
    gpuSlots: 4,
    cpuName: 'AMD SINGLE EPYC 9004 / 9005',
    cpuId: '1288',
    cpuBrand: 'AMD',
    cpuValues: 1,
    usages: ['AI TRAINING', 'AI INFERENCE', 'CG & RENDERING', 'CAE SIMULATIONS']
  },
  {
    id: 21,
    name: 'RACKABLE WS 6x5090',
    type: 'Rackable Workstation',
    image: '/grando-rackable-01.jpg',
    gpuName: 'NVIDIA GeForce RTX 5090 32GB',
    gpuId: '5090',
    gpuBrand: 'NVIDIA',
    gpuMemory: 32,
    gpuSlots: 6,
    cpuName: 'AMD SINGLE EPYC 9004 / 9005',
    cpuId: '1288',
    cpuBrand: 'AMD',
    cpuValues: 1,
    usages: ['AI TRAINING', 'AI INFERENCE', 'CG & RENDERING', 'VIRTUAL PRODUCTION']
  }
];

const option = (product: FallbackProduct, moduleType: 'gpu' | 'cpu'): ConfiguratorOption => {
  const isGpu = moduleType === 'gpu';
  return {
    id: product.id,
    name: isGpu ? product.gpuName : product.cpuName,
    module_type: moduleType,
    unique_id: isGpu ? product.gpuId : product.cpuId,
    type: isGpu ? 'GPU' : 'CPU',
    volume: isGpu ? product.gpuMemory : product.cpuValues,
    capacity: isGpu ? product.gpuMemory : product.cpuValues,
    brand: isGpu ? product.gpuBrand : product.cpuBrand,
    price: 0,
    power: 0,
    custom_values: isGpu
      ? [1, 2, 4, 6, 8].filter((quantity) => quantity <= product.gpuSlots)
      : [product.cpuValues],
    recommended: true
  };
};

export const CONFIGURATOR_FALLBACK_DEVICES: Array<ConfiguratorDevice & { options: ConfiguratorOption[] }> = products.map(
  (product) => ({
    id: product.id,
    name: product.name,
    type: product.type,
    price: 0,
    usage: product.usages,
    gpu_slots: product.gpuSlots,
    ram_slots: 0,
    cpu_values: product.cpuValues,
    power: 0,
    photo: product.image,
    defaults: {
      gpu: product.gpuSlots,
      cpu: product.cpuValues
    },
    options: [option(product, 'gpu'), option(product, 'cpu')]
  })
);

export const getFallbackDevicesResponse = (): ConfiguratorDevicesResponse => ({
  devices: CONFIGURATOR_FALLBACK_DEVICES
});

export const getFallbackDeviceResponse = (deviceId: string | number): ConfiguratorDeviceResponse | undefined => {
  const id = Number(deviceId);
  const device = CONFIGURATOR_FALLBACK_DEVICES.find((candidate) => candidate.id === id);
  return device ? { device, options: device.options } : undefined;
};
