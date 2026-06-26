import {
  CONFIGURATOR_MODULES,
  ConfiguratorBackgroundImage,
  ConfiguratorDevice,
  ConfiguratorModule,
  ConfiguratorOption,
  ConfiguratorSpec,
  ConfiguratorSpecItem,
  ConfiguratorValidation
} from '../../types/configurator';
import { GRANDO_CONFIGURATOR_BASE_URL } from '../../services/api/grandoConfiguratorService';

export const MODULE_LABELS: Record<string, string> = {
  gpu: 'GPU',
  cpu: 'CPU',
  ram: 'RAM',
  storage: 'OS Drive',
  storage_1: 'Data Drive 1',
  storage_2: 'Data Drive 2',
  storage_3: 'Data Drive 3',
  storage_4: 'Data Drive 4',
  psu: 'Power Supply System',
  network: 'Network',
  motherboard: 'Motherboard',
  platform: 'Platform',
  packaging: 'Packaging',
  nvlink: 'NVLink'
};

export const USAGE_COLORS: Record<string, string> = {
  'AI TRAINING': '#FF5733',
  'AI INFERENCE': '#FFB833',
  'PASSWORD RECOVERY': '#80FF33',
  'VIRTUAL PRODUCTION': '#33FF9F',
  'CG & RENDERING': '#33B8FF',
  'LIFE SCIENCE': '#5733FF',
  'CAE SIMULATIONS': '#B833FF'
};

