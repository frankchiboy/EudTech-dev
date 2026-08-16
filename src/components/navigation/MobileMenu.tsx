import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { NavLink, ThemeMode } from '../../types';
import { handleNavClick } from '../../utils/helpers/navigation';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { SITE_CTA } from '../../data/siteArchitecture';

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
  onClose: () => void;
  isEnglish: boolean;
  toggleLanguage: () => void;
  themeMode: ThemeMode;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isScrolled: boolean;
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
  isScrolled
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);
  const renderLinkLabel = (link: NavLink) => {
    if (!link.labelLines?.length) {
      return link.name;
    }

    return (
      <span className="flex flex-col leading-tight">
        {link.labelLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div id="mobile-navigation" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg border-t border-neutral-200 dark:border-gray-700 lg:hidden" role="dialog" aria-modal="true" aria-label={isEnglish ? 'Mobile navigation' : '手機導覽'}>
      <div className="min-h-full px-4 pb-8 pt-4 space-y-1 sm:px-6">
        <div className="grid gap-3 pb-4 sm:grid-cols-2">
          <a
            href={SITE_CTA.configurator.href}
            onClick={(event) => {
              handleNavClick(SITE_CTA.configurator.href, event);
              onClose();
            }}
            className="flex min-h-11 items-center justify-center rounded-md border border-blue-200 px-4 text-sm font-semibold text-blue-800 dark:border-blue-700 dark:text-blue-200"
          >
            {isEnglish ? SITE_CTA.configurator.en : SITE_CTA.configurator.zh}
          </a>
          <a
            href={SITE_CTA.contact.href}
            onClick={(event) => {
              handleNavClick(SITE_CTA.contact.href, event);
              onClose();
            }}
            className="flex min-h-11 items-center justify-center rounded-md bg-cyan-400 px-4 text-sm font-semibold text-slate-950"
          >
            {isEnglish ? SITE_CTA.contact.en : SITE_CTA.contact.zh}
          </a>
        </div>
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
                        className="text-neutral-700 dark:text-neutral-200 hover:text-eudtech-700 dark:hover:text-eudtech-300 block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="text-neutral-800 dark:text-neutral-100 hover:text-eudtech-700 dark:hover:text-eudtech-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label={link.name}
              >
                {renderLinkLabel(link)}
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
