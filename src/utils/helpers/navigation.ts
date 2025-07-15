export const scrollToSection = (sectionId: string, offset: number = 100) => {
  const currentPath = window.location.pathname;
  
  if (currentPath === '/') {
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
    // 不在首頁，先跳轉到首頁然後滾動到目標區塊
    window.location.href = `/#${sectionId}`;
  }
};

export const handleNavClick = (href: string, e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }
  
  if (href.startsWith('#')) {
    const sectionId = href.substring(1);
    scrollToSection(sectionId);
  } else {
    window.location.href = href;
  }
};