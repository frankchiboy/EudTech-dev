import React from 'react';
import { Bot, Cpu, Radar } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { ActionLink, CardGrid, PageHero, PageShell, tx } from './SitePagePrimitives';

const SolutionsOverviewPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const items = [
    { title: { zh: 'AI Agent 導入', en: 'AI Agent implementation' }, body: { zh: '從一條高價值流程開始，串接 Outlook、Teams、ERP、CRM、專案與任務資料，建立可觀察且保留人工核准的營運流程。', en: 'Start with one high-value flow and connect Outlook, Teams, ERP, CRM, project, and task data with human approval.' }, href: '/solutions/ai-agent' },
    { title: { zh: 'AI 運算基礎設施', en: 'AI infrastructure' }, body: { zh: '依訓練、推論、HPC、模擬與視覺化工作負載選擇 GPU、記憶體、儲存、散熱與部署型態，再進入配置與詢價。', en: 'Select GPU, memory, storage, cooling, and deployment from training, inference, HPC, simulation, and visualization workloads.' }, href: '/solutions/ai-infrastructure' },
    { title: { zh: '社群情報', en: 'Social intelligence' }, body: { zh: '運用 Cyabra 分析社群敘事、假帳號、協調式行為與品牌風險，將研究結果交付給公關、資安與決策團隊。', en: 'Use Cyabra to analyse narratives, fake profiles, coordinated behaviour, and brand risk for communications and security teams.' }, href: '/solutions/social-intelligence' }
  ];
  return <PageShell title={{ zh: 'AI 解決方案｜EudTech', en: 'AI solutions | EudTech' }} description={{ zh: 'EudTech 提供 AI Agent 導入、AI 運算基礎設施與社群情報解決方案。', en: 'EudTech provides AI Agent implementation, AI infrastructure, and social intelligence solutions.' }} path="/solutions">
    <PageHero eyebrow={{ zh: '解決方案', en: 'Solutions' }} title={{ zh: '從實際需求選擇解決方案', en: 'Choose a solution from the outcome you need' }} lead={{ zh: 'EudTech 將流程自動化、GPU 運算設備與社群情報分成清楚的導入路徑，每條路徑都有內容、下一步與可追蹤交付。', en: 'EudTech separates workflow automation, GPU infrastructure, and social intelligence into clear delivery paths with concrete content and next steps.' }} isEnglish={isEnglish} actions={<><ActionLink href="/contact">{isEnglish ? 'Discuss your need' : '說明您的需求'}</ActionLink><ActionLink href="/configurator?request=true" secondary>{isEnglish ? 'Start a configuration' : '開始配置詢價'}</ActionLink></>} />
    <section className="py-20"><div className="mx-auto max-w-7xl px-6 lg:px-8"><CardGrid items={items} isEnglish={isEnglish} /></div></section>
    <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60"><div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">{isEnglish ? 'A clear next step' : '清楚的下一步'}</p><h2 className="mt-4 text-3xl font-bold">{isEnglish ? 'Every path ends in an accountable action' : '每條路徑都以可負責的行動結束'}</h2><p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'We define the input, decision point, owner, evidence, and success measure before implementation begins.' : '在開始導入前，先定義輸入、決策點、負責人、證據與成功指標。'}</p></div><div className="grid gap-4 sm:grid-cols-3">{[{ icon: Bot, title: { zh: '流程', en: 'Flow' } }, { icon: Cpu, title: { zh: '設備', en: 'Infrastructure' } }, { icon: Radar, title: { zh: '情報', en: 'Intelligence' } }].map(({ icon: Icon, title }) => <div key={tx(title, isEnglish)} className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-950"><Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-300" /><p className="mt-5 font-semibold">{tx(title, isEnglish)}</p></div>)}</div></div></section>
  </PageShell>;
};
export default SolutionsOverviewPage;
