import React from 'react';
import { classNames } from '../../../utils/helpers';

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
  direction?: 'row' | 'column';
}

const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
  spacing = 'md',
  direction = 'column'
}) => {
  const spacingClasses = {
    sm: direction === 'column' ? 'space-y-2' : 'space-x-2',
    md: direction === 'column' ? 'space-y-4' : 'space-x-4',
    lg: direction === 'column' ? 'space-y-6' : 'space-x-6'
  };

  const directionClasses = {
    row: 'flex flex-row',
    column: 'flex flex-col'
  };

  return (
    <div className={classNames(
      directionClasses[direction],
      spacingClasses[spacing],
      className
    )}>
      {children}
    </div>
  );
};

export default FormGroup;