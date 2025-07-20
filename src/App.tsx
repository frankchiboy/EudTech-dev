import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import AppProviders from './components/providers/AppProviders';
import AppRoutes from './components/AppRoutes';

function App() {
  // 添加錯誤邊界和基本的渲染檢查
  React.useEffect(() => {
    console.log('App component mounted');
    
    // 初始化效能優化（延遲執行避免阻塞渲染）
    setTimeout(() => {
      try {
        import('./utils/performance/imageOptimization').then(module => {
          module.optimizeImageLoading();
        });
        import('./utils/performance/codesplitting').then(module => {
          module.preloadCriticalComponents();
        });
      } catch (error) {
        console.warn('Performance optimization failed:', error);
      }
    }, 1000);
  }, []);

  return (
    <HelmetProvider>
      <AppProviders>
        <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
          <AppRoutes />
        </div>
      </AppProviders>
    </HelmetProvider>
  );
}

export default App;