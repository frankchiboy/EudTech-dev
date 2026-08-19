import React from 'react';
import { ArrowDown, ArrowRight, Bot, Braces, Database, ShieldCheck, Webhook } from 'lucide-react';

interface HeadlessSaasVisualProps {
  isEnglish: boolean;
  compact?: boolean;
}

const HeadlessSaasVisual: React.FC<HeadlessSaasVisualProps> = ({ isEnglish, compact = false }) => {
  const nodes = [
    {
      icon: Bot,
      eyebrow: isEnglish ? 'AI INTERFACE' : 'AI 使用介面',
      title: isEnglish ? 'ChatGPT / Claude' : 'ChatGPT／Claude',
      body: isEnglish ? 'The AI tools employees already use' : '員工直接使用既有 AI 工作介面',
      tone: 'border-violet-300/50 bg-violet-50 text-slate-950 dark:border-violet-300/30 dark:bg-violet-300/10 dark:text-white'
    },
    {
      icon: Webhook,
      eyebrow: isEnglish ? 'REMOTE MCP' : 'REMOTE MCP',
      title: isEnglish ? 'EudTech MCP Gateway' : 'EudTech MCP Gateway',
      body: isEnglish ? 'A standard connection for enterprise tools and data' : '以標準協議連接企業資料與工具',
      tone: 'border-cyan-300/50 bg-cyan-50 text-slate-950 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-white'
    },
    {
      icon: ShieldCheck,
      eyebrow: isEnglish ? 'EUDTECH AGENT SOR' : 'EUDTECH AGENT SOR',
      title: isEnglish ? 'System of Record + Action Layer' : 'System of Record + Action Layer',
      body: isEnglish ? 'Identity, permissions, workflow, approvals, actions, memory references, and audit evidence' : '身分、權限、流程、核准、Action、記憶索引與稽核證據',
      tone: 'border-emerald-300/50 bg-emerald-50 text-slate-950 dark:border-emerald-300/30 dark:bg-emerald-300/10 dark:text-white'
    },
    {
      icon: Database,
      eyebrow: isEnglish ? 'BUSINESS SYSTEMS' : '企業正式系統',
      title: isEnglish ? 'ERP / CRM / Email / DB' : 'ERP／CRM／Email／DB',
      body: isEnglish ? 'Authoritative business records remain in the systems that already own them' : '正式業務資料仍留在原本負責的企業系統',
      tone: 'border-slate-300 bg-white text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white'
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
            {isEnglish ? 'No new chatbot UI is required: ChatGPT or Claude can remain the front end.' : '不需要再做一個聊天介面：ChatGPT 或 Claude 就是前台。'}
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
            {isEnglish ? 'Every sensitive write can pass policy, approval, and audit before execution.' : '敏感寫回在執行前可經過政策、核准與完整稽核。'}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadlessSaasVisual;