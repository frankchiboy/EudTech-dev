import React, { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Cpu,
  Database,
  FileCheck2,
  GitBranch,
  Headphones,
  Layers,
  Landmark,
  LockKeyhole,
  Mail,
  MessageSquare,
  Network,
  Route,
  Scale,
  SearchCheck,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Users,
  Workflow,
  Zap
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import SEOHead from '../common/SEOHead';
import Footer from '../Footer';
import { canonicalPageUrl } from '../../utils/seo/canonicalUrl';

type Bilingual = { zh: string; en: string };
const BOOKING_URL = 'https://outlook.office.com/book/EudTechOnlineMeeting@EudaemoniaTechnologLtd.onmicrosoft.com/';

const text = (value: Bilingual, isEnglish: boolean) => (isEnglish ? value.en : value.zh);

interface IconItem {
  icon: LucideIcon;
  title: Bilingual;
  body: Bilingual;
}

interface SceneStep {
  stage: Bilingual;
  title: Bilingual;
  body: Bilingual;
  icon: LucideIcon;
}

const painPoints: IconItem[] = [
  {
    icon: Clock3,
    title: { zh: '追蹤靠人記，事情容易斷線', en: 'Human memory carries the follow-up load' },
    body: { zh: '信件、表單、試算表與聊天紀錄分散，團隊難以即時知道下一個責任人與期限。', en: 'Email, forms, spreadsheets, and chat records fragment ownership and deadlines.' }
  },
  {
    icon: SearchCheck,
    title: { zh: '核對資料耗時，錯誤難以提早發現', en: 'Manual reconciliation hides errors' },
    body: { zh: '人工比對報價、訂單、合約與附件，重複工作佔用熟手時間，也放大遺漏風險。', en: 'Manual comparison of quotes, orders, contracts, and attachments consumes expert time.' }
  },
  {
    icon: Bell,
    title: { zh: '催辦沒有節奏，客戶體驗不一致', en: 'Follow-ups lack a consistent rhythm' },
    body: { zh: '提醒常常依賴個人習慣，重要回覆可能延誤，客戶收到的服務品質也不一致。', en: 'Reminders depend on personal habits, so important replies can arrive late.' }
  },
  {
    icon: GitBranch,
    title: { zh: '系統各自運作，管理者看不到全貌', en: 'Disconnected systems obscure the full picture' },
    body: { zh: 'ERP、CRM、專案工具與郵件各自保存資料，管理者無法用同一套事件脈絡判斷進度。', en: 'ERP, CRM, project tools, and mail keep separate records without one shared event context.' }
  }
];

const agentRoles: IconItem[] = [
  { icon: SearchCheck, title: { zh: '資料整理 Agent', en: 'Intake Agent' }, body: { zh: '接收郵件、表單與檔案，擷取欄位並建立可追蹤事件。', en: 'Collects email, forms, and files, then turns them into traceable events.' } },
  { icon: ClipboardCheck, title: { zh: '核對 Agent', en: 'Reconciliation Agent' }, body: { zh: '按照規則比對價格、數量、條款與附件，標示差異。', en: 'Compares prices, quantities, terms, and attachments against defined rules.' } },
  { icon: Bell, title: { zh: '催辦 Agent', en: 'Follow-up Agent' }, body: { zh: '依期限、優先級與回覆狀態提出下一步提醒。', en: 'Suggests the next reminder from due dates, priority, and reply status.' } },
  { icon: MessageSquare, title: { zh: '回覆草稿 Agent', en: 'Drafting Agent' }, body: { zh: '依既有脈絡產生可審核草稿，保留原始 thread 關聯。', en: 'Creates reviewable drafts while preserving the original thread context.' } },
  { icon: BarChart3, title: { zh: '管理摘要 Agent', en: 'Briefing Agent' }, body: { zh: '把事件轉成管理者可讀的風險、進度與待決策摘要。', en: 'Turns events into decision-ready summaries of risk, progress, and open choices.' } },
  { icon: ShieldCheck, title: { zh: '治理稽核 Agent', en: 'Governance Agent' }, body: { zh: '保留來源、版本、核准者與執行紀錄，支援稽核與復盤。', en: 'Preserves source, version, approver, and execution evidence for audit.' } }
];

const scenes: { label: Bilingual; intro: Bilingual; steps: SceneStep[] }[] = [
  {
    label: { zh: '業務與報價', en: 'Sales & quoting' },
    intro: { zh: '從詢價進件到報價追蹤，讓業務把時間留給客戶與決策。', en: 'From inbound RFQs to quote follow-up, agents give sales more time for customers and decisions.' },
    steps: [
      { stage: { zh: '01／進件', en: '01 / Intake' }, title: { zh: '辨識詢價與需求', en: 'Recognise the request' }, body: { zh: 'Agent 讀取郵件與附件，整理產品、數量、交期與聯絡資訊。', en: 'The agent reads mail and attachments, extracting products, quantities, timing, and contacts.' }, icon: Mail },
      { stage: { zh: '02／核對', en: '02 / Check' }, title: { zh: '比對報價條件', en: 'Check quote conditions' }, body: { zh: 'Agent 對照歷史報價、供應商條件與內部規則，標出需要人員確認的差異。', en: 'The agent compares history, supplier terms, and rules, highlighting differences for review.' }, icon: ClipboardCheck },
      { stage: { zh: '03／催辦', en: '03 / Follow-up' }, title: { zh: '準時提醒下一步', en: 'Keep the next step on time' }, body: { zh: '期限將近或資料缺漏時，Agent 提出提醒與回覆草稿，由人員核准後送出。', en: 'When a deadline nears or data is missing, the agent suggests a reminder and draft for approval.' }, icon: Bell }
    ]
  },
  {
    label: { zh: '財務與採購', en: 'Finance & procurement' },
    intro: { zh: '把發票、採購與付款前核對串成可稽核的事件流程。', en: 'Connect invoices, procurement, and pre-payment checks into an auditable event flow.' },
    steps: [
      { stage: { zh: '01／收件', en: '01 / Receive' }, title: { zh: '分類財務文件', en: 'Classify finance documents' }, body: { zh: 'Agent 從指定信箱與資料夾識別發票、訂單、對帳單與付款通知。', en: 'The agent identifies invoices, orders, statements, and payment notices from approved sources.' }, icon: Database },
      { stage: { zh: '02／三方核對', en: '02 / Three-way match' }, title: { zh: '核對採購與憑證', en: 'Match purchasing evidence' }, body: { zh: 'Agent 比對採購單、收貨紀錄與發票，將缺件與異常升級給指定人員。', en: 'The agent matches purchase orders, receiving records, and invoices, escalating exceptions.' }, icon: Scale },
      { stage: { zh: '03／核准', en: '03 / Approve' }, title: { zh: '留下完整核准軌跡', en: 'Keep the approval trail complete' }, body: { zh: '系統準備付款前摘要，重要付款仍由授權人員核准與執行。', en: 'The system prepares a pre-payment brief; authorised staff still approve and execute payment.' }, icon: CircleDollarSign }
    ]
  },
  {
    label: { zh: '專案與服務', en: 'Projects & service' },
    intro: { zh: '讓交付、客服與跨部門任務由同一套事件狀態驅動。', en: 'Drive delivery, support, and cross-team work from one event-based status model.' },
    steps: [
      { stage: { zh: '01／建立', en: '01 / Create' }, title: { zh: '把需求變成任務', en: 'Turn requests into work' }, body: { zh: 'Agent 由客戶訊息與會議紀錄建立任務、負責人、期限與驗收條件。', en: 'The agent turns customer messages and meeting notes into tasks, owners, due dates, and acceptance criteria.' }, icon: Workflow },
      { stage: { zh: '02／執行', en: '02 / Execute' }, title: { zh: '主動追蹤交付狀態', en: 'Track delivery actively' }, body: { zh: 'Agent 監看事件變化，提供延誤風險與需要跨部門協作的項目。', en: 'The agent monitors event changes and surfaces delay risks and cross-team dependencies.' }, icon: Route },
      { stage: { zh: '03／結案', en: '03 / Close' }, title: { zh: '整理服務與改善資料', en: 'Close with learning' }, body: { zh: '完成後自動彙整證據、客戶回饋與改善項目，供下一個週期使用。', en: 'After completion, evidence, feedback, and improvements are organised for the next cycle.' }, icon: FileCheck2 }
    ]
  }
];

const systems: IconItem[] = [
  { icon: Mail, title: { zh: 'Email／Outlook', en: 'Email / Outlook' }, body: { zh: '保留 thread、寄件與回覆證據，觸發事件與提醒。', en: 'Preserve thread, sent, and reply evidence to trigger events and reminders.' } },
  { icon: Database, title: { zh: 'ERP／會計', en: 'ERP / accounting' }, body: { zh: '對接訂單、發票、付款與庫存等營運資料。', en: 'Connect orders, invoices, payments, and operational inventory data.' } },
  { icon: Users, title: { zh: 'CRM／客戶資料', en: 'CRM / customer data' }, body: { zh: '把客戶互動與商機狀態放進同一條追蹤脈絡。', en: 'Bring customer interactions and opportunity status into one trace.' } },
  { icon: Workflow, title: { zh: '專案／任務系統', en: 'Project / task systems' }, body: { zh: '同步負責人、期限、阻礙與交付證據。', en: 'Synchronise owners, deadlines, blockers, and delivery evidence.' } },
  { icon: MessageSquare, title: { zh: 'Teams／協作工具', en: 'Teams / collaboration' }, body: { zh: '把核准後的通知與摘要送到正確的團隊頻道。', en: 'Send approved notifications and briefs to the right team channels.' } },
  { icon: Network, title: { zh: 'API／資料庫', en: 'APIs / databases' }, body: { zh: '以事件與權限邊界連接既有系統，不要求一次重建全部工具。', en: 'Connect existing systems through events and permission boundaries without rebuilding everything.' } }
];

const governance: IconItem[] = [
  { icon: LockKeyhole, title: { zh: '權限最小化', en: 'Least privilege' }, body: { zh: '依角色、資料來源與動作授予最小必要權限。', en: 'Grant only the permissions required for each role, source, and action.' } },
  { icon: ShieldCheck, title: { zh: '敏感動作人員核准', en: 'Human approval for sensitive actions' }, body: { zh: '付款、正式寄信、刪除與重大狀態變更由人員決定。', en: 'People decide on payments, formal sends, deletion, and material status changes.' } },
  { icon: FileCheck2, title: { zh: '來源與版本可追溯', en: 'Traceable source and versions' }, body: { zh: '保存輸入、規則、輸出、核准者與時間，支援回溯。', en: 'Keep inputs, rules, outputs, approvers, and timestamps for review.' } },
  { icon: Settings, title: { zh: '規則可調整', en: 'Adjustable rules' }, body: { zh: '以可讀規則設定升級門檻、提醒節奏與例外處理。', en: 'Configure escalation thresholds, reminder cadence, and exceptions with readable rules.' } },
  { icon: BarChart3, title: { zh: '持續衡量', en: 'Continuous measurement' }, body: { zh: '追蹤準時率、回覆時間、人工介入與錯誤率，持續優化。', en: 'Measure on-time rate, response time, human intervention, and error rate.' } }
];

const onboardingSteps: IconItem[] = [
  { icon: SearchCheck, title: { zh: '1. 找出高價值流程', en: '1. Find the highest-value flow' }, body: { zh: '盤點追蹤、核對與催辦工作，先選一條有明確輸入與結果的流程。', en: 'Map follow-up, reconciliation, and reminder work, then select one clear flow.' } },
  { icon: GitBranch, title: { zh: '2. 設計事件與核准點', en: '2. Design events and approvals' }, body: { zh: '定義來源、狀態、負責人、期限、例外與必須由人員核准的動作。', en: 'Define sources, status, owners, deadlines, exceptions, and human approval points.' } },
  { icon: Cpu, title: { zh: '3. 小範圍導入', en: '3. Launch a focused pilot' }, body: { zh: '接上既有系統，使用真實資料驗證事件、提醒與稽核紀錄。', en: 'Connect existing systems and validate events, reminders, and audit records with real data.' } },
  { icon: BarChart3, title: { zh: '4. 量化後擴大', en: '4. Scale after measurement' }, body: { zh: '用可量化成果決定是否擴充角色、流程、部門與自動化範圍。', en: 'Use measurable outcomes to expand agents, workflows, teams, and automation.' } }
];

const plans: IconItem[] = [
  { icon: SearchCheck, title: { zh: '流程診斷', en: 'Process diagnostic' }, body: { zh: '釐清流程、資料來源、風險與第一個導入場景。', en: 'Clarify the process, sources, risks, and first implementation scene.' } },
  { icon: Zap, title: { zh: '單流程試點', en: 'Single-flow pilot' }, body: { zh: '完成一條可操作、可觀察、可重複驗證的 Agent 流程。', en: 'Deliver one operable, observable, and repeatable agent workflow.' } },
  { icon: Layers, title: { zh: '部門方案', en: 'Department solution' }, body: { zh: '整合多個角色與系統，建立部門級追蹤與治理。', en: 'Combine multiple agents and systems into department-level tracking and governance.' } },
  { icon: Network, title: { zh: '企業營運方案', en: 'Enterprise operations' }, body: { zh: '以事件架構連接跨部門流程，建立可持續演進的營運系統。', en: 'Connect cross-functional flows with an event architecture built to evolve.' } }
];

const audiences: { icon: LucideIcon; title: Bilingual; body: Bilingual }[] = [
  { icon: Building2, title: { zh: '成長中的企業', en: 'Growing companies' }, body: { zh: '流程已經變複雜，但還沒有足夠人力支撐追蹤。', en: 'Operations are complex but the team cannot scale manual follow-up.' } },
  { icon: Briefcase, title: { zh: '專業服務團隊', en: 'Professional services' }, body: { zh: '需要保存客戶承諾、交付證據與專案節點。', en: 'Need reliable records of commitments, delivery evidence, and milestones.' } },
  { icon: ShoppingCart, title: { zh: '採購與供應鏈團隊', en: 'Procurement & supply chain' }, body: { zh: '每天處理大量詢價、核對、交期與供應商回覆。', en: 'Handle high volumes of RFQs, checks, lead times, and supplier replies.' } },
  { icon: Landmark, title: { zh: '重視合規的組織', en: 'Compliance-minded organisations' }, body: { zh: '要求重要決策有核准、有證據、可回溯。', en: 'Require approval, evidence, and traceability for important decisions.' } },
  { icon: Stethoscope, title: { zh: '高敏感資料團隊', en: 'Sensitive-data teams' }, body: { zh: '需要嚴格的權限、資料邊界與人工介入。', en: 'Need strict access, data boundaries, and human intervention.' } },
  { icon: Headphones, title: { zh: '客服與營運中心', en: 'Support & operations centres' }, body: { zh: '希望降低漏接、延誤與重複回覆。', en: 'Want to reduce missed requests, delays, and repeated replies.' } }
];

const faqs: { question: Bilingual; answer: Bilingual }[] = [
  { question: { zh: 'AI Agent 導入會直接取代人員嗎？', en: 'Will AI agents replace our staff?' }, answer: { zh: '本方案讓 AI 接手追蹤、核對與催辦，重要決策仍由人員核准。導入目標是提高團隊處理量與可見性，不是取消責任歸屬。', en: 'The solution lets agents handle follow-up, reconciliation, and reminders while people approve important decisions. The goal is capacity and visibility, not removing accountability.' } },
  { question: { zh: '需要更換目前使用的 ERP 或 CRM 嗎？', en: 'Do we need to replace our ERP or CRM?' }, answer: { zh: '不需要一次更換。導入會先確認既有系統的 API、匯出或事件能力，再用最小範圍連接高價值流程。', en: 'No. We first assess APIs, exports, or events in existing systems and connect the highest-value flow with minimal change.' } },
  { question: { zh: '第一個導入流程應該選什麼？', en: 'Which process should we start with?' }, answer: { zh: '建議選擇輸入明確、重複頻率高、延誤成本可量化的追蹤或核對流程，例如詢價追蹤、發票核對或專案催辦。', en: 'Start with a clear, repetitive flow where delay costs are measurable, such as RFQ follow-up, invoice checks, or project reminders.' } },
  { question: { zh: 'AI Agent 會自行寄出正式郵件嗎？', en: 'Will agents send formal email automatically?' }, answer: { zh: '預設先產生草稿與建議，正式寄出由授權人員核准；例外流程會依組織規則與風險分級設定。', en: 'By default, agents prepare drafts and suggestions while an authorised person approves the send. Exceptions follow your risk rules.' } },
  { question: { zh: '如何避免 AI 讀到不應該讀的資料？', en: 'How do we prevent inappropriate data access?' }, answer: { zh: '以資料來源、角色、欄位與動作建立權限邊界，並保留存取與輸出紀錄，導入前會先完成資料分類。', en: 'We define boundaries by source, role, field, and action, then retain access and output records after data classification.' } },
  { question: { zh: '導入成果如何衡量？', en: 'How do we measure the outcome?' }, answer: { zh: '以準時率、平均回覆時間、漏件率、人工介入比例與結案時間建立導入前後基準。', en: 'We establish before-and-after baselines for on-time rate, response time, missed items, human intervention, and closure time.' } },
  { question: { zh: '小型企業也適合導入嗎？', en: 'Is this suitable for a small business?' }, answer: { zh: '適合。小型企業可以從單一流程試點開始，先解決最常發生的追蹤與核對問題，再依成果逐步擴充。', en: 'Yes. A small business can start with one focused flow, solve the most frequent follow-up or check, and expand from measured results.' } },
  { question: { zh: 'EudTech 如何開始協助？', en: 'How does EudTech get started?' }, answer: { zh: '先安排流程診斷，確認工作目標、資料來源、核准點與成功指標，再提出適合的導入方案與範圍。', en: 'We begin with a process diagnostic covering goals, sources, approval points, and success metrics, then propose the right scope.' } }
];

const buildStructuredData = (isEnglish: boolean) => {
  const pageUrl = canonicalPageUrl('https://eudaemonia.tech/solutions/ai-agent');
  const pageName = isEnglish ? 'AI Agent Implementation' : 'AI Agent 導入';
  const pageDescription = isEnglish
    ? 'EudTech helps teams use AI agents to take over follow-up, reconciliation, and reminders while people approve important decisions.'
    : 'EudTech 協助企業導入 AI Agent 接手追蹤、核對與催辦，重要決策仍由人員核准。';

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: pageName,
      description: pageDescription,
      serviceType: 'AI agent implementation and workflow automation',
      areaServed: { '@type': 'Country', name: isEnglish ? 'Taiwan' : '台灣' },
      provider: { '@type': 'Organization', name: 'EudTech', url: canonicalPageUrl('https://eudaemonia.tech'), email: 'info@eudaemonia.tech' },
      url: pageUrl
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: text(faq.question, isEnglish),
        acceptedAnswer: { '@type': 'Answer', text: text(faq.answer, isEnglish) }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEnglish ? 'Home' : '首頁', item: canonicalPageUrl('https://eudaemonia.tech') },
        { '@type': 'ListItem', position: 2, name: isEnglish ? 'Solutions' : '解決方案', item: canonicalPageUrl('https://eudaemonia.tech/solutions') },
        { '@type': 'ListItem', position: 3, name: pageName, item: pageUrl }
      ]
    }
  ];
};

const AiAgentSolutionPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const [activeScene, setActiveScene] = useState(0);
  const selectedScene = scenes[activeScene];
  const pageUrl = canonicalPageUrl('https://eudaemonia.tech/solutions/ai-agent');

  return (
    <>
      <SEOHead
        title={isEnglish ? 'Enterprise AI Agent Implementation' : '企業 AI Agent 導入｜串接 Outlook、Teams、Dataverse 與 ERP'}
        description={isEnglish ? 'EudTech helps teams use AI agents to take over follow-up, reconciliation, and reminders while people approve important decisions.' : 'EudTech 協助企業導入 AI Agent 接手追蹤、核對與催辦，重要決策仍由人員核准。'}
        keywords={isEnglish ? 'AI agent implementation, workflow automation, AI operations, business process automation, Taiwan' : 'AI Agent 導入, AI 營運系統, 工作流程自動化, 企業 AI 導入, 台灣 AI 顧問'}
        url={pageUrl}
        type="website"
        isEnglish={isEnglish}
        structuredData={buildStructuredData(isEnglish)}
      />

      <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
        <section className="relative overflow-hidden bg-slate-950 pt-24 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.22),transparent_36%),radial-gradient(circle_at_80%_15%,rgba(16,185,129,0.18),transparent_30%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                <Sparkles className="h-4 w-4" />
                {isEnglish ? 'AI operations, designed for accountability' : '以責任歸屬為核心的 AI 營運'}
              </div>
              <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                {isEnglish ? 'Let AI handle the follow-up.' : '讓 AI 接手追蹤。'}
                <span className="block text-cyan-300">{isEnglish ? 'Keep decisions with people.' : '重要決策仍由人員核准。'}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {isEnglish ? 'EudTech connects the systems your team already uses and turns scattered work into a visible, event-driven operating flow.' : 'EudTech 連接團隊已經使用的系統，把分散的工作轉成可見、可追蹤、由事件驅動的營運流程。'}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {isEnglish ? 'Book a discovery call' : '預約導入諮詢'}
                </a>
                <a href="mailto:info@eudaemonia.tech?subject=AI%20Agent%20%E5%B0%8E%E5%85%A5%E8%AB%AE%E8%A9%A2" className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70">
                  <Mail className="mr-2 h-4 w-4" />
                  {isEnglish ? 'Email EudTech' : '寄信給 EudTech'}
                </a>
              </div>
              <p className="mt-6 text-sm text-slate-400">{isEnglish ? 'Human approval remains the control point for sensitive actions.' : '付款、正式寄信與重大狀態變更等敏感動作，保留人員核准控制點。'}</p>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{isEnglish ? 'Operating view' : '營運視圖'}</p>
                    <p className="mt-2 text-xl font-semibold">{isEnglish ? 'One event. Clear next action.' : '一個事件，一個清楚的下一步。'}</p>
                  </div>
                  <Bot className="h-9 w-9 text-cyan-300" />
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    { icon: Mail, label: isEnglish ? 'New supplier reply detected' : '偵測到供應商新回覆', tone: 'text-cyan-300' },
                    { icon: SearchCheck, label: isEnglish ? 'Quote terms reconciled' : '完成報價條件核對', tone: 'text-emerald-300' },
                    { icon: Users, label: isEnglish ? 'Approval requested from owner' : '已向負責人提出核准請求', tone: 'text-amber-300' }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-900/70 p-4">
                      <item.icon className={`h-5 w-5 ${item.tone}`} />
                      <span className="text-sm text-slate-200">{item.label}</span>
                      <Check className="ml-auto h-4 w-4 text-emerald-300" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100">
                  {isEnglish ? 'AI prepares the next action. A person decides whether it happens.' : 'AI 準備下一步，人員決定是否執行。'}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">{isEnglish ? 'The operational gap' : '營運缺口'}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Your team should not be the integration layer.' : '團隊不應該成為系統之間的整合層。'}</h2>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'AI agents create a shared operational rhythm across the systems where work already happens.' : 'AI Agent 讓既有系統之間形成共同的營運節奏，讓工作不再依賴個人記憶。'}</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {painPoints.map((item) => (
                <article key={text(item.title, isEnglish)} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                  <item.icon className="h-7 w-7 text-cyan-600 dark:text-cyan-300" />
                  <h3 className="mt-6 text-lg font-semibold">{text(item.title, isEnglish)}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text(item.body, isEnglish)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">{isEnglish ? 'The agent team' : 'Agent 角色'}</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Six focused roles. One accountable workflow.' : '六個專注角色，組成一條可負責的工作流程。'}</h2>
              </div>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'Each role has a defined purpose, source, and hand-off. The system can automate preparation without hiding who approves the result.' : '每個角色都有明確目的、資料來源與交接點。系統可以自動準備工作，但不隱藏誰核准結果。'}</p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {agentRoles.map((item, index) => (
                <article key={text(item.title, isEnglish)} className="group rounded-xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg dark:border-slate-800 dark:hover:border-emerald-500">
                  <div className="flex items-center justify-between">
                    <item.icon className="h-7 w-7 text-emerald-600 dark:text-emerald-300" />
                    <span className="text-xs font-semibold text-slate-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{text(item.title, isEnglish)}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text(item.body, isEnglish)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow-demo" className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">{isEnglish ? 'See it in context' : '看見實際流程'}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Three scenes, one event-driven rhythm.' : '三個場景，同一套事件驅動節奏。'}</h2>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'Switch scenes to see how the same principles adapt to different teams.' : '切換場景，查看同一套原則如何適應不同團隊。'}</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3" role="tablist" aria-label={isEnglish ? 'AI Agent scenes' : 'AI Agent 導入場景'}>
              {scenes.map((scene, index) => (
                <button key={text(scene.label, isEnglish)} type="button" role="tab" aria-selected={activeScene === index} onClick={() => setActiveScene(index)} className={`rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-400 ${activeScene === index ? 'bg-slate-950 text-white dark:bg-cyan-300 dark:text-slate-950' : 'border border-slate-300 bg-white text-slate-700 hover:border-cyan-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'}`}>
                  {text(scene.label, isEnglish)}
                </button>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-8">
              <p className="max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-200">{text(selectedScene.intro, isEnglish)}</p>
              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {selectedScene.steps.map((step, index) => (
                  <div key={text(step.title, isEnglish)} className="relative lg:pr-6">
                    {index < selectedScene.steps.length - 1 ? <div className="absolute left-5 top-12 hidden h-px w-[calc(100%-1.5rem)] bg-slate-200 dark:bg-slate-800 lg:block" /> : null}
                    <div className="relative flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300"><step.icon className="h-5 w-5" /></div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-600 dark:text-cyan-300">{text(step.stage, isEnglish)}</p>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold">{text(step.title, isEnglish)}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text(step.body, isEnglish)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">{isEnglish ? 'Works with your stack' : '連接既有系統'}</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Connect the work, not just the tools.' : '連接工作脈絡，不只是連接工具。'}</h2>
                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'EudTech maps events and permissions across the systems already central to your operation.' : 'EudTech 以事件與權限為核心，連接營運中已經使用的系統。'}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {systems.map((item) => (
                  <article key={text(item.title, isEnglish)} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
                    <item.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />
                    <h3 className="mt-4 font-semibold">{text(item.title, isEnglish)}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text(item.body, isEnglish)}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="consultation" className="scroll-mt-20 bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">{isEnglish ? 'Governance by design' : '內建治理'}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Automation should make responsibility clearer.' : '自動化應該讓責任更清楚。'}</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">{isEnglish ? 'Every implementation includes control points so the team can understand, approve, and audit what the agents do.' : '每次導入都包含控制點，讓團隊可以理解、核准並稽核 Agent 的工作。'}</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {governance.map((item) => (
                <article key={text(item.title, isEnglish)} className="rounded-xl border border-white/10 bg-white/[0.06] p-5">
                  <item.icon className="h-6 w-6 text-emerald-300" />
                  <h3 className="mt-5 text-base font-semibold">{text(item.title, isEnglish)}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{text(item.body, isEnglish)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">{isEnglish ? 'A practical path' : '務實導入路徑'}</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Start small. Prove value. Expand with confidence.' : '從小範圍開始，用成果決定擴大。'}</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {onboardingSteps.map((item) => (
                  <article key={text(item.title, isEnglish)} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                    <item.icon className="h-7 w-7 text-cyan-600 dark:text-cyan-300" />
                    <h3 className="mt-5 text-lg font-semibold">{text(item.title, isEnglish)}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text(item.body, isEnglish)}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">{isEnglish ? 'Choose the right scope' : '選擇適合的導入範圍'}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Four ways to work with EudTech.' : 'EudTech 提供四種合作方案。'}</h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {plans.map((item, index) => (
                <article key={text(item.title, isEnglish)} className={`rounded-xl border p-6 ${index === 1 ? 'border-cyan-400 bg-cyan-50 dark:border-cyan-500 dark:bg-cyan-950/30' : 'border-slate-200 dark:border-slate-800'}`}>
                  <item.icon className="h-7 w-7 text-cyan-600 dark:text-cyan-300" />
                  <h3 className="mt-6 text-lg font-semibold">{text(item.title, isEnglish)}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text(item.body, isEnglish)}</p>
                  <a href="mailto:info@eudaemonia.tech?subject=AI%20Agent%20%E5%B0%8E%E5%85%A5%E6%96%B9%E6%A1%88" className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-700 hover:text-cyan-600 dark:text-cyan-300">
                    {isEnglish ? 'Discuss scope' : '討論範圍'} <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">{isEnglish ? 'Built for real operations' : '適合實際營運團隊'}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'For teams where a missed next step has a cost.' : '適合每一個漏掉下一步就會產生成本的團隊。'}</h2>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map((item) => (
                <article key={text(item.title, isEnglish)} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <item.icon className="mt-1 h-6 w-6 shrink-0 text-emerald-600 dark:text-emerald-300" />
                  <div><h3 className="font-semibold">{text(item.title, isEnglish)}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text(item.body, isEnglish)}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">FAQ</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Questions teams ask before they start.' : '團隊導入前最常問的問題。'}</h2>
            </div>
            <div className="mt-12 divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {faqs.map((faq) => (
                <details key={text(faq.question, isEnglish)} className="group p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
                    {text(faq.question, isEnglish)}
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{text(faq.answer, isEnglish)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 lg:flex-row lg:items-center lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">{isEnglish ? 'Ready for the first workflow?' : '準備好選擇第一條流程了嗎？'}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Bring one process. We will map the next step.' : '帶著一條流程開始，EudTech 協助整理下一步。'}</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">{isEnglish ? 'Tell us where follow-up, reconciliation, or reminders consume the most time.' : '告訴 EudTech 哪一段追蹤、核對或催辦最消耗團隊時間。'}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"><CalendarDays className="mr-2 h-4 w-4" />{isEnglish ? 'Book a call' : '預約諮詢'}</a>
              <a href="mailto:info@eudaemonia.tech?subject=AI%20Agent%20%E5%B0%8E%E5%85%A5%E5%88%9D%E8%AB%87" className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"><Mail className="mr-2 h-4 w-4" />{isEnglish ? 'Send an email' : '寄送郵件'}</a>
            </div>
          </div>
        </section>

        <Footer isEnglish={isEnglish} />

        <div className="fixed inset-x-4 bottom-4 z-40 flex gap-2 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur md:hidden dark:border-slate-700 dark:bg-slate-900/95">
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center rounded-lg bg-cyan-400 px-3 py-3 text-xs font-semibold text-slate-950"><CalendarDays className="mr-1.5 h-4 w-4" />{isEnglish ? 'Book' : '預約'}</a>
          <a href="mailto:info@eudaemonia.tech?subject=AI%20Agent%20%E5%B0%8E%E5%85%A5%E8%AB%AE%E8%A9%A2" className="flex flex-1 items-center justify-center rounded-lg border border-slate-300 px-3 py-3 text-xs font-semibold text-slate-800 dark:border-slate-600 dark:text-slate-100"><Mail className="mr-1.5 h-4 w-4" />{isEnglish ? 'Email' : '寄信'}</a>
        </div>
      </div>
    </>
  );
};

export default AiAgentSolutionPage;
