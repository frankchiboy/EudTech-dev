import React from 'react';
import { Server, Cloud, Shield, Cpu, Monitor } from 'lucide-react';
import { Product } from './models/Product';

export const getEudTechProducts = (isEnglish: boolean): Product[] => [
  {
    id: 3,
    title: isEnglish ? 'FinSight Financial AI System' : 'FinSight 金融AI系統',
    description: isEnglish
      ? 'FinSight: Financial language understanding and data API framework. Combine raw data with LLMs for real-time, flexible insights and decision support.'
      : 'FinSight 金融語言理解與資料API架構，結合原始數據與LLM，提供即時彈性洞察與決策輔助。',
    icon: React.createElement(Shield, { className: "h-8 w-8 text-blue-800" }),
    image: "/financial-ai-system.jpg",
    features: isEnglish
      ? [
          'FinSight-API: Unified financial data API',
          'RESTful API, SaaS or on-premises',
          'FinSight GTP: LLM demo system',
          'LLM tasks: explain indicators, predict trends',
          'Highly extensible architecture',
          'Enterprise consulting & custom GPT'
        ]
      : [
          'FinSight-API 金融資料整合API',
          'RESTful API，SaaS雲端或本地端',
          'FinSight GTP 語言模型互動展示',
          'LLM可執行 指標解釋、趨勢預測',
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
    image: "/EudTech-Select-server-front.png.png",
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
      ? 'Hyper Performance Multi-GPU solution for the most advanced and resource intensive computational tasks.'
      : '針對最先進和資源密集型計算任務的超高效能多GPU解決方案。',
    icon: React.createElement(Server, { className: "h-8 w-8 text-purple-700" }),
    image: "/grando-8gpu-server.jpg",
    features: isEnglish ? [
          'Best Multi-GPU performance for specialists',
          'Easy configurable & maintainable hardware',
          'Silent & Reliable 24/7 operation up to 38°C'
        ] : [
          '為專家提供最佳多GPU效能',
          '易於配置和維護的硬體',
          '靜音可靠24/7運作至38°C'
        ],
    specs: isEnglish ? {
      'GPU': 'Up to 8x RTX 4090/A100',
      'CPU': 'Dual AMD EPYC',
      'Memory': 'Up to 2TB DDR5',
      'Storage': 'Up to 32TB NVMe',
      'Power': 'Up to 5.5kW',
      'Cooling': 'Liquid Cooling System'
    } : {
      'GPU': '最高8個RTX 4090/A100',
      'CPU': '雙AMD EPYC',
      '記憶體': '最高2TB DDR5',
      '儲存': '最高32TB NVMe',
      '功率': '最高5.5kW',
      '散熱': '液冷系統'
    },
    comingSoon: false
  },
  {
    id: 6,
    title: isEnglish ? 'Comino Grando Workstation' : 'Comino Grando 工作站',
    description: isEnglish
      ? 'Silent desktop workstation for deep learning research and development.'
      : '用於深度學習研究和開發的靜音桌面工作站。',
    icon: React.createElement(Monitor, { className: "h-8 w-8 text-indigo-700" }),
    image: "/grando-workstation-closed.png",
    features: isEnglish
      ? [
          'Up to 6x RTX 5090/A100 GPUs',
          'Whisper-quiet operation',
          'Compact desktop design',
          'AMD Threadripper PRO',
          'Up to 2TB DDR5',
          'Comino liquid cooling system'
        ]
      : [
          '最高6個RTX 5090/A100 GPU',
          '超靜音運作',
          '緊湊桌面設計',
          'AMD Threadripper PRO',
          '最高2TB DDR5',
          'Comino液冷系統'
        ],
    specs: isEnglish ? {
      'GPU': 'Up to 6x RTX 5090/A100',
      'CPU': 'AMD Threadripper PRO',
      'Memory': 'Up to 2TB DDR5',
      'Storage': 'Up to 8TB NVMe',
      'Form Factor': 'Desktop Tower',
      'Cooling': 'Liquid Cooling System'
    } : {
      'GPU': '最高6個RTX 5090/A100',
      'CPU': 'AMD Threadripper PRO',
      '記憶體': '最高2TB DDR5',
      '儲存': '最高8TB NVMe',
      '機箱規格': '桌面塔式',
      '散熱': '液冷系統'
    },
    comingSoon: false
  }
];