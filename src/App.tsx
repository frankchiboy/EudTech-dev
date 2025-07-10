import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import EudTechProductsSection from './components/EudTechProductsSection';
import ComimoBrandIntro from './components/ComimoBrandIntro';
import CominoProductsSection from './components/CominoProductsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';

function App() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // 檢查本地存儲中的主題設置
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // 如果沒有本地存儲的設置，檢查系統偏好
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    // 監聽系統主題變化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // 只有在用戶沒有手動設置主題時才跟隨系統變化
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };
  
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
        <NavBar 
          toggleLanguage={toggleLanguage} 
          isEnglish={isEnglish}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection isEnglish={isEnglish} />
              <EudTechProductsSection isEnglish={isEnglish} />
              <ComimoBrandIntro isEnglish={isEnglish} />
              <CominoProductsSection isEnglish={isEnglish} />
              <AboutSection isEnglish={isEnglish} />
              <ContactSection isEnglish={isEnglish} />
            </>
          } />
          <Route path="/products/:id" element={<ProductDetails isEnglish={isEnglish} />} />
        </Routes>
        <Footer isEnglish={isEnglish} />
      </div>
    </Router>
  );
}

export default App;