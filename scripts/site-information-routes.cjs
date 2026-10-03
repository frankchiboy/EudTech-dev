const cominoReference = require('../src/data/cominoProcurement.json');

const SITE_INFORMATION_ROUTES = [
  {
    path: '/products',
    title: '產品與品牌｜EudTech',
    description: '瀏覽 AWS 雲端銷售服務、Comino 液冷 AI 運算系統及 Cyabra 社群情報產品。',
    keywords: 'EudTech 產品, Comino 液冷系統, Cyabra 社群情報, AWS 雲端服務, AI GPU 伺服器',
    lead: '依用途瀏覽 AWS、Comino 與 Cyabra 產品，並直接進入產品詳情、配置器或諮詢。',
    sourceImage: '/grando-8gpu-server.jpg',
    imageAlt: 'EudTech 產品與品牌總覽',
    kind: 'collection',
    priority: '0.90',
    changefreq: 'monthly',
    highlights: ['AWS 選型、採購與導入服務。', 'Comino 液冷多 GPU 工作站與伺服器。', 'Cyabra 社群情報與品牌保護。'],
    specs: [{ label: '產品分類', value: '雲端服務、AI 運算、社群情報' }, { label: 'AI 運算', value: 'Comino 液冷工作站與伺服器' }, { label: '雲端服務', value: 'AWS 選型、報價與導入' }],
    relatedLinks: ['/solutions', '/configurator', '/solutions/aws', '/solutions/social-intelligence', '/contact']
  },
  {
    path: '/resources',
    title: 'GPU 伺服器選型與採購｜EudTech',
    description: '依工作負載選擇 GPU 伺服器或 AI 工作站，規劃電力散熱、準備 RFQ，並進入配置與正式報價。',
    keywords: 'GPU 伺服器採購, AI 伺服器 RFQ, GPU 選型, 液冷部署, 公部門採購',
    lead: '尚未確定規格時由 EudTech 協助選型；已有方向時直接建立配置；準備採購文件時使用 RFQ 與驗收檢核表。',
    sourceImage: '/grando-8gpu-server.jpg',
    imageAlt: 'EudTech GPU 伺服器選型與採購',
    kind: 'collection',
    priority: '0.88',
    changefreq: 'weekly',
    highlights: ['請 EudTech 依工作負載協助選型。', '直接建立 GPU 伺服器或工作站配置。', '機關採購參考提供原廠文件、功能及驗收證據；另可使用 RFQ 檢核表整理需求。'],
    specs: [{ label: '第一步', value: '確認工作負載與部署條件' }, { label: '設備方向', value: 'GPU 伺服器、工作站或整合套件' }, { label: '下一步', value: '協助選型、建立配置或準備 RFQ' }],
    relatedLinks: ['/solutions/ai-infrastructure', '/configurator', '/solutions/gpu-server-rfq-checklist', '/solutions/gpu-server-quote', '/contact']
  },
  {
    path: '/solutions/ai-infrastructure',
    title: 'Comino 液冷 GPU 伺服器、AI 工作站與機關採購',
    description: '從工作負載、場地與液冷配置，到機關採購參考、原廠文件及驗收條件，規劃 AI 伺服器與工作站。',
    keywords: 'AI 運算基礎設施, GPU 伺服器, AI 工作站, Comino 液冷, GPU 配置器, 機關採購參考, Comino 原廠文件',
    lead: '多 GPU 算力，也要適合你的工作環境。從桌邊工作站到機架式多 GPU 系統，Comino GRANDO 以封閉式液冷為核心。EudTech 依工作負載評估噪音、空間、供電與散熱，整理成可配置、可詢價的方案。',
    sourceImage: '/vendor/comino/grando-blackwell-official.jpg',
    imageAlt: 'Comino GRANDO Blackwell 多 GPU 液冷系統原廠圖片',
    priority: '0.92',
    changefreq: 'weekly',
    procurement: cominoReference,
    highlights: [
      '買得到 GPU，不代表場地已經準備好。先確認設備旁是否有人工作、空間與電力，以及連續運作時間。',
      '把熱帶到散熱器，讓機箱空間留給運算。冷卻液傳遞高熱元件的熱，散熱器與氣流將熱排入周圍環境。',
      '本頁介紹的機內封閉循環方案不需另接冷卻塔；熱仍會排入室內，空調、通風與供電仍須確認。',
      '桌邊工作站優先考慮聲音與使用環境；機架系統優先考慮密度、供電、排熱與維護空間。相同品牌不代表所有配置有相同噪音。',
      'AI 推論與微調、生命科學與工程運算、渲染與虛擬製作，需依軟體、精度、資料交換及使用人數確認配置。GPU 張數不是軟體效能保證。',
      '冷卻監控、快速斷開接頭、電源容量與備援方式依機型確認；維護仍須依原廠程序。',
      'EudTech 協助需求與工程選型、場地與配置審查、正式報價與驗收、維護及後續支援；實際項目以正式報價及約定範圍為準。',
      '既有設備液冷改裝先評估相容性、施工範圍與保固影響，再決定是否適合。',
      '機關採購參考提供 GRANDO Server v2.3 規格書、RM v2.0.2 使用指南及功能與驗收證據對照。',
      cominoReference.configurationNote.zh
    ],
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
    description: '了解優達盟資訊科技在AWS 雲端服務、AI 運算基礎設施及社群情報領域的定位、能力與工作方式。',
    keywords: '優達盟資訊科技, EudTech, 雲端導入, AI 基礎設施, 社群情報',
    lead: 'EudTech 協助企業、研究單位與公部門把 AWS 雲端服務、運算設備與情報工具導入實際工作流程。',
    sourceImage: '/comino-facility-1.jpg',
    imageAlt: 'EudTech 公司能力與工作方式',
    priority: '0.65',
    changefreq: 'monthly',
    highlights: ['系統整合與事件驅動流程。', '人員核准、權限與稽核治理。', '可操作、可量測、可擴大的交付方式。'],
    specs: [{ label: '公司', value: '優達盟資訊科技有限公司' }, { label: '能力範圍', value: 'AWS 雲端服務、運算基礎設施與社群情報' }, { label: '工作方法', value: '目標、證據、負責人與下一步明確化' }],
    relatedLinks: ['/solutions', '/products', '/careers', '/contact', '/privacy']
  },
  {
    path: '/contact',
    title: '聯絡 EudTech｜開始諮詢',
    description: '選擇 AWS 雲端服務、AI 運算設備或社群情報需求，透過 Microsoft Bookings 或 Email 與 EudTech 安排下一步。',
    keywords: 'EudTech 聯絡, AWS 雲端服務 諮詢, GPU 伺服器詢價, Cyabra 諮詢',
    lead: '先選擇需求類型，再安排正確的顧問、配置或情報諮詢。',
    sourceImage: '/comino-facility-1.jpg',
    imageAlt: '聯絡 EudTech 開始 雲端導入或設備諮詢',
    priority: '0.75',
    changefreq: 'monthly',
    highlights: ['AWS 雲端銷售與導入。', 'GPU 伺服器、工作站與液冷系統。', 'Cyabra 社群情報與品牌保護。'],
    specs: [{ label: '聯絡信箱', value: 'quote@eudaemonia.tech' }, { label: '諮詢類型', value: 'AWS 雲端服務、AI 運算與社群情報' }, { label: '會議方式', value: 'Microsoft Bookings 線上預約' }],
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
    specs: [{ label: '資料聯絡', value: 'quote@eudaemonia.tech' }, { label: '網站資料', value: '詢價、聯絡與來源歸因' }, { label: '資料請求', value: '查詢、更正或刪除請求' }],
    relatedLinks: ['/contact', '/about', '/solutions', '/products']
  }
];

module.exports = { SITE_INFORMATION_ROUTES };
