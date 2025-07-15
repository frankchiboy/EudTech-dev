import { NavLink } from '../types';

export const getNavLinks = (isEnglish: boolean): NavLink[] => {
  return [
    {
      name: isEnglish ? 'Home' : '首頁',
      href: '#home'
    },
    {
      name: isEnglish ? 'Products' : '產品',
      href: '#eudtech-products'
    },
    {
      name: isEnglish ? 'Comino' : 'Comino',
      href: '#comino-brand'
    },
    {
      name: isEnglish ? 'About' : '關於我們',
      href: '#about'
    },
    {
      name: isEnglish ? 'Contact' : '聯絡我們',
      href: '#contact'
    }
  ];
};