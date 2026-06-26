import { ConfiguratorModule, ConfiguratorSpecItem } from '../../types/configurator';

export type ConfiguratorLocale = 'en' | 'zh';

export const getConfiguratorLocale = (isEnglish: boolean): ConfiguratorLocale => (isEnglish ? 'en' : 'zh');

export const CONFIGURATOR_COPY = {
  en: {
    homeTitle: 'Welcome to Comino Grando Configurator',
    selectorLabel: 'Select based on your needs',
    productTypeNav: 'Configurator product types',
    usageFilters: 'Usage filters',
    usageCategories: 'Usage categories',
    customize: 'Customize',
    requestQuote: 'Get Quote',
    getQuote: 'Get Quote',
    fixConfig: 'Fix Config',
    share: 'Share',
    linkCopied: 'The link to the configuration has been copied!',
    linkCopyFailed: 'Unable to copy the configuration link.',
    quoteRecipientLabel: 'To',
    quoteModalTitle: 'Contact Information',
    quoteModalLead: 'Send this configuration to our team. We will get back to you soon.',
    closeQuoteForm: 'Close quote form',
    quoteSuccessTitle: 'Thank you!',
    quoteSuccessMessage: 'Your request has been submitted. We will get back to you soon.',
    quoteDone: 'OK',
    quoteSummaryTitle: 'Configuration summary',
    quoteEmailIntro: 'A customer submitted a Grando configurator quote request.',
    quoteErrorFallback: 'Something went wrong. Please try again later.',
    emailServiceMissingConfig:
      'Email delivery is not configured. Set VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, and VITE_EMAILJS_TEMPLATE_ID before submitting real quote requests.',
    requiredField: 'Required',
    invalidEmail: 'Invalid email',
    optionalField: 'optional',
    notProvided: 'Not provided',
    cancelQuote: 'Cancel',
    submittingQuote: 'Submitting...',
    submitQuote: 'Submit',
    quoteFields: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone',
      country: 'Country',
      comment: 'Comment'
    },
    retry: 'Retry',
    emptyMessage: 'Hmm, we could not find any device matching your filter.',
    clearFilter: 'Clear filter',
    cores: '# of cores',
    warning: 'warning',
    toggle: 'Toggle',
    showImage: 'Show configurator image',
    modelSpecification: 'Model specification',
    configurationControls: 'Configuration controls',
    modelSpecAria: 'Model specification',
    pcieSlotsPlanned: 'PCIe slots planned',
    totalGpuMemory: 'Total GPU Memory',
    nic: 'Network Interface Controller',
    estimatedPrice: 'Estimated Price',
    quoteSubject: 'Grando Configurator Request',
    quoteRequest: 'Configurator request',
    configurationLink: 'Configuration link',
    model: 'Model',
    priceEstimate: 'Price estimate',
    systemFallback: 'Grando system',
    loadErrorFallback: 'Something went wrong.'
  },
  zh: {
    homeTitle: 'Comino Grando 配置器',
    selectorLabel: '依需求選擇產品',
    productTypeNav: '配置器產品類型',
    usageFilters: '應用篩選',
    usageCategories: '應用類別',
    customize: '自訂配置',
    requestQuote: '取得報價',
    getQuote: '取得報價',
    fixConfig: '修正配置',
    share: '分享',
    linkCopied: '配置連結已複製。',
    linkCopyFailed: '無法複製配置連結。',
    quoteRecipientLabel: '收件',
    quoteModalTitle: '聯絡資訊',
    quoteModalLead: '送出此配置需求給我們的團隊，我們會盡快回覆。',
    closeQuoteForm: '關閉報價表單',
    quoteSuccessTitle: '謝謝！',
    quoteSuccessMessage: '您的需求已送出，我們會盡快與您聯繫。',
    quoteDone: '完成',
    quoteSummaryTitle: '配置摘要',
    quoteEmailIntro: '客戶送出 Grando 配置器報價需求。',
    quoteErrorFallback: '發生錯誤，請稍後再試。',
    emailServiceMissingConfig:
      '尚未設定 EmailJS 寄信服務。請先設定 VITE_EMAILJS_PUBLIC_KEY、VITE_EMAILJS_SERVICE_ID、VITE_EMAILJS_TEMPLATE_ID，才能送出真實報價需求。',
    requiredField: '必填',
    invalidEmail: 'Email 格式不正確',
    optionalField: '選填',
    notProvided: '未提供',
    cancelQuote: '取消',
    submittingQuote: '送出中...',
    submitQuote: '送出',
    quoteFields: {
      firstName: '名字',
      lastName: '姓氏',
      email: 'Email',
      phone: '電話',
      country: '國家',
      comment: '留言'
    },
    retry: '重試',
    emptyMessage: '找不到符合目前篩選條件的裝置。',
    clearFilter: '清除篩選',
    cores: '核心數',
    warning: '警告',
    toggle: '切換',
    showImage: '顯示配置圖片',
    modelSpecification: '機型規格',
    configurationControls: '配置控制項',
    modelSpecAria: '機型規格',
    pcieSlotsPlanned: '個 PCIe 插槽已規劃',
    totalGpuMemory: 'GPU 總記憶體',
    nic: '網路介面控制器',
    estimatedPrice: '預估價格',
    quoteSubject: 'Grando 配置器報價需求',
    quoteRequest: '配置需求',
    configurationLink: '配置連結',
    model: '機型',
    priceEstimate: '預估價格',
    systemFallback: 'Grando 系統',
    loadErrorFallback: '發生錯誤，請稍後再試。'
  }
} as const;

