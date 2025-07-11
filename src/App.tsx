import { useState, useEffect } from 'react';
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
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');
  const [isDarkModeActive, setIsDarkModeActive] = useState(false);
  
  useEffect(() => {
    // 檢查本地存儲中的主題設置
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setThemeMode(savedTheme);
      applyTheme(savedTheme);
    } else {
      // 預設為跟隨系統
      setThemeMode('system');
      applyTheme('system');
    }
  }, []);

  useEffect(() => {
    // 監聽系統主題變化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // 只有在設定為跟隨系統時才更新
      if (themeMode === 'system') {
        const isDark = e.matches;
        setIsDarkModeActive(isDark);
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    // 設定初始狀態
    if (themeMode === 'system') {
      const isDark = mediaQuery.matches;
      setIsDarkModeActive(isDark);
    } else {
      setIsDarkModeActive(themeMode === 'dark');
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  const applyTheme = (mode: 'light' | 'dark' | 'system') => {
    if (mode === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkModeActive(systemDark);
      if (systemDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      const isDark = mode === 'dark';
      setIsDarkModeActive(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };
  
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };
  
  const toggleDarkMode = () => {
    let newMode: 'light' | 'dark' | 'system';
    
    if (themeMode === 'system') {
      newMode = 'light';
    } else if (themeMode === 'light') {
      newMode = 'dark';
    } else {
      newMode = 'system';
    }
    
    setThemeMode(newMode);
    applyTheme(newMode);
    localStorage.setItem('theme', newMode);
  };

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
        <ScrollToTop />
        <NavBar 
          toggleLanguage={toggleLanguage} 
          isEnglish={isEnglish}
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