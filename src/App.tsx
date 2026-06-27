import { HelmetProvider } from 'react-helmet-async';
import AppProviders from './components/providers/AppProviders';
import AppRoutes from './components/AppRoutes';
import { isMobileViewport, optimizeImageLoading, preloadCriticalImages } from './utils/performance/imageOptimization';
import { preloadCriticalComponents } from './utils/performance/codesplitting';
import VersionChecker from './components/common/VersionChecker';

// 預載入產品圖片列表 - 所有可能的公共圖片路徑
const productImages = [
  // 產品圖片
  '/grando-8gpu-server.jpg',
  '/comino-4xa100.jpg',
  '/comino-h100-server.jpg',
  '/comino-workstation-front.png',
  '/comino-workstation-side.png',
  '/EudTech-Select-server-front.png',
  '/EudTech-Select-server-back.png',
  '/comino-h100-front.jpg',
  '/GRANDO DPR 4090-FT_6_01.jpg',
  '/GRANDO DPR 4090-FT_6_02.jpg',
  '/GRANDO DPR 4090-FT_6_03.jpg',
  '/GRANDO DPR 4090-FT_6_04.jpg',
  '/GRANDO DPR 4090-FT_6_05.jpg',
  '/GRANDO DPR 4090-FT_6_06.jpg',
  '/comino-facility-1.jpg',
  '/comino-facility-2.jpg',
  '/comino-facility-3.jpg',
  // 徽標和小圖示
  '/comino-logo.png',
  '/comino-grando-logo.png',
  '/comino-heat-recovery.png',
  '/container-overview.png',
  '/amd-logo.png',
  '/amd-partner-badge.jpg',
  // Cyabra 相關圖片
  '/cyabra-logo.svg',
  '/cyabra-logo-new.svg',
  '/cyabra-dashboard.jpg',
  '/cyabra-dashboard.svg',
  '/cyabra-images/cyabra-activity-graph-min-300x225.png',
  '/cyabra-images/cyabra-detect-min.png',
  '/cyabra-images/soc2-type-2-compliance-badge.webp',
  '/cyabra-images/testimonials/jonny-bentwood.webp',
  '/cyabra-images/testimonials/todd-grossman.webp',
  '/cyabra-images/testimonials/vincent-obrien.webp'
];

// 立即初始化效能優化
const mobileViewport = isMobileViewport();
optimizeImageLoading({ isMobile: mobileViewport });

if (!mobileViewport) {
  preloadCriticalComponents();
  void preloadCriticalImages(productImages); // 額外預載入所有產品圖片
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
