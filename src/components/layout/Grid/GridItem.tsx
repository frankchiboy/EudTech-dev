import React from 'react';
import { classNames } from '../../../utils/helpers';

interface GridItemProps {
  children: React.ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  className?: string;
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  };
}

const GridItem: React.FC<GridItemProps> = ({
  children,
  span = 1,
  className,
  responsive
}) => {
  const spanClasses = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    12: 'col-span-12'
  };

  const responsiveClasses = responsive ? [
    responsive.sm && `sm:col-span-${responsive.sm}`,
    responsive.md && `md:col-span-${responsive.md}`,
    responsive.lg && `lg:col-span-${responsive.lg}`,
    responsive.xl && `xl:col-span-${responsive.xl}`
  ].filter(Boolean).join(' ') : '';

  return (
    <div className={classNames(
      spanClasses[span],
      responsiveClasses,
      className
    )}>
      {children}
    </div>
  );
};

export default GridItem;