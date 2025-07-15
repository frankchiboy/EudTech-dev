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
  const navLinks = getNavLinks(isEnglish);

  // 根據滾動狀態和主題模式決定背景色
  const getBackgroundColor = () => {
    if (!isScrolled) return 'transparent';
    return isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)';
  };

  // 根據滾動狀態和主題模式決定邊框色
  const getBorderColor = () => {
    if (!isScrolled) return 'transparent';
    return isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)';
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
                  <NavLink 
                    key={link.name} 
                    link={link} 
                    isScrolled={isScrolled}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <LanguageToggle 
              isEnglish={isEnglish}
              toggleLanguage={toggleLanguage}
              isScrolled={isScrolled}
            />
            <ThemeToggle 
              themeMode={themeMode}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              isScrolled={isScrolled}
            />
          </div>
          
          <div className="md:hidden flex items-center">
            <LanguageToggle 
              isEnglish={isEnglish}
              toggleLanguage={toggleLanguage}
              isScrolled={isScrolled}
              mobile
            />
            <ThemeToggle 
              themeMode={themeMode}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              isScrolled={isScrolled}
              mobile
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isScrolled 
                  ? 'text-neutral-800 dark:text-neutral-100' 
                  : 'text-white'
              } p-1 rounded-full transition-colors duration-200`}
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