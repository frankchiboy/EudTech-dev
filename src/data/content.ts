import { HeroContent } from '../types';

export const getHeroContent = (isEnglish: boolean): HeroContent => {
  return {
    title: {
      main: isEnglish ? 'Empowering the Future' : '賦能未來',
      highlight: isEnglish ? 'Through AI Innovation' : '透過AI創新'
    },
    subtitle: isEnglish 
      ? 'Groundbreaking AI solutions that transform industries and enhance human potential.'
      : '開創性的AI解決方案，改變產業格局，提升人類潛能。',
    buttons: {
      primary: isEnglish ? 'Explore Products' : '探索產品',
      secondary: isEnglish ? 'Contact Us' : '聯絡我們'
    }
  };
};