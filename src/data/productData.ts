import React from 'react';
import { Server, Shield, Monitor } from 'lucide-react';
import { Product } from './models/Product';

export const getEudTechProducts = (isEnglish: boolean): Product[] => [
  {
    id: 3,
    title: isEnglish ? 'FinSight Financial AI System' : 'FinSight 金融AI系統',
    description: isEnglish
      ? 'FinSight: Financial language understanding and data API framework. Combine raw data with LLMs for real-time, flexible insights and decision support.'
      : 'FinSight 金融語言理解與資料API架構，結合原始數據與LLM，提供即時彈性洞察與決策輔助。',
    icon: React.createElement(Shield, { className: "h-8 w-8 text-blue-800" }),
    image: "https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg",
    features: isEnglish
      ? [
          'Unified financial data API',
          'RESTful API, SaaS or on-premises',
          'LLM demo system for finance',
          'Explain indicators and predict trends with LLM',
          'Highly extensible architecture',
          'Enterprise consulting and custom GPT'
        ]
      : [
          '金融資料整合API',
          'RESTful API，SaaS雲端或本地端',
          '金融語言模型互動展示',
          '指標解釋、趨勢預測',
          '高度彈性延伸架構',
          '企業顧問與專屬GPT助理'
        ],
    specs: isEnglish ? {
      'Model': 'LLM + API Wrapper',
      'Data Sources': 'Raw financial data APIs',
      'Integration': 'Webhook + JSON/RESTful API',
      'Deployment': 'SaaS / On-Premises'
    } : {
      '模型架構': 'LLM + API 包裝器',
      '資料來源': '原始金融數據API',
      '整合模式': 'Webhook 與 JSON/RESTful API',
      '部署方式': 'SaaS 或 私有部署'
    },
    comingSoon: false,
    detailedDescription: {
      title: isEnglish ? 'FinSight Financial AI System' : 'FinSight 金融AI系統',
      formFactor: isEnglish ? 'Software Platform' : '軟體平台',
      introduction: isEnglish
        ? 'FinSight is a comprehensive financial AI platform that specializes in processing raw numerical financial data. Our system focuses exclusively on hard data - market prices, trading volumes, financial ratios, and quantitative metrics - providing clean, structured access to real-time financial information without secondary interpretations or news content.'
        : 'FinSight 是一個專門處理原始數字金融數據的綜合性金融AI平台。我們的系統專注於硬數據 - 市場價格、交易量、財務比率和量化指標 - 提供乾淨、結構化的即時金融資訊存取，不包含二手解讀或新聞內容。',
      keyFeatures: isEnglish ? [
        'Raw financial data API integration',
        'Real-time market data processing',
        'Quantitative metrics calculation',
        'Multi-market data normalization',
        'LLM-powered data interpretation',
        'Custom financial indicators',
        'Enterprise-grade API infrastructure',
        'Flexible deployment options'
      ] : [
        '原始金融數據API整合',
        '即時市場數據處理',
        '量化指標計算',
        '多市場數據標準化',
        'LLM驅動的數據解讀',
        '客製化金融指標',
        '企業級API基礎架構',
        '彈性部署選項'
      ],
      technicalSpecs: isEnglish ? {
        'Data Sources': 'Raw market data APIs, financial databases',
        'Processing': 'Real-time data normalization and calculation',
        'API Format': 'RESTful JSON, WebSocket streaming',
        'LLM Integration': 'GPT-4 for data interpretation and insights',
        'Deployment': 'Cloud SaaS or on-premises installation',
        'Security': 'Enterprise-grade encryption and access control',
        'Scalability': 'Horizontal scaling for high-frequency data',
        'Latency': 'Sub-second response time for real-time queries'
      } : {
        '資料來源': '原始市場數據API、金融資料庫',
        '處理方式': '即時數據標準化與計算',
        'API格式': 'RESTful JSON、WebSocket串流',
        'LLM整合': 'GPT-4用於數據解讀與洞察',
        '部署方式': '雲端SaaS或本地端安裝',
        '安全性': '企業級加密與存取控制',
        '擴展性': '高頻數據的水平擴展',
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
      ? 'Enterprise-grade AI server with optimized performance for large language models and AI workloads.'
      : '企業級AI伺服器，為大型語言模型和AI工作負載優化效能。',
    icon: React.createElement(Server, { className: "h-8 w-8 text-blue-800" }),
    image: "/EudTech-Select-server-front.png",
    features: isEnglish
      ? [
          '8-GPU direct-connect architecture',
          '4 NVMe drive bays',
          'Advanced cooling system',
          'Dual Intel Xeon Processors',
          '1TB DDR5 RAM Support',
          'Redundant Power Supply'
        ]
      : [
          '8-GPU 直連架構',
          '4個 NVMe 驅動器托架',
          '先進散熱系統',
          '雙Intel Xeon處理器',
          '支援1TB DDR5 RAM',
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
      ? 'Rackmount workstation/server with up to 8 GPUs & 2 CPUs, advanced liquid cooling, modular design, remote management, and redundant power supply.'
      : '機架式工作站/伺服器，支援最高8顆GPU與2顆CPU，具備先進液冷、模組化設計、遠端管理及冗餘電源。',
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
      introduction: isEnglish ? 'High density liquid-cooled rack/workstation supporting up to 8 GPUs and 2 CPUs with modular power and flexible airflow.' : '高密度液冷機架/工作站，支援最多8顆GPU與2顆CPU，具模組化電源與彈性風道。',
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
      ? 'High-performance server with up to 8 GPUs & 2 CPUs, enterprise-grade liquid cooling, redundant power supply, hot-swappable components, and advanced monitoring system.'
      : '高效能伺服器，支援最高8顆GPU與2顆CPU，企業級液冷、冗餘電源、熱插拔元件及先進監控系統。',
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
      'Enterprise-grade reliability and performance'
    ] : [
      '最多8顆GPU與2顆CPU',
      '熱插拔SSD與冗餘電源模組',
      '專業伺服器環境機架安裝設計',
      '備援電源系統，最高4顆2000W熱插拔CRPS（備援模式：4+0、3+1、2+2），電力最高8.0kW',
      '3顆超高流量6200RPM風扇（高噪音）或3顆140mm 3000RPM（低噪音）',
      '散熱能力最高6.5kW',
      '可選配最多8顆熱插拔SSD（SATA或NVME）',
      '企業級可靠性與效能'
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
        ? 'The Comino Grando Server is a high-performance, enterprise-grade computing solution designed for demanding AI, machine learning, and scientific computing workloads. Featuring advanced liquid cooling technology, redundant power supplies, and hot-swappable components, it delivers unmatched reliability and performance for critical IT infrastructure.'
        : 'Comino Grando 伺服器是一款高效能企業級運算解決方案，專為AI、機器學習和科學運算等高需求工作負載而設計。配備先進液冷技術、冗餘電源和熱插拔元件，為關鍵IT基礎設施提供無與倫比的可靠性和效能。',
      keyFeatures: isEnglish ? [
        'Up to 8 GPUs & 2 CPUs',
        'Hot-swappable SSDs and redundant power supply modules',
        'Engineered for rack mounting in professional server environments',
        'Redundant Power supply system up to 4x 2000W hot-swap CRPS modules',
        'Cooling Capacity up to 6.5kW',
        'Optional installation of up to 8 hot swap SSDs (SATA or NVME)',
        'Enterprise-grade reliability and performance',
        'Advanced liquid cooling with quick-disconnect couplings',
        'Remote management with IPMI interface',
        'Comino monitoring system for comprehensive device monitoring'
      ] : [
        '最多8顆GPU與2顆CPU',
        '熱插拔SSD與冗餘電源模組',
        '專業伺服器環境機架安裝設計',
        '備援電源系統，最高4顆2000W熱插拔CRPS模組',
        '散熱能力最高6.5kW',
        '可選配最多8顆熱插拔SSD（SATA或NVME）',
        '企業級可靠性與效能',
        '先進液冷技術配備快速接頭',
        'IPMI介面遠端管理',
        'Comino監控系統，全面設備監控'
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
          description: 'Comino integration kit upgrades any Multi-GPU air-cooled server with a liquid-cooling system, boosting performance up to 30%, lowering facility total power consumption up to 40% and providing the capability to operate in harsh environment up to +40ºC/104ºF with no thermal throttling.'
        },
        {
          title: 'Cooling System Connection',
          description: 'Upgraded server could be connected to Comino InRack Drycooler or to an external cooling system via CDU (Cooling Distribution Unit)'
        },
        {
          title: 'Available Configurations',
          configurations: [
            'DUAL EPYC or XEON / 8x NVIDIA H200 / 2TB RAM / 2TB NVME',
            'DUAL EPYC or XEON / 8x NVIDIA H100 / 2TB RAM / 2TB NVME'
          ]
        }
      ] : [
        {
          title: 'Comino整合套件',
          description: 'Comino整合套件可將任何多GPU氣冷伺服器升級為液冷系統，提升效能最高30%，降低設施總功耗最高40%，並提供在惡劣環境中運行至+40ºC/104ºF而無熱節流的能力。'
        },
        {
          title: '冷卻系統連接',
          description: '升級後的伺服器可連接至Comino InRack乾式冷卻器或透過CDU（冷卻分配單元）連接至外部冷卻系統'
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
        'LIQUID COOLED': 'Comino liquid cooling system unleashes the full performance potential of modern top-tier GPUs and CPUs, allows to prolong lifespan of the hardware and ensures 24/7 operation even in harsh environment with no thermal throttling.',
        'QUICK-DISCONNECT COUPLINGS': 'Quick Disconnect Couplings (Comino TheQ) on each GPU and CPU allows to simplificate maintaining and reduce maintenance time to increase system availability.',
        'REMOTE MANAGEMENT': 'Our servers come equipped with an IPMI interface for seamless remote management. Enjoy features like remote KVM access, OS installation, and comprehensive server monitoring. Ensure peak performance and minimal downtime anytime, anywhere.',
        "COMINO'S MONITORING SYSTEM": "allows to collect cooling system log offline to analyze device usage history, log failure events and to monitor the temperature statistic. WEB based GUI allows to inspect several devices remotely. The monitoring system increases system availability.",
        'REDUNDANT POWER SUPPLY (CRPS)': 'Designed for use in critical IT infrastructure. It provides reliable power for your system without limitation. PSU work at whole spectrum voltage 100-240VAC and 240VDC and provide N+M redundancy.'
      } : {
        '液冷系統': 'Comino液冷系統可釋放現代頂級GPU和CPU的全部效能潛力，延長硬體壽命，確保即使在惡劣環境下也能24/7運行，無熱節流。',
        '快速接頭': '每顆GPU和CPU均配備快速接頭（Comino TheQ），簡化維護並減少維護時間，提升系統可用性。',
        '遠端管理': '我們的伺服器配備IPMI介面，實現無縫遠端管理。享受遠端KVM存取、作業系統安裝和全面伺服器監控等功能。隨時隨地確保峰值效能和最小停機時間。',
        'Comino監控系統': '可離線收集冷卻系統日誌，分析設備使用歷史、記錄故障事件並監控溫度統計。WEB介面可遠端檢查多台設備，提升系統可用性。',
        '備援電源供應器(CRPS)': '專為關鍵IT基礎設施使用而設計。為您的系統提供無限制的可靠電力。電源供應器在100-240VAC和240VDC全頻譜電壓下工作，並提供N+M備援。'
      }
    }
  },
];

export const getCyabraProducts = (isEnglish: boolean): Product[] => [
  {
    id: 10,
    title: isEnglish ? 'Cyabra Platform' : 'Cyabra 平台',
    description: isEnglish
      ? 'Social intelligence platform for profile authenticity, harmful narratives, coordinated activity, sentiment, and real-time risk alerts.'
      : '用於帳號真實性、有害敘事、協調式活動、情緒與即時風險警示的社群情報平台。',
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
        'Brand Protection: Monitor and respond to disinformation campaigns targeting your brand',
        'Crisis Management: Early detection of emerging reputation threats',
        'Campaign Integrity: Ensure political campaigns are not undermined by fake activity',
        'Market Intelligence: Distinguish between authentic consumer trends and artificial manipulation',
        'Public Sector Security: Protect government communications from coordinated misinformation',
        'Event Monitoring: Track conversation authenticity around major corporate announcements'
      ] : [
        '品牌保護：監控並回應針對您品牌的虛假信息活動',
        '危機管理：及早發現新出現的聲譽威脅',
        '活動完整性：確保政治活動不會受到假活動的破壞',
        '市場情報：區分真實消費者趨勢和人工操縱',
        '公共部門安全：保護政府通訊免受協調虛假信息的影響',
        '事件監控：追蹤主要企業公告周圍對話的真實性'
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