const backgroundSets = {
  defaultHigh: [
    {
      url: '/image/background/default/5-6/Default_GRANDO_DPR_4090-FT_6_38.jpg',
      points: [
        { title: 'Redundant for server fans (up to 4 kW cooling capacity).', top: 24, left: 72 },
        { title: 'Comino Monitoring System collects cooling system log to analyze device usage history, log failure events and to monitor the temperature statistic.', top: 20, left: 38 },
        { title: 'Liquid cooling of the CPU and the VRM modules.', top: 38, left: 42 },
        { title: 'IPMI architecture for remote management.', top: 40, left: 23 },
        { title: 'Quick Disconnect Couplings on each GPU and CPU allows easy maintenance.', top: 47, left: 51 },
        { title: 'Waterblock for GPU occupies 1 slot only.', top: 66, left: 37 },
        { title: 'Comino liquid cooling system ensures 24/7 operation even in harsh environment with no thermal throttling.', top: 76, left: 57 }
      ]
    },
    {
      url: '/image/background/default/5-6/GRANDO_DPR_4090-FT_6_03.jpg',
      points: [
        { title: 'Redundant for server fans (up to 4 kW cooling capacity).', top: 15, left: 38 },
        { title: 'Comino Monitoring System collects cooling system log to analyze device usage history, log failure events and to monitor the temperature statistic.', top: 41, left: 32 },
        { title: 'Waterblock for GPU occupies 1 slot only.', top: 41, left: 62 },
        { title: 'Quick Disconnect Couplings on each GPU and CPU allows easy maintenance.', top: 50, left: 50 },
        { title: '19" rack-mountable or standalone as a Desktop.', top: 64, left: 21 },
        { title: 'IPMI architecture for remote management.', top: 81, left: 43 }
      ]
    },
    {
      url: '/image/background/default/5-6/GRANDO_DPR_4090-FT_6_04.jpg',
      points: [
        { title: 'Redundant for server fans (up to 4 kW cooling capacity).', top: 22, left: 50 },
        { title: 'Comino liquid cooling system ensures 24/7 operation even in harsh environment with no thermal throttling.', top: 30, left: 56 },
        { title: 'Comino Monitoring System collects cooling system log to analyze device usage history, log failure events and to monitor the temperature statistic.', top: 34, left: 26 },
        { title: 'Waterblock for GPU occupies 1 slot only.', top: 40, left: 42 },
        { title: '19" rack-mountable or standalone as a Desktop.', top: 60, left: 60 },
        { title: 'IPMI architecture for remote management.', top: 70, left: 27 }
      ]
    },
    {
      url: '/image/background/default/5-6/GRANDO_DPR_4090-FT_6_28.jpg',
      points: [
        { title: '19" rack-mountable or standalone as a Desktop.', top: 13, left: 27 },
        { title: 'Redundant for server fans (up to 4 kW cooling capacity).', top: 24, left: 73 },
        { title: 'Liquid cooling of the CPU and the VRM modules.', top: 41, left: 39 },
        { title: 'Quick Disconnect Couplings on each GPU and CPU allows easy maintenance.', top: 50, left: 54 },
        { title: 'Comino liquid cooling system ensures 24/7 operation even in harsh environment with no thermal throttling.', top: 63, left: 36 }
      ]
    },
    {
      url: '/image/background/default/5-6/GRANDO_DPR_4090-FT_6_29.jpg',
      points: [
        { title: '19" rack-mountable or standalone as a Desktop.', top: 12, left: 37 },
        { title: 'Comino Monitoring System collects cooling system log to analyze device usage history, log failure events and to monitor the temperature statistic.', top: 21, left: 42 },
        { title: 'Liquid cooling of the CPU and the VRM modules.', top: 41, left: 60 },
        { title: 'Redundant for server fans (up to 4 kW cooling capacity).', top: 48, left: 97 },
        { title: 'Waterblock for GPU occupies 1 slot only.', top: 60, left: 44 },
        { title: 'Comino liquid cooling system ensures 24/7 operation even in harsh environment with no thermal throttling.', top: 77, left: 72 }
      ]
    },
    {
      url: '/image/background/default/5-6/GRANDO_DPR_4090-FT_6_40.jpg',
      points: [{ title: 'Waterblock for GPU occupies 1 slot only.', top: 22, left: 48 }]
    }
  ],
  defaultLow: [
    {
      url: '/image/background/default/1-4/DEFAULT_14.jpg',
      points: [
        { title: 'Desktop as a Workstation or 19" rack-mountable.', top: 15, left: 35 },
        { title: 'Comino Monitoring System collects cooling system log to analyze device usage history, log failure events and to monitor the temperature statistic.', top: 20, left: 45 },
        { title: 'Liquid cooling of the CPU and the VRM modules.', top: 42, left: 47 },
        { title: 'IPMI architecture for remote management.', top: 40, left: 29 },
        { title: 'Silent solution fans', top: 45, left: 65 },
        { title: 'Quick Disconnect Couplings on each GPU and CPU allows easy maintenance.', top: 53, left: 57 },
        { title: 'Comino liquid cooling system ensures 24/7 operation even in harsh environment with no thermal throttling.', top: 66, left: 63 }
      ]
    },
    {
      url: '/image/background/default/1-4/24.jpg',
      points: [
        { title: 'Comino Monitoring System collects cooling system log to analyze device usage history, log failure events and to monitor the temperature statistic.', top: 20, left: 26 },
        { title: 'Quick Disconnect Couplings on each GPU and CPU allows easy maintenance.', top: 45, left: 53 },
        { title: 'Waterblock for GPU occupies 1 slot only.', top: 57, left: 41 },
        { title: 'Silent solution fans.', top: 75, left: 60 }
      ]
    }
  ],
  psuServer: [
    {
      url: '/image/background/psu/server/Default_GRANDO_DPR_4090-FT_6_17.jpg',
      points: [
        { title: 'Redundancy (2+2, 3+1, 4+0) up to 6.4 kW.', top: 45, left: 35 },
        { title: 'Optional installation of up to 8 hot swap SSDs.', top: 55, left: 70 }
      ]
    },
    {
      url: '/image/background/psu/server/GRANDO_DPR_4090-FT_6_15.jpg',
      points: [
        { title: 'Comino liquid cooling system ensures 24/7 operation even in harsh environment with no thermal throttling.', top: 17, left: 35 },
        { title: 'Redundancy (2+2, 3+1, 4+0) up to 6.4 kW.', top: 83, left: 40 },
        { title: 'Optional installation of up to 8 hot swap SSDs.', top: 83, left: 72 }
      ]
    },
    {
      url: '/image/background/psu/server/GRANDO_DPR_4090-FT_6_16.jpg',
      points: [
        { title: 'Redundancy (2+2, 3+1, 4+0) up to 6.4 kW.', top: 74, left: 37 },
        { title: 'Optional installation of up to 8 hot swap SSDs.', top: 74, left: 75 }
      ]
    },
    {
      url: '/image/background/psu/server/GRANDO_DPR_4090-FT_6_26.jpg',
      points: [
        { title: 'Comino Monitoring System collects cooling system log to analyze device usage history, log failure events and to monitor the temperature statistic.', top: 23, left: 75 },
        { title: 'Redundant for server fans (up to 4 kW cooling capacity).', top: 34, left: 30 },
        { title: '19" rack-mountable or standalone as a Desktop.', top: 60, left: 65 },
        { title: 'Redundancy (2+2, 3+1, 4+0) up to 6.4 kW.', top: 75, left: 30 },
        { title: 'Optional installation of up to 8 hot swap SSDs.', top: 82, left: 45 }
      ]
    },
    {
      url: '/image/background/psu/server/GRANDO_DPR_4090-FT_6_27.jpg',
      points: [
        { title: 'Redundancy (2+2, 3+1, 4+0) up to 6.4 kW.', top: 70, left: 35 },
        { title: 'Optional installation of up to 8 hot swap SSDs.', top: 73, left: 61 }
      ]
    }
  ],
  psuWorkstation: [
    { url: '/image/background/psu/workstation/10-2.jpg', points: [{ title: 'Desktop as a Workstation or 19" rack-mountable.', top: 50, left: 45 }] },
    { url: '/image/background/psu/workstation/36-2.jpg', points: [{ title: 'Desktop as a Workstation or 19" rack-mountable.', top: 28, left: 50 }] },
    { url: '/image/background/psu/workstation/DEFAULT_32.jpg', points: [{ title: 'Silent solution fans.', top: 50, left: 25 }] },
    {
      url: '/image/background/psu/workstation/GRANDO_DPR_3080-FT_6_36.jpg',
      points: [
        { title: 'Desktop as a Workstation or 19" rack-mountable.', top: 30, left: 69 },
        { title: 'Quick Disconnect Couplings on each GPU and CPU allows easy maintenance.', top: 35, left: 42 },
        { title: 'Comino liquid cooling system ensures 24/7 operation even in harsh environment with no thermal throttling.', top: 63, left: 35 }
      ]
    },
    {
      url: '/image/background/psu/workstation/GRANDO_DPR_3080-FT_6_52.jpg',
      points: [
        { title: 'Comino liquid cooling system ensures 24/7 operation even in harsh environment with no thermal throttling.', top: 23, left: 38 },
        { title: 'Silent solution fans.', top: 30, left: 66 }
      ]
    },
    { url: '/image/background/psu/workstation/DEFAULT_GRANDO_DPR_3080-FT_6_56.jpg', points: [{ title: 'Silent solution fans.', top: 29, left: 52 }] },
    { url: '/image/background/psu/workstation/GRANDO_DPR_3080-FT_6_63.jpg', points: [] }
  ],
  gpuAmd: [
    { url: '/image/background/gpu/amd/01_GRANDO_RM-M-CRPS_7000WX_6xW7900_06.jpg', points: [{ title: '19" rack-mountable or standalone as a Desktop', top: 62, left: 68 }, { title: 'Waterblock for GPU occupies 1 slot only', top: 64, left: 42 }, { title: 'IPMI architecture for remote management', top: 73, left: 32 }] },
    { url: '/image/background/gpu/amd/GRANDO_RM-M-CRPS_7000WX_6xW7900_04.jpg', points: [{ title: 'Redundant for server fans (up to 4 kW cooling capacity)', top: 20, left: 50 }, { title: 'Waterblock for GPU occupies 1 slot only', top: 67, left: 59 }, { title: 'IPMI architecture for remote management', top: 84, left: 45 }] },
    { url: '/image/background/gpu/amd/GRANDO_RM-M-CRPS_7000WX_6xW7900_13.jpg', points: [{ title: 'Comino Monitoring System collects cooling system log to analyze device usage history, log failure events and to monitor the temperature statistic', top: 21, left: 33 }, { title: 'Redundant for server fans (up to 4 kW cooling capacity)', top: 47, left: 68 }, { title: 'IPMI architecture for remote management', top: 43, left: 27 }] },
    { url: '/image/background/gpu/amd/GRANDO_RM-M-CRPS_7000WX_6xW7900_15.jpg', points: [{ title: 'Comino Monitoring System collects cooling system log to analyze device usage history, log failure events and to monitor the temperature statistic', top: 26, left: 25 }, { title: 'Redundant for server fans (up to 4 kW cooling capacity)', top: 50, left: 76 }, { title: '19" rack-mountable or standalone as a Desktop', top: 55, left: 33 }, { title: 'Waterblock for GPU occupies 1 slot only', top: 77, left: 27 }] },
    { url: '/image/background/gpu/amd/GRANDO_RM-M-CRPS_7000WX_6xW7900_21.jpg', points: [{ title: 'Waterblock for GPU occupies 1 slot only', top: 48, left: 45 }] },
    { url: '/image/background/gpu/amd/GRANDO_RM-M-CRPS_7000WX_6xW7900_27.jpg', points: [{ title: 'Comino liquid cooling system ensures 24/7 operation even in harsh environment with no thermal throttling', top: 51, left: 62 }, { title: 'Waterblock for GPU occupies 1 slot only', top: 50, left: 38 }] }
  ],
  gpuEight: [
    { url: '/image/background/gpu/1/COMINO_LC_GPU_SERVER_8xH100_03.jpg', points: [] },
    { url: '/image/background/gpu/1/COMINO_LC_GPU_SERVER_8xH100_06.jpg', points: [] },
    { url: '/image/background/gpu/1/COMINO_LC_GPU_SERVER_8xH100_14.jpg', points: [] },
    { url: '/image/background/gpu/1/COMINO_LC_GPU_SERVER_8xH100_15.jpg', points: [] }
  ],
  cpuAmdDefault: [
    { url: '/image/background/cpu/amd/90988_DEFAULT/5532_WCB_MoBo_BUNDLE_INSTALL_01.jpg', points: [] },
    { url: '/image/background/cpu/amd/90988_DEFAULT/7764_WCB_MoBo_BUNDLE_INSTALL_01.jpg', points: [] },
    { url: '/image/background/cpu/amd/90988_DEFAULT/7764_WCB_MoBo_BUNDLE_INSTALL_MACRO_01.jpg', points: [] }
  ],
  cpuAmdSingleEpyc: [
    { url: '/image/background/cpu/amd/1288/7005_52_WCB_MoBo_BUNDLE_INSTALL_01.jpg', points: [] },
    { url: '/image/background/cpu/amd/1288/7005_52_WCB_MoBo_BUNDLE_INSTALL_02.jpg', points: [] }
  ],
  cpuAmdDualEpyc: [
    { url: '/image/background/cpu/amd/2566/7007_52_WCB_MoBo_BUNDLE_INSTALL_02.jpg', points: [] },
    { url: '/image/background/cpu/amd/2566/7007_52_WCB_MoBo_BUNDLE_INSTALL_03.jpg', points: [] }
  ],
  cpuAmdThreadripper: [
    { url: '/image/background/cpu/amd/5770/5532_WCB_MoBo_BUNDLE_INSTALL_01.jpg', points: [] },
    { url: '/image/background/cpu/amd/5770/Default_5532_WCB_MoBo_BUNDLE_INSTALL_02.jpg', points: [] }
  ],
  cpuIntelDefault: [
    { url: '/image/background/cpu/intel/7172_DEFAULT/7000_WCB_MoBo_BUNDLE_INSTALL_01.jpg', points: [] },
    { url: '/image/background/cpu/intel/7172_DEFAULT/7000_WCB_MoBo_BUNDLE_INSTALL_MACRO_02.jpg', points: [] },
    { url: '/image/background/cpu/intel/7172_DEFAULT/7000_WCB_MoBo_BUNDLE_INSTALL_MACRO_03.jpg', points: [] },
    { url: '/image/background/cpu/intel/7172_DEFAULT/DEFAULT_7000_WCB_MoBo_BUNDLE_INSTALL_MACRO_01.jpg', points: [] }
  ],
  cpuIntelDual: [
    { url: '/image/background/cpu/intel/1281_6464/5551_52_WCB_MoBo_BUNDLE_INSTALL_01.jpg', points: [] },
    { url: '/image/background/cpu/intel/1281_6464/5551_52_WCB_MoBo_BUNDLE_INSTALL_02.jpg', points: [] },
    { url: '/image/background/cpu/intel/1281_6464/5551_52_WCB_MoBo_BUNDLE_INSTALL_MACRO_01.jpg', points: [] }
  ]
} satisfies Record<string, ConfiguratorBackgroundImage[]>;

