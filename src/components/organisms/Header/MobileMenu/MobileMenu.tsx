import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { getNavLinks } from '../../../../data/navigation';
import { handleNavClick } from '../../../../utils/helpers/navigation';
import ThemeToggle from '../Navigation/ThemeToggle';
import LanguageToggle from '../Navigation/LanguageToggle';

interface MobileMenuProps {
  isEnglish: boolean;
  toggleLanguage: () => void;
  themeMode: any;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  textColor: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isEnglish,
  toggleLanguage,
  themeMode,
  isDarkMode,
  toggleDarkMode,
  textColor
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = getNavLinks(isEnglish);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Mobile menu controls */}
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
        <button
          onClick={toggleMenu}
          className={`${textColor} p-2`}
          aria-label="開啟選單"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-lg">
          <nav className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(link.href, e);
                  closeMenu();
                }}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;