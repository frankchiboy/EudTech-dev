import React from 'react';
import { classNames } from '../../utils/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  ...rest
}) => {
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

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

export default Card;