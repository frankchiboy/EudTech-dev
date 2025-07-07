import React from 'react';
import { Lightbulb } from 'lucide-react';

interface AboutSectionProps {
  isEnglish: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ isEnglish }) => {
  const stats = [
    {
      id: 1,
      value: '15+',
      label: isEnglish ? 'AI Solutions' : 'AI解決方案',
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
    }
  ];

  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' /%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-base font-semibold tracking-wide text-blue-800 uppercase">
              {isEnglish ? 'About Us' : '關於我們'}
            </h2>
            <p className="mt-1 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight">
              {isEnglish ? 'Eudaemonia Technology' : '優達盟資訊科技有限公司'}
            </p>
            <div className="mt-8 space-y-6 text-gray-600">
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
                className="text-blue-800 font-medium hover:text-blue-900 transition-colors duration-200 flex items-center"
              >
                {isEnglish ? 'Explore our products' : '探索我們的產品'}{' '}
                <svg
                  className="ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
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

          <div className="mt-12 lg:mt-0">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-900 p-1">
              <div className="bg-white rounded-xl overflow-hidden">
                <img
                  className="w-full h-auto object-cover"
                  src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="EudTech AI research team"
                />
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {isEnglish ? 'Our Vision' : '我們的願景'}
                  </h3>
                  <p className="text-gray-600">
                    {isEnglish
                      ? 'We envision a future where AI technology enhances human capabilities, promotes sustainable development, and creates positive social impact across all sectors of society.'
                      : '我們展望一個人工智能技術增強人類能力、促進可持續發展，並在社會各個領域創造積極影響的未來。'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
                >
                  <div className="mb-2">{stat.icon}</div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 text-center">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;