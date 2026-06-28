// 產品型別定義
export interface TechnicalSpecs {
  [key: string]: string;
}

export interface AdditionalFeatures {
  [key: string]: string;
}

export interface ConfigurationSection {
  title: string;
  description?: string;
  configurations?: string[];
}

export interface DetailedDescription {
  title: string;
  formFactor: string;
  introduction: string;
  keyFeatures: string[];
  technicalSpecs: TechnicalSpecs;
  relevantConfigurations?: string[] | ConfigurationSection[];
  additionalFeatures?: AdditionalFeatures;
  applications?: string[];
  orderInfo?: Array<{type: string, pn: string, model: string, description: string}>;
}

export interface ProductImage {
  id: number;
  title: string;
  description: string;
  icon: 'server' | 'cpu' | 'shield' | string; // 恢復為字串類型
  image: string;
  features: string[];
  specs: TechnicalSpecs;
  comingSoon: boolean;
  images: string[];
  detailedDescription: DetailedDescription | null;
}

// 產品資料陣列（僅示範部分，請依實際需求補齊）
export const products = (isEnglish: boolean): ProductImage[] => [
  {
    id: 1,
    title: isEnglish ? 'EudTech Select AI Server' : 'EudTech Select AI伺服器',
    description: isEnglish
      ? 'Enterprise-grade AI server with optimized performance for large language models and AI workloads.'
      : '企業級AI伺服器，為大型語言模型和AI工作負載優化效能。',
    icon: 'server', // 使用字串表示
    image: '/EudTech-Select-server-front.png',
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
    specs: isEnglish
      ? {
          'Processor': 'Dual Intel Xeon Gold 6330 Processors',
          'Memory': 'Up to 1TB DDR5-4800 ECC',
          'Storage': '4x 8TB NVMe SSD',
          'GPU': '8x NVIDIA A100 80GB',
          'Network': 'Dual 100GbE QSFP28',
          'Power': 'Redundant 3200W Power Supply',
          'Cooling': 'Advanced Liquid Cooling System',
          'Form Factor': '6U Rackmount'
        }
      : {
          '處理器': '雙Intel Xeon Gold 6330處理器',
          '記憶體': '最高1TB DDR5-4800 ECC',
          '儲存': '4x 8TB NVMe SSD',
          'GPU': '8x NVIDIA A100 80GB',
          '網路': '雙100GbE QSFP28',
          '電源': '備援3200W電源供應',
          '冷卻系統': '先進液體冷卻系統',
          '機箱規格': '6U 機架式'
        },
    comingSoon: false,
    images: [
      '/EudTech-Select-server-front.png',
      '/EudTech-Select-server-back.png',
      '/EudTech-Select-server-inside.png'
    ],
    detailedDescription: null
  },
  {
    id: 3,
    title: isEnglish ? 'FinSight Financial AI System' : 'FinSight 金融AI系統',
    description: isEnglish
      ? 'A conceptual framework for financial language understanding and data processing.'
      : '金融語言理解和數據處理的概念框架。',
    icon: 'cpu',
    image: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg', // 更新為首頁卡片的圖片
    features: isEnglish
      ? ['Unified API', 'LLM Integration', 'Custom GPT Assistants']
      : ['統一API', 'LLM整合', '自訂GPT助手'],
    specs: isEnglish
      ? {
          'Model': 'LLM + API Wrapper',
          'Data Sources': 'News, statements, market APIs',
          'Integration': 'Webhook + JSON/RESTful API',
          'Deployment': 'SaaS / On-Premises'
        }
      : {
          '模型': 'LLM + API包裝器',
          '數據來源': '新聞、報表、市場API',
          '整合方式': 'Webhook + JSON/RESTful API',
          '部署方式': 'SaaS / 本地部署'
        },
    comingSoon: false,
    images: ['https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg'], // 更新為相關圖片
    detailedDescription: null
  },
  {
    id: 5,
    title: isEnglish ? 'Comino Grando Rackable Workstation' : 'Comino Grando 機架式工作站',
    description: isEnglish
      ? 'Rackmount workstation/server with up to 8 GPUs & 2 CPUs, advanced liquid cooling, modular design, remote management, and redundant power supply.'
      : '機架式工作站/伺服器，支援最高8顆GPU與2顆CPU，具備先進液冷、模組化設計、遠端管理及冗餘電源。',
    icon: 'server',
    image: '/grando-rackable-01.jpg',
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
      'Maximum Cooling Capacity': '6500 W Maximum cooling capacity is ensured @ 20°C intake air T and "performance mode" of the cooling system',
      'Motherboard': 'Up to EATX & EBB',
      'GPUs': 'Rackable Workstation up to 6; NVIDIA: 5090, RTX A6000, RTX 6000 ADA, RTX PRO 6000, A40, L40, L40S, A100, H100, H200; AMD: W7800, W7900',
      'CPUs': 'Up to 2; Single Socket: Intel Xeon W-2400/2500 & 3400/3500, Intel Xeon Scalable 4th Gen, 5th Gen, XEON 6, AMD Threadripper PRO 5000WX, 7000WX, 9000WX, AMD EPYC 9004/9005; Dual Socket: Intel Xeon Scalable 4th Gen & 5th Gen, XEON 6, AMD EPYC 9004/9005',
      'RAM': 'Up to 2TB *',
      'Storage': 'Back panel hot swap cages: up to 4x hot swap SSDs (4x 7mm or 2x 15mm) and up to 4 more (4x 7mm or 2x 15mm) instead of 4th PSU; Internal 3.5" cage up to 4x 3.5’’ or 4x2.5" 15mm or 12x 2.5" 7mm; Internal 2.5" slots: up to 4x 2.5’’ SSD 7mm',
      'Power Supply System': '4x 2000W CRPS modules (Redundancy modes: 4+0, 3+1, 2+2). Power capacity at 180-264V up to 8.0kW, Power capacity at 90-140V up to 4kW'
    } : {
      '最大散熱能力': '6500 W @ 20°C 進氣，效能模式',
      '主機板': '支援EATX與EBB',
      'GPU': '機架式工作站最多6張；NVIDIA: 5090、RTX A6000、RTX 6000 ADA、RTX PRO 6000、A40、L40、L40S、A100、H100、H200；AMD: W7800、W7900',
      'CPU': '最多2顆；單插槽：Intel Xeon W-2400/2500 & 3400/3500、Intel Xeon Scalable 4代、5代、XEON 6、AMD Threadripper PRO 5000WX、7000WX、9000WX、AMD EPYC 9004/9005；雙插槽：Intel Xeon Scalable 4代 & 5代、XEON 6、AMD EPYC 9004/9005',
      '記憶體': '最高2TB *',
      '儲存': '背板熱插拔架：最多4顆熱插拔SSD（4x 7mm或2x 15mm）並可再加4顆（4x 7mm或2x 15mm）取代第4顆電源；內部3.5吋架最多4顆3.5吋或4顆2.5吋15mm或12顆2.5吋7mm；內部2.5吋插槽：最多4顆2.5吋SSD 7mm *',
      '電源系統': '4顆2000W CRPS模組（備援模式：4+0、3+1、2+2）。180-264V電力容量最高8.0kW，90-140V電力容量最高4kW'
    },
    comingSoon: false,
    images: [
      '/grando-rackable-01.jpg',
      '/grando-rackable-02.jpg',
      '/grando-rackable-03.jpg',
      '/grando-rackable-04.jpg',
      '/grando-rackable-05.jpg',
      '/grando-rackable-06.jpg'
    ],
    detailedDescription: {
      title: isEnglish ? 'Comino Grando Rackable Workstation' : 'Comino Grando 機架式工作站',
      formFactor: isEnglish ? '4U Rackmount / Desktop' : '4U機架式 / 桌面型',
      introduction: isEnglish
        ? 'The Comino Grando Rackable Workstation is a versatile high-performance computing solution engineered for demanding AI, machine learning, and scientific computing workloads. With support for up to 8 GPUs and advanced liquid cooling technology, it delivers exceptional performance while maintaining optimal thermal management.'
        : 'Comino Grando 機架式工作站是一款多功能高效能運算解決方案，專為AI、機器學習和科學運算等高需求工作負載而設計。支援最多8顆GPU並配備先進液冷技術，在維持最佳散熱管理的同時提供卓越效能。',
      keyFeatures: isEnglish ? [
        'Up to 8 GPUs & 2 CPUs',
        'Engineered for versatile deployment, whether mounted in a rack or placed on a table',
        'Redundant Power supply system up to 4x 2000W hot-swap CRPS modules',
        '3x Ultra High Flow fans 6200RPM each (high noise level) or 3x 140mm 3000RPM (low noise level)',
        'Cooling Capacity up to 6.5kW',
        'Optional installation of up to 8 hot swap SSDs (SATA or NVME)',
        'Built around liquid cooling for optimal thermal management',
        'Easy maintenance with modular design and Quick Disconnect Couplings',
        'Remote management with IPMI interface',
        'Comino monitoring system for comprehensive device monitoring',
        'Redundant power supply (CRPS) for critical IT infrastructure'
      ] : [
        '最多8顆GPU與2顆CPU',
        '可機架安裝或桌面擺放，彈性部署',
        '備援電源系統，最高4顆2000W熱插拔CRPS模組',
        '3顆超高流量6200RPM風扇（高噪音）或3顆140mm 3000RPM（低噪音）',
        '散熱能力最高6.5kW',
        '可選配最多8顆熱插拔SSD（SATA或NVME）',
        '基於液冷技術打造，實現最佳散熱管理',
        '模組化設計與快速接頭，維護簡易',
        'IPMI介面遠端管理',
        'Comino監控系統，全面設備監控',
        '關鍵IT基礎設施備援電源供應器(CRPS)'
      ],
      technicalSpecs: isEnglish ? {
        'Motherboards': 'Up to EATX & EBB',
        'RAM': 'Up to 2TB *',
        'M2 drives': 'Up to 8x NVME *; Back panel hot swap cages: up to 4x hot swap SSDs (4x 7mm or 2x 15mm) and up to 4 more (4x 7mm or 2x 15mm) instead of 4th PSU; Internal 3.5" cage up to 4x 3.5’’ or 4x2.5" 15mm or 12x 2.5" 7mm; Internal 2.5" slots: up to 4x 2.5’’ SSD 7mm',
        'PSU and operating voltage': 'Up to 4x 2000W CRPS @ 180-264V, Up to 4x 1000W CRPS @ 90-140V, Redundancy modes: 4+0, 3+1, 2+2',
        'Cooling Capacity': '6.5kW',
        'Noise level': '39dB - 70dB',
        'Lan': 'Up to 2x 10 Gbit/s on the MoBo and up to 400Gbit/s in PCIe',
        'OS': 'Ubuntu / Windows 11 (Pro/Home) / Windows Server',
        'Liquid cooling': 'CPU with VRM and GPU with GDDR and VRM',
        'Reservoir': 'Comino custom 450ml with integrated pumps',
        'Fans': '3x Ultra High Flow 6200RPM (high noise level) or 3x High Flow 3000RPM (low noise level)',
        'Installation': '19" rack-mountable or standalone as a Workstation',
        'Required rack space': '4U',
        'Size': '439 x 681 x 177mm (without handles and protruding parts)',
        'Weight': 'Comino Grando Server or Rackable Workstation with 4 GPUs — 49kg (net), 67kg (gross); 6 GPUs — 52kg (net), 70kg (gross); 8 GPUs — 55kg (net), 72kg (gross)',
        'Operating & storage temperature range': 'Storage: -5.50ºC / 23.122ºF; Operating: 3.38ºC / 38.100ºF *'
      } : {
        '主機板': '支援EATX與EBB',
        '記憶體': '最高2TB *',
        'M2硬碟': '最多8顆NVME；背板熱插拔架：最多4顆熱插拔SSD（4x 7mm或2x 15mm）並可再加4顆取代第4顆電源；內部3.5吋架最多4顆3.5吋或4顆2.5吋15mm或12顆2.5吋7mm；內部2.5吋插槽：最多4顆2.5吋SSD 7mm *',
        '電源供應器與工作電壓': '最高4顆2000W CRPS @ 180-264V，最高4顆1000W CRPS @ 90-140V，備援模式：4+0、3+1、2+2',
        '散熱能力': '6.5kW',
        '噪音值': '39dB - 70dB',
        '網路': '主機板最高2x 10Gbit/s，PCIe最高400Gbit/s',
        '作業系統': 'Ubuntu / Windows 11 (Pro/Home) / Windows Server',
        '液體冷卻': 'CPU含VRM與GPU含GDDR和VRM',
        '儲液槽': 'Comino客製450ml含整合幫浦',
        '風扇': '3顆超高流量6200RPM（高噪音）或3顆140mm 3000RPM（低噪音）',
        '安裝方式': '19吋機架安裝或獨立工作站',
        '所需機架空間': '4U',
        '尺寸': '439 x 681 x 177mm（不含把手和突出部分）',
        '重量': 'Comino Grando伺服器或機架式工作站含4顆GPU — 49kg（淨重），67kg（毛重）；6顆GPU — 52kg（淨重），70kg（毛重）；8顆GPU — 55kg（淨重），72kg（毛重）',
        '工作與儲存溫度範圍': '儲存：-5.50ºC / 23.122ºF；工作：3.38ºC / 38.100ºF *'
      },
      relevantConfigurations: isEnglish ? [
        'DUAL EPYC or XEON / 8x NVIDIA H200 / 2TB RAM / 2TB NVME',
        'DUAL EPYC or XEON / 8x NVIDIA H100 / 2TB RAM / 2TB NVME',
        'DUAL EPYC or XEON / 8x NVIDIA RTX PRO 6000 / 2TB RAM / 2TB NVME'
      ] : [
        '雙EPYC或XEON / 8x NVIDIA H200 / 2TB記憶體 / 2TB NVME',
        '雙EPYC或XEON / 8x NVIDIA H100 / 2TB記憶體 / 2TB NVME',
        '雙EPYC或XEON / 8x NVIDIA RTX PRO 6000 / 2TB記憶體 / 2TB NVME'
      ],
      additionalFeatures: isEnglish ? {
        'BUILT AROUND LIQUID COOLED': "Comino's approach in GRANDO cooling design fully eliminates thermal throttling and unleashes the full performance potential of modern top-tier GPUs and CPUs, allows to prolong lifespan of the hardware and ensures stable 24/7 operation even in harsh environment. At the same time increases efficiency & drops PUE by reducing the overall power draw of the system thus improving ROI.",
        'EASY MAINTENANCE': "Modular approach in design and Quick Disconnect Couplings (Comino TheQ) on each GPU and CPU allow to simplicificate maintaining and reduce service time to increase system availability. There is no need in engineer with special skills, GRANDO systems are as easy to maintain as an air-cooled system and are built to provide up to 3 years interservice maintenance period.",
        'REMOTE MANAGEMENT': "GRANDO systems come equipped with an IPMI interface for seamless remote management. Enjoy features like remote KVM access, OS installation, and comprehensive server monitoring. Ensure peak performance and minimal downtime anytime, anywhere.",
        "COMINO'S MONITORING SYSTEM": "allows to collect cooling system log offline to analyze device usage history, log failure events and to monitor the temperature statistic. WEB based GUI allows to inspect several devices remotely. The monitoring system increases system availability.",
        'REDUNDANT POWER SUPPLY (CRPS)': "Designed for use in critical IT infrastructure. It provides reliable power for your system without limitation. PSU work at whole spectrum voltage 100-240VAC and 240VDC and provide N+M redundancy."
      } : {
        '基於液冷技術打造': 'Comino在GRANDO散熱設計上的方法完全消除了熱節流，釋放現代頂級GPU和CPU的全部效能潛力，延長硬體壽命，確保即使在惡劣環境下也能穩定24/7運行。同時通過降低系統整體功耗來提高效率並降低PUE，從而改善投資回報率。',
        '維護簡易': '模組化設計方法和每個GPU及CPU上的快速接頭（Comino TheQ）簡化維護並減少服務時間，提高系統可用性。無需具備特殊技能的工程師，GRANDO系統的維護就像風冷系統一樣簡單，設計可提供長達3年的維護間隔期。',
        '遠端管理': 'GRANDO系統配備IPMI介面，實現無縫遠端管理。享受遠端KVM存取、作業系統安裝和全面伺服器監控等功能。隨時隨地確保峰值效能和最小停機時間。',
        'COMINO監控系統': '允許離線收集冷卻系統日誌以分析設備使用歷史，記錄故障事件並監控溫度統計。基於WEB的GUI允許遠端檢查多個設備。監控系統提高了系統可用性。',
        '備援電源供應器(CRPS)': '專為關鍵IT基礎設施使用而設計。為您的系統提供無限制的可靠電力。電源供應器在100-240VAC和240VDC全頻譜電壓下工作，並提供N+M備援。'
      }
    }
  },
  {
    id: 6,
    title: isEnglish ? 'Comino Grando Desktop Workstation' : 'Comino Grando 桌面工作站',
    description: isEnglish
      ? 'Desktop workstation with up to 6 GPUs & 2 CPUs, advanced liquid cooling, quick-disconnect couplings, remote management, and monitoring system.'
      : '桌面型工作站，支援最高6顆GPU與2顆CPU，具備先進液冷、快速接頭、遠端管理與監控系統。'
    ,
    icon: 'cpu',
    image: '/GRANDO WS TRP_4xA100_01.jpg',
    features: isEnglish ? [
      'Up to 6 GPUs & 2 CPUs',
      'Designed to be used as a desktop or can be put in a rack',
      '3x 140mm fans 3000 RPM (low noise level) or 3x 140mm 5000RPM (medium noise level)',
      'Cooling Capacity up to 2.5kW'
    ] : [
      '最高6顆GPU與2顆CPU',
      '桌面或機架安裝',
      '3顆140mm風扇3000RPM（低噪音）或3顆140mm 5000RPM（中噪音）',
      '散熱能力最高2.5kW'
    ],
    specs: isEnglish ? {
      'Maximum Cooling Capacity': '2500 W Maximum cooling capacity is ensured @ 20C intake air T and "performance mode" of the cooling system',
      'Motherboard': 'Up to EATX & EBB',
      'GPUs': 'Up to 6; NVIDIA: 5090, RTX A6000, RTX 6000 ADA, A40, L40, L40S, A100, H100; AMD: W7800, W7900',
      'Processors': 'Up to 2; Intel: Core i9, Xeon-W 2400, 3400, Xeon Scalable 4th & 5th Gen; AMD: Ryzen 7000, Threadripper PRO 5000WX, 7000WX, EPYC 7003, 9004',
      'RAM': 'Up to 2TB *',
      'Storage': 'Up to 2x 3.5’’ HDD, up to 6x 2.5’’ SSD',
      'Power Supply System': 'Up to 3x SFX-L 1000W, up to 3kW'
    } : {
      '最大冷卻能力': '2500 W 在20°C進氣溫度與冷卻系統"效能模式"下確保最大冷卻能力',
      '主機板': '最高支援EATX與EBB',
      'GPU': '最多6張；NVIDIA:5090、RTX A6000、RTX 6000 ADA、A40、L40、L40S、A100、H100；AMD: W7800、W7900',
      '處理器': '最多2顆；Intel: Core i9、Xeon-W 2400、3400、Xeon Scalable 4th & 5th Gen；AMD: Ryzen 7000、Threadripper PRO 5000WX、7000WX、EPYC 7003、9004',
      '記憶體': '最高2TB *',
      '儲存': '最多2顆3.5吋HDD；最多6顆2.5吋SSD',
      '電源系統': '最多3顆SFX-L 1000W，總功率最高3kW'
    },
    comingSoon: false,
    images: [
      '/GRANDO WS TRP_4xA100_01.jpg',
      '/GRANDO WS TRP_4xA100_02.jpg',
      '/GRANDO WS TRP_4xA100_03.jpg',
      '/GRANDO WS TRP_4xA100_04.jpg',
      '/GRANDO WS TRP_4xA100_05.jpg',
      '/GRANDO WS TRP_4xA100_06.jpg',
      '/GRANDO WS TRP_4xA100_07.jpg',
      '/GRANDO WS TRP_4xA100_08.jpg',
      '/GRANDO WS TRP_4xA100_09.jpg',
      '/GRANDO WS TRP_4xA100_10.jpg'
    ],
    detailedDescription: {
      title: isEnglish ? 'Comino Grando Desktop Workstation' : 'Comino Grando 桌面工作站',
      formFactor: isEnglish ? 'Desktop / Rackmount' : '桌面型 / 機架式',
      introduction: isEnglish
        ? 'Desktop workstation with up to 6 GPUs & 2 CPUs, advanced liquid cooling, quick-disconnect couplings, remote management, and monitoring system.'
        : '桌面型工作站，支援最高6顆GPU與2顆CPU，具備先進液冷、快速接頭、遠端管理與監控系統。',
      keyFeatures: isEnglish ? [
        'Up to 6 GPUs & 2 CPUs',
        'Designed to be used as a desktop or can be put in a rack',
        '3x 140mm fans 3000 RPM (low noise level) or 3x 140mm 5000RPM (medium noise level)',
        'Cooling Capacity up to 2.5kW'
      ] : [
        '最高6顆GPU與2顆CPU',
        '桌面或機架安裝',
        '3顆140mm風扇3000RPM（低噪音）或3顆140mm 5000RPM（中噪音）',
        '散熱能力最高2.5kW'
      ],
      technicalSpecs: isEnglish ? {
        'Motherboards': 'Up to EATX & EBB',
        'RAM': 'Up to 2TB *',
        'M2 drives': 'Up to 8x NVME; Internal 3.5" cage up to 2x 3.5" or 2x 2.5" 15mm or 4x 2.5" 7mm; Internal 2.5" slots: up to 6x 2.5" SSD 7mm',
        'PSU and operating voltage': 'Up to 3x 1000W SFX-L @ 110/220V',
        'Cooling Capacity': '2.5kW',
        'Noise level': '39dB - 50dB',
        'Lan': 'Up to 2x 10 Gbit/s on the MoBo and up to 400Gbit/s in PCIe',
        'OS': 'Ubuntu / Win10 (Pro/Home) / Windows Server',
        'Liquid cooling': 'CPU with VRM and GPU with GDDR and VRM',
        'Reservoir': 'Comino custom 450ml with integrated pumps',
        'Pumps': '2x Laing DDC 20W',
        'Radiators': '1x 120x360mm core',
        'Fans': '3x Low Noise 140mm 3000RPM (low noise level) or 3x High Flow 140mm 5000RPM (medium noise level)',
        'Installation': 'Desktop as a Workstation or 19" rack-mountable',
        'Required rack space': '4U',
        'Size': '439 x 681 x 177mm (without handles and protruding parts)',
        'Weight': 'Comino Grando Workstation with 4 GPUs — 45kg (net), 72kg (gross)',
        'Operating & storage temperature range': 'Storage: -5.50ºC / 23.122ºF; Operating: 3.38ºC / 38.100ºF *'
      } : {
        '主機板': '最高支援EATX與EBB',
        '記憶體': '最高2TB *',
        'M2硬碟': '最多8顆NVME；內部3.5吋架最多2顆3.5吋或2顆2.5吋15mm或4顆2.5吋7mm；內部2.5吋插槽最多6顆2.5吋SSD 7mm',
        '電源與電壓': '最多3顆1000W SFX-L，支援110/220V',
        '冷卻能力': '2.5kW',
        '噪音值': '39dB - 50dB',
        '網路': '主機板最高2x 10Gbit/s，PCIe最高400Gbit/s',
        '作業系統': 'Ubuntu / Win10 (Pro/Home) / Windows Server',
        '液冷範圍': 'CPU含VRM、GPU含GDDR與VRM',
        '水箱': 'Comino客製450ml整合式水箱',
        '幫浦': '2x Laing DDC 20W',
        '散熱排': '1x 120x360mm核心',
        '風扇': '3顆低噪音140mm 3000RPM（低噪音）或3顆高流量140mm 5000RPM（中噪音）',
        '安裝方式': '桌上型工作站或19吋機架安裝',
        '機架空間': '4U',
        '尺寸': '439 x 681 x 177mm（不含把手與突出部件）',
        '重量': '4顆GPU時45kg（淨重），72kg（毛重）',
        '操作與儲存溫度範圍': '儲存：-5.50ºC / 23.122ºF；操作：3.38ºC / 38.100ºF *'
      },
      additionalFeatures: isEnglish ? {
        'LIQUID COOLED': 'Comino liquid cooling system unleashes the full performance potential of modern top-tier GPUs and CPUs, allows to prolong lifespan of the hardware and ensures silent or low noise 24/7 operation even in harsh environment with no thermal throttling.',
        'QUICK-DISCONNECT COUPLINGS': 'Quick Disconnect Couplings (Comino TheQ) on each GPU and CPU allows availability.',
        'REMOTE MANAGMENT': 'BMC chip to provide intelligence for its IPMI architecture for out-of-band management to enhance hardware-level control for improved IT efficiency.',
        "COMINO'S MONITORING SYSTEM": "allows to collect cooling system log offline to analyze device usage history, log failure events and to monitor the temperature statistic. WEB based GUI allows to inspect several devices remotely. The monitoring system increases system availability."
      } : {
        '液冷系統': 'Comino液冷系統可釋放現代頂級GPU和CPU的全部效能潛力，延長硬體壽命，確保即使在惡劣環境下也能靜音或低噪音24/7運行，無熱節流。',
        '快速接頭': '每顆GPU和CPU均配備快速接頭（Comino TheQ），提升可維護性。',
        '遠端管理': 'BMC晶片與IPMI架構，支援帶外管理，提升IT效率與硬體層級控制。',
        'Comino監控系統': '可離線收集冷卻系統日誌，分析設備使用歷史、記錄故障事件並監控溫度統計。WEB介面可遠端檢查多台設備，提升系統可用性。'
      }
    }
  },
  {
    id: 7,
    title: isEnglish ? 'Comino Grando Server' : 'Comino Grando 伺服器',
    description: isEnglish
      ? 'High-performance server with up to 8 GPUs & 2 CPUs, liquid cooling, redundant power supply, and rack/desktop versatility.'
      : '高效能伺服器，支援最高8顆GPU與2顆CPU，具備液冷、冗餘電源及機架/桌面多元安裝。',
    icon: 'server',
    image: '/GRANDO_RM-M-CRPS_9004_8xGPU_01.jpg',
    features: isEnglish ? [
      'Up to 8 GPUs & 2 CPUs',
      'Engineered for versatile deployment, whether mounted in a rack or placed on a table',
      'Redundant Power supply system up to 4x 1600W hot-swap CRPS modules',
      '3x Ultra High Flow fans 6200RPM each (high noise level) or 3x 140mm 5000RPM (medium noise level)',
      'Cooling Capacity up to 4.5kW',
      'Optional installation of up to 8 hot swap SSDs (SATA or NVME)'
    ] : [
      '最多8顆GPU與2顆CPU',
      '可機架安裝或桌面擺放，彈性部署',
      '備援電源系統，最高4顆1600W熱插拔CRPS模組',
      '3顆超高流量6200RPM風扇（高噪音）或3顆140mm 5000RPM（中噪音）',
      '散熱能力最高4.5kW',
      '可選配最多8顆熱插拔SSD（SATA或NVME）'
    ],
    specs: isEnglish ? {
      'Maximum Cooling Capacity': '4500 W @ 20°C intake air, performance mode',
      'Motherboard': 'Up to EATX & EBB',
      'GPUs': 'Up to 8; RTX A6000, RTX 6000 ADA, A40, L40, L40S, A100, H100, H200; AMD: W7800, W7900',
      'CPUs': 'Up to 2; Single: • Intel: Xeon W-2400/2500 & 3400/3500, • Xeon Scalable 4th & 5th Gen, XEON 6 • AMD: Threadripper PRO 5000WX, 7000WX, EPYC 9004/9005 Dual: • Intel: Xeon Scalable 4th & 5th Gen, XEON 6 • AMD: EPYC 9004/9005',
      'RAM': 'Up to 2TB *',
      'Storage': 'Back panel hot swap cages: up to 4x hot swap SSDs (4x 7mm or 2x 15mm) and up to 4 more instead of 4th PSU; Internal 3.5" cage up to 4x 3.5" or 4x 2.5" 15mm or 12x 2.5" 7mm; Internal 2.5" slots: up to 4x 2.5" SSD 7mm',
      'Power Supply System': '4x 1600W CRPS modules (Redundancy modes: 4+0, 3+1, 2+2). Power capacity at 180-264V up to 6.4kW Power capacity at 90-140V up to 4kW'
    } : {
      '最大冷卻能力': '4500 W 在20°C進氣溫度與冷卻系統"效能模式"下確保最大冷卻能力',
      '主機板': '最高支援EATX與EBB',
      'GPU': '最多8張；RTX A6000、RTX 6000 ADA、A40、L40、L40S、A100、H100、H200；AMD: W7800、W7900',
      'CPU': '最多2顆；單插槽：Intel Xeon W-2400/2500 & 3400/3500、Intel Xeon Scalable 4代、5代、XEON 6、AMD Threadripper PRO 5000WX、7000WX、9000WX、AMD EPYC 9004/9005；雙插槽：Intel Xeon Scalable 4代 & 5代、XEON 6、AMD EPYC 9004/9005',
      '記憶體': '最高2TB *',
      '儲存': '背板熱插拔架：最多4顆熱插拔SSD（4x 7mm或2x 15mm）並可再加4顆取代第4顆電源；內部3.5吋架最多4顆3.5吋或4顆2.5吋15mm或12顆2.5吋7mm；內部2.5吋插槽：最多4顆2.5吋SSD 7mm',
      '電源系統': '4顆1600W CRPS模組（備援模式：4+0、3+1、2+2）。180-264V電力容量最高6.4kW，90-140V電力容量最高4kW'
    },
    comingSoon: false,
    images: [
      '/GRANDO_RM-M-CRPS_9004_8xGPU_01.jpg',
      '/GRANDO_RM-M-CRPS_9004_8xGPU_02.jpg',
      '/GRANDO_RM-M-CRPS_9004_8xGPU_03.jpg',
      '/GRANDO_RM-M-CRPS_9004_8xGPU_04.jpg',
      '/GRANDO_RM-M-CRPS_9004_8xGPU_05.jpg',
      '/GRANDO_RM-M-CRPS_9004_8xGPU_06.jpg',
      '/GRANDO_RM-M-CRPS_9004_8xGPU_07.jpg',
      '/GRANDO_RM-M-CRPS_9004_8xGPU_08.jpg',
      '/GRANDO_RM-M-CRPS_9004_8xGPU_09.jpg',
      '/GRANDO_RM-M-CRPS_9004_8xGPU_10.jpg'
    ],
    detailedDescription: {
      title: isEnglish ? 'Comino Grando Server' : 'Comino Grando 伺服器',
      formFactor: isEnglish ? '4U Rackmount / Desktop' : '4U機架式 / 桌面型',
      introduction: isEnglish
        ? 'The Comino Grando Server is a high-performance computing solution designed for enterprise AI, machine learning, and data center applications. Featuring up to 8 GPUs and advanced liquid cooling technology, it delivers exceptional performance with redundant power supply for mission-critical workloads.'
        : 'Comino Grando 伺服器是一款專為企業AI、機器學習和資料中心應用設計的高效能運算解決方案。配備最多8顆GPU和先進液冷技術，為關鍵任務工作負載提供卓越效能和冗餘電源。',
      keyFeatures: isEnglish ? [
        'Up to 8 GPUs & 2 CPUs',
        'Engineered for versatile deployment, whether mounted in a rack or placed on a table',
        'Redundant Power supply system up to 4x 1600W hot-swap CRPS modules (Redundancy modes: 4+0, 3+1, 2+2)',
        '3x Ultra High Flow fans 6200RPM each (high noise level) or 3x 140mm 5000RPM (medium noise level)',
        'Cooling Capacity up to 4.5kW',
        'Optional installation of up to 8 hot swap SSDs (SATA or NVME)',
        'Built around liquid cooling for optimal thermal management',
        'Easy maintenance with modular design and Quick Disconnect Couplings',
        'Remote management with IPMI interface',
        'Comino monitoring system for comprehensive device monitoring',
        'Redundant power supply (CRPS) for critical IT infrastructure'
      ] : [
        '最多8顆GPU與2顆CPU',
        '可機架安裝或桌面擺放，彈性部署',
        '備援電源系統，最高4顆1600W熱插拔CRPS模組（備援模式：4+0、3+1、2+2）',
        '3顆超高流量6200RPM風扇（高噪音）或3顆140mm 5000RPM（中噪音）',
        '散熱能力最高4.5kW',
        '可選配最多8顆熱插拔SSD（SATA或NVME）',
        '基於液冷技術打造，實現最佳散熱管理',
        '模組化設計與快速接頭，維護簡易',
        'IPMI介面遠端管理',
        'Comino監控系統，全面設備監控',
        '關鍵IT基礎設施備援電源供應器(CRPS)'
      ],
      technicalSpecs: isEnglish ? {
        'Motherboards': 'Up to EATX & EBB',
        'RAM': 'Up to 2TB *',
        'M2 drives': 'Up to 8x NVME; Back panel hot swap cages: up to 4x hot swap SSDs (4x 7mm or 2x 15mm) and up to 4 more instead of 4th PSU; Internal 3.5" cage up to 4x 3.5" or 4x 2.5" 15mm or 12x 2.5" 7mm; Internal 2.5" slots: up to 4x 2.5" SSD 7mm',
        'PSU and operating voltage': 'Up to 4x 1600W CRPS @ 180-264V; Up to 4x 1000W CRPS @ 90-140V; Redundancy modes: 4+0, 3+1, 2+2',
        'Cooling Capacity': '4.5kW',
        'Noise level': '39dB - 70dB',
        'Lan': 'Up to 2x 10 Gbit/s on the MoBo and up to 400Gbit/s in PCIe',
        'OS': 'Ubuntu / Windows 11 (Pro/Home) / Windows Server',
        'Liquid cooling': 'CPU with VRM and GPU with GDDR and VRM',
        'Reservoir': 'Comino custom 450ml with integrated pumps',
        'Pumps': '2x Laing DDC 20W',
        'Radiators': '1x120x360mm core',
        'Fans': '3x Ultra High Flow 140mm 6200RPM (high noise level) or 3x High Flow 140mm 5000RPM (medium noise level)',
        'Installation': '19" rack-mountable or standalone as a Workstation',
        'Required rack space': '4U',
        'Size': '439 x 681 x 177mm (without handles and protruding parts)',
        'Weight': 'Comino Grando Server with 4x CRPS and 4 GPUs — 49kg (net), 67kg (gross); 4x CRPS and 6 GPUs — 52kg (net), 70kg (gross); 4x CRPS and 8 GPUs — 55kg (net), 72kg (gross)',
        'Operating & storage temperature range': 'Storage: -5.50ºC / 23.122ºF; Operating: 3.38ºC / 38.100ºF *'
      } : {
        '主機板': '最高支援EATX與EBB',
        '記憶體': '最高2TB *',
        'M2硬碟': '最多8顆NVME；背板熱插拔架：最多4顆熱插拔SSD（4x 7mm或2x 15mm）並可再加4顆取代第4顆電源；內部3.5吋架最多4顆3.5吋或4顆2.5吋15mm或12顆2.5吋7mm；內部2.5吋插槽：最多4顆2.5吋SSD 7mm',
        '電源與電壓': '最多4顆1600W CRPS，支援180-264V；最多4顆1000W CRPS，支援90-140V；備援模式：4+0、3+1、2+2',
        '冷卻能力': '4.5kW',
        '噪音值': '39dB - 70dB',
        '網路': '主機板最高2x 10Gbit/s，PCIe最高400Gbit/s',
        '作業系統': 'Ubuntu / Windows 11 (Pro/Home) / Windows Server',
        '液冷範圍': 'CPU含VRM、GPU含GDDR與VRM',
        '水箱': 'Comino客製450ml整合式水箱',
        '幫浦': '2x Laing DDC 20W',
        '散熱排': '1x120x360mm核心',
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
  // ...其餘產品請依同樣格式補齊...
];
