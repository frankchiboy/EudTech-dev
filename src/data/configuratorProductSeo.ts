export type LocalizedText = {
  en: string;
  zh: string;
};

export type ConfiguratorProductSeo = {
  id: number;
  title: LocalizedText;
  description: LocalizedText;
  keywords: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  brand: string;
  manufacturer: string;
  category: LocalizedText;
  model: LocalizedText;
  productId: string;
  configuratorHref: string;
  quoteHref: string;
  properties: Array<{
    name: LocalizedText;
    value: LocalizedText;
  }>;
};

type ProductSeoInput = {
  id: number;
  deviceName: string;
  title: LocalizedText;
  description: LocalizedText;
  keywords: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  category: LocalizedText;
  productId: string;
  gpuFocus: LocalizedText;
  formFactor: LocalizedText;
  cpuPlatform: LocalizedText;
};

const buildProductSeo = ({
  id,
  deviceName,
  title,
  description,
  keywords,
  image,
  imageAlt,
  category,
  productId,
  gpuFocus,
  formFactor,
  cpuPlatform
}: ProductSeoInput): ConfiguratorProductSeo => ({
  id,
  title,
  description,
  keywords,
  image,
  imageAlt,
  brand: 'Comino',
  manufacturer: 'Comino',
  category,
  model: {
    en: deviceName,
    zh: deviceName
  },
  productId,
  configuratorHref: `/configurator/${id}`,
  quoteHref: `/configurator/${id}?request=true`,
  properties: [
    { name: { en: 'GPU focus', zh: 'GPU 重點' }, value: gpuFocus },
    { name: { en: 'Form factor', zh: '機構型態' }, value: formFactor },
    { name: { en: 'CPU platform', zh: 'CPU 平台' }, value: cpuPlatform },
    {
      name: { en: 'Workload fit', zh: '工作負載適配' },
      value: {
        en: `${gpuFocus.en} for ${category.en.toLowerCase()} planning, AI workload sizing, and quote review`,
        zh: `${gpuFocus.zh}，適合${category.zh}規劃、AI 工作負載估算與報價審查`
      }
    },
    {
      name: { en: 'Procurement cue', zh: '採購判斷' },
      value: {
        en: `Review ${formFactor.en.toLowerCase()}, ${cpuPlatform.en}, memory, NVMe storage, power, and networking before RFQ.`,
        zh: `送出 RFQ 前先確認${formFactor.zh}、${cpuPlatform.zh}、記憶體、NVMe 儲存、電源與網路需求。`
      }
    },
    {
      name: { en: 'Deployment note', zh: '部署注意' },
      value: {
        en: 'Use the configurator URL to preserve GPU count, platform, storage, power, and network context for EudTech follow-up.',
        zh: '使用配置器連結保留 GPU 數量、平台、儲存、電源與網路脈絡，方便 EudTech 後續追蹤。'
      }
    },
    {
      name: { en: 'Quote readiness', zh: '報價準備' },
      value: {
        en: 'Prepare project timeline, delivery site, software stack, rack or workstation constraints, and purchasing contact before submission.',
        zh: '送出前準備專案時程、交付地點、軟體堆疊、機架或工作站限制與採購聯絡窗口。'
      }
    },
    {
      name: { en: 'Quote path', zh: '詢價路徑' },
      value: {
        en: 'Configurator request to EudTech',
        zh: '配置器詢價送至 EudTech'
      }
    }
  ]
});

