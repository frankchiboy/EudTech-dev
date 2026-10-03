import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bell,
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
import { VENDOR_EVIDENCE } from '../../data/vendorEvidence';
import { canonicalPageUrl } from '../../utils/seo/canonicalUrl';
import { SourceLink, VendorMedia } from './SitePagePrimitives';
import { SITE_BOOKING } from '../../data/siteArchitecture';

type Bilingual = { zh: string; en: string };
const BOOKING_URL = SITE_BOOKING.href;

const text = (value: Bilingual, isEnglish: boolean) => (isEnglish ? value.en : value.zh);

interface IconItem {
  icon: LucideIcon;
  visual: string;
  title: Bilingual;
  body: Bilingual;
}

const MICRO_VISUALS = {
  intake: '/ai-agent/micro-illustrations/event-intake-v1.webp',
  reconcile: '/ai-agent/micro-illustrations/reconciliation-v1.webp',
  progress: '/ai-agent/micro-illustrations/task-progression-v1.webp',
  approval: '/ai-agent/micro-illustrations/human-approval-v1.webp',
  connect: '/ai-agent/micro-illustrations/connected-systems-v1.webp',
  govern: '/ai-agent/micro-illustrations/governance-audit-v1.webp'
} as const;

const NarrativeVisual: React.FC<{ src: string; dark?: boolean }> = ({ src, dark = false }) => (
  <div className={`flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border ${dark ? 'border-white/10 bg-white/[0.07]' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900'}`} aria-hidden="true">
    <img src={src} alt="" className="h-14 w-14 object-contain" loading="lazy" decoding="async" />
  </div>
);

interface SceneStep {
  stage: Bilingual;
  title: Bilingual;
  body: Bilingual;
  icon: LucideIcon;
}

const painPoints: IconItem[] = [
  {
    icon: Clock3,
    visual: MICRO_VISUALS.progress,
    title: { zh: '追蹤靠人記，工作容易斷線', en: 'Follow-up depends on memory' },
    body: { zh: '信件、表單、試算表與聊天紀錄各自分散。團隊不容易即時知道下一個負責人與期限。', en: 'Email, forms, spreadsheets, and chat logs sit apart. The team cannot quickly see the next owner or the deadline.' }
  },
  {
    icon: SearchCheck,
    visual: MICRO_VISUALS.reconcile,
    title: { zh: '核對耗時，錯誤發現得太晚', en: 'Manual checks are slow and hide errors' },
    body: { zh: '人員逐筆比對報價、訂單、合約與附件。重複工作佔用熟手時間，也放大遺漏風險。', en: 'Staff compare quotes, orders, contracts, and attachments by hand. Repetitive work uses up expert time and raises the risk of omissions.' }
  },
  {
    icon: Bell,
    visual: MICRO_VISUALS.progress,
    title: { zh: '催辦沒有節奏，服務品質不一致', en: 'Reminders have no steady rhythm' },
    body: { zh: '提醒依賴個人習慣，重要回覆可能延誤。客戶收到的服務品質也因人而異。', en: 'Reminders depend on personal habits, so important replies can slip. Customers receive uneven service as a result.' }
  },
  {
    icon: GitBranch,
    visual: MICRO_VISUALS.connect,
    title: { zh: '系統各自運作，管理者看不到全貌', en: 'Separate systems hide the full picture' },
    body: { zh: 'ERP、CRM、專案工具與郵件各自保存資料。管理者無法用同一條事件脈絡判斷進度。', en: 'ERP, CRM, project tools, and mail each keep their own records. Managers have no single event trail to judge progress.' }
  }
];

const agentRoles: IconItem[] = [
  { icon: SearchCheck, visual: MICRO_VISUALS.intake, title: { zh: '資料整理 Agent', en: 'Intake agent' }, body: { zh: '接收郵件、表單與檔案，擷取欄位，建立可追蹤的事件。', en: 'Receives email, forms, and files, extracts the fields, and creates traceable events.' } },
  { icon: ClipboardCheck, visual: MICRO_VISUALS.reconcile, title: { zh: '核對 Agent', en: 'Reconciliation agent' }, body: { zh: '依規則比對價格、數量、條款與附件，標出差異。', en: 'Compares prices, quantities, terms, and attachments against set rules, then flags the differences.' } },
  { icon: Bell, visual: MICRO_VISUALS.progress, title: { zh: '催辦 Agent', en: 'Follow-up agent' }, body: { zh: '依期限、優先順序與回覆狀態，提出下一步提醒。', en: 'Proposes the next reminder from due dates, priority, and reply status.' } },
  { icon: MessageSquare, visual: MICRO_VISUALS.approval, title: { zh: '回覆草稿 Agent', en: 'Drafting agent' }, body: { zh: '依既有脈絡產生草稿供人員審核，保留原始 thread 關聯。', en: 'Drafts replies for review and keeps the link to the original thread.' } },
  { icon: BarChart3, visual: MICRO_VISUALS.reconcile, title: { zh: '管理摘要 Agent', en: 'Briefing agent' }, body: { zh: '把事件整理成風險、進度與待決策摘要，供管理者判讀。', en: 'Turns events into a short brief on risk, progress, and open decisions.' } },
  { icon: ShieldCheck, visual: MICRO_VISUALS.govern, title: { zh: '治理稽核 Agent', en: 'Governance agent' }, body: { zh: '保留來源、版本、核准者與執行紀錄，供稽核與回顧。', en: 'Keeps source, version, approver, and execution records for the audit trail.' } }
];

