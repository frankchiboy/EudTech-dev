import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      // 檢查是否有從 sessionStorage 傳遞的滾動目標
      const scrollTarget = sessionStorage.getItem('scrollToSection');
      if (scrollTarget) {
        sessionStorage.removeItem('scrollToSection');
        setTimeout(() => {
          const element = document.getElementById(scrollTarget);
          if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 300); // 增加延遲確保頁面完全加載
        return;
      }
      
      // 檢查 React Router state 中的滾動目標
      if (state && state.fromSection) {
        const sectionId = state.fromSection;
        const element = document.getElementById(sectionId);
        
        if (element) {
          setTimeout(() => {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }, 100);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        // 檢查 URL hash
        const hash = window.location.hash;
        if (hash) {
          const sectionId = hash.substring(1);
          setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition - 100;
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }, 300);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } else {
      // 不在首頁，直接滾動到頂部
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, state]);

  return null;
};

export default ScrollToTop;