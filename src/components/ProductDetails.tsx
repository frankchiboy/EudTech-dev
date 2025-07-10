import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Server, Cpu, Shield, Monitor } from 'lucide-react';

interface ProductDetailsProps {
  isEnglish: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ isEnglish }) => {
  const { id } = useParams();
  
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
            'Up to 4x RTX 4090/A100 GPUs',
            'Whisper-quiet operation under 30dB',
            'Compact desktop design',
            'AMD Threadripper PRO 7000 Series',
            'Up to 256GB DDR5-4800',
            'Advanced liquid cooling system',
            'Professional-grade reliability',
            'Tool-free maintenance access'
          ]
        : [
            '最高4個RTX 4090/A100 GPU',
            '超靜音運作低於30dB',
            '緊湊桌面設計',
            'AMD Threadripper PRO 7000系列',
            '最高256GB DDR5-4800',
            '先進液冷系統',
            '專業級可靠性',
            '免工具維護存取'
          ],
      specs: isEnglish ? {
        'GPU': 'Up to 4x RTX 4090/A100/H100',
        'CPU': 'AMD Threadripper PRO 7000 Series',
        'Memory': 'Up to 256GB DDR5-4800',
        'Storage': 'Up to 8TB NVMe SSD',
        'Form Factor': 'Desktop Tower',
        'Cooling': 'Advanced Liquid Cooling',
        'Noise Level': 'Under 30dB',
        'Power Supply': '1600W 80+ Platinum',
        'Dimensions': '570 x 280 x 560mm',
        'Weight': 'Approximately 45kg'
      } : {
        'GPU': '最高4個RTX 4090/A100/H100',
        'CPU': 'AMD Threadripper PRO 7000系列',
        '記憶體': '最高256GB DDR5-4800',
        '儲存': '最高8TB NVMe SSD',
        '機箱規格': '桌面塔式',
        '散熱': '先進液冷系統',
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
          'Supports up to 4x RTX 4090/A100/H100 GPUs with full performance',
          'Advanced liquid cooling system prevents thermal throttling',
          'AMD Threadripper PRO 7000 Series for exceptional CPU performance',
          'Up to 256GB DDR5-4800 memory for large dataset processing',
          'Compact desktop design fits standard office spaces',
          'Professional-grade reliability with enterprise components',
          'Tool-free maintenance access for easy upgrades'
        ],
        technicalSpecs: {
          'Product Series': 'Comino Grando Workstation',
          'Form Factor': 'Desktop Tower Workstation',
          'GPU': 'Supports up to 4x RTX 4090/A100/H100 GPUs with 600W power per slot',
          'CPU': 'AMD Threadripper PRO 7000 Series, up to 96 cores',
          'Memory': 'Up to 256GB DDR5-4800 ECC memory',
          'Storage': 'Up to 8TB NVMe SSD storage with RAID support',
          'Cooling': 'Advanced liquid cooling system with custom loop design',
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
          '支援最多4個RTX 4090/A100/H100 GPU，發揮完整效能',
          '先進液冷系統防止熱節流',
          'AMD Threadripper PRO 7000系列提供卓越CPU效能',
          '最高256GB DDR5-4800記憶體處理大型資料集',
          '緊湊桌面設計適合標準辦公空間',
          '企業級組件提供專業級可靠性',
          '免工具維護存取便於升級'
        ],
        technicalSpecs: {
          '產品系列': 'Comino Grando 工作站',
          '機箱規格': '桌面塔式工作站',
          'GPU': '支援最多4個RTX 4090/A100/H100 GPU，每槽位600W功率',
          'CPU': 'AMD Threadripper PRO 7000系列，最多96核心',
          '記憶體': '最高256GB DDR5-4800 ECC記憶體',
          '儲存': '最高8TB NVMe SSD儲存，支援RAID',
          '散熱': '先進液冷系統採用客製化循環設計',
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
      title: isEnglish ? 'Comino Grando Multi-GPU Server' : 'Comino Grando 多GPU伺服器',
      description: isEnglish
        ? 'Engineered around liquid cooling technology for 24/7 operation up to 40°C. Best Multi-GPU performance for specialists, workgroups and research teams with up to 8x high-end GPUs.'
        : '圍繞液冷技術設計，可在40°C環境下24/7運作。為專家、工作組和研究團隊提供最佳多GPU效能，支援最多8個高階GPU。',
      icon: <Server className="h-8 w-8 text-purple-700" />,
      image: "/grando-8gpu-server.jpg",
      features: isEnglish ? [
            'Engineered for 24/7 operation up to 40°C',
            'Zero thermal throttling',
            'Up to 8x RTX 4090/H100/H200 GPUs',
            'Cooling capacity up to 5.5kW @25°C',
            'AMD EPYC 9004 & 9005 Series CPUs',
            'Comino Monitoring System'
          ] : [
            '24/7運作設計，可承受40°C高溫',
            '零熱節流',
            '最高8個RTX 4090/H100/H200 GPU',
            '25°C下散熱容量可達5.5kW',
            'AMD EPYC 9004與9005系列CPU',
            'Comino監控系統'
          ],
      specs: isEnglish ? {
        'GPU': 'Up to 8x RTX 4090/H100/H200',
        'CPU': 'AMD EPYC 9004 & 9005, Intel Xeon',
        'Memory': 'Up to 1TB DDR5 ECC',
        'Storage': 'Up to 4x 3.5" HDDs or 12x 2.5" SSDs',
        'Power': 'Up to 8.0kW with 4x CRPS modules',
        'Cooling': '5.5kW @25°C Liquid Cooling'
      } : {
        'GPU': '最高8個RTX 4090/H100/H200',
        'CPU': 'AMD EPYC 9004與9005，Intel Xeon',
        '記憶體': '最高1TB DDR5 ECC',
        '儲存': '最多4個3.5"硬碟或12個2.5"固態硬碟',
        '功率': '最高8.0kW，4個CRPS模組',
        '散熱': '25°C下5.5kW液冷系統'
      },
      comingSoon: false,
      images: [
        "/grando-8gpu-server.jpg",
        "/comino-h100-server.jpg",
        "/comino-h100-front.jpg"
      ],
      detailedDescription: isEnglish ? {
        title: 'Comino Grando Multi-GPU Server - Liquid-Cooled AI Computing',
        formFactor: '6U Rackmount Server with liquid cooling system',
        introduction: 'The Comino Grando multi-GPU server represents the pinnacle of liquid-cooled AI computing technology. Designed specifically for AI training, inference, and high-performance computing workloads, this system delivers exceptional performance through direct GPU-to-GPU connectivity and advanced thermal management. The liquid cooling system enables sustained peak performance while maintaining whisper-quiet operation.',
        keyFeatures: [
          'Up to 8x NVIDIA RTX 4090 or H100 GPUs with liquid cooling',
          'Direct GPU-to-GPU connectivity for maximum bandwidth',
          'AMD EPYC 9004 series processors with up to 64 cores',
          'Advanced CoolIT liquid cooling with real-time monitoring',
          'Up to 1TB DDR5 ECC memory with high bandwidth',
          'NVMe Gen4 storage configuration up to 32TB',
          'Redundant 3200W power supplies for reliability',
          'Network options including 10GbE and InfiniBand',
          'Tool-free maintenance with quick-disconnect fittings',
          'Comprehensive monitoring and management software'
        ],
        technicalSpecs: {
          'Product Series': 'Comino Grando Multi-GPU Server',
          'Form Factor': '6U Rackmount Server',
          'GPU Options': 'NVIDIA RTX 4090 (16,384 CUDA cores), H100 (16,896 CUDA cores)',
          'GPU Quantity': 'Up to 8 GPUs per system',
          'CPU Options': 'AMD EPYC 9004 series (up to 64 cores)',
          'Memory': 'Up to 1TB DDR5 ECC (supports up to 4800 MT/s)',
          'Storage': 'NVMe Gen4 SSD up to 32TB total capacity',
          'Network': '10GbE, 25GbE, InfiniBand options',
          'Cooling': 'Comino CoolIT liquid cooling with full-coverage blocks',
          'Power': 'Redundant 3200W PSU configuration',
          'Management': 'IPMI, BMC, Comino Management Suite',
          'Operating Systems': 'Ubuntu, CentOS, RHEL, Windows Server, Custom Linux distributions',
          'Certifications': 'CE, FCC, RoHS compliant',
          'Warranty': '3-year manufacturer warranty with EudTech support'
        },
        orderInfo: [
          {
            type: 'AI Training Configuration',
            pn: 'GRANDO-4090-8x',
            model: 'Grando DPR 4090-FT/8',
            description: '8x RTX 4090 24GB GPUs, AMD EPYC 9554 64-core CPU, 512GB DDR5 ECC, 16TB NVMe Gen4 SSD'
          },
          {
            type: 'Enterprise AI Configuration',
            pn: 'GRANDO-H100-8x',
            model: 'Grando H100 Enterprise',
            description: '8x H100 80GB GPUs, AMD EPYC 9654 96-core CPU, 1TB DDR5 ECC, 32TB NVMe storage'
          },
          {
            type: 'Research Configuration',
            pn: 'GRANDO-4090-4x',
            model: 'Grando Research System',
            description: '4x RTX 4090 GPUs, AMD EPYC 9374F 32-core CPU, 256GB DDR5 ECC, 8TB NVMe storage'
          }
        ]
      } : {
        title: 'Comino Grando 多GPU伺服器 - 液冷AI運算',
        formFactor: '6U機架式伺服器配備液冷系統',
        introduction: 'Comino Grando多GPU伺服器代表液冷AI運算技術的巔峰。專為AI訓練、推論和高效能運算工作負載而設計，該系統通過GPU直連和先進熱管理實現卓越效能。液冷系統確保持續峰值效能，同時保持超靜音運作。',
        keyFeatures: [
          '最高8個NVIDIA RTX 4090或H100 GPU配備液冷',
          'GPU直連架構實現最大頻寬',
          'AMD EPYC 9004系列處理器，最高64核心',
          '先進CoolIT液冷系統配備即時監控',
          '最高1TB DDR5 ECC記憶體，高頻寬設計',
          'NVMe Gen4儲存配置最高32TB',
          '備援3200W電源供應確保可靠性',
          '網路選項包括10GbE和InfiniBand',
          '免工具維護，配備快速接頭',
          '全面監控和管理軟體'
        ],
        technicalSpecs: {
          '產品系列': 'Comino Grando 多GPU伺服器',
          '外形尺寸': '6U機架式伺服器',
          'GPU選項': 'NVIDIA RTX 4090（16,384 CUDA核心）、H100（16,896 CUDA核心）',
          'GPU數量': '每系統最多8個GPU',
          'CPU選項': 'AMD EPYC 9004系列（最高64核心）',
          '記憶體': '最高1TB DDR5 ECC（支援最高4800 MT/s）',
          '儲存': 'NVMe Gen4 SSD最高32TB總容量',
          '網路': '10GbE、25GbE、InfiniBand選項',
          '散熱': 'Comino CoolIT液冷系統配備全覆蓋冷卻塊',
          '電源': '備援3200W電源供應配置',
          '管理': 'IPMI、BMC、Comino管理套件',
          '作業系統': 'Ubuntu、CentOS、RHEL、Windows Server、客製化Linux發行版',
          '認證': 'CE、FCC、RoHS合規',
          '保固': '3年製造商保固配備EudTech支援'
        },
        orderInfo: [
          {
            type: 'AI訓練配置',
            pn: 'GRANDO-4090-8x',
            model: 'Grando DPR 4090-FT/8',
            description: '8個RTX 4090 24GB GPU、AMD EPYC 9554 64核心CPU、512GB DDR5 ECC、16TB NVMe Gen4 SSD'
          },
          {
            type: 'Enterprise AI Configuration',
            pn: 'GRANDO-H100x8',
            model: 'Grando H100 Enterprise',
            description: '8x H100 SXM5 80GB GPUs, AMD EPYC 9654 96-core CPU, 1TB DDR5 ECC, 16TB NVMe storage, advanced cooling'
          },
          {
            type: 'Professional Workstation',
            pn: 'GRANDO-RTX6000x4',
            model: 'Grando RTX 6000 Ada Pro',
            description: '4x RTX 6000 Ada 48GB GPUs, Intel Xeon W-3435X, 256GB DDR5 ECC, 4TB NVMe storage'
          },
          {
            type: 'Entry-Level AI System',
            pn: 'GRANDO-RTX4090x4',
            model: 'Grando RTX 4090 Starter',
            description: '4x RTX 4090 GPUs, AMD EPYC 9374F, 128GB DDR5 ECC, 2TB NVMe storage, desktop form factor'
          },
          {
            type: 'Inference Optimized',
            pn: 'GRANDO-L40Sx6',
            model: 'Grando L40S Inference',
            description: '6x L40S 48GB GPUs, optimized for AI inference workloads, 384GB DDR5 ECC, 6TB NVMe storage'
          },
          {
            type: 'Custom Configuration',
            pn: 'GRANDO-CUSTOM',
            model: 'Custom Grando System',
            description: 'Fully customizable configuration based on specific requirements - contact EudTech for consultation'
          },
          {
            type: 'Support Package',
            pn: 'SUPPORT-PREMIUM',
            model: 'Premium Support',
            description: '24/7 support, on-site service, extended warranty, system optimization services'
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
        "/grando-three-racks.png",
        "/comino-heat-recovery.png"
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
        "/grando-three-racks.png"
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

  const product = products.find(p => p.id === parseInt(id || '1'));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Product Not Found' : '找不到產品'}
          </h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            {isEnglish ? 'Back to Home' : '返回首頁'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {isEnglish ? 'Back to Products' : '返回產品列表'}
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-6">
                {product.icon}
                <h1 className="text-4xl font-bold text-gray-900 ml-4">
                  {product.title}
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8">
                {product.description}
              </p>
              
              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {isEnglish ? 'Key Features' : '主要特色'}
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {isEnglish ? 'Technical Specifications' : '技術規格'}
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {Object.entries(product.specs).map(([key, value], index) => (
                <div 
                  key={index} 
                  className={`p-6 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-gray-900 mr-4">{key}</span>
                    <span className="text-gray-700 text-right">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Description */}
      {product.detailedDescription && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {product.detailedDescription.title}
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8 text-lg">
                {product.detailedDescription.introduction}
              </p>

              {/* Key Features Section */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {isEnglish ? 'Key Features' : '主要特色'}
                </h3>
                <ul className="space-y-3">
                  {product.detailedDescription.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications Table */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {isEnglish ? 'Technical Specifications' : '技術規格'}
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(product.detailedDescription.technicalSpecs).map(([key, value], index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">
                            {key}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Information */}
              {product.detailedDescription.orderInfo && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {isEnglish ? 'Available Configurations' : '可用配置'}
                  </h3>
                  <div className="space-y-4">
                    {product.detailedDescription.orderInfo.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{item.type}</h4>
                        <span className="text-sm text-gray-500">{item.model}</span>
                      </div>
                      {item.pn && (
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">P/N:</span> {item.pn}
                        </p>
                      )}
                      <p className="text-gray-700">{item.description}</p>
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
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {isEnglish ? 'Product Gallery' : '產品圖庫'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.images.map((image, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
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