const scenes: { label: Bilingual; intro: Bilingual; steps: SceneStep[] }[] = [
  {
    label: { zh: '業務與報價', en: 'Sales & quoting' },
    intro: { zh: '從詢價進件到報價追蹤，AI Agent 接手整理與提醒。業務把時間留給客戶與決策。', en: 'From inbound quote requests to follow-up, agents handle the paperwork. Sales keep their time for customers and decisions.' },
    steps: [
      { stage: { zh: '01／進件', en: '01 / Intake' }, title: { zh: '辨識詢價需求', en: 'Read the quote request' }, body: { zh: 'AI Agent 讀取郵件與附件，整理產品、數量、交期與聯絡人。', en: 'The agent reads the mail and attachments, then lists products, quantities, delivery dates, and contacts.' }, icon: Mail },
      { stage: { zh: '02／核對', en: '02 / Check' }, title: { zh: '比對報價條件', en: 'Check the quote terms' }, body: { zh: 'AI Agent 對照歷史報價、供應商條件與內部規則。需要人員確認的差異會被標出。', en: 'The agent compares past quotes, supplier terms, and internal rules. Differences that need a person are flagged.' }, icon: ClipboardCheck },
      { stage: { zh: '03／催辦', en: '03 / Follow-up' }, title: { zh: '準時提醒下一步', en: 'Keep the next step on time' }, body: { zh: '期限將近或資料缺漏時，AI Agent 提出提醒與回覆草稿。人員核准後才送出。', en: 'When a deadline nears or data is missing, the agent drafts the reminder and reply. A person approves before anything is sent.' }, icon: Bell }
    ]
  },
  {
    label: { zh: '財務與採購', en: 'Finance & procurement' },
    intro: { zh: '把發票、採購與付款前核對，串成可稽核的事件流程。', en: 'Link invoices, purchasing, and pre-payment checks into one event flow with an audit trail.' },
    steps: [
      { stage: { zh: '01／收件', en: '01 / Receive' }, title: { zh: '分類財務文件', en: 'Sort finance documents' }, body: { zh: 'AI Agent 讀取指定信箱與資料夾。發票、訂單、對帳單與付款通知會自動分類。', en: 'The agent reads the approved mailboxes and folders. Invoices, orders, statements, and payment notices are sorted automatically.' }, icon: Database },
      { stage: { zh: '02／三方核對', en: '02 / Three-way match' }, title: { zh: '核對採購單、收貨與發票', en: 'Match orders, receipts, and invoices' }, body: { zh: 'AI Agent 比對採購單、收貨紀錄與發票。缺件與異常會升級給指定人員。', en: 'The agent matches purchase orders, receiving records, and invoices. Missing items and exceptions go to a named person.' }, icon: Scale },
      { stage: { zh: '03／核准', en: '03 / Approve' }, title: { zh: '保留完整核准紀錄', en: 'Keep a complete approval record' }, body: { zh: '系統準備付款前摘要。重要付款仍由授權人員核准與執行。', en: 'The system prepares a pre-payment brief. Authorised staff still approve and execute the payment.' }, icon: CircleDollarSign }
    ]
  },
  {
    label: { zh: '專案與服務', en: 'Projects & service' },
    intro: { zh: '交付、客服與跨部門任務，由同一套事件狀態驅動。', en: 'Delivery, support, and cross-team tasks run on one shared event status.' },
    steps: [
      { stage: { zh: '01／建立', en: '01 / Create' }, title: { zh: '把需求變成任務', en: 'Turn requests into tasks' }, body: { zh: 'AI Agent 讀取客戶訊息與會議紀錄。任務、負責人、期限與驗收條件隨即建立。', en: 'The agent reads customer messages and meeting notes. Tasks, owners, due dates, and acceptance criteria are created from them.' }, icon: Workflow },
      { stage: { zh: '02／執行', en: '02 / Execute' }, title: { zh: '主動追蹤交付狀態', en: 'Track delivery status' }, body: { zh: 'AI Agent 監看事件變化。延誤風險與需跨部門協作的項目會被提出。', en: 'The agent watches event changes. Delay risks and cross-team dependencies are raised for the team.' }, icon: Route },
      { stage: { zh: '03／結案', en: '03 / Close' }, title: { zh: '結案並整理改善資料', en: 'Close and keep the learning' }, body: { zh: '完成後自動彙整證據、客戶回饋與改善項目。下一個週期可直接沿用。', en: 'On completion, evidence, customer feedback, and improvement items are compiled for the next cycle.' }, icon: FileCheck2 }
    ]
  }
];

