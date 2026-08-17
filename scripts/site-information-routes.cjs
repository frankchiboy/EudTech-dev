const SITE_INFORMATION_ROUTES = [
  {
    path: '/products',
    title: '產品與品牌｜EudTech',
    description: '瀏覽 EudTech 軟體與導入服務、Comino 液冷 AI 運算系統及 Cyabra 社群情報產品。',
    keywords: 'EudTech 產品, Comino 液冷系統, Cyabra 社群情報, AI Agent, AI GPU 伺服器',
    lead: '依用途瀏覽 EudTech、Comino 與 Cyabra 產品，並直接進入產品詳情、配置器或諮詢。',
    sourceImage: '/grando-8gpu-server.jpg',
    imageAlt: 'EudTech 產品與品牌總覽',
    kind: 'collection',
    priority: '0.90',
    changefreq: 'monthly',
    highlights: ['EudTech 軟體與企業 AI 導入服務。', 'Comino 液冷多 GPU 工作站與伺服器。', 'Cyabra 社群情報與品牌保護。'],
    specs: [{ label: '產品分類', value: '軟體與導入、AI 運算、社群情報' }, { label: 'AI 運算', value: 'Comino 液冷工作站與伺服器' }, { label: '企業軟體', value: 'AI Agent 與可追溯流程導入' }],
    relatedLinks: ['/solutions', '/configurator', '/solutions/ai-agent', '/solutions/social-intelligence', '/contact']
  },
  {
    path: '/resources',
    title: 'AI 伺服器採購資源｜EudTech',
    description: '依選型與報價、部署與散熱、產品比較、RFQ 與公部門採購，瀏覽 EudTech 的實際採購內容與配置入口。',
    keywords: 'GPU 伺服器採購, AI 伺服器 RFQ, GPU 選型, 液冷部署, 公部門採購',
    lead: '將現有 17 個 GPU 伺服器與工作站內容依採購任務分組，從研究一路連到配置及詢價。',
    sourceImage: '/grando-8gpu-server.jpg',
    imageAlt: 'EudTech AI 伺服器採購資源',
    kind: 'collection',
    priority: '0.88',
    changefreq: 'weekly',
    highlights: ['選型與報價入口。', '部署、散熱與電力規劃。', '比較、RFQ、公部門與案例內容。'],
    specs: [{ label: '內容數量', value: '17 個採購與配置入口' }, { label: '主要階段', value: '選型、部署、比較、RFQ 與案例' }, { label: '下一步', value: '開啟配置器或聯絡 EudTech' }],
    relatedLinks: ['/solutions/ai-infrastructure', '/configurator', '/solutions/gpu-server-rfq-checklist', '/solutions/gpu-server-quote', '/contact']
  },
  {
    path: '/solutions/headless-saas',
    title: '企業 Headless SaaS 與 AI Agent 導入｜EudTech',
    description: '串接企業既有 ERP、CRM、Microsoft 365、資料庫與 API，建立品牌化入口、事件流程、受控 AI Agent、權限與稽核。',
    keywords: '企業 Headless SaaS, SaaS 整合, 客戶 Portal, 事件驅動, AI Agent, API 整合',
    lead: '沿用企業有效的既有系統，建立客戶真正需要的品牌入口、事件自動化、AI Agent、權限與治理。',
    sourceImage: '/headless-saas-architecture.svg',
    imageAlt: 'EudTech 企業 Headless SaaS 與 AI Agent 架構',
    priority: '0.90',
    changefreq: 'monthly',
    highlights: ['品牌化網站、客戶 Portal 與 AI Agent。', '已授權 API、Webhook 事件與人工核准。', '來源、版本、權限、執行與稽核證據。'],
    specs: [{ label: '既有系統', value: 'ERP、CRM、Microsoft 365、資料庫與 API' }, { label: '整合層', value: 'API、Webhook、事件、權限與稽核' }, { label: '客戶體驗', value: '品牌網站、Portal 與 AI Agent' }],
    faq: [
      ['Headless SaaS 是什麼？', 'Headless SaaS 將前端體驗與後端資料及業務邏輯分開。企業可以保留既有 ERP、CRM、Microsoft 365、資料庫或 API，再建立品牌網站、客戶 Portal、行動介面與 AI Agent。'],
      ['需要更換現有 ERP 或 CRM 嗎？', '不需要先更換。第一階段會盤點既有系統、資料、API、權限與流程，再決定保留、串接或逐步移轉的範圍。'],
      ['AI 會直接修改正式資料嗎？', '每一類動作都會設定工具與權限。對外發布、正式狀態、付款或其他敏感寫回可設定為必須經人員核准，並保存核准者、時間、來源與執行結果。'],
      ['可以做成多租戶 SaaS 嗎？', '可以分階段產品化。EudTech 先以單一企業專屬服務驗證資料、權限、事件與維運，再依商業模式評估租戶隔離、計費、方案管理與自助開通。']
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: '企業 Headless SaaS 與 AI Agent 導入',
        serviceType: 'Headless SaaS 整合與產品化服務',
        areaServed: 'TW',
        url: 'https://eudaemonia.tech/solutions/headless-saas/',
        provider: { '@type': 'Organization', name: 'EudTech', url: 'https://eudaemonia.tech/' }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首頁', item: 'https://eudaemonia.tech/' },
          { '@type': 'ListItem', position: 2, name: '解決方案', item: 'https://eudaemonia.tech/solutions/' },
          { '@type': 'ListItem', position: 3, name: '企業 Headless SaaS 導入', item: 'https://eudaemonia.tech/solutions/headless-saas/' }
        ]
      }
    ],
    relatedLinks: ['/solutions', '/solutions/ai-agent', '/contact', '/about']
  },
  {
    path: '/solutions/ai-infrastructure',
    title: 'AI 運算基礎設施｜EudTech',
    description: '從工作負載、GPU 與記憶體選型、電力散熱、配置器到正式報價，建立可採購的 AI 伺服器與工作站方案。',
    keywords: 'AI 運算基礎設施, GPU 伺服器, AI 工作站, Comino 液冷, GPU 配置器',
    lead: '先定義訓練、推論、HPC、模擬或視覺化工作負載，再完成選型、配置、報價與導入。',
    sourceImage: '/grando-8gpu-server.jpg',
    imageAlt: 'EudTech AI GPU 運算基礎設施',
    priority: '0.92',
    changefreq: 'weekly',
    highlights: ['工作負載與使用情境盤點。', 'GPU、CPU、記憶體、儲存、電力與散熱選型。', '可分享配置、正式報價與交付規劃。'],
    specs: [{ label: '適用需求', value: 'AI 訓練、推論、HPC、模擬與視覺化' }, { label: '規劃項目', value: 'GPU、CPU、記憶體、儲存、電力與散熱' }, { label: '交付路徑', value: '需求盤點、配置、報價與導入' }],
    relatedLinks: ['/configurator', '/configurator/29', '/resources', '/solutions/gpu-server-quote', '/solutions/nvidia-h200-server', '/contact']
  },
  {
    path: '/solutions/social-intelligence',
    title: '社群情報與品牌保護｜EudTech',
    description: 'EudTech 以 Cyabra 協助企業與公部門分析假帳號、協調式社群行為、敘事擴散及品牌風險。',
    keywords: 'Cyabra, 社群情報, 假帳號偵測, 假資訊分析, 品牌保護',
    lead: '將社群帳號、敘事與擴散關係整理成公關、資安、政策及管理團隊可採取行動的情報。',
    sourceImage: '/cyabra-detect-min.png',
    imageAlt: 'Cyabra 社群情報與品牌保護分析',
    priority: '0.88',
    changefreq: 'monthly',
    highlights: ['假帳號與協調式行為分析。', '敘事擴散與聲譽風險追蹤。', '附證據的決策用情報交付。'],
    specs: [{ label: '適用團隊', value: '品牌、公關、資安、政策與公部門' }, { label: '分析對象', value: '帳號、敘事、擴散與協調行為' }, { label: '交付內容', value: '摘要、來源證據與回應建議' }],
    relatedLinks: ['/solutions', '/products', '/contact', '/about']
  },
  {
    path: '/about',
    title: '關於 EudTech｜優達盟資訊科技',
    description: '了解優達盟資訊科技在企業 AI 導入、AI 運算基礎設施及社群情報領域的定位、能力與工作方式。',
    keywords: '優達盟資訊科技, EudTech, AI 導入, AI 基礎設施, 社群情報',
    lead: 'EudTech 協助企業、研究單位與公部門把 AI 軟體、運算設備與情報工具導入實際工作流程。',
    sourceImage: '/comino-facility-1.jpg',
    imageAlt: 'EudTech 公司能力與工作方式',
    priority: '0.65',
    changefreq: 'monthly',
    highlights: ['系統整合與事件驅動流程。', '人工核准、權限與稽核治理。', '可操作、可量測、可擴大的交付方式。'],
    specs: [{ label: '公司', value: '優達盟資訊科技有限公司' }, { label: '能力範圍', value: 'AI 軟體、運算基礎設施與社群情報' }, { label: '工作方法', value: '目標、證據、負責人與下一步明確化' }],
    relatedLinks: ['/solutions', '/products', '/careers', '/contact', '/privacy']
  },
  {
    path: '/contact',
    title: '聯絡 EudTech｜開始諮詢',
    description: '選擇 AI Agent、AI 運算設備或社群情報需求，透過 Microsoft Bookings 或 Email 與 EudTech 安排下一步。',
    keywords: 'EudTech 聯絡, AI Agent 諮詢, GPU 伺服器詢價, Cyabra 諮詢',
    lead: '先選擇需求類型，再安排正確的顧問、配置或情報諮詢。',
    sourceImage: '/comino-facility-1.jpg',
    imageAlt: '聯絡 EudTech 開始 AI 導入或設備諮詢',
    priority: '0.75',
    changefreq: 'monthly',
    highlights: ['AI Agent 與企業流程導入。', 'GPU 伺服器、工作站與液冷系統。', 'Cyabra 社群情報與品牌保護。'],
    specs: [{ label: '聯絡信箱', value: 'info@eudaemonia.tech' }, { label: '諮詢類型', value: 'AI Agent、AI 運算與社群情報' }, { label: '會議方式', value: 'Microsoft Bookings 線上預約' }],
    relatedLinks: ['/solutions', '/products', '/configurator', '/about']
  },
  {
    path: '/privacy',
    title: '隱私與資料使用｜EudTech',
    description: 'EudTech 說明詢價與聯絡資料、客戶來源追蹤、必要識別碼、資料保存及資料請求方式。',
    keywords: 'EudTech 隱私, 詢價資料, 客戶來源追蹤, 資料使用',
    lead: '說明 EudTech 官網在詢價、回覆、來源分析及服務改善所需範圍內使用資料的方式。',
    sourceImage: '/grando-8gpu-server.jpg',
    imageAlt: 'EudTech 隱私與資料使用說明',
    priority: '0.40',
    changefreq: 'yearly',
    highlights: ['詢價與聯絡資料用途。', '客戶來源與匿名識別碼。', '資料查詢、更正及刪除請求方式。'],
    specs: [{ label: '資料聯絡', value: 'info@eudaemonia.tech' }, { label: '網站資料', value: '詢價、聯絡與來源歸因' }, { label: '資料請求', value: '查詢、更正或刪除請求' }],
    relatedLinks: ['/contact', '/about', '/solutions', '/products']
  }
];

module.exports = { SITE_INFORMATION_ROUTES };
