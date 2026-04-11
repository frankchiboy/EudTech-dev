import React from 'react';

interface HeroContentProps {
  content: {
    title: {
      main: string;
      highlight: string;
    };
    subtitle: string;
    buttons: {
      primary: string;
      secondary: string;
    };
  };
}

const HeroContent: React.FC<HeroContentProps> = ({ content }) => {
  return (
    <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
        <span className="block">{content.title.main}</span>
        <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          {content.title.highlight}
        </span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-xl">
        {content.subtitle}
      </p>
      <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <a
          href="#eudtech-products"
          className="px-8 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-800 via-indigo-700 to-teal-800 hover:from-blue-700 hover:via-indigo-600 hover:to-teal-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_20px_rgba(14,165,233,0.3)] dark:shadow-[0_8px_30px_rgba(14,165,233,0.2)] transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-blue-500/30 backdrop-blur-sm"
        >
          {content.buttons.primary}
        </a>
        <a
          href="#contact"
          className="px-8 py-3 text-base font-medium rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_8px_20px_rgba(30,41,59,0.4)] transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
        >
          {content.buttons.secondary}
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
