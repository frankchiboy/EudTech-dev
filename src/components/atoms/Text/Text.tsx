import React from 'react';
import { BaseComponentProps } from '../../../types/components';
import { classNames } from '../../../utils/helpers';

// Text 組件特定 props
interface TextProps extends Omit<BaseComponentProps, 'variant'> {
  /** 文字變體 */
  variant?: 'body' | 'caption' | 'overline' | 'inherit';
  /** 標題級別 */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** 文字大小 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  /** 字重 */
  weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  /** 文字顏色 */
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted';
  /** 文字對齊 */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** 行間距 */
  leading?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  /** 字母間距 */
  tracking?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
  /** 文字裝飾 */
  decoration?: 'none' | 'underline' | 'overline' | 'line-through';
  /** 文字轉換 */
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  /** 是否可選取 */
  selectable?: boolean;
  /** 是否截斷 */
  truncate?: boolean;
  /** 最大行數（用於多行截斷） */
  clamp?: number;
  /** HTML 元素類型 */
  as?: keyof JSX.IntrinsicElements;
  /** 子元素 */
  children: React.ReactNode;
}

/**
 * Text 組件 - 用於顯示文字內容的基礎組件
 * 
 * @example
 * ```tsx
 * <Text>基本文字</Text>
 * <Text variant="h1" size="2xl" weight="bold">標題</Text>
 * <Text color="primary" align="center">置中文字</Text>
 * <Text truncate>很長的文字會被截斷...</Text>
 * ```
 */
export const Text: React.FC<TextProps> = ({
  variant = 'body',
  level,
  size = 'md',
  weight = 'normal',
  color = 'default',
  align = 'left',
  leading = 'normal',
  tracking = 'normal',
  decoration = 'none',
  transform = 'none',
  selectable = true,
  truncate = false,
  clamp,
  as,
  children,
  className,
  ...rest
}) => {
  // 決定 HTML 元素
  const getElement = (): keyof JSX.IntrinsicElements => {
    if (as) return as;
    if (level) return level;
    if (variant === 'body') return 'p';
    if (variant === 'caption') return 'span';
    if (variant === 'overline') return 'span';
    return 'span';
  };

  const Element = getElement();

  // 基礎樣式
  const baseClasses = [
    'transition-colors',
    'duration-200'
  ];

  // 變體樣式
  const variantClasses = {
    body: [],
    caption: ['text-sm'],
    overline: ['text-xs', 'uppercase', 'tracking-wide'],
    inherit: []
  };

  // 大小樣式
  const sizeClasses = {
    xs: ['text-xs'],
    sm: ['text-sm'],
    md: ['text-base'],
    lg: ['text-lg'],
    xl: ['text-xl'],
    '2xl': ['text-2xl'],
    '3xl': ['text-3xl'],
    '4xl': ['text-4xl'],
    '5xl': ['text-5xl'],
    '6xl': ['text-6xl']
  };

  // 字重樣式
  const weightClasses = {
    thin: ['font-thin'],
    light: ['font-light'],
    normal: ['font-normal'],
    medium: ['font-medium'],
    semibold: ['font-semibold'],
    bold: ['font-bold'],
    extrabold: ['font-extrabold'],
    black: ['font-black']
  };

  // 顏色樣式
  const colorClasses = {
    default: ['text-gray-900', 'dark:text-gray-100'],
    primary: ['text-blue-600', 'dark:text-blue-400'],
    secondary: ['text-gray-600', 'dark:text-gray-400'],
    success: ['text-green-600', 'dark:text-green-400'],
    warning: ['text-yellow-600', 'dark:text-yellow-400'],
    error: ['text-red-600', 'dark:text-red-400'],
    muted: ['text-gray-500', 'dark:text-gray-500']
  };

  // 對齊樣式
  const alignClasses = {
    left: ['text-left'],
    center: ['text-center'],
    right: ['text-right'],
    justify: ['text-justify']
  };

  // 行間距樣式
  const leadingClasses = {
    none: ['leading-none'],
    tight: ['leading-tight'],
    snug: ['leading-snug'],
    normal: ['leading-normal'],
    relaxed: ['leading-relaxed'],
    loose: ['leading-loose']
  };

  // 字母間距樣式
  const trackingClasses = {
    tighter: ['tracking-tighter'],
    tight: ['tracking-tight'],
    normal: ['tracking-normal'],
    wide: ['tracking-wide'],
    wider: ['tracking-wider'],
    widest: ['tracking-widest']
  };

  // 文字裝飾樣式
  const decorationClasses = {
    none: [],
    underline: ['underline'],
    overline: ['overline'],
    'line-through': ['line-through']
  };

  // 文字轉換樣式
  const transformClasses = {
    none: [],
    uppercase: ['uppercase'],
    lowercase: ['lowercase'],
    capitalize: ['capitalize']
  };

  // 組合所有樣式
  const combinedClasses = classNames(
    ...baseClasses,
    ...variantClasses[variant],
    ...sizeClasses[size],
    ...weightClasses[weight],
    ...colorClasses[color],
    ...alignClasses[align],
    ...leadingClasses[leading],
    ...trackingClasses[tracking],
    ...decorationClasses[decoration],
    ...transformClasses[transform],
    !selectable && 'select-none',
    truncate && 'truncate',
    (clamp && clamp > 0) ? `line-clamp-${clamp}` : false,
    className
  );

  return (
    <Element
      className={combinedClasses}
      {...(rest as any)}
    >
      {children}
    </Element>
  );
};

export default Text;
