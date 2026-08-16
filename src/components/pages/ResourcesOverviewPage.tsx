import React from 'react';
import { FileCheck2, GitCompare, Server, Snowflake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { CONFIGURATOR_SEO_PAGES } from '../../data/configuratorSeoPages';
import { PageHero, PageShell, tx } from './SitePagePrimitives';

const ResourcesOverviewPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const groups = [
    { title: { zh: '選型與報價', en: 'Selection and quoting' }, kinds: ['solution'], icon: Server },
    { title: { zh: '部署與散熱', en: 'Deployment and cooling' }, kinds: ['guide'], icon: Snowflake },
    { title: { zh: '比較與決策', en: 'Comparison and decisions' }, kinds: ['comparison'], icon: GitCompare },
    { title: { zh: 'RFQ 與公部門採購', en: 'RFQ and public procurement' }, kinds: ['checklist'], icon: FileCheck2 }
  ];
  return <PageShell title={{ zh: '採購資源｜EudTech', en: 'Procurement resources | EudTech' }} description={{ zh: 'EudTech 將 17 個 GPU 伺服器與工作站資源依採購階段整理。', en: 'EudTech organises 17 GPU server and workstation resources by procurement stage.' }} path="/resources">
    <PageHero eyebrow={{ zh: '採購資源', en: 'Resources' }} title={{ zh: '從研究到詢價都有實際入口', en: 'A practical entry point from research to RFQ' }} lead={{ zh: '資源頁不是名目索引；每個入口都有內容、配置連結或下一步行動，協助技術與採購共同決策。', en: 'This is an actionable index: every entry has content, a configuration path, or a next action for technical and procurement teams.' }} isEnglish={isEnglish} />
    <section className="py-20"><div className="mx-auto max-w-7xl space-y-12 px-6 lg:px-8">{groups.map(({ title, kinds, icon: Icon }) => { const pages = CONFIGURATOR_SEO_PAGES.filter((page) => kinds.includes(page.kind || 'solution')); return <section key={tx(title, isEnglish)}><div className="flex items-center gap-3"><Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-300" /><h2 className="text-2xl font-bold">{tx(title, isEnglish)}</h2></div><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{pages.map((page) => <Link key={page.slug} to={`/solutions/${page.slug}`} className="rounded-xl border border-slate-200 p-5 transition hover:border-cyan-400 hover:bg-cyan-50/40 dark:border-slate-800 dark:hover:bg-cyan-950/20"><h3 className="font-semibold">{tx(page.title, isEnglish)}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{tx(page.description, isEnglish)}</p><span className="mt-4 text-xs font-semibold text-cyan-700 dark:text-cyan-300">{isEnglish ? 'Open resource' : '開啟資源'}</span></Link>)}</div></section>; })}</div></section>
  </PageShell>;
};
export default ResourcesOverviewPage;
