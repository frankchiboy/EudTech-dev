import React from 'react';
import { FileCheck2, GitCompare, Server, Snowflake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { CONFIGURATOR_SEO_PAGES } from '../../data/configuratorSeoPages';
import { VENDOR_EVIDENCE } from '../../data/vendorEvidence';
import { PageHero, PageShell, SourceLink, tx } from './SitePagePrimitives';

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
    <section className="border-b border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/60"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{[
      { n: '01', title: { zh: '定義工作負載', en: 'Define workload' }, body: { zh: '記錄模型、軟體、資料量、使用者、連續運作與效能目標。', en: 'Record models, software, data scale, users, sustained operation, and performance targets.' } },
      { n: '02', title: { zh: '建立配置', en: 'Build configuration' }, body: { zh: '選擇 GPU、CPU、RAM、儲存、網路、機架與液冷方向。', en: 'Select GPU, CPU, RAM, storage, network, rack, and liquid-cooling directions.' } },
      { n: '03', title: { zh: '審查採購條件', en: 'Review procurement' }, body: { zh: '確認供貨、場地、安裝、保固、文件、付款與交付條件。', en: 'Confirm availability, site, installation, warranty, documentation, payment, and delivery conditions.' } },
      { n: '04', title: { zh: '定義驗收', en: 'Define acceptance' }, body: { zh: '把硬體辨識、燒機、溫度、錯誤紀錄與指定工作負載寫入驗收。', en: 'Put inventory, burn-in, thermals, error logs, and the agreed workload into acceptance.' } }
    ].map((item) => <article key={item.n} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"><p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">{item.n}</p><h2 className="mt-4 text-lg font-semibold">{tx(item.title, isEnglish)}</h2><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(item.body, isEnglish)}</p></article>)}</div><div className="mt-7 flex flex-wrap gap-x-5 gap-y-3"><SourceLink href={VENDOR_EVIDENCE.comino.sources.blackwell.href} label={VENDOR_EVIDENCE.comino.sources.blackwell.label} isEnglish={isEnglish} /><SourceLink href={VENDOR_EVIDENCE.comino.sources.server.href} label={VENDOR_EVIDENCE.comino.sources.server.label} isEnglish={isEnglish} /><SourceLink href={VENDOR_EVIDENCE.comino.sources.downloads.href} label={VENDOR_EVIDENCE.comino.sources.downloads.label} isEnglish={isEnglish} /></div></div></section>
    <section className="py-20"><div className="mx-auto max-w-7xl space-y-12 px-6 lg:px-8">{groups.map(({ title, kinds, icon: Icon }) => { const pages = CONFIGURATOR_SEO_PAGES.filter((page) => kinds.includes(page.kind || 'solution')); return <section key={tx(title, isEnglish)}><div className="flex items-center gap-3"><Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-300" /><h2 className="text-2xl font-bold">{tx(title, isEnglish)}</h2></div><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{pages.map((page) => <Link key={page.slug} to={`/solutions/${page.slug}`} className="rounded-xl border border-slate-200 p-5 transition hover:border-cyan-400 hover:bg-cyan-50/40 dark:border-slate-800 dark:hover:bg-cyan-950/20"><h3 className="font-semibold">{tx(page.title, isEnglish)}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{tx(page.description, isEnglish)}</p><span className="mt-4 text-xs font-semibold text-cyan-700 dark:text-cyan-300">{isEnglish ? 'Open resource' : '開啟資源'}</span></Link>)}</div></section>; })}</div></section>
  </PageShell>;
};
export default ResourcesOverviewPage;
