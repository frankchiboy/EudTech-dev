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
      title: isEnglish ? 'Solutions' : '解決方案',
      links: [
        { name: isEnglish ? 'Configurator Solutions' : '配置器解決方案', href: '/solutions', active: true },
        { name: isEnglish ? 'AI Servers' : 'AI 伺服器', href: '#eudtech-products', active: true },
        { name: isEnglish ? 'GPU Server Quote' : 'GPU 伺服器報價', href: '/solutions/gpu-server-quote', active: true },
        { name: isEnglish ? 'NVIDIA H200 Server' : 'NVIDIA H200 伺服器', href: '/solutions/nvidia-h200-server', active: true },
        { name: isEnglish ? 'H200 vs RTX PRO' : 'H200 與 RTX PRO 比較', href: '/solutions/h200-vs-rtx-pro-6000', active: true },
        { name: isEnglish ? 'AI Workstation Taiwan' : '台灣 AI 工作站', href: '/solutions/ai-workstation-taiwan', active: true },
      ],
    },
    products: {
      title: isEnglish ? 'Support' : '支援',
      links: [
        { name: isEnglish ? 'Comino Configurator' : 'Comino 配置器', href: '/configurator', active: true },
        { name: isEnglish ? 'Configurator Link Index' : '配置器連結索引', href: '/configurator-links.html', active: true },
        { name: isEnglish ? 'RTX PRO Workstation' : 'RTX PRO 工作站', href: '/solutions/rtx-pro-6000-workstation', active: true },
        { name: isEnglish ? 'Liquid-Cooled GPU Server' : '液冷 GPU 伺服器', href: '/solutions/liquid-cooled-gpu-server', active: true },
        { name: isEnglish ? 'GPU Server RFQ Checklist' : 'GPU 伺服器 RFQ 檢核表', href: '/solutions/gpu-server-rfq-checklist', active: true },
        { name: isEnglish ? 'Liquid-Cooling AI Server' : '液冷 AI 伺服器採購', href: '/solutions/liquid-cooling-ai-server-procurement', active: true },
        { name: isEnglish ? 'Contact Sales' : '聯繫銷售', href: '#contact', active: true },
      ],
    },
    legal: {
      title: isEnglish ? 'Company' : '公司',
      links: [
        { name: isEnglish ? 'About' : '關於我們', href: '#about', active: true },
        { name: isEnglish ? 'Blog' : '部落格', href: '#', active: false },
        { name: isEnglish ? 'Jobs' : '工作機會', href: '/careers', active: true },
        { name: isEnglish ? 'Press' : '新聞稿', href: '#', active: false },
      ],
    },
  };

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Logo />
            <p className="text-sm leading-6 text-gray-300">
              {isEnglish
                ? 'Pioneering AI infrastructure for the next generation of intelligent applications.'
                : '為下一代智能應用開創人工智能基礎設施。'}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">{footerLinks.company.title}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.company.links.map((link) => (
                    <li key={link.name}>
                      {link.active ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(link.href, e)}
                          className="text-sm leading-6 text-gray-300 hover:text-white"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <span className="text-sm leading-6 text-gray-500 cursor-not-allowed">{link.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">{footerLinks.products.title}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.products.links.map((link) => (
                    <li key={link.name}>
                      {link.active ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(link.href, e)}
                          className="text-sm leading-6 text-gray-300 hover:text-white"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <span className="text-sm leading-6 text-gray-500 cursor-not-allowed">{link.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">{footerLinks.legal.title}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.legal.links.map((link) => (
                    <li key={link.name}>
                      {link.active ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(link.href, e)}
                          className="text-sm leading-6 text-gray-300 hover:text-white"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <span className="text-sm leading-6 text-gray-500 cursor-not-allowed">{link.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">&copy; {currentYear} {isEnglish ? 'Eudaemonia Technology Ltd.' : '優達盟資訊科技有限公司'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
