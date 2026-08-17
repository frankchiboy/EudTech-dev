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
      { id: 'solutions-overview', label: { zh: '解決方案總覽', en: 'Solutions overview' }, href: '/solutions', description: { zh: '三大服務方案與下一步。', en: 'Three solution areas and next steps.' } },
      { id: 'ai-agent', label: { zh: 'AI Agent 與 Headless SaaS', en: 'AI agents & headless SaaS' }, href: '/solutions/ai-agent', description: { zh: '串接既有系統，建立品牌入口、事件、Agent 與治理。', en: 'Connect existing systems to branded experiences, events, agents, and governance.' } },
      { id: 'ai-infrastructure', label: { zh: 'AI 運算基礎設施', en: 'AI infrastructure' }, href: '/solutions/ai-infrastructure', description: { zh: '從工作負載到可採購配置。', en: 'From workload to a quote-ready configuration.' } },
      { id: 'social-intelligence', label: { zh: '社群情報', en: 'Social intelligence' }, href: '/solutions/social-intelligence', description: { zh: '用 Cyabra 辨識假帳號與協調式敘事。', en: 'Use Cyabra to identify fake profiles and coordinated narratives.' } }
    ]
  },
  {
    id: 'products',
    label: { zh: '產品與品牌', en: 'Products & brands' },
    href: '/products',
    description: { zh: '瀏覽 EudTech 方案與 Comino、Cyabra 品牌。', en: 'Explore EudTech solutions and Comino and Cyabra brands.' },
    children: [
      { id: 'products-overview', label: { zh: '產品總覽', en: 'Products overview' }, href: '/products', description: { zh: '依用途瀏覽產品與品牌。', en: 'Browse products and brands by use.' } },
      { id: 'configurator', label: { zh: 'Comino 配置器', en: 'Comino configurator' }, href: '/configurator', description: { zh: '建立 GPU 伺服器與工作站配置。', en: 'Build a GPU server or workstation configuration.' } },
      { id: 'comino', label: { zh: 'Comino 液冷系統', en: 'Comino liquid-cooled systems' }, href: '/solutions/ai-infrastructure', description: { zh: '多 GPU 液冷運算平台與配置服務。', en: 'Multi-GPU liquid-cooled systems and configuration services.' } },
      { id: 'cyabra', label: { zh: 'Cyabra 社群情報', en: 'Cyabra social intelligence' }, href: '/solutions/social-intelligence', description: { zh: '品牌保護與假資訊偵測。', en: 'Brand protection and disinformation detection.' } }
    ]
  },
  {
    id: 'resources',
    label: { zh: '採購資源', en: 'Resources' },
    href: '/resources',
    description: { zh: '依選型、部署、比較與 RFQ 需求取得資料。', en: 'Find selection, deployment, comparison, and RFQ resources.' },
    children: [
      { id: 'resources-overview', label: { zh: '資源總覽', en: 'Resources overview' }, href: '/resources', description: { zh: '十七個實際採購入口。', en: 'Seventeen practical procurement entry points.' } },
      { id: 'quote', label: { zh: '開始配置與詢價', en: 'Configure and request a quote' }, href: '/configurator?request=true', description: { zh: '直接建立配置並送出需求。', en: 'Build a configuration and submit a request.' } }
    ]
  },
  {
    id: 'about',
    label: { zh: '關於 EudTech', en: 'About EudTech' },
    href: '/about',
    description: { zh: '了解公司定位、能力與合作方式。', en: 'Learn our positioning, capabilities, and working model.' },
    children: [
      { id: 'about-overview', label: { zh: '公司介紹', en: 'About us' }, href: '/about', description: { zh: 'EudTech 的定位與能力。', en: 'EudTech positioning and capabilities.' } },
      { id: 'careers', label: { zh: '工作機會', en: 'Careers' }, href: '/careers', description: { zh: '加入 EudTech。', en: 'Join EudTech.' } },
      { id: 'contact', label: { zh: '聯絡與諮詢', en: 'Contact' }, href: '/contact', description: { zh: '選擇需求並安排下一步。', en: 'Choose a need and arrange the next step.' } },
      { id: 'privacy', label: { zh: '隱私與資料使用', en: 'Privacy' }, href: '/privacy', description: { zh: '詢價、來源追蹤與保存說明。', en: 'Quote, attribution, and retention information.' } }
    ]
  }
];

export const SITE_CTA = {
  configurator: { zh: '配置 GPU 伺服器', en: 'Configure GPU server', href: '/configurator?request=true' },
  contact: { zh: '預約諮詢', en: 'Book consultation', href: '/contact' }
};
