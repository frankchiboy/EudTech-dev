import React from 'react';
import { AlertTriangle, FileSearch, Radar, ShieldCheck } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { ActionLink, CardGrid, CheckList, PageHero, PageShell, tx } from './SitePagePrimitives';

const SocialIntelligenceSolutionPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const capabilities = [
    { title: { zh: '假帳號與協調式行為', en: 'Fake profiles and coordinated behaviour' }, body: { zh: '辨識可疑帳號群組、異常行為與協調式活動，提供可供調查的關聯脈絡。', en: 'Identify suspicious profile clusters, anomalous behaviour, and coordinated activity with an investigation-ready context.' }, href: '/contact' },
    { title: { zh: '敘事與品牌風險', en: 'Narrative and brand risk' }, body: { zh: '追蹤有害敘事、假資訊與聲譽風險如何擴散，協助團隊決定回應優先順序。', en: 'Track harmful narratives, disinformation, and reputation risk as they spread to set response priorities.' }, href: '/contact' },
    { title: { zh: '決策用情報交付', en: 'Decision-ready intelligence' }, body: { zh: '將社群資料整理為公關、資安、政策與管理團隊可以採取行動的摘要。', en: 'Turn social data into concise, actionable briefs for communications, security, policy, and leadership teams.' }, href: '/contact' }
  ];
  return <PageShell title={{ zh: '社群情報與品牌保護｜EudTech', en: 'Social intelligence and brand protection | EudTech' }} description={{ zh: 'EudTech 以 Cyabra 協助企業與公部門偵測假資訊、假帳號與協調式社群行為。', en: 'EudTech uses Cyabra to help enterprises and public institutions detect disinformation, fake profiles, and coordinated social behaviour.' }} path="/solutions/social-intelligence">
    <PageHero eyebrow={{ zh: '社群情報', en: 'Social intelligence' }} title={{ zh: '看見敘事背後的帳號與協調行為', en: 'See the profiles and coordination behind the narrative' }} lead={{ zh: 'EudTech 是 Cyabra 授權經銷商，協助品牌、公關、資安與公部門把社群風險轉成可查證、可決策的情報。', en: 'As an authorised Cyabra distributor, EudTech helps brands, communications, security, and public-sector teams turn social risk into verifiable intelligence.' }} isEnglish={isEnglish} actions={<ActionLink href="/contact">{isEnglish ? 'Request an intelligence consultation' : '預約情報諮詢'}</ActionLink>} />
    <section className="py-20"><div className="mx-auto max-w-7xl px-6 lg:px-8"><CardGrid items={capabilities} isEnglish={isEnglish} /></div></section>
    <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60"><div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8"><div><h2 className="text-3xl font-bold">{isEnglish ? 'A delivery flow for real decisions' : '交付流程直接服務決策'}</h2><p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'We align the monitoring question, audience, evidence, and response owner before defining the intelligence output.' : '先對齊監測問題、目標對象、證據與回應負責人，再定義情報交付格式。'}</p></div><CheckList isEnglish={isEnglish} items={[{ zh: '釐清品牌、事件或政策議題', en: 'Define the brand, event, or policy question' }, { zh: '設定監測範圍與風險條件', en: 'Set monitoring scope and risk conditions' }, { zh: '分析帳號、敘事與擴散關係', en: 'Analyse profiles, narratives, and spread relationships' }, { zh: '交付摘要、證據與回應建議', en: 'Deliver briefs, evidence, and response recommendations' }]} /></div></section>
    <section className="py-20"><div className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-3 lg:px-8">{[[Radar, { zh: '持續監測', en: 'Monitor' }], [AlertTriangle, { zh: '風險識別', en: 'Identify risk' }], [ShieldCheck, { zh: '回應準備', en: 'Prepare response' }]].map(([Icon, title]) => <div key={tx(title as any, isEnglish)} className="rounded-xl border border-slate-200 p-6 dark:border-slate-800"><FileSearch className="h-6 w-6 text-cyan-600 dark:text-cyan-300" /><p className="mt-4 font-semibold">{tx(title as any, isEnglish)}</p></div>)}</div></section>
  </PageShell>;
};
export default SocialIntelligenceSolutionPage;
