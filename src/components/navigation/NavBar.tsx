import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
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

  const scrollProgress = Math.min(scrollY / 100, 1);
  const isScrolled = scrollY > 20;

  const getBackgroundColor = () => {
    if (isProductDetailPage) {
      if (scrollProgress < 0.1) {
        return 'transparent';
      }
      const bgColor = isDarkMode ? '17, 24, 39' : '255, 255, 255';
      const opacity = Math.min(scrollProgress * 0.9, 0.9);
      return `rgba(${bgColor}, ${opacity})`;
    }

    if (location.pathname === '/careers') {
      const bgColor = isDarkMode ? '17, 24, 39' : '255, 255, 255';
      return `rgba(${bgColor}, 0.95)`;
    }

    const bgColor = isDarkMode ? '17, 24, 39' : '255, 255, 255';
    const opacity = Math.max(0.2, Math.min(scrollProgress * 0.8, 0.8));
    return `rgba(${bgColor}, ${opacity})`;
  };

  const getBorderColor = () => {
    if (isProductDetailPage && scrollProgress < 0.1) {
      return 'transparent';
    }

    if (location.pathname === '/careers') {
      const borderColor = isDarkMode ? '55, 65, 81' : '229, 231, 235';
      return `rgba(${borderColor}, 0.3)`;
    }

    const borderColor = isDarkMode ? '55, 65, 81' : '229, 231, 235';
    const opacity = Math.max(0.05, Math.min(scrollProgress * 0.2, 0.2));
    return `rgba(${borderColor}, ${opacity})`;
  };

  const getTextColorClass = () => {
    if (isProductDetailPage) {
      return isDarkMode
        ? 'text-gray-100 hover:text-blue-300'
        : 'text-gray-800 hover:text-blue-600';
    }

    if (location.pathname === '/careers') {
      return isDarkMode
        ? 'text-gray-100 hover:text-blue-300'
        : 'text-gray-800 hover:text-blue-600';
    }

    if (scrollProgress < 0.3) {
      return 'text-white hover:text-blue-200 font-medium text-shadow-sm tracking-wide';
    }

    return isDarkMode
      ? 'text-gray-100 hover:text-blue-300'
      : 'text-gray-800 hover:text-blue-600';
  };

  const getBlurEffect = () => {
    if (isProductDetailPage) {
      if (scrollProgress < 0.1) {
        return 'none';
      }
      return scrollProgress > 0.3 ? 'blur(10px)' : 'blur(6px)';
    }

    if (location.pathname === '/careers') {
      return 'blur(8px)';
    }

    if (scrollProgress > 0.2) {
      const blurIntensity = Math.max(4, Math.min(scrollProgress * 10, 8));
      return `blur(${blurIntensity}px)`;
    }

    return 'none';
  };

  const getShadowEffect = () => {
    if (isProductDetailPage && scrollProgress < 0.1) {
      return 'none';
    }

    if (location.pathname === '/careers') {
      return '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
    }

    const shadowOpacity = Math.max(0.03, Math.min(scrollProgress * 0.08, 0.05));
    return `0 1px 3px 0 rgba(0, 0, 0, ${shadowOpacity})`;
  };

  const textColorClass = getTextColorClass();

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
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) =>
                link.isDropdown ? (
                  <NavLink key={link.name} link={link} textColorClass={textColorClass} />
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={`${textColorClass} px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out ${
                      isHomePage && scrollY < 30 ? 'text-shadow-sm' : ''
                    }`}
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <LanguageToggle
              isEnglish={isEnglish}
              toggleLanguage={toggleLanguage}
              isScrolled={isScrolled}
              textColorClass={textColorClass}
            />
            <ThemeToggle
              themeMode={themeMode}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              isScrolled={isScrolled}
              textColorClass={textColorClass}
            />
          </div>

          <div className="md:hidden flex items-center">
            <LanguageToggle
              isEnglish={isEnglish}
              toggleLanguage={toggleLanguage}
              isScrolled={isScrolled}
              textColorClass={textColorClass}
              mobile
            />
            <ThemeToggle
              themeMode={themeMode}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              isScrolled={isScrolled}
              textColorClass={textColorClass}
              mobile
            />
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className={`${textColorClass} p-1 rounded-full transition-all duration-300 ease-out ml-2`}
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
        isEnglish={isEnglish}
        toggleLanguage={toggleLanguage}
        themeMode={themeMode}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isScrolled={isScrolled}
        textColorClass={textColorClass}
      />
    </nav>
  );
};

export default NavBar;
