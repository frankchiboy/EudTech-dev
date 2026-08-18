import React, { useEffect, useRef, useState } from "react";
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
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguageContext } from "../../contexts/LanguageContext";
import SEOHead from "../common/SEOHead";
import Footer from "../Footer";
import { VENDOR_EVIDENCE } from "../../data/vendorEvidence";
import { canonicalPageUrl } from "../../utils/seo/canonicalUrl";
import { SourceLink, VendorMedia } from "./SitePagePrimitives";
import { SITE_BOOKING } from "../../data/siteArchitecture";
import { EDITORIAL_PHOTOGRAPHY } from "../../data/editorialPhotography";

type Bilingual = { zh: string; en: string };
const BOOKING_URL = SITE_BOOKING.href;

const text = (value: Bilingual, isEnglish: boolean) =>
  isEnglish ? value.en : value.zh;

interface IconItem {
  icon: LucideIcon;
  visual: string;
  title: Bilingual;
  body: Bilingual;
}

const MICRO_VISUALS = {
  intake: EDITORIAL_PHOTOGRAPHY.workflowDesign.src,
  reconcile: EDITORIAL_PHOTOGRAPHY.governanceReview.src,
  progress: EDITORIAL_PHOTOGRAPHY.workflowDesign.src,
  approval: EDITORIAL_PHOTOGRAPHY.solutionDiscovery.src,
  connect: EDITORIAL_PHOTOGRAPHY.privateInfrastructure.src,
  govern: EDITORIAL_PHOTOGRAPHY.operationsMonitoring.src,
} as const;

const NarrativeVisual: React.FC<{ src: string; dark?: boolean }> = ({
  src,
  dark = false,
}) => (
  <div
    className={`h-16 w-20 shrink-0 overflow-hidden rounded-xl border ${dark ? "border-white/10 bg-white/[0.07]" : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"}`}
    aria-hidden="true"
  >
    <img
      src={src}
      alt=""
      className="h-full w-full object-cover"
      loading="lazy"
      decoding="async"
    />
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
    title: {
      zh: "追蹤靠人記，事情容易斷線",
      en: "Human memory carries the follow-up load",
    },
    body: {
      zh: "信件、表單、試算表與聊天紀錄分散，團隊難以即時知道下一個責任人與期限。",
      en: "Email, forms, spreadsheets, and chat records fragment ownership and deadlines.",
    },
  },
  {
    icon: SearchCheck,
    visual: MICRO_VISUALS.reconcile,
    title: {
      zh: "核對資料耗時，錯誤難以提早發現",
      en: "Manual reconciliation hides errors",
    },
    body: {
      zh: "人工比對報價、訂單、合約與附件，重複工作佔用熟手時間，也放大遺漏風險。",
      en: "Manual comparison of quotes, orders, contracts, and attachments consumes expert time.",
    },
  },
  {
    icon: Bell,
    visual: MICRO_VISUALS.progress,
    title: {
      zh: "催辦沒有節奏，客戶體驗不一致",
      en: "Follow-ups lack a consistent rhythm",
    },
    body: {
      zh: "提醒常常依賴個人習慣，重要回覆可能延誤，客戶收到的服務品質也不一致。",
      en: "Reminders depend on personal habits, so important replies can arrive late.",
    },
  },
  {
    icon: GitBranch,
    visual: MICRO_VISUALS.connect,
    title: {
      zh: "系統各自運作，管理者看不到全貌",
      en: "Disconnected systems obscure the full picture",
    },
    body: {
      zh: "ERP、CRM、專案工具與郵件各自保存資料，管理者無法用同一套事件脈絡判斷進度。",
      en: "ERP, CRM, project tools, and mail keep separate records without one shared event context.",
    },
  },
];

const agentRoles: IconItem[] = [
  {
    icon: SearchCheck,
    visual: MICRO_VISUALS.intake,
    title: { zh: "資料整理 Agent", en: "Intake Agent" },
    body: {
      zh: "接收郵件、表單與檔案，擷取欄位並建立可追蹤事件。",
      en: "Collects email, forms, and files, then turns them into traceable events.",
    },
  },
  {
    icon: ClipboardCheck,
    visual: MICRO_VISUALS.reconcile,
    title: { zh: "核對 Agent", en: "Reconciliation Agent" },
    body: {
      zh: "按照規則比對價格、數量、條款與附件，標示差異。",
      en: "Compares prices, quantities, terms, and attachments against defined rules.",
    },
  },
  {
    icon: Bell,
    visual: MICRO_VISUALS.progress,
    title: { zh: "催辦 Agent", en: "Follow-up Agent" },
    body: {
      zh: "依期限、優先級與回覆狀態提出下一步提醒。",
      en: "Suggests the next reminder from due dates, priority, and reply status.",
    },
  },
  {
    icon: MessageSquare,
    visual: MICRO_VISUALS.approval,
    title: { zh: "回覆草稿 Agent", en: "Drafting Agent" },
    body: {
      zh: "依既有脈絡產生可審核草稿，保留原始 thread 關聯。",
      en: "Creates reviewable drafts while preserving the original thread context.",
    },
  },
  {
    icon: BarChart3,
    visual: MICRO_VISUALS.reconcile,
    title: { zh: "管理摘要 Agent", en: "Briefing Agent" },
    body: {
      zh: "把事件轉成管理者可讀的風險、進度與待決策摘要。",
      en: "Turns events into decision-ready summaries of risk, progress, and open choices.",
    },
  },
  {
    icon: ShieldCheck,
    visual: MICRO_VISUALS.govern,
    title: { zh: "治理稽核 Agent", en: "Governance Agent" },
    body: {
      zh: "保留來源、版本、核准者與執行紀錄，支援稽核與復盤。",
      en: "Preserves source, version, approver, and execution evidence for audit.",
    },
  },
];

