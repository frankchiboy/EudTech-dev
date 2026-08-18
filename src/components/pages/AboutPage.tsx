import React from "react";
import { Link } from "react-router-dom";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { VENDOR_EVIDENCE } from "../../data/vendorEvidence";
import { EDITORIAL_PHOTOGRAPHY } from "../../data/editorialPhotography";
import {
  ActionLink,
  CheckList,
  PageHero,
  PageShell,
  SourceLink,
  tx,
} from "./SitePagePrimitives";

const AboutPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const capabilities = [
    {
      n: "01",
      title: { zh: "整合能力", en: "Integration" },
      body: {
        zh: "以 API、事件、身分與權限邊界連接既有系統，保留來源、狀態與責任脈絡。",
        en: "Connect existing systems through APIs, events, identity, and permission boundaries while preserving source, state, and ownership.",
      },
    },
    {
      n: "02",
      title: { zh: "治理能力", en: "Governance" },
      body: {
        zh: "關鍵通知、付款、正式會計、驗收與狀態變更保留人工核准及稽核紀錄。",
        en: "Keep human approval and audit evidence for critical notifications, payments, formal accounting, acceptance, and state changes.",
      },
    },
    {
      n: "03",
      title: { zh: "交付能力", en: "Delivery" },
      body: {
        zh: "從可操作的小範圍開始，以實際資料、測試案例、驗收指標與維運責任決定擴充。",
        en: "Start with an operable scope and use real data, test cases, acceptance metrics, and operating ownership to decide expansion.",
      },
    },
  ];
  const solutions = [
    {
      image: EDITORIAL_PHOTOGRAPHY.workflowDesign,
      label: { zh: "EudTech 導入服務", en: "EudTech implementation" },
      title: {
        zh: "AI Agent 與 Headless SaaS",
        en: "AI agents & headless SaaS",
      },
      body: {
        zh: "串接 ERP、CRM、Microsoft 365、資料庫與 API，建立品牌入口、事件流程、受控 Agent、人員核准與稽核。",
        en: "Connect ERP, CRM, Microsoft 365, databases, and APIs to branded experiences, event workflows, controlled agents, human approvals, and audit.",
      },
      href: "/solutions/ai-agent",
      source: VENDOR_EVIDENCE.microsoft.sources.product,
    },
    {
      image: EDITORIAL_PHOTOGRAPHY.privateInfrastructure,
      label: { zh: "EudTech × Comino", en: "EudTech × Comino" },
      title: { zh: "AI 運算基礎設施", en: "AI compute infrastructure" },
      body: {
        zh: "將模型、模擬與運算需求轉成 Comino 液冷工作站或伺服器的配置、報價與驗收計畫。",
        en: "Turn model, simulation, and compute needs into Comino liquid-cooled workstation or server configurations, quotes, and acceptance plans.",
      },
      href: "/solutions/ai-infrastructure",
      source: VENDOR_EVIDENCE.comino.sources.blackwell,
    },
    {
      image: EDITORIAL_PHOTOGRAPHY.operationsMonitoring,
      label: { zh: "EudTech × Cyabra", en: "EudTech × Cyabra" },
      title: {
        zh: "社群情報與品牌保護",
        en: "Social intelligence and brand protection",
      },
      body: {
        zh: "以 Cyabra 分析帳號真實性、敘事、協調活動與警示，支援品牌、公關、資安及公部門決策。",
        en: "Use Cyabra for profile authenticity, narratives, coordinated activity, and alerts across brand, communications, security, and public-sector decisions.",
      },
      href: "/solutions/social-intelligence",
      source: VENDOR_EVIDENCE.cyabra.sources.authenticity,
    },
  ];
  const customers = [
    {
      zh: "已使用 Microsoft 365、流程仍散落在郵件、Excel 與聊天工具的中小企業",
      en: "SMEs already using Microsoft 365 while workflows remain fragmented across email, Excel, and chat",
    },
    {
      zh: "已有 ERP、CRM、Microsoft 365 或資料庫，需要品牌化客戶入口、事件自動化或產品化的團隊",
      en: "Teams with ERP, CRM, Microsoft 365, or databases that need a branded customer portal, event automation, or productisation",
    },
    {
      zh: "需要多 GPU、液冷、機架部署與正式驗收的研究室、企業與公部門",
      en: "Labs, enterprises, and public institutions requiring multi-GPU, liquid cooling, rack deployment, and formal acceptance",
    },
    {
      zh: "需要分析假帳號、敘事與協調行為的品牌、公關、資安與政策團隊",
      en: "Brand, communications, security, and policy teams analysing fake profiles, narratives, and coordinated behaviour",
    },
    {
      zh: "需要把範圍、交付物、來源證據與責任邊界寫清楚的採購單位",
      en: "Procurement teams that need scope, deliverables, source evidence, and responsibility boundaries stated clearly",
    },
  ];

  return (
    <PageShell
      title={{ zh: "關於 EudTech｜優達盟資訊科技", en: "About EudTech" }}
      description={{
        zh: "了解 EudTech 整合的 AI Agent 與 Headless SaaS 導入、Comino 液冷 AI 運算、Cyabra 社群情報，以及從診斷到驗收的交付方式。",
        en: "Learn about EudTech integrated AI agent and headless SaaS implementation, Comino liquid-cooled AI computing, Cyabra social intelligence, and delivery from discovery through acceptance.",
      }}
      path="/about"
    >
      <PageHero
        eyebrow={{ zh: "關於 EudTech", en: "About EudTech" }}
        title={{
          zh: "把技術、流程與決策接在一起",
          en: "Connect technology, operations, and decisions",
        }}
        lead={{
          zh: "優達盟資訊科技有限公司協助企業、研究單位與公部門，把 AI 軟體、運算設備與情報工具導入實際工作流程，並把需求、來源、核准、驗收與責任寫清楚。",
          en: "Eudaemonia Technology helps enterprises, research teams, and public institutions put AI software, compute systems, and intelligence tools into practical workflows with clear requirements, sources, approvals, acceptance, and ownership.",
        }}
        isEnglish={isEnglish}
        image={EDITORIAL_PHOTOGRAPHY.solutionDiscovery.src}
        imageAlt={EDITORIAL_PHOTOGRAPHY.solutionDiscovery.alt}
        imagePosition={EDITORIAL_PHOTOGRAPHY.solutionDiscovery.objectPosition}
        actions={
          <ActionLink href="/contact">
            {isEnglish ? "Work with EudTech" : "與 EudTech 合作"}
          </ActionLink>
        }
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              {isEnglish ? "EudTech delivery scope" : "EudTech 交付範圍"}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              {isEnglish
                ? "A Taiwan delivery team across three solution lines"
                : "由台灣窗口負責三條解決方案的需求與交付"}
            </h2>
            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              {isEnglish
                ? "These cards describe EudTech ownership, delivery boundaries, and vendor evidence instead of repeating product marketing images."
                : "以下內容說明 EudTech 的負責範圍、交付邊界與原廠依據，不重複產品行銷圖片。"}
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {solutions.map(({ image, label, title, body, href, source }) => (
              <article
                key={tx(title, isEnglish)}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <img
                  src={image.src}
                  alt={tx(image.alt, isEnglish)}
                  className="h-44 w-full object-cover"
                  style={{ objectPosition: image.objectPosition }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-7">
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200">
                    {tx(label, isEnglish)}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">
                    {tx(title, isEnglish)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {tx(body, isEnglish)}
                  </p>
                  <div className="mt-5 flex flex-col items-start gap-3">
                    <Link
                      to={href}
                      className="text-sm font-semibold text-cyan-700 dark:text-cyan-300"
                    >
                      {isEnglish ? "View delivery scope →" : "查看交付範圍 →"}
                    </Link>
                    {source && (
                      <SourceLink
                        href={source.href}
                        label={source.label}
                        isEnglish={isEnglish}
                      />
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-3 lg:px-8">
          {capabilities.map(({ n, title, body }) => (
            <article
              key={tx(title, isEnglish)}
              className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-950"
            >
              <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                {n}
              </span>
              <h2 className="mt-5 text-xl font-semibold">
                {tx(title, isEnglish)}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {tx(body, isEnglish)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">
              {isEnglish ? "How EudTech works" : "EudTech 的工作方式"}
            </h2>
            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              {isEnglish
                ? "EudTech makes the objective, source, owner, approval point, acceptance criteria, and next action explicit before the implementation expands."
                : "EudTech 會在擴大導入前，明確定義目標、來源、負責人、核准點、驗收條件與下一個行動。"}
            </p>
          </div>
          <CheckList
            isEnglish={isEnglish}
            items={[
              {
                zh: "診斷：確認工作目標、使用者、資料與場地條件",
                en: "Discovery: confirm objectives, users, data, and site conditions",
              },
              {
                zh: "設計：建立範圍、來源、權限、核准點與驗收項目",
                en: "Design: define scope, sources, permissions, approvals, and acceptance",
              },
              {
                zh: "試點：用真實或去識別案例重跑完整流程",
                en: "Pilot: replay the complete flow with real or de-identified cases",
              },
              {
                zh: "上線：完成教育、文件、監測、維運與責任移交",
                en: "Go live: complete training, documentation, monitoring, operations, and ownership handoff",
              },
              {
                zh: "擴充：依事件資料與驗收結果決定下一個範圍",
                en: "Expand: use event data and acceptance results to decide the next scope",
              },
            ]}
          />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">
              {isEnglish ? "Who EudTech serves" : "適合合作的組織"}
            </h2>
            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              {isEnglish
                ? "The best fit is an organisation with a concrete operational, compute, or intelligence problem and an owner who can validate the result."
                : "最適合的合作對象，是已有明確營運、運算或情報問題，且有負責人可以驗證結果的組織。"}
            </p>
          </div>
          <CheckList items={customers} isEnglish={isEnglish} />
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">
              {isEnglish
                ? "Bring one concrete problem to the first conversation"
                : "第一次討論，帶一個具體問題即可"}
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              {isEnglish
                ? "EudTech will help identify the data, systems, site conditions, owners, and acceptance criteria needed for the next step."
                : "EudTech 會協助確認下一步需要的資料、系統、場地條件、負責人與驗收標準。"}
            </p>
          </div>
          <ActionLink href="/contact">
            {isEnglish ? "Contact EudTech" : "聯絡 EudTech"}
          </ActionLink>
        </div>
      </section>
    </PageShell>
  );
};
export default AboutPage;