const toAbsoluteBackground = (image: ConfiguratorBackgroundImage): ConfiguratorBackgroundImage => ({
  ...image,
  url: `${GRANDO_CONFIGURATOR_BASE_URL}${image.url}`
});

export const CONFIGURATOR_BACKGROUNDS = backgroundSets.defaultHigh.map(toAbsoluteBackground);

const makeBackgrounds = (images: ConfiguratorBackgroundImage[]) => images.map(toAbsoluteBackground);

export const getConfiguratorBackgrounds = (
  activeModule: string,
  spec: ConfiguratorSpec
): ConfiguratorBackgroundImage[] => {
  const gpu = spec.gpu;
  const cpu = spec.cpu;
  const psu = spec.psu;
  const gpuQuantity = gpu?.total_quantity || 1;
  const gpuBrand = gpu?.brand?.toLowerCase();
  const cpuBrand = cpu?.brand?.toLowerCase();

  if (activeModule === 'cpu') {
    if (cpuBrand === 'amd') {
      if (cpu?.unique_id === '1288') {
        return makeBackgrounds(backgroundSets.cpuAmdSingleEpyc);
      }
      if (cpu?.unique_id === '2566') {
        return makeBackgrounds(backgroundSets.cpuAmdDualEpyc);
      }
      if (cpu?.unique_id === '5770') {
        return makeBackgrounds(backgroundSets.cpuAmdThreadripper);
      }
      return makeBackgrounds(backgroundSets.cpuAmdDefault);
    }

    if (cpuBrand === 'intel') {
      if (cpu?.unique_id === '1281' || cpu?.unique_id === '6464') {
        return makeBackgrounds(backgroundSets.cpuIntelDual);
      }
      return makeBackgrounds(backgroundSets.cpuIntelDefault);
    }
  }

  if (activeModule === 'gpu') {
    if (
      gpuQuantity === 8 &&
      gpu?.unique_id !== '7977' &&
      gpu?.unique_id !== '6344' &&
      gpu?.unique_id !== '5090'
    ) {
      return makeBackgrounds(backgroundSets.gpuEight);
    }

    if ((gpuQuantity > 4 && gpu?.unique_id === '7977') || (gpuQuantity > 4 && gpuBrand === 'amd')) {
      return makeBackgrounds(backgroundSets.gpuAmd);
    }
  }

  if (activeModule === 'psu') {
    return makeBackgrounds(psu?.unique_id === '1' ? backgroundSets.psuServer : backgroundSets.psuWorkstation);
  }

  return makeBackgrounds(gpuQuantity > 4 ? backgroundSets.defaultHigh : backgroundSets.defaultLow);
};

