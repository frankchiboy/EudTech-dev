import React from 'react';
import { Server, Shield, Monitor } from 'lucide-react';
import { Product } from './models/Product';

export const getEudTechProducts = (isEnglish: boolean): Product[] => [
  {
    id: 3,
    title: isEnglish ? 'FinSight Financial AI System' : 'FinSight 金融AI系統',
    description: isEnglish
      ? 'FinSight is a financial language-understanding and data API framework. It combines raw financial data with LLMs for real-time insights and decision support.'
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
      ? 'Rackmount workstation or server with up to 8 GPUs and 2 CPUs. Liquid cooling, modular design, remote management, and redundant power supply.'
      : '機架式工作站或伺服器，最多 8 顆 GPU 與 2 顆 CPU。具備液冷、模組化設計、遠端管理與備援電源。',
    icon: React.createElement(Server, { className: "h-8 w-8 text-purple-700" }),
    image: "/grando-8gpu-server.jpg",
    features: isEnglish ? [
      'Up to 8 GPUs & 2 CPUs',
      'Engineered for versatile deployment, whether mounted in a rack or placed on a table',
      'Redundant Power supply system up to 4x 2000W hot-swap CRPS modules (Redundancy modes: 4+0, 3+1, 2+2). Power capacity up to 8.0kW',
      '3x Ultra High Flow fans 6200RPM each (high noise level) or 3x 140mm 3000RPM (low noise level)',
      'Cooling Capacity up to 6.5kW',
      'Optional installation of up to 8 hot swap SSDs (SATA or NVME)'
    ] : [
      '最多8顆GPU與2顆CPU',
      '可機架安裝或桌面擺放，彈性部署',
      '備援電源系統，最高4顆2000W熱插拔CRPS（備援模式：4+0、3+1、2+2），電力最高8.0kW',
      '3顆超高流量6200RPM風扇（高噪音）或3顆140mm 3000RPM（低噪音）',
      '散熱能力最高6.5kW',
      '可選配最多8顆熱插拔SSD（SATA或NVME）'
    ],
    specs: isEnglish ? {
      'Maximum Cooling Capacity': '6500 W @ 20°C intake air, performance mode',
      'Motherboard': 'Up to EATX & EBB',
      'GPUs': 'Up to 8; NVIDIA: 5090, RTX A6000, RTX 6000 ADA, RTX PRO 6000, A40, L40, L40S, A100, H100, H200; AMD: W7800, W7900',
      'CPUs': 'Up to 2; Intel Xeon W-2400/2500 & 3400/3500, Xeon Scalable 4th/5th Gen, XEON 6; AMD Threadripper PRO 5000WX/7000WX/9000WX, EPYC 9004/9005',
      'RAM': 'Up to 2TB *',
      'Storage': 'Back panel hot swap cages: up to 4x hot swap SSDs (4x 7mm or 2x 15mm) and up to 4 more instead of 4th PSU; Internal 3.5" cage up to 4x 3.5" or 4x 2.5" 15mm or 12x 2.5" 7mm; Internal 2.5" slots: up to 4x 2.5" SSD 7mm *',
      'Power Supply System': '4x 2000W CRPS modules (Redundancy: 4+0, 3+1, 2+2), up to 8.0kW @ 180-264V, up to 4kW @ 90-140V',
      'Noise Level': '39dB - 70dB',
      'Lan': 'Up to 2x 10GbE on motherboard, up to 400GbE in PCIe',
      'OS': 'Ubuntu / Windows 11 (Pro/Home) / Windows Server',
      'Liquid Cooling': 'CPU with VRM, GPU with GDDR and VRM',
      'Reservoir': 'Comino custom 450ml with integrated pumps',
      'Pumps': '2x Laing DDC 20W',
      'Radiators': '1x 120x360mm core',
      'Fans': '3x Ultra High Flow 6200RPM (high noise) or 3x High Flow 3000RPM (low noise)',
      'Installation': '19" rack-mountable or standalone as a workstation',
      'Required rack space': '4U',
      'Size': '439 x 681 x 177mm (without handles and protruding parts)',
      'Weight': '4 GPUs: 49kg (net), 67kg (gross); 6 GPUs: 52kg (net), 70kg (gross)',
      'Operating & storage temperature range': 'Storage: -5.5°C / 23.1°F; Operating: 3.4°C / 38.1°C *'
    } : {
      '最大冷卻能力': '6500 W @ 20°C進氣，性能模式',
      '主機板': '支援EATX & EBB',
      'GPU': '最高8顆；NVIDIA: 5090, RTX A6000, RTX 6000 ADA, RTX PRO 6000, A40, L40, L40S, A100, H100, H200；AMD: W7800, W7900',
      'CPU': '最高2顆；Intel Xeon W-2400/2500 & 3400/3500, Xeon Scalable 4/5代, XEON 6；AMD Threadripper PRO 5000WX/7000WX/9000WX, EPYC 9004/9005',
      '記憶體': '最高2TB *',
      '儲存': '背板熱插拔：最高4顆SSD（4x 7mm或2x 15mm），可再加4顆（取代第4顆電源）；內部3.5吋托架最高4顆3.5吋或4顆2.5吋15mm或12顆2.5吋7mm；內部2.5吋槽最高4顆2.5吋SSD 7mm *',
      '電源系統': '4x 2000W CRPS（備援：4+0、3+1、2+2），180-264V最高8.0kW，90-140V最高4kW',
      '噪音': '39dB - 70dB',
      '網路': '主機板最高2x 10GbE，PCIe最高400GbE',
      '作業系統': 'Ubuntu / Windows 11 (Pro/Home) / Windows Server',
      '液冷': 'CPU含VRM，GPU含GDDR與VRM',
      '水箱': 'Comino客製450ml含整合式幫浦',
      '幫浦': '2x Laing DDC 20W',
      '散熱排': '1x 120x360mm核心',
      '風扇': '3顆超高流量6200RPM（高噪音）或3顆140mm 3000RPM（低噪音）',
      '安裝方式': '19吋機架或獨立工作站',
      '機架空間': '4U',
      '尺寸': '439 x 681 x 177mm（不含把手及突出部件）',
      '重量': '4顆GPU時49kg（淨重），67kg（毛重）；6顆GPU時52kg（淨重），70kg（毛重）',
      '操作與儲存溫度範圍': '儲存：-5.5°C / 23.1°F；操作：3.4°C / 38.1°C *'
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
    title: isEnglish ? 'Comino GRANDO Silent Workstation' : 'Comino GRANDO 靜音工作站',
    description: isEnglish
      ? 'Liquid-cooled workstation for AI development and simulation. Current popular Blackwell configurations use 2× RTX 5090 with Threadripper PRO, 256GB or 512GB RAM, and dual NVMe storage.'
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
      title: isEnglish ? 'Comino GRANDO Silent Workstation' : 'Comino GRANDO 靜音工作站',
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
      ? '4U server with up to 8 GPUs and 2 CPUs. Liquid cooling, redundant power supply, hot-swappable components, and the Comino monitoring system.'
      : '4U 伺服器，最多 8 顆 GPU 與 2 顆 CPU。具備液冷、備援電源、熱插拔元件與 Comino 監控系統。',
    icon: React.createElement(Server, { className: "h-8 w-8 text-red-700" }),
    image: "/GRANDO_RM-M-CRPS_9004_8xGPU_21.jpg",
    features: isEnglish ? [
      'Up to 8 GPUs & 2 CPUs',
      'Hot-swappable SSDs and redundant power supply modules',
      'Engineered for rack mounting in professional server environments',
      'Redundant Power supply system up to 4x 2000W hot-swap CRPS modules (Redundancy modes: 4+0, 3+1, 2+2). Power capacity up to 8.0kW',
      '3x Ultra High Flow fans 6200RPM each (high noise level) or 3x 140mm 3000RPM (low noise level)',
      'Cooling Capacity up to 6.5kW',
      'Optional installation of up to 8 hot swap SSDs (SATA or NVME)',
      'Built for critical IT infrastructure'
    ] : [
      '最多8顆GPU與2顆CPU',
      '熱插拔SSD與冗餘電源模組',
      '專業伺服器環境機架安裝設計',
      '備援電源系統，最高4顆2000W熱插拔CRPS（備援模式：4+0、3+1、2+2），電力最高8.0kW',
      '3顆超高流量6200RPM風扇（高噪音）或3顆140mm 3000RPM（低噪音）',
      '散熱能力最高6.5kW',
      '可選配最多8顆熱插拔SSD（SATA或NVME）',
      '適用於關鍵 IT 基礎設施'
    ],
    specs: isEnglish ? {
      'Maximum Cooling Capacity': '6500 W @ 20°C intake air, performance mode',
      'Motherboard': 'Up to EATX & EBB',
      'GPUs': 'Up to 8; NVIDIA: 5090, RTX A6000, RTX 6000 ADA, RTX PRO 6000, A40, L40, L40S, A100, H100, H200; AMD: W7800, W7900',
      'CPUs': 'Up to 2; Single socket: Intel Xeon W-2400/2500 & 3400/3500, Intel Xeon Scalable 4th Gen, 5th Gen, XEON 6, AMD Threadripper PRO 5000WX, 7000WX, 9000WX, AMD EPYC 9004/9005; Dual socket: Intel Xeon Scalable 4th & 5th Gen, XEON 6, AMD EPYC 9004/9005',
      'RAM': 'Up to 2TB *',
      'Storage': 'Back panel hot swap cages: up to 4x hot swap SSDs (4x 7mm or 2x 15mm) and up to 4 more (4x 7mm or 2x 15mm) instead of 4th PSU; Internal 3.5" cage up to 4x 3.5" or 4x 2.5" 15mm or 12x 2.5" 7mm; Internal 2.5" slots: up to 4x 2.5" SSD 7mm *',
      'Power Supply System': '4x 2000W CRPS modules (Redundancy modes: 4+0, 3+1, 2+2). Power capacity up to 8.0kW @ 180-264V, up to 4kW @ 90-140V'
    } : {
      '最大冷卻能力': '6500 W @ 20°C進氣，性能模式',
      '主機板': '支援EATX & EBB',
      'GPU': '最高8顆；NVIDIA: 5090, RTX A6000, RTX 6000 ADA, RTX PRO 6000, A40, L40, L40S, A100, H100, H200；AMD: W7800, W7900',
      'CPU': '最高2顆；單插槽：Intel Xeon W-2400/2500 & 3400/3500, Intel Xeon Scalable 4代, 5代, XEON 6, AMD Threadripper PRO 5000WX, 7000WX, 9000WX, AMD EPYC 9004/9005；雙插槽：Intel Xeon Scalable 4代 & 5代, XEON 6, AMD EPYC 9004/9005',
      '記憶體': '最高2TB *',
      '儲存': '背板熱插拔架：最多4顆熱插拔SSD（4x 7mm或2x 15mm）並可再加4顆（4x 7mm或2x 15mm）取代第4顆電源；內部3.5吋架最多4顆3.5吋或4顆2.5吋15mm或12顆2.5吋7mm；內部2.5吋插槽：最多4顆2.5吋SSD 7mm *',
      '電源系統': '4顆2000W CRPS模組（備援模式：4+0、3+1、2+2）。180-264V電力容量最高8.0kW，90-140V電力容量最高4kW'
    },
    comingSoon: false,
    detailedDescription: {
      title: isEnglish ? 'Comino Grando Server' : 'Comino Grando 伺服器',
      formFactor: isEnglish ? '4U Rackmount Server' : '4U機架式伺服器',
      introduction: isEnglish
        ? 'The Comino Grando Server is built for AI, machine learning, and scientific computing workloads. Liquid cooling, redundant power supplies, and hot-swappable components support continuous operation in critical IT infrastructure.'
        : 'Comino Grando 伺服器適用於 AI、機器學習與科學運算工作負載。液冷、備援電源與熱插拔元件，支援關鍵 IT 基礎設施的連續運作。',
      keyFeatures: isEnglish ? [
        'Up to 8 GPUs & 2 CPUs',
        'Hot-swappable SSDs and redundant power supply modules',
        'Engineered for rack mounting in professional server environments',
        'Redundant Power supply system up to 4x 2000W hot-swap CRPS modules',
        'Cooling Capacity up to 6.5kW',
        'Optional installation of up to 8 hot swap SSDs (SATA or NVME)',
        'Built for critical IT infrastructure',
        'Liquid cooling with quick-disconnect couplings',
        'Remote management with IPMI interface',
        'Comino monitoring system for device monitoring'
      ] : [
        '最多8顆GPU與2顆CPU',
        '熱插拔SSD與冗餘電源模組',
        '專業伺服器環境機架安裝設計',
        '備援電源系統，最高4顆2000W熱插拔CRPS模組',
        '散熱能力最高6.5kW',
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
        'PSU and operating voltage': '4x 2000W CRPS modules (Redundancy modes: 4+0, 3+1, 2+2). Power capacity up to 8.0kW @ 180-264V, up to 4kW @ 90-140V',
        'Cooling Capacity': '6.5kW',
        'Noise level': '39dB - 70dB',
        'Lan': 'Up to 2x 10GbE on motherboard, up to 400GbE in PCIe',
        'OS': 'Ubuntu / Windows 11 (Pro/Home) / Windows Server',
        'Liquid cooling': 'CPU with VRM and GPU with GDDR and VRM',
        'Reservoir': 'Comino custom 450ml with integrated pumps',
        'Pumps': '2x Laing DDC 20W',
        'Radiators': '1x 120x360mm core',
        'Fans': '3x Ultra High Flow 140mm 6200RPM (high noise level) or 3x High Flow 140mm 5000RPM (medium noise level)',
        'Installation': '19" rack-mountable or standalone as a workstation',
        'Required rack space': '4U',
        'Size': '439 x 681 x 177mm (without handles and protruding parts)',
        'Weight': '4x CRPS and 4 GPUs — 49kg (net), 67kg (gross); 4x CRPS and 6 GPUs — 52kg (net), 70kg (gross); 4x CRPS and 8 GPUs — 55kg (net), 72kg (gross)',
        'Operating & storage temperature range': 'Storage: -5.50ºC / 23.122ºF; Operating: 3.38ºC / 38.100ºF *'
      } : {
        '主機板': '最高支援EATX與EBB',
        '記憶體': '最高2TB *',
        'M2硬碟': '最多8顆NVME；內部3.5吋架最多4顆3.5吋或4顆2.5吋15mm或12顆2.5吋7mm；內部2.5吋插槽最多4顆2.5吋SSD 7mm',
        '電源與電壓': '4顆2000W CRPS模組（備援模式：4+0、3+1、2+2）。180-264V電力容量最高8.0kW，90-140V電力容量最高4kW',
        '冷卻能力': '6.5kW',
        '噪音值': '39dB - 70dB',
        '網路': '主機板最高2x 10GbE，PCIe最高400GbE',
        '作業系統': 'Ubuntu / Windows 11 (Pro/Home) / Windows Server',
        '液冷範圍': 'CPU含VRM、GPU含GDDR與VRM',
        '水箱': 'Comino客製450ml整合式水箱',
        '幫浦': '2x Laing DDC 20W',
        '散熱排': '1x 120x360mm核心',
        '風扇': '3顆超高流量140mm 6200RPM（高噪音）或3顆高流量140mm 5000RPM（中噪音）',
        '安裝方式': '19吋機架安裝或獨立工作站',
        '機架空間': '4U',
        '尺寸': '439 x 681 x 177mm（不含把手與突出部件）',
        '重量': '4顆CRPS與4顆GPU時49kg（淨重），67kg（毛重）；4顆CRPS與6顆GPU時52kg（淨重），70kg（毛重）；4顆CRPS與8顆GPU時55kg（淨重），72kg（毛重）',
        '操作與儲存溫度範圍': '儲存：-5.50ºC / 23.122ºF；操作：3.38ºC / 38.100ºF *'
      },
      relevantConfigurations: isEnglish ? [
        {
          title: 'Comino Integration Kit',
          description: 'The Comino integration kit upgrades any multi-GPU air-cooled server to liquid cooling. It raises performance by up to 30%, cuts facility power consumption by up to 40%, and allows operation in harsh environments up to +40ºC/104ºF with no thermal throttling.'
        },
        {
          title: 'Cooling system connection',
          description: 'The upgraded server can connect to a Comino InRack Drycooler, or to an external cooling system through a CDU (cooling distribution unit).'
        },
        {
          title: 'Available configurations',
          configurations: [
            'DUAL EPYC or XEON / 8x NVIDIA H200 / 2TB RAM / 2TB NVME',
            'DUAL EPYC or XEON / 8x NVIDIA H100 / 2TB RAM / 2TB NVME'
          ]
        }
      ] : [
        {
          title: 'Comino 整合套件',
          description: 'Comino 整合套件可將任何多 GPU 氣冷伺服器升級為液冷。效能最高提升 30%，設施總功耗最高降低 40%，並可在最高 +40ºC/104ºF 的嚴苛環境下運作而無熱節流。'
        },
        {
          title: '冷卻系統連接',
          description: '升級後的伺服器可連接 Comino InRack 乾式冷卻器，或透過 CDU（冷卻分配單元）連接外部冷卻系統。'
        },
        {
          title: '可用配置',
          configurations: [
            '雙EPYC或XEON / 8x NVIDIA H200 / 2TB記憶體 / 2TB NVME',
            '雙EPYC或XEON / 8x NVIDIA H100 / 2TB記憶體 / 2TB NVME'
          ]
        }
      ],
      additionalFeatures: isEnglish ? {
        'LIQUID COOLED': 'The Comino liquid cooling system lets current high-end GPUs and CPUs run at full performance. It helps extend hardware lifespan and supports 24/7 operation in harsh environments with no thermal throttling.',
        'QUICK-DISCONNECT COUPLINGS': 'Quick-disconnect couplings (Comino TheQ) on each GPU and CPU simplify servicing, shorten maintenance time, and increase system availability.',
        'REMOTE MANAGEMENT': 'An IPMI interface provides remote management, including remote KVM access, OS installation, and server monitoring, to help keep downtime low.',
        "COMINO'S MONITORING SYSTEM": "Collects cooling system logs offline to analyse device usage history, record failure events, and track temperature statistics. A web-based GUI allows several devices to be inspected remotely, which increases system availability.",
        'REDUNDANT POWER SUPPLY (CRPS)': 'Designed for critical IT infrastructure. The PSUs operate across the full 100-240VAC and 240VDC range and provide N+M redundancy.'
      } : {
        '液冷系統': 'Comino 液冷系統讓高階 GPU 與 CPU 維持完整效能。有助延長硬體壽命，並支援在嚴苛環境下 24/7 運作，無熱節流。',
        '快速接頭': '每顆 GPU 與 CPU 均配備快速接頭（Comino TheQ），簡化維護、縮短維護時間，提高系統可用性。',
        '遠端管理': '內建 IPMI 介面提供遠端管理，包含遠端 KVM 存取、作業系統安裝與伺服器監控，有助降低停機時間。',
        'Comino監控系統': '可離線收集冷卻系統日誌，分析設備使用歷史、記錄故障事件並監控溫度統計。網頁介面可遠端檢視多台設備，提高系統可用性。',
        '備援電源供應器(CRPS)': '專為關鍵 IT 基礎設施設計。電源供應器支援 100-240VAC 與 240VDC 全範圍電壓，並提供 N+M 備援。'
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
      ? 'Enterprise delivery options across SaaS, Managed Services, real-time alerts, on-premises deployment, and API access, scoped to the organisation’s monitoring and integration needs.'
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
