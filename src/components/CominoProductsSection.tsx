import React from 'react';
import { Server, Cpu, Shield, ChevronRight, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CominoProductsSectionProps {
  isEnglish: boolean;
}

const CominoProductsSection: React.FC<CominoProductsSectionProps> = ({ isEnglish }) => {
  const cominoProducts = [
    {
      id: 5,
      title: isEnglish ? 'Comino Grando Rackable Workstation' : 'Comino Grando 機架式工作站',
      description: isEnglish
        ? 'Hyper Performance Multi-GPU solution for the most advanced and resource intensive computational tasks.'
        : '針對最先進和資源密集型計算任務的超高效能多GPU解決方案。',
      icon: <Server className="h-8 w-8 text-purple-700" />,
      image: "/grando-8gpu-server.jpg",
      features: isEnglish ? [
            'Best Multi-GPU performance for specialists, workgroups and research teams',
            'Easy configurable, maintainable & scalable bleeding edge hardware',
            'Engineered for Silent & Reliable 24/7 operation in harsh environments up to 38°C / 100°F'
          ] : [
            '為專家、工作組和研究團隊提供最佳多GPU效能',
            '易於配置、維護和擴展的尖端硬體',
            '專為惡劣環境設計的靜音可靠24/7運作，溫度高達38°C / 100°F'
          ],
      comingSoon: false
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
        'Cooling': 'Comino Liquid Cooling System'
      } : {
        'GPU': '最高6個RTX 5090/A100',
        'CPU': 'AMD Threadripper PRO',
        '記憶體': '最高2TB DDR5',
        '儲存': '最高8TB NVMe',
        '機箱規格': '桌面塔式',
        '散熱': 'Comino液冷系統'
      },
      comingSoon: false
    },
    {
      id: 7,
      title: isEnglish ? 'Comino Grando Container' : 'Comino Grando 移動數據中心',
      description: isEnglish
        ? 'Universal mobile data center for liquid-cooled solutions. 40ft container housing up to 140 Grando U blocks with 2,240 GPUs total capacity. Operating temperature range: -30°C to +50°C.'
        : '液冷解決方案的通用移動數據中心。40英尺貨櫃可容納最多140個Grando U塊，總共2,240個GPU容量。工作溫度範圍：-30°C至+50°C。',
      icon: <Shield className="h-8 w-8 text-green-700" />,
      image: "/grando-container-closed.png",
      features: isEnglish
        ? [
            'Up to 140 Grando U Blocks',
            '2,240 GPUs total capacity',
            'Operating: -30°C to +50°C',
            '13x 19" 48U Racks',
            'Heat recovery system',
            'Liquid-to-liquid heat exchanger'
          ]
        : [
            '最多140個Grando U塊',
            '總共2,240個GPU容量',
            '操作溫度：-30°C至+50°C',
            '13個19英寸48U機架',
            '熱回收系統',
            '液-液熱交換器'
          ],
      specs: isEnglish ? {
        'Capacity': 'Up to 2,240 GPUs',
        'Power': 'Up to 500kW',
        'Racks': '13x 19" 48U Racks',
        'Cooling': 'Liquid-to-Liquid Heat Exchanger',
        'Container': '40ft HQ Standard',
        'Operating Range': '-30°C to +50°C'
      } : {
        '容量': '最多2,240個GPU',
        '功率': '最高500kW',
        '機架': '13個19英寸48U機架',
        '散熱': '液-液熱交換器',
        '貨櫃': '40英尺HQ標準',
        '操作溫度': '-30°C至+50°C'
      },
      comingSoon: false
    },
    {
      id: 8,
      title: isEnglish ? 'Comino Grando FPGA Solutions' : 'Comino Grando FPGA解決方案',
      description: isEnglish
        ? 'Ultra-compact liquid-cooled FPGA computing platform. Supports up to 160 FPGA per rack with 30kW power consumption in 4U form factor. BittWare CVP-13 compatible.'
        : '超緊湊液冷FPGA運算平台。支援每機架最多160個FPGA，4U機箱規格下功耗30kW。相容BittWare CVP-13。',
      icon: <Cpu className="h-8 w-8 text-orange-700" />,
      image: "/grando-fpga-cards.png",
      features: isEnglish
        ? [
            'Up to 160 FPGA per rack',
            '30kW power per rack',
            '4U form factor',
            'BittWare CVP-13 compatible',
            'Liquid cooling system',
            'Heat recovery capable'
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
        'Compatibility': 'BittWare CVP-13',
        'Heat Recovery': 'Capable'
      } : {
        'FPGA': '每機架最多160個',
        '功率': '每機架30kW',
        '機箱規格': '4U機架式',
        '散熱': '液冷系統',
        '相容性': 'BittWare CVP-13',
        '熱回收': '支援'
      },
      comingSoon: true
    }
  ];

  return (
    <section id="comino-products" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative">
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent dark:from-purple-600/10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold tracking-wide text-comino-600 dark:text-comino-400 uppercase bg-gradient-to-r from-purple-700 to-indigo-500 dark:from-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">
            {isEnglish ? 'Comino Products' : 'Comino 產品'}
          </h2>
          <p className="mt-1 text-4xl font-bold text-neutral-900 dark:text-white sm:text-5xl sm:tracking-tight">
            {isEnglish ? 'Liquid-Cooled AI Computing' : '液冷AI運算'}
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-neutral-500 dark:text-neutral-300">
            {isEnglish
              ? 'Engineered - not just assembled. Grando products are built around liquid cooling technology and tailored for AI inference & training, delivering up to 40% faster performance than air-cooled systems.'
              : '工程設計而非僅僅組裝。Grando產品圍繞液冷技術構建，專為AI推論與訓練量身打造，比氣冷系統提供高達40%的效能提升。'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {cominoProducts.filter(product => !product.comingSoon).map((product) => (
            <div
              key={product.id}
              id={`product-${product.id}`}
              className="bg-white dark:bg-gray-800 bg-gradient-to-br dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-900 rounded-2xl shadow-3d-light dark:shadow-3d-dark overflow-hidden hover:shadow-glow-teal dark:hover:shadow-glow-teal transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.01] border border-neutral-200/80 dark:border-gray-700/50"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="mb-2">{product.icon}</div>
                    <h3 className="text-2xl font-bold">{product.title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-1.5 w-1.5 bg-comino-600 dark:bg-comino-400 rounded-full mr-2"></div>
                        <span className="text-sm text-neutral-600 dark:text-neutral-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-6 relative">
                    <div className="absolute left-0 right-0 h-px top-0 bg-gradient-to-r from-transparent via-purple-500/30 dark:via-purple-400/30 to-transparent"></div>
                    {product.specs && (
                      <>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                          <span className="mr-2 h-4 w-1 bg-gradient-to-b from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-indigo-500 rounded-full"></span>
                          {isEnglish ? 'Key Specifications' : '主要規格'}
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-neutral-500 dark:text-neutral-400">{key}</span>
                              <span className="text-neutral-900 dark:text-neutral-200 font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <Link
                      to={`/products/${product.id}`}
                      state={{ fromSection: `product-${product.id}` }}
                      className="inline-flex items-center text-sm font-medium text-comino-600 dark:text-comino-400 hover:text-comino-700 dark:hover:text-comino-300"
                    >
                      {isEnglish ? 'View Details' : '查看詳情'}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                    <a
                      href="#contact"
                      className="inline-flex items-center text-sm font-medium text-comino-600 dark:text-comino-400 hover:text-comino-700 dark:hover:text-comino-300"
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
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-comino-700 hover:bg-comino-800 transition duration-200"
          >
            {isEnglish ? 'Get Custom Configuration' : '獲取客製配置'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CominoProductsSection;