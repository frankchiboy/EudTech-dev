import { HeroContent } from '../types';

export const getHeroContent = (isEnglish: boolean): HeroContent => {
  return {
    title: {
      main: isEnglish ? 'Next Generation' : '下一代',
      highlight: isEnglish ? 'AI Infrastructure' : 'AI 基礎設施'
    },
    subtitle: isEnglish 
      ? 'High-performance AI servers and cloud solutions for enterprises and researchers.'
      : '為企業和研究人員提供高效能AI伺服器和雲端解決方案。',
    buttons: {
      primary: isEnglish ? 'Explore Products' : '探索產品',
      secondary: isEnglish ? 'Contact Us' : '聯絡我們'
    }
  };
};