export const normalizeModuleKey = (moduleType: string) => (
  moduleType.toLowerCase().replace(/\s+/g, '') as ConfiguratorModule
);

export const cloneSpecItem = (
  option: ConfiguratorOption,
  quantity = option.custom_values[0] || 1
): ConfiguratorSpecItem => ({
  ...option,
  total_quantity: quantity
});

export const buildRecommendedSpec = (
  device: ConfiguratorDevice,
  options: ConfiguratorOption[]
): ConfiguratorSpec => {
  const spec: ConfiguratorSpec = { device };

  options
    .filter((option) => option.recommended === true)
    .forEach((option) => {
      const moduleKey = normalizeModuleKey(option.module_type);
      const defaultQuantity = device.defaults?.[moduleKey] || 0;
      spec[moduleKey] = cloneSpecItem(option, defaultQuantity || option.custom_values[0] || 1);
    });

  if (spec.cpu && device.cpu_values) {
    spec.cpu.total_quantity = device.cpu_values;
  }

  return spec;
};

const getQueryOption = (
  moduleKey: ConfiguratorModule,
  uniqueId: string,
  options: ConfiguratorOption[]
) => {
  return (
    options.find((option) => option.unique_id === uniqueId) ||
    options.find((option) => option.module_type === moduleKey && option.unique_id === uniqueId)
  );
};

