import { lazy } from 'react';

// 動態載入組件
export const LazyProductDetails = lazy(() => import('../../components/ProductDetails'));
export const LazyContactSection = lazy(() => import('../../components/contact/ContactSection'));
export const LazyAboutSection = lazy(() => import('../../components/AboutSection'));

// 預載入函數
export const preloadComponent = (importFn: () => Promise<any>) => {
  const componentImport = importFn();
  return componentImport;
};

// 預載入關鍵組件
export const preloadCriticalComponents = () => {
  // 在用戶可能需要之前預載入
  setTimeout(() => {
    preloadComponent(() => import('../../components/ProductDetails'));
  }, 2000);
};