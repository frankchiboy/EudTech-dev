import React, { useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Server, Cpu, Shield } from 'lucide-react';
import { useLanguageContext } from '../contexts/LanguageContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { handleNavClick } from '../utils/helpers/navigation';
import NavBar from './navigation/NavBar';
import Footer from './Footer';
import { getEudTechProducts, getCominoProducts } from '../data/productData';
import { technicalSpecsTranslations } from './productUtils';
import ProductAdditionalFeatures from './ProductAdditionalFeatures';
import ProductImageGallery from './ProductImageGallery';
import ProductSpecifications from './ProductSpecifications';
import FinSightPayPalSection from './FinSightPayPalSection';
import ProductTechnicalSpecs from './ProductTechnicalSpecs';
import LazyImage from './common/LazyImage';

const ProductDetails: React.FC = () => {
  const { isEnglish, setLanguage } = useLanguageContext();
  const { themeMode, isDarkModeActive, toggleDarkMode } = useThemeContext();
  const { toggleLanguage } = useLanguageContext();

  const { id } = useParams();
  const location = useLocation();
  const productId = parseInt(id || '0');
  // 取得產品資料
  const eudTechProducts = getEudTechProducts(isEnglish);
  const cominoProducts = getCominoProducts(isEnglish);
  const allProducts = [...eudTechProducts, ...cominoProducts];
  const product = allProducts.find(p => p.id === productId);

  // FinSight 產品語言控制邏輯
  const hasSetLanguage = useRef(false);
  useEffect(() => {
    // 只在組件首次掛載且尚未設定語言時執行
    if (!hasSetLanguage.current && productId === 3) {
      const fromHome = location.state?.fromHome;
      
      // 如果不是從首頁進入（直接進入或外部連結），設定為英文
      if (!fromHome) {
        setLanguage('en');
      }
      // 如果是從首頁進入，保持當前語言設定
      
      hasSetLanguage.current = true;
    }
  }, [productId, location.state, setLanguage]);

  if (!product) {
    console.log("Product not found!");
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {isEnglish ? 'Product Not Found' : '找不到產品'} (ID: {productId})
          </h1>
          <Link to="/" className="text-eudtech-600 hover:text-eudtech-700 dark:text-eudtech-400 dark:hover:text-eudtech-300">
            {isEnglish ? 'Back to Home' : '返回首頁'}
          </Link>
        </div>
      </div>
    );
  }

  // 在渲染時動態生成 JSX 元件
  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'server': return <Server className="h-8 w-8 text-blue-800" />;
      case 'cpu': return <Cpu className="h-8 w-8 text-orange-700" />;
      case 'shield': return <Shield className="h-8 w-8 text-green-700" />;
      default: return null;
    }
  };

  return (
    <>
      <NavBar 
        isEnglish={isEnglish}
        toggleLanguage={toggleLanguage}
        themeMode={themeMode}
        isDarkMode={isDarkModeActive}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900 overflow-x-hidden pt-16">
      {/* Product Header */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Back Button */}
          <button
            onClick={() => {
              // 返回到具體的產品卡片位置
              window.location.href = `/#product-card-${productId}`;
            }}
            className="inline-flex items-center text-eudtech-600 hover:text-eudtech-700 dark:text-eudtech-400 dark:hover:text-eudtech-300 transition-colors mb-8 group cursor-pointer bg-transparent border-none"
          >
            <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
            {isEnglish ? 'Back to Products' : '返回產品列表'}
          </button>
          
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
              {product.id === 3 ? (
                <div className="mb-8">
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    <span className="font-bold text-eudtech-700 dark:text-eudtech-400 block mb-2">
                      {isEnglish ? 'What is FinSight' : '什麼是 FinSight'}
                    </span>
                    {product.description}
                  </p>
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-neo-light dark:shadow-neo-dark">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 text-center">
                      {isEnglish ? 'Solution Highlights' : '解決方案亮點'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* API 模組 */}
                      <div className="bg-white dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <h4 className="font-semibold text-eudtech-700 dark:text-eudtech-400 mb-2 text-lg">
                          {isEnglish ? 'FinSight-API' : 'FinSight-API'}
                        </h4>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                          {isEnglish
                            ? 'Unified financial data API with technical indicators, price history, and extensible support for news, macro, and financial data. RESTful design enables easy integration for LLMs and enterprise systems.'
                            : '金融資料整合API，包含技術指標、價格歷史，可擴充新聞、總經、財報資料。RESTful設計讓LLM與企業系統輕鬆整合。'}
                        </p>
                      </div>
                      
                      {/* GTP MVP 模組 */}
                      <div className="bg-white dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <h4 className="font-semibold text-eudtech-700 dark:text-eudtech-400 mb-2 text-lg">
                          {isEnglish ? 'FinSight GTP' : 'FinSight GTP'}
                        </h4>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                          {isEnglish
                            ? 'MVP demonstration system for LLM interaction, supporting ChatGPT Plugin, Hugging Face, and local LLM deployments.'
                            : '語言模型互動展示系統，支援ChatGPT Plugin、Hugging Face及本地LLM部署。'}
                        </p>
                      </div>
                      
                      {/* LLM 應用任務 */}
                      <div className="bg-white dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <h4 className="font-semibold text-eudtech-700 dark:text-eudtech-400 mb-2 text-lg">
                          {isEnglish ? 'LLM Applications' : 'LLM 應用功能'}
                        </h4>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                          {isEnglish
                            ? 'Comprehensive LLM capabilities including indicator explanation, trend prediction, automated reporting, charting, strategy simulation, and custom GPT development.'
                            : '完整LLM功能包含指標解釋、趨勢預測、自動報告、圖表生成、策略模擬及專屬GPT開發。'}
                        </p>
                      </div>
                      
                      {/* 彈性與企業服務 */}
                      <div className="bg-white dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <h4 className="font-semibold text-eudtech-700 dark:text-eudtech-400 mb-2 text-lg">
                          {isEnglish ? 'Enterprise Services' : '企業服務'}
                        </h4>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                          {isEnglish
                            ? 'Highly extensible architecture supporting custom data sources, internal API integration, private LLM deployment, multi-role/multi-language support, and dedicated GPT assistant development.'
                            : '高度彈性架構支援客製資料源、內部API整合、私有LLM部署、多角色多語系及專屬GPT助理開發。'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {product.description}
                  </p>
                  {/* Key Features */}
                  <div className="mb-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-neo-light dark:shadow-neo-dark">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 text-center">
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
              )}
            </div>
            {/* CTA 行動按鈕 */}
            {product.id === 3 && (
              <div className="flex flex-col items-center mt-8">
                {/* 產品圖片 */}
                <div className="flex justify-center items-center overflow-hidden rounded-xl shadow-3d-light dark:shadow-3d-dark group relative mb-6">
                  <div className="w-full aspect-[16/9] overflow-hidden relative">
                    <LazyImage 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover object-center bg-gray-50 dark:bg-gray-700 rounded-lg transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/20 to-transparent dark:from-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  </div>
                </div>
                <div className="mb-2 text-base text-gray-700 dark:text-gray-300 text-center">
                  {isEnglish
                    ? 'Experience the FinSightGTP demo (MVP) to see how LLMs interact with real financial data.'
                    : '立即體驗 FinSightGTP（MVP），感受語言模型與金融資料的互動應用。'}
                </div>
                <a
                  href="https://chatgpt.com/g/g-68708483b9788191935502fc337408eb-finsight"
                  className="inline-block px-8 py-3 mb-3 rounded-lg bg-eudtech-600 text-white font-semibold shadow-lg hover:bg-eudtech-700 transition-colors text-lg"
                  target="_blank" rel="noopener noreferrer"
                >
                  {isEnglish ? 'FinSightGTP Demo' : 'FinSightGTP體驗'}
                </a>
                <button
                  type="button"
                  className="inline-block px-8 py-3 rounded-lg border border-eudtech-600 text-eudtech-600 font-semibold hover:bg-eudtech-50 dark:hover:bg-gray-800 transition-colors text-lg cursor-pointer bg-transparent"
                  onClick={() => {
                    handleNavClick('#contact');
                  }}
                >
                  {isEnglish ? 'Contact Us' : '聯絡我們'}
                </button>
              </div>
            )}

            {product.id !== 3 && (
              <div className="flex justify-center items-center overflow-hidden rounded-xl shadow-3d-light dark:shadow-3d-dark group relative">
                <div className="w-full aspect-[16/9] overflow-hidden relative">
                  <LazyImage 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover object-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/20 to-transparent dark:from-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white">{product.title}</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PayPal Support Section - Only for FinSight (模組化) */}
      {product.id === 3 && (
        <FinSightPayPalSection isEnglish={isEnglish} />
      )}

      {/* Specifications (模組化) */}
      <ProductSpecifications 
        product={product} 
        isEnglish={isEnglish} 
        technicalSpecsTranslations={technicalSpecsTranslations} 
      />

      {/* Technical Specifications from Detailed Description (模組化) */}
      <ProductTechnicalSpecs 
        product={product} 
        isEnglish={isEnglish} 
        technicalSpecsTranslations={technicalSpecsTranslations} 
      />

      {/* Additional Features (模組化) */}
      <ProductAdditionalFeatures product={product} isEnglish={isEnglish} />

      {/* Image Gallery (模組化) */}
      <ProductImageGallery product={product} isEnglish={isEnglish} />
      </div>
      <Footer isEnglish={isEnglish} />
    </>
  );
};

export default ProductDetails;