import React from 'react';

interface AboutContentProps {
  isEnglish: boolean;
}

const AboutContent: React.FC<AboutContentProps> = ({ isEnglish }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold tracking-wide text-[#003daa] dark:text-blue-400 uppercase">
          {isEnglish ? 'About Us' : '關於我們'}
        </h2>
        <p className="mt-1 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
          {isEnglish ? 'Eudaemonia Technology' : '優達盟資訊科技有限公司'}
        </p>
      </div>
      
      <div className="space-y-6 text-gray-600 dark:text-gray-300">
        <p>
          {isEnglish
            ? 'Founded in 2024, EudTech is driven by our fascination with AI and its potential to create a better society. Our name reflects our mission - developing AI technologies that contribute to human flourishing and well-being.'
            : '成立於2024年，EudTech源於我們對人工智能的著迷，以及其創造更美好社會的潛力。我們的名字反映了我們的使命 - 開發有助於人類繁榮和福祉的人工智能技術。'}
        </p>
        
        <p>
          {isEnglish
            ? 'From advanced AI servers to innovative software solutions, we are committed to pushing the boundaries of what AI can achieve. As an authorized distributor of leading brands like Comino, we provide cutting-edge liquid-cooled GPU systems alongside our own EudTech solutions.'
            : '從先進的AI伺服器到創新的軟件解決方案，我們致力於推動人工智能的極限。作為Comino等領先品牌的授權經銷商，我們提供尖端液冷GPU系統以及我們自有的EudTech解決方案。'}
        </p>
        
        <p>
          {isEnglish
            ? 'Our team of experts combines cutting-edge research with practical applications, creating AI solutions that address real-world challenges while promoting sustainable technological advancement.'
            : '我們的專家團隊將尖端研究與實際應用相結合，創造能解決現實世界挑戰的人工智能解決方案，同時促進可持續的技術進步。'}
        </p>
      </div>
      
      <div className="mt-10">
        <a
          href="#eudtech-products"
          className="text-[#003daa] dark:text-blue-400 font-medium hover:text-[#002a75] dark:hover:text-blue-300 transition-colors duration-200 flex items-center group"
        >
          {isEnglish ? 'Explore our products' : '探索我們的產品'}
          <svg
            className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default AboutContent;