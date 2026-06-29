import { HelmetProvider } from 'react-helmet-async';
import AppProviders from './components/providers/AppProviders';
import AppRoutes from './components/AppRoutes';
import { isMobileViewport, optimizeImageLoading } from './utils/performance/imageOptimization';
import { preloadCriticalComponents } from './utils/performance/codesplitting';
import VersionChecker from './components/common/VersionChecker';

// 立即初始化效能優化
const mobileViewport = isMobileViewport();
optimizeImageLoading({ isMobile: mobileViewport });

if (!mobileViewport) {
  preloadCriticalComponents();
}

function App() {
  return (
    <HelmetProvider>
      <AppProviders>
        <VersionChecker />
        <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
          <AppRoutes />
        </div>
      </AppProviders>
    </HelmetProvider>
  );
}

export default App;
