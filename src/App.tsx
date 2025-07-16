import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import AppProviders from './components/providers/AppProviders';
import AppRoutes from './components/AppRoutes';
import { optimizeImageLoading, preloadCriticalComponents } from './utils/performance/imageOptimization';

// 初始化效能優化
optimizeImageLoading();
preloadCriticalComponents();

function App() {
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