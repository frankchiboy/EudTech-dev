import React from 'react';
import { ArrowRight, Bot, CalendarDays, Check, Database, FileClock, KeyRound, Link2, MessageSquare, ShieldCheck, UserCheck, Workflow } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import SEOHead from '../common/SEOHead';
import Footer from '../Footer';
import HeadlessSaasVisual from '../headless-saas/HeadlessSaasVisual';
import { canonicalPageUrl } from '../../utils/seo/canonicalUrl';
import { SITE_BOOKING } from '../../data/siteArchitecture';

type Bilingual = { zh: string; en: string };
const tx = (value: Bilingual, isEnglish: boolean) => (isEnglish ? value.en : value.zh);

const AiAgentSolutionPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const pageUrl = canonicalPageUrl('https://eudaemonia.tech/solutions/ai-agent');

  const capabilities = [
    { icon: KeyRound, title: { zh: 'Identity & Permissions', en: 'Identity & Permissions' }, body: { zh: '保存使用者、Agent、角色與可使用工具的權限邊界。', en: 'Keep users, agents, roles, and tool permissions explicit.' } },
    { icon: Workflow, title: { zh: 'Workflow & State', en: 'Workflow & State' }, body: { zh: '記錄任務、流程狀態、負責人、期限、等待條件與下一步。', en: 'Record tasks, workflow state, owners, deadlines, waits, and next steps.' } },
    { icon: UserCheck, title: { zh: 'Approval & Action', en: 'Approval & Action' }, body: { zh: '敏感 Action 在正式執行前套用政策與人工核准。', en: 'Apply policy and human approval before sensitive actions execute.' } },
    { icon: FileClock, title: { zh: 'Audit & Provenance', en: 'Audit & Provenance' }, body: { zh: '保留來源、工具呼叫、核准者、版本、結果與例外處理。', en: 'Preserve sources, tool calls, approvers, versions, results, and exceptions.' } },
  ];

  const layers = [
    { icon: Bot, label: { zh: '使用介面', en: 'Interface' }, title: { zh: 'ChatGPT / Claude', en: 'ChatGPT / Claude' }, body: { zh: '員工在熟悉的 AI 介面直接工作，不需要再學另一套聊天系統。', en: 'Employees work in familiar AI interfaces without learning another chatbot.' } },
    { icon: Link2, label: { zh: '連接層', en: 'Connection' }, title: { zh: 'Remote MCP Gateway', en: 'Remote MCP Gateway' }, body: { zh: '把企業工具與資料能力安全提供給 AI 介面。', en: 'Expose enterprise tools and data capabilities safely to AI interfaces.' } },
    { icon: ShieldCheck, label: { zh: '控制與紀錄層', en: 'Control & record' }, title: { zh: 'EudTech Agent SOR', en: 'EudTech Agent SOR' }, body: { zh: '集中保存 Agent 身分、流程、權限、核准、Action、脈絡索引與稽核證據。', en: 'Centralize agent identity, workflow, permissions, approvals, actions, context references, and audit evidence.' } },
    { icon: Database, label: { zh: '正式資料來源', en: 'Authoritative systems' }, title: { zh: 'ERP / CRM / Email / DB', en: 'ERP / CRM / Email / DB' }, body: { zh: '正式交易、客戶、財務、郵件與其他業務資料仍由既有系統負責。', en: 'Transactions, customer, finance, mail, and other business records stay in their authoritative systems.' } },
  ];

  const faq = [
    {
      q: { zh: 'Agent SOR 是什麼？', en: 'What is an Agent SOR?' },
      a: { zh: '它是 AI Agent 的企業 System of Record：保存誰可以做什麼、目前工作狀態、哪些動作需要核准、實際執行了什麼，以及完整稽核證據。', en: 'It is the enterprise system of record for AI agents: who can do what, current work state, approval requirements, executed actions, and audit evidence.' }
    },
    {
      q: { zh: '使用者需要進 EudTech 的聊天介面嗎？', en: 'Do users need an EudTech chat UI?' },
      a: { zh: '日常使用可以直接留在 ChatGPT 或 Claude。EudTech 提供後端 SOR、Action Layer、MCP 連線與管理後台。', en: 'Daily work can stay in ChatGPT or Claude. EudTech provides the backend SOR, action layer, MCP connections, and administration.' }
    },
    {
      q: { zh: 'ERP、CRM 會被 EudTech 取代嗎？', en: 'Does EudTech replace ERP or CRM?' },
      a: { zh: '正式業務物件仍由原本的 ERP、CRM、Email 或資料庫負責；EudTech 保存跨系統的 Agent 工作狀態、控制與執行證據。', en: 'Authoritative business objects remain in ERP, CRM, email, or databases; EudTech records cross-system agent state, controls, and execution evidence.' }
    },
  ];

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: isEnglish ? 'EudTech Agent SOR and Action Layer' : 'EudTech Agent SOR 與 Action Layer',
      description: isEnglish
        ? 'Use ChatGPT or Claude as the interface while EudTech provides the agent system of record, MCP gateway, permissions, approvals, actions, and audit layer.'
        : '以 ChatGPT 或 Claude 作為使用介面，由 EudTech 提供 Agent System of Record、MCP Gateway、權限、核准、Action 與稽核層。',
      provider: { '@type': 'Organization', name: 'EudTech', url: canonicalPageUrl('https://eudaemonia.tech') },
      areaServed: 'TW',
      url: pageUrl
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({ '@type': 'Question', name: tx(item.q, isEnglish), acceptedAnswer: { '@type': 'Answer', text: tx(item.a, isEnglish) } }))
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <SEOHead
        title={isEnglish ? 'Agent SOR & Action Layer for ChatGPT and Claude | EudTech' : 'Agent SOR 與 Action Layer｜EudTech'}
        description={isEnglish ? 'ChatGPT and Claude are the interface. EudTech is the agent system of record and action layer connecting enterprise systems through MCP.' : 'ChatGPT／Claude 是使用介面；EudTech 是 Agent System of Record + Action Layer，透過 MCP 串接企業既有系統。'}
        keywords={isEnglish ? 'Agent SOR, agent system of record, MCP gateway, AI agent governance, ChatGPT enterprise integration, Claude enterprise integration' : 'Agent SOR, AI Agent System of Record, MCP Gateway, AI Agent 治理, ChatGPT 企業整合, Claude 企業整合'}
        url={pageUrl}
        structuredData={structuredData}
        isEnglish={isEnglish}
      />

      <section className="overflow-hidden bg-slate-950 pb-20 pt-32 text-white sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">AGENT SOR × ACTION LAYER</p>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {isEnglish ? 'ChatGPT and Claude are the interface.' : 'ChatGPT／Claude 就是使用介面。'}
              <span className="mt-2 block text-cyan-300">{isEnglish ? 'EudTech is the system of record and action layer.' : 'EudTech 是 System of Record + Action Layer。'}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              {isEnglish
                ? 'Keep the AI interface your team already uses. EudTech sits behind it to connect enterprise systems, enforce permissions and approvals, preserve workflow state, and execute traceable actions through MCP.'
                : '保留團隊已經使用的 AI 介面。EudTech 在後端透過 MCP 串接企業系統，統一權限、核准、流程狀態與可追溯 Action。'}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={SITE_BOOKING.href} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                <CalendarDays className="mr-2 h-4 w-4" />{isEnglish ? 'Discuss an Agent SOR pilot' : '討論 Agent SOR 試點'}
              </a>
              <a href="#architecture" className="inline-flex items-center justify-center rounded-md border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
                {isEnglish ? 'View architecture' : '查看架構'}<ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-400">
              <span>ChatGPT / Claude</span><span>Remote MCP</span><span>Permissions & approvals</span><span>Audit & provenance</span>
            </div>
          </div>
          <HeadlessSaasVisual isEnglish={isEnglish} />
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">{isEnglish ? 'No second chatbot' : '不再做第二個 Chatbot'}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Separate the AI interface from enterprise control.' : '把 AI 使用介面與企業控制層分開。'}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'The user experience can evolve with ChatGPT, Claude, or another AI client. The enterprise still owns one durable record of agent identities, state, permissions, approvals, actions, and evidence.' : '前台可以跟著 ChatGPT、Claude 或其他 AI Client 演進；企業後端仍保有一套穩定的 Agent 身分、狀態、權限、核准、Action 與證據紀錄。'}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {capabilities.map(({ icon: Icon, title, body }) => <article key={tx(title, isEnglish)} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><Icon className="h-7 w-7 text-cyan-600 dark:text-cyan-300" /><h3 className="mt-5 text-lg font-bold">{tx(title, isEnglish)}</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(body, isEnglish)}</p></article>)}
          </div>
        </div>
      </section>

      <section id="architecture" className="scroll-mt-24 border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">{isEnglish ? 'Reference architecture' : '參考架構'}</p><h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'One durable control plane behind many AI interfaces.' : '多個 AI 介面背後，共用一套耐久控制與紀錄層。'}</h2></div>
            <p className="leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'ChatGPT or Claude calls approved capabilities through MCP. EudTech evaluates identity, policy, workflow state, and approval requirements before an action reaches an authoritative business system.' : 'ChatGPT 或 Claude 透過 MCP 呼叫已授權能力；EudTech 先檢查身分、政策、流程狀態與核准條件，再讓 Action 寫入正式企業系統。'}</p>
          </div>
          <div className="mt-10"><HeadlessSaasVisual isEnglish={isEnglish} /></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {layers.map(({ icon: Icon, label, title, body }) => <article key={tx(title, isEnglish)} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"><Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-300" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{tx(label, isEnglish)}</p><h3 className="mt-2 text-lg font-bold">{tx(title, isEnglish)}</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(body, isEnglish)}</p></article>)}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">{isEnglish ? 'What the SOR records' : 'SOR 保存什麼'}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{isEnglish ? 'The durable state around every agent action.' : '把每一次 Agent 行動周邊的耐久狀態留下來。'}</h2>
            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'The model can change. The chat interface can change. The enterprise record of authority, state, approval, execution, and evidence should not.' : '模型可以換、聊天介面可以換；企業的權限、狀態、核准、執行與證據紀錄不應跟著消失。'}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Identity', 'User, agent, tenant, role, delegated authority'],
              ['Work state', 'Task, workflow, status, owner, deadline, dependency'],
              ['Context', 'Source references, memory pointers, conversation and business object links'],
              ['Action', 'Tool, parameters, policy decision, approval, execution result'],
              ['Evidence', 'Source, version, timestamp, actor, exception and audit trail'],
              ['Connections', 'MCP servers, APIs, scopes, credentials and data boundaries'],
            ].map(([name, body]) => <div key={name} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"><p className="font-bold">{name}</p><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{body}</p></div>)}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-950 py-20 text-white dark:border-slate-800 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">MVP</p><h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Start with five enterprise controls.' : '第一版先做好五個企業控制能力。'}</h2></div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['01', 'MCP Gateway'], ['02', 'Connections'], ['03', 'RBAC / Policy'], ['04', 'Approval + Action'], ['05', 'Audit Log']
            ].map(([n, title]) => <div key={n} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6"><span className="text-xs font-bold tracking-[0.2em] text-cyan-300">{n}</span><p className="mt-5 font-bold">{title}</p></div>)}
          </div>
          <div className="mt-10 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-6 text-sm leading-7 text-slate-200"><Check className="mr-2 inline h-5 w-5 text-cyan-300" />{isEnglish ? 'This creates value without building another chat UI: the user stays in ChatGPT or Claude while EudTech becomes the enterprise control and record layer.' : '這樣不用先開發另一套聊天 UI：使用者留在 ChatGPT／Claude，EudTech 專注成為企業控制與紀錄層。'}</div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">FAQ</p>
          <h2 className="mt-4 text-3xl font-bold">{isEnglish ? 'Common architecture questions' : '常見架構問題'}</h2>
          <div className="mt-10 space-y-4">{faq.map((item) => <details key={tx(item.q, isEnglish)} className="group rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold"><span>{tx(item.q, isEnglish)}</span><span className="text-cyan-600 transition group-open:rotate-45 dark:text-cyan-300">＋</span></summary><p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(item.a, isEnglish)}</p></details>)}</div>
        </div>
      </section>

      <section className="bg-cyan-400 py-16 text-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div><h2 className="text-3xl font-bold">{isEnglish ? 'Bring one workflow and one AI interface.' : '帶一條流程與一個 AI 使用介面來討論。'}</h2><p className="mt-3 max-w-2xl leading-7 text-slate-800">{isEnglish ? 'We define the MCP connection, permissions, approval point, action boundary, and evidence record for a first Agent SOR pilot.' : 'EudTech 會定義第一個 Agent SOR 試點需要的 MCP 連線、權限、核准點、Action 邊界與證據紀錄。'}</p></div>
          <a href={SITE_BOOKING.href} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800">{isEnglish ? 'Book discovery' : '預約需求診斷'}<ArrowRight className="ml-2 h-4 w-4" /></a>
        </div>
      </section>
      <Footer isEnglish={isEnglish} />
    </div>
  );
};

export default AiAgentSolutionPage;