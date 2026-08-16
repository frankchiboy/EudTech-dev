import { NavLink } from '../types';

export const getNavLinks = (isEnglish: boolean): NavLink[] => {
  return [
    {
      name: isEnglish ? 'Home' : '首頁',
      href: '#home'
    },
    {
      name: isEnglish ? 'Products' : '產品',
      href: '#eudtech-products'
    },
    {
      name: isEnglish ? 'Comino Configurator' : 'Comino 配置器',
      labelLines: ['Comino', isEnglish ? 'Configurator' : '配置器'],
      href: '/configurator'
    },
    {
      name: isEnglish ? 'Solutions' : '解決方案',
      href: '/solutions'
    },
    {
      name: isEnglish ? 'AI Agent Services' : 'AI Agent 導入',
      labelLines: ['AI Agent', isEnglish ? 'Services' : '導入'],
      href: '/solutions/ai-agent'
    },
    {
      name: isEnglish ? 'Partner Brands' : '代理品牌',
      href: '#',
      isDropdown: true,
      disabled: true,
      disabledText: isEnglish ? 'Coming Soon' : '即將推出',
      children: [
        { name: 'Cyabra', href: '/brands/cyabra' },
        { name: 'Comino', href: '/brands/comino' }
      ]
    },
    {
      name: isEnglish ? 'About' : '關於我們',
      href: '#about'
    },
    {
      name: isEnglish ? 'Careers' : '職業機會',
      href: '/careers'
    },
    {
      name: isEnglish ? 'Contact' : '聯絡我們',
      href: '#contact'
    }
  ];
};
