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
      title: { zh: 'Agent SOR 與 Action Layer', en: 'Agent SOR & Action Layer' },
      body: { zh: '以 ChatGPT／Claude 作為使用介面，透過 Remote MCP 串接 ERP、CRM、Microsoft 365、Email、資料庫與 API，由 EudTech 保存 Agent 身分、流程狀態、權限、核准、Action 與稽核證據。', en: 'Use ChatGPT or Claude as the interface, connect ERP, CRM, Microsoft 365, email, databases, and APIs through Remote MCP, and let EudTech preserve agent identity, workflow state, permissions, approvals, actions, and audit evidence.' },
      fit: { zh: '適合：企業希望直接使用現有 AI 助理，但需要一套可治理、可核准、可追溯的後端 Agent 控制與紀錄層。', en: 'Best for organisations that want to keep their existing AI assistants while adding a governable, approvable, traceable backend control and record layer.' },
      outputs: [{ zh: 'Remote MCP Gateway 與企業 Connections', en: 'Remote MCP gateway and enterprise connections' }, { zh: 'RBAC／Policy、流程狀態與人工核准', en: 'RBAC / policy, workflow state, and human approval' }, { zh: 'Action Layer、Audit Log 與來源證據', en: 'Action layer, audit log, and provenance evidence' }],
      image: '/ai-agent-evidence-chain-v1.webp',
      imageAlt: { zh: 'EudTech Agent SOR 將 AI 介面、MCP、企業系統、核准與稽核串成可追溯架構', en: 'EudTech Agent SOR architecture connecting AI interfaces, MCP, enterprise systems, approvals, and audit evidence' },
      imageContain: false,
      visual: null,
      source: null,
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
      visual: null,
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
      visual: null,
      source: VENDOR_EVIDENCE.cyabra.sources.authenticity,
      href: '/solutions/social-intelligence'
    }
  ];
  return <PageShell title={{ zh: 'AI 與數位服務解決方案｜EudTech', en: 'AI and digital service solutions | EudTech' }} description={{ zh: 'EudTech 提供 Agent SOR 與 Action Layer、AI 運算基礎設施及社群情報三大解決方案。', en: 'EudTech provides Agent SOR and Action Layer, AI infrastructure, and social intelligence.' }} path="/solutions">
    <PageHero eyebrow={{ zh: '解決方案', en: 'Solutions' }} title={{ zh: '從實際需求選擇解決方案', en: 'Choose a solution from the outcome you need' }} lead={{ zh: 'EudTech 將企業 Agent 控制與紀錄、GPU 運算設備及社群情報分成三條導入路徑，每條路徑都有內容、下一步與可追蹤交付。', en: 'EudTech provides three clear paths: enterprise agent control and record, GPU infrastructure, and social intelligence, each with concrete delivery and next steps.' }} isEnglish={isEnglish} actions={<><ActionLink href="/contact">{isEnglish ? 'Discuss your need' : '說明您的需求'}</ActionLink><ActionLink href="/configurator?request=true" secondary>{isEnglish ? 'Start a configuration' : '開始配置詢價'}</ActionLink></>} />
    <section className="py-20"><div className="mx-auto max-w-7xl space-y-8 px-6 lg:px-8">{items.map(({ icon: Icon, title, body, fit, outputs, image, imageAlt, imageContain, source, href }, index) => <article key={href} className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[0.92fr_1.08fr]"><div className={`relative min-h-72 ${imageContain ? 'bg-white p-6 dark:bg-slate-950' : 'bg-slate-100 dark:bg-slate-950'}`}>{image && imageAlt ? <img src={image} alt={tx(imageAlt, isEnglish)} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" className={`absolute inset-0 h-full w-full ${imageContain ? 'object-contain p-6' : 'object-cover'}`} /> : null}{source && <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 px-6 pb-5 pt-16"><SourceLink href={source.href} label={source.label} isEnglish={isEnglish} inverse /></div>}</div><div className="p-7 sm:p-10"><Icon className="h-8 w-8 text-cyan-600 dark:text-cyan-300" /><h2 className="mt-5 text-3xl font-bold">{tx(title, isEnglish)}</h2><p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{tx(body, isEnglish)}</p><p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700 dark:bg-slate-950 dark:text-slate-200">{tx(fit, isEnglish)}</p><ul className="mt-6 space-y-3">{outputs.map((output) => <li key={tx(output, isEnglish)} className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"><Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />{tx(output, isEnglish)}</li>)}</ul><Link to={href} className="mt-7 inline-flex items-center font-semibold text-cyan-700 dark:text-cyan-300">{isEnglish ? 'Open the complete solution' : '開啟完整解決方案'}<ArrowRight className="ml-2 h-4 w-4" /></Link></div></article>)}</div></section>
    <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60"><div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">{isEnglish ? 'A clear next step' : '清楚的下一步'}</p><h2 className="mt-4 text-3xl font-bold">{isEnglish ? 'Every path ends in an accountable action' : '每條路徑都以可負責的行動結束'}</h2><p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'We define the input, decision point, owner, evidence, and success measure before implementation begins.' : '在開始導入前，先定義輸入、決策點、負責人、證據與成功指標。'}</p></div><div className="grid gap-4 sm:grid-cols-2">{[{ icon: Bot, title: { zh: 'Agent', en: 'Agent' } }, { icon: Blocks, title: { zh: '數位服務', en: 'Digital service' } }, { icon: Cpu, title: { zh: '設備', en: 'Infrastructure' } }, { icon: Radar, title: { zh: '情報', en: 'Intelligence' } }].map(({ icon: Icon, title }) => <div key={tx(title, isEnglish)} className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-950"><Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-300" /><p className="mt-5 font-semibold">{tx(title, isEnglish)}</p></div>)}</div></div></section>
  </PageShell>;
};
export default SolutionsOverviewPage;