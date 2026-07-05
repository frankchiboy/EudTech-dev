export type LocalizedText = {
  en: string;
  zh: string;
};

export type ConfiguratorProductFaq = {
  question: LocalizedText;
  answer: LocalizedText;
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
  relatedProductIds: number[];
  exposureNotes: LocalizedText[];
  faqs: ConfiguratorProductFaq[];
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
  relatedProductIds?: number[];
  exposureNotes?: LocalizedText[];
  faqs?: ConfiguratorProductFaq[];
};

const buildDefaultProductFaqs = ({
  deviceName,
  gpuFocus,
  formFactor,
  cpuPlatform
}: {
  deviceName: string;
  gpuFocus: LocalizedText;
  formFactor: LocalizedText;
  cpuPlatform: LocalizedText;
}): ConfiguratorProductFaq[] => [
  {
    question: {
      en: `What does the ${deviceName} quote request include?`,
      zh: `${deviceName} 詢價會包含哪些資訊？`
    },
    answer: {
      en: `The quote request preserves the selected ${gpuFocus.en}, ${cpuPlatform.en}, memory, NVMe storage, power, networking, and configurator URL for EudTech follow-up.`,
      zh: `詢價會保留已選的${gpuFocus.zh}、${cpuPlatform.zh}、記憶體、NVMe 儲存、電源、網路與配置器連結，供 EudTech 後續追蹤。`
    }
  },
  {
    question: {
      en: `Is ${deviceName} a server, workstation, or integration-kit path?`,
      zh: `${deviceName} 是伺服器、工作站還是整合套件路徑？`
    },
    answer: {
      en: `${deviceName} is positioned as a ${formFactor.en.toLowerCase()} configuration path for quote and RFQ review.`,
      zh: `${deviceName} 是${formFactor.zh}配置路徑，用於報價與 RFQ 審查。`
    }
  },
  {
    question: {
      en: `Can I submit a ${deviceName} draft before every option is final?`,
      zh: `${deviceName} 還沒選完所有選項也能送出詢價嗎？`
    },
    answer: {
      en: 'Yes. The configurator sends the current hardware assumptions and URL, and EudTech can follow up on incomplete storage, power, networking, or deployment details.',
      zh: '可以。配置器會送出目前硬體假設與連結，EudTech 可後續確認尚未完成的儲存、電源、網路或部署細節。'
    }
  },
  {
    question: {
      en: `Is the ${deviceName} page suitable for Taiwan procurement review?`,
      zh: `${deviceName} 頁面適合台灣採購審查嗎？`
    },
    answer: {
      en: 'Yes. The page keeps Chinese quote context, EudTech contact details, and a shareable configuration URL for local technical and purchasing review.',
      zh: '適合。此頁保留中文詢價脈絡、EudTech 聯絡資訊與可分享配置連結，方便本地技術與採購審查。'
    }
  }
];

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
  cpuPlatform,
  relatedProductIds = [],
  exposureNotes = [],
  faqs = []
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
  relatedProductIds,
  exposureNotes,
  faqs: [...faqs, ...buildDefaultProductFaqs({ deviceName, gpuFocus, formFactor, cpuPlatform })],
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
    },
    relatedProductIds: [29, 28, 36, 23],
    exposureNotes: [
      {
        en: 'Best suited for teams that already plan chassis, rack, cooling, and integration work around an 8-GPU H200 platform.',
        zh: '適合已規劃機箱、機架、散熱與整合工作的團隊，以 8-GPU H200 平台作為核心。'
      },
      {
        en: 'Use this route when procurement needs a component-level integration discussion rather than a finished server SKU.',
        zh: '適用於採購需要討論整合套件與零組件條件，而不是直接採購完整伺服器 SKU 的情境。'
      }
    ]
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
    },
    relatedProductIds: [23, 34, 5, 27],
    exposureNotes: [
      {
        en: 'Targets RTX PRO 6000 integration projects that need workstation-class GPU memory in an 8-GPU build plan.',
        zh: '面向需要工作站等級 GPU 記憶體、並以 8-GPU 架構規劃整合的 RTX PRO 6000 專案。'
      },
      {
        en: 'Useful when the buyer is comparing integration kits against rackable workstation and finished server options.',
        zh: '適合採購同時比較整合套件、可上架工作站與完整伺服器方案時使用。'
      }
    ]
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
    },
    relatedProductIds: [28, 27, 30, 23],
    exposureNotes: [
      {
        en: 'Positioned for H200 training or inference projects that need more GPU density than a 4-GPU server but less than a full 8-GPU plan.',
        zh: '適合需要高於 4-GPU、但尚未到完整 8-GPU 規模的 H200 訓練或推論專案。'
      },
      {
        en: 'Use this page to preserve 6x H200, EPYC, RAM, NVMe, power, and network assumptions for RFQ review.',
        zh: '此頁可保留 6 張 H200、EPYC、RAM、NVMe、電源與網路假設，供 RFQ 審查。'
      }
    ]
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
    },
    relatedProductIds: [29, 30, 27, 34],
    faqs: [
      {
        question: {
          en: 'When should I start with SERVER 4xH200 instead of 6xH200 or 8xH200?',
          zh: '什麼情況應先看 SERVER 4xH200，而不是 6xH200 或 8xH200？'
        },
        answer: {
          en: 'Start with SERVER 4xH200 when the project needs NVIDIA H200 memory capacity and formal GPU server planning, but the initial budget, rack, power, or workload assumptions do not yet require a 6-GPU or 8-GPU build.',
          zh: '若專案需要 NVIDIA H200 記憶體容量與正式 GPU 伺服器規劃，但初期預算、機架、電力或工作負載尚未需要 6-GPU 或 8-GPU 配置，可先從 SERVER 4xH200 開始。'
        }
      },
      {
        question: {
          en: 'Is SERVER 4xH200 suitable for AI training and inference quotes?',
          zh: 'SERVER 4xH200 適合 AI 訓練與推論報價嗎？'
        },
        answer: {
          en: 'Yes. The 4xH200 route is suitable for quote discussions that need H200 GPU memory, AMD EPYC platform planning, RAM, NVMe storage, power, and networking context in one configuration.',
          zh: '適合。4xH200 路徑可在同一份配置中整理 H200 GPU 記憶體、AMD EPYC 平台、RAM、NVMe 儲存、電源與網路條件，供 AI 訓練與推論報價討論。'
        }
      }
    ],
    exposureNotes: [
      {
        en: 'Designed for H200 buyers that need a focused 4-GPU server path before deciding whether to scale to 6 or 8 GPUs.',
        zh: '適合 H200 採購先以 4-GPU 伺服器方案收斂需求，再評估是否擴充到 6 或 8 GPU。'
      },
      {
        en: 'A practical starting point for smaller AI teams that still need HBM capacity, EPYC platform planning, and formal quote follow-up.',
        zh: '適合作為較小型 AI 團隊的起始方案，同時保留 HBM 容量、EPYC 平台與正式報價脈絡。'
      }
    ]
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
    },
    relatedProductIds: [36, 34, 5, 29],
    exposureNotes: [
      {
        en: 'Targets dense RTX PRO 6000 inference, rendering, visualization, and simulation projects that need an 8-GPU server route.',
        zh: '面向需要 8-GPU 伺服器路徑的 RTX PRO 6000 推論、渲染、視覺化與模擬專案。'
      },
      {
        en: 'Useful when teams compare RTX PRO 6000 server density against H200 memory bandwidth and workstation alternatives.',
        zh: '適合團隊比較 RTX PRO 6000 伺服器密度、H200 記憶體頻寬與工作站替代方案時使用。'
      }
    ]
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
    },
    relatedProductIds: [5, 36, 23, 30],
    exposureNotes: [
      {
        en: 'Suited to deskside AI development, rendering, and visualization teams that need two RTX PRO 6000 GPUs without a rack server footprint.',
        zh: '適合需要兩張 RTX PRO 6000、但不需要機架伺服器佔用的桌邊 AI 開發、渲染與視覺化團隊。'
      },
      {
        en: 'Use this route when procurement must compare desktop workstation convenience against rackable RTX PRO 6000 options.',
        zh: '適用於採購需要比較桌面工作站便利性與可上架 RTX PRO 6000 方案時。'
      }
    ]
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
    },
    relatedProductIds: [28, 29, 34, 13],
    exposureNotes: [
      {
        en: 'Built for local H200 validation, research, and pilot workloads that need HBM capacity in a workstation-oriented path.',
        zh: '面向需要在工作站型態中使用 HBM 容量的本地 H200 驗證、研究與試點工作負載。'
      },
      {
        en: 'Useful before scaling from a two-GPU H200 workstation to 4x or 6x H200 server configurations.',
        zh: '適合在從 2-GPU H200 工作站擴展到 4x 或 6x H200 伺服器前先行評估。'
      }
    ]
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
    },
    relatedProductIds: [21, 5, 13, 34],
    exposureNotes: [
      {
        en: 'Targets AMD Radeon AI PRO R9700 planning for teams evaluating non-NVIDIA GPU workstation routes.',
        zh: '面向正在評估非 NVIDIA GPU 工作站路線的團隊，聚焦 AMD Radeon AI PRO R9700 規劃。'
      },
      {
        en: 'Use this page when the buyer needs rackable workstation planning with AMD GPU, EPYC, power, and network assumptions.',
        zh: '適用於採購需要以 AMD GPU、EPYC、電源與網路假設規劃可上架工作站時。'
      }
    ]
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
    },
    relatedProductIds: [21, 30, 34, 5],
    exposureNotes: [
      {
        en: 'A focused route for AI development, testing, and visualization teams comparing RTX 5090 workstation cost and capability.',
        zh: '適合 AI 開發、測試與視覺化團隊比較 RTX 5090 工作站成本與能力時使用。'
      },
      {
        en: 'Use this option before moving to rackable RTX 5090 or RTX PRO 6000 configurations for larger procurement needs.',
        zh: '適合在擴大到可上架 RTX 5090 或 RTX PRO 6000 配置前，先確認較小型工作站需求。'
      }
    ]
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
    },
    relatedProductIds: [34, 36, 23, 21],
    exposureNotes: [
      {
        en: 'Targets rackable RTX PRO 6000 workstation projects where four GPUs and dual EPYC assumptions need RFQ review.',
        zh: '面向需要四張 RTX PRO 6000 與雙 EPYC 假設進行 RFQ 審查的可上架工作站專案。'
      },
      {
        en: 'Useful for buyers comparing rackable workstation deployment against desktop workstation and 8-GPU server choices.',
        zh: '適合採購比較可上架工作站部署、桌面工作站與 8-GPU 伺服器選項時。'
      }
    ]
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
    },
    relatedProductIds: [13, 22, 5, 30],
    exposureNotes: [
      {
        en: 'Designed for teams that need more RTX 5090 GPU count than a desktop workstation while keeping a rackable workstation path.',
        zh: '適合需要高於桌面工作站 RTX 5090 GPU 數量、但仍採可上架工作站路線的團隊。'
      },
      {
        en: 'Use this page to compare six RTX 5090 GPUs against AMD R9700, H200 workstation, and rackable PRO 6000 alternatives.',
        zh: '此頁可協助比較六張 RTX 5090、AMD R9700、H200 工作站與可上架 PRO 6000 替代方案。'
      }
    ]
  })
];

export function getConfiguratorProductSeo(id?: number | string) {
  const normalizedId = Number(id);
  if (!Number.isFinite(normalizedId)) {
    return undefined;
  }

  return CONFIGURATOR_PRODUCT_SEO.find((product) => product.id === normalizedId);
}
