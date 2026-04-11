import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { NavLink } from '../../types';
import { handleNavClick } from '../../utils/helpers/navigation';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
  onClose: () => void;
  isEnglish: boolean;
  toggleLanguage: () => void;
  themeMode: any;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isScrolled: boolean;
  textColorClass: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  navLinks, 
  onClose,
  isEnglish,
  toggleLanguage,
  themeMode,
  isDarkMode,
  toggleDarkMode,
  isScrolled,
  textColorClass
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg border-t border-neutral-200 dark:border-gray-700">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {/* 導航連結 */}
        {navLinks.map((link) => (
          <div key={link.name}>
            {link.isDropdown ? (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    if (!link.disabled) {
                      setOpenDropdowns((prev) => ({
                        ...prev,
                        [link.name]: !prev[link.name],
                      }));
                    }
                  }}
                  className={`text-neutral-800 dark:text-neutral-100 hover:text-eudtech-700 dark:hover:text-eudtech-300 flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 relative ${
                    link.disabled ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  <span>{link.name}</span>
                  {link.disabled ? (
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      ({link.disabledText || (isEnglish ? 'Coming Soon' : '即將推出')})
                    </span>
                  ) : openDropdowns[link.name] ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {!link.disabled && openDropdowns[link.name] && link.children && (
                  <div className="pl-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 ml-3 mt-1">
                    {link.children.map((child) => (
                      <a
                        key={child.name}
                        href={child.href}
                        onClick={(e) => {
                          handleNavClick(child.href, e);
                          onClose();
                        }}
                        className="text-neutral-700 dark:text-neutral-200 hover:text-eudtech-700 dark:hover:text-eudtech-300 block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        {child.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                href={link.href}
                onClick={(e) => {
                  handleNavClick(link.href, e);
                  onClose();
                }}
                className="text-neutral-800 dark:text-neutral-100 hover:text-eudtech-700 dark:hover:text-eudtech-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            )}
          </div>
        ))}
        
        {/* 分隔線 */}
        <div className="border-t border-neutral-200 dark:border-gray-700 my-2"></div>
        
        {/* 控制項區域 */}
        <div className="flex items-center justify-center space-x-4 py-2">
          <LanguageToggle 
            isEnglish={isEnglish}
            toggleLanguage={toggleLanguage}
            isScrolled={isScrolled}
            textColorClass="text-neutral-800 dark:text-neutral-100"
            mobile
          />
          <ThemeToggle 
            themeMode={themeMode}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            isScrolled={isScrolled}
            textColorClass="text-neutral-800 dark:text-neutral-100"
            mobile
          />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
