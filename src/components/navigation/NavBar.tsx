import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useScrollDetection } from '../../hooks/ui/useScrollDetection';
import { getNavLinks } from '../../data/navigation';
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
  const isScrolled = useScrollDetection(20);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isProductDetailPage = location.pathname.startsWith('/products/');
  const navLinks = getNavLinks(isEnglish);

  // 根據滾動狀態和主題模式決定背景色
  const getBackgroundColor = () => {
    if (!isScrolled) return 'transparent';
    return isDarkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)';
  };

  // 根據滾動狀態和主題模式決定邊框色
  const getBorderColor = () => {
    if (!isScrolled) return 'transparent';
    return isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.3)';
  };

  // 根據頁面類型和滾動狀態決定文字顏色
  const getTextColorClass = () => {
    if (!isScrolled || (isProductDetailPage && !isScrolled)) {
      // 頂端時：始終使用白色文字（適合深色背景）
      return 'text-white hover:text-blue-200';
    } else {
      // 滾動時：根據主題模式決定顏色
      if (isDarkMode) {
        return 'text-gray-100 hover:text-blue-300';
      } else {
        return 'text-gray-800 hover:text-blue-600';
      }
    }
  };

  return (
    <nav 
      className="fixed w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: getBackgroundColor(),
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? `1px solid ${getBorderColor()}` : 'none',
        boxShadow: isScrolled ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none'
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
                    className={`${getTextColorClass()} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
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
              className={`${getTextColorClass()} p-1 rounded-full transition-colors duration-200`}
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