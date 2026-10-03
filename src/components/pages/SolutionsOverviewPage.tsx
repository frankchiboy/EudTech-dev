import React from 'react';
import { ArrowRight, Blocks, Bot, Check, Cpu, Radar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { VENDOR_EVIDENCE } from '../../data/vendorEvidence';
import { ActionLink, PageHero, PageShell, SourceLink, tx } from './SitePagePrimitives';

const SolutionsOverviewPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const items = [
    {
      icon: Bot,
      title: { zh: 'AI Agent 與 Headless SaaS 導入', en: 'AI agent and headless SaaS implementation' },
      body: { zh: '既有 ERP、CRM、Microsoft 365、資料庫與 API 不必更換。在其上建立品牌網站、客戶 Portal、事件流程與受控 AI Agent。', en: 'Keep your existing ERP, CRM, Microsoft 365, databases, and APIs. EudTech builds branded websites, customer portals, event workflows, and controlled AI agents on top of them.' },
      fit: { zh: '適合對象：必須沿用既有系統的企業。需要改善追蹤、核對、催辦、客戶入口、權限與自動化。', en: 'For organisations that must keep their existing systems. Typical needs: follow-up, reconciliation, reminders, customer access, permissions, and automation.' },
      outputs: [{ zh: '品牌入口與事件流程，含負責人與期限', en: 'Branded access and event workflows with owners and deadlines' }, { zh: '可操作的 AI Agent 試點與系統整合', en: 'A working AI agent pilot with system integration' }, { zh: '人員核准、版本與稽核紀錄', en: 'Human approval, versioning, and an audit trail' }],
      image: '/ai-agent-evidence-chain-v1.webp',
      imageAlt: { zh: 'AI Agent 將郵件、文件、核對與人員核准連成可追溯事件流程', en: 'AI agent evidence chain connecting email, documents, reconciliation, and human approval' },
      imageContain: false,
      visual: null,
      source: null,
      href: '/solutions/ai-agent'
    },
    {
      icon: Cpu,
      title: { zh: 'AI 運算基礎設施', en: 'AI infrastructure' },
      body: { zh: '先從模型、記憶體、並行量與執行時間推算需求。再決定 GPU、CPU、RAM、NVMe、網路、散熱與部署型態。', en: 'Start from the model, memory, parallelism, and run time. Then size the GPU, CPU, RAM, NVMe, networking, cooling, and deployment form.' },
      fit: { zh: '適合對象：進行研究訓練、本地推論、HPC、模擬、視覺化或虛擬製作的團隊。', en: 'For teams running research training, local inference, HPC, simulation, visualisation, or virtual production.' },
      outputs: [{ zh: '工作負載盤點與資源估算', en: 'Workload map and resource estimate' }, { zh: '可分享的原廠配置連結與版本', en: 'A shareable vendor configuration link and version' }, { zh: '台灣正式報價、安裝與驗收範圍', en: 'Formal Taiwan quote, installation, and acceptance scope' }],
      image: VENDOR_EVIDENCE.comino.image,
      imageAlt: VENDOR_EVIDENCE.comino.imageAlt,
      imageContain: false,
      visual: null,
      source: VENDOR_EVIDENCE.comino.sources.blackwell,
      href: '/solutions/ai-infrastructure'
    },
    {
      icon: Radar,
      title: { zh: '社群情報', en: 'Social intelligence' },
      body: { zh: '需要判斷社群內容背後的帳號與協調行為時，以 Cyabra 分析。涵蓋帳號真實性、敘事、情緒、協調式擴散、假冒與 AI 生成內容風險。', en: 'When you need to know who is behind social content, EudTech uses Cyabra. It analyses profile authenticity, narratives, sentiment, coordinated amplification, impersonation, and AI-generated content risk.' },
      fit: { zh: '適合對象：面對品牌攻擊、假冒帳號或議題操作的團隊。也適用政策溝通與突發危機。', en: 'For teams facing brand attacks, impersonation, or manipulated issues. Also suited to policy communication and emerging crises.' },
      outputs: [{ zh: '明確的監測問題、範圍與風險條件', en: 'A defined monitoring question, scope, and risk conditions' }, { zh: '帳號、敘事與擴散關係分析', en: 'Profile, narrative, and spread analysis' }, { zh: '附來源證據的情報摘要與回應建議', en: 'An intelligence brief with source evidence and response options' }],
      image: VENDOR_EVIDENCE.cyabra.images.profiles,
      imageAlt: { zh: 'Cyabra 帳號真實性分析原廠介面', en: 'Official Cyabra profile-authenticity analysis interface' },
      imageContain: true,
      visual: null,
      source: VENDOR_EVIDENCE.cyabra.sources.authenticity,
      href: '/solutions/social-intelligence'
    }
  ];
  return <PageShell title={{ zh: 'AI 與數位服務解決方案｜EudTech', en: 'AI and digital service solutions | EudTech' }} description={{ zh: 'EudTech 提供整合的 AI Agent 與 Headless SaaS 導入、AI 運算基礎設施及社群情報三大解決方案。', en: 'EudTech provides integrated AI agent and headless SaaS implementation, AI infrastructure, and social intelligence.' }} path="/solutions">
    <PageHero eyebrow={{ zh: '解決方案', en: 'Solutions' }} title={{ zh: '從實際問題選擇導入路徑', en: 'Choose the path from the problem you need solved' }} lead={{ zh: 'EudTech 有三條導入路徑：AI Agent 與 Headless SaaS、GPU 運算設備、社群情報。每一條都寫明解決的問題、交付的輸出與下一步。', en: 'EudTech offers three delivery paths: AI agents and headless SaaS, GPU infrastructure, and social intelligence. Each one states the problem it solves, what you receive, and the next step.' }} isEnglish={isEnglish} actions={<><ActionLink href="/contact">{isEnglish ? 'Discuss your need' : '說明您的需求'}</ActionLink><ActionLink href="/configurator?request=true" secondary>{isEnglish ? 'Start a configuration' : '開始配置詢價'}</ActionLink></>} />
    <section className="py-20"><div className="mx-auto max-w-7xl space-y-8 px-6 lg:px-8">{items.map(({ icon: Icon, title, body, fit, outputs, image, imageAlt, imageContain, source, href }, index) => <article key={href} className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[0.92fr_1.08fr]"><div className={`relative min-h-72 ${imageContain ? 'bg-white p-6 dark:bg-slate-950' : 'bg-slate-100 dark:bg-slate-950'}`}>{image && imageAlt ? <img src={image} alt={tx(imageAlt, isEnglish)} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" className={`absolute inset-0 h-full w-full ${imageContain ? 'object-contain p-6' : 'object-cover'}`} /> : null}{source && <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 px-6 pb-5 pt-16"><SourceLink href={source.href} label={source.label} isEnglish={isEnglish} inverse /></div>}</div><div className="p-7 sm:p-10"><Icon className="h-8 w-8 text-cyan-600 dark:text-cyan-300" /><h2 className="mt-5 text-3xl font-bold">{tx(title, isEnglish)}</h2><p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{tx(body, isEnglish)}</p><p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700 dark:bg-slate-950 dark:text-slate-200">{tx(fit, isEnglish)}</p><ul className="mt-6 space-y-3">{outputs.map((output) => <li key={tx(output, isEnglish)} className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"><Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />{tx(output, isEnglish)}</li>)}</ul><Link to={href} className="mt-7 inline-flex items-center font-semibold text-cyan-700 dark:text-cyan-300">{isEnglish ? 'View the full solution' : '查看完整解決方案'}<ArrowRight className="ml-2 h-4 w-4" /></Link></div></article>)}</div></section>
    <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60"><div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">{isEnglish ? 'A clear next step' : '清楚的下一步'}</p><h2 className="mt-4 text-3xl font-bold">{isEnglish ? 'Owners and success measures are set before delivery starts' : '導入前先定義負責人與成功指標'}</h2><p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'Before implementation starts, EudTech defines the input, decision point, owner, evidence, and success measure.' : '開始導入前，先確認輸入、決策點、負責人、證據與成功指標。'}</p></div><div className="grid gap-4 sm:grid-cols-2">{[{ icon: Bot, title: { zh: '流程', en: 'Flow' } }, { icon: Blocks, title: { zh: '數位服務', en: 'Digital service' } }, { icon: Cpu, title: { zh: '設備', en: 'Infrastructure' } }, { icon: Radar, title: { zh: '情報', en: 'Intelligence' } }].map(({ icon: Icon, title }) => <div key={tx(title, isEnglish)} className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-950"><Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-300" /><p className="mt-5 font-semibold">{tx(title, isEnglish)}</p></div>)}</div></div></section>
  </PageShell>;
};
export default SolutionsOverviewPage;
