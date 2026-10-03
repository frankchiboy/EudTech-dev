import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeSolutionsSectionProps { isEnglish: boolean; }

const HomeSolutionsSection: React.FC<HomeSolutionsSectionProps> = ({ isEnglish }) => {
  const items = [
    {
      brand: 'EUDTECH',
      visual: '/ai-agent/micro-illustrations/task-progression-v1.webp',
      href: '/solutions/ai-agent',
      service: isEnglish ? 'AI agents & headless SaaS' : 'AI Agent 與 Headless SaaS',
      title: isEnglish ? 'Make your business workflows work together' : '讓跨系統工作流程真正跑起來',
      body: isEnglish ? 'Connect ERP, CRM, Microsoft 365, and existing APIs. Bring data, tasks, and human approval into one workflow.' : '串接 ERP、CRM、Microsoft 365 與既有 API，將資料、任務與人員核准整合到同一條工作流程。',
      action: isEnglish ? 'Explore workflow solutions' : '探索工作流程方案',
    },
    {
      brand: 'COMINO',
      visual: '/ai-agent/micro-illustrations/connected-systems-v1.webp',
      href: '/solutions/ai-infrastructure',
      service: isEnglish ? 'AI infrastructure' : 'AI 運算基礎設施',
      title: isEnglish ? 'Find the GPU configuration for your workload' : '找到適合工作負載的 GPU 配置',
      body: isEnglish ? 'Align GPUs, memory, cooling, and deployment conditions with your workload, then prepare a configuration and quote request.' : '先對齊工作負載、GPU、記憶體、散熱與部署條件，再建立配置與詢價需求。',
      action: isEnglish ? 'Explore infrastructure' : '探索運算設備方案',
    },
    {
      brand: 'CYABRA',
      visual: '/ai-agent/micro-illustrations/governance-audit-v1.webp',
      href: '/solutions/social-intelligence',
      service: isEnglish ? 'Social intelligence' : '社群情報',
      title: isEnglish ? 'See the signals behind social narratives' : '看清社群敘事背後的真實訊號',
      body: isEnglish ? 'Use Cyabra to identify fake profiles and coordinated narratives. Help communications, brand, and security teams assess social risks.' : '用 Cyabra 辨識假帳號與協調式敘事，協助品牌、公關與資安團隊評估社群風險。',
      action: isEnglish ? 'Explore social intelligence' : '探索社群情報方案',
    },
  ];

  return (
    <section className="bg-slate-50 py-16 text-slate-950 dark:bg-slate-950 dark:text-white sm:py-24" aria-labelledby="home-solutions-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">{isEnglish ? 'Solutions for your next step' : '服務與方案'}</p>
            <h2 id="home-solutions-heading" className="scroll-mt-24 mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl sm:leading-snug">{isEnglish ? 'Start with what you need to achieve' : '從你的需求，找到下一步'}</h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-slate-600 dark:text-slate-300">{isEnglish ? 'Explore the path that fits your team, from connected workflows to compute and social intelligence.' : '從工作流程、運算設備到社群情報，選擇適合團隊的方案入口。'}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map(({ brand, visual, href, service, title, body, action }) => (
            <Link key={href} to={href} className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-cyan-600 hover:bg-cyan-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-4 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-cyan-400 dark:hover:bg-slate-800 dark:focus-visible:ring-cyan-300 dark:focus-visible:ring-offset-slate-950 lg:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">{brand}</span>
                <img src={visual} alt="" aria-hidden="true" width="72" height="72" className="h-[72px] w-[72px] object-contain" loading="lazy" decoding="async" />
              </div>
              <p className="mt-6 text-xs font-semibold leading-6 text-cyan-800 dark:text-cyan-300">{service}</p>
              <h3 className="mt-2 text-2xl font-semibold leading-snug tracking-tight">{title}</h3>
              <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{body}</p>
              <div className="mt-auto pt-7">
                <span className="flex min-h-11 items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm font-semibold text-slate-900 dark:border-slate-800 dark:text-white">{action}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" /></span>
              </div>
            </Link>
          ))}
        </div>

        <article className="mt-10 grid overflow-hidden rounded-2xl bg-slate-900 text-white lg:grid-cols-[1.3fr_0.7fr]" aria-labelledby="home-configurator-heading">
          <div className="p-7 sm:p-10 lg:pr-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{isEnglish ? 'Comino GPU configurator' : 'Comino GPU 配置工具'}</p>
            <h2 id="home-configurator-heading" className="scroll-mt-24 mt-4 max-w-2xl text-2xl font-bold leading-snug tracking-tight sm:text-3xl">{isEnglish ? 'Turn your workload into a configuration' : '從工作負載開始，配置你的運算設備'}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">{isEnglish ? 'Explore platform, GPU, and memory options, then send your selected configuration for a quote.' : '比較機型、GPU 與記憶體選項，整理需求後，直接以選定配置提出詢價。'}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <Link to="/configurator?request=true" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900">{isEnglish ? 'Configure & request a quote' : '配置 GPU 與詢價'}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to="/solutions/ai-server-procurement-case-taiwan" className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-white underline decoration-slate-500 underline-offset-4 hover:decoration-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900">{isEnglish ? 'GPU procurement guide' : 'GPU 選型與採購指南'}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
            </div>
            <p className="mt-5 text-xs leading-6 text-slate-400">{isEnglish ? 'Availability, compatibility, and pricing are confirmed in the formal quote.' : '供貨、相容性與價格，以正式報價確認。'}</p>
          </div>
          <figure className="flex min-w-0 flex-col items-center justify-center px-7 pb-7 lg:p-7">
            <img src="/vendor/comino/grando-workstation-closed.webp" alt={isEnglish ? 'Comino GRANDO deskside workstation chassis' : 'Comino GRANDO 桌邊工作站機箱'} width="800" height="816" className="h-48 w-full max-w-sm object-contain sm:h-56" loading="lazy" decoding="async" />
            <figcaption className="mt-2 text-center text-xs leading-6 text-slate-400"><a href="https://www.comino.com/en/ai-configurator" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 rounded-sm underline decoration-slate-600 underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">{isEnglish ? 'Manufacturer image · Comino GRANDO' : '原廠產品圖片 · Comino GRANDO'}<ArrowUpRight aria-hidden="true" className="h-3 w-3 shrink-0" /></a></figcaption>
          </figure>
        </article>
      </div>
    </section>
  );
};

export default HomeSolutionsSection;
