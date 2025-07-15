import React from 'react';
import { NavLink as NavLinkType } from '../../types';
import { handleNavClick } from '../../utils/helpers/navigation';

interface NavLinkProps {
  link: NavLinkType;
  textColorClass: string;
}

const NavLink: React.FC<NavLinkProps> = ({ link, textColorClass }) => {
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