const systems: IconItem[] = [
  { icon: Mail, visual: MICRO_VISUALS.intake, title: { zh: 'Email／Outlook', en: 'Email / Outlook' }, body: { zh: '保留 thread、寄件與回覆證據，並觸發事件與提醒。', en: 'Keep thread, sent, and reply evidence, and trigger events and reminders from it.' } },
  { icon: Database, visual: MICRO_VISUALS.reconcile, title: { zh: 'ERP／會計', en: 'ERP / accounting' }, body: { zh: '連接訂單、發票、付款與庫存等營運資料。', en: 'Connect orders, invoices, payments, and stock data.' } },
  { icon: Users, visual: MICRO_VISUALS.intake, title: { zh: 'CRM／客戶資料', en: 'CRM / customer data' }, body: { zh: '把客戶互動與商機狀態放進同一條追蹤脈絡。', en: 'Bring customer interactions and opportunity status into the same trail.' } },
  { icon: Workflow, visual: MICRO_VISUALS.progress, title: { zh: '專案／任務系統', en: 'Project / task systems' }, body: { zh: '同步負責人、期限、阻礙與交付證據。', en: 'Synchronise owners, deadlines, blockers, and delivery evidence.' } },
  { icon: MessageSquare, visual: MICRO_VISUALS.approval, title: { zh: 'Teams／協作工具', en: 'Teams / collaboration' }, body: { zh: '把核准後的通知與摘要送到對應的團隊頻道。', en: 'Deliver approved notifications and briefs to the right team channel.' } },
  { icon: Network, visual: MICRO_VISUALS.connect, title: { zh: 'API／資料庫', en: 'APIs / databases' }, body: { zh: '以事件與權限邊界連接既有系統，不必一次重建所有工具。', en: 'Connect existing systems through events and permission boundaries. Nothing has to be rebuilt at once.' } }
];

const governance: IconItem[] = [
  { icon: LockKeyhole, visual: MICRO_VISUALS.govern, title: { zh: '權限最小化', en: 'Least privilege' }, body: { zh: '依角色、資料來源與動作授予最小必要權限。', en: 'Grant only the permissions each role, source, and action needs.' } },
  { icon: ShieldCheck, visual: MICRO_VISUALS.approval, title: { zh: '敏感動作人員核准', en: 'Human approval for sensitive actions' }, body: { zh: '付款、正式寄信、刪除與重大狀態變更，由人員核准。', en: 'A person approves payments, formal sends, deletions, and major status changes.' } },
  { icon: FileCheck2, visual: MICRO_VISUALS.govern, title: { zh: '來源與版本可追溯', en: 'Traceable sources and versions' }, body: { zh: '保存輸入、規則、輸出、核准者與時間，供事後回溯。', en: 'Keep inputs, rules, outputs, approvers, and timestamps so every result can be traced.' } },
  { icon: Settings, visual: MICRO_VISUALS.connect, title: { zh: '規則可調整', en: 'Adjustable rules' }, body: { zh: '用可讀的規則設定升級門檻、提醒節奏與例外處理。', en: 'Set escalation thresholds, reminder cadence, and exceptions in readable rules.' } },
  { icon: BarChart3, visual: MICRO_VISUALS.reconcile, title: { zh: '持續衡量', en: 'Continuous measurement' }, body: { zh: '追蹤準時率、回覆時間、人員介入與錯誤率，據此調整。', en: 'Track on-time rate, response time, human intervention, and error rate, then adjust.' } }
];

