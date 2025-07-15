import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useScrollDetection } from '../../hooks/ui/useScrollDetection';
import { getNavLinks } from '../../data/navigation';
import { handleNavClick } from '../../utils/helpers/navigation';
import Logo from '../common/Logo';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import NavLink from './NavLink';
import MobileMenu from './MobileMenu';

interface NavBarProps {
  isEnglish: boolean;
  toggleLanguage: () => void;
  themeMode: any;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ 
  isEnglish, 
  toggleLanguage, 
  themeMode, 
  isDarkMode, 
  toggleDarkMode 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isProductDetailPage = location.pathname.startsWith('/products/');
  const navLinks = getNavLinks(isEnglish);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 計算滾動進度（0-1）
  const scrollProgress = Math.min(scrollY / 100, 1);
  const isScrolled = scrollY > 20;

  // 根據滾動狀態和主題模式決定背景色
  const getBackgroundColor = () => {
    if (isProductDetailPage) {
      // 產品詳細頁面頂端完全透明
      if (scrollProgress === 0) {
        return 'transparent';
      }
      const bgColor = isDarkMode ? '17, 24, 39' : '255, 255, 255';
      const opacity = Math.min(scrollProgress * 1.2, 0.95); // 0 -> 0.95
      return `rgba(${bgColor}, ${opacity})`;
    } else {
      // 首頁漸變效果
      const bgColor = isDarkMode ? '17, 24, 39' : '255, 255, 255';
      const opacity = scrollProgress * 0.95; // 0 -> 0.95
      return `rgba(${bgColor}, ${opacity})`;
    }
  };

  // 根據滾動狀態和主題模式決定邊框色
  const getBorderColor = () => {
    if (isProductDetailPage && scrollProgress === 0) {
      return 'transparent';
    }
    const borderColor = isDarkMode ? '55, 65, 81' : '229, 231, 235';
    const opacity = scrollProgress * 0.3; // 0 -> 0.3
    return `rgba(${borderColor}, ${opacity})`;
  };

  // 根據頁面類型和滾動狀態決定文字顏色
  const getTextColorClass = () => {
    if (isProductDetailPage) {
      // 產品詳細頁面根據主題模式決定
      return isDarkMode 
        ? 'text-gray-100 hover:text-blue-300' 
        : 'text-gray-800 hover:text-blue-600';
    } else {
      // 首頁根據滾動進度漸變
      const textOpacity = Math.max(0.8, 1 - scrollProgress);
      if (scrollProgress < 0.3) {
        return 'text-white hover:text-blue-200';
      } else {
        return isDarkMode 
          ? 'text-gray-100 hover:text-blue-300' 
          : 'text-gray-800 hover:text-blue-600';
      }
    }
  };

  // 計算模糊效果
  const getBlurEffect = () => {
    if (isProductDetailPage) {
      if (scrollProgress === 0) {
        return 'none';
      }
      return scrollProgress > 0.1 ? 'blur(8px)' : 'blur(4px)';
    }
    return scrollProgress > 0.3 ? 'blur(12px)' : 'none';
  };

  // 計算陰影效果
  const getShadowEffect = () => {
    if (isProductDetailPage && scrollProgress === 0) {
      return 'none';
    }
    const shadowOpacity = scrollProgress * 0.1;
    return `0 1px 3px 0 rgba(0, 0, 0, ${shadowOpacity})`;
  };
  return (
    <nav 
      className="fixed w-full z-50 transition-all duration-500 ease-out"
      style={{
        backgroundColor: getBackgroundColor(),
        backdropFilter: getBlurEffect(),
        borderBottom: `1px solid ${getBorderColor()}`,
        boxShadow: getShadowEffect()
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={`${getTextColorClass()} px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <LanguageToggle 
              isEnglish={isEnglish}
              toggleLanguage={toggleLanguage}
              isScrolled={isScrolled}
              textColorClass={getTextColorClass()}
            />
            <ThemeToggle 
              themeMode={themeMode}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              isScrolled={isScrolled}
              textColorClass={getTextColorClass()}
            />
          </div>
          
          <div className="md:hidden flex items-center">
            <LanguageToggle 
              isEnglish={isEnglish}
              toggleLanguage={toggleLanguage}
              isScrolled={isScrolled}
              textColorClass={getTextColorClass()}
              mobile
            />
            <ThemeToggle 
              themeMode={themeMode}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              isScrolled={isScrolled}
              textColorClass={getTextColorClass()}
              mobile
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${getTextColorClass()} p-1 rounded-full transition-all duration-300 ease-out`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={isOpen}
        navLinks={navLinks}
        onClose={() => setIsOpen(false)}
      />
    </nav>
  );
};

export default NavBar;