import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CheckCircle2, Cpu, ExternalLink, Mail, Server } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import SEOHead from '../common/SEOHead';
import Footer from '../Footer';
import {
  CONFIGURATOR_SEO_PAGES,
  SITE_ORIGIN,
  getConfiguratorSeoPage
} from '../../data/configuratorSeoPages';
import { canonicalPageUrl } from '../../utils/seo/canonicalUrl';
import { getConfiguratorSocialPreviewPath, getConfiguratorSocialPreviewUrl } from '../../utils/seo/socialPreview';
import { getSeoSchemaDate } from '../../utils/seo/schemaDate';

const getText = (value: { en: string; zh: string }, isEnglish: boolean) => (isEnglish ? value.en : value.zh);
const SITE_ROOT_URL = canonicalPageUrl(SITE_ORIGIN);

const trackLeadIntent = (slug: string, action: string) => {
  window.dispatchEvent(
    new CustomEvent('configurator-lead-intent', {
      detail: {
        slug,
        action,
        path: window.location.pathname
      }
    })
  );
};

const buildStructuredData = (slug: string, isEnglish: boolean) => {
  const page = getConfiguratorSeoPage(slug);
  if (!page) return [];

  const pageUrl = canonicalPageUrl(`${SITE_ORIGIN}/solutions/${page.slug}`);
  const name = getText(page.title, isEnglish);
  const description = getText(page.description, isEnglish);
  const isArticlePage = page.kind === 'comparison' || page.kind === 'guide' || page.kind === 'checklist';
  const pageImage = getConfiguratorSocialPreviewUrl(`/solutions/${page.slug}`);
  const schemaDate = getSeoSchemaDate();

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
          name: isEnglish ? 'Configurator Solutions' : '配置器解決方案',
          item: canonicalPageUrl(`${SITE_ORIGIN}/solutions`)
        },
        {
          '@type': 'ListItem',
          position: 3,
          name,
          item: pageUrl
        }
      ]
    },
    isArticlePage
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: name,
          description,
          image: pageImage,
          datePublished: schemaDate,
          dateModified: schemaDate,
          author: {
            '@type': 'Organization',
            name: 'EudTech',
            url: SITE_ROOT_URL
          },
          publisher: {
            '@type': 'Organization',
            name: 'EudTech',
            url: SITE_ROOT_URL,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_ORIGIN}/logo.svg`
            }
          },
          mainEntityOfPage: pageUrl
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name,
          description,
          serviceType: 'AI GPU server configuration and quote request',
          areaServed: {
            '@type': 'Country',
            name: 'Taiwan'
          },
          provider: {
            '@type': 'Organization',
            name: 'EudTech',
            url: SITE_ROOT_URL,
            email: 'info@eudaemonia.tech'
          },
          url: pageUrl,
          image: pageImage
        },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: getText(faq.question, isEnglish),
        acceptedAnswer: {
          '@type': 'Answer',
          text: getText(faq.answer, isEnglish)
        }
      }))
    }
  ];
};

const ConfiguratorSolutionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isEnglish } = useLanguageContext();
  const page = getConfiguratorSeoPage(slug);

  if (!page) {
    return <Navigate to="/configurator" replace />;
  }

  const pageUrl = canonicalPageUrl(`${SITE_ORIGIN}/solutions/${page.slug}`);
  const relatedPages = CONFIGURATOR_SEO_PAGES.filter((item) => item.slug !== page.slug).slice(0, 4);

  return (
    <>
      <SEOHead
        title={getText(page.title, isEnglish)}
        description={getText(page.description, isEnglish)}
        keywords={getText(page.keywords, isEnglish)}
        image={getConfiguratorSocialPreviewPath(`/solutions/${page.slug}`)}
        imageAlt={getText(page.imageAlt, isEnglish)}
        url={pageUrl}
        type={page.kind === 'solution' || !page.kind ? 'website' : 'article'}
        isEnglish={isEnglish}
        structuredData={buildStructuredData(page.slug, isEnglish)}
      />

      <div className="min-h-screen bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
        <section className="relative overflow-hidden bg-gray-950 pt-28 text-white">
          <div className="absolute inset-0">
            <img
              src={page.image}
              alt={getText(page.imageAlt, isEnglish)}
              className="h-full w-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/86 to-gray-950/46" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
                {getText(page.hero, isEnglish)}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
                {getText(page.lead, isEnglish)}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={page.configuratorHref}
                  onClick={() => trackLeadIntent(page.slug, 'configure')}
                  className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <Cpu className="mr-2 h-4 w-4" />
                  {isEnglish ? 'Open Configurator' : '開啟配置器'}
                </Link>
                <Link
                  to={page.quoteHref}
                  onClick={() => trackLeadIntent(page.slug, 'quote')}
                  className="inline-flex items-center justify-center rounded-md border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {isEnglish ? 'Request Quote' : '取得報價'}
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-white/12 bg-white/8 p-6 backdrop-blur-sm">
              <h2 className="text-base font-semibold text-emerald-300">
                {isEnglish ? 'Configuration Focus' : '配置重點'}
              </h2>
              <dl className="mt-6 space-y-5">
                {page.specs.map((spec) => (
                  <div key={getText(spec.label, isEnglish)} className="border-b border-white/12 pb-5 last:border-0 last:pb-0">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {getText(spec.label, isEnglish)}
                    </dt>
                    <dd className="mt-2 text-base font-semibold text-white">
                      {getText(spec.value, isEnglish)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-gray-950">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-normal text-gray-950 dark:text-white">
                {page.kind === 'comparison' || page.kind === 'guide' || page.kind === 'checklist'
                  ? isEnglish
                    ? 'How this supports procurement decisions'
                    : '這如何支援採購決策'
                  : isEnglish
                    ? 'Why this page matches buyer intent'
                    : '為什麼這頁符合採購意圖'}
              </h2>
              <p className="mt-5 text-base leading-8 text-gray-600 dark:text-gray-300">
                {page.kind === 'comparison' || page.kind === 'guide' || page.kind === 'checklist'
                  ? isEnglish
                    ? 'This content gives technical and purchasing teams a structured entry point before they open the configurator or send a quote request.'
                    : '這些內容提供技術與採購團隊在開啟配置器或送出報價前的結構化入口。'
                  : isEnglish
                    ? 'These pages are built for high-intent searches where the buyer is already comparing GPU servers, AI workstations, liquid cooling, and quote workflows.'
                    : '這些頁面針對高意圖搜尋建立，使用者通常已在比較 GPU 伺服器、AI 工作站、液冷系統與報價流程。'}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {page.highlights.map((highlight) => (
                <div key={getText(highlight, isEnglish)} className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <p className="mt-4 text-sm leading-6 text-gray-700 dark:text-gray-200">
                    {getText(highlight, isEnglish)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-gray-200 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              {page.faqs.map((faq) => (
                <article key={getText(faq.question, isEnglish)} className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
                  <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
                    {getText(faq.question, isEnglish)}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                    {getText(faq.answer, isEnglish)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-8 dark:border-gray-800 lg:flex-row lg:items-end">
              <div>
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white">
                  {isEnglish ? 'Related configurator entry points' : '相關配置器入口'}
                </h2>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {isEnglish
                    ? 'Internal links help search engines and buyers move from keyword pages into the product configurator.'
                    : '內部連結可協助搜尋引擎與採購者從關鍵字頁進入產品配置器。'}
                </p>
              </div>
              <Link
                to="/solutions"
                className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
              >
                {isEnglish ? 'View all entry points' : '查看全部入口'}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {relatedPages.map((item) => (
                <Link
                  key={item.slug}
                  to={`/solutions/${item.slug}`}
                  className="group rounded-lg border border-gray-200 p-5 transition hover:border-emerald-400 hover:bg-emerald-50 dark:border-gray-800 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30"
                >
                  <Server className="h-5 w-5 text-emerald-500" />
                  <h3 className="mt-4 text-base font-semibold text-gray-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                    {getText(item.title, isEnglish)}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {getText(item.description, isEnglish)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer isEnglish={isEnglish} />
      </div>
    </>
  );
};

export default ConfiguratorSolutionPage;
