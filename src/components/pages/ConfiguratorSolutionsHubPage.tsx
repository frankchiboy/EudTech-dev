import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, FileCheck2, GitCompare, Server, Snowflake } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import {
  CONFIGURATOR_SEO_PAGES,
  ConfiguratorSeoPage,
  SITE_ORIGIN
} from '../../data/configuratorSeoPages';
import SEOHead from '../common/SEOHead';
import Footer from '../Footer';

const getText = (value: { en: string; zh: string }, isEnglish: boolean) => (isEnglish ? value.en : value.zh);

const getPageIcon = (page: ConfiguratorSeoPage) => {
  if (page.kind === 'comparison') return GitCompare;
  if (page.kind === 'checklist') return FileCheck2;
  if (page.kind === 'guide') return Snowflake;
  if (page.slug.includes('workstation')) return Cpu;
  return Server;
};

const buildStructuredData = (isEnglish: boolean) => {
  const pageUrl = `${SITE_ORIGIN}/solutions`;
  const name = isEnglish ? 'Configurator Solutions' : '配置器解決方案';
  const description = isEnglish
    ? 'A central index of EudTech configurator entry points for GPU server quotes, NVIDIA H200 systems, RTX PRO 6000 workstations, RFQ checklists, and liquid-cooling AI server procurement.'
    : 'EudTech 配置器入口索引，集中 GPU 伺服器報價、NVIDIA H200、RTX PRO 6000 工作站、RFQ 檢核表與液冷 AI 伺服器採購頁面。';

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isEnglish ? 'Home' : '首頁',
          item: SITE_ORIGIN
        },
        {
          '@type': 'ListItem',
          position: 2,
          name,
          item: pageUrl
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name,
      description,
      url: pageUrl,
      publisher: {
        '@type': 'Organization',
        name: 'EudTech',
        url: SITE_ORIGIN,
        email: 'info@eudaemonia.tech'
      },
      mainEntity: {
        '@type': 'ItemList',
        name: isEnglish ? 'Configurator solution pages' : '配置器解決方案頁面',
        itemListElement: CONFIGURATOR_SEO_PAGES.map((page, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: getText(page.title, isEnglish),
          url: `${SITE_ORIGIN}/solutions/${page.slug}`
        }))
      }
    }
  ];
};

const ConfiguratorSolutionsHubPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();

  const title = isEnglish ? 'Configurator Solutions and GPU Server Quote Guide' : '配置器解決方案與 GPU 伺服器報價指南';
  const description = isEnglish
    ? 'Browse EudTech configurator entry points for GPU server quote requests, NVIDIA H200 servers, RTX PRO 6000 workstations, AI workstation planning, RFQ checklists, and liquid-cooling AI server procurement.'
    : '瀏覽 EudTech 配置器入口，包含 GPU 伺服器報價、NVIDIA H200、RTX PRO 6000 工作站、AI 工作站規劃、RFQ 檢核表與液冷 AI 伺服器採購。';
  const keywords = isEnglish
    ? 'GPU server quote, AI server quote, configurator solutions, NVIDIA H200 server, RTX PRO 6000 workstation, GPU server RFQ, liquid cooling AI server'
    : 'GPU 伺服器報價, AI 伺服器報價, 配置器解決方案, NVIDIA H200 伺服器, RTX PRO 6000 工作站, GPU 伺服器 RFQ, 液冷 AI 伺服器';

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords={keywords}
        image="/grando-8gpu-server.jpg"
        imageAlt={isEnglish ? 'EudTech configurator solutions for GPU server quotes' : 'EudTech GPU 伺服器報價配置器解決方案'}
        url={`${SITE_ORIGIN}/solutions`}
        isEnglish={isEnglish}
        structuredData={buildStructuredData(isEnglish)}
      />

      <div className="min-h-screen bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
        <section className="relative overflow-hidden bg-gray-950 pt-28 text-white">
          <div className="absolute inset-0">
            <img src="/grando-8gpu-server.jpg" alt="" className="h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/88 to-gray-950/52" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
                {isEnglish ? 'Configurator solutions for GPU server procurement' : 'GPU 伺服器採購的配置器解決方案'}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-200">
                {isEnglish
                  ? 'Start from the buyer intent that matches your workload, then move into the configurator with the right quote context.'
                  : '從符合工作負載的採購意圖開始，再進入配置器保留正確的報價脈絡。'}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/configurator"
                  className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <Cpu className="mr-2 h-4 w-4" />
                  {isEnglish ? 'Open Configurator' : '開啟配置器'}
                </Link>
                <Link
                  to="/solutions/gpu-server-quote"
                  className="inline-flex items-center justify-center rounded-md border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  <FileCheck2 className="mr-2 h-4 w-4" />
                  {isEnglish ? 'GPU Server Quote Path' : 'GPU 伺服器報價路徑'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {CONFIGURATOR_SEO_PAGES.map((page) => {
                const Icon = getPageIcon(page);
                return (
                  <Link
                    key={page.slug}
                    to={`/solutions/${page.slug}`}
                    className="group flex min-h-[280px] flex-col rounded-lg border border-gray-200 bg-gray-50 p-6 transition hover:border-emerald-400 hover:bg-emerald-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-6 text-xl font-bold leading-7 text-gray-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                      {getText(page.title, isEnglish)}
                    </h2>
                    <p className="mt-4 line-clamp-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {getText(page.description, isEnglish)}
                    </p>
                    <span className="mt-auto inline-flex items-center pt-6 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {isEnglish ? 'View entry point' : '查看入口'}
                      <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-gray-200 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-normal text-gray-950 dark:text-white">
                {isEnglish ? 'Keyword paths mapped to quote actions' : '關鍵字入口對應報價行動'}
              </h2>
              <p className="mt-5 text-base leading-8 text-gray-600 dark:text-gray-300">
                {isEnglish
                  ? 'Each entry point is designed to capture a different procurement search intent and move the buyer into a concrete configuration URL.'
                  : '每個入口頁都承接不同採購搜尋意圖，並把使用者導向可操作的配置連結。'}
              </p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                [isEnglish ? 'Quote intent' : '報價意圖', isEnglish ? 'GPU server quote and AI server quote pages.' : 'GPU 伺服器報價與 AI 伺服器報價頁。'],
                [isEnglish ? 'Product intent' : '產品意圖', isEnglish ? 'H200 and RTX PRO 6000 entry points.' : 'H200 與 RTX PRO 6000 入口。'],
                [isEnglish ? 'Comparison intent' : '比較意圖', isEnglish ? 'H200 vs RTX PRO 6000 procurement comparison.' : 'H200 與 RTX PRO 6000 採購比較。'],
                [isEnglish ? 'Planning intent' : '規劃意圖', isEnglish ? 'RFQ checklist and liquid-cooling procurement guide.' : 'RFQ 檢核表與液冷採購指南。']
              ].map(([term, detail]) => (
                <div key={term} className="rounded-lg bg-white p-5 shadow-sm dark:bg-gray-950">
                  <dt className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{term}</dt>
                  <dd className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Footer isEnglish={isEnglish} />
      </div>
    </>
  );
};

export default ConfiguratorSolutionsHubPage;
