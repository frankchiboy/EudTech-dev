import React from 'react';
import { Server, Cloud, Shield, Cpu, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EudTechProductsSectionProps {
  isEnglish: boolean;
}

const EudTechProductsSection: React.FC<EudTechProductsSectionProps> = ({ isEnglish }) => {
  const eudtechProducts = [
    {
      id: 1, 
      title: isEnglish ? 'EudTech Select AI Server' : 'EudTech Select AI伺服器',
      description: isEnglish
        ? 'Enterprise-grade AI server with optimized performance for large language models and AI workloads.'
        : '企業級AI伺服器，為大型語言模型和AI工作負載優化效能。',
      icon: <Server className="h-8 w-8 text-blue-800" />,
      image: "/grando-server-main.png",
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
    }
  ];

  return (
    <section id="eudtech-products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold tracking-wide text-blue-800 uppercase">
            {isEnglish ? 'EudTech Solutions' : 'EudTech 解決方案'}
          </h2>
          <p className="mt-1 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight">
            {isEnglish ? 'Our Proprietary Products' : '我們的自有產品'}
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            {isEnglish
              ? 'Innovative AI solutions developed in-house to meet specific industry needs.'
              : '為滿足特定行業需求而內部開發的創新AI解決方案。'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {eudtechProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {product.comingSoon && (
                <div className="bg-blue-800 text-white text-center py-2 text-sm font-medium">
                  {isEnglish ? 'COMING SOON' : '即將推出'}
                </div>
              )}
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  {product.icon}
                  <h3 className="text-xl font-bold mt-2">{product.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {product.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    {!product.comingSoon && (
                      <Link
                        to={`/products/${product.id}`}
                        className="text-blue-800 hover:text-blue-900 font-medium flex items-center"
                      >
                        {isEnglish ? 'Learn More' : '了解更多'}
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    )}
                    <a
                      href="#contact"
                      className="text-blue-800 hover:text-blue-900 font-medium ml-auto"
                    >
                      {isEnglish ? 'Get Quote' : '取得報價'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EudTechProductsSection;