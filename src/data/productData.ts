import React from 'react';
import { Server, Shield, Monitor } from 'lucide-react';
import { Product } from './models/Product';
import cominoReference from './cominoProcurement.json';

const cominoSpec = (key: keyof typeof cominoReference.specs, isEnglish: boolean) =>
  cominoReference.specs[key][isEnglish ? 'en' : 'zh'];

export const getEudTechProducts = (isEnglish: boolean): Product[] => [
  {
    id: 3,
    title: isEnglish ? 'FinSight Financial AI System' : 'FinSight 金融AI系統',
    description: isEnglish
      ? 'FinSight is a financial language-understanding and data API framework. It combines raw financial data with LLMs for insights and decision support.'
      : 'FinSight 是金融語言理解與資料 API 框架，結合原始金融資料與 LLM，提供即時洞察與決策輔助。',
    icon: React.createElement(Shield, { className: "h-8 w-8 text-blue-800" }),
    image: "https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg",
    features: isEnglish
      ? [
          'Unified financial data API',
          'RESTful API, SaaS or on-premises',
          'LLM demo system for finance',
          'Explain indicators and predict trends with LLM',
          'Extensible architecture',
          'Enterprise consulting and custom GPT'
        ]
      : [
          '金融資料整合 API',
          'RESTful API，SaaS 或地端部署',
          '金融語言模型互動展示',
          '指標解釋、趨勢預測',
          '可延伸的架構',
          '企業顧問服務與專屬 GPT 助理'
        ],
    specs: isEnglish ? {
      'Model': 'LLM + API Wrapper',
      'Data Sources': 'Raw financial data APIs',
      'Integration': 'Webhook + JSON/RESTful API',
      'Deployment': 'SaaS / On-Premises'
    } : {
      '模型架構': 'LLM + API 包裝器',
      '資料來源': '原始金融資料 API',
      '整合模式': 'Webhook 與 JSON/RESTful API',
      '部署方式': 'SaaS 或私有部署'
    },
    comingSoon: false,
    detailedDescription: {
      title: isEnglish ? 'FinSight Financial AI System' : 'FinSight 金融AI系統',
      formFactor: isEnglish ? 'Software Platform' : '軟體平台',
      introduction: isEnglish
        ? 'FinSight processes raw numerical financial data: market prices, trading volumes, financial ratios, and quantitative metrics. It returns clean, structured, real-time financial data without secondary interpretation or news content.'
        : 'FinSight 專門處理原始數值型金融資料：市場價格、交易量、財務比率與量化指標。系統回傳乾淨、結構化的即時金融資料，不含二手解讀或新聞內容。',
      keyFeatures: isEnglish ? [
        'Raw financial data API integration',
        'Real-time market data processing',
        'Quantitative metrics calculation',
        'Multi-market data normalisation',
        'LLM-powered data interpretation',
        'Custom financial indicators',
        'Enterprise-grade API infrastructure',
        'Flexible deployment options'
      ] : [
        '原始金融資料 API 整合',
        '即時市場資料處理',
        '量化指標計算',
        '多市場資料標準化',
        'LLM 資料解讀',
        '客製化金融指標',
        '企業級 API 基礎架構',
        '彈性部署選項'
      ],
      technicalSpecs: isEnglish ? {
        'Data Sources': 'Raw market data APIs, financial databases',
        'Processing': 'Real-time data normalisation and calculation',
        'API Format': 'RESTful JSON, WebSocket streaming',
        'LLM Integration': 'GPT-4 for data interpretation and insights',
        'Deployment': 'Cloud SaaS or on-premises installation',
        'Security': 'Enterprise-grade encryption and access control',
        'Scalability': 'Horizontal scaling for high-frequency data',
        'Latency': 'Sub-second response time for real-time queries'
      } : {
        '資料來源': '原始市場資料 API、金融資料庫',
        '處理方式': '即時資料標準化與計算',
        'API格式': 'RESTful JSON、WebSocket 串流',
        'LLM整合': 'GPT-4 用於資料解讀與洞察',
        '部署方式': '雲端 SaaS 或地端安裝',
        '安全性': '企業級加密與存取控制',
        '擴展性': '高頻資料的水平擴展',
        '延遲性': '即時查詢的亞秒級回應時間'
      },
      applications: isEnglish ? [
        'Algorithmic trading systems',
        'Risk management platforms',
        'Portfolio optimization tools',
        'Financial research and analysis',
        'Regulatory reporting automation',
        'Investment decision support'
      ] : [
        '演算法交易系統',
        '風險管理平台',
        '投資組合優化工具',
        '金融研究與分析',
        '法規報告自動化',
        '投資決策支援'
      ]
    }
  },
  {
    id: 1, 
    title: isEnglish ? 'EudTech Select AI Server' : 'EudTech Select AI伺服器',
    description: isEnglish
      ? 'Enterprise AI server configured for large language models and AI workloads.'
      : '企業級 AI 伺服器，針對大型語言模型與 AI 工作負載配置。',
    icon: React.createElement(Server, { className: "h-8 w-8 text-blue-800" }),
    image: "/EudTech-Select-server-front.png",
    features: isEnglish
      ? [
          '8-GPU direct-connect architecture',
          '4 NVMe drive bays',
          'Cooling system',
          'Dual Intel Xeon processors',
          'Up to 1TB DDR5 RAM',
          'Redundant power supply'
        ]
      : [
          '8-GPU 直連架構',
          '4 個 NVMe 硬碟槽',
          '散熱系統',
          '雙 Intel Xeon 處理器',
          '支援最高 1TB DDR5 RAM',
          '備援電源供應'
        ],
    specs: isEnglish ? {
      'Processing': 'Dual Intel Xeon Gold 6330 Processors',
      'Memory': 'Up to 1TB DDR5-4800 ECC',
      'Storage': '4x 8TB NVMe SSD',
      'GPU': '8x NVIDIA A100 80GB',
      'Network': 'Dual 100GbE QSFP28'
    } : {
      '處理器': '雙Intel Xeon Gold 6330處理器',
      '記憶體': '最高1TB DDR5-4800 ECC',
      '儲存': '4x 8TB NVMe SSD',
      'GPU': '8x NVIDIA A100 80GB',
      '網路': '雙100GbE QSFP28'
    },
    comingSoon: false
  },
];

