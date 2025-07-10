import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import Logo from './Logo';

interface NavBarProps {
  toggleLanguage: () => void;
  isEnglish: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ toggleLanguage, isEnglish }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: isEnglish ? 'Home' : '首頁', href: '#home' },
    { name: isEnglish ? 'Products' : '產品', href: '#eudtech-products' },
    { name: isEnglish ? 'Comino' : 'Comino', href: '#comino-brand' },
    { name: isEnglish ? 'About' : '關於我們', href: '#about' },
    { name: isEnglish ? 'Contact' : '聯絡我們', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-200' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`${
                      isScrolled ? 'text-neutral-800 hover:text-eudtech-700' : 'text-white hover:text-eudtech-200'
                    } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <button
              onClick={toggleLanguage}
              className={`flex items-center ${
                isScrolled ? 'text-neutral-800 hover:text-eudtech-700' : 'text-white hover:text-eudtech-200'
              } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
            >
              <Globe size={18} className="mr-1" />
              {isEnglish ? '中文' : 'EN'}
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleLanguage}
              className={`mr-2 ${
                isScrolled ? 'text-neutral-800' : 'text-white'
              } p-1 rounded-full transition-colors duration-200`}
            >
              <Globe size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isScrolled ? 'text-neutral-800' : 'text-white'
              } p-1 rounded-full transition-colors duration-200`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-neutral-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-neutral-800 hover:text-eudtech-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;