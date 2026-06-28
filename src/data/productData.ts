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
    title: isEnglish ? 'Comino Grando Desktop Workstation' : 'Comino Grando 桌面工作站',
    description: isEnglish
      ? 'Desktop workstation with up to 6 GPUs & 2 CPUs, advanced liquid cooling, quick-disconnect couplings, remote management, and monitoring system.'
      : '桌面型工作站，支援最高6顆GPU與2顆CPU，具備先進液冷、快速接頭、遠端管理與監控系統。',
    icon: React.createElement(Monitor, { className: "h-8 w-8 text-indigo-700" }),
    image: "/GRANDO WS TRP_4xA100_01.jpg",
    features: isEnglish ? [
      'Up to 6 GPUs & 2 CPUs',
      'Designed to be used as a desktop or can be put in a rack',
      '3x 140mm fans 3000 RPM (low noise level) or 3x 140mm 5000RPM (medium noise level)',
      'Cooling Capacity up to 2.5kW',
      'Quick Disconnect Couplings (Comino TheQ) on each GPU and CPU',
      'Remote management: BMC chip, IPMI architecture',
      'Comino monitoring system: cooling log, failure events, temperature statistics, web GUI'
    ] : [
      '最高6顆GPU與2顆CPU',
      '桌面或機架安裝',
      '3顆140mm風扇3000RPM（低噪音）或3顆140mm 5000RPM（中噪音）',
      '散熱能力最高2.5kW',
      '快速接頭（Comino TheQ）於每顆GPU與CPU',
      '遠端管理：BMC晶片、IPMI架構',
      'Comino監控系統：冷卻日誌、故障事件、溫度統計、Web介面'
    ],
    specs: isEnglish ? {
      'Maximum Cooling Capacity': '2500 W @ 20°C intake air, performance mode',
      'Motherboard': 'Up to EATX & EBB',
      'GPUs': 'Up to 6; NVIDIA: 5090, RTX A6000, RTX 6000 ADA, A40, L40, L40S, A100, H100; AMD: W7800, W7900',
      'Processors': 'Up to 2; Intel: Core i9, Xeon-W 2400, 3400, Xeon Scalable 4th & 5th Gen; AMD: Ryzen 7000, Threadripper PRO 5000WX, 7000WX, EPYC 7003, 9004',
      'RAM': 'Up to 2TB *',
      'Storage': 'Up to 2x 3.5’’ HDD, up to 6x 2.5’’ SSD',
      'Power Supply System': 'Up to 3x SFX-L 1000W, up to 3kW',
      'Noise Level': '39dB - 50dB',
      'Lan': 'Up to 2x 10GbE on motherboard, up to 400GbE in PCIe',
      'OS': 'Ubuntu / Win10 (Pro/Home) / Windows Server',
      'Liquid Cooling': 'CPU with VRM, GPU with GDDR and VRM',
      'Reservoir': 'Comino custom 450ml with integrated pumps',
      'Pumps': '2x Laing DDC 20W',
      'Radiators': '1x 120x360mm core',
      'Fans': '3x Low Noise 140mm 3000RPM (low noise) or 3x High Flow 140mm 5000RPM (medium noise)',
      'Installation': 'Desktop as a Workstation or 19’’ rack-mountable',
      'Required rack space': '4U',
      'Size': '439 x 681 x 177mm (without handles and protruding parts)',
      'Weight': '4 GPUs: 45kg (net), 72kg (gross)',
      'Operating & storage temperature range': 'Storage: -5.5°C / 23.1°F; Operating: 3.4°C / 38.1°C *'
    } : {
      '最大冷卻能力': '2500 W @ 20°C進氣，性能模式',
      '主機板': '支援EATX & EBB',
      'GPU': '最高6顆；NVIDIA: 5090, RTX A6000, RTX 6000 ADA, A40, L40, L40S, A100, H100；AMD: W7800, W7900',
      '處理器': '最高2顆；Intel: Core i9, Xeon-W 2400, 3400, Xeon Scalable 4/5代；AMD: Ryzen 7000, Threadripper PRO 5000WX, 7000WX, EPYC 7003, 9004',
      '記憶體': '最高2TB *',
      '儲存': '最高2顆3.5吋HDD，最高6顆2.5吋SSD',
      '電源系統': '最高3顆SFX-L 1000W，最高3kW',
      '噪音': '39dB - 50dB',
      '網路': '主機板最高2x 10GbE，PCIe最高400GbE',
      '作業系統': 'Ubuntu / Win10 (Pro/Home) / Windows Server',
      '液冷': 'CPU含VRM，GPU含GDDR與VRM',
      '水箱': 'Comino客製450ml含整合式幫浦',
      '幫浦': '2x Laing DDC 20W',
      '散熱排': '1x 120x360mm核心',
      '風扇': '3顆低噪音140mm 3000RPM或3顆高流量140mm 5000RPM',
      '安裝方式': '桌面型工作站或19吋機架',
      '機架空間': '4U',
      '尺寸': '439 x 681 x 177mm（不含把手及突出部件）',
      '重量': '4顆GPU時45kg（淨重），72kg（毛重）',
      '操作與儲存溫度範圍': '儲存：-5.5°C / 23.1°F；操作：3.4°C / 38.1°C *'
    },
    comingSoon: false,
    detailedDescription: {
      title: isEnglish ? 'Comino Grando Desktop Workstation' : 'Comino Grando 桌面工作站',
      formFactor: isEnglish ? 'Desktop / Rack Convertible' : '桌面 / 機架可轉換',
      introduction: isEnglish ? 'Liquid-cooled desktop workstation with up to 6 GPUs designed for quiet high-performance AI and simulation workloads.' : '液冷桌面工作站，支援最多6顆GPU，為安靜高效能AI與模擬工作負載而設計。',
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
      ? 'Advanced AI-driven disinformation detection platform to protect brands, organizations, and campaigns from fake profiles and harmful narratives.'
      : '先進的AI驅動假資訊偵測平台，保護品牌、組織和活動免受假帳號和有害敘事的影響。',
    icon: React.createElement(Shield, { className: "h-8 w-8 text-[#003daa]" }),
    image: "/cyabra-dashboard.jpg",
    features: isEnglish
      ? [
          'AI-powered fake profile detection',
          'Harmful narrative identification',
          'Brand reputation monitoring',
          'Cross-platform social media analysis',
          'Real-time alerts and notifications',
          'Custom dashboard and reports'
        ]
      : [
          'AI驅動的假帳號檢測',
          '有害敘事識別',
          '品牌聲譽監控',
          '跨平台社交媒體分析',
          '實時警報和通知',
          '自定義儀表板和報告'
        ],
    specs: isEnglish ? {
      'Platforms Covered': 'Twitter/X, Facebook, Instagram, TikTok, YouTube, Reddit, Telegram',
      'Detection Accuracy': '89% for fake profiles',
      'Alert Response Time': 'Under 5 minutes for critical threats',
      'API Integration': 'REST API, Webhook support',
      'Report Formats': 'PDF, CSV, API endpoint',
      'Deployment': 'SaaS / Private Cloud'
    } : {
      '覆蓋平台': 'Twitter/X, Facebook, Instagram, TikTok, YouTube, Reddit, Telegram',
      '檢測準確率': '假帳號檢測89%',
      '警報響應時間': '重大威脅不到5分鐘',
      'API整合': 'REST API, Webhook支援',
      '報告格式': 'PDF, CSV, API端點',
      '部署方式': 'SaaS / 私有雲'
    },
    comingSoon: false,
    detailedDescription: {
      title: isEnglish ? 'Cyabra Platform' : 'Cyabra 平台',
      formFactor: isEnglish ? 'Software as a Service' : '軟體即服務',
      introduction: isEnglish
        ? 'Cyabra is an advanced disinformation detection platform that uses artificial intelligence to identify fake accounts, harmful narratives, and coordinated inauthentic behavior across social media. The platform provides organizations with real-time monitoring and alerts to protect brand reputation and ensure authentic online conversations.'
        : 'Cyabra是一個先進的虛假信息檢測平台，使用人工智能來識別社交媒體上的假帳號、有害敘事和協調不真實行為。該平台為組織提供實時監控和警報，以保護品牌聲譽並確保在線對話的真實性。',
      keyFeatures: isEnglish ? [
        'Fake Profile Detection: AI algorithms identify inauthentic accounts with 89% accuracy',
        'Narrative Analysis: Track and analyze harmful narratives targeting your brand',
        'Cross-Platform Monitoring: Cover all major social networks in a single dashboard',
        'Real-time Alerts: Receive notifications about potential reputation threats',
        'Coordination Detection: Identify coordinated inauthentic behavior campaigns',
        'Trend Analysis: Separate authentic trends from artificial manipulation',
        'Customizable Reporting: Generate detailed reports for stakeholders',
        'API Integration: Connect with existing communication monitoring tools'
      ] : [
        '假帳號檢測：AI算法以89%的準確率識別不真實帳號',
        '敘事分析：追蹤和分析針對您品牌的有害敘事',
        '跨平台監控：在單一儀表板上涵蓋所有主要社交網絡',
        '實時警報：接收有關潛在聲譽威脅的通知',
        '協調檢測：識別協調不真實行為活動',
        '趨勢分析：將真實趨勢與人工操縱區分開來',
        '自定義報告：為利益相關者生成詳細報告',
        'API整合：與現有通訊監控工具連接'
      ],
      technicalSpecs: isEnglish ? {
        'Supported Platforms': 'Twitter/X, Facebook, Instagram, TikTok, YouTube, Reddit, Telegram, LinkedIn',
        'API Access': 'RESTful API with OAuth 2.0',
        'Data Processing': 'Real-time and historical data analysis',
        'AI Models': 'Proprietary ML models for authenticity scoring',
        'Deployment Options': 'Cloud SaaS or private cloud installation',
        'Security': 'SOC 2 Type II compliant, GDPR ready',
        'Data Retention': 'Configurable from 30 days to 2 years',
        'Alert Delivery': 'Email, SMS, webhook, in-app notifications'
      } : {
        '支援平台': 'Twitter/X, Facebook, Instagram, TikTok, YouTube, Reddit, Telegram, LinkedIn',
        'API存取': 'RESTful API與OAuth 2.0',
        '數據處理': '實時和歷史數據分析',
        'AI模型': '專有ML模型進行真實性評分',
        '部署選項': '雲SaaS或私有雲安裝',
        '安全性': 'SOC 2 Type II合規，GDPR就緒',
        '數據保留': '可配置從30天到2年',
        '警報傳送': '電子郵件，簡訊，webhook，應用內通知'
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
    title: isEnglish ? 'Cyabra Enterprise' : 'Cyabra 企業版',
    description: isEnglish
      ? 'Complete disinformation protection suite with dedicated analyst support, custom integration, and 24/7 monitoring for large organizations and government agencies.'
      : '完整的虛假信息保護套件，具有專業分析師支援、客製化整合和24/7監控，適合大型組織和政府機構。',
    icon: React.createElement(Shield, { className: "h-8 w-8 text-[#003daa]" }),
    image: "/cyabra-dashboard.svg",
    features: isEnglish
      ? [
          'Dedicated security analysts',
          'Custom AI model training',
          'Private cloud deployment option',
          'Advanced threat intelligence',
          'Crisis management support',
          'Executive-level reporting',
          'API integration with security systems'
        ]
      : [
          '專屬安全分析師',
          '客製化AI模型訓練',
          '私有雲部署選項',
          '進階威脅情報',
          '危機管理支援',
          '執行層級報告',
          '與安全系統的API整合'
        ],
    specs: isEnglish ? {
      'Service Level': '99.9% uptime guarantee',
      'Support Response': '15-minute critical response time',
      'Analyst Hours': '40 hours per month included',
      'Custom Integration': 'Full API access and custom development',
      'Security Clearance': 'Available for government contracts',
      'Training Sessions': '4 sessions per quarter included',
      'Threat Reports': 'Weekly executive summaries'
    } : {
      '服務水平': '99.9%運行時間保證',
      '支援響應': '15分鐘關鍵響應時間',
      '分析師時數': '每月包含40小時',
      '客製整合': '完整API訪問和定制開發',
      '安全許可': '可用於政府合約',
      '培訓課程': '每季度包含4次課程',
      '威脅報告': '每週執行摘要'
    },
    comingSoon: false,
    detailedDescription: {
      title: isEnglish ? 'Cyabra Enterprise' : 'Cyabra 企業版',
      formFactor: isEnglish ? 'Enterprise SaaS Suite' : '企業級SaaS套件',
      introduction: isEnglish ? 'Enterprise disinformation defense suite with analyst support and private deployment options.' : '企業級虛假資訊防護套件，含分析師支援與私有部署選項。',
      keyFeatures: [],
      technicalSpecs: {},
    }
  }
];