const scenes: { label: Bilingual; intro: Bilingual; steps: SceneStep[] }[] = [
  {
    label: { zh: "業務與報價", en: "Sales & quoting" },
    intro: {
      zh: "從詢價進件到報價追蹤，讓業務把時間留給客戶與決策。",
      en: "From inbound RFQs to quote follow-up, agents give sales more time for customers and decisions.",
    },
    steps: [
      {
        stage: { zh: "01／進件", en: "01 / Intake" },
        title: { zh: "辨識詢價與需求", en: "Recognise the request" },
        body: {
          zh: "Agent 讀取郵件與附件，整理產品、數量、交期與聯絡資訊。",
          en: "The agent reads mail and attachments, extracting products, quantities, timing, and contacts.",
        },
        icon: Mail,
      },
      {
        stage: { zh: "02／核對", en: "02 / Check" },
        title: { zh: "比對報價條件", en: "Check quote conditions" },
        body: {
          zh: "Agent 對照歷史報價、供應商條件與內部規則，標出需要人員確認的差異。",
          en: "The agent compares history, supplier terms, and rules, highlighting differences for review.",
        },
        icon: ClipboardCheck,
      },
      {
        stage: { zh: "03／催辦", en: "03 / Follow-up" },
        title: { zh: "準時提醒下一步", en: "Keep the next step on time" },
        body: {
          zh: "期限將近或資料缺漏時，Agent 提出提醒與回覆草稿，由人員核准後送出。",
          en: "When a deadline nears or data is missing, the agent suggests a reminder and draft for approval.",
        },
        icon: Bell,
      },
    ],
  },
  {
    label: { zh: "財務與採購", en: "Finance & procurement" },
    intro: {
      zh: "把發票、採購與付款前核對串成可稽核的事件流程。",
      en: "Connect invoices, procurement, and pre-payment checks into an auditable event flow.",
    },
    steps: [
      {
        stage: { zh: "01／收件", en: "01 / Receive" },
        title: { zh: "分類財務文件", en: "Classify finance documents" },
        body: {
          zh: "Agent 從指定信箱與資料夾識別發票、訂單、對帳單與付款通知。",
          en: "The agent identifies invoices, orders, statements, and payment notices from approved sources.",
        },
        icon: Database,
      },
      {
        stage: { zh: "02／三方核對", en: "02 / Three-way match" },
        title: { zh: "核對採購與憑證", en: "Match purchasing evidence" },
        body: {
          zh: "Agent 比對採購單、收貨紀錄與發票，將缺件與異常升級給指定人員。",
          en: "The agent matches purchase orders, receiving records, and invoices, escalating exceptions.",
        },
        icon: Scale,
      },
      {
        stage: { zh: "03／核准", en: "03 / Approve" },
        title: {
          zh: "留下完整核准軌跡",
          en: "Keep the approval trail complete",
        },
        body: {
          zh: "系統準備付款前摘要，重要付款仍由授權人員核准與執行。",
          en: "The system prepares a pre-payment brief; authorised staff still approve and execute payment.",
        },
        icon: CircleDollarSign,
      },
    ],
  },
  {
    label: { zh: "專案與服務", en: "Projects & service" },
    intro: {
      zh: "讓交付、客服與跨部門任務由同一套事件狀態驅動。",
      en: "Drive delivery, support, and cross-team work from one event-based status model.",
    },
    steps: [
      {
        stage: { zh: "01／建立", en: "01 / Create" },
        title: { zh: "把需求變成任務", en: "Turn requests into work" },
        body: {
          zh: "Agent 由客戶訊息與會議紀錄建立任務、負責人、期限與驗收條件。",
          en: "The agent turns customer messages and meeting notes into tasks, owners, due dates, and acceptance criteria.",
        },
        icon: Workflow,
      },
      {
        stage: { zh: "02／執行", en: "02 / Execute" },
        title: { zh: "主動追蹤交付狀態", en: "Track delivery actively" },
        body: {
          zh: "Agent 監看事件變化，提供延誤風險與需要跨部門協作的項目。",
          en: "The agent monitors event changes and surfaces delay risks and cross-team dependencies.",
        },
        icon: Route,
      },
      {
        stage: { zh: "03／結案", en: "03 / Close" },
        title: { zh: "整理服務與改善資料", en: "Close with learning" },
        body: {
          zh: "完成後自動彙整證據、客戶回饋與改善項目，供下一個週期使用。",
          en: "After completion, evidence, feedback, and improvements are organised for the next cycle.",
        },
        icon: FileCheck2,
      },
    ],
  },
];

const systems: IconItem[] = [
  {
    icon: Mail,
    visual: MICRO_VISUALS.intake,
    title: { zh: "Email／Outlook", en: "Email / Outlook" },
    body: {
      zh: "保留 thread、寄件與回覆證據，觸發事件與提醒。",
      en: "Preserve thread, sent, and reply evidence to trigger events and reminders.",
    },
  },
  {
    icon: Database,
    visual: MICRO_VISUALS.reconcile,
    title: { zh: "ERP／會計", en: "ERP / accounting" },
    body: {
      zh: "對接訂單、發票、付款與庫存等營運資料。",
      en: "Connect orders, invoices, payments, and operational inventory data.",
    },
  },
  {
    icon: Users,
    visual: MICRO_VISUALS.intake,
    title: { zh: "CRM／客戶資料", en: "CRM / customer data" },
    body: {
      zh: "把客戶互動與商機狀態放進同一條追蹤脈絡。",
      en: "Bring customer interactions and opportunity status into one trace.",
    },
  },
  {
    icon: Workflow,
    visual: MICRO_VISUALS.progress,
    title: { zh: "專案／任務系統", en: "Project / task systems" },
    body: {
      zh: "同步負責人、期限、阻礙與交付證據。",
      en: "Synchronise owners, deadlines, blockers, and delivery evidence.",
    },
  },
  {
    icon: MessageSquare,
    visual: MICRO_VISUALS.approval,
    title: { zh: "Teams／協作工具", en: "Teams / collaboration" },
    body: {
      zh: "把核准後的通知與摘要送到正確的團隊頻道。",
      en: "Send approved notifications and briefs to the right team channels.",
    },
  },
  {
    icon: Network,
    visual: MICRO_VISUALS.connect,
    title: { zh: "API／資料庫", en: "APIs / databases" },
    body: {
      zh: "以事件與權限邊界連接既有系統，不要求一次重建全部工具。",
      en: "Connect existing systems through events and permission boundaries without rebuilding everything.",
    },
  },
];

