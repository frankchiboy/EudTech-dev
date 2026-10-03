export type BilingualText = { zh: string; en: string };

export interface SiteNavigationItem {
  id: string;
  label: BilingualText;
  href: string;
  description: BilingualText;
  children?: SiteNavigationItem[];
}

export const SITE_NAVIGATION_GROUPS: SiteNavigationItem[] = [
  {
    id: 'solutions',
    label: { zh: '解決方案', en: 'Solutions' },
    href: '/solutions',
    description: { zh: '依營運問題、運算工作負載與情報需求選擇方案。', en: 'Choose by operating problem, compute workload, or intelligence need.' },
    children: [
      { id: 'solutions-overview', label: { zh: '解決方案總覽', en: 'Solutions overview' }, href: '/solutions', description: { zh: '三類解決方案與下一步。', en: 'Three solution areas and next steps.' } },
      { id: 'ai-agent', label: { zh: 'AI Agent 與 Headless SaaS', en: 'AI agents & headless SaaS' }, href: '/solutions/ai-agent', description: { zh: '串接既有系統，建立品牌入口、事件流程、AI Agent 與治理。', en: 'Connect existing systems to branded portals, event workflows, agents, and governance.' } },
      { id: 'ai-infrastructure', label: { zh: 'AI 運算基礎設施', en: 'AI infrastructure' }, href: '/solutions/ai-infrastructure', description: { zh: '從工作負載到可採購配置。', en: 'From workload to a quote-ready configuration.' } },
      { id: 'social-intelligence', label: { zh: '社群情報', en: 'Social intelligence' }, href: '/solutions/social-intelligence', description: { zh: '用 Cyabra 辨識假帳號與協調式敘事。', en: 'Use Cyabra to identify fake profiles and coordinated narratives.' } }
    ]
  },
  {
    id: 'products',
    label: { zh: '產品與品牌', en: 'Products & brands' },
    href: '/products',
    description: { zh: '瀏覽 EudTech 方案與 Comino、Cyabra 品牌。', en: 'Browse EudTech solutions and the Comino and Cyabra brands.' },
    children: [
      { id: 'products-overview', label: { zh: '產品總覽', en: 'Products overview' }, href: '/products', description: { zh: '依用途瀏覽產品與品牌。', en: 'Browse products and brands by use case.' } },
      { id: 'configurator', label: { zh: 'Comino 配置器', en: 'Comino configurator' }, href: '/configurator', description: { zh: '建立 GPU 伺服器或工作站配置，再送出詢價。', en: 'Build a GPU server or workstation configuration, then request a quote.' } },
      { id: 'comino', label: { zh: 'Comino 液冷系統', en: 'Comino liquid-cooled systems' }, href: '/solutions/ai-infrastructure', description: { zh: '多 GPU 液冷運算平台與配置服務。', en: 'Multi-GPU liquid-cooled systems and configuration services.' } },
      { id: 'cyabra', label: { zh: 'Cyabra 社群情報', en: 'Cyabra social intelligence' }, href: '/solutions/social-intelligence', description: { zh: '品牌保護與假資訊偵測。', en: 'Brand protection and disinformation detection.' } }
    ]
  },
  {
    id: 'resources',
    label: { zh: 'GPU 選購', en: 'GPU buying' },
    href: '/resources',
    description: { zh: '從工作負載、設備選型到配置、詢價與正式報價。', en: 'From workload and system selection to configuration, quote request, and formal quote.' },
    children: [
      { id: 'resources-overview', label: { zh: 'GPU 選型與採購', en: 'GPU selection and procurement' }, href: '/resources', description: { zh: '依目前採購階段選擇入口。', en: 'Choose the route for the current buying stage.' } },
      { id: 'quote', label: { zh: '開始配置與詢價', en: 'Configure and request a quote' }, href: '/configurator?request=true', description: { zh: '建立配置並送出詢價。', en: 'Build a configuration and submit a quote request.' } }
    ]
  },
  {
    id: 'about',
    label: { zh: '關於 EudTech', en: 'About EudTech' },
    href: '/about',
    description: { zh: '公司定位、能力與合作方式。', en: 'Company positioning, capabilities, and working model.' },
    children: [
      { id: 'about-overview', label: { zh: '公司介紹', en: 'About us' }, href: '/about', description: { zh: 'EudTech 的定位與能力。', en: 'EudTech positioning and capabilities.' } },
      { id: 'careers', label: { zh: '工作機會', en: 'Careers' }, href: '/careers', description: { zh: '加入 EudTech。', en: 'Join EudTech.' } },
      { id: 'contact', label: { zh: '聯絡與諮詢', en: 'Contact' }, href: '/contact', description: { zh: '選擇需求並安排下一步。', en: 'Choose a need and arrange the next step.' } },
      { id: 'privacy', label: { zh: '隱私與資料使用', en: 'Privacy' }, href: '/privacy', description: { zh: '詢價、來源追蹤與保存說明。', en: 'Quote request, attribution, and retention information.' } }
    ]
  }
];

export const SITE_BOOKING = {
  href: 'https://outlook.office.com/book/EudTechOnlineMeeting@EudaemoniaTechnologLtd.onmicrosoft.com/',
  label: { zh: '預約需求診斷', en: 'Book discovery' },
  title: { zh: '30 分鐘 EudTech 解決方案需求診斷', en: '30-minute EudTech solution discovery' },
  description: {
    zh: '確認需求類型、既有系統或工作負載、第一個可驗證交付物與下一步。',
    en: 'Confirm the need, existing systems or workload, first verifiable deliverable, and next step.'
  }
} as const;

export const SITE_CTA = {
  configurator: { zh: '配置 GPU 伺服器', en: 'Configure GPU server', href: '/configurator?request=true' },
  contact: { ...SITE_BOOKING.label, href: '/contact' }
};
