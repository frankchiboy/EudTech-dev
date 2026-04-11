import React from 'react';
import { classNames } from '../../../utils/helpers';

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  direction?: 'vertical' | 'horizontal' | 'both';
  className?: string;
}

const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  direction = 'vertical',
  className
}) => {
  const sizeClasses = {
    xs: '1',
    sm: '2',
    md: '4',
    lg: '6',
    xl: '8',
    '2xl': '12',
    '3xl': '16'
  };

  const directionClasses = {
    vertical: `h-${sizeClasses[size]}`,
    horizontal: `w-${sizeClasses[size]}`,
    both: `h-${sizeClasses[size]} w-${sizeClasses[size]}`
  };

  return (
    <div className={classNames(
      directionClasses[direction],
      className
    )} />
  );
};

export default Spacer;