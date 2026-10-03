import { isEnglishPath, languagePath } from '../seo/languageUrl';

export const scrollToSection = (sectionId: string, offset: number = 100) => {
  const currentPath = window.location.pathname;
  
  if (currentPath === '/' || currentPath === '/en/' || currentPath === '/en') {
    // 在首頁，直接滾動到目標區塊
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  } else {
    // 不在首頁，跳轉到首頁並滾動到目標區塊
    // 使用 sessionStorage 來傳遞滾動目標
    sessionStorage.setItem('scrollToSection', sectionId);
    window.location.href = languagePath('/', isEnglishPath(currentPath));
  }
};

export const handleNavClick = (href: string, e?: React.MouseEvent) => {
  if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)) return;
  if (e) {
    e.preventDefault();
  }
  
  if (href.startsWith('#')) {
    const sectionId = href.substring(1);
    scrollToSection(sectionId);
  } else {
    window.location.href = href.startsWith('/') ? languagePath(href, isEnglishPath(window.location.pathname)) : href;
  }
};
