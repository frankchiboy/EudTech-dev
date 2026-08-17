import React, { useId } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  inverse?: boolean;
}

const Logo: React.FC<LogoProps> = ({ inverse = false }) => {
  const gradientId = useId().replace(/:/g, '');
  const darkGradientId = `${gradientId}-dark`;

  return (
    <Link to="/" aria-label="EudTech 首頁" className="flex items-center rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
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
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: '#1e40af', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#0d9488', stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id={darkGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#14b8a6', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          {/* Server Icon */}
          <path 
            d="M5 25h40v10H5zM5 45h40v10H5zM5 65h40v10H5z" 
            fill={`url(#${gradientId})`}
          />
          {/* Circuit Lines */}
          <path 
            d="M55 30h10v40H55zM65 30h20v2H65zM65 68h20v2H65z" 
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="-ml-1 flex flex-col leading-none">
        <span className={`text-base font-bold tracking-tight sm:text-lg bg-clip-text text-transparent bg-gradient-to-r ${inverse ? 'from-blue-400 to-teal-300' : 'from-blue-800 to-teal-600 dark:from-blue-500 dark:to-teal-400'}`}>
          EudTech
        </span>
        <span className={`text-xs tracking-wide ${inverse ? 'text-slate-300' : 'text-slate-700 dark:text-slate-300'}`}>Eudaemonia Technology</span>
      </div>
    </Link>
  );
};

export default Logo;
