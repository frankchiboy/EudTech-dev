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
import AboutSection from './AboutSection';
import ContactSection from './contact/ContactSection';

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
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection isEnglish={isEnglish} />
              <EudTechProductsSection isEnglish={isEnglish} />
              <ComimoBrandIntro isEnglish={isEnglish} />
              <AboutSection isEnglish={isEnglish} />
              <ContactSection isEnglish={isEnglish} />
              <Footer isEnglish={isEnglish} />
            </>
          } />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
      </main>
    </>
  );
};

export default AppRoutes;