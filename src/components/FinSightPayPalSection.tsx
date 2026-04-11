import React from 'react';

interface FinSightPayPalSectionProps {
  isEnglish: boolean;
}

const FinSightPayPalSection: React.FC<FinSightPayPalSectionProps> = ({ isEnglish }) => {
  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800/30">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isEnglish ? 'Support FinSight GTP Development' : '支持 FinSight GTP 計畫發展'}
                </h3>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {isEnglish
                  ? 'Help us accelerate the development of FinSight GTP - the next generation financial AI platform. Your support enables us to expand features, enhance AI capabilities, and deliver more powerful financial insights for the community.'
                  : '協助我們加速 FinSight GTP 的開發進程 - 下一代金融AI平台。您的支持讓我們能夠擴充功能、增強AI能力，並為社群提供更強大的金融洞察服務。'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  { key: 'moreProducts', text: isEnglish ? 'More financial product data support' : '更多金融商品數據支援', color: 'bg-green-500' },
                  { key: 'rawData', text: isEnglish ? 'Enhanced raw data integration' : '更完整原始數據整合', color: 'bg-purple-500' },
                  { key: 'quantData', text: isEnglish ? 'Comprehensive quantitative data coverage' : '更完整量化數據覆蓋', color: 'bg-orange-500' },
                  { key: 'multiCountry', text: isEnglish ? 'Multi-country data expansion' : '更多國家數據擴展', color: 'bg-blue-500' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center">
                    <div className={`h-2 w-2 ${item.color} rounded-full mt-2 mr-3 flex-shrink-0`}></div>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <a
                href="http://paypal.me/EudTech/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.26-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.9.9 0 0 0-.89.756l-1.274 8.07a.38.38 0 0 0 .375.438h3.077c.463 0 .852-.33.93-.778l.038-.207.73-4.625.047-.257c.077-.447.467-.778.93-.778h.584c3.57 0 6.367-1.45 7.181-5.64.34-1.75.165-3.213-.675-4.32a3.669 3.669 0 0 0-1.077-.579z"/>
                </svg>
                {isEnglish ? 'Support via PayPal' : '透過 PayPal 支持'}
              </a>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2  0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                {isEnglish ? 'Secure payment • Any amount helps' : '安全付款 • 任何金額都是幫助'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinSightPayPalSection;
