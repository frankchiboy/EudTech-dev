import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Server, Cpu, Shield, Monitor } from 'lucide-react';

interface ProductDetailsProps {
  isEnglish: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ isEnglish }) => {
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
      detailedDescription: isEnglish ? {
        title: 'ET6204X-D08N-G1 Product Specifications',
        formFactor: '6U rackmount server',
        introduction: 'ET6204X-D08N-G1 is an AI computing server built on Intel\'s latest Eagle Stream platform, offering exceptional computing power and flexible expansion capabilities. With direct CPU-GPU connectivity, it delivers high performance for parallel computing, robust scalability, reliability, energy efficiency, intelligent maintenance, modular design, and an open ecosystem. This server is optimized for diverse AI-driven workloads, including cloud gaming, AI processing, cloud computing, virtualization, big data analytics, and digital twin applications.',
        keyFeatures: [
          'Supports 1 or 2 4th/5th Gen Intel® Xeon® Scalable Processors, with TDP up to 350W',
          'Up to 32 DDR5 memory slots, with memory frequencies of 4400/4800/5600MHz, increasing memory bandwidth by 75%',
          '2 Onboard M.2 SATA/NVMe interfaces',
          'Supports direct CPU-GPU connections, accommodating 600W dual-width, triple-width, and 3.5-width GPUs',
          'Supports 12 SATA/SAS/NVMe tri-mode hard drives, meeting high-speed data transfer and storage requirements'
        ],
        technicalSpecs: {
          'Product Series': 'ET6204X-D08N-G1',
          'Form Factor': 'Pass-though 8-GPU 12-Bay AI Server',
          'GPU': 'Supports up to 8 GPUs with 600W power, accommodating dual-width, triple-width, and 3.5-width GPUs, maximum GPU width of 70.1mm',
          'Processor': 'Supports one or two 4th/5th Gen Intel® Xeon® Scalable Processors, with a maximum TDP of 350W',
          'Memory': '32 DDR5 memory slots, supporting DDR5 4400/4800/5600MHz',
          'Internal Storage Interface': '2 Slimline 4x ports (SATA), 2 M.2 slots (SATA/PCIe3.0x1) for 2280/22110 sizes',
          'External Hard Drive': '12 hot-swappable 3.5"/2.5" SAS/SATA/NVMe drives',
          'External Ports': 'Front: 2x USB 3.0, 1x VGA\nRear: 1x serial port, 2x USB 3.0, 1x VGA, 1x RJ45 management port (optional upgrade for 2x 10G RJ45 network ports)',
          'PCIE Expansion': 'Up to 13 PCIe expansion slots',
          'OS': 'Microsoft Windows Server, RedHat Enterprise Linux, SUSE Linux Enterprise Server, CentOS, Ubuntu, VMware ESXi etc.',
          'Security': 'Supports TPM 2.0 module, chassis intrusion alarm, BMC/BIOS redundancy',
          'PowerSupply': 'Supports CRPS 2000W/2200W/2600W/3200W power modules, with hot-swap capability and 3+1 redundancy',
          'Fan': 'Standard configuration includes 12 hot-swappable 6056 fans and 4 hot-swappable 8038 fans',
          'IPMI': 'Supports Redfish, SNMP, IPMI 2.0 standard interfaces',
          'Management Port': '1 dedicated RJ45 management port',
          'Dimension': '265mm (H) x 447mm (W) x 910mm (D)',
          'Operating Temperature': '5℃～35℃'
        },
        orderInfo: [
          {
            type: 'Barebone',
            pn: '0.21.006.0004',
            model: 'ET6204X-D08N-G1',
            description: 'Eagle Stream platform 6U 8-GPU direct-connect GPU server, supporting 12*3.5"/2.5" SATA/SAS/NVMe hard drives, with a maximum of 13 PCIe slots; Standard configuration: supports 4 NVMe drive bays and 8 SATA drive bays; includes 8 PCIe 5.0 x16 GPU slots, 1 PCIe 4.0 x8 slot, and 2 PCIe 5.0 x8 slots; equipped with 12 hot-swappable 6056 fans and 4 hot-swappable 8038 fans; includes 4*2000W power supplies.'
          },
          {
            type: 'Power Module',
            pn: '3.03.153.0054',
            model: 'GC2200PMT',
            description: '2200W CRPS power module'
          },
          {
            type: 'Power Module',
            pn: '3.03.153.0075',
            model: 'GC2600PMT',
            description: '2600W CRPS power module'
          },
          {
            type: 'Power Module',
            pn: '',
            model: 'GC3200PMT',
            description: '3200W CRPS power module'
          },
          {
            type: 'Network Card',
            pn: '4.00.104.0013',
            model: 'G82599-PK',
            description: 'Utilizes Intel 82599 chip for a dual 10Gb optical PCIe network card'
          },
          {
            type: 'Network Card',
            pn: '4.00.104.0008',
            model: 'G710-PK',
            description: 'Utilizes Intel XL710 chip for an onboard quad 10Gb optical PCIe network card'
          },
          {
            type: 'Network Card',
            pn: '1.23.222.0348',
            model: 'G82599L',
            description: 'Utilizes Intel 82599 chip for a dual 10Gb optical OCP 3.0 network card'
          },
          {
            type: 'Network Card',
            pn: '1.23.222.0417',
            model: 'G710L',
            description: 'Utilizes Intel XL710 chip for an onboard quad 10Gb optical OCP 3.0 network card'
          },
          {
            type: 'Slide Rail',
            pn: '3.11.001.0016',
            model: 'C7007-108-3',
            description: 'Full extension length of 920mm, supporting 1m-1.2m cabinets'
          }
        ]
      } : {
        title: 'ET6204X-D08N-G1 產品規格',
        formFactor: '6U 機架式伺服器',
        introduction: 'ET6204X-D08N-G1 是基於英特爾最新 Eagle Stream 平台構建的 AI 計算伺服器，提供卓越的計算能力和靈活的擴展能力。通過直接 CPU-GPU 連接，它為並行計算提供高性能，具有強大的可擴展性、可靠性、能源效率、智能維護、模組化設計和開放生態系統。該伺服器針對各種 AI 驅動的工作負載進行了優化，包括雲遊戲、AI 處理、雲計算、虛擬化、大數據分析和數字孿生應用。',
        keyFeatures: [
          '支援 1 或 2 個第 4/5 代英特爾® 至強® 可擴展處理器，TDP 高達 350W',
          '最多 32 個 DDR5 記憶體插槽，記憶體頻率為 4400/4800/5600MHz，記憶體頻寬提高 75%',
          '2 個板載 M.2 SATA/NVMe 介面',
          '支援直接 CPU-GPU 連接，可容納 600W 雙寬、三寬和 3.5 寬 GPU',
          '支援 12 個 SATA/SAS/NVMe 三模式硬碟，滿足高速數據傳輸和存儲需求'
        ],
        technicalSpecs: {
          '產品系列': 'ET6204X-D08N-G1',
          '外形尺寸': '直通式 8-GPU 12 槽位 AI 伺服器',
          'GPU': '支援最多 8 個 600W 功率的 GPU，可容納雙寬、三寬和 3.5 寬 GPU，最大 GPU 寬度為 70.1mm',
          '處理器': '支援一個或兩個第 4/5 代英特爾® 至強® 可擴展處理器，最大 TDP 為 350W',
          '記憶體': '32 個 DDR5 記憶體插槽，支援 DDR5 4400/4800/5600MHz',
          '內部存儲介面': '2 個 Slimline 4x 埠 (SATA)，2 個 M.2 插槽 (SATA/PCIe3.0x1) 用於 2280/22110 尺寸',
          '外部硬碟': '12 個熱插拔 3.5"/2.5" SAS/SATA/NVMe 硬碟',
          '外部埠': '前面板：2x USB 3.0，1x VGA\n後面板：1x 串行埠，2x USB 3.0，1x VGA，1x RJ45 管理埠（可選升級為 2x 10G RJ45 網絡埠）',
          'PCIE 擴展': '最多 13 個 PCIe 擴展插槽',
          '作業系統': 'Microsoft Windows Server、RedHat Enterprise Linux、SUSE Linux Enterprise Server、CentOS、Ubuntu、VMware ESXi 等',
          '安全性': '支援 TPM 2.0 模組、機箱入侵報警、BMC/BIOS 冗餘',
          '電源供應': '支援 CRPS 2000W/2200W/2600W/3200W 電源模組，具有熱插拔能力和 3+1 冗餘',
          '風扇': '標準配置包括 12 個熱插拔 6056 風扇和 4 個熱插拔 8038 風扇',
          'IPMI': '支援 Redfish、SNMP、IPMI 2.0 標準介面',
          '管理埠': '1 個專用 RJ45 管理埠',
          '尺寸': '265mm (高) x 447mm (寬) x 910mm (深)',
          '操作溫度': '5℃～35℃'
        },
        orderInfo: [
          {
            type: '裸機',
            pn: '0.21.006.0004',
            model: 'ET6204X-D08N-G1',
            description: 'Eagle Stream 平台 6U 8-GPU 直連 GPU 伺服器，支援 12*3.5"/2.5" SATA/SAS/NVMe 硬碟，最多 13 個 PCIe 插槽；標準配置：支援 4 個 NVMe 驅動器槽位和 8 個 SATA 驅動器槽位；包括 8 個 PCIe 5.0 x16 GPU 插槽，1 個 PCIe 4.0 x8 插槽和 2 個 PCIe 5.0 x8 插槽；配備 12 個熱插拔 6056 風扇和 4 個熱插拔 8038 風扇；包括 4*2000W 電源供應。'
          },
          {
            type: '電源模組',
            pn: '3.03.153.0054',
            model: 'GC2200PMT',
            description: '2200W CRPS 電源模組'
          },
          {
            type: '電源模組',
            pn: '3.03.153.0075',
            model: 'GC2600PMT',
            description: '2600W CRPS 電源模組'
          },
          {
            type: '電源模組',
            pn: '',
            model: 'GC3200PMT',
            description: '3200W CRPS 電源模組'
          },
          {
            type: '網路卡',
            pn: '4.00.104.0013',
            model: 'G82599-PK',
            description: '使用 Intel 82599 晶片的雙 10Gb 光纖 PCIe 網路卡'
          },
          {
            type: '網路卡',
            pn: '4.00.104.0008',
            model: 'G710-PK',
            description: '使用 Intel XL710 晶片的板載四埠 10Gb 光纖 PCIe 網路卡'
          },
          {
            type: '網路卡',
            pn: '1.23.222.0348',
            model: 'G82599L',
            description: '使用 Intel 82599 晶片的雙 10Gb 光纖 OCP 3.0 網路卡'
          },
          {
            type: '網路卡',
            pn: '1.23.222.0417',
            model: 'G710L',
            description: '使用 Intel XL710 晶片的板載四埠 10Gb 光纖 OCP 3.0 網路卡'
          },
          {
            type: '滑軌',
            pn: '3.11.001.0016',
            model: 'C7007-108-3',
            description: '全伸展長度 920mm，支援 1m-1.2m 機櫃'
          }
        ]
      }
    },
    {
      id: 6,
      title: isEnglish ? 'Comino Grando Workstation' : 'Comino Grando 工作站',
      description: isEnglish
        ? 'Silent desktop workstation for deep learning research and development. Ideal solution for workgroups and high-end professionals, providing unprecedented multi-GPU performance on premise.'
        : '用於深度學習研究和開發的靜音桌面工作站。適合工作組和高階專業人士的理想解決方案，提供前所未有的多GPU效能。',
      icon: <Monitor className="h-8 w-8 text-indigo-700" />,
      image: "/grando-workstation-closed.png",
      features: isEnglish
        ? [
            'Up to 6x RTX 5090/A100 GPUs',
            'Whisper-quiet operation under 30dB',
            'Compact desktop design',
            'AMD Threadripper PRO 7000 Series',
            'Up to 2TB DDR5-4800',
            'Comino liquid cooling system',
            'Professional-grade reliability',
            'Tool-free maintenance access'
          ]
        : [
            '最高6個RTX 5090/A100 GPU',
            '超靜音運作低於30dB',
            '緊湊桌面設計',
            'AMD Threadripper PRO 7000系列',
            '最高2TB DDR5-4800',
            'Comino液冷系統',
            '專業級可靠性',
            '免工具維護存取'
          ],
      specs: isEnglish ? {
        'GPU': 'Up to 6x RTX 5090/A100',
        'CPU': 'AMD Threadripper PRO 7000 Series',
        'Memory': 'Up to 2TB DDR5-4800',
        'Storage': 'Up to 8TB NVMe SSD',
        'Form Factor': 'Desktop Tower',
        'Cooling': 'Comino Liquid Cooling',
        'Noise Level': 'Under 30dB',
        'Power Supply': '1600W 80+ Platinum',
        'Dimensions': '570 x 280 x 560mm',
        'Weight': 'Approximately 45kg'
      } : {
        'GPU': '最高6個RTX 5090/A100',
        'CPU': 'AMD Threadripper PRO 7000系列',
        '記憶體': '最高2TB DDR5-4800',
        '儲存': '最高8TB NVMe SSD',
        '機箱規格': '桌面塔式',
        '散熱': 'Comino液冷系統',
        '噪音等級': '低於30dB',
        '電源供應': '1600W 80+ 白金',
        '尺寸': '570 x 280 x 560mm',
        '重量': '約45kg'
      },
      comingSoon: false,
      images: [
        "/grando-workstation-closed.png",
        "/grando-workstation-open.png",
        "/grando-dpr-4090-front.png",
        "/grando-dpr-4090-side.png"
      ],
      detailedDescription: isEnglish ? {
        title: 'Comino Grando Workstation Specifications',
        formFactor: 'Desktop workstation',
        introduction: 'The Comino Grando Workstation represents the pinnacle of silent computing power, designed specifically for deep learning research and development. This revolutionary desktop workstation combines unprecedented multi-GPU performance with whisper-quiet operation, making it the ideal solution for workgroups and high-end professionals who demand both power and tranquility in their workspace.',
        keyFeatures: [
          'Whisper-quiet operation under 30dB for office environments',
          'Supports up to 6x RTX 5090/A100 GPUs with full performance',
          'Comino liquid cooling system prevents thermal throttling',
          'AMD Threadripper PRO 7000 Series for exceptional CPU performance',
          'Up to 2TB DDR5-4800 memory for large dataset processing',
          'Compact desktop design fits standard office spaces',
          'Professional-grade reliability with enterprise components',
          'Tool-free maintenance access for easy upgrades'
        ],
        technicalSpecs: {
          'Product Series': 'Comino Grando Workstation',
          'Form Factor': 'Desktop Tower Workstation',
          'GPU': 'Supports up to 6x RTX 5090/A100 GPUs with 600W power per slot',
          'CPU': 'AMD Threadripper PRO 7000 Series, up to 96 cores',
          'Memory': 'Up to 2TB DDR5-4800 ECC memory',
          'Storage': 'Up to 8TB NVMe SSD storage with RAID support',
          'Cooling': 'Comino liquid cooling system with custom loop design',
          'Noise Level': 'Under 30dB in typical operation',
          'Power Supply': '1600W 80+ Platinum modular PSU',
          'Connectivity': 'Multiple USB 3.2, Thunderbolt 4, 10GbE networking',
          'Dimensions': '570mm (W) x 280mm (D) x 560mm (H)',
          'Weight': 'Approximately 45kg',
          'Operating Temperature': '10°C to 35°C',
          'Warranty': '3-year on-site warranty with 24/7 support'
        },
        applications: [
          'Deep learning model training and inference',
          'Computer vision and image processing',
          'Natural language processing research',
          'Scientific computing and simulation',
          'CAD and 3D rendering workloads',
          'AI development and prototyping',
          'Data science and analytics',
          'High-performance computing tasks'
        ]
      } : {
        title: 'Comino Grando 工作站規格',
        formFactor: '桌面工作站',
        introduction: 'Comino Grando 工作站代表了靜音計算能力的頂峰，專為深度學習研究和開發而設計。這款革命性的桌面工作站結合了前所未有的多GPU效能和超靜音運作，使其成為要求在工作空間中同時擁有強大性能和寧靜環境的工作組和高階專業人士的理想解決方案。',
        keyFeatures: [
          '辦公環境下低於30dB的超靜音運作',
          '支援最多6個RTX 5090/A100 GPU，發揮完整效能',
          'Comino液冷系統防止熱節流',
          'AMD Threadripper PRO 7000系列提供卓越CPU效能',
          '最高2TB DDR5-4800記憶體處理大型資料集',
          '緊湊桌面設計適合標準辦公空間',
          '企業級組件提供專業級可靠性',
          '免工具維護存取便於升級'
        ],
        technicalSpecs: {
          '產品系列': 'Comino Grando 工作站',
          '機箱規格': '桌面塔式工作站',
          'GPU': '支援最多6個RTX 5090/A100 GPU，每槽位600W功率',
          'CPU': 'AMD Threadripper PRO 7000系列，最多96核心',
          '記憶體': '最高2TB DDR5-4800 ECC記憶體',
          '儲存': '最高8TB NVMe SSD儲存，支援RAID',
          '散熱': 'Comino液冷系統採用客製化循環設計',
          '噪音等級': '典型運作下低於30dB',
          '電源供應': '1600W 80+ 白金模組化電源',
          '連接介面': '多個USB 3.2、Thunderbolt 4、10GbE網路',
          '尺寸': '570mm (寬) x 280mm (深) x 560mm (高)',
          '重量': '約45kg',
          '運作溫度': '10°C至35°C',
          '保固': '3年到府保固，24/7支援'
        },
        applications: [
          '深度學習模型訓練和推理',
          '電腦視覺和影像處理',
          '自然語言處理研究',
          '科學計算和模擬',
          'CAD和3D渲染工作負載',
          'AI開發和原型設計',
          '資料科學和分析',
          '高效能計算任務'
        ]
      }
    },
    {
      id: 5,
      title: isEnglish ? 'Comino Grando Rackable Workstation' : 'Comino Grando 機架式工作站',
      description: isEnglish
        ? ''
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
      detailedDescription: isEnglish ? {
        title: 'Comino Grando Rackable Workstation - Liquid-Cooled AI Computing',
        formFactor: 'Desktop or 19" rack-mountable workstation with liquid cooling system',
        introduction: 'The Comino Grando rackable workstation represents the pinnacle of liquid-cooled AI computing technology. Designed specifically for AI training, inference, and high-performance computing workloads, this system delivers exceptional performance through direct GPU-to-GPU connectivity and advanced thermal management. The Comino liquid cooling system enables sustained peak performance while maintaining reliable operation.',
        keyFeatures: [
          'Up to 8x GPUs with Comino liquid cooling',
          'Available GPUs: H200, PRO 6000, RTX 5090, etc.',
          'Direct GPU-to-GPU connectivity for maximum bandwidth',
          'AMD EPYC 9004 & 9005 series processors with up to 64 cores',
          'Comino Liquid Cooling System with real-time monitoring',
          'Up to 2TB DDR5 ECC memory with high bandwidth',
          'NVMe Gen4 storage configuration up to 32TB',
          'Redundant 3200W power supplies for reliability',
          'Network options including 10GbE and InfiniBand',
          'Tool-free maintenance with quick-disconnect fittings',
          'Comprehensive monitoring and management software'
        ],
        technicalSpecs: {
          'Motherboards': 'Up to EATX & EBB',
          'RAM': 'Up to 2TB *',
          'M2 drives': 'Up to 8x NVMe',
          'Drives': 'External 3.5" cage up to 2x 3.5" or 2x 2.5" 15mm or 4x 2.5" 7mm, Internal 2.5" slots: up to 6x 2.5" SSD 7mm',
          'PSU and Operating voltage': 'Up to 3x 1000W SFX-L @ 110/220V',
          'Cooling Capacity': '2.5kW',
          'Noise level': '35dB - 50dB',
          'LAN': 'Up to 2x 10 Gbps on the MoBo and up to 400Gbps in PCIe',
          'OS': 'Ubuntu / Win10 (Pro/Home) / Windows Server',
          'Liquid cooling': 'CPU with VRM and GPU with QDC and VRM',
          'Reservoir': 'Comino custom 450ml with integrated pumps',
          'Pumps': '2x Laing DDC 2kW',
          'Radiators': '1x 120x30mm core',
          'Fans': '3x Low Noise 140mm 3000RPM (low noise level) or 3x High-Flow 140mm 5000RPM (medium noise level)',
          'Installation': 'Desktop as a Workstation or 19" rack-mountable',
          'Required rack space': '4U',
          'Size': '439 x 681 x 177mm (without handles and protruding parts)',
          'Weight': 'Comino Grando Workstation with 4 GPUs ~ 64kg (net), 72kg (gross)',
          'Operating & storage temperature range': 'Storage: -5°C / 25°C / 32°C, Operating: 5°C / 35°C / 39°C / 100°F *'
        },
        orderInfo: [
          {
            type: 'LIQUID COOLED',
            pn: 'LIQUID-COOLING',
            model: 'Comino Liquid Cooling System',
            description: 'Comino liquid cooling system unleashes the full performance potential of modern top-tier GPUs and CPUs. Allows to pinpoint lifespan of the hardware and ensures silent or low noise 24/7 operation even in harsh environment with high ambient temperature.'
          },
          {
            type: 'QUICK-DISCONNECT COUPLINGS',
            pn: 'QUICK-DISCONNECT',
            model: 'Comino ThruQ Couplings',
            description: 'Quick Disconnect Couplings (Comino ThruQ) on each GPU and CPU allows availability.'
          },
          {
            type: 'REMOTE MANAGEMENT',
            pn: 'REMOTE-MGMT',
            model: 'IPMI Remote Management',
            description: 'BMC chip to provide intelligence for its IPMI architecture for out-of-band.'
          },
          {
            type: 'COMINO\'S MONITORING SYSTEM',
            pn: 'MONITORING-SYS',
            model: 'Comino Monitoring System',
            description: 'Allows to collect cooling system like temperature statistic, WEB based GUI allows to inspect several devices remotely. The monitoring system increases system availability.'
          }
        ]
      } : {
        title: 'Comino Grando Rackable Workstation - 液冷AI運算',
        formFactor: '桌面或19"機架式工作站配備液冷系統',
        introduction: 'Comino Grando機架式工作站代表液冷AI運算技術的巔峰。專為AI訓練、推論和高效能運算工作負載而設計，該系統通過GPU直連和先進熱管理實現卓越效能。Comino液冷系統確保持續峰值效能，同時保持可靠運作。',
        keyFeatures: [
          '最高8個GPU配備Comino液冷',
          '可用GPU：H200、PRO 6000、RTX 5090等',
          'GPU直連架構實現最大頻寬',
          'AMD EPYC 9004與9005系列處理器，最高64核心',
          'Comino液冷系統配備即時監控',
          '最高2TB DDR5 ECC記憶體，高頻寬設計',
          'NVMe Gen4儲存配置最高32TB',
          '備援3200W電源供應確保可靠性',
          '網路選項包括10GbE和InfiniBand',
          '免工具維護，配備快速接頭',
          '全面監控和管理軟體'
        ],
        technicalSpecs: {
          'Motherboards': '支援EATX & EBB',
          'RAM': '最高2TB *',
          'M2 drives': '最多8個NVMe',
          'Drives': '外部3.5"機箱最多2個3.5"或2個2.5" 15mm或4個2.5" 7mm，內部2.5"插槽：最多6個2.5" SSD 7mm',
          'PSU and Operating voltage': '最多3個1000W SFX-L @ 110/220V',
          'Cooling Capacity': '2.5kW',
          'Noise level': '35dB - 50dB',
          'LAN': '主板上最多2個10 Gbps，PCIe中最多400Gbps',
          'OS': 'Ubuntu / Win10 (Pro/Home) / Windows Server',
          'Liquid cooling': 'CPU配VRM和GPU配QDC和VRM',
          'Reservoir': 'Comino客製450ml配整合泵浦',
          'Pumps': '2個Laing DDC 2kW',
          'Radiators': '1個120x30mm散熱器',
          'Fans': '3個低噪音140mm 3000RPM（低噪音）或3個高流量140mm 5000RPM（中等噪音）',
          'Installation': '桌面工作站或19"機架安裝',
          'Required rack space': '4U',
          'Size': '439 x 681 x 177mm（不含把手和突出部分）',
          'Weight': 'Comino Grando Workstation配4個GPU～64kg（淨重），72kg（毛重）',
          'Operating & storage temperature range': '儲存：-5°C / 25°C / 32°C，運作：5°C / 35°C / 39°C / 100°F *'
        },
        orderInfo: [
          {
            type: 'LIQUID COOLED',
            pn: 'LIQUID-COOLING',
            model: 'Comino Liquid Cooling System',
            description: 'Comino liquid cooling system unleashes the full performance potential of modern top-tier GPUs and CPUs. Allows to pinpoint lifespan of the hardware and ensures silent or low noise 24/7 operation even in harsh environment with high ambient temperature.'
          },
          {
            type: 'QUICK-DISCONNECT COUPLINGS',
            pn: 'QUICK-DISCONNECT',
            model: 'Comino ThruQ Couplings',
            description: 'Quick Disconnect Couplings (Comino ThruQ) on each GPU and CPU allows availability.'
          },
          {
            type: 'REMOTE MANAGEMENT',
            pn: 'REMOTE-MGMT',
            model: 'IPMI Remote Management',
            description: 'BMC chip to provide intelligence for its IPMI architecture for out-of-band.'
          },
          {
            type: 'COMINO\'S MONITORING SYSTEM',
            pn: 'MONITORING-SYS',
            model: 'Comino Monitoring System',
            description: 'Allows to collect cooling system like temperature statistic. WEB based GUI allows to inspect several devices remotely. The monitoring system increases system availability.'
          }
        ]
      }
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

  const parsedId = parseInt(id || '1');
  console.log("Looking for product with ID:", parsedId);
  console.log("Available product IDs:", products.map(p => p.id));
  
  const product = products.find(p => p.id === parsedId);

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
    <div className="min-h-screen bg-neutral-50 overflow-x-hidden">
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
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {product.description}
              </p>
              
              {/* Key Features */}
              <div className="mb-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-neo-light dark:shadow-neo-dark">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                  <div className="h-5 w-1 bg-gradient-to-b from-eudtech-500 to-eudtech-700 dark:from-eudtech-400 dark:to-eudtech-600 rounded-full mr-3"></div>
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

            <div className="flex justify-center items-center overflow-hidden rounded-xl shadow-3d-light dark:shadow-3d-dark group relative">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-96 object-contain bg-gray-50 dark:bg-gray-700 rounded-lg transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/20 to-transparent dark:from-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

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
                      {key}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">
            * - depends on the configuration, contact Comino team for clarification
          </p>
        </div>
      </div>

      {/* Technical Specifications from Detailed Description */}
      {product.detailedDescription && (
        <div className="bg-white dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Technical Specifications Table */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  {isEnglish ? 'Technical Specifications' : '技術規格'}
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 border border-neutral-200 dark:border-neutral-700">
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                      {Object.entries(product.detailedDescription.technicalSpecs).map(([key, value], index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800' : 'bg-white dark:bg-gray-800'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100 w-1/3">
                            {key}
                          </td>
                          <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">
                  * - depends on the configuration, contact Comino team for clarification
                </p>
              </div>

              {/* Available Configurations */}
              {product.detailedDescription.orderInfo && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    {isEnglish ? 'Available Configurations' : '可用配置'}
                  </h3>
                  <div className="space-y-4">
                    {product.detailedDescription.orderInfo.map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.type}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{item.model}</span>
                        </div>
                        {item.pn && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span className="font-medium">P/N:</span> {item.pn}
                          </p>
                        )}
                        <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Features */}
              {product.detailedDescription.additionalFeatures && (
                <div className="mb-12">
                  <div className="space-y-6">
                    {Object.entries(product.detailedDescription.additionalFeatures).map(([title, description], index) => (
                      <div key={index} className="border-l-4 border-eudtech-600 pl-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h4>
                        <p className="text-gray-700 dark:text-gray-300">{description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Gallery */}
      {product.images && product.images.length > 0 && (
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
  );
};

export default ProductDetails;