import React from 'react';
import { ArrowDown, ArrowRight, Blocks, Bot, Braces, LayoutDashboard, ShieldCheck, Webhook } from 'lucide-react';

interface HeadlessSaasVisualProps {
  isEnglish: boolean;
  compact?: boolean;
}

const HeadlessSaasVisual: React.FC<HeadlessSaasVisualProps> = ({ isEnglish, compact = false }) => {
  const nodes = [
    {
      icon: Blocks,
      eyebrow: isEnglish ? 'CONTENT & WORK' : '內容與協作',
      title: isEnglish ? 'Existing systems and data' : '既有系統與資料',
      body: isEnglish ? 'ERP, CRM, Microsoft 365, databases, and APIs' : 'ERP、CRM、Microsoft 365、資料庫與 API',
      tone: 'border-slate-300 bg-white text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white'
    },
    {
      icon: Webhook,
      eyebrow: isEnglish ? 'EVENT & API' : '事件與 API',
      title: isEnglish ? 'Secure integration' : '安全整合層',
      body: isEnglish ? 'OAuth, webhooks, validation, and idempotency' : 'OAuth、Webhook、驗證與去重',
      tone: 'border-cyan-300/50 bg-cyan-50 text-slate-950 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-white'
    },
    {
      icon: ShieldCheck,
      eyebrow: isEnglish ? 'EUDTECH CONTROL' : 'EUDTECH 控制層',
      title: isEnglish ? 'Policy and AI actions' : '政策與 AI 動作',
      body: isEnglish ? 'Permissions, approvals, tools, audit, and monitoring' : '權限、核准、工具、稽核與監測',
      tone: 'border-emerald-300/50 bg-emerald-50 text-slate-950 dark:border-emerald-300/30 dark:bg-emerald-300/10 dark:text-white'
    },
    {
      icon: LayoutDashboard,
      eyebrow: isEnglish ? 'BRANDED EXPERIENCE' : '品牌化體驗',
      title: isEnglish ? 'Portal / website / agent' : 'Portal／網站／Agent',
      body: isEnglish ? 'A customer-facing experience under your brand' : '以企業品牌呈現的客戶入口',
      tone: 'border-violet-300/50 bg-violet-50 text-slate-950 dark:border-violet-300/30 dark:bg-violet-300/10 dark:text-white'
    }
  ];

  return (
    <div className={`rounded-3xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] ${compact ? 'p-4 sm:p-5' : 'p-5 sm:p-7'}`}>
      <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
        {nodes.map(({ icon: Icon, eyebrow, title, body, tone }, index) => (
          <React.Fragment key={title}>
            <div className={`rounded-2xl border ${tone} ${compact ? 'p-4' : 'p-5'}`}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-cyan-300 dark:bg-white/10">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-65">{eyebrow}</p>
              </div>
              <h3 className="mt-4 text-base font-bold leading-6">{title}</h3>
              {!compact && <p className="mt-2 text-xs leading-6 opacity-75">{body}</p>}
            </div>
            {index < nodes.length - 1 && (
              <div className="flex items-center justify-center text-cyan-600 dark:text-cyan-300" aria-hidden="true">
                <ArrowDown className="h-5 w-5 lg:hidden" />
                <ArrowRight className="hidden h-5 w-5 lg:block" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {!compact && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300">
            <Braces className="h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-300" />
            {isEnglish ? 'The integration uses authorised APIs—not page scraping.' : '整合使用已授權 API，不依賴網頁擷取。'}
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300">
            <Bot className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
            {isEnglish ? 'Sensitive writes can require human approval.' : '敏感寫回可設定為必須經人員核准。'}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadlessSaasVisual;
