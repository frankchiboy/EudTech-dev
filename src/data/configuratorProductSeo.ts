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

export const CONFIGURATOR_PRODUCT_SEO: ConfiguratorProductSeo[] = [
  {
    id: 28,
    title: {
      en: 'GRANDO Rackable Workstation GPU Configurator',
      zh: 'GRANDO 機架式工作站 GPU 配置器'
    },
    description: {
      en: 'Configure a GRANDO rackable workstation for RTX PRO 6000 class AI workstation workloads, then request a formal quote from EudTech.',
      zh: '配置 GRANDO 機架式工作站，面向 RTX PRO 6000 等級 AI 工作站工作負載，並向 EudTech 取得正式報價。'
    },
    keywords: {
      en: 'GRANDO rackable workstation, RTX PRO 6000 workstation, GPU workstation quote, AI workstation configurator',
      zh: 'GRANDO 機架式工作站, RTX PRO 6000 工作站, GPU 工作站報價, AI 工作站配置器'
    },
    image: '/comino-workstation-front.png',
    imageAlt: {
      en: 'GRANDO rackable workstation for RTX PRO 6000 GPU configurations',
      zh: '可配置 RTX PRO 6000 GPU 的 GRANDO 機架式工作站'
    },
    brand: 'Comino',
    manufacturer: 'Comino',
    category: {
      en: 'AI GPU workstation',
      zh: 'AI GPU 工作站'
    },
    model: {
      en: 'GRANDO Rackable Workstation (4U)',
      zh: 'GRANDO 機架式工作站 (4U)'
    },
    productId: 'comino-grando-rackable-workstation-4u',
    configuratorHref: '/configurator/28',
    quoteHref: '/configurator/28?request=true',
    properties: [
      { name: { en: 'GPU focus', zh: 'GPU 重點' }, value: { en: 'NVIDIA RTX PRO 6000 class options', zh: 'NVIDIA RTX PRO 6000 等級選項' } },
      { name: { en: 'Form factor', zh: '機構型態' }, value: { en: '4U rackable workstation', zh: '4U 可上架工作站' } },
      { name: { en: 'Quote path', zh: '詢價路徑' }, value: { en: 'Configurator request to EudTech', zh: '配置器詢價送至 EudTech' } }
    ]
  },
  {
    id: 29,
    title: {
      en: 'NVIDIA H200 GPU Server Configurator',
      zh: 'NVIDIA H200 GPU 伺服器配置器'
    },
    description: {
      en: 'Configure NVIDIA H200 and high-density AI GPU server builds with GPU, CPU, RAM, NVMe, power supply, and network assumptions for EudTech quote follow-up.',
      zh: '配置 NVIDIA H200 與高密度 AI GPU 伺服器，保留 GPU、CPU、RAM、NVMe、電源與網路假設供 EudTech 報價追蹤。'
    },
    keywords: {
      en: 'NVIDIA H200 GPU server, H200 server quote, AI GPU server configurator, liquid cooled GPU server',
      zh: 'NVIDIA H200 GPU 伺服器, H200 伺服器報價, AI GPU 伺服器配置器, 液冷 GPU 伺服器'
    },
    image: '/grando-8gpu-server.jpg',
    imageAlt: {
      en: 'High-density GRANDO GPU server for NVIDIA H200 configurations',
      zh: '可配置 NVIDIA H200 的高密度 GRANDO GPU 伺服器'
    },
    brand: 'Comino',
    manufacturer: 'Comino',
    category: {
      en: 'AI GPU server',
      zh: 'AI GPU 伺服器'
    },
    model: {
      en: 'GRANDO Multi-GPU Server (4U)',
      zh: 'GRANDO 多 GPU 伺服器 (4U)'
    },
    productId: 'comino-grando-nvidia-h200-gpu-server',
    configuratorHref: '/configurator/29',
    quoteHref: '/configurator/29?request=true',
    properties: [
      { name: { en: 'GPU focus', zh: 'GPU 重點' }, value: { en: 'NVIDIA H200 141GB and high-density GPU options', zh: 'NVIDIA H200 141GB 與高密度 GPU 選項' } },
      { name: { en: 'Form factor', zh: '機構型態' }, value: { en: '4U AI GPU server', zh: '4U AI GPU 伺服器' } },
      { name: { en: 'Quote path', zh: '詢價路徑' }, value: { en: 'Configurator request to EudTech', zh: '配置器詢價送至 EudTech' } }
    ]
  }
];

export function getConfiguratorProductSeo(id?: number | string) {
  const normalizedId = Number(id);
  if (!Number.isFinite(normalizedId)) {
    return undefined;
  }

  return CONFIGURATOR_PRODUCT_SEO.find((product) => product.id === normalizedId);
}
