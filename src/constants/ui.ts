// UI 相關常量
export const UI_CONSTANTS = {
  // 動畫持續時間
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    EXTRA_SLOW: 1000
  },
  
  // Z-index 層級
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
    NAVBAR: 1080
  },
  
  // 斷點
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536
  },
  
  // 間距
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
    '2XL': 48,
    '3XL': 64
  }
};

export const FORM_VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  URL_REGEX: /^https?\/\/.+/,
  
  MIN_PASSWORD_LENGTH: 8,
  MAX_TEXT_LENGTH: 500,
  MAX_NAME_LENGTH: 50
};

export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
  PRODUCTS: '/api/products',
  NEWSLETTER: '/api/newsletter'
};