import React from 'react';
import { Check } from 'lucide-react';
import { classNames } from '../../../utils/helpers';
import FormError from './FormError';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  helperText,
  size = 'md',
  className,
  id,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const checkboxClasses = classNames(
    'rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 transition-colors',
    sizeClasses[size],
    error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
    className
  );

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={checkboxId}
          type="checkbox"
          className={checkboxClasses}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label
            htmlFor={checkboxId}
            className="font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <FormError message={error} />
        {helperText && !error && (
          <p className="text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkbox;