import React from 'react';
import { Server, Cpu, Shield, Cloud, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductsSectionProps {
  isEnglish: boolean;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ isEnglish }) => {
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
    {
      id: 2,
      title: isEnglish ? 'EudTech Cloud AI Desktop' : 'EudTech 雲端AI桌面',
      description: isEnglish
        ? 'On-demand cloud computing resources for AI workloads and applications.'
        : '按需雲端運算資源，專為AI工作負載和應用程式設計。',
      icon: <Cloud className="h-8 w-8 text-teal-700" />,
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
      features: isEnglish
        ? [
            'Scalable GPU Resources',
            'Pay-as-you-go Pricing',
            'Secure Virtual Environments',
            'Instant Deployment',
            '24/7 Support',
            'Global Availability'
          ]
        : [
            '可擴展GPU資源',
            '按使用量計費',
            '安全虛擬環境',
            '即時部署',
            '24/7支援服務',
            '全球可用性'
          ],
      specs: isEnglish ? {
        'Virtual CPU': 'Up to 96 vCPU cores',
        'Memory': 'Up to 384GB RAM',
        'Storage': 'Up to 4TB NVMe',
        'GPU': 'NVIDIA A100/A10G',
        'Network': '25Gbps Network'
      } : {
        '虛擬CPU': '最高96 vCPU核心',
        '記憶體': '最高384GB RAM',
        '儲存': '最高4TB NVMe',
        'GPU': 'NVIDIA A100/A10G',
        '網路': '25Gbps網路'
      },
      comingSoon: true
    },
    {
      id: 3,
      title: isEnglish ? 'EudTech Financial AI System' : 'EudTech 金融AI系統',
      description: isEnglish
        ? 'Specialized AI solutions for financial analysis, forecasting, and risk management.'
        : '專門的AI解決方案，用於金融分析、預測和風險管理。',
      icon: <Shield className="h-8 w-8 text-blue-800" />,
      image: "https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg",
      features: isEnglish
        ? [
            'Real-time Market Analysis',
            'Fraud Detection',
            'Portfolio Optimization',
            'Risk Assessment',
            'Automated Trading',
            'Compliance Monitoring'
          ]
        : [
            '即時市場分析',
            '詐欺偵測',
            '投資組合優化',
            '風險評估',
            '自動交易',
            '合規監控'
          ],
      specs: isEnglish ? {
        'Processing': 'AMD EPYC 7763',
        'Memory': '512GB DDR4 ECC',
        'Storage': '2TB NVMe RAID',
        'Network': '25GbE SFP28',
        'Security': 'Hardware TPM 2.0'
      } : {
        '處理器': 'AMD EPYC 7763',
        '記憶體': '512GB DDR4 ECC',
        '儲存': '2TB NVMe RAID',
        '網路': '25GbE SFP28',
        '安全': '硬體TPM 2.0'
      },
      comingSoon: true
    },
    {
      id: 4, 
      title: isEnglish ? 'EudTech Edge AI Appliance' : 'EudTech 邊緣AI設備',
      description: isEnglish
        ? 'Compact AI processing solution for edge computing and real-time inference.'
        : '緊湊型AI處理解決方案，適用於邊緣運算和即時推論。',
      icon: <Cpu className="h-8 w-8 text-teal-700" />,
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      features: isEnglish
        ? [
            'Low-latency Inference',
            'Compact Form Factor',
            'Energy Efficient',
            'Local Processing',
            'Offline Capability',
            'Easy Integration'
          ]
        : [
            '低延遲推論',
            '緊湊型設計',
            '節能高效',
            '本地處理',
            '離線功能',
            '易於整合'
          ],
      specs: isEnglish ? {
        'Processor': 'Intel Core i7-1265U',
        'Memory': '32GB LPDDR5',
        'Storage': '1TB NVMe SSD',
        'GPU': 'NVIDIA Jetson AGX',
        'Power': '65W TDP'
      } : {
        '處理器': 'Intel Core i7-1265U',
        '記憶體': '32GB LPDDR5',
        '儲存': '1TB NVMe SSD',
        'GPU': 'NVIDIA Jetson AGX',
        '功耗': '65W TDP'
      },
      comingSoon: true
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
      comingSoon: false
    }
  ];

  return (
    <section id="products" className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold tracking-wide text-blue-800 uppercase">
            {isEnglish ? 'Our Products' : '我們的產品'}
          </h2>
          <p className="mt-1 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight">
            {isEnglish ? 'EudTech Products' : 'EudTech 產品'}
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            {isEnglish
              ? 'Professional-grade AI solutions designed for enterprise performance and reliability.'
              : '專業級AI解決方案，為企業效能和可靠性而設計。'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative group bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              {product.comingSoon && (
                <div className="absolute top-4 right-4 bg-blue-800 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {isEnglish ? 'COMING SOON' : '即將推出'}
                </div>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="mb-2">{product.icon}</div>
                    <h3 className="text-2xl font-bold">{product.title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-800 mr-2"></div>
                        <p className="text-sm text-gray-500">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      {isEnglish ? 'Technical Specifications' : '技術規格'}
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-500">{key}</span>
                          <span className="text-gray-900 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <Link
                      to={`/products/${product.id}`}
                      className="inline-flex items-center text-sm font-medium text-blue-800 hover:text-blue-900 transition-colors duration-200"
                    >
                      {isEnglish ? 'View Details' : '查看詳情'}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                    <a
                      href="#contact"
                      className="inline-flex items-center text-sm font-medium text-blue-800 hover:text-blue-900 transition-colors duration-200"
                    >
                      {isEnglish ? 'Request Quote' : '索取報價'}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-900 transition duration-200"
          >
            {isEnglish ? 'Get Custom Quote' : '獲取客製報價'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;