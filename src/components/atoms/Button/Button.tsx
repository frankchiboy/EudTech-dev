import React from 'react';
import { classNames } from '../../../utils/helpers';
import { CommonComponentProps, VariantProps } from '../../../types/components';

/**
 * 按鈕組件屬性
 */
export interface ButtonProps extends Omit<CommonComponentProps, 'onClick'>, VariantProps {
  /** 按鈕類型 */
  type?: 'button' | 'submit' | 'reset';
  /** 是否為全寬度 */
  fullWidth?: boolean;
  /** 左側圖標 */
  leftIcon?: React.ReactNode;
  /** 右側圖標 */
  rightIcon?: React.ReactNode;
  /** 點擊處理函數 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * 按鈕組件
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   點擊我
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  color = 'primary',
  disabled = false,
  loading = false,
  type = 'button',
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  animation = 'none',
  'data-testid': dataTestId,
  ...rest
}) => {
  // 基礎樣式
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'border',
    'font-medium',
    'rounded-md',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'transition-all',
    'duration-200',
    'select-none'
  ];

  // 大小樣式
  const sizeClasses = {
    xs: ['px-2.5', 'py-1.5', 'text-xs'],
    sm: ['px-3', 'py-2', 'text-sm'],
    md: ['px-4', 'py-2', 'text-sm'],
    lg: ['px-4', 'py-2', 'text-base'],
    xl: ['px-6', 'py-3', 'text-base']
  };

  // 變體樣式
  const variantClasses = {
    primary: {
      default: ['bg-blue-600', 'border-blue-600', 'text-white', 'hover:bg-blue-700', 'focus:ring-blue-500'],
      secondary: ['bg-gray-600', 'border-gray-600', 'text-white', 'hover:bg-gray-700', 'focus:ring-gray-500'],
      success: ['bg-green-600', 'border-green-600', 'text-white', 'hover:bg-green-700', 'focus:ring-green-500'],
      warning: ['bg-yellow-600', 'border-yellow-600', 'text-white', 'hover:bg-yellow-700', 'focus:ring-yellow-500'],
      error: ['bg-red-600', 'border-red-600', 'text-white', 'hover:bg-red-700', 'focus:ring-red-500']
    },
    secondary: {
      default: ['bg-white', 'border-gray-300', 'text-gray-700', 'hover:bg-gray-50', 'focus:ring-blue-500'],
      primary: ['bg-blue-50', 'border-blue-200', 'text-blue-700', 'hover:bg-blue-100', 'focus:ring-blue-500'],
      success: ['bg-green-50', 'border-green-200', 'text-green-700', 'hover:bg-green-100', 'focus:ring-green-500'],
      warning: ['bg-yellow-50', 'border-yellow-200', 'text-yellow-700', 'hover:bg-yellow-100', 'focus:ring-yellow-500'],
      error: ['bg-red-50', 'border-red-200', 'text-red-700', 'hover:bg-red-100', 'focus:ring-red-500']
    },
    outline: {
      default: ['bg-transparent', 'border-gray-300', 'text-gray-700', 'hover:bg-gray-50', 'focus:ring-blue-500'],
      primary: ['bg-transparent', 'border-blue-300', 'text-blue-700', 'hover:bg-blue-50', 'focus:ring-blue-500'],
      success: ['bg-transparent', 'border-green-300', 'text-green-700', 'hover:bg-green-50', 'focus:ring-green-500'],
      warning: ['bg-transparent', 'border-yellow-300', 'text-yellow-700', 'hover:bg-yellow-50', 'focus:ring-yellow-500'],
      error: ['bg-transparent', 'border-red-300', 'text-red-700', 'hover:bg-red-50', 'focus:ring-red-500']
    },
    ghost: {
      default: ['bg-transparent', 'border-transparent', 'text-gray-700', 'hover:bg-gray-100', 'focus:ring-blue-500'],
      primary: ['bg-transparent', 'border-transparent', 'text-blue-700', 'hover:bg-blue-50', 'focus:ring-blue-500'],
      success: ['bg-transparent', 'border-transparent', 'text-green-700', 'hover:bg-green-50', 'focus:ring-green-500'],
      warning: ['bg-transparent', 'border-transparent', 'text-yellow-700', 'hover:bg-yellow-50', 'focus:ring-yellow-500'],
      error: ['bg-transparent', 'border-transparent', 'text-red-700', 'hover:bg-red-50', 'focus:ring-red-500']
    },
    link: {
      default: ['bg-transparent', 'border-transparent', 'text-blue-600', 'hover:text-blue-700', 'hover:underline', 'focus:ring-blue-500'],
      primary: ['bg-transparent', 'border-transparent', 'text-blue-600', 'hover:text-blue-700', 'hover:underline', 'focus:ring-blue-500'],
      success: ['bg-transparent', 'border-transparent', 'text-green-600', 'hover:text-green-700', 'hover:underline', 'focus:ring-green-500'],
      warning: ['bg-transparent', 'border-transparent', 'text-yellow-600', 'hover:text-yellow-700', 'hover:underline', 'focus:ring-yellow-500'],
      error: ['bg-transparent', 'border-transparent', 'text-red-600', 'hover:text-red-700', 'hover:underline', 'focus:ring-red-500']
    }
  };

  // 動畫樣式
  const animationClasses = {
    none: [],
    fade: ['hover:opacity-80'],
    slide: ['transform', 'hover:translate-x-1'],
    scale: ['hover:scale-105', 'active:scale-95'],
    bounce: ['hover:animate-bounce']
  };

  // 獲取顏色樣式的安全方法
  const getColorClasses = () => {
    const variantStyles = variantClasses[variant];
    if (color in variantStyles) {
      return variantStyles[color as keyof typeof variantStyles];
    }
    return variantStyles.default || [];
  };

  // 獲取動畫樣式的安全方法
  const getAnimationClasses = () => {
    return animation !== 'none' ? animationClasses[animation] : [];
  };

  // 組合所有樣式
  const combinedClasses = classNames(
    ...baseClasses,
    ...sizeClasses[size],
    ...getColorClasses(),
    ...getAnimationClasses(),
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    loading && 'cursor-wait',
    className ? [className] : []
  );

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled || loading}
      onClick={onClick}
      data-testid={dataTestId}
      {...rest}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {leftIcon && !loading && (
        <span className="mr-2">{leftIcon}</span>
      )}
      
      {children}
      
      {rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
