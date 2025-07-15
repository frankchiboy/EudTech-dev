import React, { useState, useRef, useEffect } from 'react';
import { classNames } from '../../utils/helpers';

interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    top: 'mb-2 bottom-full left-1/2 transform -translate-x-1/2',
    bottom: 'mt-2 top-full left-1/2 transform -translate-x-1/2',
    left: 'mr-2 right-full top-1/2 transform -translate-y-1/2',
    right: 'ml-2 left-full top-1/2 transform -translate-y-1/2'
  };

  const arrowClasses = {
    top: 'border-t-gray-900 border-t-4 border-x-transparent border-x-4 border-b-0 top-full left-1/2 transform -translate-x-1/2',
    bottom: 'border-b-gray-900 border-b-4 border-x-transparent border-x-4 border-t-0 bottom-full left-1/2 transform -translate-x-1/2',
    left: 'border-l-gray-900 border-l-4 border-y-transparent border-y-4 border-r-0 left-full top-1/2 transform -translate-y-1/2',
    right: 'border-r-gray-900 border-r-4 border-y-transparent border-y-4 border-l-0 right-full top-1/2 transform -translate-y-1/2'
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={classNames(
            'absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm transition-opacity duration-300',
            positionClasses[position],
            className
          )}
        >
          {content}
          <div className={classNames('absolute', arrowClasses[position])} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;