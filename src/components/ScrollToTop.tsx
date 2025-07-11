import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // 如果是返回首頁且有來源產品卡片資訊
    if (pathname === '/' && state && state.fromSection) {
      const sectionId = state.fromSection;
      const element = document.getElementById(sectionId);
      
      if (element) {
        // 延遲一點時間確保頁面已載入
        setTimeout(() => {
          // 計算滾動位置，向上偏移 100px 以確保卡片完全可見
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 100;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      } else {
        // 如果找不到產品卡片，就滾動到頂端
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // 正常情況下滾動到頂端
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, state]);

  return null; // 這個組件不渲染任何內容
};

export default ScrollToTop;