const governance: IconItem[] = [
  {
    icon: LockKeyhole,
    visual: MICRO_VISUALS.govern,
    title: { zh: "權限最小化", en: "Least privilege" },
    body: {
      zh: "依角色、資料來源與動作授予最小必要權限。",
      en: "Grant only the permissions required for each role, source, and action.",
    },
  },
  {
    icon: ShieldCheck,
    visual: MICRO_VISUALS.approval,
    title: {
      zh: "敏感動作人員核准",
      en: "Human approval for sensitive actions",
    },
    body: {
      zh: "付款、正式寄信、刪除與重大狀態變更由人員決定。",
      en: "People decide on payments, formal sends, deletion, and material status changes.",
    },
  },
  {
    icon: FileCheck2,
    visual: MICRO_VISUALS.govern,
    title: { zh: "來源與版本可追溯", en: "Traceable source and versions" },
    body: {
      zh: "保存輸入、規則、輸出、核准者與時間，支援回溯。",
      en: "Keep inputs, rules, outputs, approvers, and timestamps for review.",
    },
  },
  {
    icon: Settings,
    visual: MICRO_VISUALS.connect,
    title: { zh: "規則可調整", en: "Adjustable rules" },
    body: {
      zh: "以可讀規則設定升級門檻、提醒節奏與例外處理。",
      en: "Configure escalation thresholds, reminder cadence, and exceptions with readable rules.",
    },
  },
  {
    icon: BarChart3,
    visual: MICRO_VISUALS.reconcile,
    title: { zh: "持續衡量", en: "Continuous measurement" },
    body: {
      zh: "追蹤準時率、回覆時間、人工介入與錯誤率，持續優化。",
      en: "Measure on-time rate, response time, human intervention, and error rate.",
    },
  },
];

const onboardingSteps: IconItem[] = [
  {
    icon: SearchCheck,
    visual: MICRO_VISUALS.intake,
    title: { zh: "1. 找出高價值流程", en: "1. Find the highest-value flow" },
    body: {
      zh: "盤點追蹤、核對與催辦工作，先選一條有明確輸入與結果的流程。",
      en: "Map follow-up, reconciliation, and reminder work, then select one clear flow.",
    },
  },
  {
    icon: GitBranch,
    visual: MICRO_VISUALS.approval,
    title: { zh: "2. 設計事件與核准點", en: "2. Design events and approvals" },
    body: {
      zh: "定義來源、狀態、負責人、期限、例外與必須由人員核准的動作。",
      en: "Define sources, status, owners, deadlines, exceptions, and human approval points.",
    },
  },
  {
    icon: Cpu,
    visual: MICRO_VISUALS.connect,
    title: { zh: "3. 小範圍導入", en: "3. Launch a focused pilot" },
    body: {
      zh: "接上既有系統，使用真實資料驗證事件、提醒與稽核紀錄。",
      en: "Connect existing systems and validate events, reminders, and audit records with real data.",
    },
  },
  {
    icon: BarChart3,
    visual: MICRO_VISUALS.progress,
    title: { zh: "4. 量化後擴大", en: "4. Scale after measurement" },
    body: {
      zh: "用可量化成果決定是否擴充角色、流程、部門與自動化範圍。",
      en: "Use measurable outcomes to expand agents, workflows, teams, and automation.",
    },
  },
];

const plans: IconItem[] = [
  {
    icon: SearchCheck,
    visual: MICRO_VISUALS.intake,
    title: { zh: "流程診斷", en: "Process diagnostic" },
    body: {
      zh: "釐清流程、資料來源、風險與第一個導入場景。",
      en: "Clarify the process, sources, risks, and first implementation scene.",
    },
  },
  {
    icon: Zap,
    visual: MICRO_VISUALS.progress,
    title: { zh: "單流程試點", en: "Single-flow pilot" },
    body: {
      zh: "完成一條可操作、可觀察、可重複驗證的 Agent 流程。",
      en: "Deliver one operable, observable, and repeatable agent workflow.",
    },
  },
  {
    icon: Layers,
    visual: MICRO_VISUALS.connect,
    title: { zh: "部門方案", en: "Department solution" },
    body: {
      zh: "整合多個角色與系統，建立部門級追蹤與治理。",
      en: "Combine multiple agents and systems into department-level tracking and governance.",
    },
  },
  {
    icon: Network,
    visual: MICRO_VISUALS.govern,
    title: { zh: "企業營運方案", en: "Enterprise operations" },
    body: {
      zh: "以事件架構連接跨部門流程，建立可持續演進的營運系統。",
      en: "Connect cross-functional flows with an event architecture built to evolve.",
    },
  },
];

const audiences: IconItem[] = [
  {
    icon: Building2,
    visual: MICRO_VISUALS.progress,
    title: { zh: "成長中的企業", en: "Growing companies" },
    body: {
      zh: "流程已經變複雜，但還沒有足夠人力支撐追蹤。",
      en: "Operations are complex but the team cannot scale manual follow-up.",
    },
  },
  {
    icon: Briefcase,
    visual: MICRO_VISUALS.govern,
    title: { zh: "專業服務團隊", en: "Professional services" },
    body: {
      zh: "需要保存客戶承諾、交付證據與專案節點。",
      en: "Need reliable records of commitments, delivery evidence, and milestones.",
    },
  },
  {
    icon: ShoppingCart,
    visual: MICRO_VISUALS.reconcile,
    title: { zh: "採購與供應鏈團隊", en: "Procurement & supply chain" },
    body: {
      zh: "每天處理大量詢價、核對、交期與供應商回覆。",
      en: "Handle high volumes of RFQs, checks, lead times, and supplier replies.",
    },
  },
  {
    icon: Landmark,
    visual: MICRO_VISUALS.approval,
    title: { zh: "重視合規的組織", en: "Compliance-minded organisations" },
    body: {
      zh: "要求重要決策有核准、有證據、可回溯。",
      en: "Require approval, evidence, and traceability for important decisions.",
    },
  },
  {
    icon: Stethoscope,
    visual: MICRO_VISUALS.govern,
    title: { zh: "高敏感資料團隊", en: "Sensitive-data teams" },
    body: {
      zh: "需要嚴格的權限、資料邊界與人工介入。",
      en: "Need strict access, data boundaries, and human intervention.",
    },
  },
  {
    icon: Headphones,
    visual: MICRO_VISUALS.intake,
    title: { zh: "客服與營運中心", en: "Support & operations centres" },
    body: {
      zh: "希望降低漏接、延誤與重複回覆。",
      en: "Want to reduce missed requests, delays, and repeated replies.",
    },
  },
];

