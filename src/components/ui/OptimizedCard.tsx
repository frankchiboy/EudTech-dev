import React, { memo } from 'react';
import { classNames } from '../../utils/helpers';
import { useIntersectionObserver } from '../../hooks/performance/useIntersectionObserver';

interface OptimizedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  lazy?: boolean;
}

const OptimizedCard: React.FC<OptimizedCardProps> = memo(({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  lazy = false
}) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg transition-all duration-300';
  
  const variants = {
    default: 'shadow-md dark:shadow-gray-900/20',
    elevated: 'shadow-3d-light dark:shadow-3d-dark',
    outlined: 'border border-gray-200 dark:border-gray-700',
    glass: 'backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 shadow-glass'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]' : '';

  const cardClasses = classNames(
    baseStyles,
    variants[variant],
    paddings[padding],
    hoverStyles,
    className
  );

  if (lazy && !isIntersecting) {
    return (
      <div
        ref={targetRef}
        className={classNames(cardClasses, 'animate-pulse')}
        style={{ minHeight: '200px' }}
      >
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 mb-4"></div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 mb-2"></div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-3/4"></div>
      </div>
    );
  }

  return (
    <div ref={targetRef} className={cardClasses}>
      {children}
    </div>
  );
});

OptimizedCard.displayName = 'OptimizedCard';

export default OptimizedCard;