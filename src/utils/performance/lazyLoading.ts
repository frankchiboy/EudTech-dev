import { lazy, ComponentType } from 'react';

// 懶載入組件包裝器，帶有重試機制
export const lazyWithRetry = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  retries: number = 3,
  retryDelay: number = 1000
) => {
  return lazy(async () => {
    let lastError: Error;

    for (let i = 0; i < retries; i++) {
      try {
        return await importFn();
      } catch (error) {
        lastError = error as Error;
        
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }
    
    throw lastError!;
  });
};

// 預載入函數
export const preloadComponent = (importFn: () => Promise<any>) => {
  return importFn();
};

// 批量預載入
export const preloadComponents = (importFns: (() => Promise<any>)[]) => {
  return Promise.all(importFns.map(fn => preloadComponent(fn)));
};

// 條件性預載入
export const conditionalPreload = (
  condition: () => boolean,
  importFn: () => Promise<any>,
  delay: number = 0
) => {
  if (condition()) {
    if (delay > 0) {
      setTimeout(() => preloadComponent(importFn), delay);
    } else {
      preloadComponent(importFn);
    }
  }
};

// 基於用戶行為的預載入
export const preloadOnInteraction = (
  element: HTMLElement,
  importFn: () => Promise<any>,
  events: string[] = ['mouseenter', 'focus']
) => {
  let hasPreloaded = false;

  const preload = () => {
    if (!hasPreloaded) {
      hasPreloaded = true;
      preloadComponent(importFn);
      cleanup();
    }
  };

  const cleanup = () => {
    events.forEach(event => {
      element.removeEventListener(event, preload);
    });
  };

  events.forEach(event => {
    element.addEventListener(event, preload, { once: true });
  });

  return cleanup;
};

// 基於可見性的預載入
export const preloadOnVisible = (
  element: HTMLElement,
  importFn: () => Promise<any>,
  options: IntersectionObserverInit = { 
    threshold: 0.1,
    rootMargin: '200px 0px' // 提前 200px 開始預載入
  }
) => {
  let hasPreloaded = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasPreloaded) {
        hasPreloaded = true;
        preloadComponent(importFn);
        observer.disconnect();
      }
    });
  }, options);

  observer.observe(element);

  return () => observer.disconnect();
};