export const applyQueryToSpec = (
  baseSpec: ConfiguratorSpec,
  options: ConfiguratorOption[],
  searchParams: URLSearchParams
): ConfiguratorSpec => {
  const spec: ConfiguratorSpec = { ...baseSpec };

  CONFIGURATOR_MODULES.forEach((moduleKey) => {
    const value = spec[moduleKey];
    if (value && typeof value === 'object' && 'module_type' in value) {
      spec[moduleKey] = { ...value };
    }
  });

  const gpuValue = Number(searchParams.get('gpu_value'));
  const cpuValue = Number(searchParams.get('cpu_value'));

  if (gpuValue && spec.gpu) {
    spec.gpu = { ...spec.gpu, total_quantity: gpuValue };
  }

  CONFIGURATOR_MODULES.forEach((moduleKey) => {
    const uniqueId = searchParams.get(moduleKey);

    if (!uniqueId) {
      return;
    }

    const option = getQueryOption(moduleKey, uniqueId, options);
    if (!option) {
      return;
    }

    const quantity =
      moduleKey === 'gpu'
        ? gpuValue || option.custom_values[0] || 1
        : moduleKey === 'cpu'
          ? cpuValue || option.custom_values[0] || 1
          : option.custom_values[0] || 1;

    spec[moduleKey] = cloneSpecItem(option, quantity);
  });

  if (cpuValue) {
    if (spec.cpu) {
      spec.cpu = { ...spec.cpu, total_quantity: cpuValue };
    } else {
      const cpu = baseSpec.cpu;
      if (cpu) {
        spec.cpu = { ...cpu, total_quantity: cpuValue };
      }
    }
  }

  return spec;
};