export const CONFIGURATOR_MODULE_LABELS: Record<ConfiguratorLocale, Record<ConfiguratorModule, string>> = {
  en: {
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
  },
  zh: {
    gpu: 'GPU',
    cpu: 'CPU',
    ram: '記憶體',
    storage: '系統碟',
    storage_1: '資料碟 1',
    storage_2: '資料碟 2',
    storage_3: '資料碟 3',
    storage_4: '資料碟 4',
    psu: '電源供應系統',
    network: '網路',
    motherboard: '主機板',
    platform: '平台',
    packaging: '包裝',
    nvlink: 'NVLink'
  }
};

const deviceTypes: Record<ConfiguratorLocale, Record<string, { singular: string; plural: string }>> = {
  en: {
    Server: { singular: 'Server', plural: 'Servers' },
    'Rackable Workstation': { singular: 'Rackable Workstation', plural: 'Rackable Workstations' },
    'Desktop Workstation': { singular: 'Desktop Workstation', plural: 'Desktop Workstations' },
    'Integration Kit': { singular: 'Integration Kit', plural: 'Integration Kits' }
  },
  zh: {
    Server: { singular: '伺服器', plural: '伺服器' },
    'Rackable Workstation': { singular: '機架式工作站', plural: '機架式工作站' },
    'Desktop Workstation': { singular: '桌面工作站', plural: '桌面工作站' },
    'Integration Kit': { singular: '整合套件', plural: '整合套件' }
  }
};

const usageLabels: Record<ConfiguratorLocale, Record<string, string>> = {
  en: {},
  zh: {
    'AI TRAINING': 'AI 訓練',
    'AI INFERENCE': 'AI 推論',
    'PASSWORD RECOVERY': '密碼還原',
    'VIRTUAL PRODUCTION': '虛擬製作',
    'CG & RENDERING': 'CG 與渲染',
    'LIFE SCIENCE': '生命科學',
    'CAE SIMULATIONS': 'CAE 模擬'
  }
};

const modelNames: Record<string, string> = {
  'GRANDO Desktop Workstation (4U)': 'GRANDO 桌面工作站 (4U)',
  'GRANDO Rackable Workstation (4U)': 'GRANDO 機架式工作站 (4U)',
  'COMINO Liquid-Cooling Integration for AI Multi-GPU Servers': 'COMINO AI 多 GPU 伺服器液冷整合套件',
  'GRANDO Multi-GPU Server (4U)': 'GRANDO 多 GPU 伺服器 (4U)'
};

const validationMessages: Record<string, string> = {
  'Choose another type of the Power Supply System or decrease amount of GPUs / CPUs':
    '請更換電源供應系統，或降低 GPU / CPU 數量',
  'Please change the CPU type. x8 GPU setups are only supported with Single EPYC, Dual EPYC, or Dual Xeon.':
    '請更換 CPU 類型。x8 GPU 配置僅支援 Single EPYC、Dual EPYC 或 Dual Xeon。',
  'Please change the CPU type. GeForce GPUs are only for Workstations, and Dual EPYC supports up to x4. Contact a Comino Specialist to get an optimized setup.':
    '請更換 CPU 類型。GeForce GPU 僅適用於工作站，Dual EPYC 最多支援 x4。請聯繫 Comino 專員取得最佳化配置。',
  'Please change the CPU Type. Single Xeon supports up to x4 GPUs. Contact a Comino Specialist to get an optimized setup.':
    '請更換 CPU 類型。Single Xeon 最多支援 x4 GPU。請聯繫 Comino 專員取得最佳化配置。',
  'Configuration you requested is not feasible, share your thoughts in the dialogue box and we will get back to you with the most suitable solution':
    '目前要求的配置不可行，請在訊息欄留下需求，我們會提供最適合的方案。',
  'GeForce GPUs are for Workstations only. Reduce to x6 GPUs or switch to Professional GPUs. Contact a Comino Specialist to get an optimized setup.':
    'GeForce GPU 僅適用於工作站。請降低至 x6 GPU，或改用專業級 GPU。請聯繫 Comino 專員取得最佳化配置。'
};

