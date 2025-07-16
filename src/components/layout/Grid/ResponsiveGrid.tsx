import React from 'react';
import { classNames } from '../../../utils/helpers';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  gap = 'md',
  breakpoints = { sm: 1, md: 2, lg: 3, xl: 4 }
}) => {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const responsiveClasses = [
    'grid',
    `grid-cols-${breakpoints.sm || 1}`,
    breakpoints.md && `md:grid-cols-${breakpoints.md}`,
    breakpoints.lg && `lg:grid-cols-${breakpoints.lg}`,
    breakpoints.xl && `xl:grid-cols-${breakpoints.xl}`
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames(
      responsiveClasses,
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;