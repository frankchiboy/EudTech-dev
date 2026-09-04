import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  FileCheck2,
  GitCompare,
  MessageSquareText,
  Server,
  Settings2,
  Snowflake
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { CONFIGURATOR_SEO_PAGES } from '../../data/configuratorSeoPages';
import { VENDOR_EVIDENCE } from '../../data/vendorEvidence';
import { ActionLink, PageHero, PageShell, SourceLink, tx } from './SitePagePrimitives';

const FEATURED_RESOURCE_SLUGS = [
  'h200-vs-rtx-pro-6000',
  'nvidia-h200-server',
  'liquid-cooling-ai-server-procurement',
  'taiwan-public-procurement-gpu-server'
];

const ResourcesOverviewPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();

  const entryPoints = [
    {
      icon: MessageSquareText,
      eyebrow: { zh: '尚未確定規格', en: 'Need help choosing' },
      title: { zh: '請 EudTech 協助選型', en: 'Ask EudTech to help choose' },
      body: {
        zh: '提供模型、軟體、使用人數、運作時間、場地與預算範圍。EudTech 先協助確認工作站或伺服器方向。',
        en: 'Share the model, software, user count, run time, site, and budget range. EudTech first confirms whether a workstation or a server fits.'
      },
      href: '/contact',
      action: { zh: '開始選型討論', en: 'Start a selection discussion' }
    },
    {
      icon: Settings2,
      eyebrow: { zh: '已知道大致規格', en: 'Already know the rough specification' },
      title: { zh: '直接建立設備配置', en: 'Build a configuration directly' },
      body: {
        zh: '選擇伺服器、可上架工作站、桌面工作站或整合套件，再設定 GPU、CPU、記憶體與儲存。',
        en: 'Choose a server, rackable workstation, desktop workstation, or integration kit, then set the GPU, CPU, memory, and storage.'
      },
      href: '/configurator?request=true',
      action: { zh: '開啟配置器', en: 'Open configurator' }
    },
    {
      icon: ClipboardCheck,
      eyebrow: { zh: '正在準備採購文件', en: 'Preparing procurement documents' },
      title: { zh: '整理 RFQ 與驗收條件', en: 'Prepare the RFQ and acceptance terms' },
      body: {
        zh: '確認規格、供電、散熱、交付、保固、測試與文件要求，讓技術與採購審查同一份需求。',
        en: 'Confirm specification, power, cooling, delivery, warranty, testing, and document requirements so technical and procurement reviewers work from one list.'
      },
      href: '/solutions/gpu-server-rfq-checklist',
      action: { zh: '查看 RFQ 檢核表', en: 'Open the RFQ checklist' }
    }
  ];

  const buyingChecks = [
    {
      n: '01',
      title: { zh: '工作負載', en: 'Workload' },
      body: { zh: '模型、軟體、資料量、使用人數與連續運作時間。', en: 'Models, software, data volume, user count, and continuous run time.' }
    },
    {
      n: '02',
      title: { zh: '部署條件', en: 'Deployment conditions' },
      body: { zh: '桌邊或機架、供電、散熱、噪音、網路與搬運限制。', en: 'Deskside or rack, power, cooling, noise, network, and handling limits.' }
    },
    {
      n: '03',
      title: { zh: '採購條件', en: 'Procurement conditions' },
      body: { zh: '預算、供貨、交期、安裝、保固、付款與必要文件。', en: 'Budget, availability, lead time, installation, warranty, payment, and required documents.' }
    },
    {
      n: '04',
      title: { zh: '驗收方式', en: 'Acceptance method' },
      body: { zh: '硬體辨識、壓力測試、溫度、錯誤紀錄與指定工作負載。', en: 'Hardware identification, stress tests, temperatures, error logs, and the agreed workload.' }
    }
  ];

  const groups = [
    { title: { zh: '選型與報價', en: 'Selection and quoting' }, kinds: ['solution'], icon: Server },
    { title: { zh: '部署與散熱', en: 'Deployment and cooling' }, kinds: ['guide'], icon: Snowflake },
    { title: { zh: '比較與決策', en: 'Comparison and decisions' }, kinds: ['comparison'], icon: GitCompare },
    { title: { zh: 'RFQ 與公部門採購', en: 'RFQ and public procurement' }, kinds: ['checklist'], icon: FileCheck2 }
  ];

  const featuredResources = FEATURED_RESOURCE_SLUGS
    .map((slug) => CONFIGURATOR_SEO_PAGES.find((page) => page.slug === slug))
    .filter((page): page is NonNullable<typeof page> => Boolean(page));

  return (
    <PageShell
      title={{ zh: 'GPU 伺服器選型與採購｜EudTech', en: 'GPU server selection and procurement | EudTech' }}
      description={{
        zh: '依工作負載選擇 GPU 伺服器或 AI 工作站，規劃電力散熱、準備 RFQ，並進入配置與正式報價。',
        en: 'Choose a GPU server or AI workstation by workload, plan power and cooling, prepare an RFQ, and proceed to configuration and formal quoting.'
      }}
      path="/resources"
    >
      <PageHero
        eyebrow={{ zh: 'GPU 伺服器選型與採購', en: 'GPU server selection and procurement' }}
        title={{ zh: '不知道該買哪一台？先從需求開始', en: 'Not sure which system to buy? Start with the requirement' }}
        lead={{
          zh: 'EudTech 協助研究單位、企業與公部門確認工作負載、設備型態、GPU、電力、散熱與採購條件。確認後，再整理成可審查的配置與詢價。',
          en: 'EudTech helps research units, enterprises, and public-sector teams confirm the workload, system type, GPU, power, cooling, and procurement terms. The result is a configuration and quote request that reviewers can check.'
        }}
        isEnglish={isEnglish}
        image="/brand-provenance/eudtech-brand-procurement.webp"
        imageAlt={{ zh: 'GPU 伺服器選型、配置與採購審查的品牌情境圖', en: 'Brand scene for GPU server selection, configuration, and procurement review' }}
        imagePosition="center"
        actions={
          <>
            <ActionLink href="/contact">{isEnglish ? 'Ask EudTech to help choose' : '請 EudTech 協助選型'}</ActionLink>
            <ActionLink href="/configurator?request=true" secondary>{isEnglish ? 'I know the specification' : '我已知道規格'}</ActionLink>
          </>
        }
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              {isEnglish ? 'Choose your procurement stage' : '選擇目前的採購階段'}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              {isEnglish ? 'What do you need to do now?' : '現在需要完成哪一件事？'}
            </h2>
            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              {isEnglish
                ? 'Choose one route. You do not need to read every guide before contacting EudTech.'
                : '選擇符合目前狀況的路徑即可。不需要先讀完所有指南，就能聯絡 EudTech。'}
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {entryPoints.map(({ icon: Icon, eyebrow, title, body, href, action }) => (
              <Link
                key={href}
                to={href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-cyan-400 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-300">{tx(eyebrow, isEnglish)}</p>
                <h3 className="mt-3 text-xl font-semibold">{tx(title, isEnglish)}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(body, isEnglish)}</p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  {tx(action, isEnglish)}
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              {isEnglish ? 'Most-used guides' : '最常用的選購指南'}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              {isEnglish ? 'Start with the four most common buying questions' : '先回答四個最常見的採購問題'}
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {featuredResources.map((page) => (
              <Link
                key={page.slug}
                to={`/solutions/${page.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-cyan-400 dark:border-slate-800 dark:bg-slate-950"
              >
                <h3 className="text-xl font-semibold">{tx(page.title, isEnglish)}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(page.description, isEnglish)}</p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  {isEnglish ? 'Open guide' : '查看指南'}
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Cpu className="h-8 w-8 text-cyan-600 dark:text-cyan-300" aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-bold tracking-tight">
                {isEnglish ? 'Confirm four items before requesting a quote' : '詢價前先確認四項資訊'}
              </h2>
              <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                {isEnglish
                  ? 'A GPU model alone does not determine the right system. These four items set the configuration, the quote, and the acceptance scope.'
                  : '只有 GPU 型號無法決定正確設備。以下四項資訊會共同決定設備配置、報價與驗收範圍。'}
              </p>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                {isEnglish ? 'Source: official Comino product and technical documentation' : '資料依據：Comino 原廠產品與技術文件'}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                <SourceLink href={VENDOR_EVIDENCE.comino.sources.blackwell.href} label={VENDOR_EVIDENCE.comino.sources.blackwell.label} isEnglish={isEnglish} />
                <SourceLink href={VENDOR_EVIDENCE.comino.sources.server.href} label={VENDOR_EVIDENCE.comino.sources.server.label} isEnglish={isEnglish} />
                <SourceLink href={VENDOR_EVIDENCE.comino.sources.downloads.href} label={VENDOR_EVIDENCE.comino.sources.downloads.label} isEnglish={isEnglish} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {buyingChecks.map((item) => (
                <article key={item.n} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <CheckCircle2 className="h-6 w-6 text-cyan-600 dark:text-cyan-300" aria-hidden="true" />
                    <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">{item.n}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{tx(item.title, isEnglish)}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(item.body, isEnglish)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-8">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-semibold marker:hidden">
              <span>{isEnglish ? 'Browse all GPU procurement topics' : '查看全部 GPU 採購專題'}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">17</span>
            </summary>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {isEnglish
                ? 'These topic pages cover specific search and procurement needs. Start with the three routes above unless you need a particular subject.'
                : '以下專題保留給特定搜尋與採購需求。一般情況請先使用頁面上方三個入口。'}
            </p>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {groups.map(({ title, kinds, icon: Icon }) => {
                const pages = CONFIGURATOR_SEO_PAGES.filter((page) => kinds.includes(page.kind || 'solution'));
                return (
                  <section key={tx(title, isEnglish)}>
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-cyan-600 dark:text-cyan-300" aria-hidden="true" />
                      <h3 className="font-semibold">{tx(title, isEnglish)}</h3>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {pages.map((page) => (
                        <li key={page.slug}>
                          <Link to={`/solutions/${page.slug}`} className="inline-flex text-sm leading-6 text-slate-600 underline decoration-slate-300 underline-offset-4 transition hover:text-cyan-700 dark:text-slate-300 dark:decoration-slate-700 dark:hover:text-cyan-300">
                            {tx(page.title, isEnglish)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </details>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">{isEnglish ? 'Bring the workload. EudTech helps define the system.' : '提供工作負載，EudTech 協助確認設備方向'}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              {isEnglish
                ? 'The first discussion confirms the missing information, candidate platforms, and site constraints, then sets the next configuration or quote step.'
                : '第一次討論會確認尚缺資料、候選平台與場地限制，並決定下一步的配置或詢價方式。'}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ActionLink href="/contact">{isEnglish ? 'Ask EudTech to help choose' : '請 EudTech 協助選型'}</ActionLink>
            <ActionLink href="/configurator?request=true" secondary>{isEnglish ? 'Configure directly' : '直接建立配置'}</ActionLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default ResourcesOverviewPage;
