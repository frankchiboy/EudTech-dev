import React from 'react';
import { X } from 'lucide-react';
import { classNames } from '../../../utils/helpers';

interface ChipProps {
  children: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'text';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  deletable?: boolean;
  onDelete?: () => void;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'filled',
  color = 'default',
  size = 'md',
  deletable = false,
  onDelete,
  className
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors';

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const variantColorClasses = {
    filled: {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      secondary: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    },
    outlined: {
      default: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
      primary: 'border border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-300',
      secondary: 'border border-teal-300 text-teal-700 dark:border-teal-600 dark:text-teal-300',
      success: 'border border-green-300 text-green-700 dark:border-green-600 dark:text-green-300',
      warning: 'border border-yellow-300 text-yellow-700 dark:border-yellow-600 dark:text-yellow-300',
      error: 'border border-red-300 text-red-700 dark:border-red-600 dark:text-red-300'
    },
    text: {
      default: 'text-gray-700 dark:text-gray-300',
      primary: 'text-blue-700 dark:text-blue-300',
      secondary: 'text-teal-700 dark:text-teal-300',
      success: 'text-green-700 dark:text-green-300',
      warning: 'text-yellow-700 dark:text-yellow-300',
      error: 'text-red-700 dark:text-red-300'
    }
  };

  return (
    <span className={classNames(
      baseClasses,
      sizeClasses[size],
      variantColorClasses[variant][color],
      className
    )}>
      {children}
      {deletable && (
        <button
          onClick={onDelete}
          className="ml-1 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

export default Chip;