const onboardingSteps: IconItem[] = [
  { icon: SearchCheck, visual: MICRO_VISUALS.intake, title: { zh: '1. 找出高價值流程', en: '1. Pick the highest-value flow' }, body: { zh: '盤點追蹤、核對與催辦工作。先選一條輸入與結果都明確的流程。', en: 'Map follow-up, reconciliation, and reminder work. Choose one flow with clear inputs and outputs.' } },
  { icon: GitBranch, visual: MICRO_VISUALS.approval, title: { zh: '2. 設計事件與核准點', en: '2. Design events and approval points' }, body: { zh: '定義來源、狀態、負責人、期限與例外。標出必須由人員核准的動作。', en: 'Define sources, status, owners, deadlines, and exceptions. Mark the actions that need human approval.' } },
  { icon: Cpu, visual: MICRO_VISUALS.connect, title: { zh: '3. 小範圍試點', en: '3. Run a focused pilot' }, body: { zh: '接上既有系統，用真實資料驗證事件、提醒與稽核紀錄。', en: 'Connect existing systems. Verify events, reminders, and the audit trail with real data.' } },
  { icon: BarChart3, visual: MICRO_VISUALS.progress, title: { zh: '4. 量化後擴大', en: '4. Expand after measuring' }, body: { zh: '用量化成果決定是否擴充角色、流程、部門與自動化範圍。', en: 'Let measured results decide whether to add agents, flows, teams, or automation.' } }
];

const plans: IconItem[] = [
  { icon: SearchCheck, visual: MICRO_VISUALS.intake, title: { zh: '流程診斷', en: 'Process diagnostic' }, body: { zh: '釐清流程、資料來源與風險，並選出第一個導入場景。', en: 'Clarify the process, data sources, and risks, then pick the first scene to implement.' } },
  { icon: Zap, visual: MICRO_VISUALS.progress, title: { zh: '單流程試點', en: 'Single-flow pilot' }, body: { zh: '交付一條可操作、可觀察、可重複驗證的 AI Agent 流程。', en: 'Deliver one agent workflow that can be operated, observed, and verified repeatedly.' } },
  { icon: Layers, visual: MICRO_VISUALS.connect, title: { zh: '部門方案', en: 'Department solution' }, body: { zh: '整合多個 Agent 角色與系統，建立部門層級的追蹤與治理。', en: 'Combine several agents and systems into department-level tracking and governance.' } },
  { icon: Network, visual: MICRO_VISUALS.govern, title: { zh: '企業營運方案', en: 'Enterprise operations' }, body: { zh: '以事件架構連接跨部門流程，建立可持續調整的營運系統。', en: 'Connect cross-department flows on one event architecture that can keep evolving.' } }
];

const audiences: IconItem[] = [
  { icon: Building2, visual: MICRO_VISUALS.progress, title: { zh: '成長中的企業', en: 'Growing companies' }, body: { zh: '流程已經變複雜，但還沒有足夠人力支撐追蹤。', en: 'Processes are complex, but the team cannot keep up the follow-up by hand.' } },
  { icon: Briefcase, visual: MICRO_VISUALS.govern, title: { zh: '專業服務團隊', en: 'Professional services' }, body: { zh: '需要保存客戶承諾、交付證據與專案節點。', en: 'Need a clear record of client commitments, delivery evidence, and milestones.' } },
  { icon: ShoppingCart, visual: MICRO_VISUALS.reconcile, title: { zh: '採購與供應鏈團隊', en: 'Procurement & supply chain' }, body: { zh: '每天處理大量詢價、核對、交期與供應商回覆。', en: 'Handle large volumes of quote requests, checks, lead times, and supplier replies.' } },
  { icon: Landmark, visual: MICRO_VISUALS.approval, title: { zh: '重視合規的組織', en: 'Compliance-minded organisations' }, body: { zh: '要求重要決策有核准、有證據、可回溯。', en: 'Need every important decision approved, evidenced, and traceable.' } },
  { icon: Stethoscope, visual: MICRO_VISUALS.govern, title: { zh: '高敏感資料團隊', en: 'Sensitive-data teams' }, body: { zh: '需要嚴格的權限、資料邊界與人員介入。', en: 'Need strict access control, data boundaries, and human intervention.' } },
  { icon: Headphones, visual: MICRO_VISUALS.intake, title: { zh: '客服與營運中心', en: 'Support & operations centres' }, body: { zh: '要減少漏接、延誤與重複回覆。', en: 'Want fewer missed requests, delays, and duplicate replies.' } }
];