const hotspotMessages: Record<string, string> = {
  'Redundant for server fans (up to 4 kW cooling capacity)': '伺服器風扇具備備援能力，冷卻容量最高 4 kW',
  'Comino Monitoring System collects cooling system log to analyze device usage history, log failure events and to monitor the temperature statistic':
    'Comino Monitoring System 會收集冷卻系統記錄，用於分析使用歷史、故障事件與溫度統計',
  'Liquid cooling of the CPU and the VRM modules': 'CPU 與 VRM 模組採用液冷',
  'IPMI architecture for remote management': '支援 IPMI 架構進行遠端管理',
  'Quick Disconnect Couplings on each GPU and CPU allows easy maintenance': '每個 GPU 與 CPU 配有快拆接頭，便於維護',
  'Waterblock for GPU occupies 1 slot only': 'GPU 水冷頭僅佔用 1 個插槽',
  'Comino liquid cooling system ensures 24/7 operation even in harsh environment with no thermal throttling':
    'Comino 液冷系統可支援嚴苛環境下 24/7 運作並避免熱降頻',
  '19" rack-mountable or standalone as a Desktop': '可安裝於 19 吋機架，也可作為桌面設備獨立使用',
  'Desktop as a Workstation or 19" rack-mountable': '可作為工作站桌機，也可安裝於 19 吋機架',
  'Silent solution fans': '低噪音風扇方案',
  'Redundancy (2+2, 3+1, 4+0) up to 6.4 kW': '支援 2+2、3+1、4+0 備援配置，最高 6.4 kW',
  'Optional installation of up to 8 hot swap SSDs': '可選配最多 8 個熱插拔 SSD'
};

const normalizeSentence = (value: string) => value.trim().replace(/[.。]$/, '').replace(/\s+/g, ' ');

export const getConfiguratorNumberLocale = (locale: ConfiguratorLocale) => (locale === 'zh' ? 'zh-TW' : 'en-US');

export const translateConfiguratorDeviceType = (
  type: string,
  locale: ConfiguratorLocale,
  plural = false
) => {
  const fallback = plural ? `${type}s` : type;
  const value = deviceTypes[locale][type];
  return value ? (plural ? value.plural : value.singular) : fallback;
};

export const translateConfiguratorUsage = (usage: string, locale: ConfiguratorLocale) => {
  return usageLabels[locale][usage] || usage;
};

export const translateConfiguratorModelName = (modelName: string, locale: ConfiguratorLocale) => {
  if (locale === 'en') {
    return modelName;
  }

  return modelNames[modelName] || modelName;
};

export const translateConfiguratorFilterLabel = (value: string, locale: ConfiguratorLocale) => {
  if (locale === 'en') {
    return value.replace(/_/g, '/').toUpperCase();
  }

  const normalized = value.toLowerCase();
  if (normalized === 'ssd') {
    return 'SSD';
  }
  if (normalized === 'nvme') {
    return 'NVMe';
  }

  return value.replace(/_/g, '/').toUpperCase();
};

export const translateConfiguratorValidation = (message: string | undefined, locale: ConfiguratorLocale) => {
  if (!message || locale === 'en') {
    return message;
  }

  return validationMessages[message] || message;
};

export const translateConfiguratorHotspot = (title: string, locale: ConfiguratorLocale) => {
  if (locale === 'en') {
    return title;
  }

  return hotspotMessages[normalizeSentence(title)] || title;
};

export const formatLocalizedSpecValue = (
  moduleKey: ConfiguratorModule,
  item: ConfiguratorSpecItem | undefined,
  locale: ConfiguratorLocale
) => {
  if (!item) {
    return '';
  }

  switch (moduleKey) {
    case 'ram':
      return `${Number(item.volume * item.total_quantity).toLocaleString(getConfiguratorNumberLocale(locale))} GB`;
    case 'cpu':
      return item.total_quantity > 1
        ? `${item.name}${locale === 'zh' ? '，' : ', '}${item.total_quantity} ${locale === 'zh' ? '核心' : 'cores'}`
        : item.name;
    case 'psu':
      if (item.unique_id === '1') {
        return locale === 'zh'
          ? '4x 備援（3+1、2+2）電源供應器。電源容量最高 8000W'
          : '4x Redundant (3+1, 2+2) Power Supplies. Power capacity up to 8000W';
      }
      return locale === 'zh'
        ? '3x SFX-L 電源供應器。電源容量最高 3600W'
        : '3x SFX-L Power Supplies. Power capacity up to 3600W';
    case 'network':
      if (!item.volume) {
        return locale === 'zh' ? '未加購' : item.name;
      }
      return item.name;
    default:
      if (moduleKey.startsWith('storage') && normalizeSentence(item.name).toUpperCase() === 'NO STORAGE') {
        return locale === 'zh' ? '不加購儲存裝置' : item.name;
      }
      return item.name;
  }
};

export const getLocalizedSpecNote = (
  moduleKey: ConfiguratorModule,
  item: ConfiguratorSpecItem | undefined,
  locale: ConfiguratorLocale
) => {
  if (!item) {
    return null;
  }

  if (moduleKey === 'network' && item.volume) {
    return CONFIGURATOR_COPY[locale].nic;
  }

  return null;
};
