import React from 'react';
import { Check, Cpu, FileText, Settings2 } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { ActionLink, CheckList, PageHero, PageShell, tx } from './SitePagePrimitives';

const AiInfrastructureSolutionPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const stages = [
    { icon: Cpu, title: { zh: '工作負載', en: 'Workload' }, body: { zh: '釐清訓練、推論、HPC、模擬、渲染或視覺化需求，以及使用者數量、模型大小與執行時間。', en: 'Clarify training, inference, HPC, simulation, rendering, or visualization requirements, users, model size, and run time.' } },
    { icon: Settings2, title: { zh: '選型', en: 'Selection' }, body: { zh: '比較 GPU 數量、GPU 記憶體、CPU、RAM、NVMe、網路、機架或工作站型態。', en: 'Compare GPU count and memory, CPU, RAM, NVMe, networking, and rack or workstation form factor.' } },
    { icon: FileText, title: { zh: '配置', en: 'Configuration' }, body: { zh: '使用 Comino 配置器保留可分享的配置連結，讓技術與採購共同審查。', en: 'Use the Comino configurator to retain a shareable build for technical and procurement review.' } },
    { icon: Check, title: { zh: '報價與導入', en: 'Quote and delivery' }, body: { zh: 'EudTech 依實際配置確認供貨、價格、部署條件與導入後的支援範圍。', en: 'EudTech confirms availability, price, deployment conditions, and post-delivery support from the actual build.' } }
  ];
  return <PageShell title={{ zh: 'AI 運算基礎設施｜EudTech', en: 'AI infrastructure | EudTech' }} description={{ zh: '從工作負載、選型、配置到報價與導入，建立可採購的 AI GPU 運算基礎設施。', en: 'Build quote-ready AI GPU infrastructure from workload discovery through selection, configuration, quote, and delivery.' }} path="/solutions/ai-infrastructure">
    <PageHero eyebrow={{ zh: 'AI 運算基礎設施', en: 'AI infrastructure' }} title={{ zh: '先定義工作負載，再決定設備', en: 'Define the workload before choosing the system' }} lead={{ zh: 'EudTech 協助研究室、企業與公部門把運算需求轉成可審查、可配置、可詢價的 GPU 伺服器或工作站方案。', en: 'EudTech helps labs, enterprises, and public-sector teams turn compute requirements into reviewable, configurable, and quote-ready GPU server or workstation plans.' }} isEnglish={isEnglish} actions={<><ActionLink href="/configurator?request=true">{isEnglish ? 'Open configurator' : '開啟配置器'}</ActionLink><ActionLink href="/contact" secondary>{isEnglish ? 'Discuss a workload' : '討論工作負載'}</ActionLink></>} />
    <section className="py-20"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{stages.map(({ icon: Icon, title, body }, index) => <article key={tx(title, isEnglish)} className="relative rounded-2xl border border-slate-200 p-6 dark:border-slate-800"><span className="text-sm font-semibold text-cyan-600 dark:text-cyan-300">0{index + 1}</span><Icon className="mt-6 h-7 w-7 text-cyan-600 dark:text-cyan-300" /><h2 className="mt-5 text-xl font-semibold">{tx(title, isEnglish)}</h2><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(body, isEnglish)}</p></article>)}</div></div></section>
    <section className="bg-slate-50 py-20 dark:bg-slate-900/60"><div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8"><div><h2 className="text-3xl font-bold">{isEnglish ? 'What the delivery review covers' : '導入審查包含哪些內容'}</h2><p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'The quote is built from the workload and deployment context, not from an isolated GPU model.' : '報價會從工作負載與部署脈絡建立，不會只以單一 GPU 型號決定。'}</p></div><CheckList isEnglish={isEnglish} items={[{ zh: 'GPU 數量、型號與記憶體容量', en: 'GPU count, model, and memory capacity' }, { zh: 'CPU、系統記憶體、NVMe 與網路', en: 'CPU, system memory, NVMe, and networking' }, { zh: '工作站、機架式與液冷部署型態', en: 'Workstation, rackable, and liquid-cooled deployment' }, { zh: '台灣採購、安裝、驗收與支援條件', en: 'Taiwan procurement, installation, acceptance, and support conditions' }]} /></div></section>
  </PageShell>;
};
export default AiInfrastructureSolutionPage;
