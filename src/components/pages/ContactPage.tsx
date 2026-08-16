import React from 'react';
import { Bot, Cpu, Radar } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { ActionLink, PageHero, PageShell } from './SitePagePrimitives';
import ContactSection from '../contact/ContactSection';

const ContactPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const needs = [[Bot, { zh: 'AI Agent 導入', en: 'AI Agent implementation' }, { zh: '流程、ERP、CRM、郵件或任務追蹤自動化。', en: 'Workflow, ERP, CRM, email, or task tracking automation.' }], [Cpu, { zh: 'AI 運算設備', en: 'AI infrastructure' }, { zh: 'GPU 伺服器、工作站、液冷系統與正式報價。', en: 'GPU servers, workstations, liquid cooling, and quote planning.' }], [Radar, { zh: '社群情報', en: 'Social intelligence' }, { zh: 'Cyabra 品牌保護、假資訊與社群風險分析。', en: 'Cyabra brand protection, disinformation, and social risk analysis.' }]];
  return <PageShell title={{ zh: '聯絡 EudTech｜開始諮詢', en: 'Contact EudTech' }} description={{ zh: '選擇 AI Agent、AI 運算設備或社群情報需求，與 EudTech 安排下一步。', en: 'Choose an AI Agent, AI infrastructure, or social intelligence need and arrange the next step with EudTech.' }} path="/contact">
    <PageHero eyebrow={{ zh: '聯絡與諮詢', en: 'Contact' }} title={{ zh: '先說明需求，再安排正確的下一步', en: 'Start with the need, then choose the right next step' }} lead={{ zh: '請先選擇需求類型，再使用表單或線上會議與 EudTech 討論範圍、資料、時程與成功指標。', en: 'Choose a need first, then use the form or online meeting to discuss scope, data, timing, and success measures.' }} isEnglish={isEnglish} actions={<ActionLink href="#contact-form">{isEnglish ? 'Go to contact form' : '前往聯絡表單'}</ActionLink>} />
    <section className="py-16"><div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3 lg:px-8">{needs.map(([Icon, title, body]) => <a key={String(title)} href="#contact-form" className="rounded-2xl border border-slate-200 p-6 transition hover:border-cyan-400 dark:border-slate-800"><Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-300" /><h2 className="mt-5 font-semibold">{isEnglish ? (title as any).en : (title as any).zh}</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{isEnglish ? (body as any).en : (body as any).zh}</p></a>)}</div></section>
    <div id="contact-form"><ContactSection /></div>
  </PageShell>;
};
export default ContactPage;
