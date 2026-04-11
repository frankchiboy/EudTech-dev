import React, { forwardRef } from 'react';
import { BaseComponentProps } from '../../../types/components';
import { classNames } from '../../../utils/helpers';

// Input 組件特定 props
interface InputProps extends Omit<BaseComponentProps, 'variant'> {
  /** 輸入框變體 */
  variant?: 'filled' | 'outlined' | 'ghost' | 'underlined';
  /** 輸入框大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 輸入框類型 */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** 標籤文字 */
  label?: string;
  /** 提示文字 */
  placeholder?: string;
  /** 幫助文字 */
  helperText?: string;
  /** 錯誤訊息 */
  errorMessage?: string;
  /** 是否必填 */
  required?: boolean;
  /** 是否為全寬 */
  fullWidth?: boolean;
  /** 前置圖示 */
  startIcon?: React.ReactNode;
  /** 後置圖示 */
  endIcon?: React.ReactNode;
  /** 前置文字 */
  startAdornment?: React.ReactNode;
  /** 後置文字 */
  endAdornment?: React.ReactNode;
  /** 是否多行 */
  multiline?: boolean;
  /** 行數（多行時） */
  rows?: number;
  /** 輸入框值 */
  value?: string;
  /** 預設值 */
  defaultValue?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否有錯誤 */
  error?: boolean;
}

/**
 * Input 組件 - 用於用戶輸入的基礎組件
 * 
 * @example
 * ```tsx
 * <Input placeholder="請輸入內容" />
 * <Input label="姓名" required />
 * <Input variant="outlined" startIcon={<SearchIcon />} />
 * <Input multiline rows={3} />
 * ```
 */
export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
  variant = 'outlined',
  size = 'md',
  type = 'text',
  label,
  placeholder,
  helperText,
  errorMessage,
  required = false,
  fullWidth = false,
  startIcon,
  endIcon,
  startAdornment,
  endAdornment,
  multiline = false,
  rows = 3,
  className,
  disabled,
  id,
  'data-testid': dataTestId,
  ...rest
}, ref) => {
  // 計算是否有錯誤狀態
  const hasError = Boolean(errorMessage);
  
  // 生成唯一 ID
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const helperTextId = `${inputId}-helper-text`;
  const errorMessageId = `${inputId}-error-message`;

  // 基礎樣式
  const baseClasses = [
    'transition-all',
    'duration-200',
    'border',
    'rounded-md',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-0'
  ];

  // 變體樣式
  const variantClasses = {
    filled: [
      'bg-gray-100',
      'border-transparent',
      'focus:bg-white',
      'focus:border-blue-500',
      'focus:ring-blue-500'
    ],
    outlined: [
      'bg-white',
      'border-gray-300',
      'focus:border-blue-500',
      'focus:ring-blue-500'
    ],
    ghost: [
      'bg-transparent',
      'border-transparent',
      'focus:bg-gray-50',
      'focus:border-blue-500',
      'focus:ring-blue-500'
    ],
    underlined: [
      'bg-transparent',
      'border-0',
      'border-b-2',
      'border-gray-300',
      'rounded-none',
      'focus:border-blue-500',
      'focus:ring-0',
      'focus:ring-transparent',
      'px-0'
    ]
  };

  // 大小樣式
  const sizeClasses = {
    sm: ['text-sm', 'px-3', 'py-2'],
    md: ['text-base', 'px-3', 'py-2.5'],
    lg: ['text-lg', 'px-4', 'py-3']
  };

  // 狀態樣式
  const getStateClasses = () => {
    if (disabled) {
      return ['bg-gray-100', 'text-gray-500', 'cursor-not-allowed', 'opacity-60'];
    }
    if (hasError) {
      return ['border-red-500', 'focus:border-red-500', 'focus:ring-red-500'];
    }
    return [];
  };

  // 組合輸入框樣式
  const inputClasses = classNames(
    ...baseClasses,
    ...variantClasses[variant],
    ...sizeClasses[size],
    ...getStateClasses(),
    fullWidth && 'w-full',
    (startIcon || startAdornment) ? 'pl-10' : '',
    (endIcon || endAdornment) ? 'pr-10' : '',
    multiline && 'resize-none',
    className
  );

  // 容器樣式
  const containerClasses = classNames(
    'relative',
    fullWidth && 'w-full'
  );

  // 標籤樣式
  const labelClasses = classNames(
    'block',
    'text-sm',
    'font-medium',
    'mb-1',
    hasError ? 'text-red-700' : 'text-gray-700',
    disabled && 'text-gray-500'
  );

  // 幫助文字樣式
  const helperTextClasses = classNames(
    'mt-1',
    'text-xs',
    hasError ? 'text-red-600' : 'text-gray-500'
  );

  // 圖示容器樣式
  const iconClasses = 'absolute top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none';
  const startIconClasses = classNames(iconClasses, 'left-3');
  const endIconClasses = classNames(iconClasses, 'right-3');

  // 裝飾容器樣式
  const adornmentClasses = 'absolute top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none';
  const startAdornmentClasses = classNames(adornmentClasses, 'left-3');
  const endAdornmentClasses = classNames(adornmentClasses, 'right-3');

  const InputElement = multiline ? 'textarea' : 'input';

  return (
    <div className={containerClasses}>
      {/* 標籤 */}
      {label && (
        <label 
          htmlFor={inputId} 
          className={labelClasses}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* 輸入框容器 */}
      <div className="relative">
        {/* 前置圖示 */}
        {startIcon && (
          <div className={startIconClasses}>
            {startIcon}
          </div>
        )}

        {/* 前置裝飾 */}
        {startAdornment && (
          <div className={startAdornmentClasses}>
            {startAdornment}
          </div>
        )}

        {/* 輸入框 */}
        <InputElement
          ref={ref as any}
          id={inputId}
          type={multiline ? undefined : type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={multiline ? rows : undefined}
          className={inputClasses}
          aria-describedby={
            classNames(
              helperText && helperTextId,
              errorMessage && errorMessageId
            ) || undefined
          }
          aria-invalid={hasError}
          data-testid={dataTestId}
          {...rest}
        />

        {/* 後置圖示 */}
        {endIcon && (
          <div className={endIconClasses}>
            {endIcon}
          </div>
        )}

        {/* 後置裝飾 */}
        {endAdornment && (
          <div className={endAdornmentClasses}>
            {endAdornment}
          </div>
        )}
      </div>

      {/* 幫助文字或錯誤訊息 */}
      {(helperText || errorMessage) && (
        <div 
          id={errorMessage ? errorMessageId : helperTextId}
          className={helperTextClasses}
        >
          {errorMessage || helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
