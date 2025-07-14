import React from 'react';

const FinSightLandingPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero 區塊 */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg"
            alt="FinSight Hero"
            className="w-full h-full object-cover transform scale-105 animate-subtle-zoom"
          />
          <div className="absolute inset-0 bg-black/60 z-10"></div>
        </div>
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">FinSight 金融資料平台</h1>
          <p className="text-lg max-w-xl mx-auto">金融資料彙整、分析與語言模型洞察提取的一站式平台</p>
        </div>
      </section>

      {/* 功能區塊 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">平台特色</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            '即時金融資料彙整',
            'AI 驅動分析',
            '語言模型自動報告',
            '風險與合規模組',
            'API 整合',
            '多格式匯出'
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 dark:shadow-lg">
              <p className="text-gray-900 dark:text-white font-medium">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-800 to-teal-700 text-white text-center py-12">
        <h3 className="text-2xl font-semibold mb-4">想體驗 FinSight？立即聯絡我們</h3>
        <a
          href="#contact"
          className="mt-4 inline-block bg-white text-blue-800 font-bold px-6 py-3 rounded-md hover:bg-gray-100 transition"
        >
          聯絡我們
        </a>
      </section>
    </div>
  );
};

export default FinSightLandingPage;