const faqs: { question: Bilingual; answer: Bilingual }[] = [
  { question: { zh: 'AI Agent 與 Headless SaaS 是兩項不同服務嗎？', en: 'Are AI agents and headless SaaS separate services?' }, answer: { zh: '不是，兩者是同一項導入服務。Headless SaaS 連接既有系統，建立品牌入口與事件層。AI Agent 在相同的權限、核准與稽核架構內處理追蹤、核對與催辦。', en: 'No, they are one service. Headless SaaS connects existing systems and provides the branded entry point and event layer. AI agents handle follow-up, checks, and reminders inside the same permission, approval, and audit model.' } },
  { question: { zh: 'AI Agent 導入會直接取代人員嗎？', en: 'Will AI agents replace our staff?' }, answer: { zh: '不會。AI Agent 接手追蹤、核對與催辦，重要決策仍由人員核准。目標是提高團隊處理量與可見度，不是取消責任歸屬。', en: 'No. Agents take over follow-up, checks, and reminders, while people still approve important decisions. The aim is more capacity and visibility, not less accountability.' } },
  { question: { zh: '需要更換目前使用的 ERP 或 CRM 嗎？', en: 'Do we need to replace our ERP or CRM?' }, answer: { zh: '不需要。導入前先確認既有系統的 API、匯出或事件能力。再以最小範圍連接高價值流程。', en: 'No. EudTech first checks the APIs, exports, or events your systems already offer, then connects the highest-value flow with minimal change.' } },
  { question: { zh: '第一個導入流程應該選什麼？', en: 'Which process should we start with?' }, answer: { zh: '選輸入明確、重複頻率高、延誤成本可量化的流程。例如詢價追蹤、發票核對或專案催辦。', en: 'Pick a flow with clear inputs, high repetition, and a measurable cost of delay. Quote-request follow-up, invoice checks, and project reminders are typical.' } },
  { question: { zh: 'AI Agent 會自行寄出正式郵件嗎？', en: 'Will agents send formal email on their own?' }, answer: { zh: '預設不會。AI Agent 先產生草稿與建議，正式寄出由授權人員核准。例外流程依組織規則與風險分級設定。', en: 'Not by default. Agents prepare drafts and suggestions, and an authorised person approves the send. Exceptions follow the rules and risk levels your organisation sets.' } },
  { question: { zh: '如何避免 AI 讀到不該讀的資料？', en: 'How do we stop agents reading data they should not see?' }, answer: { zh: '導入前先完成資料分類。再依資料來源、角色、欄位與動作設定權限邊界，並保留存取與輸出紀錄。', en: 'Data is classified before go-live. Permission boundaries are then set by source, role, field, and action, and access and output records are kept.' } },
  { question: { zh: '導入成果如何衡量？', en: 'How do we measure the outcome?' }, answer: { zh: '指標包括準時率、平均回覆時間、漏件率、人員介入比例與結案時間。導入前後都建立基準。', en: 'Baselines are set before and after go-live for on-time rate, response time, missed items, human intervention, and closure time.' } },
  { question: { zh: '小型企業也適合導入嗎？', en: 'Is this suitable for a small business?' }, answer: { zh: '適合。從單一流程試點開始，先解決最常發生的追蹤與核對問題，再依成果擴充。', en: 'Yes. Start with a single-flow pilot, fix the most frequent follow-up or check, and expand as the results come in.' } },
  { question: { zh: '如何開始與 EudTech 合作？', en: 'How do we get started with EudTech?' }, answer: { zh: '先安排流程診斷。確認目標、資料來源、核准點與成功指標後，EudTech 提出導入方案與範圍。', en: 'Book a process diagnostic. EudTech confirms goals, data sources, approval points, and success metrics, then proposes a scope.' } }
];

