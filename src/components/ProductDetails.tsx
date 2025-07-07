import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Server, Cpu, Shield, Cloud } from 'lucide-react';

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
      image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg",
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
        "/server-front.png",
        "/server-back.png",
        "/server-inside.png"
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
      id: 5,
      title: isEnglish ? 'Comino Grando AI Server Series' : 'Comino Grando AI伺服器系列',
      description: isEnglish
        ? 'Liquid-cooled multi-GPU servers designed for extreme performance in AI, deep learning, and HPC. EudTech is an authorized distributor of Comino products.'
        : '液冷式多GPU伺服器，專為AI、深度學習和高效能運算提供極致效能。EudTech是Comino產品的授權經銷商。',
      icon: <Server className="h-8 w-8 text-purple-700" />,
      image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: isEnglish
        ? [
            'Comino Liquid Cooling Technology',
            'Up to 8x RTX 4090/H100 GPUs',
            'AMD EPYC 9004 / Intel Xeon Support',
            'Up to 2TB DDR5 ECC Memory',
            'Multiple Configuration Options',
            'Authorized Distributor Support'
          ]
        : [
            'Comino液冷技術',
            '最高8個RTX 4090/H100 GPU',
            'AMD EPYC 9004 / Intel Xeon支援',
            '最高2TB DDR5 ECC記憶體',
            '多種配置選項',
            '授權經銷商支援'
          ],
      specs: isEnglish ? {
        'GPU Options': 'RTX 4090, RTX 6000 Ada, H100, L40S',
        'CPU Platform': 'AMD EPYC 9004 / Intel Xeon W',
        'Memory': 'Up to 2TB DDR5 ECC',
        'Storage': 'Up to 64TB NVMe Gen4',
        'Cooling': 'Comino CoolIT Liquid Cooling'
      } : {
        'GPU選項': 'RTX 4090, RTX 6000 Ada, H100, L40S',
        'CPU平台': 'AMD EPYC 9004 / Intel Xeon W',
        '記憶體': '最高2TB DDR5',
        '儲存': '最高64TB NVMe Gen4',
        '散熱': 'Comino CoolIT 液冷系統'
      },
      comingSoon: false,
      images: [
        "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      detailedDescription: isEnglish ? {
        title: 'Comino Grando AI Server Series - Authorized Distribution by EudTech',
        formFactor: 'Multiple form factors available: Desktop, 4U Rack, Custom configurations',
        introduction: 'EudTech is proud to be an authorized distributor of Comino Grando AI servers, offering cutting-edge liquid-cooled GPU systems designed for demanding AI, deep learning, and high-performance computing tasks. These systems deliver exceptional computing power with flexible configurations, ensuring optimal performance for parallel computing workloads. With integrated CoolIT liquid cooling technology, they provide robust scalability, reliability, energy efficiency, and intelligent maintenance capabilities.',
        keyFeatures: [
          'Multiple GPU Options: RTX 4090, RTX 6000 Ada Generation, H100, L40S, and more',
          'Comino CoolIT liquid cooling system with self-diagnostic capabilities',
          'Full-coverage waterblocks for optimal thermal management',
          'Support for AMD EPYC 9004 series and Intel Xeon W processors',
          'Memory configurations from 64GB to 2TB DDR5 ECC',
          'Storage options up to 64TB NVMe Gen4 SSD',
          'Redundant power supply configurations available',
          'Multiple network connectivity options including 10GbE and InfiniBand',
          'Desktop, rack-mount, and custom form factor options',
          'Professional support and warranty through authorized distributor'
        ],
        technicalSpecs: {
          'Product Series': 'Comino Grando AI Server Series',
          'Form Factor': 'Desktop, 4U Rack-mount, Custom configurations',
          'GPU Options': 'NVIDIA RTX 4090 (16,384 CUDA cores), RTX 6000 Ada (18,176 CUDA cores), H100 (16,896 CUDA cores), L40S (18,176 CUDA cores)',
          'GPU Quantity': 'Up to 8 GPUs per system',
          'CPU Options': 'AMD EPYC 9004 series (up to 96 cores), Intel Xeon W series',
          'Memory': '64GB to 2TB DDR5 ECC (supports up to 4800 MT/s)',
          'Storage': 'NVMe Gen4 SSD up to 64TB total capacity',
          'Network': '1GbE, 10GbE, 25GbE, InfiniBand options',
          'Cooling': 'Comino CoolIT liquid cooling with full-coverage blocks',
          'Power': 'Redundant PSU configurations from 1600W to 4000W',
          'Management': 'IPMI, BMC, CMS remote management',
          'Operating Systems': 'Ubuntu, CentOS, RHEL, Windows Server, Custom Linux distributions',
          'Certifications': 'CE, FCC, RoHS compliant',
          'Warranty': '3-year manufacturer warranty + local support'
        },
        orderInfo: [
          {
            type: 'High-Performance Configuration',
            pn: 'GRANDO-RTX4090x8',
            model: 'Grando DPR 4090-FT/8',
            description: '8x RTX 4090 GPUs, AMD EPYC 9554 64-core CPU, 512GB DDR5 ECC, 8TB NVMe Gen4 SSD, liquid cooling'
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
      } : {
        title: 'Comino Grando AI伺服器系列 - EudTech授權經銷',
        formFactor: '多種機型可選：桌上型、4U機架式、客製化配置',
        introduction: 'EudTech榮幸成為Comino Grando AI伺服器的授權經銷商，提供尖端液冷GPU系統，專為嚴苛的AI、深度學習和高效能運算任務而設計。這些系統提供卓越的計算能力和靈活配置選項，確保並行計算工作負載的最佳效能。採用整合式CoolIT液冷技術，提供強大的可擴展性、可靠性、能源效率和智能維護功能。',
        keyFeatures: [
          '多種GPU選項：RTX 4090、RTX 6000 Ada世代、H100、L40S等',
          'Comino CoolIT液冷系統，具備自我診斷功能',
          '全覆蓋水冷頭，實現最佳散熱管理',
          '支援AMD EPYC 9004系列和Intel Xeon W處理器',
          '記憶體配置從64GB到2TB DDR5 ECC',
          '儲存選項最高64TB NVMe Gen4 SSD',
          '可選備援電源供應配置',
          '多種網路連接選項，包括10GbE和InfiniBand',
          '桌上型、機架式和客製化機型選項',
          '透過授權經銷商提供專業支援和保固'
        ],
        technicalSpecs: {
          '產品系列': 'Comino Grando AI伺服器系列',
          '外形尺寸': '桌上型、4U機架式、客製化配置',
          'GPU選項': 'NVIDIA RTX 4090（16,384 CUDA核心）、RTX 6000 Ada（18,176 CUDA核心）、H100（16,896 CUDA核心）、L40S（18,176 CUDA核心）',
          'GPU數量': '每系統最多8個GPU',
          'CPU選項': 'AMD EPYC 9004系列（最高96核心）、Intel Xeon W系列',
          '記憶體': '64GB至2TB DDR5 ECC（支援最高4800 MT/s）',
          '儲存': 'NVMe Gen4 SSD最高64TB總容量',
          '網路': '1GbE、10GbE、25GbE、InfiniBand選項',
          '散熱': 'Comino CoolIT液冷系統，配備全覆蓋冷卻塊',
          '電源': '備援電源供應配置，從1600W到4000W',
          '管理': 'IPMI、BMC、CMS遠端管理',
          '作業系統': 'Ubuntu、CentOS、RHEL、Windows Server、客製化Linux發行版',
          '認證': 'CE、FCC、RoHS合規',
          '保固': '3年製造商保固 + 本地支援'
        },
        orderInfo: [
          {
            type: '高效能配置',
            pn: 'GRANDO-RTX4090x8',
            model: 'Grando DPR 4090-FT/8',
            description: '8個RTX 4090 GPU、AMD EPYC 9554 64核心CPU、512GB DDR5 ECC、8TB NVMe Gen4 SSD、液冷系統'
          },
          {
            type: '企業AI配置',
            pn: 'GRANDO-H100x8',
            model: 'Grando H100 Enterprise',
            description: '8個H100 SXM5 80GB GPU、AMD EPYC 9654 96核心CPU、1TB DDR5 ECC、16TB NVMe儲存、進階散熱'
          },
          {
            type: '專業工作站',
            pn: 'GRANDO-RTX6000x4',
            model: 'Grando RTX 6000 Ada Pro',
            description: '4個RTX 6000 Ada 48GB GPU、Intel Xeon W-3435X、256GB DDR5 ECC、4TB NVMe儲存'
          },
          {
            type: '入門級AI系統',
            pn: 'GRANDO-RTX4090x4',
            model: 'Grando RTX 4090 Starter',
            description: '4個RTX 4090 GPU、AMD EPYC 9374F、128GB DDR5 ECC、2TB NVMe儲存、桌上型機型'
          },
          {
            type: '推論優化型',
            pn: 'GRANDO-L40Sx6',
            model: 'Grando L40S Inference',
            description: '6個L40S 48GB GPU，專為AI推論工作負載優化，384GB DDR5 ECC、6TB NVMe儲存'
          },
          {
            type: '客製化配置',
            pn: 'GRANDO-CUSTOM',
            model: '客製化Grando系統',
            description: '根據特定需求完全客製化配置 - 請聯繫EudTech進行諮詢'
          },
          {
            type: '支援服務包',
            pn: 'SUPPORT-PREMIUM',
            model: '頂級支援',
            description: '24/7支援、現場服務、延長保固、系統優化服務'
          }
        ]
      }
    },
    // ... other products data
  ];

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Product not found' : '找不到產品'}
          </h2>
          <Link
            to="/"
            className="inline-flex items-center text-blue-800 hover:text-blue-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {isEnglish ? 'Back to Home' : '返回首頁'}
          </Link>
        </div>
      </div>
    );
  }

  const detailedDescription = product.detailedDescription;

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-blue-800 hover:text-blue-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {isEnglish ? 'Back to Products' : '返回產品列表'}
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-96">
            <img
              src={product.image}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <div className="mb-4">{product.icon}</div>
              <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
              <p className="text-lg text-gray-200">{product.description}</p>
            </div>
          </div>

          <div className="p-8">
            {/* Product Title and Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? 'Technical Specifications' : '技術規格'}
              </h2>
              <p className="text-lg text-gray-700 mb-2">
                {detailedDescription.formFactor}
              </p>
              <p className="text-gray-600">
                {detailedDescription.introduction}
              </p>
            </div>

            {/* Key Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {isEnglish ? 'Key Features' : '主要特點'}
              </h2>
              <div className="space-y-4">
                {detailedDescription.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-800 mt-2.5 mr-3"></div>
                    <p className="text-gray-600">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {isEnglish ? 'Product Images' : '產品圖片'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {product.images.map((img, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={img} 
                      alt={`${product.title} - ${index + 1}`} 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {isEnglish ? 'Technical Specifications' : '技術規格'}
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-4">
                  {Object.entries(detailedDescription.technicalSpecs).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:justify-between pb-4 border-b border-gray-200">
                      <span className="text-gray-600 font-medium sm:w-1/3">{key}</span>
                      <span className="text-gray-900 sm:w-2/3 whitespace-pre-line">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-6">
                {isEnglish 
                  ? 'For detailed specifications and customization options, please contact our sales team.' 
                  : '如需詳細規格和客製化選項，請聯繫我們的銷售團隊。'}
              </p>
            </div>

            <div className="mt-12 text-center">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/#contact';
                }}
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-900 transition duration-200"
              >
                {isEnglish ? 'Contact Us' : '聯絡我們'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;