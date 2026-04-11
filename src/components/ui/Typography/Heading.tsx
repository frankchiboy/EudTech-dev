import React from 'react';
import { classNames } from '../../../utils/helpers';

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
  color?: 'default' | 'primary' | 'secondary' | 'muted' | 'error' | 'success';
  align?: 'left' | 'center' | 'right';
  gradient?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  as: Component = 'h2',
  size = 'lg',
  weight = 'bold',
  color = 'default',
  align = 'left',
  gradient = false,
  children,
  className
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl'
  };

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black'
  };

  const colorClasses = {
    default: 'text-gray-900 dark:text-white',
    primary: 'text-blue-800 dark:text-blue-400',
    secondary: 'text-teal-600 dark:text-teal-400',
    muted: 'text-gray-500 dark:text-gray-400',
    error: 'text-red-600 dark:text-red-400',
    success: 'text-green-600 dark:text-green-400'
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const gradientClass = gradient 
    ? 'bg-gradient-to-r from-blue-800 to-teal-600 dark:from-blue-400 dark:to-teal-300 bg-clip-text text-transparent'
    : '';

  return (
    <Component className={classNames(
      sizeClasses[size],
      weightClasses[weight],
      gradient ? gradientClass : colorClasses[color],
      alignClasses[align],
      className
    )}>
      {children}
    </Component>
  );
};

export default Heading;