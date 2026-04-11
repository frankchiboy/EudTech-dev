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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (link.isDropdown) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => {
            if (!link.disabled) {
              setIsOpen((prev) => !prev);
            }
          }}
          className={`${textColorClass} px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out flex items-center gap-1 focus:outline-none relative group ${
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
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 transform origin-top-left">
            {link.children.map((child) => (
              <a
                key={child.name}
                href={child.href}
                onClick={(e) => {
                  handleNavClick(child.href, e);
                  setIsOpen(false);
                }}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {child.name}
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
      className={`${textColorClass} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
    >
      {link.name}
    </a>
  );
};

export default NavLink;
