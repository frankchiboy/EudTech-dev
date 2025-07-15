import React from 'react';
import { NavLink } from '../../types';

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navLinks, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg border-t border-neutral-200 dark:border-gray-700">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={onClose}
            className="text-neutral-800 dark:text-neutral-100 hover:text-eudtech-700 dark:hover:text-eudtech-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;