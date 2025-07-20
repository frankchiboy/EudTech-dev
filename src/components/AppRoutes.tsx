import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { useLanguageContext } from '../contexts/LanguageContext';
import NavBar from './navigation/NavBar';
import ScrollToTop from './common/ScrollToTop';
import SkipToContent from './common/SkipToContent';
import LoadingSpinner from './ui/LoadingSpinner';

// 懶加載組件以避免初始載入問題
const HeroSection = React.lazy(() => import('./hero/HeroSection'));
const EudTechProductsSection = React.lazy(() => import('./EudTechProductsSection'));
const ComimoBrandIntro = React.lazy(() => import('./ComimoBrandIntro'));
const AboutSection = React.lazy(() => import('./AboutSection'));
const ContactSection = React.lazy(() => import('./contact/ContactSection'));
const Footer = React.lazy(() => import('./Footer'));
const CareersPage = React.lazy(() => import('./CareersPage'));

// 載入中組件
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600 dark:text-gray-300">載入中...</p>
    </div>
  </div>
);

// 首頁組件
const HomePage = () => {
  const { isEnglish } = useLanguageContext();
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HeroSection isEnglish={isEnglish} />
      <EudTechProductsSection isEnglish={isEnglish} />
      <ComimoBrandIntro isEnglish={isEnglish} />
      <AboutSection isEnglish={isEnglish} />
      <ContactSection isEnglish={isEnglish} />
      <Footer isEnglish={isEnglish} />
    </Suspense>
  );
};

const AppRoutes: React.FC = () => {
  const { themeMode, isDarkModeActive, toggleDarkMode } = useThemeContext();
  const { isEnglish, toggleLanguage } = useLanguageContext();

  console.log('AppRoutes rendering');

  return (
    <>
      <SkipToContent />
      <ScrollToTop />
      <NavBar 
        isEnglish={isEnglish}
        toggleLanguage={toggleLanguage}
        themeMode={themeMode}
        isDarkMode={isDarkModeActive}
        toggleDarkMode={toggleDarkMode}
      />
      <main id="main-content" role="main">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">頁面不存在</p>
                  <a href="/" className="text-blue-600 hover:text-blue-800">返回首頁</a>
                </div>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

export default AppRoutes;