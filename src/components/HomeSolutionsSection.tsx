import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeSolutionsSectionProps { isEnglish: boolean; }

const HomeSolutionsSection: React.FC<HomeSolutionsSectionProps> = ({ isEnglish }) => {
  const items = [
    { visual: '/vendor/pqc/hung-jr-shiu.png', href: '/solutions/pqc', title: isEnglish ? 'PQC migration advisory' : 'PQC 後量子密碼導入', body: isEnglish ? 'Meet the experts behind your cryptographic inventory, architecture pilots, and phased migration. Explore academic backgrounds and research evidence.' : '由專家研究背景支撐密碼資產盤點、架構試點與分階段遷移。先認識團隊、學術專長與研究依據。', color: 'hover:border-cyan-400/60' },
    { visual: '/aws-cloud-services.svg', href: '/solutions/aws', title: isEnglish ? 'AWS cloud sales' : 'AWS 雲端銷售服務', body: isEnglish ? 'Plan compute, storage, databases, and generative AI. Bring service selection, quotes, and deployment into one clear plan.' : '從運算、儲存、資料庫到生成式 AI，整合 AWS 服務選型、採購報價與導入規劃。', color: 'hover:border-orange-300/60' },
    { visual: '/ai-agent/micro-illustrations/connected-systems-v1.webp', href: '/solutions/ai-infrastructure', title: isEnglish ? 'AI infrastructure' : 'AI 運算基礎設施', body: isEnglish ? 'Align workload, GPU, memory, cooling, and deployment conditions before the quote request. The output is a quote-ready configuration and a requirement record.' : '先對齊工作負載、GPU、記憶體、散熱與部署條件，再送出詢價。輸出可報價的配置與需求紀錄。', color: 'hover:border-emerald-300/60' },
    { visual: '/ai-agent/micro-illustrations/governance-audit-v1.webp', href: '/solutions/social-intelligence', title: isEnglish ? 'Social intelligence' : '社群情報', body: isEnglish ? 'Use Cyabra to identify fake profiles, coordinated narratives, and reputation risk. Suited to brand, communications, security, and public-sector teams.' : '用 Cyabra 辨識假帳號、協調式敘事與品牌聲譽風險。適合品牌、公關、資安與公部門團隊。', color: 'hover:border-violet-300/60' }
  ];
  const deliverySteps = [
    { visual: '/ai-agent/micro-illustrations/event-intake-v1.webp', n: '01', title: isEnglish ? 'Define the real problem' : '定義實際問題', body: isEnglish ? 'Confirm the users, workload, data, systems, site conditions, and decision owner.' : '確認使用者、工作負載、資料、系統、場地條件與決策負責人。' },
    { visual: '/ai-agent/micro-illustrations/human-approval-v1.webp', n: '02', title: isEnglish ? 'Design a verifiable scope' : '設計可驗證範圍', body: isEnglish ? 'Write down sources, permissions, approval points, deliverables, and acceptance criteria.' : '寫明來源、權限、核准點、交付物與驗收條件。' },
    { visual: '/ai-agent/micro-illustrations/connected-systems-v1.webp', n: '03', title: isEnglish ? 'Pilot with real evidence' : '用真實證據試點', body: isEnglish ? 'Run the complete path with real or de-identified cases. Keep a record of every decision.' : '用真實或去識別的案例跑完整流程。保留每一個決策紀錄。' },
    { visual: '/ai-agent/micro-illustrations/governance-audit-v1.webp', n: '04', title: isEnglish ? 'Accept, operate, and expand' : '驗收、維運與擴充', body: isEnglish ? 'Confirm the result, ownership, monitoring, and support boundary first. Expand only after that.' : '先確認成果、責任、監測與支援邊界，再擴充範圍。' },
  ];

  return (
    <section className="bg-white py-20 text-slate-950 dark:bg-slate-950 dark:text-white" aria-labelledby="home-solutions-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">{isEnglish ? 'Start with the problem to solve' : '先從要解決的問題開始'}</p>
          <h2 id="home-solutions-heading" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Four solution paths, one accountable delivery model' : '四條方案路徑，同一套可查核的交付方式'}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'Choose the problem you need to solve. EudTech then defines the data, systems, approval points, and measurable next step.' : '先選一個要解決的問題。EudTech 再定義資料、系統、核准點與可量化的下一步。'}</p>
          <p data-home-hero-relationship className="mt-4 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-7 text-slate-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-slate-200">{isEnglish ? 'The hero above introduces EudTech as one delivery partner. The four paths below are the entry points for AWS cloud sales, AI infrastructure procurement, social intelligence, and PQC migration.' : '上方主視覺說明 EudTech 是同一個交付夥伴。以下四條路徑分別對應 AWS 雲端銷售、AI 運算設備採購、社群情報與 PQC 導入。'}</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map(({ visual, href, title, body, color }) => (
            <Link key={href} to={href} className={`group rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 ${color} hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:focus:ring-cyan-300`}>
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.07]" aria-hidden="true"><img src={visual} alt="" className="h-14 w-14 object-contain" loading="lazy" decoding="async" /></div>
              <h3 className="mt-7 text-xl font-semibold">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:min-h-[112px]">{body}</p>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-cyan-700 dark:text-cyan-300">{isEnglish ? 'View solution' : '查看方案'}<ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
        <div className="mt-20 border-t border-slate-200 pt-16 dark:border-white/10">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">{isEnglish ? 'A delivery model you can inspect' : '可以逐項查核的交付方式'}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">{isEnglish ? 'From requirement to evidence, every stage has an owner' : '從需求到證據，每個階段都有負責人'}</h2>
              <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'A demo is not completion. Acceptance covers the source, decision, approval, test result, and operating boundary.' : '展示畫面不等於完成。驗收會包含來源、決策、核准、測試結果與維運邊界。'}</p>
              <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-300/20 dark:bg-emerald-300/10">
                <ShieldCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-300" />
                <p className="mt-4 font-semibold">{isEnglish ? 'Suggested acceptance evidence' : '建議驗收證據'}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{isEnglish ? 'Source records, version, approver, execution result, exception handling, and support owner.' : '來源紀錄、版本、核准者、執行結果、例外處理與維運負責人。'}</p>
              </div>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {deliverySteps.map(({ visual, n, title, body }) => (
                <li key={n} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[0.2em] text-cyan-700 dark:text-cyan-300">{n}</span><div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.07]" aria-hidden="true"><img src={visual} alt="" className="h-12 w-12 object-contain" loading="lazy" decoding="async" /></div></div>
                  <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <article className="mt-16 grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] lg:grid-cols-[0.42fr_1fr]">
          <div className="relative min-h-52 overflow-hidden bg-slate-900">
            <img src="/brand-provenance/eudtech-brand-procurement.webp" alt={isEnglish ? 'GPU procurement review and acceptance planning' : 'GPU 採購審查與驗收規劃'} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/85 via-slate-950/30 to-cyan-900/20" aria-hidden="true" />
          </div>
          <div className="p-7 sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">{isEnglish ? 'Anonymised procurement example' : '匿名採購需求案例'}</p>
            <h2 className="mt-4 text-2xl font-bold">{isEnglish ? 'Six independent GPU workloads with sustained cooling requirements' : '六張 GPU 獨立運算與長時間散熱需求'}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{isEnglish ? 'The request separated GPU independence, NVLink assumptions, sustained operation, cooling, and stability before any platform choice. The output was a reviewable requirement record and a formal quote path, not an unverified product promise.' : '先拆解 GPU 獨立運作、NVLink 假設、連續運轉、散熱與穩定性，再選機型。輸出是可審查的需求紀錄與正式報價路徑，不做未驗證的產品承諾。'}</p>
            <Link to="/solutions/ai-server-procurement-case-taiwan" className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-700 dark:text-cyan-300">{isEnglish ? 'Read the decision record' : '查看決策紀錄'}<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
        </article>
        <div className="mt-16 flex flex-col gap-5 rounded-2xl bg-cyan-400 px-7 py-8 text-slate-950 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-2xl font-bold">{isEnglish ? 'Bring one concrete problem to the first conversation' : '第一次討論，帶一個具體問題即可'}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-800">{isEnglish ? 'EudTech will define the first reviewable deliverable and the evidence needed to accept it.' : 'EudTech 會定義第一個可審查的交付物，以及驗收所需的證據。'}</p></div>
          <Link to="/contact" className="inline-flex shrink-0 items-center justify-center rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">{isEnglish ? 'Book a consultation' : '預約諮詢'}<ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
};

export default HomeSolutionsSection;
