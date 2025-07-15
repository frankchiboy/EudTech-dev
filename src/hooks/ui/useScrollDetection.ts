import { useState, useEffect } from 'react';

export const useScrollDetection = (threshold: number = 20) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // 初始檢查
    const initialCheck = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > threshold);
    };
    
    initialCheck();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeScrolled = scrollY > threshold;
      setIsScrolled(shouldBeScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', initialCheck);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};