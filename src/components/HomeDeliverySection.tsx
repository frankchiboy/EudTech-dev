import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeDeliverySectionProps {
  isEnglish: boolean;
}

const HomeDeliverySection: React.FC<HomeDeliverySectionProps> = ({ isEnglish }) => {
  const steps = [
    {
      number: '01',
      image: '/ai-agent/micro-illustrations/event-intake-v1.webp',
      title: isEnglish ? 'Understand the need' : '了解需求',
      body: isEnglish
        ? 'Clarify the goal, existing systems, and deployment conditions. Agree on the first problem to address.'
        : '釐清目標、既有系統與部署條件，確認優先處理的問題。',
    },
    {
      number: '02',
      image: '/ai-agent/micro-illustrations/reconciliation-v1.webp',
      title: isEnglish ? 'Plan the solution' : '規劃方案',
      body: isEnglish
        ? 'Align the technology, project scope, budget, and deliverables with the requirements.'
        : '依需求對齊適用技術、專案範圍、預算與交付項目。',
    },
    {
      number: '03',
      image: '/ai-agent/micro-illustrations/task-progression-v1.webp',
      title: isEnglish ? 'Pilot and validate' : '試點與驗證',
      body: isEnglish
        ? 'Test the workflow, equipment, or analysis within the agreed scope, then review the next step.'
        : '依約定範圍測試流程、設備或分析結果，再確認下一步。',
    },
    {
      number: '04',
      image: '/ai-agent/micro-illustrations/human-approval-v1.webp',
      title: isEnglish ? 'Deliver and support' : '交付與支援',
      body: isEnglish
        ? 'Review the agreed acceptance criteria and explain the operating guidance and support scope.'
        : '依驗收項目確認成果，說明操作方式與支援範圍。',
    },
  ];

  return (
    <section
      className="border-t border-slate-200 bg-white py-16 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-white sm:py-20"
      aria-labelledby="home-delivery-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">
            {isEnglish ? 'How we work together' : '合作方式'}
          </p>
          <h2 id="home-delivery-heading" className="scroll-mt-24 mt-3 text-3xl font-bold tracking-tight sm:text-4xl sm:leading-snug">
            {isEnglish
              ? 'A clear path from first requirement to deployment'
              : '從第一個需求，走到實際導入'}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
            {isEnglish
              ? 'Agree on the scope, validate the approach, and define the handover so your team knows what to expect at every stage.'
              : '先確認範圍，再驗證方案與交付方式，讓團隊清楚每個階段要確認什麼、會取得什麼。'}
          </p>
        </div>

        <ol className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {steps.map(({ number, image, title, body }) => (
            <li key={number} className="min-w-0 border-t border-slate-200 pt-5 dark:border-slate-800">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold tracking-wider text-cyan-700 dark:text-cyan-300">
                  {number}
                </span>
                <img
                  src={image}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 object-contain"
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-7 rounded-2xl border border-slate-800 bg-slate-950 px-6 py-8 text-white dark:bg-slate-900 sm:px-8 sm:py-10 lg:mt-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:gap-10">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
              {isEnglish
                ? 'Give your next AI project a clear starting point'
                : '讓你的下一個 AI 專案，有清楚的起點'}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              {isEnglish
                ? 'EudTech helps clarify your goals, existing systems, and deployment conditions to plan a practical next step.'
                : 'EudTech 協助釐清目標、現有系統與部署條件，規劃可執行的下一步。'}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {isEnglish ? 'Discuss your project' : '預約需求諮詢'}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
            <Link
              to="/solutions"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg py-3 text-sm font-medium text-slate-300 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {isEnglish ? 'Explore all solutions' : '瀏覽所有解決方案'}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDeliverySection;
