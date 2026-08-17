import React from 'react';
import { ArrowRight, BadgeCheck, Bot, FileClock, KeyRound, Layers3, RefreshCw, ShieldCheck, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { canonicalPageUrl } from '../../utils/seo/canonicalUrl';
import { getConfiguratorSocialPreviewPath } from '../../utils/seo/socialPreview';
import HeadlessSaasVisual from '../headless-saas/HeadlessSaasVisual';
import SEOHead from '../common/SEOHead';
import Footer from '../Footer';
import { ActionLink, tx } from './SitePagePrimitives';

const HeadlessSaasSolutionPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const title = isEnglish
    ? 'Enterprise headless SaaS and AI agent implementation | EudTech'
    : '企業 Headless SaaS 與 AI Agent 導入｜EudTech';
  const description = isEnglish
    ? 'Connect existing ERP, CRM, Microsoft 365, databases, and APIs to branded portals, event workflows, controlled AI agents, permissions, and audit controls.'
    : '串接企業既有 ERP、CRM、Microsoft 365、資料庫與 API，建立品牌化入口、事件流程、受控 AI Agent、權限與稽核。';
  const faq = [
    {
      q: { zh: 'Headless SaaS 是什麼？', en: 'What is headless SaaS?' },
      a: { zh: 'Headless SaaS 將前端體驗與後端資料及業務邏輯分開。企業可以保留既有 ERP、CRM、Microsoft 365、資料庫或 API，再建立品牌網站、客戶 Portal、行動介面與 AI Agent。', en: 'Headless SaaS separates the customer experience from backend data and business logic. An organisation can retain its ERP, CRM, Microsoft 365, databases, or APIs while adding branded websites, portals, mobile experiences, and AI agents.' }
    },
    {
      q: { zh: '需要更換現有 ERP 或 CRM 嗎？', en: 'Do we need to replace the existing ERP or CRM?' },
      a: { zh: '不需要先更換。第一階段會盤點既有系統、資料、API、權限與流程，再決定保留、串接或逐步移轉的範圍。', en: 'Not as a starting requirement. The first stage maps existing systems, data, APIs, permissions, and workflows, then defines what to retain, integrate, or migrate in stages.' }
    },
    {
      q: { zh: 'AI 會直接修改正式資料嗎？', en: 'Will AI directly modify official records?' },
      a: { zh: '每一類動作都會設定工具與權限。對外發布、正式狀態、付款或其他敏感寫回可設定為必須經人員核准，並保存核准者、時間、來源與執行結果。', en: 'Every action is restricted by tools and permissions. Publishing, formal status changes, payments, and other sensitive writes can require human approval, with the approver, time, source, and result preserved.' }
    },
    {
      q: { zh: '可以做成多租戶 SaaS 嗎？', en: 'Can this become a multi-tenant SaaS?' },
      a: { zh: '可以分階段產品化。EudTech 先以單一企業專屬服務驗證資料、權限、事件與維運，再依商業模式評估租戶隔離、計費、方案管理與自助開通。', en: 'Yes, through staged productisation. EudTech first validates data, permissions, events, and operations in a dedicated company service, then evaluates tenant isolation, billing, plans, and self-service onboarding.' }
    }
  ];
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: isEnglish ? 'Enterprise headless SaaS and AI agent implementation' : '企業 Headless SaaS 與 AI Agent 導入',
      provider: { '@type': 'Organization', name: 'EudTech', url: canonicalPageUrl('https://eudaemonia.tech') },
      areaServed: 'TW',
      serviceType: isEnglish ? 'Headless SaaS integration and productisation' : 'Headless SaaS 整合與產品化服務',
      url: canonicalPageUrl('https://eudaemonia.tech/solutions/headless-saas')
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: tx(item.q, isEnglish),
        acceptedAnswer: { '@type': 'Answer', text: tx(item.a, isEnglish) }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEnglish ? 'Home' : '首頁', item: canonicalPageUrl('https://eudaemonia.tech') },
        { '@type': 'ListItem', position: 2, name: isEnglish ? 'Solutions' : '解決方案', item: canonicalPageUrl('https://eudaemonia.tech/solutions') },
        { '@type': 'ListItem', position: 3, name: isEnglish ? 'Headless SaaS' : '企業 Headless SaaS 導入', item: canonicalPageUrl('https://eudaemonia.tech/solutions/headless-saas') }
      ]
    }
  ];
  const outcomes = [
    { icon: Layers3, title: { zh: '品牌化客戶入口', en: 'Branded customer portal' }, body: { zh: '客戶使用企業網域、品牌與權限設計的入口；後端仍可沿用既有 ERP、CRM、Microsoft 365 與資料庫。', en: 'Customers use a portal with your domain, brand, and access model while the backend continues using existing ERP, CRM, Microsoft 365, and databases.' } },
    { icon: RefreshCw, title: { zh: '事件驅動工作流程', en: 'Event-driven workflows' }, body: { zh: '表單、郵件、系統或資料變更形成事件，再由後端驗證、去重並執行授權範圍內的動作。', en: 'Forms, email, system, or data changes create events; the backend validates, deduplicates, and performs authorised actions.' } },
    { icon: Bot, title: { zh: '受控 AI Agent', en: 'Controlled AI agents' }, body: { zh: 'AI 只使用核准的資料與工具，提供搜尋、摘要、補件、任務建立、通知或寫回建議。', en: 'AI uses only approved data and tools for search, summaries, missing-item follow-up, task creation, notifications, or write-back suggestions.' } },
    { icon: ShieldCheck, title: { zh: '權限與稽核治理', en: 'Permission and audit governance' }, body: { zh: '保存來源、版本、事件、執行者、核准人與結果，讓每一個自動化動作可以追查。', en: 'Preserve sources, versions, events, actors, approvers, and results so every automated action remains traceable.' } }
  ];
  const governance = [
    { icon: KeyRound, title: { zh: '最小必要權限', en: 'Least-privilege access' }, body: { zh: '每一個連線只取得完成指定流程所需的讀取、插入或更新能力。', en: 'Each connection receives only the read, insert, or update capability required for the named workflow.' } },
    { icon: UserCheck, title: { zh: '人員核准節點', en: 'Human approval gates' }, body: { zh: '對外發布、正式狀態與敏感寫回依風險保留核准。', en: 'Publishing, formal status changes, and sensitive writes retain approval gates based on risk.' } },
    { icon: FileClock, title: { zh: '版本與事件證據', en: 'Version and event evidence' }, body: { zh: '驗收記錄包含來源頁面、事件、版本、執行工具、核准與結果。', en: 'Acceptance records include source page, event, version, executed tool, approval, and result.' } },
    { icon: BadgeCheck, title: { zh: '租戶與資料邊界', en: 'Tenant and data boundaries' }, body: { zh: '專屬服務先驗證資料邊界；多租戶產品化再加入租戶隔離、方案與計費治理。', en: 'Dedicated service first validates data boundaries; multi-tenant productisation then adds tenant isolation, plans, and billing governance.' } }
  ];
  const stages = [
    { n: '01', title: { zh: '現況與權限盤點', en: 'Current-state and access review' }, body: { zh: '確認使用者、既有系統、資料來源、API、敏感欄位、權限與預期客戶體驗。', en: 'Confirm users, existing systems, data sources, APIs, sensitive fields, access, and the intended customer experience.' } },
    { n: '02', title: { zh: '單一流程試點', en: 'Single-flow pilot' }, body: { zh: '選一個輸入、事件、決策、核准與輸出都明確的流程，建立可重跑驗收。', en: 'Choose one flow with clear input, event, decision, approval, and output, then build repeatable acceptance tests.' } },
    { n: '03', title: { zh: '專屬正式服務', en: 'Dedicated production service' }, body: { zh: '建立 API、事件處理、監測、秘密管理、備份、稽核與維運責任。', en: 'Establish APIs, event handling, monitoring, secret management, backups, audit, and operating ownership.' } },
    { n: '04', title: { zh: '多租戶產品化', en: 'Multi-tenant productisation' }, body: { zh: '依已驗證商業模式加入租戶隔離、方案、計費、自助開通與服務等級。', en: 'Add tenant isolation, plans, billing, self-service onboarding, and service levels after the business model is validated.' } }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <SEOHead
        title={title}
        description={description}
        keywords={isEnglish ? 'enterprise headless SaaS, SaaS integration, customer portal, event-driven workflow, AI agent' : '企業 Headless SaaS, SaaS 整合, 客戶 Portal, 事件驅動, AI Agent'}
        url={canonicalPageUrl('https://eudaemonia.tech/solutions/headless-saas')}
        image={getConfiguratorSocialPreviewPath('/solutions/headless-saas')}
        imageAlt={isEnglish ? 'EudTech enterprise headless SaaS and AI agent architecture' : 'EudTech 企業 Headless SaaS 與 AI Agent 架構'}
        structuredData={structuredData}
        isEnglish={isEnglish}
      />
      <section className="overflow-hidden bg-slate-950 pb-20 pt-32 text-white sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">HEADLESS SAAS × AI AGENT</p>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{isEnglish ? 'Keep the systems that work. Rebuild the customer experience and automation.' : '保留有效的既有系統，重新打造客戶入口與自動化流程'}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">{isEnglish ? 'EudTech connects ERP, CRM, Microsoft 365, databases, and APIs to branded portals, event workflows, and controlled AI agents.' : 'EudTech 將 ERP、CRM、Microsoft 365、資料庫與 API 接上品牌化入口、事件流程與受控 AI Agent。'}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><ActionLink href="/contact">{isEnglish ? 'Discuss one workflow' : '討論一條流程'}</ActionLink><ActionLink href="#architecture" secondary>{isEnglish ? 'View the architecture' : '查看整合架構'}</ActionLink></div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-400"><span>{isEnglish ? 'Customer-owned workspace' : '客戶持有工作區'}</span><span>{isEnglish ? 'Event-driven updates' : '事件驅動更新'}</span><span>{isEnglish ? 'Human approval available' : '保留人工核准'}</span><span>{isEnglish ? 'Traceable operations' : '操作可以追溯'}</span></div>
          </div>
          <HeadlessSaasVisual isEnglish={isEnglish} />
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">{isEnglish ? 'Existing systems, a better customer experience' : '沿用既有系統，重做客戶體驗'}</p><h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Separate the customer experience from backend systems.' : '把客戶體驗與後端系統分開設計'}</h2><p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'The goal is to preserve useful data and operating systems while creating the right branded experience, permissions, automation, and service boundary for customers.' : '保留企業有效的資料與營運系統，同時為客戶建立正確的品牌體驗、權限、自動化與服務邊界。'}</p></div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{outcomes.map(({ icon: Icon, title: itemTitle, body }) => <article key={tx(itemTitle, isEnglish)} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><Icon className="h-7 w-7 text-cyan-600 dark:text-cyan-300" /><h3 className="mt-5 text-lg font-bold">{tx(itemTitle, isEnglish)}</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(body, isEnglish)}</p></article>)}</div>
        </div>
      </section>

      <section id="architecture" className="scroll-mt-24 border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">{isEnglish ? 'Reference architecture' : '參考架構'}</p><h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Every action crosses an explicit control point' : '每一個動作都經過明確控制點'}</h2></div><p className="leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'An authorised webhook or system event signals a change; the service retrieves current data through an API, validates and deduplicates the event, applies policy, and performs only the permitted action.' : '已授權的 Webhook 或系統事件先通知資料變更；服務再透過 API 取得最新資料，完成驗證與去重、套用政策，最後只執行被允許的動作。'}</p></div>
          <div className="mt-10"><HeadlessSaasVisual isEnglish={isEnglish} /></div>
        </div>
      </section>

      <section className="py-20 sm:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">{isEnglish ? 'Governance by design' : '治理從設計開始'}</p><h2 className="mt-4 text-3xl font-bold tracking-tight">{isEnglish ? 'Source-aware, tool-restricted, and reviewable' : '知道資料來源、限制可用工具、保留查核能力'}</h2><p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'The implementation separates context from actions. Reading a source does not grant authority to update it, and a model suggestion is not an approved business decision.' : '整合架構會分開「讀取脈絡」與「執行動作」。能讀取來源不代表能修改來源，AI 建議也不等於企業已核准的決策。'}</p></div><div className="grid gap-4 sm:grid-cols-2">{governance.map(({ icon: Icon, title: itemTitle, body }) => <article key={tx(itemTitle, isEnglish)} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"><Icon className="h-7 w-7 text-emerald-600 dark:text-emerald-300" /><h3 className="mt-5 text-lg font-bold">{tx(itemTitle, isEnglish)}</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(body, isEnglish)}</p></article>)}</div></div></div></section>

      <section className="border-y border-slate-200 bg-slate-950 py-20 text-white dark:border-slate-800 sm:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">{isEnglish ? 'From integration to product' : '從整合走向產品'}</p><h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Validate one service before scaling the platform' : '先驗證一項服務，再擴大平台'}</h2><p className="mt-5 text-lg leading-8 text-slate-300">{isEnglish ? 'Each stage has its own scope, evidence, operating owner, and expansion decision.' : '每一個階段都有獨立範圍、驗收證據、維運負責人與擴充決策。'}</p></div><ol className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{stages.map(({ n, title: itemTitle, body }) => <li key={n} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6"><span className="text-xs font-bold tracking-[0.2em] text-cyan-300">{n}</span><h3 className="mt-5 text-lg font-bold">{tx(itemTitle, isEnglish)}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{tx(body, isEnglish)}</p></li>)}</ol></div></section>

      <section className="py-20 sm:py-24"><div className="mx-auto max-w-4xl px-6 lg:px-8"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">FAQ</p><h2 className="mt-4 text-3xl font-bold">{isEnglish ? 'Common implementation questions' : '常見導入問題'}</h2><div className="mt-10 space-y-4">{faq.map((item) => <details key={tx(item.q, isEnglish)} className="group rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold"><span>{tx(item.q, isEnglish)}</span><span className="text-cyan-600 transition group-open:rotate-45 dark:text-cyan-300">＋</span></summary><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(item.a, isEnglish)}</p></details>)}</div></div></section>

      <section className="bg-cyan-400 py-16 text-slate-950"><div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div><h2 className="text-3xl font-bold">{isEnglish ? 'Bring one existing system workflow.' : '帶一條既有系統流程來討論'}</h2><p className="mt-3 max-w-2xl leading-7 text-slate-800">{isEnglish ? 'EudTech will identify the customer experience, source data, event, permission, approval, and first verifiable output.' : 'EudTech 會確認客戶體驗、來源資料、事件、權限、核准點與第一個可驗證輸出。'}</p></div><Link to="/contact" className="inline-flex shrink-0 items-center justify-center rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800">{isEnglish ? 'Book a consultation' : '預約諮詢'}<ArrowRight className="ml-2 h-4 w-4" /></Link></div></section>
      <Footer isEnglish={isEnglish} />
    </div>
  );
};

export default HeadlessSaasSolutionPage;
