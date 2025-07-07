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
      title: isEnglish ? 'Comino Grando Multi-GPU Server' : 'Comino Grando 多GPU伺服器',
      description: isEnglish
        ? 'Liquid-cooled multi-GPU servers with up to 8x RTX 4090/H100 GPUs. Designed for extreme performance in AI training, inference, and HPC workloads.'
        : '液冷式多GPU伺服器，最高支援8個RTX 4090/H100 GPU。專為AI訓練、推論和高效能運算工作負載的極致效能而設計。',
      icon: <Server className="h-8 w-8 text-purple-700" />,
      image: "/grando-8gpu-server.jpg",
      features: isEnglish ? [
            'Advanced CoolIT Liquid Cooling',
            'Up to 8x RTX 4090/H100 GPUs',
            'Direct GPU-to-GPU Connection',
            'AMD EPYC 9004 Series CPUs',
            'Up to 1TB DDR5 ECC Memory',
            'NVMe Gen4 Storage'
          ] : [
            '先進CoolIT液冷技術',
            '最高8個RTX 4090/H100 GPU',
            'GPU直連架構',
            'AMD EPYC 9004系列CPU',
            '最高1TB DDR5 ECC記憶體',
            'NVMe Gen4儲存'
          ],
      specs: isEnglish ? {
        'GPU': 'Up to 8x RTX 4090/H100',
        'CPU': 'AMD EPYC 9004 Series',
        'Memory': 'Up to 1TB DDR5 ECC',
        'Storage': 'Up to 32TB NVMe Gen4',
        'Cooling': 'Comino CoolIT Liquid Cooling'
      } : {
        'GPU': '最高8個RTX 4090/H100',
        'CPU': 'AMD EPYC 9004系列',
        '記憶體': '最高1TB DDR5 ECC',
        '儲存': '最高32TB NVMe Gen4',
        '散熱': 'Comino CoolIT 液冷系統'
      },
      comingSoon: false
    },
    {
      id: 6,
      title: isEnglish ? 'Comino Grando Workstation' : 'Comino Grando 工作站',
      description: isEnglish
        ? 'High-performance AI workstation with liquid cooling for deep learning research and development. Perfect for individual researchers and small teams.'
        : '高效能AI工作站，配備液冷系統，專為深度學習研究和開發設計。適合個人研究者和小型團隊使用。',
      icon: <Monitor className="h-8 w-8 text-indigo-700" />,
      image: "/grando-workstation-closed.png",
      features: isEnglish
        ? [
            'Up to 4x RTX 4090 GPUs',
            'Compact Desktop Design',
            'Whisper-Quiet Operation',
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
      comingSoon: false
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
      comingSoon: false
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
      comingSoon: false
    }
  ];

  return (
    <section id="comino-products" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold tracking-wide text-purple-800 uppercase">
            {isEnglish ? 'Comino Products' : 'Comino 產品'}
          </h2>
          <p className="mt-1 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight">
            {isEnglish ? 'Liquid-Cooled AI Computing' : '液冷AI運算'}
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            {isEnglish
              ? 'Revolutionary liquid-cooled systems delivering unprecedented performance for AI and HPC workloads.'
              : '革命性液冷系統，為AI和高效能運算工作負載提供前所未有的效能。'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {cominoProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
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
                        <div className="h-1.5 w-1.5 bg-purple-700 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      {isEnglish ? 'Key Specifications' : '主要規格'}
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
                      className="inline-flex items-center text-sm font-medium text-purple-700 hover:text-purple-800"
                    >
                      {isEnglish ? 'View Details' : '查看詳情'}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                    <a
                      href="#contact"
                      className="inline-flex items-center text-sm font-medium text-purple-700 hover:text-purple-800"
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
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-700 hover:bg-purple-800 transition duration-200"
          >
            {isEnglish ? 'Get Custom Configuration' : '獲取客製配置'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CominoProductsSection;