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
import { canonicalPageUrl } from '../../utils/seo/canonicalUrl';
import { getConfiguratorSocialPreviewPath, getConfiguratorSocialPreviewUrl } from '../../utils/seo/socialPreview';
import { getResponsiveNetlifyImageProps } from '../../utils/performance/netlifyImageCdn';

const getText = (value: { en: string; zh: string }, isEnglish: boolean) => (isEnglish ? value.en : value.zh);
const SITE_ROOT_URL = canonicalPageUrl(SITE_ORIGIN);
const HERO_IMAGE_WIDTHS = [768, 1280, 1920, 2560];
const HERO_IMAGE_SIZES = '100vw';

const getPageIcon = (page: ConfiguratorSeoPage) => {
  if (page.kind === 'comparison') return GitCompare;
  if (page.kind === 'checklist') return FileCheck2;
  if (page.kind === 'guide') return Snowflake;
  if (page.slug.includes('workstation')) return Cpu;
  return Server;
};

const buildStructuredData = (isEnglish: boolean) => {
  const pageUrl = canonicalPageUrl(`${SITE_ORIGIN}/solutions`);
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
          item: SITE_ROOT_URL
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
      image: getConfiguratorSocialPreviewUrl('/solutions'),
      publisher: {
        '@type': 'Organization',
        name: 'EudTech',
        url: SITE_ROOT_URL,
        email: 'info@eudaemonia.tech'
      },
      mainEntity: {
        '@type': 'ItemList',
        name: isEnglish ? 'Configurator solution pages' : '配置器解決方案頁面',
        itemListElement: CONFIGURATOR_SEO_PAGES.map((page, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: getText(page.title, isEnglish),
          url: canonicalPageUrl(`${SITE_ORIGIN}/solutions/${page.slug}`)
        }))
      }
    }
  ];
};

const ConfiguratorSolutionsHubPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();

  const title = isEnglish
    ? 'GPU Server Quote and Configurator Solutions'
    : 'GPU 伺服器報價與配置器解決方案';
  const description = isEnglish
    ? 'Open EudTech quote-ready configurator paths for NVIDIA H200 GPU servers, RTX PRO 6000 workstations, AI inference servers, RFQ checklists, and liquid-cooling procurement.'
    : '開啟 EudTech 可用於報價的配置器入口，包含 NVIDIA H200 GPU 伺服器、RTX PRO 6000 工作站、AI 推論伺服器、RFQ 檢核表與液冷採購。';
  const keywords = isEnglish
    ? 'GPU server quote, AI server quote, configurator solutions, NVIDIA H200 server, RTX PRO 6000 workstation, GPU server RFQ, liquid cooling AI server'
    : 'GPU 伺服器報價, AI 伺服器報價, 配置器解決方案, NVIDIA H200 伺服器, RTX PRO 6000 工作站, GPU 伺服器 RFQ, 液冷 AI 伺服器';
  const heroImage = getResponsiveNetlifyImageProps('/grando-8gpu-server.jpg', {
    widths: HERO_IMAGE_WIDTHS,
    sizes: HERO_IMAGE_SIZES,
    quality: 92,
    format: 'webp'
  });

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords={keywords}
        image={getConfiguratorSocialPreviewPath('/solutions')}
        imageAlt={isEnglish ? 'EudTech configurator solutions for GPU server quotes' : 'EudTech GPU 伺服器報價配置器解決方案'}
        url={canonicalPageUrl(`${SITE_ORIGIN}/solutions`)}
        isEnglish={isEnglish}
        structuredData={buildStructuredData(isEnglish)}
      />

      <div className="min-h-screen bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
        <section className="relative overflow-hidden bg-gray-950 pt-28 text-white">
          <div className="absolute inset-0">
            <img
              src={heroImage.src}
              srcSet={heroImage.srcSet}
              sizes={heroImage.sizes}
              alt=""
              className="h-full w-full object-cover opacity-40"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/88 to-gray-950/52" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
                {isEnglish ? 'GPU server quote entry points by workload' : '依工作負載選擇 GPU 伺服器報價入口'}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-200">
                {isEnglish
                  ? 'Choose your buying intent first, then open the matching configurator. It keeps the GPU, CPU, memory, storage, power, and network choices that EudTech quotes from.'
                  : '先依採購意圖選擇入口，再進入對應的配置器。配置會保留 GPU、CPU、記憶體、儲存、電源與網路選項，供 EudTech 回覆報價。'}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/configurator/"
                  className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <Cpu className="mr-2 h-4 w-4" />
                  {isEnglish ? 'Open configurator' : '開啟配置器'}
                </Link>
                <Link
                  to="/solutions/gpu-server-quote"
                  className="inline-flex items-center justify-center rounded-md border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  <FileCheck2 className="mr-2 h-4 w-4" />
                  {isEnglish ? 'GPU server quote entry point' : 'GPU 伺服器報價入口'}
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
                {isEnglish ? 'Entry points by buying situation' : '採購情境對應的入口'}
              </h2>
              <p className="mt-5 text-base leading-8 text-gray-600 dark:text-gray-300">
                {isEnglish
                  ? 'Each entry point answers one procurement need and links directly to a concrete configurator URL.'
                  : '每個入口頁對應一種採購需求，並直接連到可操作的配置器連結。'}
              </p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                [isEnglish ? 'Need a quote' : '需要報價', isEnglish ? 'Start from the GPU server quote or AI server quote page when you need a formal quote.' : '需要 GPU 伺服器或 AI 伺服器的正式報價時，從報價頁開始。'],
                [isEnglish ? 'GPU already chosen' : '已選定 GPU', isEnglish ? 'Go straight to the H200 or RTX PRO 6000 entry point when the GPU is already decided.' : '已鎖定 H200 或 RTX PRO 6000 時，直接進入產品入口。'],
                [isEnglish ? 'Still comparing' : '仍在比較', isEnglish ? 'Read the H200 vs RTX PRO 6000 procurement comparison while the choice is still open.' : '還在 H200 與 RTX PRO 6000 之間取捨時，先看採購比較。'],
                [isEnglish ? 'Preparing RFQ and deployment' : '準備 RFQ 與部署', isEnglish ? 'Use the RFQ checklist and liquid-cooling procurement guide when preparing documents or a deployment.' : '準備 RFQ 或規劃液冷部署時，使用檢核表與採購指南。']
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