const faqs: { question: Bilingual; answer: Bilingual }[] = [
  {
    question: {
      zh: "AI Agent 與 Headless SaaS 是兩項不同服務嗎？",
      en: "Are AI agents and headless SaaS separate services?",
    },
    answer: {
      zh: "不是。EudTech 將兩者視為同一項企業導入服務：Headless SaaS 負責連接既有系統並建立品牌入口與事件層，AI Agent 在相同權限、核准與稽核架構內處理追蹤、核對與催辦。",
      en: "No. EudTech delivers them as one enterprise service: headless SaaS connects existing systems and provides branded access and events, while AI agents handle follow-up and reconciliation inside the same permission, approval, and audit model.",
    },
  },
  {
    question: {
      zh: "AI Agent 導入會直接取代人員嗎？",
      en: "Will AI agents replace our staff?",
    },
    answer: {
      zh: "本方案讓 AI 接手追蹤、核對與催辦，重要決策仍由人員核准。導入目標是提高團隊處理量與可見性，不是取消責任歸屬。",
      en: "The solution lets agents handle follow-up, reconciliation, and reminders while people approve important decisions. The goal is capacity and visibility, not removing accountability.",
    },
  },
  {
    question: {
      zh: "需要更換目前使用的 ERP 或 CRM 嗎？",
      en: "Do we need to replace our ERP or CRM?",
    },
    answer: {
      zh: "不需要一次更換。導入會先確認既有系統的 API、匯出或事件能力，再用最小範圍連接高價值流程。",
      en: "No. We first assess APIs, exports, or events in existing systems and connect the highest-value flow with minimal change.",
    },
  },
  {
    question: {
      zh: "第一個導入流程應該選什麼？",
      en: "Which process should we start with?",
    },
    answer: {
      zh: "建議選擇輸入明確、重複頻率高、延誤成本可量化的追蹤或核對流程，例如詢價追蹤、發票核對或專案催辦。",
      en: "Start with a clear, repetitive flow where delay costs are measurable, such as RFQ follow-up, invoice checks, or project reminders.",
    },
  },
  {
    question: {
      zh: "AI Agent 會自行寄出正式郵件嗎？",
      en: "Will agents send formal email automatically?",
    },
    answer: {
      zh: "預設先產生草稿與建議，正式寄出由授權人員核准；例外流程會依組織規則與風險分級設定。",
      en: "By default, agents prepare drafts and suggestions while an authorised person approves the send. Exceptions follow your risk rules.",
    },
  },
  {
    question: {
      zh: "如何避免 AI 讀到不應該讀的資料？",
      en: "How do we prevent inappropriate data access?",
    },
    answer: {
      zh: "以資料來源、角色、欄位與動作建立權限邊界，並保留存取與輸出紀錄，導入前會先完成資料分類。",
      en: "We define boundaries by source, role, field, and action, then retain access and output records after data classification.",
    },
  },
  {
    question: {
      zh: "Claude Managed Agents 是完整地端 AI 嗎？",
      en: "Is Claude Managed Agents a fully on-premises AI solution?",
    },
    answer: {
      zh: "不是。Claude 模型與協調控制仍由 Anthropic 執行；自管 Sandbox 將程式執行、檔案系統與網路存取放在客戶控制的環境。工具輸入與輸出仍會傳送至 Anthropic 控制平面，導入前必須完成資料分類與邊界確認。",
      en: "No. Claude and the orchestration control plane remain with Anthropic. A self-hosted sandbox moves code execution, files, and network access into customer-controlled infrastructure. Tool inputs and outputs still flow through the Anthropic control plane, so data classification and boundary review are required.",
    },
  },
  {
    question: {
      zh: "Claude Managed Agents 建置需要地端 GPU 嗎？",
      en: "Does a Claude Managed Agents implementation require an on-premises GPU?",
    },
    answer: {
      zh: "這項架構不需要用地端 GPU 執行 Claude 推理。客戶端主機負責 Agent 工具、檔案與內部系統連線；只有客戶自己的工作負載需要 GPU 時才另外規劃。",
      en: "This architecture does not require an on-premises GPU for Claude inference. Customer infrastructure runs agent tools, files, and internal-system connections; a GPU is planned separately only when the customer workload itself needs one.",
    },
  },
  {
    question: {
      zh: "導入成果如何衡量？",
      en: "How do we measure the outcome?",
    },
    answer: {
      zh: "以準時率、平均回覆時間、漏件率、人工介入比例與結案時間建立導入前後基準。",
      en: "We establish before-and-after baselines for on-time rate, response time, missed items, human intervention, and closure time.",
    },
  },
  {
    question: {
      zh: "小型企業也適合導入嗎？",
      en: "Is this suitable for a small business?",
    },
    answer: {
      zh: "適合。小型企業可以從單一流程試點開始，先解決最常發生的追蹤與核對問題，再依成果逐步擴充。",
      en: "Yes. A small business can start with one focused flow, solve the most frequent follow-up or check, and expand from measured results.",
    },
  },
  {
    question: {
      zh: "EudTech 如何開始協助？",
      en: "How does EudTech get started?",
    },
    answer: {
      zh: "先安排流程診斷，確認工作目標、資料來源、核准點與成功指標，再提出適合的導入方案與範圍。",
      en: "We begin with a process diagnostic covering goals, sources, approval points, and success metrics, then propose the right scope.",
    },
  },
];

const buildStructuredData = (isEnglish: boolean) => {
  const pageUrl = canonicalPageUrl(
    "https://eudaemonia.tech/solutions/ai-agent",
  );
  const pageName = isEnglish
    ? "AI Agent, Claude Managed Agents, and Headless SaaS Implementation"
    : "AI Agent、Claude Managed Agents 與 Headless SaaS 導入";
  const pageDescription = isEnglish
    ? "EudTech implements controlled AI agents with Microsoft or Claude Managed Agents, including self-hosted execution, enterprise integration, human approval, and audit evidence."
    : "EudTech 導入 Microsoft 或 Claude Managed Agents，包含自管執行環境、企業系統整合、人員核准與稽核證據。";

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: pageName,
      description: pageDescription,
      serviceType:
        "AI agent, Claude Managed Agents, and headless SaaS implementation",
      areaServed: { "@type": "Country", name: isEnglish ? "Taiwan" : "台灣" },
      provider: {
        "@type": "Organization",
        name: "EudTech",
        url: canonicalPageUrl("https://eudaemonia.tech"),
        email: "info@eudaemonia.tech",
      },
      url: pageUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: text(faq.question, isEnglish),
        acceptedAnswer: {
          "@type": "Answer",
          text: text(faq.answer, isEnglish),
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isEnglish ? "Home" : "首頁",
          item: canonicalPageUrl("https://eudaemonia.tech"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isEnglish ? "Solutions" : "解決方案",
          item: canonicalPageUrl("https://eudaemonia.tech/solutions"),
        },
        { "@type": "ListItem", position: 3, name: pageName, item: pageUrl },
      ],
    },
  ];
};

const AiAgentSolutionPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const [activeScene, setActiveScene] = useState(0);
  const [showMobileActions, setShowMobileActions] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const selectedScene = scenes[activeScene];
  const pageUrl = canonicalPageUrl(
    "https://eudaemonia.tech/solutions/ai-agent",
  );

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileActions(!entry.isIntersecting);
      },
      { threshold: 0.01 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEOHead
        title={
          isEnglish
            ? "Enterprise AI Agent, Claude Managed Agents, and Headless SaaS Implementation"
            : "企業 AI Agent、Claude Managed Agents 與 Headless SaaS 導入"
        }
        description={
          isEnglish
            ? "Implement controlled AI agents with Microsoft or Claude Managed Agents, including self-hosted execution, enterprise-system integration, human approval, and audit evidence."
            : "導入 Microsoft 或 Claude Managed Agents，包含自管執行環境、企業系統整合、人員核准與稽核證據。"
        }
        keywords={
          isEnglish
            ? "AI agent implementation, Claude Managed Agents implementation, self-hosted sandbox, MCP tunnel, headless SaaS, workflow automation, Taiwan"
            : "AI Agent 導入, Claude Managed Agents 建置, Self-hosted Sandbox, MCP Tunnel, Headless SaaS, 企業 AI 導入, 台灣 AI 顧問"
        }
        url={pageUrl}
        type="website"
        isEnglish={isEnglish}
        structuredData={buildStructuredData(isEnglish)}
      />

      <div className="min-h-screen bg-white pb-[calc(6rem+env(safe-area-inset-bottom))] text-slate-950 dark:bg-slate-950 dark:text-white md:pb-0">
        <section
          ref={heroRef}
          data-ai-agent-hero
          className="relative isolate overflow-hidden bg-slate-950 pt-24 text-white"
        >
          <img
            src={EDITORIAL_PHOTOGRAPHY.workflowDesign.src}
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
                {isEnglish
                  ? "AI agents × headless SaaS"
                  : "AI Agent × Headless SaaS"}
              </div>
              <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                {isEnglish ? "Connect every system." : "串接既有系統。"}
                <span className="block text-cyan-300">
                  {isEnglish
                    ? "Let agents move work forward."
                    : "讓 Agent 推動工作。"}
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {isEnglish
                  ? "EudTech connects ERP, CRM, Microsoft 365, databases, and APIs to branded portals, event workflows, and controlled AI agents. Sensitive actions remain subject to human approval."
                  : "EudTech 串接 ERP、CRM、Microsoft 365、資料庫與 API，建立品牌入口、事件流程與受控 AI Agent；敏感動作仍由人員核准。"}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {isEnglish ? SITE_BOOKING.label.en : SITE_BOOKING.label.zh}
                </a>
                <a
                  href="mailto:info@eudaemonia.tech?subject=AI%20Agent%20%E5%B0%8E%E5%85%A5%E8%AB%AE%E8%A9%A2"
                  className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {isEnglish ? "Email EudTech" : "寄信給 EudTech"}
                </a>
              </div>
              <p className="mt-6 text-sm text-slate-400">
                {isEnglish
                  ? "Human approval remains the control point for sensitive actions."
                  : "付款、正式寄信與重大狀態變更等敏感動作，保留人員核准控制點。"}
              </p>
              <div className="mt-9 grid max-w-2xl gap-3 text-sm text-slate-200 sm:grid-cols-3">
                {[
                  isEnglish ? "Source evidence retained" : "保留來源證據",
                  isEnglish ? "Differences reconciled" : "完成差異核對",
                  isEnglish ? "A person approves action" : "人員核准執行",
                ].map((label, index) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-lg border border-white/15 bg-slate-950/55 px-3 py-3 backdrop-blur-sm"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-bold text-cyan-200">
                      {index + 1}
                    </span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          data-ai-agent-example="official-document"
          className="border-b border-slate-200 bg-white py-14 sm:py-20 dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                {isEnglish
                  ? "REAL USE CASE 01 | AI OFFICIAL-DOCUMENT SYSTEM"
                  : "實際應用 01｜AI 公文系統"}
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {isEnglish
                  ? "When a new official document is ready, notify, review, and open it directly."
                  : "新公文準備好後，直接通知、查看與開啟。"}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                {isEnglish
                  ? "People receive a clear notification, see what needs attention, and open the document or recent files from the same work view."
                  : "使用者收到清楚通知後，可以看到待處理事項，直接開啟公文或查看最近文件，從收到通知一路完成下一步。"}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { zh: "收到通知", en: "Receive a notification" },
                  { zh: "辨識待辦", en: "See what needs attention" },
                  { zh: "直接閱讀", en: "Open and read directly" },
                ].map((outcome, index) => (
                  <div
                    key={outcome.en}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {isEnglish ? outcome.en : outcome.zh}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:info@eudaemonia.tech?subject=AI%20%E5%85%AC%E6%96%87%E7%B3%BB%E7%B5%B1%E5%B0%8E%E5%85%A5%E8%AB%AE%E8%A9%A2"
                className="mt-8 inline-flex items-center rounded-md bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                {isEnglish
                  ? "Discuss an AI official-document system"
                  : "AI 公文系統導入諮詢"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-3 shadow-sm dark:border-slate-700 sm:p-5">
              <img
                src="/ai-agent/official-document-menu.png"
                alt={
                  isEnglish
                    ? "AI official-document system menu showing notifications, unread count, recent documents, PDF opening, and saved files"
                    : "AI 公文系統選單，顯示通知、未讀數量、最近文件、開啟 PDF 與已儲存檔案"
                }
                className="mx-auto h-auto max-h-[520px] w-full object-contain"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="mt-3 text-center text-xs leading-5 text-slate-400">
                {isEnglish
                  ? "Actual operation screen; the interface keeps notifications, pending items, and document access in one place."
                  : "實際操作畫面；通知、待辦與文件入口集中在同一個工作畫面。"}
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-slate-50 py-14 sm:py-20 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                {isEnglish ? "The operational gap" : "營運缺口"}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {isEnglish
                  ? "Your team should not be the integration layer."
                  : "團隊不應該成為系統之間的整合層。"}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                {isEnglish
                  ? "AI agents create a shared operational rhythm across the systems where work already happens."
                  : "AI Agent 讓既有系統之間形成共同的營運節奏，讓工作不再依賴個人記憶。"}
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-4">
              {painPoints.map((item) => (
                <article
                  key={text(item.title, isEnglish)}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  <NarrativeVisual src={item.visual} />
                  <h3 className="mt-6 text-lg font-semibold">
                    {text(item.title, isEnglish)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {text(item.body, isEnglish)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">
                  {isEnglish ? "The agent team" : "Agent 角色"}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  {isEnglish
                    ? "Six focused roles. One accountable workflow."
                    : "六個專注角色，組成一條可負責的工作流程。"}
                </h2>
              </div>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                {isEnglish
                  ? "Each role has a defined purpose, source, and hand-off. The system can automate preparation without hiding who approves the result."
                  : "每個角色都有明確目的、資料來源與交接點。系統可以自動準備工作，但不隱藏誰核准結果。"}
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-3">
              {agentRoles.map((item, index) => (
                <article
                  key={text(item.title, isEnglish)}
                  className="group rounded-xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg dark:border-slate-800 dark:hover:border-emerald-500"
                >
                  <div className="flex items-center justify-between">
                    <NarrativeVisual src={item.visual} />
                    <span className="text-xs font-semibold text-slate-400">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">
                    {text(item.title, isEnglish)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {text(item.body, isEnglish)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="workflow-demo"
          className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-14 sm:py-20 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                {isEnglish ? "See it in context" : "看見實際流程"}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {isEnglish
                  ? "Three scenes, one event-driven rhythm."
                  : "三個場景，同一套事件驅動節奏。"}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                {isEnglish
                  ? "Switch scenes to see how the same principles adapt to different teams."
                  : "切換場景，查看同一套原則如何適應不同團隊。"}
              </p>
            </div>
            <div
              className="mt-10 flex flex-wrap gap-3"
              role="tablist"
              aria-label={isEnglish ? "AI Agent scenes" : "AI Agent 導入場景"}
            >
              {scenes.map((scene, index) => (
                <button
                  key={text(scene.label, isEnglish)}
                  type="button"
                  role="tab"
                  aria-selected={activeScene === index}
                  onClick={() => setActiveScene(index)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-400 ${activeScene === index ? "bg-slate-950 text-white dark:bg-cyan-300 dark:text-slate-950" : "border border-slate-300 bg-white text-slate-700 hover:border-cyan-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"}`}
                >
                  {text(scene.label, isEnglish)}
                </button>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-8">
              <p className="max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-200">
                {text(selectedScene.intro, isEnglish)}
              </p>
              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {selectedScene.steps.map((step, index) => (
                  <div
                    key={text(step.title, isEnglish)}
                    className="relative lg:pr-6"
                  >
                    {index < selectedScene.steps.length - 1 ? (
                      <div className="absolute left-5 top-12 hidden h-px w-[calc(100%-1.5rem)] bg-slate-200 dark:bg-slate-800 lg:block" />
                    ) : null}
                    <div className="relative flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">
                        <step.icon className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-600 dark:text-cyan-300">
                        {text(step.stage, isEnglish)}
                      </p>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold">
                      {text(step.title, isEnglish)}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {text(step.body, isEnglish)}
                    </p>
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
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                  {isEnglish ? "Works with your stack" : "連接既有系統"}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  {isEnglish
                    ? "Connect the work, not just the tools."
                    : "連接工作脈絡，不只是連接工具。"}
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                  {isEnglish
                    ? "EudTech maps events and permissions across the systems already central to your operation."
                    : "EudTech 以事件與權限為核心，連接營運中已經使用的系統。"}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {systems.map((item) => (
                  <article
                    key={text(item.title, isEnglish)}
                    className="rounded-xl border border-slate-200 p-5 dark:border-slate-800"
                  >
                    <NarrativeVisual src={item.visual} />
                    <h3 className="mt-4 font-semibold">
                      {text(item.title, isEnglish)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {text(item.body, isEnglish)}
                    </p>
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
              caption={{
                zh: "Microsoft Copilot Studio 原廠產品導覽畫面；實際介面與功能依授權及版本更新。",
                en: "Official Microsoft Copilot Studio product-tour screen; actual interface and capabilities depend on licensing and version.",
              }}
              sourceHref={VENDOR_EVIDENCE.microsoft.sources.product.href}
              sourceLabel={VENDOR_EVIDENCE.microsoft.sources.product.label}
              isEnglish={isEnglish}
              contain
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Microsoft Copilot Studio
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {isEnglish
                  ? "Use official controls for connections, flows, and governance."
                  : "使用原廠連線、流程與治理控制"}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                {isEnglish
                  ? "When Microsoft technologies fit the customer environment, EudTech can use Copilot Studio, Dataverse, SharePoint, Microsoft 365, connectors, and APIs to build governed agents. The final architecture depends on licences, permissions, data boundaries, and acceptance requirements."
                  : "當 Microsoft 技術符合客戶環境時，EudTech 可採用 Copilot Studio、Dataverse、SharePoint、Microsoft 365、連接器與 API 建立受治理的 Agent。最終架構依授權、權限、資料邊界與驗收需求確認。"}
              </p>
              <ul className="mt-7 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                <li className="flex gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" />
                  {isEnglish
                    ? "Connect tools and knowledge through authenticated connections."
                    : "透過驗證連線接取工具與知識來源。"}
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" />
                  {isEnglish
                    ? "Use agent flows for event-driven tasks and human intervention."
                    : "使用 Agent flows 執行事件驅動任務與人員介入。"}
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" />
                  {isEnglish
                    ? "Apply security, data-loss prevention, access, and environment governance."
                    : "套用安全性、資料外洩防護、存取與環境治理。"}
                </li>
              </ul>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                <SourceLink
                  href={VENDOR_EVIDENCE.microsoft.sources.connections.href}
                  label={VENDOR_EVIDENCE.microsoft.sources.connections.label}
                  isEnglish={isEnglish}
                />
                <SourceLink
                  href={VENDOR_EVIDENCE.microsoft.sources.flows.href}
                  label={VENDOR_EVIDENCE.microsoft.sources.flows.label}
                  isEnglish={isEnglish}
                />
                <SourceLink
                  href={VENDOR_EVIDENCE.microsoft.sources.governance.href}
                  label={VENDOR_EVIDENCE.microsoft.sources.governance.label}
                  isEnglish={isEnglish}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="claude-managed-agents"
          data-ai-agent-solution="claude-managed-agents"
          className="scroll-mt-20 overflow-hidden bg-slate-950 py-14 text-white sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
                  <Sparkles className="h-4 w-4" />
                  {isEnglish
                    ? "Anthropic technology implementation"
                    : "Anthropic 技術建置服務"}
                </div>
                <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {isEnglish
                    ? "Claude Managed Agents, connected to the systems where work happens."
                    : "Claude Managed Agents，接進企業真正工作的系統。"}
                </h2>
                <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                  {isEnglish
                    ? "EudTech designs the agent, deploys customer-controlled execution, connects private tools and data, and establishes approval and audit controls. Claude inference remains on Anthropic; code execution, files, and network reach can run inside your infrastructure."
                    : "EudTech 負責 Agent 設計、自管執行環境、企業內部工具與資料連線，以及核准與稽核控制。Claude 推理仍由 Anthropic 執行；程式執行、檔案與網路存取可以留在客戶控制的基礎設施。"}
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    {
                      image: EDITORIAL_PHOTOGRAPHY.workflowDesign.src,
                      zh: "Managed Agents：長時間、多步驟任務的 Agent 主體",
                      en: "Managed Agents: the agent harness for long-running, multi-step work",
                    },
                    {
                      image: EDITORIAL_PHOTOGRAPHY.privateInfrastructure.src,
                      zh: "Self-hosted Sandbox：工具、檔案與網路在客戶環境執行",
                      en: "Self-hosted sandbox: tools, files, and network access run in your environment",
                    },
                    {
                      image: EDITORIAL_PHOTOGRAPHY.operationsMonitoring.src,
                      zh: "MCP／內部連線：接取 ERP、資料庫、檔案與內部 API",
                      en: "MCP and private connections: reach ERP, databases, files, and internal APIs",
                    },
                  ].map((item) => (
                    <div
                      key={item.en}
                      className="flex min-h-16 items-start gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-4"
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="h-12 w-16 shrink-0 rounded-lg object-cover"
                        loading="lazy"
                        decoding="async"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-6 text-slate-200">
                        {isEnglish ? item.en : item.zh}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <figure className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-2xl shadow-cyan-950/30 sm:p-5">
                <img
                  src={VENDOR_EVIDENCE.anthropic.image}
                  alt={text(VENDOR_EVIDENCE.anthropic.imageAlt, isEnglish)}
                  className="aspect-[8/5] w-full rounded-xl object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="mt-4 text-xs leading-6 text-slate-400">
                  {isEnglish
                    ? "Real infrastructure photograph representing customer-controlled execution. Security boundaries are defined and verified during implementation."
                    : "真實基礎設施攝影，用於呈現客戶自管執行環境；安全邊界會在建置時定義並驗證。"}
                </figcaption>
              </figure>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  image: EDITORIAL_PHOTOGRAPHY.workflowDesign.src,
                  zh: "Agent 與流程設計",
                  en: "Agent and workflow design",
                  zhBody: "定義任務、工具、技能、版本、例外與人員核准點。",
                  enBody:
                    "Define tasks, tools, skills, versions, exceptions, and human approvals.",
                },
                {
                  image: EDITORIAL_PHOTOGRAPHY.privateInfrastructure.src,
                  zh: "自管執行環境",
                  en: "Self-hosted execution",
                  zhBody:
                    "建置 Worker、Sandbox、權限、秘密管理、網路政策與監測。",
                  enBody:
                    "Deploy workers, sandboxes, access, secret handling, network policy, and monitoring.",
                },
                {
                  image: EDITORIAL_PHOTOGRAPHY.operationsMonitoring.src,
                  zh: "企業系統整合",
                  en: "Enterprise integration",
                  zhBody: "串接 ERP、SQL、文件、RAG、MCP Server 與內部 API。",
                  enBody:
                    "Connect ERP, SQL, documents, RAG, MCP servers, and internal APIs.",
                },
                {
                  image: EDITORIAL_PHOTOGRAPHY.governanceReview.src,
                  zh: "驗收與治理",
                  en: "Acceptance and governance",
                  zhBody:
                    "驗證資料邊界、權限、核准、錯誤處理、日誌與復原程序。",
                  enBody:
                    "Validate data boundaries, access, approvals, errors, logs, and recovery.",
                },
              ].map((item) => (
                <article
                  key={item.en}
                  className="rounded-xl border border-white/10 bg-white/[0.05] p-6"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-24 w-full rounded-xl object-cover"
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 text-lg font-semibold">
                    {isEnglish ? item.en : item.zh}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {isEnglish ? item.enBody : item.zhBody}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 grid gap-6 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-6 md:grid-cols-[1fr_auto] md:items-center sm:p-8">
              <div>
                <h3 className="text-xl font-semibold">
                  {isEnglish
                    ? "Commercial and data boundary"
                    : "商務與資料邊界"}
                </h3>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
                  {isEnglish
                    ? "Anthropic API usage and customer infrastructure are charged separately from EudTech implementation. Managed Agents is currently beta; MCP tunnels are a limited research preview. Tool inputs and outputs still flow through the Anthropic control plane, so EudTech confirms data classification and acceptance criteria before production."
                    : "Anthropic API 使用量與客戶端基礎設施費用，和 EudTech 建置服務分開計算。Managed Agents 目前為 Beta；MCP Tunnels 為有限研究預覽。工具輸入與輸出仍會經過 Anthropic 控制平面，因此正式上線前會先確認資料分類與驗收條件。"}
                </p>
              </div>
              <a
                href="mailto:info@eudaemonia.tech?subject=Claude%20Managed%20Agents%20%E5%BB%BA%E7%BD%AE%E6%9C%8D%E5%8B%99"
                className="inline-flex items-center justify-center rounded-md bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200"
              >
                {isEnglish
                  ? "Discuss a Claude implementation"
                  : "洽談 Claude 建置"}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
              <SourceLink
                href={VENDOR_EVIDENCE.anthropic.sources.overview.href}
                label={VENDOR_EVIDENCE.anthropic.sources.overview.label}
                isEnglish={isEnglish}
              />
              <SourceLink
                href={VENDOR_EVIDENCE.anthropic.sources.selfHosted.href}
                label={VENDOR_EVIDENCE.anthropic.sources.selfHosted.label}
                isEnglish={isEnglish}
              />
              <SourceLink
                href={VENDOR_EVIDENCE.anthropic.sources.tunnel.href}
                label={VENDOR_EVIDENCE.anthropic.sources.tunnel.label}
                isEnglish={isEnglish}
              />
              <SourceLink
                href={VENDOR_EVIDENCE.anthropic.sources.security.href}
                label={VENDOR_EVIDENCE.anthropic.sources.security.label}
                isEnglish={isEnglish}
              />
              <SourceLink
                href={VENDOR_EVIDENCE.anthropic.sources.pricing.href}
                label={VENDOR_EVIDENCE.anthropic.sources.pricing.label}
                isEnglish={isEnglish}
              />
            </div>
          </div>
        </section>

        <section
          id="consultation"
          className="scroll-mt-20 bg-slate-950 py-14 sm:py-20 text-white"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                {isEnglish ? "Governance by design" : "內建治理"}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {isEnglish
                  ? "Automation should make responsibility clearer."
                  : "自動化應該讓責任更清楚。"}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                {isEnglish
                  ? "Every implementation includes control points so the team can understand, approve, and audit what the agents do."
                  : "每次導入都包含控制點，讓團隊可以理解、核准並稽核 Agent 的工作。"}
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-5">
              {governance.map((item) => (
                <article
                  key={text(item.title, isEnglish)}
                  className="rounded-xl border border-white/10 bg-white/[0.06] p-5"
                >
                  <NarrativeVisual src={item.visual} dark />
                  <h3 className="mt-5 text-base font-semibold">
                    {text(item.title, isEnglish)}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {text(item.body, isEnglish)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-14 sm:py-20 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                  {isEnglish ? "A practical path" : "務實導入路徑"}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  {isEnglish
                    ? "Start small. Prove value. Expand with confidence."
                    : "從小範圍開始，用成果決定擴大。"}
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {onboardingSteps.map((item) => (
                  <article
                    key={text(item.title, isEnglish)}
                    className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
                  >
                    <NarrativeVisual src={item.visual} />
                    <h3 className="mt-5 text-lg font-semibold">
                      {text(item.title, isEnglish)}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {text(item.body, isEnglish)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">
                {isEnglish ? "Choose the right scope" : "選擇適合的導入範圍"}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {isEnglish
                  ? "Four ways to work with EudTech."
                  : "EudTech 提供四種合作方案。"}
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-4">
              {plans.map((item, index) => (
                <article
                  key={text(item.title, isEnglish)}
                  className={`rounded-xl border p-6 ${index === 1 ? "border-cyan-400 bg-cyan-50 dark:border-cyan-500 dark:bg-cyan-950/30" : "border-slate-200 dark:border-slate-800"}`}
                >
                  <NarrativeVisual src={item.visual} />
                  <h3 className="mt-6 text-lg font-semibold">
                    {text(item.title, isEnglish)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {text(item.body, isEnglish)}
                  </p>
                  <a
                    href="mailto:info@eudaemonia.tech?subject=AI%20Agent%20%E5%B0%8E%E5%85%A5%E6%96%B9%E6%A1%88"
                    className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-700 hover:text-cyan-600 dark:text-cyan-300"
                  >
                    {isEnglish ? "Discuss scope" : "討論範圍"}{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-20 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                {isEnglish ? "Built for real operations" : "適合實際營運團隊"}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {isEnglish
                  ? "For teams where a missed next step has a cost."
                  : "適合每一個漏掉下一步就會產生成本的團隊。"}
              </h2>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-3">
              {audiences.map((item) => (
                <article
                  key={text(item.title, isEnglish)}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"
                >
                  <NarrativeVisual src={item.visual} />
                  <div>
                    <h3 className="font-semibold">
                      {text(item.title, isEnglish)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {text(item.body, isEnglish)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                FAQ
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {isEnglish
                  ? "Questions teams ask before they start."
                  : "團隊導入前最常問的問題。"}
              </h2>
            </div>
            <div className="mt-12 divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {faqs.map((faq) => (
                <details
                  key={text(faq.question, isEnglish)}
                  className="group p-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
                    {text(faq.question, isEnglish)}
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {text(faq.answer, isEnglish)}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-14 sm:py-20 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 lg:flex-row lg:items-center lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                {isEnglish
                  ? "Ready for the first workflow?"
                  : "準備好選擇第一條流程了嗎？"}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {isEnglish
                  ? "Bring one process. We will map the next step."
                  : "帶著一條流程開始，EudTech 協助整理下一步。"}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                {isEnglish
                  ? "Tell us where follow-up, reconciliation, or reminders consume the most time."
                  : "告訴 EudTech 哪一段追蹤、核對或催辦最消耗團隊時間。"}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {isEnglish ? SITE_BOOKING.label.en : SITE_BOOKING.label.zh}
              </a>
              <a
                href="mailto:info@eudaemonia.tech?subject=AI%20Agent%20%E5%B0%8E%E5%85%A5%E5%88%9D%E8%AB%87"
                className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                <Mail className="mr-2 h-4 w-4" />
                {isEnglish ? "Send an email" : "寄送郵件"}
              </a>
            </div>
          </div>
        </section>

        <Footer isEnglish={isEnglish} />

        {showMobileActions && (
          <nav
            aria-label={
              isEnglish ? "AI Agent quick actions" : "AI Agent 快速操作"
            }
            data-ai-agent-mobile-actions
            className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex gap-2 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur md:hidden dark:border-slate-700 dark:bg-slate-900/95"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center rounded-lg bg-cyan-400 px-3 py-3 text-xs font-semibold text-slate-950"
            >
              <CalendarDays className="mr-1.5 h-4 w-4" />
              {isEnglish ? SITE_BOOKING.label.en : SITE_BOOKING.label.zh}
            </a>
            <a
              href="mailto:info@eudaemonia.tech?subject=AI%20Agent%20%E5%B0%8E%E5%85%A5%E8%AB%AE%E8%A9%A2"
              className="flex flex-1 items-center justify-center rounded-lg border border-slate-300 px-3 py-3 text-xs font-semibold text-slate-800 dark:border-slate-600 dark:text-slate-100"
            >
              <Mail className="mr-1.5 h-4 w-4" />
              {isEnglish ? "Email" : "寄信"}
            </a>
          </nav>
        )}
      </div>
    </>
  );
};

export default AiAgentSolutionPage;
