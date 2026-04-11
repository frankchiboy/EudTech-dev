// Hooks 統一匯出點

// 核心 hooks
export { useTheme } from './core/useTheme';
export { useLanguage } from './core/useLanguage';

// UI hooks
export { useModal } from './ui/useModal';
export { useLocalStorage, useSessionStorage } from './ui/useLocalStorage';
export { usePagination } from './ui/usePagination';
export { useScrollDetection } from './ui/useScrollDetection';
export { useClickOutside } from './ui/useClickOutside';
export { useToggle } from './ui/useToggle';
export { useKeyPress, useKeyboardShortcut } from './ui/useKeyPress';
export { useMediaQuery, useBreakpoints } from './ui/useMediaQuery';

// Business hooks
export { useContactForm } from './business/useContactForm';
export { useProductData } from './business/useProductData';
export { useProductSearch } from './business/useProductSearch';

// Performance hooks
export { useDebounce, useDebouncedCallback } from './performance/useDebounce';
export { useIntersectionObserver } from './performance/useIntersectionObserver';
export { useVirtualization } from './performance/useVirtualization';

// API hooks
export { useApi } from './api/useApi';