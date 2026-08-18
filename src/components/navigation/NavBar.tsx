import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getNavLinks } from '../../data/navigation';
import { handleNavClick } from '../../utils/helpers/navigation';
import { ThemeMode } from '../../types';
import Logo from '../common/Logo';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import NavLink from './NavLink';
import MobileMenu from './MobileMenu';
import { SITE_CTA } from '../../data/siteArchitecture';

interface NavBarProps {
  isEnglish: boolean;
  toggleLanguage: () => void;
  themeMode: ThemeMode;
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
  const isProductDetailPage = /^\/products\/[^/]+\/?$/.test(location.pathname);
  const navLinks = getNavLinks(isEnglish);
  const ctaLabel = (value: { zh: string; en: string }) => (isEnglish ? value.en : value.zh);

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
  const renderLinkLabel = (link: ReturnType<typeof getNavLinks>[number]) => {
    if (!link.labelLines?.length) {
      return link.name;
    }

    return (
      <span className="flex flex-col items-center justify-center leading-tight">
        {link.labelLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    );
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
              <Logo inverse={textColorClass.includes('text-white') || textColorClass.includes('text-gray-100')} />
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="ml-8 flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) =>
                link.isDropdown ? (
                  <NavLink key={link.name} link={link} textColorClass={textColorClass} />
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    aria-label={link.name}
                    className={`${textColorClass} flex min-h-10 items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ease-out ${
                      isHomePage && scrollY < 30 ? 'text-shadow-sm' : ''
                    }`}
                  >
                    {renderLinkLabel(link)}
                  </a>
                )
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <a
              href={SITE_CTA.configurator.href}
              onClick={(event) => handleNavClick(SITE_CTA.configurator.href, event)}
              className={`${textColorClass} hidden xl:inline-flex min-h-10 items-center rounded-md border border-current px-3 text-xs font-semibold transition hover:border-cyan-300 hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-300`}
            >
              {ctaLabel(SITE_CTA.configurator)}
            </a>
            <a
              href={SITE_CTA.contact.href}
              onClick={(event) => handleNavClick(SITE_CTA.contact.href, event)}
              className="inline-flex min-h-10 items-center rounded-md bg-cyan-400 px-3 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            >
              {ctaLabel(SITE_CTA.contact)}
            </a>
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

          <div className="lg:hidden flex items-center">
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
              aria-label={isOpen ? (isEnglish ? 'Close menu' : '關閉選單') : (isEnglish ? 'Open menu' : '開啟選單')}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
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
      />
    </nav>
  );
};

export default NavBar;
