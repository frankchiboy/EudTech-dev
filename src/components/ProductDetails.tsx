import React, { useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Server, Cpu, Shield } from 'lucide-react';
import { useLanguageContext } from '../contexts/LanguageContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { handleNavClick } from '../utils/helpers/navigation';
import NavBar from './navigation/NavBar';
import Footer from './Footer';

const ProductDetails: React.FC = () => {
  const { isEnglish, setLanguage } = useLanguageContext();
  const { themeMode, isDarkModeActive, toggleDarkMode } = useThemeContext();
  const { isEnglish, toggleLanguage } = useLanguageContext();

  const { id } = useParams();
  const location = useLocation();
  
  // 取得來源區塊資訊，預設為 eudtech-products
  const fromSection = location.state?.fromSection || 'eudtech-products';
  
  const products = [
    {
      id: 1, 
      title: isEnglish ? 'EudTech Select AI Server' : 'EudTech Select AI伺服器',
      description: isEnglish
        ? 'Enterprise-grade AI server with optimized performance for large language models and AI workloads.'
        : '企業級AI伺服器，為大型語言模型和AI工作負載優化效能。',
      icon: <Server className="h-8 w-8 text-blue-800" />, 
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
        'Network': 'Dual 100GbE QSFP28',
        'Power': 'Redundant 3200W PSU',
        'Cooling': 'Advanced liquid cooling system',
        'Form Factor': '6U Rackmount'
      } : {
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
        "/EudTech-Select-server-front.png.png",
        "/EudTech-Select-server-back.png.png",
        "/EudTech-Select-server-inside.png"
      ],
      detailedDescription: null
    },
    {
      id: 3,
      title: isEnglish ? 'FinSight Financial AI System' : 'FinSight 金融AI系統',
      description: isEnglish
        ? 'FinSight is a financial language understanding and data processing framework. By combining raw financial data with LLMs, it provides natural, real-time, and flexible explanations and decision support.'
        : 'FinSight 是一套金融語言理解與資料處理的概念架構，將金融原始數據結合語言模型（LLM），提供更自然、即時、彈性的解釋與輔助決策能力。',
      icon: <Shield className="h-8 w-8 text-blue-800" />, 
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      features: isEnglish
        ? [
            'FinSight-API: Unified financial data API (technical indicators, price history, smart fallback, extensible to news, macro, financials)',
            'RESTful API, SaaS or on-premises deployment, easy integration for LLMs or enterprise systems',
            'FinSight GTP: MVP demo system for LLM interaction (ChatGPT Plugin, Hugging Face, local LLMs)',
            'LLM tasks: explain indicators, predict trends, auto-generate reports, charting, simulate strategies, build custom GPT assistants',
            'Highly extensible: add data sources, connect internal APIs, support private LLMs, multi-role/multi-language architecture',
            'Enterprise services: deployment consulting, custom data, local LLM optimization, prompt engineering, dedicated GPT assistant'
          ]
        : [
            'FinSight-API 金融資料整合 API（技術指標、價格歷史、smart fallback、可擴充新聞/總經/財報）',
            'RESTful API 設計，SaaS 雲端或本地端部署，LLM/企業系統可直接串接',
            'FinSight GTP 語言模型互動展示 MVP（支援 ChatGPT Plugin、Hugging Face、本地 LLM）',
            'LLM 可執行 指標解釋、趨勢預測、自動報告、圖表繪製、策略模擬、打造專屬 GPT 助理',
            '高度彈性延伸 擴充資料源、串接內部 API、支援私有 LLM、多角色多語系架構',
            '企業服務 部署評估、客製資料、在地 LLM 最佳化、Prompt Engineering、專屬金融 GPT 助理'
          ],
      specs: isEnglish ? {
        'Model': 'LLM + API Wrapper',
        'Data Sources': 'News, statements, market APIs',
        'Integration': 'Webhook + JSON/RESTful API',
        'Deployment': 'SaaS / On-Premises'
      } : {
        '模型架構': 'LLM + API 包裝器',
        '資料來源': '新聞、財報、行情API',
        '整合模式': 'Webhook 與 JSON/RESTful API',
        '部署方式': 'SaaS 或 私有部署'
      },
      comingSoon: false,
      images: [
        'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg'
      ],
      detailedDescription: isEnglish ? {
        title: 'FinSight Financial AI Series',
        formFactor: 'Conceptual Framework + API + LLM Integration',
        introduction: 'FinSight is a conceptual framework for financial language understanding and data processing. It combines raw financial data with LLMs to provide natural, real-time, and flexible explanations and decision support.',
        keyFeatures: [
          'FinSight-API: Unified API for technical indicators, price history, smart fallback, extensible to news, macro, financials',
          'RESTful API, SaaS or on-premises deployment, easy integration for LLMs or enterprise systems',
          'FinSight GTP: MVP demo for LLM interaction (ChatGPT Plugin, Hugging Face, local LLMs)',
          'LLM tasks: explain indicators, predict trends, auto-generate reports, charting, simulate strategies, build custom GPT assistants',
          'Highly extensible: add data sources, connect internal APIs, support private LLMs, multi-role/multi-language architecture',
          'Enterprise services: deployment consulting, custom data, local LLM optimization, prompt engineering, dedicated GPT assistant'
        ],
        technicalSpecs: {
          'API Module': 'FinSight-API (RESTful, SaaS/on-premises, technical indicators, price, news, macro, financials)',
          'Demo Module': 'FinSight GTP (MVP, LLM integration, ChatGPT Plugin, Hugging Face, local LLMs)',
          'LLM Tasks': 'Indicator explanation, trend prediction, report generation, charting, strategy simulation, custom GPT',
          'Deployment': 'Cloud (GPT-4/4o), private LLMs (LLaMA, Mistral), enterprise network',
          'Extensibility': 'Custom data, internal API, private LLM, multi-role/language, prompt engineering'
        },
        applications: [
          'API-driven financial data access for LLMs and enterprise systems',
          'Interactive LLM demos for financial analysis and reporting',
          'Custom GPT assistants for finance',
          'Enterprise deployment and consulting',
          'Showcase: https://chatgpt.com/g/g-68708483b9788191935502fc337408eb-finsight (MVP demo)'
        ]
      } : {
        title: 'FinSight 金融AI系列',
        formFactor: '概念架構 + API + LLM 整合',
        introduction: 'FinSight 是一套金融語言理解與資料處理的概念架構，將金融原始數據結合語言模型（LLM），提供更自然、即時、彈性的解釋與輔助決策能力。\n\n我們提供兩大模組 FinSight-API（金融資料整合 API）與 FinSight GTP（語言模型互動 MVP 展示）',
        keyFeatures: [
          'FinSight-API 金融資料整合 API（技術指標、價格歷史、smart fallback、可擴充新聞/總經/財報）',
          'RESTful API 設計，SaaS 雲端或本地端部署，LLM/企業系統可直接串接',
          'FinSight GTP 語言模型互動 MVP 展示（支援 ChatGPT Plugin、Hugging Face、本地 LLM）',
          'LLM 可執行 指標解釋、趨勢預測、自動報告、圖表繪製、策略模擬、打造專屬 GPT 助理',
          '高度彈性延伸 擴充資料源、串接內部 API、支援私有 LLM、多角色多語系架構',
          '企業服務 部署評估、客製資料、在地 LLM 最佳化、Prompt Engineering、專屬金融 GPT 助理'
        ],
        technicalSpecs: {
          'API 模組': 'FinSight-API（RESTful，SaaS/本地端，技術指標、價格、新聞、總經、財報）',
          '展示模組': 'FinSight GTP（MVP，LLM 整合，ChatGPT Plugin、Hugging Face、本地 LLM）',
          'LLM 任務': '指標解釋、趨勢預測、報告產生、圖表繪製、策略模擬、專屬 GPT',
          '部署方式': '雲端（GPT-4/4o）、私有 LLM（LLaMA, Mistral）、企業內網',
          '彈性擴充': '客製資料、內部 API、私有 LLM、多角色/多語系、Prompt Engineering'
        },
        applications: [
          'API 驅動金融資料存取，供 LLM 與企業系統串接',
          '互動式 LLM 金融分析與報告展示',
          '打造專屬金融 GPT 助理',
          '企業部署與顧問服務'
        ]
      }
    },
    {
      id: 5,
      title: isEnglish ? 'Comino Grando Rackable Workstation' : 'Comino Grando 機架式工作站',
      description: isEnglish
        ? 'Designed for high-performance computing with advanced cooling and modular design.'
        : '',
      icon: <Server className="h-8 w-8 text-purple-700" />,
      image: "/grando-8gpu-server.jpg",
      features: isEnglish ? [
            'Up to 6 GPUs & 2 CPUs',
            'Designed to be used as a desktop or can be put in a rack',
            '3x 140mm fans 3000 RPM (low noise level) or 3x 140mm 5000RPM (medium noise level)',
            'Cooling Capacity up to 2.5kW'
          ] : [
            '最多6個GPU和2個CPU',
            '設計為桌面使用或可置於機架中',
            '3個140mm風扇3000 RPM（低噪音）或3個140mm 5000RPM（中等噪音）',
            '散熱能力高達2.5kW'
          ],
      specs: isEnglish ? {
        'Maximum Cooling Capacity': '2500 W - Maximum cooling capacity is ensured @ 20C intake air T and "performance mode" of the cooling system',
        'Motherboard': 'Up to EATX & EBB',
        'GPUs': 'Up to 7; NVIDIA: 5090, RTX A6000, RTX 6000 ADA, A40, L40, L40S, A100, H100; AMD: W7800, W7900',
        'RAM': 'Up to 2TB *',
        'Storage': 'Up to 2 3.5" HDD, Up to 6 2.5" SSD',
        'Power Supply System': 'Up to 3x SFX-L 1000W, Power Capacity up to 3kW'
      } : {
        'Maximum Cooling Capacity': '2500 W - 在20°C進氣溫度和冷卻系統"性能模式"下確保最大冷卻能力',
        'Motherboard': '支援EATX & EBB',
        'GPUs': '最多7個; NVIDIA: 5090, RTX A6000, RTX 6000 ADA, A40, L40, L40S, A100, H100; AMD: W7800, W7900',
        'RAM': '最高2TB *',
        'Storage': '最多2個3.5"硬碟，最多6個2.5"固態硬碟',
        'Power Supply System': '最多3個SFX-L 1000W，電源容量最高3kW'
      },
      comingSoon: false,
      images: [
        "/grando-8gpu-server.jpg",
        "/comino-h100-server.jpg",
        "/comino-h100-front.jpg"
      ],
      detailedDescription: null
    },
    {
      id: 6,
      title: isEnglish ? 'Comino Grando Workstation' : 'Comino Grando 工作站',
      description: isEnglish
        ? 'A desktop/tower workstation for deep learning research and creative professionals, offering multi-GPU power and ultra-quiet operation.'
        : '用於深度學習研究和專業創作的桌面型工作站，適合工作組和高階專業人士，提供所有你需要的多GPU效能。',
      icon: <Server className="h-8 w-8 text-purple-700" />, 
      image: "/grando-workstation-closed.png",
      features: isEnglish ? [
            'Up to 6x RTX 5090/A100 GPU',
            'Ultra-quiet operation <30dB',
            'AMD Threadripper PRO 7000 series',
            'Up to 2TB DDR5-4800 ECC memory',
            'Up to 8TB NVMe SSD',
            'Comino liquid cooling system',
            'Tool-free maintenance'
          ] : [
            '最高6張RTX 5090/A100 GPU',
            '超靜音運作低於30dB',
            'AMD Threadripper PRO 7000系列',
            '最高2TB DDR5-4800 ECC記憶體',
            '最高8TB NVMe SSD',
            'Comino液冷系統',
            '免工具維護'
          ],
      specs: isEnglish ? {
        'GPU': 'Up to 6x RTX 5090/A100',
        'Processor': 'AMD Threadripper PRO 7000 series',
        'Memory': 'Up to 2TB DDR5-4800',
        'Storage': 'Up to 8TB NVMe SSD',
        'Cooling': 'Comino liquid cooling system',
        'Noise Level': '<30dB',
        'Power Supply': '1600W 80+ Platinum',
        'Form Factor': 'Tower',
        'Dimensions': '570 x 280 x 580mm',
        'Weight': 'Approx. 45kg'
      } : {
        'GPU': '最高6張RTX 5090/A100',
        '處理器': 'AMD Threadripper PRO 7000系列',
        '記憶體': '最高2TB DDR5-4800',
        '儲存': '最高8TB NVMe SSD',
        '散熱': 'Comino液冷系統',
        '噪音等級': '低於30dB',
        '電源供應': '1600W 80+ 白金',
        '機箱規格': '桌面型',
        '尺寸': '570 x 280 x 580mm',
        '重量': '約45kg'
      },
      comingSoon: false,
      images: [
        "/grando-workstation-closed.png",
        "/grando-workstation-open.png",
        "/comino-workstation-front.png",
        "/comino-workstation-side.png"
      ],
      detailedDescription: isEnglish ? {
        title: 'Comino Grando Workstation - Deep Learning Desktop',
        formFactor: 'Desktop/Tower',
        introduction: 'A high-end desktop workstation for deep learning, research, and creative professionals. Ultra-quiet, multi-GPU, and advanced liquid cooling.',
        keyFeatures: [
          'Up to 6x RTX 5090/A100 GPU',
          'Ultra-quiet operation <30dB',
          'AMD Threadripper PRO 7000 series',
          'Up to 2TB DDR5-4800 ECC memory',
          'Up to 8TB NVMe SSD',
          'Comino liquid cooling system',
          'Tool-free maintenance'
        ],
        technicalSpecs: {
          'Product Series': 'Comino Grando Workstation',
          'Form Factor': 'Desktop/Tower',
          'GPU': 'Up to 6x RTX 5090/A100 GPU (each up to 600W)',
          'Processor': 'AMD Threadripper PRO 7000 series, up to 96 cores',
          'Memory': 'Up to 2TB DDR5-4800 ECC',
          'Storage': 'Up to 8TB NVMe SSD, supports RAID',
          'Cooling': 'Comino liquid cooling system with custom design',
          'Noise Level': '<30dB under typical load',
          'Power Supply': '1600W 80+ Platinum',
          'Connectivity': 'Multiple USB 3.2, Thunderbolt 4, 10GbE LAN',
          'Dimensions': '570mm (W) x 280mm (D) x 580mm (H)',
          'Weight': 'Approx. 45kg',
          'Operating Temp': '10°C to 35°C',
          'Warranty': '3 years limited / 24/7 support'
        }
      } : {
        title: 'Comino Grando 工作站',
        formFactor: '桌面型工作站',
        introduction: '用於深度學習研究和專業創作的桌面型工作站，適合工作組和高階專業人士，提供所有你需要的多GPU效能。',
        keyFeatures: [
          '最高6張RTX 5090/A100 GPU',
          '超靜音運作低於30dB',
          'AMD Threadripper PRO 7000系列',
          '最高2TB DDR5-4800 ECC記憶體',
          '最高8TB NVMe SSD儲存，支援RAID',
          'Comino液冷系統',
          '免工具維護'
        ],
        technicalSpecs: {
          '產品系列': 'Comino Grando 工作站',
          '機箱規格': '桌面型工作站',
          'GPU': '支援最高6張RTX 5090/A100 GPU（單卡最高600W功率）',
          '處理器': 'AMD Threadripper PRO 7000系列，最多96核心',
          '記憶體': '最高2TB DDR5-4800 ECC記憶體',
          '儲存': '最高8TB NVMe SSD儲存，支援RAID',
          '散熱': 'Comino液冷系統結構配專屬設計',
          '噪音等級': '典型運作下低於30dB',
          '電源供應': '1600W 80+ 白金效能電源',
          '連接介面': '多組USB 3.2、Thunderbolt 4、10GbE網路',
          '尺寸': '570mm (寬) x 280mm (深) x 580mm (高)',
          '重量': '約45kg',
          '操作溫度': '10°C至35°C',
          '保固': '3年有限保固 / 24/7支援'
        }
      },
    },
    {
      id: 8,
      title: isEnglish ? 'Comino Grando FPGA Solutions' : 'Comino Grando FPGA解決方案',
      description: isEnglish
        ? 'Ultra-compact liquid-cooled FPGA computing platform. Supports up to 160 FPGA per rack with 30kW power consumption in 4U form factor.'
        : '超緊湊液冷FPGA運算平台。支援每機架最多160個FPGA，4U機箱規格下功耗30kW。',
      icon: <Cpu className="h-8 w-8 text-orange-700" />,
      image: "/grando-fpga-cards.png",
      features: isEnglish
        ? [
            'Up to 160 FPGA per Rack',
            '30kW Power per Rack',
            '4U Form Factor',
            'BittWare CVP-13 Compatible',
            'Liquid Cooling System',
            'Heat Recovery Capable'
          ]
        : [
            '每機架最多160個FPGA',
            '每機架30kW功率',
            '4U機箱規格',
            '相容BittWare CVP-13',
            '液冷系統',
            '熱回收功能'
          ],
      specs: isEnglish ? {
        'FPGA': 'Up to 160 per rack',
        'Power': '30kW per rack',
        'Form Factor': '4U Rackmount',
        'Cooling': 'Liquid Cooling',
        'Compatibility': 'BittWare CVP-13'
      } : {
        'FPGA': '每機架最多160個',
        '功率': '每機架30kW',
        '機箱規格': '4U機架式',
        '散熱': '液冷系統',
        '相容性': 'BittWare CVP-13'
      },
      comingSoon: false,
      images: [
        "/grando-fpga-cards.png",
        "/grando-fpga-image-132.png",
        "/grando-fpga-image-133.png"
      ],
      detailedDescription: isEnglish ? {
        title: 'Comino Grando FPGA Solutions - Ultra-Compact FPGA Computing',
        formFactor: '4U Rackmount FPGA Computing Platform',
        introduction: 'The Comino Grando FPGA solution represents the pinnacle of ultra-compact liquid-cooled FPGA computing technology. Designed for applications requiring massive parallel processing power with field-programmable flexibility, this system delivers exceptional performance in a remarkably compact 4U form factor while maintaining optimal thermal management through advanced liquid cooling.',
        keyFeatures: [
          'Up to 160 FPGA cards per standard 42U rack configuration',
          '30kW power consumption per rack with advanced power management',
          'Ultra-compact 4U form factor maximizing compute density',
          'BittWare CVP-13 FPGA card compatibility with Intel Stratix 10',
          'Advanced liquid cooling system for optimal thermal performance',
          'Heat recovery capability for energy efficiency',
          'Modular architecture supporting various FPGA configurations',
          'Quick-disconnect liquid cooling fittings for easy maintenance',
          'Integrated monitoring and management system',
          'Support for high-speed interconnects and networking'
        ],
        technicalSpecs: {
          'Product Series': 'Comino Grando FPGA Computing Platform',
          'Form Factor': '4U Rackmount Server',
          'FPGA Capacity': 'Up to 160 FPGA cards per rack',
          'FPGA Compatibility': 'BittWare CVP-13 with Intel Stratix 10 FPGAs',
          'Power Consumption': '30kW per rack (advanced power management)',
          'Cooling System': 'Comino liquid cooling with heat recovery',
          'Rack Configuration': 'Standard 42U rack (10 Grando U blocks)',
          'Management': 'Integrated monitoring and remote management',
          'Interconnect': 'High-speed FPGA-to-FPGA communication',
          'Operating Temperature': 'Extended range with liquid cooling',
          'Applications': 'HPC, AI acceleration, signal processing, cryptography',
          'Deployment': 'Enterprise data centers, research institutions'
        },
        orderInfo: [
          {
            type: 'FPGA Computing Platform',
            pn: 'GRANDO-FPGA-RACK',
            model: 'Grando FPGA Rack System',
            description: 'Complete 42U rack with up to 160 FPGA cards, liquid cooling system, power distribution, and management infrastructure'
          },
          {
            type: 'FPGA U-Block',
            pn: 'GRANDO-FPGA-U',
            model: 'Grando FPGA U-Block',
            description: '4U server unit supporting up to 16 FPGA cards with integrated liquid cooling and power management'
          },
          {
            type: 'BittWare CVP-13 Card',
            pn: 'BITTWARE-CVP13',
            model: 'CVP-13 FPGA Card',
            description: 'Intel Stratix 10 FPGA card with high-speed interconnects and memory subsystem'
          },
          {
            type: 'Cooling Infrastructure',
            pn: 'GRANDO-COOL-FPGA',
            model: 'FPGA Cooling System',
            description: 'Complete liquid cooling infrastructure including pumps, heat exchangers, and distribution manifolds'
          },
          {
            type: 'Management Software',
            pn: 'GRANDO-MGMT-FPGA',
            model: 'FPGA Management Suite',
            description: 'Comprehensive monitoring, configuration, and management software for FPGA infrastructure'
          }
        ]
      } : {
        title: 'Comino Grando FPGA解決方案 - 超緊湊FPGA運算',
        formFactor: '4U機架式FPGA運算平台',
        introduction: 'Comino Grando FPGA解決方案代表超緊湊液冷FPGA運算技術的巔峰。專為需要大規模並行處理能力和現場可程式靈活性的應用而設計，該系統在極其緊湊的4U外形尺寸中提供卓越性能，同時通過先進液冷技術保持最佳熱管理。',
        keyFeatures: [
          '標準42U機架配置中最多160個FPGA卡',
          '每機架30kW功耗配備先進電源管理',
          '超緊湊4U外形尺寸實現最大運算密度',
          'BittWare CVP-13 FPGA卡相容性，搭載Intel Stratix 10',
          '先進液冷系統確保最佳熱性能',
          '熱回收功能提升能源效率',
          '模組化架構支援各種FPGA配置',
          '快速接頭液冷配件便於維護',
          '整合監控和管理系統',
          '支援高速互連和網路功能'
        ],
        technicalSpecs: {
          '產品系列': 'Comino Grando FPGA運算平台',
          '外形尺寸': '4U機架式伺服器',
          'FPGA容量': '每機架最多160個FPGA卡',
          'FPGA相容性': 'BittWare CVP-13搭載Intel Stratix 10 FPGA',
          '功耗': '每機架30kW（先進電源管理）',
          '散熱系統': 'Comino液冷配備熱回收',
          '機架配置': '標準42U機架（10個Grando U塊）',
          '管理': '整合監控和遠程管理',
          '互連': '高速FPGA對FPGA通信',
          '操作溫度': '液冷擴展溫度範圍',
          '應用': 'HPC、AI加速、信號處理、密碼學',
          '部署': '企業數據中心、研究機構'
        },
        orderInfo: [
          {
            type: 'FPGA運算平台',
            pn: 'GRANDO-FPGA-RACK',
            model: 'Grando FPGA機架系統',
            description: '完整42U機架配備最多160個FPGA卡、液冷系統、電源分配和管理基礎設施'
          },
          {
            type: 'FPGA U塊',
            pn: 'GRANDO-FPGA-U',
            model: 'Grando FPGA U塊',
            description: '4U伺服器單元支援最多16個FPGA卡，配備整合液冷和電源管理'
          },
          {
            type: 'BittWare CVP-13卡',
            pn: 'BITTWARE-CVP13',
            model: 'CVP-13 FPGA卡',
            description: 'Intel Stratix 10 FPGA卡配備高速互連和記憶體子系統'
          },
          {
            type: '散熱基礎設施',
            pn: 'GRANDO-COOL-FPGA',
            model: 'FPGA散熱系統',
            description: '完整液冷基礎設施包括泵浦、熱交換器和分配歧管'
          },
          {
            type: '管理軟體',
            pn: 'GRANDO-MGMT-FPGA',
            model: 'FPGA管理套件',
            description: 'FPGA基礎設施的全面監控、配置和管理軟體'
          }
        ]
      }
    },
    {
      id: 7,
      title: isEnglish ? 'Comino Grando Container' : 'Comino Grando 移動數據中心',
      description: isEnglish
        ? 'Universal mobile data center for liquid-cooled solutions. 40ft container housing up to 140 Grando U blocks with 2240 GPUs total capacity.'
        : '液冷解決方案的通用移動數據中心。40英尺貨櫃可容納最多140個Grando U塊，總共2240個GPU容量。',
      icon: <Shield className="h-8 w-8 text-green-700" />,
      image: "/grando-container-closed.png",
      features: isEnglish
        ? [
            'Up to 140 Grando U Blocks',
            '500kW Total Power',
            'Operating: -30°C to +50°C',
            '13x 19" 48U Racks',
            'Heat Recovery System',
            'Mobile Deployment'
          ]
        : [
            '最多140個Grando U塊',
            '500kW總功率',
            '操作溫度：-30°C至+50°C',
            '13個19英寸48U機架',
            '熱回收系統',
            '移動部署'
          ],
      specs: isEnglish ? {
        'GPU': 'Up to 2240 GPUs',
        'Power': '500kW total power consumption',
        'Operating Temperature': '-30°C to +50°C',
        'Racks': '13x 19" 48U racks',
        'Cooling': 'Integrated liquid cooling'
      } : {
        'GPU': '最高2240個GPU',
        '功率': '500kW總功耗',
        '操作溫度': '-30°C至+50°C',
        '機架': '13個19英寸48U機架',
        '散熱': '整合液冷系統'
      },
      comingSoon: false,
      images: [
        "/grando-container-closed.png",
        "/grando-container-opened.png",
        "/comino-heat-recovery.png"
      ],
      detailedDescription: isEnglish ? {
        title: 'Comino Grando Container - Mobile Data Center Solution',
        formFactor: '40ft shipping container',
        introduction: 'The Comino Grando Container represents the ultimate in mobile AI computing infrastructure. This 40-foot shipping container houses up to 140 Grando U blocks, providing massive parallel computing power with up to 2240 GPUs. Designed for deployment in any location worldwide, it offers enterprise-grade AI computing capabilities in a portable, weather-resistant enclosure.',
        keyFeatures: [
          'Up to 140 Grando U blocks with liquid cooling',
          'Total capacity of up to 2240 GPUs',
          '500kW total power consumption',
          'Operating temperature range: -30°C to +50°C',
          '13x standard 19" 48U server racks',
          'Integrated heat recovery system',
          'Mobile deployment capability',
          'Weather-resistant construction',
          'Remote monitoring and management',
          'Redundant power and cooling systems'
        ],
        technicalSpecs: {
          'Container Type': 'Standard 40ft shipping container',
          'Computing Units': 'Up to 140 Grando U blocks',
          'GPU Capacity': 'Up to 2240 GPUs total',
          'Power Consumption': '500kW maximum',
          'Operating Temperature': '-30°C to +50°C ambient',
          'Rack Configuration': '13x 19" 48U standard racks',
          'Cooling System': 'Integrated liquid cooling with heat recovery',
          'Connectivity': 'Multiple fiber optic and copper connections',
          'Monitoring': 'Remote monitoring and diagnostics',
          'Dimensions': '12.19m x 2.44m x 2.59m (40ft container)',
          'Weight': 'Varies based on configuration',
          'Certification': 'ISO container standards, local electrical codes'
        },
        orderInfo: [
          {
            type: 'Standard Configuration',
            pn: 'CONTAINER-STD',
            model: 'Grando Container Standard',
            description: '40ft container with 100 Grando U blocks, integrated cooling, power distribution'
          },
          {
            type: 'Maximum Configuration',
            pn: 'CONTAINER-MAX',
            model: 'Grando Container Maximum',
            description: '40ft container with 140 Grando U blocks, maximum GPU density configuration'
          },
          {
            type: 'Custom Configuration',
            pn: 'CONTAINER-CUSTOM',
            model: 'Custom Container Solution',
            description: 'Fully customizable container solution based on specific requirements'
          }
        ]
      } : {
        title: 'Comino Grando 移動數據中心 - 移動數據中心解決方案',
        formFactor: '40英尺貨櫃',
        introduction: 'Comino Grando移動數據中心代表移動AI運算基礎設施的巔峰。這個40英尺貨櫃可容納最多140個Grando U塊，提供多達2240個GPU的大規模並行運算能力。專為全球任何地點部署而設計，在便攜、防風雨的外殼中提供企業級AI運算能力。',
        keyFeatures: [
          '最多140個Grando U塊配備液冷',
          '總容量最多2240個GPU',
          '500kW總功耗',
          '操作溫度範圍：-30°C至+50°C',
          '13個標準19英寸48U伺服器機架',
          '整合熱回收系統',
          '移動部署能力',
          '防風雨結構',
          '遠程監控和管理',
          '備援電源和散熱系統'
        ],
        technicalSpecs: {
          '貨櫃類型': '標準40英尺貨櫃',
          '運算單元': '最多140個Grando U塊',
          'GPU容量': '最多2240個GPU總計',
          '功耗': '最大500kW',
          '操作溫度': '環境溫度-30°C至+50°C',
          '機架配置': '13個19英寸48U標準機架',
          '散熱系統': '整合液冷配備熱回收',
          '連接性': '多種光纖和銅線連接',
          '監控': '遠程監控和診斷',
          '尺寸': '12.19m x 2.44m x 2.59m（40英尺貨櫃）',
          '重量': '根據配置而定',
          '認證': 'ISO貨櫃標準，當地電氣規範'
        },
        orderInfo: [
          {
            type: '標準配置',
            pn: 'CONTAINER-STD',
            model: 'Grando移動數據中心標準版',
            description: '40英尺貨櫃配備100個Grando U塊，整合散熱，電源分配'
          },
          {
            type: '最大配置',
            pn: 'CONTAINER-MAX',
            model: 'Grando移動數據中心最大版',
            description: '40英尺貨櫃配備140個Grando U塊，最大GPU密度配置'
          },
          {
            type: '客製化配置',
            pn: 'CONTAINER-CUSTOM',
            model: '客製化貨櫃解決方案',
            description: '根據特定需求完全客製化的貨櫃解決方案'
          }
        ]
      }
    }
  ];

  // 技術規格字段名稱的中文對照表
  const technicalSpecsTranslations: Record<string, string> = {
    'Motherboards': '主機板',
    'Motherboard': '主機板',
    'RAM': '記憶體',
    'Memory': '記憶體',
    'M2 drives': 'M.2硬碟',
    'Drives': '硬碟',
    'Storage': '儲存設備',
    'PSU and Operating voltage': '電源供應與操作電壓',
    'Power Supply System': '電源供應系統',
    'Power': '電源',
    'Cooling Capacity': '散熱能力',
    'Cooling': '散熱',
    'Noise level': '噪音等級',
    'LAN': '網路介面',
    'Network': '網路',
    'OS': '作業系統',
    'Liquid cooling': '液冷系統',
    'Reservoir': '水箱',
    'Pumps': '水泵',
    'Radiators': '散熱器',
    'Fans': '風扇',
    'Installation': '安裝方式',
    'Required rack space': '機架空間需求',
    'Size': '尺寸',
    'Weight': '重量',
    'Operating & storage temperature range': '操作與存儲溫度範圍',
    'Form Factor': '機箱規格',
    'GPUs': 'GPU',
    'GPU': 'GPU',
    'Product Series': '產品系列',
    'Processor': '處理器',
    'CPU': '處理器',
    'Maximum Cooling Capacity': '最大散熱能力',
    'Liquid Cooling': '液冷系統',
    'Internal Storage Interface': '內部儲存介面',
    'Expansion Slots': '擴充插槽',
    'Connectivity': '連接選項',
    'Management': '管理功能',
    'Security': '安全功能',
    'Dimensions': '尺寸',
    'Warranty': '保固'
  };

  // 可用配置類型的中文對照表
  const orderInfoTypeTranslations: Record<string, string> = {
    'LIQUID COOLED': '液冷系統',
    'QUICK-DISCONNECT COUPLINGS': '快速接頭設計',
    'REMOTE MANAGEMENT': '遠端管理',
    'COMINO\'S MONITORING SYSTEM': 'Comino監控系統',
    'BASE SYSTEM': '基本系統',
    'EXPANSION KIT': '擴充套件',
    'RACK ASSEMBLY': '機架安裝',
    'SUPPORT PACKAGE': '技術支援套件',
    'NETWORKING': '網路配置',
    'CUSTOM CONFIGURATION': '客製化配置'
  };

  // 英文配置類型格式化，使用標準的首字母大寫
  const formatConfigType: Record<string, string> = {
    'LIQUID COOLED': 'Liquid Cooling System',
    'QUICK-DISCONNECT COUPLINGS': 'Quick-Disconnect Couplings',
    'REMOTE MANAGEMENT': 'Remote Management',
    'COMINO\'S MONITORING SYSTEM': 'Comino Monitoring System',
    'BASE SYSTEM': 'Base System',
    'EXPANSION KIT': 'Expansion Kit',
    'RACK ASSEMBLY': 'Rack Assembly',
    'SUPPORT PACKAGE': 'Support Package',
    'NETWORKING': 'Networking',
    'CUSTOM CONFIGURATION': 'Custom Configuration'
  };

  const parsedId = parseInt(id || '1');
  const { getProductById } = useProductData(isEnglish);
  const hasSetLanguage = useRef(false);
  console.log("Available product IDs:", products.map(p => p.id));
  
  const product = products.find(p => p.id === parsedId);
  
  // FinSight 產品語言控制邏輯
  useEffect(() => {
    // 只在組件首次掛載且尚未設定語言時執行
    if (!hasSetLanguage.current && productId === 3) {
      const fromHome = location.state?.fromHome;
      
      // 如果不是從首頁進入（直接進入或外部連結），設定為英文
      if (!fromHome) {
        setLanguage('en');
      }
      // 如果是從首頁進入，保持當前語言設定
      
      hasSetLanguage.current = true;
    }
  }, [productId, location.state, setLanguage]);

  if (!product) {
    console.log("Product not found!");
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {isEnglish ? 'Product Not Found' : '找不到產品'} (ID: {parsedId})
          </h1>
          <Link to="/" className="text-eudtech-600 hover:text-eudtech-700 dark:text-eudtech-400 dark:hover:text-eudtech-300">
            {isEnglish ? 'Back to Home' : '返回首頁'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar 
        isEnglish={isEnglish}
        toggleLanguage={toggleLanguage}
        themeMode={themeMode}
        isDarkMode={isDarkModeActive}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900 overflow-x-hidden pt-16">
      {/* Product Header */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Back Button */}
          <Link 
            to="/"
            state={{ fromSection: fromSection }}
            className="inline-flex items-center text-eudtech-600 hover:text-eudtech-700 dark:text-eudtech-400 dark:hover:text-eudtech-300 transition-colors mb-8 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
            {isEnglish ? 'Back to Products' : '返回產品列表'}
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-6 group">
                <div className="text-eudtech-600 dark:text-eudtech-400 transform group-hover:scale-110 transition-transform duration-300">
                  {product.icon}
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent ml-4">
                  {product.title}
                </h1>
              </div>
              {product.id === 3 ? (
                <div className="mb-8">
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    <span className="font-bold text-eudtech-700 dark:text-eudtech-400 block mb-2">
                      {isEnglish ? 'What is FinSight' : '什麼是 FinSight'}
                    </span>
                    {product.description}
                  </p>
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-neo-light dark:shadow-neo-dark">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 text-center">
                      {isEnglish ? 'Solution Highlights' : '解決方案亮點'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* API 模組 */}
                      <div className="bg-white dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <h4 className="font-semibold text-eudtech-700 dark:text-eudtech-400 mb-2 text-lg">
                          {isEnglish ? 'FinSight-API' : 'FinSight-API'}
                        </h4>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                          {isEnglish
                            ? 'Unified financial data API with technical indicators, price history, and extensible support for news, macro, and financial data. RESTful design enables easy integration for LLMs and enterprise systems.'
                            : '金融資料整合API，包含技術指標、價格歷史，可擴充新聞、總經、財報資料。RESTful設計讓LLM與企業系統輕鬆整合。'}
                        </p>
                      </div>
                      
                      {/* GTP MVP 模組 */}
                      <div className="bg-white dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <h4 className="font-semibold text-eudtech-700 dark:text-eudtech-400 mb-2 text-lg">
                          {isEnglish ? 'FinSight GTP' : 'FinSight GTP'}
                        </h4>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                          {isEnglish
                            ? 'MVP demonstration system for LLM interaction, supporting ChatGPT Plugin, Hugging Face, and local LLM deployments.'
                            : '語言模型互動展示系統，支援ChatGPT Plugin、Hugging Face及本地LLM部署。'}
                        </p>
                      </div>
                      
                      {/* LLM 應用任務 */}
                      <div className="bg-white dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <h4 className="font-semibold text-eudtech-700 dark:text-eudtech-400 mb-2 text-lg">
                          {isEnglish ? 'LLM Applications' : 'LLM 應用功能'}
                        </h4>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                          {isEnglish
                            ? 'Comprehensive LLM capabilities including indicator explanation, trend prediction, automated reporting, charting, strategy simulation, and custom GPT development.'
                            : '完整LLM功能包含指標解釋、趨勢預測、自動報告、圖表生成、策略模擬及專屬GPT開發。'}
                        </p>
                      </div>
                      
                      {/* 彈性與企業服務 */}
                      <div className="bg-white dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <h4 className="font-semibold text-eudtech-700 dark:text-eudtech-400 mb-2 text-lg">
                          {isEnglish ? 'Enterprise Services' : '企業服務'}
                        </h4>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                          {isEnglish
                            ? 'Highly extensible architecture supporting custom data sources, internal API integration, private LLM deployment, multi-role/language support, and dedicated GPT assistant development.'
                            : '高度彈性架構支援客製資料源、內部API整合、私有LLM部署、多角色多語系及專屬GPT助理開發。'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {product.description}
                  </p>
                  {/* Key Features */}
                  <div className="mb-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-neo-light dark:shadow-neo-dark">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 text-center">
                      {isEnglish ? 'Key Features' : '主要特色'}
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start group hover:translate-x-1 transition-transform duration-300">
                          <div className="h-2 w-2 bg-eudtech-600 dark:bg-eudtech-400 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:animate-pulse"></div>
                          <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {/* CTA 行動按鈕 */}
            {product.id === 3 && (
              <div className="flex flex-col items-center mt-8">
                {/* 產品圖片 */}
                <div className="flex justify-center items-center overflow-hidden rounded-xl shadow-3d-light dark:shadow-3d-dark group relative mb-6">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-96 object-contain bg-gray-50 dark:bg-gray-700 rounded-lg transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/20 to-transparent dark:from-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                </div>
                <div className="mb-2 text-base text-gray-700 dark:text-gray-300 text-center">
                  {isEnglish
                    ? 'Experience the FinSightGTP demo (MVP) to see how LLMs interact with real financial data.'
                    : '立即體驗 FinSightGTP（MVP），感受語言模型與金融資料的互動應用。'}
                </div>
                <a
                  href="https://chatgpt.com/g/g-68708483b9788191935502fc337408eb-finsight"
                  className="inline-block px-8 py-3 mb-3 rounded-lg bg-eudtech-600 text-white font-semibold shadow-lg hover:bg-eudtech-700 transition-colors text-lg"
                  target="_blank" rel="noopener noreferrer"
                >
                  {isEnglish ? 'FinSightGTP Demo' : 'FinSightGTP體驗'}
                </a>
                <button
                  type="button"
                  className="inline-block px-8 py-3 rounded-lg border border-eudtech-600 text-eudtech-600 font-semibold hover:bg-eudtech-50 dark:hover:bg-gray-800 transition-colors text-lg cursor-pointer bg-transparent"
                  onClick={() => {
                    handleNavClick('#contact');
                  }}
                >
                  {isEnglish ? 'Contact Us' : '聯絡我們'}
                </button>
              </div>
            )}

            {product.id !== 3 && (
              <div className="flex justify-center items-center overflow-hidden rounded-xl shadow-3d-light dark:shadow-3d-dark group relative">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-96 object-contain bg-gray-50 dark:bg-gray-700 rounded-lg transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/20 to-transparent dark:from-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PayPal Support Section - Only for FinSight */}
      {product.id === 3 && (
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800/30">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isEnglish ? 'Support FinSight GTP Development' : '支持 FinSight GTP 計畫發展'}
                </h3>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {isEnglish
                  ? 'Help us accelerate the development of FinSight GTP - the next generation financial AI platform. Your support enables us to expand features, enhance AI capabilities, and deliver more powerful financial insights for the community.'
                  : '協助我們加速 FinSight GTP 的開發進程 - 下一代金融AI平台。您的支持讓我們能夠擴充功能、增強AI能力，並為社群提供更強大的金融洞察服務。'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  { key: 'moreProducts', text: isEnglish ? 'More financial product data support' : '更多金融商品數據支援', color: 'bg-green-500' },
                  { key: 'rawData', text: isEnglish ? 'Enhanced raw data integration' : '更完整原始數據整合', color: 'bg-purple-500' },
                  { key: 'quantData', text: isEnglish ? 'Comprehensive quantitative data coverage' : '更完整量化數據覆蓋', color: 'bg-orange-500' },
                  { key: 'multiCountry', text: isEnglish ? 'Multi-country data expansion' : '更多國家數據擴展', color: 'bg-blue-500' }
                ].map((item, index) => (
                  <div key={item.key} className="flex items-center">
                    <div className={`h-2 w-2 ${item.color} rounded-full mt-2 mr-3 flex-shrink-0`}></div>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <a
                href="http://paypal.me/EudTech/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.26-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.9.9 0 0 0-.89.756l-1.274 8.07a.38.38 0 0 0 .375.438h3.077c.463 0 .852-.33.93-.778l.038-.207.73-4.625.047-.257c.077-.447.467-.778.93-.778h.584c3.57 0 6.367-1.45 7.181-5.64.34-1.75.165-3.213-.675-4.32a3.669 3.669 0 0 0-1.077-.579z"/>
                </svg>
                {isEnglish ? 'Support via PayPal' : '透過 PayPal 支持'}
              </a>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                {isEnglish ? 'Secure payment • Any amount helps' : '安全付款 • 任何金額都是幫助'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Specifications */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-16 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgNnY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 dark:opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-8 text-center">
            {isEnglish ? 'System Overview' : '系統總覽'}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-neutral-200 dark:border-neutral-700">
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {Object.entries(product.specs).map(([key, value], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800' : 'bg-white dark:bg-gray-800'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100 w-1/3">
                      {isEnglish ? key : technicalSpecsTranslations[key] || key}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {product.id !== 3 && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 text-center">
              {isEnglish 
                ? '* - depends on the configuration, contact Comino team for clarification' 
                : '* - 取決於配置，請聯繫Comino團隊獲取詳細資訊'}
            </p>
          )}
        </div>
      </div>

      {/* Technical Specifications from Detailed Description */}
      {product.detailedDescription && (
        <div className="bg-white dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4">
            {/* 針對 FinSight 的特殊佈局 */}
            {product.id === 3 ? (
              <div className="space-y-12">
                {/* 系統架構說明 */}
                <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
                    {isEnglish ? 'System Architecture' : '系統架構'}
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-eudtech-700 dark:text-eudtech-400 mb-4">
                        {isEnglish ? 'Core Components' : '核心組件'}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="h-2 w-2 bg-eudtech-600 dark:bg-eudtech-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">FinSight-API</span>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                              {isEnglish ? 'RESTful API for unified financial data access' : 'RESTful API 統一金融資料存取'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="h-2 w-2 bg-eudtech-600 dark:bg-eudtech-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">FinSight GTP</span>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                              {isEnglish ? 'LLM interaction demonstration platform' : 'LLM 互動展示平台'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-eudtech-700 dark:text-eudtech-400 mb-4">
                        {isEnglish ? 'Key Features' : '主要功能'}
                      </h4>
                      <div className="space-y-3">
                        {product.detailedDescription.keyFeatures.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <div className="h-2 w-2 bg-teal-600 dark:bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-neutral-700 dark:text-neutral-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 技術規格 - 卡片式佈局 */}
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 text-center">
                    {isEnglish ? 'Technical Specifications' : '技術規格'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.detailedDescription.technicalSpecs).map(([key, value], index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <h4 className="font-semibold text-eudtech-700 dark:text-eudtech-400 mb-3 text-lg">
                          {isEnglish ? key : technicalSpecsTranslations[key] || key}
                        </h4>
                        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 應用場景 */}
                {product.detailedDescription.applications && (
                  <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
                      {isEnglish ? 'Applications' : '應用場景'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.detailedDescription.applications.map((application, index) => (
                        <div key={index} className="flex items-start p-4 bg-white dark:bg-gray-700/50 rounded-lg">
                          <div className="h-2 w-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">{application}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* 其他產品的原有佈局 */
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
                    {isEnglish ? 'Technical Specifications' : '技術規格'}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 border border-neutral-200 dark:border-neutral-700">
                      <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                        {Object.entries(product.detailedDescription.technicalSpecs).map(([key, value], index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800' : 'bg-white dark:bg-gray-800'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100 w-1/3">
                              {isEnglish ? key : technicalSpecsTranslations[key] || key}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {product.id !== 3 && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 text-center">
                      {isEnglish 
                        ? '* - depends on the configuration, contact Comino team for clarification' 
                        : '* - 取決於配置，請聯繫Comino團隊獲取詳細資訊'}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Available Configurations - 只對非 FinSight 產品顯示 */}
            {product.id !== 3 && product.detailedDescription && Array.isArray((product.detailedDescription as { orderInfo?: unknown }).orderInfo) &&
              ((product.detailedDescription as { orderInfo?: unknown }).orderInfo as Array<any>).length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                  {isEnglish ? 'Available Configurations' : '可用配置'}
                </h3>
                <div className="space-y-4">
                  {(product.detailedDescription as { orderInfo: Array<{type: string, pn: string, model: string, description: string}> }).orderInfo.map((item, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {isEnglish ? (formatConfigType[item.type] || item.type) : orderInfoTypeTranslations[item.type] || item.type}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.model}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Features */}
            {product.detailedDescription && 'additionalFeatures' in product.detailedDescription && product.detailedDescription.additionalFeatures && (
              <div className="mb-12">
                <div className="space-y-6">
                  {Object.entries(product.detailedDescription.additionalFeatures as Record<string, string>).map(([title, description], index) => (
                    <div key={index} className="border-l-4 border-eudtech-600 pl-6">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h4>
                      <p className="text-gray-700 dark:text-gray-300">{description as string}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Gallery */}
      {product.images && product.images.length > 0 && product.id !== 3 && (
        <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.05),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.1),transparent_40%)] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-8 text-center">
              {isEnglish ? 'Product Gallery' : '產品圖庫'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800/80 rounded-xl shadow-neo-light dark:shadow-neo-dark overflow-hidden group hover:shadow-glow-blue dark:hover:shadow-glow-blue transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02] relative"
                >
                  <img 
                    src={image} 
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-64 object-contain bg-gray-50 dark:bg-gray-700 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
      <Footer isEnglish={isEnglish} />
    </>
  );
};

export default ProductDetails;