export const getCominoProducts = (isEnglish: boolean): Product[] => [
  {
    id: 5,
    title: isEnglish ? 'Comino Grando Rackable Workstation' : 'Comino Grando 機架式工作站',
    description: isEnglish
      ? 'Rackable liquid-cooled platform with up to 8 GPUs and 2 CPUs. Confirm compatibility, remote management, power redundancy and site conditions.'
      : '可上架液冷平台，最高支援 8 張 GPU 與 2 顆 CPU；依選定配置確認相容性、遠端管理、電源備援與場地條件。',
    icon: React.createElement(Server, { className: "h-8 w-8 text-purple-700" }),
    image: "/grando-8gpu-server.jpg",
    features: isEnglish ? [
      'Up to 8 GPUs & 2 CPUs',
      'Engineered for versatile deployment, whether mounted in a rack or placed on a table',
      cominoSpec('power', true),
      cominoSpec('fans', true),
      cominoSpec('cooling', true),
      'Optional installation of up to 8 hot swap SSDs (SATA or NVME)'
    ] : [
      '最多8顆GPU與2顆CPU',
      '可機架安裝或桌面擺放，彈性部署',
      cominoSpec('power', false),
      cominoSpec('fans', false),
      cominoSpec('cooling', false),
      '可選配最多8顆熱插拔SSD（SATA或NVME）'
    ],
    specs: isEnglish ? {
      'Maximum Cooling Capacity': cominoSpec('cooling', true),
      'Motherboard': 'Up to EATX & EBB',
      'GPUs': 'Up to 8; NVIDIA: 5090, RTX A6000, RTX 6000 ADA, RTX PRO 6000, A40, L40, L40S, A100, H100, H200 (unavailable; no restock ETA); AMD: W7800, W7900',
      'CPUs': 'Up to 2; Intel Xeon W-2400/2500 & 3400/3500, Xeon Scalable 4th/5th Gen, XEON 6; AMD Threadripper PRO 5000WX/7000WX/9000WX, EPYC 9004/9005',
      'RAM': 'Up to 2TB *',
      'Storage': 'Back panel hot swap cages: up to 4x hot swap SSDs (4x 7mm or 2x 15mm) and up to 4 more instead of 4th PSU; Internal 3.5" cage up to 4x 3.5" or 4x 2.5" 15mm or 12x 2.5" 7mm; Internal 2.5" slots: up to 4x 2.5" SSD 7mm *',
      'Power Supply System': cominoSpec('power', true),
      'Noise Level': cominoSpec('noise', true),
      'Lan': 'Up to 2x 10GbE on motherboard, up to 400GbE in PCIe',
      'OS': 'Ubuntu / Windows 11 (Pro/Home) / Windows Server',
      'Liquid Cooling': cominoSpec('coverage', true),
      'Reservoir': 'Comino custom 450ml with integrated pumps',
      'Fans': cominoSpec('fans', true),
      'Installation': '19" rack-mountable or standalone as a workstation',
      'Required rack space': '4U',
      'Size': '439 x 681 x 177mm (without handles and protruding parts)',
      'Weight': '4 GPUs: 49kg (net), 67kg (gross); 6 GPUs: 52kg (net), 70kg (gross)',
      'Operating & storage temperature range': cominoSpec('temperature', true)
    } : {
      '最大冷卻能力': cominoSpec('cooling', false),
      '主機板': '支援EATX & EBB',
      'GPU': '最高8顆；NVIDIA: 5090, RTX A6000, RTX 6000 ADA, RTX PRO 6000, A40, L40, L40S, A100, H100, H200（目前無貨，補貨時間未定）；AMD: W7800, W7900',
      'CPU': '最高2顆；Intel Xeon W-2400/2500 & 3400/3500, Xeon Scalable 4/5代, XEON 6；AMD Threadripper PRO 5000WX/7000WX/9000WX, EPYC 9004/9005',
      '記憶體': '最高2TB *',
      '儲存': '背板熱插拔：最高4顆SSD（4x 7mm或2x 15mm），可再加4顆（取代第4顆電源）；內部3.5吋托架最高4顆3.5吋或4顆2.5吋15mm或12顆2.5吋7mm；內部2.5吋槽最高4顆2.5吋SSD 7mm *',
      '電源系統': cominoSpec('power', false),
      '噪音': cominoSpec('noise', false),
      '網路': '主機板最高2x 10GbE，PCIe最高400GbE',
      '作業系統': 'Ubuntu / Windows 11 (Pro/Home) / Windows Server',
      '液冷': cominoSpec('coverage', false),
      '水箱': 'Comino客製450ml含整合式幫浦',
      '風扇': cominoSpec('fans', false),
      '安裝方式': '19吋機架或獨立工作站',
      '機架空間': '4U',
      '尺寸': '439 x 681 x 177mm（不含把手及突出部件）',
      '重量': '4顆GPU時49kg（淨重），67kg（毛重）；6顆GPU時52kg（淨重），70kg（毛重）',
      '操作與儲存溫度範圍': cominoSpec('temperature', false)
    },
    comingSoon: false,
    detailedDescription: {
      title: isEnglish ? 'Comino Grando Rackable Workstation' : 'Comino Grando 機架式工作站',
      formFactor: isEnglish ? 'Rackmount / Workstation' : '機架式 / 工作站',
      introduction: isEnglish ? 'High-density liquid-cooled rack system or workstation with up to 8 GPUs and 2 CPUs, modular power, and flexible airflow.' : '高密度液冷機架系統或工作站，最多 8 顆 GPU 與 2 顆 CPU，具模組化電源與彈性風道。',
      keyFeatures: [],
      technicalSpecs: {},
    }
  },
  {
    id: 6,
    title: isEnglish ? 'Comino GRANDO Liquid-cooled Workstation' : 'Comino GRANDO 液冷工作站',
    description: isEnglish
      ? 'Liquid-cooled AI workstation. Current popular Blackwell builds use 2× RTX 5090, Threadripper PRO, 256GB or 512GB RAM and dual NVMe storage.'
      : '適合 AI 開發與模擬的液冷工作站；目前原廠熱門 Blackwell 配置採 2 張 RTX 5090、Threadripper PRO、256GB 或 512GB RAM 與雙 NVMe。',
    icon: React.createElement(Monitor, { className: "h-8 w-8 text-indigo-700" }),
    image: "/vendor/comino/grando-blackwell-official.jpg",
    features: isEnglish ? [
      'Current popular configuration: 2× GeForce RTX 5090',
      'AMD Threadripper PRO platform',
      '256GB or 512GB system memory',
      'Dual NVMe storage',
      'Comino liquid cooling for GPU and CPU',
      'Workstation operation with rack deployment options depending on configuration'
    ] : [
      '目前原廠熱門配置：2 張 GeForce RTX 5090',
      'AMD Threadripper PRO 平台',
      '256GB 或 512GB 系統記憶體',
      '雙 NVMe 儲存',
      'Comino GPU 與 CPU 液冷',
      '工作站使用，並可依配置評估機架部署'
    ],
    specs: isEnglish ? {
      'Popular GPU configuration': '2× GeForce RTX 5090',
      'Processor platform': 'AMD Threadripper PRO',
      'Popular system memory': '256GB or 512GB',
      'Popular storage': 'Dual NVMe',
      'Cooling': 'Comino liquid cooling',
      'Final configuration': 'Confirmed after workload and compatibility review'
    } : {
      '熱門 GPU 配置': '2 張 GeForce RTX 5090',
      '處理器平台': 'AMD Threadripper PRO',
      '熱門系統記憶體': '256GB 或 512GB',
      '熱門儲存': '雙 NVMe',
      '冷卻': 'Comino 液冷',
      '最終配置': '完成工作負載與相容性審查後確認'
    },
    comingSoon: false,
    detailedDescription: {
      title: isEnglish ? 'Comino GRANDO Liquid-cooled Workstation' : 'Comino GRANDO 液冷工作站',
      formFactor: isEnglish ? 'Liquid-cooled Workstation' : '液冷工作站',
      introduction: isEnglish ? 'A liquid-cooled workstation for high-performance AI development and simulation. Current popular Blackwell configurations use 2× RTX 5090 with Threadripper PRO, 256GB or 512GB RAM, and dual NVMe storage.' : '適合高效能 AI 開發與模擬的液冷工作站。目前原廠熱門 Blackwell 配置採 2 張 RTX 5090、Threadripper PRO、256GB 或 512GB RAM 與雙 NVMe。',
      keyFeatures: [],
      technicalSpecs: {},
    }
  },
  {
    id: 7,
    title: isEnglish ? 'Comino Grando Server' : 'Comino Grando 伺服器',
    description: isEnglish
      ? '4U liquid-cooled server with up to 8 GPUs and 2 CPUs. Confirm power redundancy, hot-swappable PSU/SSD options and cooling monitoring.'
      : '4U 液冷伺服器平台，最高支援 8 張 GPU 與 2 顆 CPU；電源備援、電源／SSD 熱插拔選項與冷卻監控依選定配置確認。',
    icon: React.createElement(Server, { className: "h-8 w-8 text-red-700" }),
    image: "/GRANDO_RM-M-CRPS_9004_8xGPU_21.jpg",
    features: isEnglish ? [
      'Up to 8 GPUs & 2 CPUs',
      'Hot-swappable SSDs and redundant power supply modules',
      'Engineered for rack mounting in professional server environments',
      cominoSpec('power', true),
      cominoSpec('fans', true),
      cominoSpec('cooling', true),
      'Optional installation of up to 8 hot swap SSDs (SATA or NVME)',
      'Built for critical IT infrastructure'
    ] : [
      '最多8顆GPU與2顆CPU',
      '熱插拔SSD與冗餘電源模組',
      '專業伺服器環境機架安裝設計',
      cominoSpec('power', false),
      cominoSpec('fans', false),
      cominoSpec('cooling', false),
      '可選配最多8顆熱插拔SSD（SATA或NVME）',
      '適用於關鍵 IT 基礎設施'
    ],
    specs: isEnglish ? {
      'Maximum Cooling Capacity': cominoSpec('cooling', true),
      'Motherboard': 'Up to EATX & EBB',
      'GPUs': 'Up to 8; NVIDIA: 5090, RTX A6000, RTX 6000 ADA, RTX PRO 6000, A40, L40, L40S, A100, H100, H200 (unavailable; no restock ETA); AMD: W7800, W7900',
      'CPUs': 'Up to 2; Single socket: Intel Xeon W-2400/2500 & 3400/3500, Intel Xeon Scalable 4th Gen, 5th Gen, XEON 6, AMD Threadripper PRO 5000WX, 7000WX, 9000WX, AMD EPYC 9004/9005; Dual socket: Intel Xeon Scalable 4th & 5th Gen, XEON 6, AMD EPYC 9004/9005',
      'RAM': 'Up to 2TB *',
      'Storage': 'Back panel hot swap cages: up to 4x hot swap SSDs (4x 7mm or 2x 15mm) and up to 4 more (4x 7mm or 2x 15mm) instead of 4th PSU; Internal 3.5" cage up to 4x 3.5" or 4x 2.5" 15mm or 12x 2.5" 7mm; Internal 2.5" slots: up to 4x 2.5" SSD 7mm *',
      'Power Supply System': cominoSpec('power', true)
    } : {
      '最大冷卻能力': cominoSpec('cooling', false),
      '主機板': '支援EATX & EBB',
      'GPU': '最高8顆；NVIDIA: 5090, RTX A6000, RTX 6000 ADA, RTX PRO 6000, A40, L40, L40S, A100, H100, H200（目前無貨，補貨時間未定）；AMD: W7800, W7900',
      'CPU': '最高2顆；單插槽：Intel Xeon W-2400/2500 & 3400/3500, Intel Xeon Scalable 4代, 5代, XEON 6, AMD Threadripper PRO 5000WX, 7000WX, 9000WX, AMD EPYC 9004/9005；雙插槽：Intel Xeon Scalable 4代 & 5代, XEON 6, AMD EPYC 9004/9005',
      '記憶體': '最高2TB *',
      '儲存': '背板熱插拔架：最多4顆熱插拔SSD（4x 7mm或2x 15mm）並可再加4顆（4x 7mm或2x 15mm）取代第4顆電源；內部3.5吋架最多4顆3.5吋或4顆2.5吋15mm或12顆2.5吋7mm；內部2.5吋插槽：最多4顆2.5吋SSD 7mm *',
      '電源系統': cominoSpec('power', false)
    },
    comingSoon: false,
    detailedDescription: {
      title: isEnglish ? 'Comino Grando Server' : 'Comino Grando 伺服器',
      formFactor: isEnglish ? '4U Rackmount Server' : '4U機架式伺服器',
      introduction: isEnglish
        ? 'The Comino Grando Server is a liquid-cooled platform for AI, machine learning and scientific computing. Sustained performance, redundancy, management and service options are reviewed against the actual workload and build.'
        : 'Comino Grando 伺服器是供 AI、機器學習與科學運算評估的液冷平台。持續運算效能、備援、管理與維護選項依實際工作負載及配置審查。',
      keyFeatures: isEnglish ? [
        'Up to 8 GPUs & 2 CPUs',
        'Hot-swappable SSDs and redundant power supply modules',
        'Engineered for rack mounting in professional server environments',
        cominoSpec('power', true),
        cominoSpec('cooling', true),
        'Optional installation of up to 8 hot swap SSDs (SATA or NVME)',
        'Built for critical IT infrastructure',
        'Liquid cooling with quick-disconnect couplings',
        'Remote management with IPMI interface',
        'Comino monitoring system for device monitoring'
      ] : [
        '最多8顆GPU與2顆CPU',
        '熱插拔SSD與冗餘電源模組',
        '專業伺服器環境機架安裝設計',
        cominoSpec('power', false),
        cominoSpec('cooling', false),
        '可選配最多8顆熱插拔SSD（SATA或NVME）',
        '適用於關鍵 IT 基礎設施',
        '液冷系統配備快速接頭',
        'IPMI介面遠端管理',
        'Comino 監控系統，監看設備狀態'
      ],
      technicalSpecs: isEnglish ? {
        'Motherboards': 'Up to EATX & EBB',
        'RAM': 'Up to 2TB *',
        'M2 drives': 'Up to 8x NVME; Internal 3.5" cage up to 4x 3.5" or 4x 2.5" 15mm or 12x 2.5" 7mm; Internal 2.5" slots: up to 4x 2.5" SSD 7mm',
        'PSU and operating voltage': cominoSpec('power', true),
        'Cooling Capacity': cominoSpec('cooling', true),
        'Noise level': cominoSpec('noise', true),
        'Lan': 'Up to 2x 10GbE on motherboard, up to 400GbE in PCIe',
        'OS': 'Ubuntu / Windows 11 (Pro/Home) / Windows Server',
        'Liquid cooling': cominoSpec('coverage', true),
        'Reservoir': 'Comino custom 450ml with integrated pumps',
            'Fans': cominoSpec('fans', true),
        'Installation': '19" rack-mountable or standalone as a workstation',
        'Required rack space': '4U',
        'Size': '439 x 681 x 177mm (without handles and protruding parts)',
        'Weight': '4x CRPS and 4 GPUs — 49kg (net), 67kg (gross); 4x CRPS and 6 GPUs — 52kg (net), 70kg (gross); 4x CRPS and 8 GPUs — 55kg (net), 72kg (gross)',
        'Operating & storage temperature range': cominoSpec('temperature', true)
      } : {
        '主機板': '最高支援EATX與EBB',
        '記憶體': '最高2TB *',
        'M2硬碟': '最多8顆NVME；內部3.5吋架最多4顆3.5吋或4顆2.5吋15mm或12顆2.5吋7mm；內部2.5吋插槽最多4顆2.5吋SSD 7mm',
        '電源與電壓': cominoSpec('power', false),
        '冷卻能力': cominoSpec('cooling', false),
        '噪音值': cominoSpec('noise', false),
        '網路': '主機板最高2x 10GbE，PCIe最高400GbE',
        '作業系統': 'Ubuntu / Windows 11 (Pro/Home) / Windows Server',
        '液冷範圍': cominoSpec('coverage', false),
        '水箱': 'Comino客製450ml整合式水箱',
            '風扇': cominoSpec('fans', false),
        '安裝方式': '19吋機架安裝或獨立工作站',
        '機架空間': '4U',
        '尺寸': '439 x 681 x 177mm（不含把手與突出部件）',
        '重量': '4顆CRPS與4顆GPU時49kg（淨重），67kg（毛重）；4顆CRPS與6顆GPU時52kg（淨重），70kg（毛重）；4顆CRPS與8顆GPU時55kg（淨重），72kg（毛重）',
        '操作與儲存溫度範圍': cominoSpec('temperature', false)
      },
      relevantConfigurations: isEnglish ? [
        {
          title: 'Comino Integration Kit',
          description: 'A liquid-cooling retrofit requires a compatibility review of the existing multi-GPU server. Confirm performance, energy use and operating temperature through tests of the complete modified system and its external cooling equipment.'
        },
        {
          title: 'Cooling system connection',
          description: 'The upgraded server can connect to a Comino InRack Drycooler, or to an external cooling system through a CDU (cooling distribution unit).'
        },
        {
          title: 'Available configurations',
          configurations: [
            'DUAL EPYC or XEON / 8x NVIDIA H200 (unavailable; no restock ETA) / 2TB RAM / 2TB NVME',
            'DUAL EPYC or XEON / 8x NVIDIA H100 / 2TB RAM / 2TB NVME'
          ]
        }
      ] : [
        {
          title: 'Comino 整合套件',
          description: '既有多 GPU 伺服器改裝液冷，須先審查相容性。效能、能耗與操作溫度，依改裝後整機、外部冷卻設備及實測條件確認。'
        },
        {
          title: '冷卻系統連接',
          description: '升級後的伺服器可連接 Comino InRack 乾式冷卻器，或透過 CDU（冷卻分配單元）連接外部冷卻系統。'
        },
        {
          title: '可用配置',
          configurations: [
            '雙EPYC或XEON / 8x NVIDIA H200（目前無貨，補貨時間未定） / 2TB記憶體 / 2TB NVME',
            '雙EPYC或XEON / 8x NVIDIA H100 / 2TB記憶體 / 2TB NVME'
          ]
        }
      ],
      additionalFeatures: isEnglish ? {
        'LIQUID COOLED': 'Cooling coverage includes CPU/VRM and GPU/GDDR/VRM, depending on the cooling blocks supplied. Validate sustained performance at the agreed intake temperature and workload.',
        'QUICK-DISCONNECT COUPLINGS': 'Quick-disconnect couplings support component service under the manufacturer procedure. Verify coolant handling, leak prevention and return to service; QDC does not imply GPU or CPU hot-swap.',
        'REMOTE MANAGEMENT': 'The datasheet describes IPMI remote management. Confirm KVM, OS installation, monitoring and access controls against the selected motherboard and software.',
        "COMINO'S MONITORING SYSTEM": "The datasheet describes offline cooling logs, event history, temperature statistics and a web interface. Confirm installed version, sensors, alerts and security functions for delivery.",
        'REDUNDANT POWER SUPPLY (CRPS)': cominoSpec('power', true)
      } : {
        '液冷系統': '冷板配置可涵蓋 CPU／VRM 及 GPU／GDDR／VRM；依交付配置確認，並在約定進氣溫度及工作負載下驗證持續運算表現。',
        '快速接頭': '快速斷開接頭支援依原廠程序維護元件；須確認冷卻液處理、防漏與恢復服務。QDC 不代表 GPU 或 CPU 可熱插拔。',
        '遠端管理': '原廠規格書列示 IPMI 遠端管理；KVM、作業系統安裝、監控與存取控制，依選定主機板及軟體確認。',
        'Comino監控系統': '原廠規格書列示離線冷卻紀錄、事件歷史、溫度統計與網頁介面。交付時須確認版本、感測器、告警與資安功能。',
        '備援電源供應器(CRPS)': cominoSpec('power', false)
      }
    }
  },
];

