import React from 'react';
import { classNames } from '../../../utils/helpers';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: 'default' | 'primary' | 'secondary' | 'faint';
  thickness?: 'thin' | 'medium' | 'thick';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'default',
  thickness = 'thin',
  spacing = 'md',
  className
}) => {
  const orientationClasses = {
    horizontal: 'w-full h-px',
    vertical: 'w-px h-full'
  };

  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  };

  const colorClasses = {
    default: 'border-gray-200 dark:border-gray-700',
    primary: 'border-blue-200 dark:border-blue-700',
    secondary: 'border-teal-200 dark:border-teal-700',
    faint: 'border-gray-100 dark:border-gray-800'
  };

  const thicknessClasses = {
    thin: 'border-t',
    medium: 'border-t-2',
    thick: 'border-t-4'
  };

  const spacingClasses = {
    none: '',
    sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: orientation === 'horizontal' ? 'my-6' : 'mx-6'
  };

  return (
    <div className={classNames(
      orientationClasses[orientation],
      variantClasses[variant],
      colorClasses[color],
      thicknessClasses[thickness],
      spacingClasses[spacing],
      className
    )} />
  );
};

export default Divider;