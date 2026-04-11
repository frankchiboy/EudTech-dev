import React from 'react';
import { getNavLinks } from '../../../../data/navigation';
import Logo from '../../../atoms/Logo/Logo';
import NavLink from './NavLink';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

interface NavigationProps {
  isEnglish: boolean;
  toggleLanguage: () => void;
  themeMode: any;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  textColor: string;
}

const Navigation: React.FC<NavigationProps> = ({
  isEnglish,
  toggleLanguage,
  themeMode,
  isDarkMode,
  toggleDarkMode,
  textColor
}) => {
  const navLinks = getNavLinks(isEnglish);

  return (
    <>
      {/* Logo */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <nav className="flex space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              link={link}
              textColor={textColor}
            />
          ))}
        </nav>
        
        <div className="flex items-center space-x-2">
          <LanguageToggle
            isEnglish={isEnglish}
            toggleLanguage={toggleLanguage}
            textColor={textColor}
          />
          <ThemeToggle
            themeMode={themeMode}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            textColor={textColor}
          />
        </div>
      </div>
    </>
  );
};

export default Navigation;