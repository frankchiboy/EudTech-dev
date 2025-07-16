import React from 'react';
import { classNames } from '../../../utils/helpers';
import FormLabel from './FormLabel';
import FormError from './FormError';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  error?: string;
  helperText?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  direction?: 'row' | 'column';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  error,
  helperText,
  options,
  value,
  onChange,
  direction = 'column',
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const directionClasses = {
    row: 'flex flex-row space-x-4',
    column: 'flex flex-col space-y-2'
  };

  return (
    <div className={className}>
      {label && (
        <FormLabel className="mb-3">
          {label}
        </FormLabel>
      )}
      <div className={directionClasses[direction]}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={option.disabled}
              className={classNames(
                'border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 transition-colors',
                sizeClasses[size],
                error && 'border-red-300 focus:border-red-500 focus:ring-red-500'
              )}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={classNames(
                'ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300',
                option.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <FormError message={error} />
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;