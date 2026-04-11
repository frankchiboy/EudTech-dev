/**
 * 基礎組件屬性類型
 */
export interface BaseComponentProps {
  /** 自定義 CSS 類名 */
  className?: string;
  /** 子元素 */
  children?: React.ReactNode;
  /** HTML ID 屬性 */
  id?: string;
  /** 測試用 ID */
  'data-testid'?: string;
}

/**
 * 變體屬性類型
 */
export interface VariantProps {
  /** 組件變體 */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  /** 組件大小 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 組件顏色 */
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

/**
 * 狀態屬性類型
 */
export interface StateProps {
  /** 是否載入中 */
  loading?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否為錯誤狀態 */
  error?: boolean;
  /** 是否為成功狀態 */
  success?: boolean;
}

/**
 * 交互屬性類型
 */
export interface InteractionProps {
  /** 點擊事件處理器 */
  onClick?: (event: React.MouseEvent) => void;
  /** 滑鼠進入事件處理器 */
  onMouseEnter?: (event: React.MouseEvent) => void;
  /** 滑鼠離開事件處理器 */
  onMouseLeave?: (event: React.MouseEvent) => void;
  /** 焦點事件處理器 */
  onFocus?: (event: React.FocusEvent) => void;
  /** 失焦事件處理器 */
  onBlur?: (event: React.FocusEvent) => void;
}

/**
 * 可訪問性屬性類型
 */
export interface AccessibilityProps {
  /** ARIA 標籤 */
  'aria-label'?: string;
  /** ARIA 描述 */
  'aria-describedby'?: string;
  /** ARIA 標題 */
  'aria-labelledby'?: string;
  /** 角色屬性 */
  role?: string;
  /** Tab 索引 */
  tabIndex?: number;
}

/**
 * 佈局屬性類型
 */
export interface LayoutProps {
  /** 寬度 */
  width?: string | number;
  /** 高度 */
  height?: string | number;
  /** 最大寬度 */
  maxWidth?: string | number;
  /** 最小寬度 */
  minWidth?: string | number;
  /** 邊距 */
  margin?: string | number;
  /** 內距 */
  padding?: string | number;
}

/**
 * 響應式屬性類型
 */
export interface ResponsiveProps {
  /** 隱藏在小螢幕 */
  hideOnMobile?: boolean;
  /** 隱藏在平板 */
  hideOnTablet?: boolean;
  /** 隱藏在桌面 */
  hideOnDesktop?: boolean;
  /** 響應式大小 */
  responsiveSize?: {
    mobile?: VariantProps['size'];
    tablet?: VariantProps['size'];
    desktop?: VariantProps['size'];
  };
}

/**
 * 動畫屬性類型
 */
export interface AnimationProps {
  /** 動畫類型 */
  animation?: 'fade' | 'slide' | 'scale' | 'bounce' | 'none';
  /** 動畫持續時間 */
  duration?: 'fast' | 'normal' | 'slow';
  /** 動畫延遲 */
  delay?: number;
  /** 是否啟用懸停動畫 */
  hoverAnimation?: boolean;
}

/**
 * 通用組件屬性類型
 * 組合了所有基礎屬性類型
 */
export interface CommonComponentProps 
  extends BaseComponentProps,
          VariantProps,
          StateProps,
          InteractionProps,
          AccessibilityProps,
          AnimationProps {
}

/**
 * 表單元素屬性類型
 */
export interface FormElementProps extends CommonComponentProps {
  /** 輸入名稱 */
  name?: string;
  /** 輸入值 */
  value?: string | number;
  /** 預設值 */
  defaultValue?: string | number;
  /** 佔位符文字 */
  placeholder?: string;
  /** 是否必填 */
  required?: boolean;
  /** 是否唯讀 */
  readOnly?: boolean;
  /** 最大長度 */
  maxLength?: number;
  /** 最小長度 */
  minLength?: number;
  /** 值變更處理器 */
  onChange?: (value: string | number) => void;
  /** 輸入事件處理器 */
  onInput?: (event: React.FormEvent) => void;
  /** 錯誤訊息 */
  errorMessage?: string;
  /** 幫助文字 */
  helpText?: string;
}

/**
 * 導航元素屬性類型
 */
export interface NavigationProps extends CommonComponentProps {
  /** 連結地址 */
  href?: string;
  /** 是否在新頁面開啟 */
  external?: boolean;
  /** 是否為當前頁面 */
  active?: boolean;
  /** 是否顯示圖標 */
  showIcon?: boolean;
}

/**
 * 媒體元素屬性類型
 */
export interface MediaProps extends BaseComponentProps, LayoutProps {
  /** 圖片/媒體源 */
  src: string;
  /** 替代文字 */
  alt?: string;
  /** 載入策略 */
  loading?: 'lazy' | 'eager';
  /** 物件適配方式 */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

/**
 * 容器元素屬性類型
 */
export interface ContainerProps extends CommonComponentProps, LayoutProps, ResponsiveProps {
  /** 內容方向 */
  direction?: 'row' | 'column';
  /** 內容對齊 */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** 內容分佈 */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** 間距 */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 是否換行 */
  wrap?: boolean;
}
