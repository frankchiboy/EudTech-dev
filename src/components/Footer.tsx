import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './common/Logo';
import { SITE_NAVIGATION_GROUPS, SITE_CTA } from '../data/siteArchitecture';

interface FooterProps { isEnglish: boolean; }

const Footer: React.FC<FooterProps> = ({ isEnglish }) => {
  const currentYear = new Date().getFullYear();
  
  const label = (value: { zh: string; en: string }) => (isEnglish ? value.en : value.zh);

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="space-y-6">
            <Logo inverse />
            <p className="text-sm leading-6 text-gray-300">
              {isEnglish ? 'EudTech delivers AI agents and headless SaaS, AI infrastructure, and social intelligence, with outcomes you can verify and accept.' : 'EudTech 提供 AI Agent 與 Headless SaaS、AI 運算基礎設施與社群情報方案，交付可驗收的業務成果。'}
            </p>
            <div className="flex flex-wrap gap-3"><Link to={SITE_CTA.configurator.href} className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300">{label(SITE_CTA.configurator)}</Link><Link to={SITE_CTA.contact.href} className="rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-cyan-300">{label(SITE_CTA.contact)}</Link></div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">{SITE_NAVIGATION_GROUPS.map((group) => <div key={group.id}><h3 className="text-sm font-semibold leading-6 text-white">{label(group.label)}</h3><ul role="list" className="mt-5 space-y-3">{group.children?.map((child) => <li key={child.id}><Link to={child.href} className="text-sm leading-6 text-gray-300 hover:text-cyan-300">{label(child.label)}</Link></li>)}</ul></div>)}</div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-5 text-gray-400">&copy; {currentYear} {isEnglish ? 'Eudaemonia Technology Ltd.' : '優達盟資訊科技有限公司'}. All rights reserved.</p><Link to="/privacy" className="text-xs text-gray-400 hover:text-white">{isEnglish ? 'Privacy' : '隱私與資料使用'}</Link></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
