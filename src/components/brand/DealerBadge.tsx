import React, { useId } from 'react';

interface DealerBadgeProps {
  className?: string;
  gradientIdPrefix?: string;
}

const DealerBadge: React.FC<DealerBadgeProps> = ({
  className = '',
  gradientIdPrefix = 'logoGradientDealer'
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const gradientId = `${gradientIdPrefix}-${uniqueId}`;

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative mr-3">
        <svg
          width="72"
          height="72"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[72px] h-[72px]"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e40af" stopOpacity="1" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M20 25h40v10H20zM20 45h40v10H20zM20 65h40v10H20z"
            fill={`url(#${gradientId})`}
            className="drop-shadow-sm"
          />
          <path
            d="M70 30h10v40H70zM80 30h20v2H80zM80 68h20v2H80z"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            className="drop-shadow-sm"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-none justify-center">
        <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-teal-600 dark:from-blue-500 dark:to-teal-400">
          EudTech
        </span>
        <span className="text-xs tracking-wide text-gray-600 dark:text-white/80">
          Eudaemonia Technology
        </span>
      </div>
    </div>
  );
};

export default DealerBadge;
