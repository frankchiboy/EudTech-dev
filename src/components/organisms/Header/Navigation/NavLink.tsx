import React from 'react';
import { NavLink as NavLinkType } from '../../../../types';
import { handleNavClick } from '../../../../utils/helpers/navigation';

interface NavLinkProps {
  link: NavLinkType;
  textColor: string;
}

const NavLink: React.FC<NavLinkProps> = ({ link, textColor }) => {
  return (
    <a
      href={link.href}
      onClick={(e) => handleNavClick(link.href, e)}
      className={`${textColor} hover:opacity-80 px-3 py-2 text-sm font-medium transition-all duration-200 relative group`}
    >
      {link.name}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
    </a>
  );
};

export default NavLink;