import React from 'react';
import { NavLink as NavLinkType } from '../../types';
import { handleNavClick } from '../../utils/helpers/navigation';

interface NavLinkProps {
  link: NavLinkType;
  isScrolled: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ link, isScrolled }) => {
  return (
    <a
      href={link.href}
      onClick={(e) => handleNavClick(link.href, e)}
      className={`${
        isScrolled 
          ? 'text-neutral-800 dark:text-neutral-100 hover:text-eudtech-700 dark:hover:text-eudtech-400' 
          : 'text-white hover:text-eudtech-200 dark:text-gray-100 dark:hover:text-eudtech-300'
      } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
    >
      {link.name}
    </a>
  );
};

export default NavLink;