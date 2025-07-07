import React from 'react';

interface HeroSectionProps {
  isEnglish: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isEnglish }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src="/grando-8gpu-server.jpg"
          alt="AI Server Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          {isEnglish ? (
            <>
              <span className="block">Empowering the Future</span>
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                Through AI Innovation
              </span>
            </>
          ) : (
            <>
              <span className="block">賦能未來</span>
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                透過AI創新
              </span>
            </>
          )}
        </h1>
        <p className="mt-3 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-xl">
          {isEnglish
            ? 'Pioneering AI solutions that transform industries and enhance human potential.'
            : '開創性的AI解決方案，改變產業格局，提升人類潛能。'}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#eudtech-products"
            className="px-8 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-800 to-teal-800 hover:from-blue-700 hover:to-teal-700 shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            {isEnglish ? 'Our Solutions' : '我們的產品'}
          </a>
          <a
            href="#contact"
            className="px-8 py-3 text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            {isEnglish ? 'Contact Us' : '聯絡我們'}
          </a>
        </div>
        
        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;