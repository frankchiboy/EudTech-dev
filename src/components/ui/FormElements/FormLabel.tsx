import React from 'react';
import { classNames } from '../../../utils/helpers';

interface FormLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const FormLabel: React.FC<FormLabelProps> = ({
  htmlFor,
  children,
  required = false,
  className,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        'block font-medium text-gray-700 dark:text-gray-300 mb-1',
        sizeClasses[size],
        className
      )}
    >
      {children}
      {required && (
        <span className="text-red-500 ml-1" aria-label="必填">
          *
        </span>
      )}
    </label>
  );
};

export default FormLabel;