export const getCyabraProducts = (isEnglish: boolean): Product[] => [
  {
    id: 10,
    title: isEnglish ? 'Cyabra Platform' : 'Cyabra 平台',
    description: isEnglish
      ? 'Social intelligence platform that analyses profile authenticity, harmful narratives, coordinated activity, and sentiment, with real-time risk alerts.'
      : '社群情報平台，分析帳號真實性、有害敘事、協調式活動與情緒，並提供即時風險警示。',
    icon: React.createElement(Shield, { className: "h-8 w-8 text-[#003daa]" }),
    image: "/vendor/cyabra/inauthentic-profile-analysis.svg",
    features: isEnglish
      ? [
          'Profile authenticity and behaviour analysis',
          'Harmful narrative and sentiment analysis',
          'Coordinated campaign detection',
          'Real-time narrative alerts',
          'Brand impersonation and AI-content risk analysis',
          'Evidence for analyst review and response planning'
        ]
      : [
          '帳號真實性與行為分析',
          '有害敘事與情緒分析',
          '協調式活動偵測',
          '即時敘事警示',
          '品牌冒名與 AI 內容風險分析',
          '提供分析人員檢視與回應規劃所需證據'
        ],
    specs: isEnglish ? {
      'Analysis': 'Authenticity, behaviour, narratives, sentiment, and coordination',
      'Monitoring': 'Real-time narrative monitoring and alerts',
      'Access': 'SaaS, Managed Services, Real-time Alerts, On-Prem, API',
      'Use cases': 'Brand protection, corporate communications, security, and public sector',
      'Delivery scope': 'Confirmed by licensed edition and agreed data scope'
    } : {
      '分析能力': '真實性、行為、敘事、情緒與協調關係',
      '監測': '即時敘事監測與警示',
      '使用方式': 'SaaS、Managed Services、即時警示、On-Prem、API',
      '應用': '品牌保護、企業溝通、資安與公部門',
      '交付範圍': '依授權版本與約定資料範圍確認'
    },
    comingSoon: false,
    detailedDescription: {
      title: isEnglish ? 'Cyabra Platform' : 'Cyabra 平台',
      formFactor: isEnglish ? 'Software as a Service' : '軟體即服務',
      introduction: isEnglish
        ? 'Cyabra analyses social profiles, content, narratives, sentiment, and coordinated activity. It supports real-time monitoring and alerts while keeping evidence available for analyst review and response decisions.'
        : 'Cyabra 分析社群帳號、內容、敘事、情緒與協調式活動，支援即時監測與警示，並保留供分析人員檢視與決定回應方式的證據。',
      keyFeatures: isEnglish ? [
        'Profile authenticity and behaviour analysis',
        'Narrative and sentiment monitoring',
        'Coordinated campaign detection',
        'Real-time narrative alerts',
        'Brand impersonation and AI-content risk analysis',
        'Evidence-supported analyst review',
        'Corporate communications and public-sector applications',
        'SaaS, managed, on-premises, and API access directions'
      ] : [
        '帳號真實性與行為分析',
        '敘事與情緒監測',
        '協調式活動偵測',
        '即時敘事警示',
        '品牌冒名與 AI 內容風險分析',
        '以證據支援分析人員檢視',
        '企業溝通與公部門應用',
        'SaaS、Managed Service、On-Prem 與 API 使用方向'
      ],
      technicalSpecs: isEnglish ? {
        'Core analysis': 'Authenticity, behaviour, narratives, sentiment, coordination',
        'Monitoring': 'Real-time monitoring and narrative alerts',
        'Access models': 'SaaS, Managed Services, Real-time Alerts, On-Prem, API',
        'Review boundary': 'Analysts review evidence and decide escalation or response',
        'Final scope': 'Depends on licensed edition, supported sources, and contracted data scope'
      } : {
        '核心分析': '真實性、行為、敘事、情緒與協調關係',
        '監測': '即時監測與敘事警示',
        '使用方式': 'SaaS、Managed Services、即時警示、On-Prem、API',
        '人工邊界': '由分析人員檢視證據並決定升級或回應',
        '最終範圍': '依授權版本、支援來源與契約資料範圍確認'
      },
      applications: isEnglish ? [
        'Brand protection: monitor and respond to disinformation campaigns targeting your brand',
        'Crisis management: early detection of emerging reputation threats',
        'Campaign integrity: detect fake activity that undermines political campaigns',
        'Market intelligence: distinguish authentic consumer trends from artificial manipulation',
        'Public sector security: detect coordinated misinformation targeting government communications',
        'Event monitoring: track conversation authenticity around major corporate announcements'
      ] : [
        '品牌保護：監測並回應針對品牌的虛假資訊行動',
        '危機管理：及早發現新浮現的聲譽威脅',
        '競選活動誠信：偵測破壞政治活動的虛假行為',
        '市場情報：區分真實消費趨勢與人為操縱',
        '公部門安全：偵測針對政府溝通的協調式虛假資訊',
        '事件監測：追蹤重大企業公告相關討論的真實性'
      ]
    }
  },
  {
    id: 11,
    title: isEnglish ? 'Cyabra Enterprise Access' : 'Cyabra 企業導入',
    description: isEnglish
      ? 'Cyabra enterprise options include SaaS, Managed Services, alerts, on-premises deployment and API access, scoped to monitoring and integration needs.'
      : '依組織監測與整合需求，規劃 SaaS、Managed Services、即時警示、On-Prem 與 API 等企業導入方式。',
    icon: React.createElement(Shield, { className: "h-8 w-8 text-[#003daa]" }),
    image: "/vendor/cyabra/topic-proliferation.svg",
    features: isEnglish
      ? [
          'SaaS platform access',
          'Managed Services for analyst-supported delivery',
          'Real-time narrative alerts',
          'On-premises deployment direction',
          'API access for approved integrations',
          'Corporate communications and public-sector use cases'
        ]
      : [
          'SaaS 平台使用',
          'Managed Services 分析支援',
          '即時敘事警示',
          'On-Prem 部署方向',
          '核定整合範圍內的 API 存取',
          '企業溝通與公部門應用'
        ],
    specs: isEnglish ? {
      'Access models': 'SaaS / Managed Services / Real-time Alerts / On-Prem / API',
      'Scope design': 'Topics, languages, sources, users, alerts, and reporting',
      'Integration': 'API scope confirmed by licensing and technical review',
      'Delivery': 'Platform use, analyst-supported monitoring, or combined model',
      'Commercial terms': 'Confirmed in the formal proposal and vendor quotation'
    } : {
      '使用方式': 'SaaS／Managed Services／即時警示／On-Prem／API',
      '範圍設計': '議題、語言、來源、使用者、警示與報告',
      '系統整合': 'API 範圍依授權與技術審查確認',
      '交付模式': '平台使用、分析支援監測或混合模式',
      '商務條件': '以正式提案與原廠報價確認'
    },
    comingSoon: false,
    detailedDescription: {
      title: isEnglish ? 'Cyabra Enterprise Access' : 'Cyabra 企業導入',
      formFactor: isEnglish ? 'Enterprise Platform and Service' : '企業平台與服務',
      introduction: isEnglish ? 'Enterprise access can combine SaaS, Managed Services, real-time alerts, on-premises deployment, and API access. The final model is confirmed from users, data scope, workflow, and integration requirements.' : '企業導入可組合 SaaS、Managed Services、即時警示、On-Prem 與 API。最終模式依使用者、資料範圍、工作流程與整合需求確認。',
      keyFeatures: [],
      technicalSpecs: {},
    }
  }
];
