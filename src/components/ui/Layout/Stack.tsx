import React from 'react';
import { classNames } from '../../../utils/helpers';

interface StackProps {
  children: React.ReactNode;
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  divider?: React.ReactNode;
  className?: string;
}

const Stack: React.FC<StackProps> = ({
  children,
  spacing = 'md',
  align = 'stretch',
  divider,
  className
}) => {
  const spacingClasses = {
    none: 'space-y-0',
    xs: 'space-y-1',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
    '2xl': 'space-y-12'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const stackClasses = classNames(
    'flex flex-col',
    spacingClasses[spacing],
    alignClasses[align],
    className
  );

  if (divider) {
    const childrenArray = React.Children.toArray(children);
    return (
      <div className={stackClasses}>
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < childrenArray.length - 1 && divider}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className={stackClasses}>
      {children}
    </div>
  );
};

export default Stack;