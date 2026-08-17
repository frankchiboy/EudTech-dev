import React from 'react';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeBrandPartnersSectionProps { isEnglish: boolean; }

const HomeBrandPartnersSection: React.FC<HomeBrandPartnersSectionProps> = ({ isEnglish }) => {
  const technologies = [
    { name: 'NVIDIA', logo: '/nvidia-logo-modified.png' },
    { name: 'AMD', logo: '/amd-logo.png' },
    { name: 'PyTorch', logo: '/pytorch-logo.png' },
    { name: 'TensorFlow', logo: '/tensorflow-logo.png' },
    { name: 'Keras', logo: '/keras-logo.png' },
  ];

  return (
    <section className="border-t border-slate-200 bg-white py-20 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-white" aria-labelledby="home-partners-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">{isEnglish ? 'EudTech × specialist platforms' : 'EudTech × 專業品牌平台'}</p>
            <h2 id="home-partners-heading" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Official technology paths, delivered with local accountability.' : '原廠技術路徑，由 EudTech 負責在地交付。'}</h2>
            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'Detailed product evidence, cases, and technical sources remain on each solution page. The homepage keeps the partnership relationship and the links required to verify it.' : '完整產品證據、案例與技術資料已移到各解決方案專頁；首頁保留合作關係、品牌辨識與必要查證連結。'}</p>
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            <article className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-900">
              <img src="/vendor/comino/sales-kit-0911/comino-x-eudtech.webp" alt={isEnglish ? 'COMINO × EudTech partnership visual from Sales Kit 0911' : 'Sales Kit 0911 的 COMINO × EudTech 合作視覺'} className="mb-6 aspect-video w-full rounded-xl object-cover" loading="eager" decoding="async" fetchPriority="high" />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2"><img src="/logo.svg" alt="EudTech" className="h-9 w-auto max-w-full" loading="eager" decoding="async" fetchPriority="high" /><span className="text-2xl font-light text-slate-400">×</span><img src="/comino-grando-logo.png" alt="Comino GRANDO" className="h-11 w-auto max-w-full rounded bg-slate-900 p-2" loading="eager" decoding="async" fetchPriority="high" /></div>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300"><BadgeCheck className="h-5 w-5" />{isEnglish ? 'Authorised Comino distribution' : 'Comino 授權經銷'}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{isEnglish ? 'Liquid-cooled multi-GPU workstations and servers, configured for Taiwan procurement and acceptance.' : '液冷多 GPU 工作站與伺服器，依台灣採購、安裝與驗收需求完成配置。'}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold"><Link to="/solutions/ai-infrastructure" className="text-cyan-700 dark:text-cyan-300">{isEnglish ? 'View solution →' : '查看解決方案 →'}</Link><a href="https://www.comino.com/en/company" target="_blank" rel="noreferrer" className="inline-flex items-center text-slate-600 hover:text-cyan-700 dark:text-slate-300">{isEnglish ? 'Comino partner list' : 'Comino Partner List'}<ArrowUpRight className="ml-1 h-4 w-4" /></a></div>
            </article>
            <article className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2"><img src="/logo.svg" alt="EudTech" className="h-9 w-auto max-w-full" loading="eager" decoding="async" fetchPriority="high" /><span className="text-2xl font-light text-slate-400">×</span><img src="/cyabra-logo.svg" alt="Cyabra" className="h-11 w-auto max-w-full object-contain" loading="eager" decoding="async" fetchPriority="high" /></div>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-violet-700 dark:text-violet-300"><BadgeCheck className="h-5 w-5" />{isEnglish ? 'Cyabra solution delivery' : 'Cyabra 解決方案合作'}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{isEnglish ? 'Profile authenticity, narrative, coordinated activity, and reputation-risk analysis.' : '帳號真實性、敘事、協調式活動與品牌聲譽風險分析。'}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold"><Link to="/solutions/social-intelligence" className="text-cyan-700 dark:text-cyan-300">{isEnglish ? 'View solution →' : '查看解決方案 →'}</Link><a href="https://cyabra.com/become-a-partner/" target="_blank" rel="noreferrer" className="inline-flex items-center text-slate-600 hover:text-cyan-700 dark:text-slate-300">{isEnglish ? 'Cyabra partner program' : 'Cyabra Partner Program'}<ArrowUpRight className="ml-1 h-4 w-4" /></a></div>
            </article>
          </div>
        </div>
        <div className="mt-14 rounded-2xl border border-slate-200 px-6 py-8 dark:border-slate-800">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{isEnglish ? 'Compatible technology ecosystem' : '相容技術生態'}</p>
          <div className="mt-7 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {technologies.map((item) => (
              <div key={item.name} className="group flex h-20 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-white dark:shadow-none">
                <img src={item.logo} alt={item.name} loading="eager" decoding="async" className="max-h-11 max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBrandPartnersSection;