export const calculateConfiguratorPrice = (spec: ConfiguratorSpec) => {
  let sum = 0;

  Object.values(spec).forEach((item) => {
    if (item && typeof item === 'object' && 'price' in item && 'total_quantity' in item) {
      const price = Number(item.price || 0);
      const quantity = Number(item.total_quantity || 0);
      if (price && quantity) {
        sum += price * quantity;
      }
    }
  });

  const rounded = 100 * Math.round(sum / 100);
  return Math.ceil(1.5 * rounded);
};

export const getConfiguratorValidation = (spec: ConfiguratorSpec): ConfiguratorValidation => {
  const gpu = spec.gpu;
  const cpu = spec.cpu;
  const psu = spec.psu;
  const gpuQuantity = gpu?.total_quantity || 1;
  const totalPower = (cpu?.power || 0) + (psu?.power || 0) + (gpu?.power || 0) * gpuQuantity;
  const isGeForce = gpu?.unique_id === '6344' || gpu?.unique_id === '50090';
  const validation: ConfiguratorValidation = {};

  if (psu?.unique_id === '2' && totalPower >= 3000) {
    const message = 'Choose another type of the Power Supply System or decrease amount of GPUs / CPUs';
    validation.psu = message;
    validation.gpu = message;
  }

  if ((cpu?.unique_id === '5770' || cpu?.unique_id === '90988') && gpuQuantity > 6) {
    validation.cpu = 'Please change the CPU type. x8 GPU setups are only supported with Single EPYC, Dual EPYC, or Dual Xeon.';
  } else if (cpu?.unique_id === '2566' && isGeForce && gpuQuantity === 6) {
    validation.cpu = 'Please change the CPU type. GeForce GPUs are only for Workstations, and Dual EPYC supports up to x4. Contact a Comino Specialist to get an optimized setup.';
  } else if (cpu?.unique_id === '7172' && gpuQuantity > 6) {
    validation.cpu = 'Please change the CPU type. x8 GPU setups are only supported with Single EPYC, Dual EPYC, or Dual Xeon.';
  } else if (cpu?.unique_id === '6464' && ((!isGeForce && gpuQuantity > 4) || (isGeForce && gpuQuantity === 6))) {
    validation.cpu = 'Please change the CPU Type. Single Xeon supports up to x4 GPUs. Contact a Comino Specialist to get an optimized setup.';
  } else if (cpu?.unique_id === '6464' && isGeForce && gpuQuantity > 6) {
    validation.cpu = 'Please change the CPU type. x8 GPU setups are only supported with Single EPYC, Dual EPYC, or Dual Xeon.';
  }

  if (
    ((cpu?.unique_id === '5770' || cpu?.unique_id === '90988') && gpuQuantity > 6) ||
    (cpu?.unique_id === '1288' && isGeForce && gpuQuantity > 6) ||
    (cpu?.unique_id === '2566' && isGeForce && gpuQuantity > 4) ||
    (cpu?.unique_id === '7172' && gpuQuantity > 6) ||
    (cpu?.unique_id === '6464' && gpuQuantity > 4) ||
    (cpu?.unique_id === '1281' && isGeForce && gpuQuantity > 6)
  ) {
    validation.button = 'Configuration you requested is not feasible, share your thoughts in the dialogue box and we will get back to you with the most suitable solution';
  }

  if (
    (cpu?.unique_id === '1288' || cpu?.unique_id === '2566' || cpu?.unique_id === '1281') &&
    isGeForce &&
    gpuQuantity > 6
  ) {
    validation.important = 'GeForce GPUs are for Workstations only. Reduce to x6 GPUs or switch to Professional GPUs. Contact a Comino Specialist to get an optimized setup.';
  }

  return validation;
};

