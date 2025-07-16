import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Server, Cpu, Shield, ExternalLink, Star, Check, Zap, Award, Globe, ChevronRight, Heart, Share2, Download } from 'lucide-react';
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
  const [isLiked, setIsLiked] = useState(false);

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
        ? 'Enterprise-grade AI server with optimized performance for large language models and AI workloads. Engineered for maximum efficiency and reliability in production environments.'
        : '企業級AI伺服器，為大型語言模型和AI工作負載優化效能。專為生產環境中的最大效率和可靠性而設計。',
      icon: React.createElement(Server, { className: "h-8 w-8 text-blue-600" }),
      image: "/EudTech-Select-server-front.png.png",
      badge: isEnglish ? 'Enterprise' : '企業級',
      badgeColor: 'bg-blue-100 text-blue-800',
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
      subtitle: isEnglish ? 'Next-Gen Financial Intelligence Platform' : '下一代金融智能平台',
      description: isEnglish
        ? 'FinSight revolutionizes financial analysis by combining raw market data with advanced language models. Experience real-time insights, natural language processing, and intelligent decision support that transforms how financial professionals work.'
        : 'FinSight 透過結合原始市場資料與先進語言模型，革新金融分析。體驗即時洞察、自然語言處理和智能決策支援，改變金融專業人士的工作方式。',
      icon: React.createElement(Shield, { className: "h-8 w-8 text-purple-600" }),
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      badge: isEnglish ? 'AI-Powered' : 'AI驅動',
      badgeColor: 'bg-purple-100 text-purple-800',
      features: isEnglish
        ? [
            'Unified financial data API',
            'Real-time market analysis',
            'Natural language processing',
            'Custom AI assistant',
            'Multi-deployment options',
            'Enterprise security'
          ]
        : [
            '統一金融資料API',
            '即時市場分析',
            '自然語言處理',
            '客製AI助理',
            '多元部署選項',
            '企業級安全'
          ],
      specs: isEnglish ? {
        'Architecture': 'LLM + API Wrapper',
        'Data Sources': 'Real-time market, news, financial statements',
        'Integration': 'RESTful API, Webhook, JSON',
        'Deployment': 'SaaS Cloud / On-Premises',
        'Security': 'Enterprise-grade encryption',
        'Languages': 'English, Traditional Chinese'
      } : {
        '架構': 'LLM + API 包裝器',
        '資料來源': '即時市場、新聞、財務報表',
        '整合': 'RESTful API、Webhook、JSON',
        '部署': 'SaaS雲端 / 本地部署',
        '安全性': '企業級加密',
        '語言': '英文、繁體中文'
      },
      highlights: isEnglish ? [
        'Real-time analysis',
        'Natural language interface',
        'Flexible deployment',
        'Enterprise security'
      ] : [
        '即時分析',
        '自然語言介面',
        '彈性部署',
        '企業安全'
      ],
      comingSoon: false,
      demoUrl: 'https://chatgpt.com/g/g-68708483b9788191935502fc337408eb-finsight'
    },
    {
      id: 5,
      title: isEnglish ? 'Comino Grando Rackable Workstation' : 'Comino Grando 機架式工作站',
      subtitle: isEnglish ? 'Liquid-Cooled Multi-GPU Beast' : '液冷多GPU野獸',
      description: isEnglish
        ? 'The ultimate liquid-cooled workstation engineered for the most demanding AI and HPC tasks. With up to 8 GPUs and revolutionary cooling technology, Grando delivers unmatched performance in a whisper-quiet package.'
        : '專為最苛刻的AI和HPC任務設計的終極液冷工作站。配備最多8個GPU和革命性散熱技術，Grando在極靜音的包裝中提供無與倫比的效能。',
      icon: React.createElement(Server, { className: "h-8 w-8 text-green-600" }),
      image: "/grando-8gpu-server.jpg",
      badge: isEnglish ? 'Liquid-Cooled' : '液冷技術',
      badgeColor: 'bg-green-100 text-green-800',
      features: isEnglish ? [
            'Up to 8x RTX 4090/A100 GPUs',
            'Revolutionary liquid cooling',
            'Whisper-quiet operation',
            'Dual AMD EPYC processors',
            'Up to 2TB DDR5 memory',
            'Tool-free maintenance'
          ] : [
            '最多8個RTX 4090/A100 GPU',
            '革命性液冷技術',
            '極靜音運作',
            '雙AMD EPYC處理器',
            '最多2TB DDR5記憶體',
            '免工具維護'
          ],
      specs: isEnglish ? {
        'GPU': 'Up to 8x RTX 4090/A100',
        'CPU': 'Dual AMD EPYC 9004 Series',
        'Memory': 'Up to 2TB DDR5-4800',
        'Storage': 'Up to 32TB NVMe SSD',
        'Cooling': 'Comino Liquid Cooling System',
        'Power': 'Up to 5.5kW with 94% efficiency'
      } : {
        'GPU': '最多8個RTX 4090/A100',
        'CPU': '雙AMD EPYC 9004系列',
        '記憶體': '最多2TB DDR5-4800',
        '儲存': '最多32TB NVMe SSD',
        '散熱': 'Comino液冷系統',
        '功率': '最高5.5kW，94%效率'
      },
      highlights: isEnglish ? [
        'Liquid cooling mastery',
        'Silent operation',
        'Maximum performance',
        'Enterprise reliability'
      ] : [
        '液冷技術精通',
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
      subtitle: isEnglish ? 'Silent Desktop AI Powerhouse' : '靜音桌面AI強力主機',
      description: isEnglish
        ? 'Transform your workspace with the world\'s most advanced desktop AI workstation. Featuring cutting-edge liquid cooling and up to 6 GPUs, it delivers datacenter-class performance in a surprisingly quiet desktop form factor.'
        : '使用世界上最先進的桌面AI工作站改造您的工作空間。採用尖端液冷技術和最多6個GPU，在令人驚豔的靜音桌面外形中提供數據中心級效能。',
      icon: React.createElement(Server, { className: "h-8 w-8 text-indigo-600" }),
      image: "/grando-workstation-closed.png",
      badge: isEnglish ? 'Desktop' : '桌面型',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      features: isEnglish ? [
            'Up to 6x RTX 5090/A100 GPUs',
            'Ultra-quiet operation <30dB',
            'Compact desktop design',
            'AMD Threadripper PRO 7000',
            'Up to 2TB DDR5 memory',
            'Advanced liquid cooling'
          ] : [
            '最多6個RTX 5090/A100 GPU',
            '超靜音運作低於30dB',
            '緊湊桌面設計',
            'AMD Threadripper PRO 7000',
            '最多2TB DDR5記憶體',
            '先進液冷系統'
          ],
      specs: isEnglish ? {
        'GPU': 'Up to 6x RTX 5090/A100',
        'Processor': 'AMD Threadripper PRO 7000 Series',
        'Memory': 'Up to 2TB DDR5-4800 ECC',
        'Storage': 'Up to 8TB NVMe SSD',
        'Cooling': 'Comino Advanced Liquid Cooling',
        'Noise Level': 'Ultra-quiet <30dB'
      } : {
        'GPU': '最多6個RTX 5090/A100',
        '處理器': 'AMD Threadripper PRO 7000系列',
        '記憶體': '最多2TB DDR5-4800 ECC',
        '儲存': '最多8TB NVMe SSD',
        '散熱': 'Comino先進液冷系統',
        '噪音等級': '超靜音低於30dB'
      },
      highlights: isEnglish ? [
        'Desktop form factor',
        'Whisper-quiet operation',
        'Professional cooling',
        'Plug-and-play setup'
      ] : [
        '桌面外形',
        '極靜音運作',
        '專業散熱',
        '即插即用'
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
    'Architecture': '架構',
    'Data Sources': '資料來源',
    'Integration': '整合',
    'Deployment': '部署',
    'Security': '安全性',
    'Languages': '語言',
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
          <Link to="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            {isEnglish ? 'Back to Home' : '返回首頁'}
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: isEnglish ? 'Overview' : '概覽', icon: <Globe className="h-4 w-4" /> },
    { id: 'specifications', label: isEnglish ? 'Specifications' : '規格', icon: <Cpu className="h-4 w-4" /> },
    ...(product.images && product.images.length > 0 ? [{ id: 'gallery', label: isEnglish ? 'Gallery' : '圖庫', icon: <Star className="h-4 w-4" /> }] : [])
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
        {/* Elegant Hero Section */}
        <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-16">
            {/* Breadcrumb */}
            <Link 
              to="/"
              state={{ fromSection: fromSection }}
              className="inline-flex items-center text-gray-300 hover:text-white transition-all duration-300 mb-8 group bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
              {isEnglish ? 'Back to Products' : '返回產品列表'}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Product Info */}
              <div className="space-y-8">
                {/* Badge and Icons */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="text-blue-400 bg-blue-500/20 p-3 rounded-xl backdrop-blur-sm">
                      {product.icon}
                    </div>
                    <Badge className={`${product.badgeColor} border-0 text-sm font-semibold px-3 py-1`}>
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${isLiked ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-gray-300 hover:text-red-400'}`}
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-300">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Title and Description */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {product.title}
                  </h1>
                  <p className="text-xl text-blue-100 font-medium">
                    {product.subtitle}
                  </p>
                  <p className="text-gray-300 leading-relaxed max-w-lg">
                    {product.description}
                  </p>
                </div>
                
                {/* Highlights */}
                <div className="grid grid-cols-2 gap-4">
                  {product.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-200">{highlight}</span>
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
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      {isEnglish ? 'Try Live Demo' : '體驗即時展示'}
                    </a>
                  )}
                  <button
                    onClick={() => handleNavClick('#contact')}
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 group"
                  >
                    {isEnglish ? 'Get Quote' : '取得報價'}
                    <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Product Image */}
              <div className="relative">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-96 object-contain rounded-2xl"
                  />
                </div>
                
                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-2xl shadow-lg animate-bounce">
                  <Star className="h-6 w-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-2xl shadow-lg animate-pulse">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Elegant Tab Navigation */}
          <div className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2">
              <nav className="flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-12">
                {/* Product Description */}
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {isEnglish ? 'Product Overview' : '產品概覽'}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Special content for FinSight */}
                  {product.id === 3 && (
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-8 mb-8 border border-purple-100 dark:border-purple-800">
                      <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-6 flex items-center">
                        <Award className="h-6 w-6 mr-2" />
                        {isEnglish ? 'Solution Architecture' : '解決方案架構'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="flex items-start space-x-4">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-3 shadow-lg">
                              <Server className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">FinSight-API</h4>
                              <p className="text-sm text-purple-700 dark:text-purple-300">
                                {isEnglish ? 'Unified financial data API with RESTful architecture' : '統一金融資料API，RESTful架構'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-4">
                            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl p-3 shadow-lg">
                              <Cpu className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">FinSight GTP</h4>
                              <p className="text-sm text-purple-700 dark:text-purple-300">
                                {isEnglish ? 'Advanced LLM integration with ChatGPT' : '先進LLM整合，結合ChatGPT'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="flex items-start space-x-4">
                            <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl p-3 shadow-lg">
                              <Globe className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">
                                {isEnglish ? 'Flexible Deployment' : '彈性部署'}
                              </h4>
                              <p className="text-sm text-purple-700 dark:text-purple-300">
                                {isEnglish ? 'SaaS cloud or on-premises deployment options' : 'SaaS雲端或本地部署選項'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-4">
                            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl p-3 shadow-lg">
                              <Shield className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">
                                {isEnglish ? 'Enterprise Security' : '企業安全'}
                              </h4>
                              <p className="text-sm text-purple-700 dark:text-purple-300">
                                {isEnglish ? 'Bank-level security with custom AI assistant' : '銀行級安全性，配備專屬AI助理'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {product.features.map((feature, index) => (
                      <div key={index} className="group">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                          <div className="flex items-start space-x-3">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <Check className="h-4 w-4" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{feature}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">
                        {isEnglish ? 'Technical Specifications' : '技術規格'}
                      </h2>
                      <p className="text-blue-100 mt-2">
                        {isEnglish ? 'Comprehensive technical details and requirements' : '全面的技術細節與需求'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="space-y-4">
                    {Object.entries(product.specs).map(([key, value], index) => (
                      <div key={index} className="group">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                {(index + 1).toString().padStart(2, '0')}
                              </div>
                              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {isEnglish ? key : technicalSpecsTranslations[key] || key}
                              </span>
                            </div>
                            <span className="text-gray-600 dark:text-gray-400 font-medium">
                              {value}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {product.id !== 3 && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-start space-x-3">
                        <div className="bg-yellow-500 text-white rounded-lg p-2">
                          <Star className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                            {isEnglish ? 'Important Note' : '重要提醒'}
                          </h4>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            {isEnglish 
                              ? 'Specifications may vary based on configuration and availability. Our team will provide detailed specifications based on your specific requirements.' 
                              : '規格可能因配置和可用性而異。我們的團隊將根據您的具體需求提供詳細規格。'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && product.images && product.images.length > 0 && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {isEnglish ? 'Product Gallery' : '產品圖庫'}
                      </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {isEnglish ? 'Explore detailed product images and angles' : '探索詳細的產品圖片和角度'}
                    </p>
                  </div>
                  
                  {/* Main Image */}
                  <div className="mb-8">
                    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden shadow-inner">
                      <img
                        src={product.images[selectedImage]}
                        alt={`${product.title} ${selectedImage + 1}`}
                        className="w-full h-96 object-contain"
                      />
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        {selectedImage + 1} / {product.images.length}
                      </div>
                    </div>
                  </div>
                  
                  {/* Thumbnail Navigation */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
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
                            <div className="bg-blue-500 text-white rounded-full p-2">
                              <Check className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Beautiful CTA Section */}
        <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Nmg2di02aC02em02IDZ2Nmg2di02aC02em0tNiA2djZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
            <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {isEnglish ? 'Ready to Transform Your AI Infrastructure?' : '準備改造您的AI基礎設施？'}
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                {isEnglish 
                  ? 'Join thousands of organizations worldwide who trust our cutting-edge AI solutions. Get expert consultation and customized configurations tailored to your specific needs.'
                  : '加入全球數千家信任我們尖端AI解決方案的組織。獲得專家諮詢和針對您特定需求的客製化配置。'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => handleNavClick('#contact')}
                className="group bg-gradient-to-r from-white to-blue-50 text-blue-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
              >
                <span>{isEnglish ? 'Start Your Journey' : '開始您的旅程'}</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <Link
                to="/"
                className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-3"
              >
                <span>{isEnglish ? 'Explore More Products' : '探索更多產品'}</span>
                <Globe className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-blue-200">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4" />
                <span>{isEnglish ? 'Free Consultation' : '免費諮詢'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4" />
                <span>{isEnglish ? 'Custom Solutions' : '客製化解決方案'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4" />
                <span>{isEnglish ? 'Expert Support' : '專家支援'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isEnglish={isEnglish} />
    </>
  );
};

export default ProductDetails;