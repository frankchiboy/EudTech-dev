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
      title: isEnglish ? 'Comino Grando Multi-GPU Server' : 'Comino Grando 多GPU伺服器',
      description: isEnglish
        ? 'Liquid-cooled multi-GPU servers with up to 8x RTX 4090/H100 GPUs. Designed for extreme performance in AI training, inference, and HPC workloads.'
        : '液冷式多GPU伺服器，最高支援8個RTX 4090/H100 GPU。專為AI訓練、推論和高效能運算工作負載的極致效能而設計。',
      icon: <Server className="h-8 w-8 text-purple-700" />,
      image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: isEnglish
            'AMD EPYC 9004 series processors (up to 64 cores)',
            'Up to 1TB DDR5 ECC memory',
            'NVMe Gen4 SSD storage up to 32TB',
            'Redundant 3200W power supplies',
            '10GbE and InfiniBand network options',
            'Authorized Distributor Support'
          ]
            'AMD EPYC 9004系列處理器（最高64核心）',
            '最高1TB DDR5 ECC記憶體',
            'NVMe Gen4 SSD儲存最高32TB',
            '備援3200W電源供應',
            '10GbE和InfiniBand網路選項',
            '授權經銷商支援'
          ],
      specs: isEnglish ? {
        'GPU': 'Up to 8x RTX 4090 or H100',
        'CPU': 'AMD EPYC 9004 Series (up to 64 cores)',
        'Memory': 'Up to 1TB DDR5 ECC',
        'Storage': 'Up to 32TB NVMe Gen4',
        'Cooling': 'CoolIT Liquid Cooling'
      } : {
        'GPU': '最高8個RTX 4090或H100',
        'CPU': 'AMD EPYC 9004系列（最高64核心）',
        '記憶體': '最高1TB DDR5 ECC',
        '儲存': '最高32TB NVMe Gen4',
        '散熱': 'CoolIT液冷系統'
      },
      comingSoon: false,
      images: [
        "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
      } : {
        title: 'Comino Grando AI伺服器系列 - EudTech授權經銷',
        formFactor: '多種機型可選：桌上型、4U機架式、客製化配置',
        introduction: 'EudTech榮幸成為Comino Grando AI伺服器的授權經銷商，提供尖端液冷GPU系統，專為嚴苛的AI、深度學習和高效能運算任務而設計。這些系統提供卓越的計算能力和靈活配置選項，確保並行計算工作負載的最佳效能。採用整合式CoolIT液冷技術，提供強大的可擴展性、可靠性、能源效率和智能維護功能。',
        keyFeatures: [
          '單機架配置最多160個FPGA卡',
          '每機架30kW功耗配備高效散熱',
          '超緊湊4U機箱規格實現最大密度',
          '相容BittWare CVP-13和其他FPGA卡',
          '先進液冷配備熱回收功能',
          '無風扇設計實現靜音運作',
          '免工具維護配備快速接頭',
          '即時熱監控和管理',
          '可擴展架構支援多機架部署',
          '定期維護下15年基礎設施壽命'
          '透過授權經銷商提供專業支援和保固'
        ],
          '產品系列': 'Comino Grando FPGA',
          '外形尺寸': '4U機架式伺服器',
          'FPGA容量': '每機架最多160個FPGA卡',
          '功耗': '每機架最大30kW',
          'FPGA相容性': 'BittWare CVP-13、Intel Stratix 10、Xilinx Alveo',
          '散熱系統': '液冷配備板式熱交換器',
          '熱設計': '無風扇運作，<30dB噪音等級',
          '熱回收': '可加熱最多1100 m²空間',
          '佔地面積': '2 m²（比同等風冷小10倍）',
          '網路': '10GbE、25GbE、100GbE選項',
          '管理': 'IPMI、SNMP、Redfish介面',
          '操作溫度': '環境溫度5°C至35°C',
          '可靠性': '15年基礎設施壽命'
          '保固': '3年製造商保固 + 本地支援'
        },
        orderInfo: [
            type: 'FPGA開發系統',
            pn: 'GRANDO-FPGA-DEV',
            model: 'Grando FPGA Developer',
            description: '32個FPGA卡、BittWare CVP-13、7.5kW功率、液冷系統、開發工具'
          },
          {
            type: '生產FPGA系統',
            pn: 'GRANDO-FPGA-PROD',
            model: 'Grando FPGA Production',
            description: '160個FPGA卡、滿機架配置、30kW功率、熱回收系統'
            description: '8個RTX 4090 GPU、AMD EPYC 9554 64核心CPU、512GB DDR5 ECC、8TB NVMe Gen4 SSD、液冷系統'
          },
            type: 'FPGA叢集',
            pn: 'GRANDO-FPGA-CLUSTER',
            model: 'Grando FPGA Cluster',
            description: '多機架FPGA叢集，最多480個FPGA卡，90kW總功率'
            description: '8個H100 80GB GPU、AMD EPYC 9654 96核心CPU、1TB DDR5 ECC、32TB NVMe儲存'
          },
            type: '基礎設施套件',
            pn: 'GRANDO-FPGA-INFRA',
            model: 'FPGA Infrastructure Kit',
            description: '散熱基礎設施、電力分配、監控、安裝服務'
            'AMD Ryzen Threadripper',
            'Up to 256GB DDR5',
            'Ready for AI Development'
          ]
        : [
            '最高4個RTX 4090 GPU',
            '緊湊桌面設計',
            '超靜音運作',
            'AMD Ryzen Threadripper',
            '最高256GB DDR5',
            'AI開發就緒'
          ],
      specs: isEnglish ? {
        'GPU': 'Up to 4x RTX 4090',
        'CPU': 'AMD Ryzen Threadripper',
        'Memory': 'Up to 256GB DDR5',
        'Storage': 'Up to 8TB NVMe',
        'Form Factor': 'Desktop Tower'
      } : {
        'GPU': '最高4個RTX 4090',
        'CPU': 'AMD Ryzen Threadripper',
        '記憶體': '最高256GB DDR5',
        '儲存': '最高8TB NVMe',
        '機箱規格': '桌面塔式'
      },
      comingSoon: false,
      images: [
        "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      detailedDescription: isEnglish ? {
        title: 'Comino Grando Workstation - AI Development Powerhouse',
        formFactor: 'Compact desktop tower with advanced liquid cooling',
        introduction: 'The Comino Grando Workstation brings enterprise-level AI computing power to the desktop. Designed for researchers, data scientists, and AI developers who need maximum performance in a compact form factor. The advanced liquid cooling system ensures sustained performance while maintaining near-silent operation, making it perfect for office environments.',
        keyFeatures: [
          'Up to 4x NVIDIA RTX 4090 GPUs with full liquid cooling',
          'AMD Ryzen Threadripper PRO processors up to 64 cores',
          'Compact desktop form factor with professional aesthetics',
          'Advanced liquid cooling with custom water blocks',
          'Up to 256GB DDR5 ECC memory support',
          'High-speed NVMe storage up to 8TB capacity',
          'Whisper-quiet operation under full load',
          'Tool-free GPU access for easy upgrades',
          'Multiple display outputs supporting 8K resolution',
          'Pre-configured with AI development frameworks'
        ],
        technicalSpecs: {
          'Product Series': 'Comino Grando Workstation',
          'Form Factor': 'Desktop Tower (600mm x 250mm x 550mm)',
          'GPU Configuration': 'Up to 4x NVIDIA RTX 4090 24GB',
          'CPU Options': 'AMD Ryzen Threadripper PRO (32-64 cores)',
          'Memory': 'Up to 256GB DDR5 ECC (8 slots)',
          'Storage': 'Up to 8TB NVMe Gen4 SSD (4 slots)',
          'Cooling System': 'Custom liquid cooling with external radiator',
          'Power Supply': '2000W 80+ Platinum PSU',
          'Network': 'Dual 10GbE, WiFi 6E, Bluetooth 5.2',
          'I/O Ports': '12x USB 3.2, 4x Thunderbolt 4, 2x HDMI 2.1, 4x DisplayPort 1.4',
          'Operating Temperature': '5°C to 35°C ambient',
          'Noise Level': '<30dB under full load',
          'Software': 'Ubuntu 22.04 LTS, CUDA 12.x, Docker, Jupyter'
        },
        orderInfo: [
          {
            type: 'Developer Configuration',
            pn: 'GRANDO-WS-DEV',
            model: 'Grando Workstation Developer',
            description: '2x RTX 4090, Threadripper PRO 5955WX, 128GB DDR5 ECC, 4TB NVMe, liquid cooling'
          },
          {
            type: 'Research Configuration',
            pn: 'GRANDO-WS-RESEARCH',
            model: 'Grando Workstation Research',
            description: '4x RTX 4090, Threadripper PRO 5975WX, 256GB DDR5 ECC, 8TB NVMe, advanced cooling'
          },
          {
            type: 'Professional Configuration',
            pn: 'GRANDO-WS-PRO',
            model: 'Grando Workstation Pro',
            description: '3x RTX 4090, Threadripper PRO 5965WX, 192GB DDR5 ECC, 6TB NVMe, professional support'
          }
        ]
      } : {
        title: 'Comino Grando 工作站 - AI開發強力機種',
        formFactor: '緊湊桌面塔式配備先進液冷系統',
        introduction: 'Comino Grando工作站將企業級AI運算能力帶到桌面環境。專為研究人員、數據科學家和AI開發者設計，在緊湊機箱中提供最大效能。先進液冷系統確保持續效能，同時保持近乎靜音的運作，非常適合辦公室環境。',
        keyFeatures: [
          '最高4個NVIDIA RTX 4090 GPU配備完整液冷',
          'AMD Ryzen Threadripper PRO處理器最高64核心',
          '緊湊桌面機箱配備專業美學設計',
          '先進液冷系統配備客製化水冷頭',
          '最高256GB DDR5 ECC記憶體支援',
          '高速NVMe儲存最高8TB容量',
          '滿載運作時超靜音表現',
          '免工具GPU存取，便於升級',
          '多顯示輸出支援8K解析度',
          '預配置AI開發框架'
        ],
        technicalSpecs: {
          '產品系列': 'Comino Grando 工作站',
          '外形尺寸': '桌面塔式（600mm x 250mm x 550mm）',
          'GPU配置': '最高4個NVIDIA RTX 4090 24GB',
          'CPU選項': 'AMD Ryzen Threadripper PRO（32-64核心）',
          '記憶體': '最高256GB DDR5 ECC（8插槽）',
          '儲存': '最高8TB NVMe Gen4 SSD（4插槽）',
          '散熱系統': '客製化液冷配備外部散熱器',
          '電源供應': '2000W 80+ 白金級電源',
          '網路': '雙10GbE、WiFi 6E、藍牙5.2',
          'I/O埠': '12個USB 3.2、4個Thunderbolt 4、2個HDMI 2.1、4個DisplayPort 1.4',
          '操作溫度': '環境溫度5°C至35°C',
          '噪音等級': '滿載時<30dB',
          '軟體': 'Ubuntu 22.04 LTS、CUDA 12.x、Docker、Jupyter'
        },
        orderInfo: [
          {
            type: '開發者配置',
            pn: 'GRANDO-WS-DEV',
            model: 'Grando Workstation Developer',
            description: '2個RTX 4090、Threadripper PRO 5955WX、128GB DDR5 ECC、4TB NVMe、液冷系統'
          },
          {
            type: '研究配置',
            pn: 'GRANDO-WS-RESEARCH',
            model: 'Grando Workstation Research',
            description: '4個RTX 4090、Threadripper PRO 5975WX、256GB DDR5 ECC、8TB NVMe、進階散熱'
          },
          {
            type: '專業配置',
            pn: 'GRANDO-WS-PRO',
            model: 'Grando Workstation Pro',
            description: '3個RTX 4090、Threadripper PRO 5965WX、192GB DDR5 ECC、6TB NVMe、專業支援'
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
      image: "https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
        'Capacity': 'Up to 2240 GPUs',
        'Power': 'Up to 500kW',
        'Racks': '13x 19" 48U Racks',
        'Cooling': 'Liquid-to-Liquid Heat Exchanger',
        'Container': '40ft HQ Standard'
      } : {
        '容量': '最多2240個GPU',
        '功率': '最高500kW',
        '機架': '13個19英寸48U機架',
        '散熱': '液-液熱交換器',
        '貨櫃': '40英尺HQ標準'
      },
      comingSoon: false,
      images: [
        "https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      detailedDescription: isEnglish ? {
        title: 'Comino Grando Container - Universal Mobile Data Center',
        formFactor: '40ft High Cube Container (12.192m x 2.438m x 2.896m)',
        introduction: 'The Comino Grando Container represents the fastest possible deployment of a complete data center. This universal mobile data center is designed for liquid-cooled solutions and is available to customers immediately after contract agreement. The container is delivered as a finished product with all main system components pre-installed, tested, and configured during production.',
        keyFeatures: [
          'Houses up to 140 Grando U Blocks (2240 GPUs or FPGAs)',
          'Operates in extreme environments from -30°C to +50°C',
          'Total power capacity up to 500kW with redundant systems',
          '13x 19" 48U racks with liquid cooling manifolds',
          'Two-circuit liquid cooling system (internal and external)',
          'Heat recovery system for energy reuse',
          'Comprehensive automation and monitoring systems',
          'Security systems including access control and CCTV',
          'Network infrastructure with 4x 48-port gigabit switches',
          'Professional installation and commissioning included'
        ],
        technicalSpecs: {
          'Product Series': 'Comino Grando Container',
          'Container Type': '40ft High Cube Standard Container',
          'Dimensions': '12.192m (L) x 2.438m (W) x 2.896m (H)',
          'Maximum Weight': '16 tons gross weight',
          'Rack Equipment': '13x 19" 48U racks with liquid cooling manifolds',
          'Power per Rack': 'Up to 36kW electrical and cooling power',
          'Total Power': 'Up to 500kW with 4x 250A cable inputs',
          'Cooling System': 'Two-circuit liquid cooling (internal/external)',
          'Heat Exchanger': '405,000 kcal/h (471kW) thermal load',
          'Operating Temperature': '-30°C to +50°C ambient',
          'Ventilation': 'Up to 40,000 m³/h filtered air',
          'Network': '4x 48-port gigabit switches, 5e cable system',
          'Security': 'Entry control, fire alarm, CCTV systems',
          'Management': 'Thermal monitoring, automatic control, emergency algorithms'
        },
        orderInfo: [
          {
            type: 'Basic Container',
            pn: 'GRANDO-CONTAINER-BASIC',
            model: 'Grando Container Basic',
            description: 'Complete 40ft container with 10 racks, basic cooling system, power distribution, and monitoring'
          },
          {
            type: 'Enterprise Container',
            pn: 'GRANDO-CONTAINER-ENTERPRISE',
            model: 'Grando Container Enterprise',
            description: 'Full capacity container with 13 racks, advanced cooling, heat recovery, comprehensive monitoring'
          },
          {
            type: 'Custom Container',
            pn: 'GRANDO-CONTAINER-CUSTOM',
            model: 'Grando Container Custom',
            description: 'Fully customizable container configuration based on specific requirements'
          },
          {
            type: 'Installation Package',
            pn: 'GRANDO-INSTALL-PACKAGE',
            model: 'Professional Installation',
            description: 'Site preparation, installation, commissioning, and training services'
          }
        ]
      } : {
        title: 'Comino Grando 移動數據中心 - 通用移動數據中心',
        formFactor: '40英尺高櫃貨櫃（12.192m x 2.438m x 2.896m）',
        introduction: 'Comino Grando貨櫃代表完整數據中心最快速的部署方案。這個通用移動數據中心專為液冷解決方案設計，在合約簽署後立即可供客戶使用。貨櫃作為完成品交付，所有主要系統組件在生產過程中預安裝、測試和配置。',
        keyFeatures: [
          '可容納最多140個Grando U塊（2240個GPU或FPGA）',
          '在-30°C至+50°C極端環境中運作',
          '總功率容量最高500kW配備備援系統',
          '13個19英寸48U機架配備液冷歧管',
          '雙迴路液冷系統（內部和外部）',
          '熱回收系統用於能源再利用',
          '全面自動化和監控系統',
          '安全系統包括出入控制和監視系統',
          '網路基礎設施配備4個48埠千兆交換器',
          '包含專業安裝和調試服務'
        ],
        technicalSpecs: {
          '產品系列': 'Comino Grando 移動數據中心',
          '貨櫃類型': '40英尺高櫃標準貨櫃',
          '尺寸': '12.192m (長) x 2.438m (寬) x 2.896m (高)',
          '最大重量': '16噸總重量',
          '機架設備': '13個19英寸48U機架配備液冷歧管',
          '每機架功率': '最高36kW電力和散熱功率',
          '總功率': '最高500kW配備4個250A電纜輸入',
          '散熱系統': '雙迴路液冷（內部/外部）',
          '熱交換器': '405,000 kcal/h（471kW）熱負載',
          '操作溫度': '環境溫度-30°C至+50°C',
          '通風': '最高40,000 m³/h過濾空氣',
          '網路': '4個48埠千兆交換器，5e纜線系統',
          '安全': '出入控制、火災報警、監視系統',
          '管理': '熱監控、自動控制、緊急演算法'
        },
        orderInfo: [
          {
            type: '基本貨櫃',
            pn: 'GRANDO-CONTAINER-BASIC',
            model: 'Grando Container Basic',
            description: '完整40英尺貨櫃配備10個機架、基本散熱系統、電力分配和監控'
          },
          {
            type: '企業貨櫃',
            pn: 'GRANDO-CONTAINER-ENTERPRISE',
            model: 'Grando Container Enterprise',
            description: '滿載容量貨櫃配備13個機架、先進散熱、熱回收、全面監控'
          },
          {
            type: '客製化貨櫃',
            pn: 'GRANDO-CONTAINER-CUSTOM',
            model: 'Grando Container Custom',
            description: '根據特定需求完全客製化的貨櫃配置'
          },
          {
            type: '安裝服務包',
            pn: 'GRANDO-INSTALL-PACKAGE',
            model: 'Professional Installation',
            description: '場地準備、安裝、調試和培訓服務'
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
      image: "https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
        "https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      detailedDescription: isEnglish ? {
        title: 'Comino Grando FPGA - Ultra-Compact Liquid-Cooled Computing',
        formFactor: '4U Rackmount with advanced liquid cooling system',
        introduction: 'Comino Grando FPGA is the world\'s first ultra-compact liquid-cooled enterprise computing platform with built-in ability to reuse heat. Designed specifically for FPGA processing power, this system allows you to take full advantage of programmable hardware acceleration while maintaining optimal thermal performance and energy efficiency.',
        keyFeatures: [
          'Up to 160 FPGA cards per single rack configuration',
          '30kW power consumption per rack with efficient cooling',
          'Ultra-compact 4U form factor for maximum density',
          'Compatible with BittWare CVP-13 and other FPGA cards',
          'Advanced liquid cooling with heat recovery capabilities',
          'Fanless design for silent operation',
          'Tool-free maintenance with quick-disconnect fittings',
          'Real-time thermal monitoring and management',
          'Scalable architecture for multi-rack deployments',
          '15-year infrastructure lifespan with regular maintenance'
        ],
        technicalSpecs: {
          'Product Series': 'Comino Grando FPGA',
          'Form Factor': '4U Rackmount Server',
          'FPGA Capacity': 'Up to 160 FPGA cards per rack',
          'Power Consumption': '30kW per rack maximum',
          'FPGA Compatibility': 'BittWare CVP-13, Intel Stratix 10, Xilinx Alveo',
          'Cooling System': 'Liquid cooling with plate heat exchangers',
          'Thermal Design': 'Fanless operation, <30dB noise level',
          'Heat Recovery': 'Can heat up to 1100 m² space',
          'Footprint': '2 m² (10x smaller than air cooling equivalent)',
          'Network': '10GbE, 25GbE, 100GbE options',
          'Management': 'IPMI, SNMP, Redfish interfaces',
          'Operating Temperature': '5°C to 35°C ambient',
          'Reliability': '15-year infrastructure lifespan'
        },
        orderInfo: [
          {
            type: 'FPGA Development System',
            pn: 'GRANDO-FPGA-DEV',
            model: 'Grando FPGA Developer',
            description: '32 FPGA cards, BittWare CVP-13, 7.5kW power, liquid cooling, development tools'
          },
          {
            type: 'Production FPGA System',
            pn: 'GRANDO-FPGA-PROD',
            model: 'Grando FPGA Production',
            description: '160 FPGA cards, full rack configuration, 30kW power, heat recovery system'
          },
          {
            type: 'FPGA Cluster',
            pn: 'GRANDO-FPGA-CLUSTER',
            model: 'Grando FPGA Cluster',
            description: 'Multi-rack FPGA cluster with up to 480 FPGA cards, 90kW total power'
          },
          {
            type: 'Infrastructure Kit',
            pn: 'GRANDO-FPGA-INFRA',
            model: 'FPGA Infrastructure Kit',
            description: 'Cooling infrastructure, power distribution, monitoring, installation services'
          }
        ]
      }
        title: 'Comino Grando FPGA - 超緊湊液冷運算',
        formFactor: '4U機架式配備先進液冷系統',
        introduction: 'Comino Grando FPGA是世界上首個超緊湊液冷企業運算平台，具備內建熱能再利用能力。專為FPGA處理能力而設計，該系統讓您能充分利用可程式硬體加速，同時保持最佳熱效能和能源效率。',

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