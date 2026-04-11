import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="relative mt-1">
        <svg 
          width="56" 
          height="56" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
        >
          <defs>
            <linearGradient id="nav-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: '#1e40af', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#0d9488', stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="nav-gradient-dark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#14b8a6', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          {/* Server Icon */}
          <path 
            d="M5 25h40v10H5zM5 45h40v10H5zM5 65h40v10H5z" 
            fill="url(#nav-gradient)"
            className="dark:fill-[url(#nav-gradient-dark)]"
          />
          {/* Circuit Lines */}
          <path 
            d="M55 30h10v40H55zM65 30h20v2H65zM65 68h20v2H65z" 
            stroke="url(#nav-gradient)" 
            strokeWidth="2"
            className="dark:stroke-[url(#nav-gradient-dark)]"
          />
        </svg>
      </div>
      <div className="-ml-1 flex flex-col leading-none">
        <span className="text-base sm:text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-teal-600 dark:from-blue-500 dark:to-teal-400">
          EudTech
        </span>
        <span className="text-xs tracking-wide opacity-80 dark:text-gray-300">Eudaemonia Technology</span>
      </div>
    </div>
  );
};

export default Logo;