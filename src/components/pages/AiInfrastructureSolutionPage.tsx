import React from 'react';
import { Check, Cpu, FileText, Gauge, HardDrive, Network, Settings2, ThermometerSun } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { VENDOR_EVIDENCE } from '../../data/vendorEvidence';
import { ActionLink, CheckList, PageHero, PageShell, SourceLink, tx, VendorMedia } from './SitePagePrimitives';

const AiInfrastructureSolutionPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const stages = [
    { icon: Cpu, title: { zh: '工作負載', en: 'Workload' }, body: { zh: '盤點訓練、推論、HPC、模擬、渲染或視覺化需求，以及模型大小、使用者數量與連續執行時間。', en: 'Map training, inference, HPC, simulation, rendering, or visualization needs, including model size, user count, and sustained run time.' } },
    { icon: Settings2, title: { zh: '工程選型', en: 'Engineering selection' }, body: { zh: '依 GPU 記憶體、CPU 核心、RAM、儲存、網路、噪音、機架空間與供電條件建立候選配置。', en: 'Build candidate configurations from GPU memory, CPU cores, RAM, storage, network, noise, rack, and power requirements.' } },
    { icon: FileText, title: { zh: '配置確認', en: 'Configuration review' }, body: { zh: '保留可分享的配置連結與版本，讓使用端、資訊端與採購端審查同一份規格。', en: 'Preserve a shareable configuration and version so users, IT, and procurement review the same specification.' } },
    { icon: Check, title: { zh: '報價與驗收', en: 'Quote and acceptance' }, body: { zh: '確認供貨、價格、安裝條件、壓力測試、文件與導入後支援，再形成正式報價與驗收項目。', en: 'Confirm availability, price, installation, stress testing, documentation, and support before issuing the formal quote and acceptance plan.' } }
  ];
  const configurations = [
    {
      title: { zh: '安靜型 AI 工作站', en: 'Quiet AI workstation' },
      body: { zh: '適合模型開發、推論、工程模擬與需要放置在辦公或實驗環境的團隊。', en: 'For model development, inference, engineering simulation, and teams operating in office or lab environments.' },
      facts: [
        { zh: '原廠目前熱門方向：2 張 GeForce RTX 5090', en: 'Current popular vendor direction: 2× GeForce RTX 5090' },
        { zh: 'AMD Threadripper PRO 平台', en: 'AMD Threadripper PRO platform' },
        { zh: '256GB 或 512GB 系統記憶體與雙 NVMe', en: '256GB or 512GB system memory with dual NVMe' }
      ]
    },
    {
      title: { zh: '高密度 AI 伺服器', en: 'High-density AI server' },
      body: { zh: '適合多使用者推論、訓練、算力服務與需要機架、遠端管理及備援電源的環境。', en: 'For multi-user inference, training, compute services, and environments that require rack mounting, remote management, and redundant power.' },
      facts: [
        { zh: '原廠目前熱門方向：4、6 或 8 張 RTX PRO 6000 Blackwell', en: 'Current popular vendor direction: 4, 6, or 8× RTX PRO 6000 Blackwell' },
        { zh: '每張 RTX PRO 6000 Blackwell 配備 96GB GDDR7 ECC', en: 'Each RTX PRO 6000 Blackwell provides 96GB GDDR7 ECC' },
        { zh: 'GRANDO Server 為 4U，可依平台支援最多 8 張 GPU', en: 'GRANDO Server is 4U and supports up to 8 GPUs depending on platform' }
      ]
    },
    {
      title: { zh: 'CPU 與資料管線平台', en: 'CPU and data-pipeline platform' },
      body: { zh: '當前處理、模擬、資料載入或多工服務需要大量 CPU 資源時，GPU 之外的整體平台同樣納入評估。', en: 'When preprocessing, simulation, data loading, or concurrent services need substantial CPU resources, the full platform is reviewed alongside GPUs.' },
      facts: [
        { zh: '可依 GRANDO 平台選擇 AMD EPYC 9004／9005、Threadripper PRO 或 Intel Xeon', en: 'GRANDO platform options include AMD EPYC 9004/9005, Threadripper PRO, or Intel Xeon' },
        { zh: 'AMD EPYC 9005 系列最高可達 192 核心', en: 'AMD EPYC 9005 series scales up to 192 cores' },
        { zh: '最終相容性與供貨由實際配置逐項確認', en: 'Final compatibility and availability are validated against the actual configuration' }
      ]
    }
  ];
  const workloads = [
    { icon: Gauge, title: { zh: 'LLM 推論與服務', en: 'LLM inference and serving' }, body: { zh: '以模型權重、量化格式、並行請求與延遲目標估算 GPU 記憶體與張數。', en: 'Estimate GPU memory and count from model weights, quantization, concurrent requests, and latency targets.' } },
    { icon: ThermometerSun, title: { zh: '訓練與微調', en: 'Training and fine-tuning' }, body: { zh: '以批次大小、精度、模型參數與檢查點策略確認 GPU、RAM、NVMe 與散熱需求。', en: 'Use batch size, precision, parameter count, and checkpoint strategy to size GPU, RAM, NVMe, and cooling.' } },
    { icon: Cpu, title: { zh: 'HPC 與工程模擬', en: 'HPC and simulation' }, body: { zh: '確認軟體授權、CPU／GPU 比例、雙精度需求、長時間穩定性與資料交換模式。', en: 'Confirm software licensing, CPU/GPU balance, double-precision needs, sustained stability, and data movement.' } },
    { icon: HardDrive, title: { zh: '渲染與視覺化', en: 'Rendering and visualization' }, body: { zh: '依場景大小、GPU 記憶體、輸出格式、素材容量與多人協作設計儲存及網路。', en: 'Design storage and networking from scene size, GPU memory, output format, assets, and collaboration needs.' } }
  ];

  return <PageShell title={{ zh: 'AI 運算基礎設施｜EudTech', en: 'AI infrastructure | EudTech' }} description={{ zh: '從工作負載、選型、配置到報價與驗收，建立可採購的 Comino 液冷 AI GPU 運算基礎設施。', en: 'Build quote-ready Comino liquid-cooled AI GPU infrastructure from workload discovery through selection, configuration, quote, and acceptance.' }} path="/solutions/ai-infrastructure">
    <PageHero eyebrow={{ zh: 'AI 運算基礎設施', en: 'AI infrastructure' }} title={{ zh: '先定義工作負載，再決定設備', en: 'Define the workload before choosing the system' }} lead={{ zh: 'EudTech 協助研究室、企業與公部門，把模型、模擬與運算需求轉成可審查、可配置、可詢價及可驗收的液冷 GPU 工作站或伺服器方案。', en: 'EudTech helps labs, enterprises, and public-sector teams turn model, simulation, and compute requirements into reviewable, configurable, quote-ready, and testable liquid-cooled GPU workstation or server plans.' }} isEnglish={isEnglish} actions={<><ActionLink href="/configurator?request=true">{isEnglish ? 'Open configurator' : '開啟配置器'}</ActionLink><ActionLink href="/contact" secondary>{isEnglish ? 'Discuss a workload' : '討論工作負載'}</ActionLink></>} />

    <section className="py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <VendorMedia src={VENDOR_EVIDENCE.comino.image} alt={VENDOR_EVIDENCE.comino.imageAlt} caption={{ zh: 'Comino GRANDO Blackwell 多 GPU 液冷系統；圖片由原廠公開產品頁提供。', en: 'Comino GRANDO Blackwell multi-GPU liquid-cooled system; image from the official product page.' }} sourceHref={VENDOR_EVIDENCE.comino.sources.blackwell.href} sourceLabel={VENDOR_EVIDENCE.comino.sources.blackwell.label} isEnglish={isEnglish} />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">Comino GRANDO</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{isEnglish ? 'One chassis, selected around the actual workload' : '同一平台，依實際工作負載選擇配置'}</h2>
          <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'GRANDO combines liquid cooling, multi-GPU density, workstation or server deployment, and current Blackwell configurations. EudTech turns those options into a Taiwan-ready procurement and acceptance plan.' : 'GRANDO 整合液冷、多 GPU 密度、工作站或伺服器部署，以及目前 Blackwell 配置。EudTech 再把原廠選項轉成符合台灣採購、安裝與驗收需求的方案。'}</p>
          <div className="mt-7 grid grid-cols-2 gap-4">
            {[{ value: '4U', label: { zh: 'GRANDO Server 機架空間', en: 'GRANDO Server rack space' } }, { value: '8 GPU', label: { zh: '依平台最高支援', en: 'Platform maximum' } }, { value: '96GB', label: { zh: 'RTX PRO 6000 單卡 ECC 記憶體', en: 'RTX PRO 6000 ECC memory per GPU' } }, { value: '192 cores', label: { zh: 'EPYC 9005 系列最高核心數', en: 'Maximum EPYC 9005 series cores' } }].map((fact) => <div key={fact.value} className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900"><p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">{fact.value}</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{tx(fact.label, isEnglish)}</p></div>)}
          </div>
          <p className="mt-5 text-xs leading-5 text-slate-500 dark:text-slate-400">{isEnglish ? 'Maximum values and popular configurations come from current vendor pages. Final compatibility, pricing, and availability depend on the reviewed configuration.' : '最高值與熱門配置依目前原廠頁面整理；最終相容性、價格與供貨以逐項審查的實際配置為準。'}</p>
        </div>
      </div>
    </section>

    <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">{isEnglish ? 'Current selection directions' : '目前可評估的配置方向'}</p><h2 className="mt-4 text-3xl font-bold tracking-tight">{isEnglish ? 'Choose the operating model before the part list' : '先選運作方式，再建立零件清單'}</h2></div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">{configurations.map((item) => <article key={tx(item.title, isEnglish)} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-950"><h3 className="text-xl font-semibold">{tx(item.title, isEnglish)}</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(item.body, isEnglish)}</p><div className="mt-6"><CheckList items={item.facts} isEnglish={isEnglish} /></div></article>)}</div>
      </div>
    </section>

    <section className="py-20"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="max-w-3xl"><h2 className="text-3xl font-bold tracking-tight">{isEnglish ? 'The workload determines the engineering questions' : '不同工作負載，需要回答不同工程問題'}</h2><p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'The same GPU model can produce a very different system once memory, storage, network, power, noise, and runtime are considered.' : '同一個 GPU 型號，在納入記憶體、儲存、網路、供電、噪音與執行時間後，會形成完全不同的系統配置。'}</p></div><div className="mt-10 grid gap-5 md:grid-cols-2">{workloads.map(({ icon: Icon, title, body }) => <article key={tx(title, isEnglish)} className="rounded-2xl border border-slate-200 p-7 dark:border-slate-800"><Icon className="h-7 w-7 text-cyan-600 dark:text-cyan-300" /><h3 className="mt-5 text-xl font-semibold">{tx(title, isEnglish)}</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(body, isEnglish)}</p></article>)}</div></div></section>

    <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{stages.map(({ icon: Icon, title, body }, index) => <article key={tx(title, isEnglish)} className="relative rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"><span className="text-sm font-semibold text-cyan-600 dark:text-cyan-300">0{index + 1}</span><Icon className="mt-6 h-7 w-7 text-cyan-600 dark:text-cyan-300" /><h2 className="mt-5 text-xl font-semibold">{tx(title, isEnglish)}</h2><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(body, isEnglish)}</p></article>)}</div></div></section>

    <section className="py-20"><div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8"><div><Network className="h-8 w-8 text-cyan-600 dark:text-cyan-300" /><h2 className="mt-5 text-3xl font-bold">{isEnglish ? 'A quote package that can be reviewed and accepted' : '交付可審查、可採購、可驗收的報價資料'}</h2><p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{isEnglish ? 'The final package records requirements, configuration, site conditions, acceptance tests, responsibilities, and support boundaries—not just a price.' : '最終資料會記錄需求、配置、場地條件、驗收測試、責任分工與支援邊界，不只有價格。'}</p><div className="mt-7 flex flex-wrap gap-x-5 gap-y-3"><SourceLink href={VENDOR_EVIDENCE.comino.sources.server.href} label={VENDOR_EVIDENCE.comino.sources.server.label} isEnglish={isEnglish} /><SourceLink href={VENDOR_EVIDENCE.comino.sources.nvidia.href} label={VENDOR_EVIDENCE.comino.sources.nvidia.label} isEnglish={isEnglish} /><SourceLink href={VENDOR_EVIDENCE.comino.sources.amd.href} label={VENDOR_EVIDENCE.comino.sources.amd.label} isEnglish={isEnglish} /></div></div><CheckList isEnglish={isEnglish} items={[{ zh: '需求與假設清單：模型、軟體、使用者與資料規模', en: 'Requirements and assumptions: models, software, users, and data scale' }, { zh: 'GPU、CPU、RAM、NVMe、網路、電源與液冷配置', en: 'GPU, CPU, RAM, NVMe, networking, power, and liquid-cooling configuration' }, { zh: '場地條件：機架、供電、散熱、噪音、搬運與網路', en: 'Site conditions: rack, power, heat, noise, handling, and network' }, { zh: '驗收條件：硬體辨識、燒機、溫度、錯誤紀錄與指定工作負載', en: 'Acceptance: hardware inventory, burn-in, thermals, error logs, and agreed workload' }, { zh: '正式供貨、安裝、文件、教育與後續支援範圍', en: 'Formal supply, installation, documentation, training, and support scope' }]} /></div></section>

    <section className="bg-slate-950 py-16 text-white"><div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div><h2 className="text-3xl font-bold">{isEnglish ? 'Bring the workload. Leave with a reviewable configuration.' : '帶著工作負載來，取得可審查的配置方向'}</h2><p className="mt-3 max-w-2xl leading-7 text-slate-300">{isEnglish ? 'EudTech will confirm the questions that determine GPU memory, count, platform, site conditions, and acceptance.' : 'EudTech 會確認決定 GPU 記憶體、張數、平台、場地條件與驗收方式的關鍵問題。'}</p></div><div className="flex flex-col gap-3 sm:flex-row"><ActionLink href="/configurator?request=true">{isEnglish ? 'Configure a system' : '開始配置系統'}</ActionLink><ActionLink href="/contact" secondary>{isEnglish ? 'Talk to EudTech' : '聯絡 EudTech'}</ActionLink></div></div></section>
  </PageShell>;
};
export default AiInfrastructureSolutionPage;
