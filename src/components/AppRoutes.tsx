import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { useLanguageContext } from '../contexts/LanguageContext';
import NavBar from './navigation/NavBar';
import HeroSection from './hero/HeroSection';
import EudTechProductsSection from './EudTechProductsSection';
import ComimoBrandIntro from './ComimoBrandIntro';
import AboutSection from './AboutSection';
import ContactSection from './contact/ContactSection';
import Footer from './Footer';
import ProductDetails from './ProductDetails';
import ScrollToTop from './common/ScrollToTop';

const AppRoutes: React.FC = () => {
  const { themeMode, isDarkModeActive, toggleDarkMode } = useThemeContext();
  const { isEnglish, toggleLanguage } = useLanguageContext();

  return (
    <>
      <ScrollToTop />
      <NavBar 
        isEnglish={isEnglish}
        toggleLanguage={toggleLanguage}
        themeMode={themeMode}
        isDarkMode={isDarkModeActive}
        toggleDarkMode={toggleDarkMode}
      />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection isEnglish={isEnglish} />
            <EudTechProductsSection isEnglish={isEnglish} />
            <ComimoBrandIntro isEnglish={isEnglish} />
            <AboutSection isEnglish={isEnglish} />
            <ContactSection isEnglish={isEnglish} />
          </>
        } />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
};

export default AppRoutes;