export const CONFIGURATOR_PRODUCT_SEO: ConfiguratorProductSeo[] = [
  buildProductSeo({
    id: 27,
    deviceName: 'INTEGRATION KIT 8x H200',
    title: {
      en: 'INTEGRATION KIT 8x H200 Configurator',
      zh: 'INTEGRATION KIT 8x H200 配置器'
    },
    description: {
      en: 'Configure an INTEGRATION KIT 8x H200 build with NVIDIA H200 141GB GPUs and AMD dual EPYC platform assumptions before EudTech quote follow-up.',
      zh: '配置 INTEGRATION KIT 8x H200，保留 NVIDIA H200 141GB GPU 與 AMD 雙 EPYC 平台假設，供 EudTech 追蹤正式報價。'
    },
    keywords: {
      en: 'INTEGRATION KIT 8x H200, H200 integration kit, NVIDIA H200 GPU server, 8x H200 quote, AI GPU server configurator',
      zh: 'INTEGRATION KIT 8x H200, H200 整合套件, NVIDIA H200 GPU 伺服器, 8x H200 報價, AI GPU 伺服器配置器'
    },
    image: '/grando-8gpu-server.jpg',
    imageAlt: {
      en: 'Comino integration kit configuration for eight NVIDIA H200 GPUs',
      zh: '八張 NVIDIA H200 GPU 的 Comino 整合套件配置'
    },
    category: {
      en: 'AI GPU integration kit',
      zh: 'AI GPU 整合套件'
    },
    productId: 'comino-integration-kit-8x-h200',
    gpuFocus: {
      en: '8x NVIDIA H200 141GB',
      zh: '8 張 NVIDIA H200 141GB'
    },
    formFactor: {
      en: 'Integration kit',
      zh: '整合套件'
    },
    cpuPlatform: {
      en: 'AMD DUAL EPYC 9004 / 9005',
      zh: 'AMD DUAL EPYC 9004 / 9005'
    }
  }),
  buildProductSeo({
    id: 36,
    deviceName: 'INTEGRATION KIT 8x PRO 6000',
    title: {
      en: 'INTEGRATION KIT 8x PRO 6000 Configurator',
      zh: 'INTEGRATION KIT 8x PRO 6000 配置器'
    },
    description: {
      en: 'Configure an INTEGRATION KIT 8x PRO 6000 build with NVIDIA RTX PRO 6000 96GB GPUs and AMD dual EPYC platform assumptions for quote review.',
      zh: '配置 INTEGRATION KIT 8x PRO 6000，保留 NVIDIA RTX PRO 6000 96GB GPU 與 AMD 雙 EPYC 平台假設供報價審查。'
    },
    keywords: {
      en: 'INTEGRATION KIT 8x PRO 6000, RTX PRO 6000 integration kit, 8x PRO 6000 quote, AI GPU integration kit',
      zh: 'INTEGRATION KIT 8x PRO 6000, RTX PRO 6000 整合套件, 8x PRO 6000 報價, AI GPU 整合套件'
    },
    image: '/grando-8gpu-server.jpg',
    imageAlt: {
      en: 'Comino integration kit configuration for eight RTX PRO 6000 GPUs',
      zh: '八張 RTX PRO 6000 GPU 的 Comino 整合套件配置'
    },
    category: {
      en: 'AI GPU integration kit',
      zh: 'AI GPU 整合套件'
    },
    productId: 'comino-integration-kit-8x-pro-6000',
    gpuFocus: {
      en: '8x NVIDIA RTX PRO 6000 96GB',
      zh: '8 張 NVIDIA RTX PRO 6000 96GB'
    },
    formFactor: {
      en: 'Integration kit',
      zh: '整合套件'
    },
    cpuPlatform: {
      en: 'AMD DUAL EPYC 9004 / 9005',
      zh: 'AMD DUAL EPYC 9004 / 9005'
    }
  }),
  buildProductSeo({
    id: 29,
    deviceName: 'SERVER 6xH200',
    title: {
      en: 'SERVER 6xH200 GPU Server Configurator',
      zh: 'SERVER 6xH200 GPU 伺服器配置器'
    },
    description: {
      en: 'Configure a SERVER 6xH200 AI GPU server with NVIDIA H200 141GB GPUs, AMD EPYC platform, RAM, NVMe, power, and network assumptions.',
      zh: '配置 SERVER 6xH200 AI GPU 伺服器，保留 NVIDIA H200 141GB GPU、AMD EPYC 平台、RAM、NVMe、電源與網路假設。'
    },
    keywords: {
      en: 'SERVER 6xH200, NVIDIA H200 GPU server, H200 server quote, 6x H200 server, AI GPU server configurator',
      zh: 'SERVER 6xH200, NVIDIA H200 GPU 伺服器, H200 伺服器報價, 6x H200 伺服器, AI GPU 伺服器配置器'
    },
    image: '/grando-8gpu-server.jpg',
    imageAlt: {
      en: 'SERVER 6xH200 high-density Comino GPU server configuration',
      zh: 'SERVER 6xH200 高密度 Comino GPU 伺服器配置'
    },
    category: {
      en: 'AI GPU server',
      zh: 'AI GPU 伺服器'
    },
    productId: 'comino-server-6x-h200',
    gpuFocus: {
      en: '6x NVIDIA H200 141GB',
      zh: '6 張 NVIDIA H200 141GB'
    },
    formFactor: {
      en: 'AI GPU server',
      zh: 'AI GPU 伺服器'
    },
    cpuPlatform: {
      en: 'AMD EPYC 9004 / 9005',
      zh: 'AMD EPYC 9004 / 9005'
    }
  }),
  buildProductSeo({
    id: 28,
    deviceName: 'SERVER 4xH200',
    title: {
      en: 'SERVER 4xH200 GPU Server Configurator',
      zh: 'SERVER 4xH200 GPU 伺服器配置器'
    },
    description: {
      en: 'Configure a SERVER 4xH200 AI GPU server with NVIDIA H200 141GB GPUs, AMD EPYC platform, memory, NVMe storage, power, and network options.',
      zh: '配置 SERVER 4xH200 AI GPU 伺服器，保留 NVIDIA H200 141GB GPU、AMD EPYC 平台、記憶體、NVMe 儲存、電源與網路選項。'
    },
    keywords: {
      en: 'SERVER 4xH200, NVIDIA H200 GPU server, 4x H200 server quote, AI training server, GPU server configurator',
      zh: 'SERVER 4xH200, NVIDIA H200 GPU 伺服器, 4x H200 伺服器報價, AI 訓練伺服器, GPU 伺服器配置器'
    },
    image: '/grando-8gpu-server.jpg',
    imageAlt: {
      en: 'SERVER 4xH200 Comino GPU server configuration',
      zh: 'SERVER 4xH200 Comino GPU 伺服器配置'
    },
    category: {
      en: 'AI GPU server',
      zh: 'AI GPU 伺服器'
    },
    productId: 'comino-server-4x-h200',
    gpuFocus: {
      en: '4x NVIDIA H200 141GB',
      zh: '4 張 NVIDIA H200 141GB'
    },
    formFactor: {
      en: 'AI GPU server',
      zh: 'AI GPU 伺服器'
    },
    cpuPlatform: {
      en: 'AMD EPYC 9004 / 9005',
      zh: 'AMD EPYC 9004 / 9005'
    }
  }),
  buildProductSeo({
    id: 23,
    deviceName: 'SERVER 8x PRO 6000',
    title: {
      en: 'SERVER 8x PRO 6000 GPU Server Configurator',
      zh: 'SERVER 8x PRO 6000 GPU 伺服器配置器'
    },
    description: {
      en: 'Configure a SERVER 8x PRO 6000 build for dense AI inference, visualization, rendering, and simulation workloads before EudTech quote follow-up.',
      zh: '配置 SERVER 8x PRO 6000，面向高密度 AI 推論、視覺化、渲染與模擬工作負載，供 EudTech 追蹤報價。'
    },
    keywords: {
      en: 'SERVER 8x PRO 6000, RTX PRO 6000 GPU server, 8x PRO 6000 quote, AI inference server, GPU rendering server',
      zh: 'SERVER 8x PRO 6000, RTX PRO 6000 GPU 伺服器, 8x PRO 6000 報價, AI 推論伺服器, GPU 渲染伺服器'
    },
    image: '/grando-8gpu-server.jpg',
    imageAlt: {
      en: 'SERVER 8x PRO 6000 Comino GPU server configuration',
      zh: 'SERVER 8x PRO 6000 Comino GPU 伺服器配置'
    },
    category: {
      en: 'AI GPU server',
      zh: 'AI GPU 伺服器'
    },
    productId: 'comino-server-8x-pro-6000',
    gpuFocus: {
      en: '8x NVIDIA RTX PRO 6000 96GB',
      zh: '8 張 NVIDIA RTX PRO 6000 96GB'
    },
    formFactor: {
      en: 'AI GPU server',
      zh: 'AI GPU 伺服器'
    },
    cpuPlatform: {
      en: 'AMD EPYC 9004 / 9005',
      zh: 'AMD EPYC 9004 / 9005'
    }
  }),
  buildProductSeo({
    id: 34,
    deviceName: 'WORKSTATION 2x PRO 6000',
    title: {
      en: 'WORKSTATION 2x PRO 6000 AI Workstation Configurator',
      zh: 'WORKSTATION 2x PRO 6000 AI 工作站配置器'
    },
    description: {
      en: 'Configure a WORKSTATION 2x PRO 6000 AI workstation with RTX PRO 6000 GPUs and AMD Threadripper PRO platform assumptions.',
      zh: '配置 WORKSTATION 2x PRO 6000 AI 工作站，保留 RTX PRO 6000 GPU 與 AMD Threadripper PRO 平台假設。'
    },
    keywords: {
      en: 'WORKSTATION 2x PRO 6000, RTX PRO 6000 workstation, AI workstation quote, GPU workstation configurator',
      zh: 'WORKSTATION 2x PRO 6000, RTX PRO 6000 工作站, AI 工作站報價, GPU 工作站配置器'
    },
    image: '/comino-workstation-front.png',
    imageAlt: {
      en: 'WORKSTATION 2x PRO 6000 Comino AI workstation configuration',
      zh: 'WORKSTATION 2x PRO 6000 Comino AI 工作站配置'
    },
    category: {
      en: 'AI GPU workstation',
      zh: 'AI GPU 工作站'
    },
    productId: 'comino-workstation-2x-pro-6000',
    gpuFocus: {
      en: '2x NVIDIA RTX PRO 6000 96GB',
      zh: '2 張 NVIDIA RTX PRO 6000 96GB'
    },
    formFactor: {
      en: 'Desktop workstation',
      zh: '桌面工作站'
    },
    cpuPlatform: {
      en: 'AMD Threadripper PRO 7000WX',
      zh: 'AMD Threadripper PRO 7000WX'
    }
  }),
  buildProductSeo({
    id: 30,
    deviceName: 'WORKSTATION 2xH200',
    title: {
      en: 'WORKSTATION 2xH200 AI Workstation Configurator',
      zh: 'WORKSTATION 2xH200 AI 工作站配置器'
    },
    description: {
      en: 'Configure a WORKSTATION 2xH200 system for local AI and accelerated research workloads with NVIDIA H200 GPUs and AMD EPYC platform assumptions.',
      zh: '配置 WORKSTATION 2xH200，面向本地 AI 與加速研究工作負載，保留 NVIDIA H200 GPU 與 AMD EPYC 平台假設。'
    },
    keywords: {
      en: 'WORKSTATION 2xH200, H200 workstation, NVIDIA H200 workstation quote, AI workstation configurator',
      zh: 'WORKSTATION 2xH200, H200 工作站, NVIDIA H200 工作站報價, AI 工作站配置器'
    },
    image: '/comino-workstation-front.png',
    imageAlt: {
      en: 'WORKSTATION 2xH200 Comino AI workstation configuration',
      zh: 'WORKSTATION 2xH200 Comino AI 工作站配置'
    },
    category: {
      en: 'AI GPU workstation',
      zh: 'AI GPU 工作站'
    },
    productId: 'comino-workstation-2x-h200',
    gpuFocus: {
      en: '2x NVIDIA H200 141GB',
      zh: '2 張 NVIDIA H200 141GB'
    },
    formFactor: {
      en: 'Desktop workstation',
      zh: '桌面工作站'
    },
    cpuPlatform: {
      en: 'AMD EPYC 9004 / 9005',
      zh: 'AMD EPYC 9004 / 9005'
    }
  }),
  buildProductSeo({
    id: 22,
    deviceName: 'RACKABLE WS 6x R9700',
    title: {
      en: 'RACKABLE WS 6x R9700 Configurator',
      zh: 'RACKABLE WS 6x R9700 配置器'
    },
    description: {
      en: 'Configure a RACKABLE WS 6x R9700 build with AMD Radeon AI PRO R9700 GPUs and AMD EPYC platform assumptions for AI workstation quote review.',
      zh: '配置 RACKABLE WS 6x R9700，保留 AMD Radeon AI PRO R9700 GPU 與 AMD EPYC 平台假設，供 AI 工作站報價審查。'
    },
    keywords: {
      en: 'RACKABLE WS 6x R9700, AMD Radeon AI PRO R9700, rackable workstation quote, AMD AI workstation',
      zh: 'RACKABLE WS 6x R9700, AMD Radeon AI PRO R9700, 可上架工作站報價, AMD AI 工作站'
    },
    image: '/grando-rackable-01.jpg',
    imageAlt: {
      en: 'RACKABLE WS 6x R9700 Comino rackable workstation configuration',
      zh: 'RACKABLE WS 6x R9700 Comino 可上架工作站配置'
    },
    category: {
      en: 'Rackable GPU workstation',
      zh: '可上架 GPU 工作站'
    },
    productId: 'comino-rackable-ws-6x-r9700',
    gpuFocus: {
      en: '6x AMD Radeon AI PRO R9700',
      zh: '6 張 AMD Radeon AI PRO R9700'
    },
    formFactor: {
      en: 'Rackable workstation',
      zh: '可上架工作站'
    },
    cpuPlatform: {
      en: 'AMD EPYC 9004 / 9005',
      zh: 'AMD EPYC 9004 / 9005'
    }
  }),
  buildProductSeo({
    id: 13,
    deviceName: 'WORKSTATION 2x5090',
    title: {
      en: 'WORKSTATION 2x5090 AI Workstation Configurator',
      zh: 'WORKSTATION 2x5090 AI 工作站配置器'
    },
    description: {
      en: 'Configure a WORKSTATION 2x5090 build with NVIDIA GeForce RTX 5090 GPUs and AMD Threadripper PRO platform assumptions.',
      zh: '配置 WORKSTATION 2x5090，保留 NVIDIA GeForce RTX 5090 GPU 與 AMD Threadripper PRO 平台假設。'
    },
    keywords: {
      en: 'WORKSTATION 2x5090, RTX 5090 workstation, AI workstation quote, GPU workstation configurator',
      zh: 'WORKSTATION 2x5090, RTX 5090 工作站, AI 工作站報價, GPU 工作站配置器'
    },
    image: '/comino-workstation-front.png',
    imageAlt: {
      en: 'WORKSTATION 2x5090 Comino AI workstation configuration',
      zh: 'WORKSTATION 2x5090 Comino AI 工作站配置'
    },
    category: {
      en: 'AI GPU workstation',
      zh: 'AI GPU 工作站'
    },
    productId: 'comino-workstation-2x-5090',
    gpuFocus: {
      en: '2x NVIDIA GeForce RTX 5090 32GB',
      zh: '2 張 NVIDIA GeForce RTX 5090 32GB'
    },
    formFactor: {
      en: 'Desktop workstation',
      zh: '桌面工作站'
    },
    cpuPlatform: {
      en: 'AMD Threadripper PRO 7000WX',
      zh: 'AMD Threadripper PRO 7000WX'
    }
  }),
  buildProductSeo({
    id: 5,
    deviceName: 'RACKABLE WS 4x PRO 6000',
    title: {
      en: 'RACKABLE WS 4x PRO 6000 Configurator',
      zh: 'RACKABLE WS 4x PRO 6000 配置器'
    },
    description: {
      en: 'Configure a RACKABLE WS 4x PRO 6000 build with RTX PRO 6000 GPUs and AMD dual EPYC platform assumptions for formal quote follow-up.',
      zh: '配置 RACKABLE WS 4x PRO 6000，保留 RTX PRO 6000 GPU 與 AMD 雙 EPYC 平台假設，供正式報價追蹤。'
    },
    keywords: {
      en: 'RACKABLE WS 4x PRO 6000, RTX PRO 6000 rackable workstation, 4x PRO 6000 quote, AI workstation configurator',
      zh: 'RACKABLE WS 4x PRO 6000, RTX PRO 6000 可上架工作站, 4x PRO 6000 報價, AI 工作站配置器'
    },
    image: '/grando-rackable-01.jpg',
    imageAlt: {
      en: 'RACKABLE WS 4x PRO 6000 Comino rackable workstation configuration',
      zh: 'RACKABLE WS 4x PRO 6000 Comino 可上架工作站配置'
    },
    category: {
      en: 'Rackable GPU workstation',
      zh: '可上架 GPU 工作站'
    },
    productId: 'comino-rackable-ws-4x-pro-6000',
    gpuFocus: {
      en: '4x NVIDIA RTX PRO 6000 96GB',
      zh: '4 張 NVIDIA RTX PRO 6000 96GB'
    },
    formFactor: {
      en: 'Rackable workstation',
      zh: '可上架工作站'
    },
    cpuPlatform: {
      en: 'AMD DUAL EPYC 9004 / 9005',
      zh: 'AMD DUAL EPYC 9004 / 9005'
    }
  }),
  buildProductSeo({
    id: 21,
    deviceName: 'RACKABLE WS 6x5090',
    title: {
      en: 'RACKABLE WS 6x5090 Configurator',
      zh: 'RACKABLE WS 6x5090 配置器'
    },
    description: {
      en: 'Configure a RACKABLE WS 6x5090 build with NVIDIA GeForce RTX 5090 GPUs and AMD EPYC platform assumptions for AI workstation quote review.',
      zh: '配置 RACKABLE WS 6x5090，保留 NVIDIA GeForce RTX 5090 GPU 與 AMD EPYC 平台假設，供 AI 工作站報價審查。'
    },
    keywords: {
      en: 'RACKABLE WS 6x5090, RTX 5090 rackable workstation, 6x RTX 5090 quote, AI workstation configurator',
      zh: 'RACKABLE WS 6x5090, RTX 5090 可上架工作站, 6x RTX 5090 報價, AI 工作站配置器'
    },
    image: '/grando-rackable-01.jpg',
    imageAlt: {
      en: 'RACKABLE WS 6x5090 Comino rackable workstation configuration',
      zh: 'RACKABLE WS 6x5090 Comino 可上架工作站配置'
    },
    category: {
      en: 'Rackable GPU workstation',
      zh: '可上架 GPU 工作站'
    },
    productId: 'comino-rackable-ws-6x-5090',
    gpuFocus: {
      en: '6x NVIDIA GeForce RTX 5090 32GB',
      zh: '6 張 NVIDIA GeForce RTX 5090 32GB'
    },
    formFactor: {
      en: 'Rackable workstation',
      zh: '可上架工作站'
    },
    cpuPlatform: {
      en: 'AMD EPYC 9004 / 9005',
      zh: 'AMD EPYC 9004 / 9005'
    }
  })
];

export function getConfiguratorProductSeo(id?: number | string) {
  const normalizedId = Number(id);
  if (!Number.isFinite(normalizedId)) {
    return undefined;
  }

  return CONFIGURATOR_PRODUCT_SEO.find((product) => product.id === normalizedId);
}
