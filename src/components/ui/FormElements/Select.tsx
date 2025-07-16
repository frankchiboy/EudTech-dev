import React from 'react';
import { ChevronDown } from 'lucide-react';
import { classNames } from '../../../utils/helpers';
import FormLabel from './FormLabel';
import FormError from './FormError';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  options,
  placeholder,
  className,
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const selectClasses = classNames(
    'block rounded-md border-gray-300 dark:border-gray-600 shadow-inner focus:shadow-glow-blue dark:focus:shadow-glow-blue focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border outline-none dark:bg-gray-700 dark:text-white transition-all duration-300 appearance-none bg-white dark:bg-gray-700',
    fullWidth && 'w-full',
    error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
    className
  );

  return (
    <div className={fullWidth ? 'w-full' : undefined}>
      {label && (
        <FormLabel htmlFor={selectId} required={props.required}>
          {label}
        </FormLabel>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={selectClasses}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
      <FormError message={error} />
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select;