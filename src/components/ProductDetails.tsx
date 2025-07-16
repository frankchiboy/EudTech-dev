import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Server, Cpu, Shield, ExternalLink, Star, Check, Zap, Award, Globe } from 'lucide-react';
import { useThemeContext } from '../contexts/ThemeContext';
import { useLanguageContext } from '../contexts/LanguageContext';
import { handleNavClick } from '../utils/helpers/navigation';
import NavBar from './navigation/NavBar';
import Footer from './Footer';
import Badge from './ui/Badge';

const ProductDetails: React.FC = () => {
  const { themeMode, isDarkModeActive, toggleDarkMode } = useThemeContext();
  const { isEnglish, toggleLanguage } = useLanguageContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const { id } = useParams();
  const location = useLocation();
  
  // 取得來源區塊資訊，預設為 eudtech-products
  const fromSection = location.state?.fromSection || 'eudtech-products';
  
  const products = [
    {
      id: 1, 
      title: isEnglish ? 'EudTech Select AI Server' : 'EudTech Select AI伺服器',
      subtitle: isEnglish ? 'Enterprise-Grade AI Computing Platform' : '企業級AI運算平台',
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
      highlights: isEnglish ? [
        'Best-in-class AI performance',
        'Enterprise reliability',
        'Scalable architecture',
        'Energy efficient design'
      ] : [
        '頂級AI效能',
        '企業級可靠性',
        '可擴展架構',
        '節能設計'
      ],
      comingSoon: false
    },
    {
      id: 3,
      title: isEnglish ? 'FinSight Financial AI System' : 'FinSight 金融AI系統',
      subtitle: isEnglish ? 'Financial Data Intelligence Platform' : '金融資料智能平台',
      description: isEnglish
        ? 'FinSight is a financial language understanding and data processing framework. By combining raw financial data with LLMs, it provides natural, real-time, and flexible explanations and decision support.'
        : 'FinSight 是一套金融語言理解與資料處理的概念架構，將金融原始數據結合語言模型（LLM），提供更自然、即時、彈性的解釋與輔助決策能力。',
      icon: React.createElement(Shield, { className: "h-8 w-8 text-blue-800" }),
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
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
            'FinSight-API：金融資料整合API',
            'RESTful API，SaaS雲端或本地端',
            'FinSight GTP：語言模型互動展示',
            'LLM可執行：指標解釋、趨勢預測',
            '高度彈性延伸架構',
            '企業顧問與專屬GPT助理'
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
      highlights: isEnglish ? [
        'Real-time financial analysis',
        'Natural language processing',
        'Flexible deployment options',
        'Enterprise-grade security'
      ] : [
        '即時金融分析',
        '自然語言處理',
        '彈性部署選項',
        '企業級安全性'
      ],
      comingSoon: false,
      demoUrl: 'https://chatgpt.com/g/g-68708483b9788191935502fc337408eb-finsight'
    },
    {
      id: 5,
      title: isEnglish ? 'Comino Grando Rackable Workstation' : 'Comino Grando 機架式工作站',
      subtitle: isEnglish ? 'Hyper Performance Multi-GPU Solution' : '超高效能多GPU解決方案',
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
      highlights: isEnglish ? [
        'Liquid cooling technology',
        'Silent operation',
        'Maximum performance',
        'Enterprise reliability'
      ] : [
        '液冷技術',
        '靜音運作',
        '最大效能',
        '企業可靠性'
      ],
      comingSoon: false,
      images: [
        "/grando-8gpu-server.jpg",
        "/comino-h100-server.jpg",
        "/comino-h100-front.jpg"
      ]
    },
    {
      id: 6,
      title: isEnglish ? 'Comino Grando Workstation' : 'Comino Grando 工作站',
      subtitle: isEnglish ? 'Silent Desktop AI Workstation' : '靜音桌面AI工作站',
      description: isEnglish
        ? 'A desktop/tower workstation for deep learning research and creative professionals, offering multi-GPU power and ultra-quiet operation.'
        : '用於深度學習研究和專業創作的桌面型工作站，適合工作組和高階專業人士，提供所有你需要的多GPU效能。',
      icon: React.createElement(Server, { className: "h-8 w-8 text-purple-700" }),
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
        'Noise Level': '<30dB'
      } : {
        'GPU': '最高6張RTX 5090/A100',
        '處理器': 'AMD Threadripper PRO 7000系列',
        '記憶體': '最高2TB DDR5-4800',
        '儲存': '最高8TB NVMe SSD',
        '散熱': 'Comino液冷系統',
        '噪音等級': '低於30dB'
      },
      highlights: isEnglish ? [
        'Silent operation',
        'Desktop form factor',
        'Professional cooling',
        'Tool-free maintenance'
      ] : [
        '靜音運作',
        '桌面機規格',
        '專業散熱',
        '免工具維護'
      ],
      comingSoon: false,
      images: [
        "/grando-workstation-closed.png",
        "/grando-workstation-open.png",
        "/comino-workstation-front.png"
      ]
    }
  ];

  const technicalSpecsTranslations: Record<string, string> = {
    'Processing': '處理器',
    'Memory': '記憶體',
    'Storage': '儲存',
    'GPU': 'GPU',
    'Network': '網路',
    'Power': '電源',
    'Cooling': '散熱',
    'Form Factor': '機箱規格',
    'Processor': '處理器',
    'Model': '模型架構',
    'Data Sources': '資料來源',
    'Integration': '整合模式',
    'Deployment': '部署方式',
    'CPU': '處理器',
    'Noise Level': '噪音等級'
  };

  const parsedId = parseInt(id || '1');
  const product = products.find(p => p.id === parsedId);

  if (!product) {
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

  const tabs = [
    { id: 'overview', label: isEnglish ? 'Overview' : '概覽' },
    { id: 'specifications', label: isEnglish ? 'Specifications' : '規格' },
    ...(product.images && product.images.length > 0 ? [{ id: 'gallery', label: isEnglish ? 'Gallery' : '圖庫' }] : [])
  ];

  return (
    <>
      <NavBar 
        isEnglish={isEnglish}
        toggleLanguage={toggleLanguage}
        themeMode={themeMode}
        isDarkMode={isDarkModeActive}
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Nmg2di02aC02em02IDZ2Nmg2di02aC02em0tNiA2djZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-16">
            {/* Breadcrumb */}
            <Link 
              to="/"
              state={{ fromSection: fromSection }}
              className="inline-flex items-center text-blue-200 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
              {isEnglish ? 'Back to Products' : '返回產品列表'}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Product Info */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="text-blue-300 mr-3">
                    {product.icon}
                  </div>
                  <Badge variant="info" className="bg-blue-500/20 text-blue-100 border-blue-400/30">
                    {product.comingSoon ? (isEnglish ? 'Coming Soon' : '即將推出') : (isEnglish ? 'Available Now' : '現已推出')}
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {product.title}
                </h1>
                
                <p className="text-xl text-blue-100 mb-6 font-medium">
                  {product.subtitle}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {product.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-300 mr-2 flex-shrink-0" />
                      <span className="text-sm text-blue-100">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {product.id === 3 && product.demoUrl && (
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      {isEnglish ? 'Try Demo' : '體驗展示'}
                    </a>
                  )}
                  <button
                    onClick={() => handleNavClick('#contact')}
                    className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300"
                  >
                    {isEnglish ? 'Get Quote' : '取得報價'}
                  </button>
                </div>
              </div>

              {/* Product Image */}
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-80 object-contain rounded-xl"
                  />
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 p-3 rounded-full shadow-lg">
                  <Star className="h-6 w-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-400 text-green-900 p-3 rounded-full shadow-lg">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[500px]">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-12">
                {/* Product Description */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {isEnglish ? 'Product Overview' : '產品概覽'}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Special content for FinSight */}
                  {product.id === 3 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-8">
                      <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
                        {isEnglish ? 'Solution Architecture' : '解決方案架構'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="bg-blue-500 text-white rounded-full p-2 mr-3 mt-1">
                              <Server className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-900 dark:text-blue-100">FinSight-API</h4>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                {isEnglish ? 'Unified financial data API with RESTful design' : '統一金融資料API，RESTful設計'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-green-500 text-white rounded-full p-2 mr-3 mt-1">
                              <Cpu className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-900 dark:text-blue-100">FinSight GTP</h4>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                {isEnglish ? 'LLM interaction demo with ChatGPT integration' : 'LLM互動展示，整合ChatGPT'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="bg-purple-500 text-white rounded-full p-2 mr-3 mt-1">
                              <Globe className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                                {isEnglish ? 'Multi-deployment' : '多元部署'}
                              </h4>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                {isEnglish ? 'SaaS cloud or on-premises options' : 'SaaS雲端或本地端選項'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-orange-500 text-white rounded-full p-2 mr-3 mt-1">
                              <Award className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                                {isEnglish ? 'Enterprise Services' : '企業服務'}
                              </h4>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                {isEnglish ? 'Custom GPT assistant and consulting' : '專屬GPT助理與顧問服務'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <div className="bg-blue-500 text-white rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                  <h2 className="text-2xl font-bold">
                    {isEnglish ? 'Technical Specifications' : '技術規格'}
                  </h2>
                  <p className="text-blue-100 mt-2">
                    {isEnglish ? 'Detailed technical specifications and requirements' : '詳細技術規格與需求'}
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {Object.entries(product.specs).map(([key, value], index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="py-4 px-6 text-sm font-semibold text-gray-900 dark:text-gray-100 w-1/3 bg-gray-50 dark:bg-gray-700">
                              {isEnglish ? key : technicalSpecsTranslations[key] || key}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {product.id !== 3 && (
                    <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>{isEnglish ? 'Note:' : '注意：'}</strong> {isEnglish 
                          ? 'Specifications may vary based on configuration. Contact our team for detailed information.' 
                          : '規格可能因配置而異。請聯繫我們的團隊獲取詳細資訊。'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && product.images && product.images.length > 0 && (
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    {isEnglish ? 'Product Gallery' : '產品圖庫'}
                  </h2>
                  
                  {/* Main Image */}
                  <div className="mb-6">
                    <div className="relative bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-inner">
                      <img
                        src={product.images[selectedImage]}
                        alt={`${product.title} ${selectedImage + 1}`}
                        className="w-full h-96 object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Thumbnail Navigation */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                          selectedImage === index
                            ? 'ring-4 ring-blue-500 shadow-lg'
                            : 'ring-2 ring-gray-200 dark:ring-gray-600 hover:ring-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.title} thumbnail ${index + 1}`}
                          className="w-full h-24 object-contain bg-gray-50 dark:bg-gray-700"
                        />
                        {selectedImage === index && (
                          <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                            <Check className="h-6 w-6 text-blue-600" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">
              {isEnglish ? 'Ready to Get Started?' : '準備開始了嗎？'}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {isEnglish 
                ? 'Contact our team to discuss your specific requirements and get a customized solution.'
                : '聯絡我們的團隊討論您的具體需求，獲取客製化解決方案。'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleNavClick('#contact')}
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              >
                {isEnglish ? 'Contact Sales' : '聯絡業務'}
              </button>
              <Link
                to="/"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                {isEnglish ? 'View All Products' : '查看所有產品'}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isEnglish={isEnglish} />
    </>
  );
};

export default ProductDetails;