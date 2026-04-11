import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { classNames } from '../../../utils/helpers';

interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted';
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  color = 'default',
  className
}) => {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4', 
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };

  const colorClasses = {
    default: 'text-gray-600 dark:text-gray-400',
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-teal-600 dark:text-teal-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    muted: 'text-gray-400 dark:text-gray-500'
  };

  return (
    <IconComponent 
      className={classNames(
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    />
  );
};

export default Icon;