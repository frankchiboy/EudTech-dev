import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToAnchor = () => {
        const element = document.getElementById(hash.slice(1));
        if (!element) return false;
        window.scrollTo({ top: Math.max(0, element.getBoundingClientRect().top + window.scrollY - 100), behavior: 'auto' });
        return true;
      };
      if (scrollToAnchor()) return;

      // Lazy routes may mount after this effect. Keep the anchor intent until
      // its section exists, and cancel it when the visitor navigates elsewhere.
      const observer = new MutationObserver(() => {
        if (scrollToAnchor()) {
          observer.disconnect();
          window.clearTimeout(timeout);
        }
      });
      const timeout = window.setTimeout(() => observer.disconnect(), 5000);
      observer.observe(document.body, { childList: true, subtree: true });
      return () => {
        observer.disconnect();
        window.clearTimeout(timeout);
      };
    }
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
  }, [pathname, hash, state]);

  return null;
};

export default ScrollToTop;