export const getConfiguratorModelName = (spec: ConfiguratorSpec) => {
  const gpuQuantity = spec.gpu?.total_quantity || 0;

  if (gpuQuantity <= 6) {
    return spec.psu?.unique_id === '2'
      ? 'GRANDO Desktop Workstation (4U)'
      : 'GRANDO Rackable Workstation (4U)';
  }

  if (spec.cpu?.unique_id === '2566' || spec.cpu?.unique_id === '1281') {
    return 'COMINO Liquid-Cooling Integration for AI Multi-GPU Servers';
  }

  return 'GRANDO Multi-GPU Server (4U)';
};

export const formatSpecValue = (moduleKey: ConfiguratorModule, item?: ConfiguratorSpecItem) => {
  if (!item) {
    return '';
  }

  switch (moduleKey) {
    case 'ram':
      return `${Number(item.volume * item.total_quantity)} GB`;
    case 'cpu':
      return `${item.name}${item.total_quantity > 1 ? `, ${item.total_quantity} cores` : ''}`;
    case 'psu':
      return item.unique_id === '1'
        ? '4x Redundant (3+1, 2+2) Power Supplies. Power capacity up to 8000W'
        : '3x SFX-L Power Supplies. Power capacity up to 3600W';
    default:
      return item.name;
  }
};

export const getTotalGpuMemory = (spec: ConfiguratorSpec) => {
  if (!spec.gpu?.capacity || !spec.gpu.total_quantity) {
    return null;
  }

  return Number(spec.gpu.capacity) * Number(spec.gpu.total_quantity);
};

export const getPciUsage = (spec: ConfiguratorSpec) => {
  const gpuQuantity = spec.gpu?.total_quantity || 0;
  const networkVolume = spec.network?.volume || 0;
  return gpuQuantity + networkVolume;
};
