import React from 'react';
import { ArrowRight, ArrowUpRight, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeBrandPartnersSectionProps { isEnglish: boolean; }

const HomeBrandPartnersSection: React.FC<HomeBrandPartnersSectionProps> = ({ isEnglish }) => {
  const technologies = [
    { name: 'NVIDIA', logo: '/nvidia-logo-modified.png', width: 2446, height: 552 },
    { name: 'AMD', logo: '/amd-logo.png', width: 720, height: 172 },
    { name: 'PyTorch', logo: '/pytorch-logo.png', width: 232, height: 232 },
    { name: 'TensorFlow', logo: '/tensorflow-logo.png', width: 274, height: 262 },
    { name: 'Keras', logo: '/keras-logo.png', width: 188, height: 190 },
  ];
  const linkFocus = 'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-4 dark:focus-visible:ring-cyan-300 dark:focus-visible:ring-offset-slate-900';

  return (
    <section className="bg-slate-50 py-16 text-slate-950 dark:bg-slate-950 dark:text-white sm:py-20" aria-labelledby="home-partners-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">{isEnglish ? 'Our platform partners' : '品牌合作夥伴'}</p>
          <h2 id="home-partners-heading" className="scroll-mt-24 mt-4 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl sm:leading-snug">{isEnglish ? 'Specialist platforms. Local integration and support.' : '專業平台，在地整合與支援'}</h2>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'Choose the platform that fits your task, with EudTech helping you define requirements, integrate the solution, and plan support.' : '依你的任務選擇適合的平台，由 EudTech 協助需求評估、方案整合與支援規劃。'}</p>
        </div>

        <div className="mt-9 grid gap-6 md:grid-cols-2">
          <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="flex h-16 items-center gap-3" aria-label="EudTech × Comino GRANDO">
              <img src="/logo.svg" alt="EudTech" width={400} height={100} className="h-auto w-28 shrink-0 rounded bg-white sm:w-32" loading="lazy" decoding="async" />
              <span className="text-xl font-light text-slate-400" aria-hidden="true">×</span>
              <img src="/comino-grando-logo.png" alt="Comino GRANDO" width={1049} height={277} className="h-auto w-28 min-w-0 rounded bg-slate-950 p-1.5 sm:w-32" loading="lazy" decoding="async" />
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-cyan-700 dark:text-cyan-300"><BadgeCheck className="h-4 w-4 shrink-0" aria-hidden="true" />{isEnglish ? 'Listed by Comino as a distribution partner' : 'Comino 原廠經銷夥伴'}</p>
            <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-tight">{isEnglish ? 'Liquid cooling shaped around your workload' : '液冷運算，依你的工作負載配置'}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{isEnglish ? 'Evaluate Comino liquid-cooled workstations and multi-GPU servers against your workload, cooling needs, and deployment conditions.' : '依工作負載、散熱需求與部署條件，評估 Comino 液冷工作站與多 GPU 伺服器。'}</p>
            <div className="mt-auto flex flex-col items-start gap-3 pt-7 text-sm font-semibold sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <Link to="/solutions/ai-infrastructure" className={`inline-flex min-h-11 items-center gap-2 py-1.5 text-cyan-700 transition-colors hover:text-cyan-900 dark:text-cyan-300 dark:hover:text-cyan-200 ${linkFocus}`}>{isEnglish ? 'Explore liquid-cooled systems' : '了解液冷運算方案'}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <a href="https://www.comino.com/en/company" target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center gap-1.5 py-1.5 text-slate-600 transition-colors hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300 ${linkFocus}`}>{isEnglish ? 'Comino partner list' : 'Comino 合作夥伴名單'}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </article>

          <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="flex h-16 items-center gap-3" aria-label="EudTech × Cyabra">
              <img src="/logo.svg" alt="EudTech" width={400} height={100} className="h-auto w-28 shrink-0 rounded bg-white sm:w-32" loading="lazy" decoding="async" />
              <span className="text-xl font-light text-slate-400" aria-hidden="true">×</span>
              <img src="/cyabra-logo.svg" alt="Cyabra" width={136} height={72} className="h-14 w-auto min-w-0 rounded bg-white object-contain px-2" loading="lazy" decoding="async" />
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-cyan-700 dark:text-cyan-300"><BadgeCheck className="h-4 w-4 shrink-0" aria-hidden="true" />{isEnglish ? 'Listed as an official Cyabra partner' : 'Cyabra 官方合作夥伴'}</p>
            <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-tight">{isEnglish ? 'Make informed decisions from social signals' : '把社群訊號轉成判斷依據'}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{isEnglish ? 'Use Cyabra to examine account authenticity, narratives, and coordinated activity when assessing risks to your brand or organisation.' : '用 Cyabra 分析帳號真實性、敘事與協調式活動，評估品牌或組織面臨的社群風險。'}</p>
            <div className="mt-auto flex flex-col items-start gap-3 pt-7 text-sm font-semibold sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <Link to="/solutions/social-intelligence" className={`inline-flex min-h-11 items-center gap-2 py-1.5 text-cyan-700 transition-colors hover:text-cyan-900 dark:text-cyan-300 dark:hover:text-cyan-200 ${linkFocus}`}>{isEnglish ? 'Explore social intelligence' : '了解社群情報方案'}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <a href="https://cyabra.com/become-a-partner/" target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center gap-1.5 py-1.5 text-slate-600 transition-colors hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300 ${linkFocus}`}>{isEnglish ? 'Cyabra partner list' : 'Cyabra 合作夥伴名單'}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </article>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{isEnglish ? 'Compatible technology ecosystem' : '相容技術生態'}</p>
          <div className="mt-5 rounded-xl bg-white px-5 py-6 dark:bg-white/95 sm:px-8">
            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:justify-between">
              {technologies.map((item) => (
                <div key={item.name} className="flex w-24 flex-col items-center gap-3">
                  <img src={item.logo} alt="" width={item.width} height={item.height} loading="lazy" decoding="async" className="h-8 w-auto max-w-full object-contain" />
                  <span className="text-xs font-medium text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBrandPartnersSection;
