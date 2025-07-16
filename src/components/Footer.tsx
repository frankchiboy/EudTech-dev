import React from 'react';
import Logo from './common/Logo';
import { handleNavClick } from '../utils/helpers/navigation';

interface FooterLink {
  name: string;
  href: string;
  target?: string;
  active: boolean;
}

interface FooterLinks {
  company: {
    title: string;
    links: FooterLink[];
  };
  products: {
    title: string;
    links: FooterLink[];
  };
  legal: {
    title: string;
    links: FooterLink[];
  };
}

interface FooterProps {
  isEnglish: boolean;
}

const Footer: React.FC<FooterProps> = ({ isEnglish }) => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks: FooterLinks = {
    company: {
      title: isEnglish ? 'Company' : '公司',
      links: [
        { name: isEnglish ? 'About' : '關於我們', href: '#about', active: true },
        { name: isEnglish ? 'Careers' : '職業機會', href: 'https://www.104.com.tw/company/1a2x6bmxg5', target: '_blank', active: true },
        { name: isEnglish ? 'News' : '新聞', href: '#', active: false },
        { name: isEnglish ? 'Blog' : '部落格', href: '#', active: false },
      ],
    },
    products: {
      title: isEnglish ? 'Products' : '產品',
      links: [
        { name: isEnglish ? 'FinSight Financial AI System' : 'FinSight 金融AI系統', href: '#eudtech-products', active: true },
        { name: isEnglish ? 'Comino Grando' : 'Comino Grando', href: '#comino-brand', active: false },
      ],
    },
    legal: {
      title: isEnglish ? 'Legal' : '法律',
      links: [
        { name: isEnglish ? 'Privacy Policy' : '隱私政策', href: '#', active: false },
        { name: isEnglish ? 'Terms of Service' : '服務條款', href: '#', active: false },
        { name: isEnglish ? 'Cookie Policy' : 'Cookie政策', href: '#', active: false },
      ],
    },
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgNnY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="xl:col-span-1 space-y-8">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Logo />
            </div>
            <p className="text-gray-400 dark:text-gray-300 text-sm max-w-xs backdrop-blur-sm">
              {isEnglish
                ? 'Pioneering AI infrastructure for the next generation of intelligent applications.'
                : '為下一代智能應用開創人工智能基礎設施。'}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 dark:text-gray-200 relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 to-teal-400 h-0.5 w-1/2 absolute -bottom-1 left-0 transform transition-all duration-300 group-hover:w-full"></span>
                  {footerLinks.company.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.company.links.map((link) => (
                    <li key={link.name}>
                      {link.active ? (
                        <a
                          href={link.href}
                          target={link.target}
                          onClick={!link.target ? (e) => handleNavClick(link.href, e) : undefined}
                          className="text-base text-gray-400 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white transition-all duration-300 group relative inline-block"
                        >
                          {link.name}
                          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                      ) : (
                        <span className="text-base text-gray-500 dark:text-gray-500 cursor-not-allowed opacity-60">
                          {link.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 dark:text-gray-200 relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 to-teal-400 h-0.5 w-1/2 absolute -bottom-1 left-0 transform transition-all duration-300 group-hover:w-full"></span>
                  {footerLinks.products.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.products.links.map((link) => (
                    <li key={link.name}>
                      {link.active ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(link.href, e)}
                          className="text-base text-gray-400 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white transition duration-150"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <span className="text-base text-gray-500 dark:text-gray-500 cursor-not-allowed opacity-60">
                          {link.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 dark:text-gray-200 relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 to-teal-400 h-0.5 w-1/2 absolute -bottom-1 left-0 transform transition-all duration-300 group-hover:w-full"></span>
                  {footerLinks.legal.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.legal.links.map((link) => (
                    <li key={link.name}>
                      {link.active ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(link.href, e)}
                          className="text-base text-gray-400 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white transition duration-150"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <span className="text-base text-gray-500 dark:text-gray-500 cursor-not-allowed opacity-60">
                          {link.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 relative">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-700 dark:via-gray-600 to-transparent"></div>
          <p className="text-base text-gray-400 dark:text-gray-300 text-center">
            &copy; {currentYear} <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent font-semibold">{isEnglish ? 'Eudaemonia Technology Ltd.' : '優達盟資訊科技有限公司'}</span> {isEnglish ? 'All rights reserved.' : '保留所有權利。'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;