const buildStructuredData = (isEnglish: boolean) => {
  const pageUrl = canonicalPageUrl('https://eudaemonia.tech/solutions/ai-agent');
  const pageName = isEnglish ? 'AI Agent and Headless SaaS Implementation' : 'AI Agent 與 Headless SaaS 導入';
  const pageDescription = isEnglish
    ? 'EudTech connects existing systems to branded portals, event workflows, and controlled AI agents while people approve important decisions.'
    : 'EudTech 串接企業既有系統，建立品牌入口、事件流程與受控 AI Agent，重要決策仍由人員核准。';

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: pageName,
      description: pageDescription,
      serviceType: 'AI agent and headless SaaS implementation',
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
  const [showMobileActions, setShowMobileActions] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const selectedScene = scenes[activeScene];
  const pageUrl = canonicalPageUrl('https://eudaemonia.tech/solutions/ai-agent');

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setShowMobileActions(!entry.isIntersecting);
    }, { threshold: 0.01 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEOHead
        title={isEnglish ? 'Enterprise AI Agent and Headless SaaS Implementation' : '企業 AI Agent 與 Headless SaaS 導入'}
        description={isEnglish ? 'Connect ERP, CRM, Microsoft 365, databases, and APIs to branded portals, event workflows, and controlled AI agents with human approval.' : '串接 ERP、CRM、Microsoft 365、資料庫與 API，建立品牌入口、事件流程與受控 AI Agent，重要動作保留人員核准。'}
        keywords={isEnglish ? 'AI agent implementation, headless SaaS, workflow automation, customer portal, business process automation, Taiwan' : 'AI Agent 導入, Headless SaaS, 工作流程自動化, 客戶 Portal, 企業 AI 導入, 台灣 AI 顧問'}
        url={pageUrl}
        type="website"
        isEnglish={isEnglish}
        structuredData={buildStructuredData(isEnglish)}
      />

      <div className="min-h-screen bg-white pb-[calc(6rem+env(safe-area-inset-bottom))] text-slate-950 dark:bg-slate-950 dark:text-white md:pb-0">
        <section ref={heroRef} data-ai-agent-hero className="relative isolate overflow-hidden bg-slate-950 pt-24 text-white">
          <img
            src="/ai-agent-evidence-chain-v1.webp"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_center]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/35" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/25" />
          <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-20 lg:min-h-[720px] lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                <Sparkles className="h-4 w-4" />
                {isEnglish ? 'AI agents × headless SaaS' : 'AI Agent × Headless SaaS'}
              </div>
              <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                {isEnglish ? 'Connect existing systems' : '串接既有系統'}
                <span className="block text-cyan-300">{isEnglish ? 'Let agents move the work forward' : '讓 AI Agent 推動工作'}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {isEnglish ? 'EudTech connects ERP, CRM, Microsoft 365, databases, and APIs to branded portals, event workflows, and controlled AI agents. Sensitive actions still need human approval.' : 'EudTech 串接 ERP、CRM、Microsoft 365、資料庫與 API。建立品牌入口、事件流程與受控 AI Agent，敏感動作仍由人員核准。'}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {isEnglish ? SITE_BOOKING.label.en : SITE_BOOKING.label.zh}
                </a>
                <a href="mailto:info@eudaemonia.tech?subject=AI%20Agent%20%E5%B0%8E%E5%85%A5%E8%AB%AE%E8%A9%A2" className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70">
                  <Mail className="mr-2 h-4 w-4" />
                  {isEnglish ? 'Email EudTech' : '寄信給 EudTech'}
                </a>
              </div>
              <p className="mt-6 text-sm text-slate-400">{isEnglish ? 'Payments, formal sends, and major status changes stay behind human approval.' : '付款、正式寄信與重大狀態變更，都保留人員核准控制點。'}</p>
              <div className="mt-9 grid max-w-2xl gap-3 text-sm text-slate-200 sm:grid-cols-3">
                {[
                  isEnglish ? 'Source evidence kept' : '保留來源證據',
                  isEnglish ? 'Differences checked' : '完成差異核對',
                  isEnglish ? 'A person approves the action' : '人員核准執行'
                ].map((label, index) => (
                  <div key={label} className="flex items-center gap-2 rounded-lg border border-white/15 bg-slate-950/55 px-3 py-3 backdrop-blur-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-bold text-cyan-200">{index + 1}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section data-ai-agent-example="official-document" className="border-b border-slate-200 bg-white py-14 sm:py-20 dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                {isEnglish ? 'Real use case 01 | AI official-document system' : '實際應用 01｜AI 公文系統'}
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {isEnglish ? 'When a new official document arrives, see it and open it at once' : '新公文到了，立即通知、直接開啟'}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                {isEnglish
                  ? 'The notification shows what needs attention. From the same view, open the document or recent files and carry on with the next step.'
                  : '使用者收到通知後，在同一個畫面看到待處理事項。直接開啟公文或最近文件，從通知到閱讀一路完成。'}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { zh: '收到通知', en: 'Receive a notification' },
                  { zh: '辨識待辦', en: 'See what needs attention' },
                  { zh: '直接閱讀', en: 'Open and read directly' }
                ].map((outcome, index) => (
                  <div key={outcome.en} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">{index + 1}</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{isEnglish ? outcome.en : outcome.zh}</span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:info@eudaemonia.tech?subject=AI%20%E5%85%AC%E6%96%87%E7%B3%BB%E7%B5%B1%E5%B0%8E%E5%85%A5%E8%AB%AE%E8%A9%A2"
                className="mt-8 inline-flex items-center rounded-md bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                {isEnglish ? 'Discuss an AI official-document system' : 'AI 公文系統導入諮詢'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-3 shadow-sm dark:border-slate-700 sm:p-5">
              <img
                src="/ai-agent/official-document-menu.png"
                alt={isEnglish ? 'AI official-document system menu showing notifications, unread count, recent documents, PDF opening, and saved files' : 'AI 公文系統選單，顯示通知、未讀數量、最近文件、開啟 PDF 與已儲存檔案'}
                className="mx-auto h-auto max-h-[520px] w-full object-contain"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="mt-3 text-center text-xs leading-5 text-slate-400">
                {isEnglish ? 'Actual screen. Notifications, pending items, and document access sit in one place.' : '實際操作畫面。通知、待辦與文件入口集中在同一個畫面。'}
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-slate-50 py-14 sm:py-20 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">{isEnglish ? 'The operational gap' : '營運缺口'}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Your team should not be the integration layer' : '團隊不該成為系統之間的整合層'}</h2>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'AI agents set a shared working rhythm across the systems you already use. Work no longer depends on someone remembering.' : 'AI Agent 在既有系統之間建立共同的營運節奏。工作不再只靠個人記憶。'}</p>
            </div>
            <div className="mt-8 grid gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-4">
              {painPoints.map((item) => (
                <article key={text(item.title, isEnglish)} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                  <NarrativeVisual src={item.visual} />
                  <h3 className="mt-6 text-lg font-semibold">{text(item.title, isEnglish)}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text(item.body, isEnglish)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">{isEnglish ? 'The agent team' : 'AI Agent 角色'}</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Six focused roles, one accountable workflow' : '六個角色，一條責任清楚的流程'}</h2>
              </div>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'Each role has a defined purpose, data source, and hand-off. Preparation can be automated, and who approves the result stays visible.' : '每個角色都有明確目的、資料來源與交接點。準備工作可以自動化，誰核准結果始終清楚。'}</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-3">
              {agentRoles.map((item, index) => (
                <article key={text(item.title, isEnglish)} className="group rounded-xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg dark:border-slate-800 dark:hover:border-emerald-500">
                  <div className="flex items-center justify-between">
                    <NarrativeVisual src={item.visual} />
                    <span className="text-xs font-semibold text-slate-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{text(item.title, isEnglish)}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text(item.body, isEnglish)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow-demo" className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-14 sm:py-20 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">{isEnglish ? 'See it in context' : '看見實際流程'}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Three scenes, one event-driven rhythm' : '三個場景，同一套事件驅動節奏'}</h2>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'Switch scenes to see how the same principles fit different teams.' : '切換場景，看同一套原則如何用在不同團隊。'}</p>
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

        <section className="bg-white py-14 sm:py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">{isEnglish ? 'Works with your stack' : '連接既有系統'}</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Connect the work, not just the tools' : '連接工作脈絡，不只連接工具'}</h2>
                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'EudTech maps events and permissions across the systems your operation already runs on.' : 'EudTech 以事件與權限為核心，連接營運中已在使用的系統。'}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {systems.map((item) => (
                  <article key={text(item.title, isEnglish)} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
                    <NarrativeVisual src={item.visual} />
                    <h3 className="mt-4 font-semibold">{text(item.title, isEnglish)}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text(item.body, isEnglish)}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-20 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <VendorMedia
              src={VENDOR_EVIDENCE.microsoft.image}
              alt={VENDOR_EVIDENCE.microsoft.imageAlt}
              caption={{ zh: 'Microsoft Copilot Studio 原廠產品導覽畫面。實際介面與功能依授權與版本而異。', en: 'Official Microsoft Copilot Studio product-tour screen. The actual interface and features depend on licensing and version.' }}
              sourceHref={VENDOR_EVIDENCE.microsoft.sources.product.href}
              sourceLabel={VENDOR_EVIDENCE.microsoft.sources.product.label}
              isEnglish={isEnglish}
              contain
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">Microsoft Copilot Studio</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Use official controls for connections, flows, and governance' : '使用原廠連線、流程與治理控制'}</h2>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'Where Microsoft technology fits the customer environment, EudTech can build governed agents with Copilot Studio, Dataverse, SharePoint, Microsoft 365, connectors, and APIs. The final architecture depends on licences, permissions, data boundaries, and acceptance requirements.' : '當客戶環境適合 Microsoft 技術時，EudTech 可用 Copilot Studio、Dataverse、SharePoint、Microsoft 365、連接器與 API 建立受治理的 AI Agent。最終架構依授權、權限、資料邊界與驗收需求確認。'}</p>
              <ul className="mt-7 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                <li className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" />{isEnglish ? 'Connect tools and knowledge sources through authenticated connections.' : '透過已驗證的連線存取工具與知識來源。'}</li>
                <li className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" />{isEnglish ? 'Run event-driven tasks with agent flows and keep a point for human intervention.' : '用 Agent flows 執行事件驅動任務，並保留人員介入。'}</li>
                <li className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" />{isEnglish ? 'Apply security, data-loss prevention, access, and environment governance.' : '套用安全性、資料外洩防護、存取與環境治理。'}</li>
              </ul>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                <SourceLink href={VENDOR_EVIDENCE.microsoft.sources.connections.href} label={VENDOR_EVIDENCE.microsoft.sources.connections.label} isEnglish={isEnglish} />
                <SourceLink href={VENDOR_EVIDENCE.microsoft.sources.flows.href} label={VENDOR_EVIDENCE.microsoft.sources.flows.label} isEnglish={isEnglish} />
                <SourceLink href={VENDOR_EVIDENCE.microsoft.sources.governance.href} label={VENDOR_EVIDENCE.microsoft.sources.governance.label} isEnglish={isEnglish} />
              </div>
            </div>
          </div>
        </section>

        <section id="consultation" className="scroll-mt-20 bg-slate-950 py-14 sm:py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">{isEnglish ? 'Governance by design' : '內建治理'}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Automation should make responsibility clearer' : '自動化應該讓責任更清楚'}</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">{isEnglish ? 'Every implementation includes control points, so the team can understand, approve, and audit what the agents do.' : '每次導入都內建控制點。團隊可以理解、核准並稽核 AI Agent 的工作。'}</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-5">
              {governance.map((item) => (
                <article key={text(item.title, isEnglish)} className="rounded-xl border border-white/10 bg-white/[0.06] p-5">
                  <NarrativeVisual src={item.visual} dark />
                  <h3 className="mt-5 text-base font-semibold">{text(item.title, isEnglish)}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{text(item.body, isEnglish)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-14 sm:py-20 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">{isEnglish ? 'A practical path' : '務實導入路徑'}</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Start small, prove the value, then expand' : '從小範圍開始，用成果決定擴大'}</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {onboardingSteps.map((item) => (
                  <article key={text(item.title, isEnglish)} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                    <NarrativeVisual src={item.visual} />
                    <h3 className="mt-5 text-lg font-semibold">{text(item.title, isEnglish)}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text(item.body, isEnglish)}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">{isEnglish ? 'Choose the right scope' : '選擇適合的導入範圍'}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Four ways to work with EudTech' : 'EudTech 提供四種合作方案'}</h2>
            </div>
            <div className="mt-8 grid gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-4">
              {plans.map((item, index) => (
                <article key={text(item.title, isEnglish)} className={`rounded-xl border p-6 ${index === 1 ? 'border-cyan-400 bg-cyan-50 dark:border-cyan-500 dark:bg-cyan-950/30' : 'border-slate-200 dark:border-slate-800'}`}>
                  <NarrativeVisual src={item.visual} />
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

        <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-20 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">{isEnglish ? 'Built for real operations' : '適合實際營運團隊'}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'For teams where a missed next step has a cost' : '適合漏掉下一步就有成本的團隊'}</h2>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-3">
              {audiences.map((item) => (
                <article key={text(item.title, isEnglish)} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <NarrativeVisual src={item.visual} />
                  <div><h3 className="font-semibold">{text(item.title, isEnglish)}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text(item.body, isEnglish)}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">FAQ</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Questions teams ask before they start' : '導入前最常問的問題'}</h2>
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

        <section className="bg-slate-950 py-14 sm:py-20 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 lg:flex-row lg:items-center lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">{isEnglish ? 'Ready for the first workflow?' : '準備好第一條流程了嗎？'}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Bring one process and EudTech maps the next step' : '帶一條流程來，EudTech 整理下一步'}</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">{isEnglish ? 'Tell EudTech where follow-up, checks, or reminders take the most time.' : '告訴 EudTech 哪一段追蹤、核對或催辦最耗時。'}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"><CalendarDays className="mr-2 h-4 w-4" />{isEnglish ? SITE_BOOKING.label.en : SITE_BOOKING.label.zh}</a>
              <a href="mailto:info@eudaemonia.tech?subject=AI%20Agent%20%E5%B0%8E%E5%85%A5%E5%88%9D%E8%AB%87" className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"><Mail className="mr-2 h-4 w-4" />{isEnglish ? 'Send an email' : '寄送郵件'}</a>
            </div>
          </div>
        </section>

        <Footer isEnglish={isEnglish} />

        {showMobileActions && <nav aria-label={isEnglish ? 'AI Agent quick actions' : 'AI Agent 快速操作'} data-ai-agent-mobile-actions className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex gap-2 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur md:hidden dark:border-slate-700 dark:bg-slate-900/95">
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center rounded-lg bg-cyan-400 px-3 py-3 text-xs font-semibold text-slate-950"><CalendarDays className="mr-1.5 h-4 w-4" />{isEnglish ? SITE_BOOKING.label.en : SITE_BOOKING.label.zh}</a>
          <a href="mailto:info@eudaemonia.tech?subject=AI%20Agent%20%E5%B0%8E%E5%85%A5%E8%AB%AE%E8%A9%A2" className="flex flex-1 items-center justify-center rounded-lg border border-slate-300 px-3 py-3 text-xs font-semibold text-slate-800 dark:border-slate-600 dark:text-slate-100"><Mail className="mr-1.5 h-4 w-4" />{isEnglish ? 'Email' : '寄信'}</a>
        </nav>}
      </div>
    </>
  );
};

export default AiAgentSolutionPage;
