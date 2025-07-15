import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
  const navLinks = getNavLinks(isEnglish);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-neutral-200 dark:border-gray-700' 
          : 'bg-transparent'
      }`}
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
                isScrolled ? 'text-neutral-800 dark:text-neutral-100' : 'text-white'
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