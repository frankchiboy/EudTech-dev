import React from 'react';
import { NavLink as NavLinkType } from '../../types';

interface NavLinkProps {
  link: NavLinkType;
  isScrolled: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ link, isScrolled }) => {
  return (
    <a
      href={link.href}
      className={`${
        isScrolled ? 'text-neutral-800 hover:text-eudtech-700' : 'text-white hover:text-eudtech-200'
      } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
    >
      {link.name}
    </a>
  );
};

export default NavLink;