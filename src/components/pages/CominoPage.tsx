import React from 'react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import ProgressiveImage from '../media/ProgressiveImage';
import Footer from '../Footer';
import SEOHead from '../common/SEOHead';
import Section from '../layout/Section';
import { getCominoProducts } from '../../data/productData';
import ProductGrid from '../products/ProductGrid';
import ComimoBrandIntro from '../ComimoBrandIntro';

const CominoPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  
  const products = getCominoProducts(isEnglish);

  return (
    <>
      <SEOHead
        title={isEnglish ? 'Comino Grando - Liquid-Cooled AI Computing Solutions' : 'Comino Grando - 液冷AI運算解決方案'}
        description={isEnglish 
          ? 'Explore Comino Grando liquid-cooled AI workstations and servers. Engineered for maximum performance in AI training, inference, and HPC workloads with up to 8 GPUs.'
          : '探索 Comino Grando 液冷AI工作站和伺服器。專為AI訓練、推論和HPC工作負載而設計，最高支援8個GPU的極致效能。'
        }
        keywords={isEnglish
          ? 'Comino, Grando, liquid cooling, AI servers, GPU computing, multi-GPU, workstation, AI training, inference, HPC'
          : 'Comino, Grando, 液冷, AI伺服器, GPU運算, 多GPU, 工作站, AI訓練, 推論, HPC'
        }
        isEnglish={isEnglish}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative h-96 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <ProgressiveImage
                src="/comino-4xa100.jpg"
                alt="Comino Grando AI System"
                className="w-full h-full"
                placeholderClassName="bg-gray-300 dark:bg-gray-700 animate-pulse"
                style={{ objectFit: 'cover', transform: 'scale(1.05)' }}
              />
              <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
            </div>
            <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center mb-6">
                <ProgressiveImage
                  src="/comino-grando-logo.png"
                  alt="Comino Grando Logo"
                  className="h-20 w-auto"
                  placeholderClassName="bg-transparent"
                  style={{ objectFit: 'contain' }}
                  fadeDurationMs={250}
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {isEnglish ? 'Liquid-cooled multi-GPU systems' : '液冷多 GPU 系統'}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                {isEnglish 
                  ? 'Engineered, not just assembled. Grando systems deliver up to 40% more performance than air-cooled systems.'
                  : '工程設計，而非只是組裝。Grando 系統效能比氣冷系統高出最多 40%。'
                }
              </p>
            </div>
          </section>

          {/* Brand Introduction */}
          <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
            <ComimoBrandIntro isEnglish={isEnglish} />
          </div>

          {/* Products Section */}
          <Section background="white" padding="xl">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold tracking-wide text-purple-600 dark:text-purple-400 uppercase">
                {isEnglish ? 'Product lineup' : '產品陣容'}
              </h2>
              <p className="mt-1 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight">
                {isEnglish ? 'Comino Grando series' : 'Comino Grando 系列'}
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-300">
                {isEnglish
                  ? 'Choose the liquid-cooled AI system that fits your workload and deployment environment.'
                  : '依工作負載與部署環境，選擇合適的液冷 AI 運算機型。'
                }
              </p>
            </div>
            
            <ProductGrid
              products={products}
              isEnglish={isEnglish}
              columns={1}
            />
          </Section>

          {/* Technology Advantages */}
          <Section background="gradient" padding="xl">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {isEnglish ? 'Why choose Comino Grando?' : '為什麼選擇 Comino Grando？'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Multi-GPU performance' : '多 GPU 效能'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {isEnglish
                      ? 'Up to 8 GPUs, running up to 40% faster than air-cooled systems. Cooling capacity reaches 5.5kW at 25°C.'
                      : '最多 8 顆 GPU，效能比氣冷系統高出最多 40%。25°C 環境下散熱能力可達 5.5kW。'
                    }
                  </p>
                  <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li>• {isEnglish ? 'Multi-GPU direct-connect architecture' : '多 GPU 直連架構'}</li>
                    <li>• {isEnglish ? 'No thermal throttling' : '無熱節流'}</li>
                    <li>• {isEnglish ? '90% GPU utilisation' : '90% GPU 使用率'}</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Quiet and reliable' : '靜音可靠'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {isEnglish
                      ? 'Low-noise operation, designed for 24/7 use at ambient temperatures up to 40°C.'
                      : '低噪音運作，可在最高 40°C 環境溫度下 24/7 連續運作。'
                    }
                  </p>
                  <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li>• {isEnglish ? 'GPU and CPU liquid cooling' : 'GPU 與 CPU 液冷'}</li>
                    <li>• {isEnglish ? 'Low-noise operation' : '低噪音運作'}</li>
                    <li>• {isEnglish ? 'Designed for continuous operation' : '可連續運作的設計'}</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Easy maintenance' : '易於維護'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {isEnglish
                      ? 'Modular components and an accessible layout make configuration and maintenance simpler.'
                      : '模組化元件與易於拆裝的結構，讓配置與維護更簡單。'
                    }
                  </p>
                  <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li>• {isEnglish ? 'Modular component design' : '模組化元件設計'}</li>
                    <li>• {isEnglish ? 'Easy access for maintenance' : '維護時易於拆裝'}</li>
                    <li>• {isEnglish ? 'Manufacturer support' : '原廠支援'}</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Award-winning' : '獲獎紀錄'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {isEnglish
                      ? 'Comino Grando received the "Storage Review Best of 2024" award.'
                      : 'Comino Grando 獲得「2024 年 StorageReview 最佳獎」。'
                    }
                  </p>
                  <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li>• {isEnglish ? 'Industry recognition' : '業界認可'}</li>
                    <li>• {isEnglish ? 'Up to six 450W GPUs in a 4U chassis' : '4U 機箱容納最多 6 顆 450W GPU'}</li>
                    <li>• {isEnglish ? 'Public reviews and media coverage' : '公開評測與媒體報導'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* Contact Section */}
          <Section background="gradient" padding="xl">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {isEnglish ? 'Next step: configuration and quote request' : '下一步：確認配置與詢價'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {isEnglish
                  ? 'Share your workload and site conditions. EudTech will help confirm the configuration, provide a quote, and answer technical questions.'
                  : '告知工作負載與場地條件，EudTech 會協助確認配置、提供報價並回答技術問題。'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-700 hover:bg-purple-800 transition duration-200"
                >
                  {isEnglish ? 'Request a quote' : '送出詢價'}
                </a>
                <a
                  href="https://www.grando.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                >
                  {isEnglish ? 'Visit the Comino website' : '前往 Comino 官網'}
                </a>
              </div>
            </div>
          </Section>
        </main>

        <Footer isEnglish={isEnglish} />
      </div>
    </>
  );
};

export default CominoPage;
