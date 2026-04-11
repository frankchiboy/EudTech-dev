import React from 'react';
import { useScrollDetection } from '../../../hooks/ui/useScrollDetection';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import MobileMenu from './MobileMenu/MobileMenu';
import { classNames } from '../../../utils/helpers';

interface HeaderProps {
  isEnglish: boolean;
  toggleLanguage: () => void;
  themeMode: any;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isEnglish,
  toggleLanguage,
  themeMode,
  isDarkMode,
  toggleDarkMode
}) => {
  const isScrolled = useScrollDetection(20);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const getHeaderStyles = () => {
    if (isHomePage && !isScrolled) {
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent'
      };
    }
    
    return {
      backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderColor: isDarkMode ? 'rgba(55, 65, 81, 0.2)' : 'rgba(229, 231, 235, 0.2)',
      backdropFilter: 'blur(10px)'
    };
  };

  const getTextColor = () => {
    if (isHomePage && !isScrolled) {
      return 'text-white';
    }
    return isDarkMode ? 'text-gray-100' : 'text-gray-900';
  };

  return (
    <header
      className={classNames(
        'fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300',
        'supports-[backdrop-filter]:backdrop-blur-sm'
      )}
      style={getHeaderStyles()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Navigation
            isEnglish={isEnglish}
            toggleLanguage={toggleLanguage}
            themeMode={themeMode}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            textColor={getTextColor()}
          />
          
          <MobileMenu
            isEnglish={isEnglish}
            toggleLanguage={toggleLanguage}
            themeMode={themeMode}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            textColor={getTextColor()}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;