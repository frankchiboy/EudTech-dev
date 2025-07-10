import React from 'react';
import Logo from './Logo';

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
        { name: isEnglish ? 'AI Server' : 'AI伺服器', href: '#eudtech-products', active: true },
        { name: isEnglish ? 'Cloud AI Services' : '雲端AI服務', href: '#eudtech-products', active: true },
        { name: isEnglish ? 'Comino Grando' : 'Comino Grando', href: '#comino-products', active: true },
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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="xl:col-span-1 space-y-8">
            <div>
              <Logo />
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              {isEnglish
                ? 'Pioneering AI infrastructure for the next generation of intelligent applications.'
                : '為下一代智能應用開創人工智能基礎設施。'}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                  {footerLinks.company.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.company.links.map((link) => (
                    <li key={link.name}>
                      {link.active ? (
                        <a
                          href={link.href}
                          target={link.target}
                          className="text-base text-gray-400 hover:text-gray-300 transition duration-150"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <span className="text-base text-gray-500 cursor-not-allowed opacity-60">
                          {link.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                  {footerLinks.products.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.products.links.map((link) => (
                    <li key={link.name}>
                      {link.active ? (
                        <a
                          href={link.href}
                          className="text-base text-gray-400 hover:text-gray-300 transition duration-150"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <span className="text-base text-gray-500 cursor-not-allowed opacity-60">
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
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                  {footerLinks.legal.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.legal.links.map((link) => (
                    <li key={link.name}>
                      {link.active ? (
                        <a
                          href={link.href}
                          className="text-base text-gray-400 hover:text-gray-300 transition duration-150"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <span className="text-base text-gray-500 cursor-not-allowed opacity-60">
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
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {currentYear} {isEnglish ? 'Eudaemonia Technology Ltd.' : '優達盟資訊科技有限公司'} {isEnglish ? 'All rights reserved.' : '保留所有權利。'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;