import React from 'react';
import { ArrowRight, Bot, Cpu, Radar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeSolutionsSectionProps { isEnglish: boolean; }

const HomeSolutionsSection: React.FC<HomeSolutionsSectionProps> = ({ isEnglish }) => {
  const items = [
    { icon: Bot, href: '/solutions/ai-agent', title: isEnglish ? 'AI Agent implementation' : 'AI Agent 導入', body: isEnglish ? 'Turn email, ERP, CRM, and project work into event-driven follow-up with human approval.' : '把郵件、ERP、CRM 與專案工作轉成事件驅動追蹤，重要動作保留人員核准。', accent: 'cyan', color: 'bg-cyan-400/15 text-cyan-300 hover:border-cyan-300/60' },
    { icon: Cpu, href: '/solutions/ai-infrastructure', title: isEnglish ? 'AI infrastructure' : 'AI 運算基礎設施', body: isEnglish ? 'Match workload, GPU, memory, cooling, and deployment requirements before a quote.' : '在詢價前對齊工作負載、GPU、記憶體、散熱與部署條件。', accent: 'emerald', color: 'bg-emerald-400/15 text-emerald-300 hover:border-emerald-300/60' },
    { icon: Radar, href: '/solutions/social-intelligence', title: isEnglish ? 'Social intelligence' : '社群情報', body: isEnglish ? 'Use Cyabra to identify coordinated narratives, fake profiles, and reputation risk.' : '使用 Cyabra 辨識協調式敘事、假帳號與品牌聲譽風險。', accent: 'violet', color: 'bg-violet-400/15 text-violet-300 hover:border-violet-300/60' }
  ];

  return (
    <section className="bg-slate-950 py-20 text-white" aria-labelledby="home-solutions-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">{isEnglish ? 'Start with the business outcome' : '先從實際成果開始'}</p>
          <h2 id="home-solutions-heading" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'Three solution paths, one accountable delivery model' : '三條解決方案路徑，同一套可追蹤交付方式'}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">{isEnglish ? 'Choose the problem you need to solve. EudTech then defines the data, systems, approvals, and measurable next step.' : '先選擇需要解決的問題，再由 EudTech 定義資料、系統、核准點與可量化的下一步。'}</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {items.map(({ icon: Icon, href, title, body, color }) => (
            <Link key={href} to={href} className={`group rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 ${color} hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-cyan-300`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-7 text-xl font-semibold">{title}</h3>
              <p className="mt-4 min-h-[96px] text-sm leading-7 text-slate-300">{body}</p>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-cyan-300">{isEnglish ? 'View solution' : '查看方案'}<ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSolutionsSection;
