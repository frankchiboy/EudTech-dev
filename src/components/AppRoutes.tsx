import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { useLanguageContext } from '../contexts/LanguageContext';
import NavBar from './navigation/NavBar';
import HeroSection from './hero/HeroSection';
import EudTechProductsSection from './EudTechProductsSection';
import ComimoBrandIntro from './ComimoBrandIntro';
import Footer from './Footer';
import ScrollToTop from './common/ScrollToTop';
import SkipToContent from './common/SkipToContent';
import LoadingSpinner from './ui/LoadingSpinner';
import CareersPage from './CareersPage';
import { LazyProductDetails, LazyContactSection, LazyAboutSection } from '../utils/performance/codesplitting';

const AppRoutes: React.FC = () => {
  const { themeMode, isDarkModeActive, toggleDarkMode } = useThemeContext();
  const { isEnglish, toggleLanguage } = useLanguageContext();

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
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size="lg" />
          </div>
        }>
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection isEnglish={isEnglish} />
                <EudTechProductsSection isEnglish={isEnglish} />
                <ComimoBrandIntro isEnglish={isEnglish} />
                <Suspense fallback={<LoadingSpinner />}>
                  <LazyAboutSection isEnglish={isEnglish} />
                </Suspense>
                <Suspense fallback={<LoadingSpinner />}>
                  <LazyContactSection isEnglish={isEnglish} />
                </Suspense>
                <Footer isEnglish={isEnglish} />
              </>
            } />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/products/:id" element={
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <LoadingSpinner size="lg" />
                </div>
              }>
                <LazyProductDetails />
              </Suspense>
            } />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

export default AppRoutes;