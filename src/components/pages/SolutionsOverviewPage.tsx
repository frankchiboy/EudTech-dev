import React from 'react';
import { ArrowRight, Bot, Check, Cpu, Radar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { VENDOR_EVIDENCE } from '../../data/vendorEvidence';
import { ActionLink, PageHero, PageShell, SourceLink, tx } from './SitePagePrimitives';

const SolutionsOverviewPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const items = [
    {
      icon: Bot,
      title: { zh: 'AI Agent 導入', en: 'AI Agent implementation' },
      body: { zh: '從追蹤、核對、催辦與管理摘要開始，串接 Outlook、Teams、SharePoint、Dataverse、ERP 與自有 API。', en: 'Start with follow-up, reconciliation, reminders, and management briefs across Outlook, Teams, SharePoint, Dataverse, ERP, and your APIs.' },
      fit: { zh: '適合：每週人工彙整進度、郵件來了卻沒有下一步、重要動作需要人員核准。', en: 'Best for teams manually compiling status, losing the next action after email, or requiring approval for sensitive actions.' },
      outputs: [{ zh: '事件、負責人、期限與證據鏈', en: 'Events, owners, deadlines, and evidence chain' }, { zh: '可操作試點與驗收報告', en: 'Operable pilot and acceptance report' }, { zh: '權限、人員核准與稽核軌跡', en: 'Permissions, human approval, and audit trail' }],
      image: VENDOR_EVIDENCE.microsoft.image,
      imageAlt: VENDOR_EVIDENCE.microsoft.imageAlt,
      imageContain: true,
      source: VENDOR_EVIDENCE.microsoft.sources.product,
      href: '/solutions/ai-agent'
    },
    {
      icon: Cpu,
      title: { zh: 'AI 運算基礎設施', en: 'AI infrastructure' },
      body: { zh: '從模型、記憶體、並行性與執行時間推回 GPU、CPU、RAM、NVMe、網路、散熱與部署型態。', en: 'Work backward from model, memory, parallelism, and run time to GPU, CPU, RAM, NVMe, networking, cooling, and deployment.' },
      fit: { zh: '適合：研究訓練、本地推論、HPC、模擬、視覺化或虛擬製作。', en: 'Best for research training, local inference, HPC, simulation, visualization, or virtual production.' },
      outputs: [{ zh: '工作負載與資源估算', en: 'Workload and resource estimate' }, { zh: '可分享的原廠配置', en: 'Shareable manufacturer configuration' }, { zh: '台灣報價、安裝與驗收範圍', en: 'Taiwan quote, installation, and acceptance scope' }],
      image: VENDOR_EVIDENCE.comino.image,
      imageAlt: VENDOR_EVIDENCE.comino.imageAlt,
      imageContain: false,
      source: VENDOR_EVIDENCE.comino.sources.blackwell,
      href: '/solutions/ai-infrastructure'
    },
    {
      icon: Radar,
      title: { zh: '社群情報', en: 'Social intelligence' },
      body: { zh: '以 Cyabra 分析帳號真實性、敘事、情緒、協調式擴散、假冒與 AI 生成內容風險。', en: 'Use Cyabra to analyse profile authenticity, narratives, sentiment, coordinated amplification, impersonation, and AI-generated content risk.' },
      fit: { zh: '適合：品牌攻擊、假冒帳號、議題操作、政策溝通與突發危機。', en: 'Best for brand attacks, impersonation, manipulated issues, policy communication, and emerging crises.' },
      outputs: [{ zh: '監測問題、範圍與風險條件', en: 'Monitoring question, scope, and risk conditions' }, { zh: '帳號、敘事與擴散關係', en: 'Profile, narrative, and propagation relationships' }, { zh: '附證據的情報摘要與回應建議', en: 'Evidence-backed intelligence brief and response options' }],
      image: VENDOR_EVIDENCE.cyabra.images.profiles,
      imageAlt: { zh: 'Cyabra 帳號真實性分析原廠介面', en: 'Official Cyabra profile-authenticity analysis interface' },
      imageContain: true,
      source: VENDOR_EVIDENCE.cyabra.sources.authenticity,
      href: '/solutions/social-intelligence'
    }
  ];
  return <PageShell title={{ zh: 'AI 解決方案｜EudTech', en: 'AI solutions | EudTech' }} description={{ zh: 'EudTech 提供 AI Agent 導入、AI 運算基礎設施與社群情報解決方案。', en: 'EudTech provides AI Agent implementation, AI infrastructure, and social intelligence solutions.' }} path="/solutions">
    <PageHero eyebrow={{ zh: '解決方案', en: 'Solutions' }} title={{ zh: '從實際需求選擇解決方案', en: 'Choose a solution from the outcome you need' }} lead={{ zh: 'EudTech 將流程自動化、GPU 運算設備與社群情報分成清楚的導入路徑，每條路徑都有內容、下一步與可追蹤交付。', en: 'EudTech separates workflow automation, GPU infrastructure, and social intelligence into clear delivery paths with concrete content and next steps.' }} isEnglish={isEnglish} actions={<><ActionLink href="/contact">{isEnglish ? 'Discuss your need' : '說明您的需求'}</ActionLink><ActionLink href="/configurator?request=true" secondary>{isEnglish ? 'Start a configuration' : '開始配置詢價'}</ActionLink></>} />
    <section className="py-20"><div className="mx-auto max-w-7xl space-y-8 px-6 lg:px-8">{items.map(({ icon: Icon, title, body, fit, outputs, image, imageAlt, imageContain, source, href }) => <article key={href} className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[0.92fr_1.08fr]"><div className={`relative min-h-72 ${imageContain ? 'bg-white p-6 dark:bg-slate-950' : 'bg-slate-100 dark:bg-slate-950'}`}><img src={image} alt={tx(imageAlt, isEnglish)} loading="lazy" decoding="async" className={`absolute inset-0 h-full w-full ${imageContain ? 'object-contain p-6' : 'object-cover'}`} /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent px-6 pb-5 pt-16"><SourceLink href={source.href} label={source.label} isEnglish={isEnglish} inverse /></div></div><div className="p-7 sm:p-10"><Icon className="h-8 w-8 text-cyan-600 dark:text-cyan-300" /><h2 className="mt-5 text-3xl font-bold">{tx(title, isEnglish)}</h2><p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{tx(body, isEnglish)}</p><p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700 dark:bg-slate-950 dark:text-slate-200">{tx(fit, isEnglish)}</p><ul className="mt-6 space-y-3">{outputs.map((output) => <li key={tx(output, isEnglish)} className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"><Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />{tx(output, isEnglish)}</li>)}</ul><Link to={href} className="mt-7 inline-flex items-center font-semibold text-cyan-700 dark:text-cyan-300">{isEnglish ? 'Open the complete solution' : '開啟完整解決方案'}<ArrowRight className="ml-2 h-4 w-4" /></Link></div></article>)}</div></section>
    <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60"><div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">{isEnglish ? 'A clear next step' : '清楚的下一步'}</p><h2 className="mt-4 text-3xl font-bold">{isEnglish ? 'Every path ends in an accountable action' : '每條路徑都以可負責的行動結束'}</h2><p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'We define the input, decision point, owner, evidence, and success measure before implementation begins.' : '在開始導入前，先定義輸入、決策點、負責人、證據與成功指標。'}</p></div><div className="grid gap-4 sm:grid-cols-3">{[{ icon: Bot, title: { zh: '流程', en: 'Flow' } }, { icon: Cpu, title: { zh: '設備', en: 'Infrastructure' } }, { icon: Radar, title: { zh: '情報', en: 'Intelligence' } }].map(({ icon: Icon, title }) => <div key={tx(title, isEnglish)} className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-950"><Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-300" /><p className="mt-5 font-semibold">{tx(title, isEnglish)}</p></div>)}</div></div></section>
  </PageShell>;
};
export default SolutionsOverviewPage;
