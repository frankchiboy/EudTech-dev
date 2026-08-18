import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { NavLink as NavLinkType } from '../../types';
import { handleNavClick } from '../../utils/helpers/navigation';

interface NavLinkProps {
  link: NavLinkType;
  textColorClass: string;
}

const NavLink: React.FC<NavLinkProps> = ({ link, textColorClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const renderLabel = () => {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  if (link.isDropdown) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            if (!link.disabled) {
              setIsOpen((prev) => !prev);
            }
          }}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={`nav-menu-${link.name.replace(/\s+/g, '-')}`}
          className={`${textColorClass} px-2.5 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-400 relative group ${
            link.disabled ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {link.name}
          {isOpen ? (
            <ChevronUp className="h-4 w-4 transform transition-transform" />
          ) : (
            <ChevronDown className="h-4 w-4 transform transition-transform" />
          )}
          {link.disabled && (
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {link.disabledText || 'Coming Soon'}
            </span>
          )}
        </button>
        {isOpen && !link.disabled && link.children && (
          <div id={`nav-menu-${link.name.replace(/\s+/g, '-')}`} role="menu" className="absolute left-0 mt-2 w-72 rounded-md shadow-lg p-2 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 transform origin-top-left">
            {link.children.map((child) => (
              <a
                key={child.name}
                href={child.href}
                onClick={(e) => {
                  handleNavClick(child.href, e);
                  setIsOpen(false);
                }}
                role="menuitem"
                className="block rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <span className="block font-semibold">{child.name}</span>
                {child.description && <span className="mt-1 block text-xs leading-5 text-gray-500 dark:text-gray-400">{child.description}</span>}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={link.href}
      onClick={(e) => handleNavClick(link.href, e)}
      aria-label={link.name}
      className={`${textColorClass} flex min-h-10 items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200`}
    >
      {renderLabel()}
    </a>
  );
};

export default NavLink;
