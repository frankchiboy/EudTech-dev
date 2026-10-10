import React from 'react';
import { useParams } from 'react-router-dom';
import { SiteLink as Link } from '../common/SiteLink';
import NotFoundPage from './NotFoundPage';
import { ArrowRight, CheckCircle2, Cpu, ExternalLink, Mail, Server } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import SEOHead from '../common/SEOHead';
import Footer from '../Footer';
import {
  SITE_ORIGIN,
  getConfiguratorSeoPage,
  getRelatedConfiguratorSeoPages,
  getConfiguratorGuideSources,
  getConfiguratorGuideSourceHref
} from '../../data/configuratorSeoPages';
import { canonicalPageUrl } from '../../utils/seo/canonicalUrl';
import { getConfiguratorSocialPreviewPath, getConfiguratorSocialPreviewUrl } from '../../utils/seo/socialPreview';
import { getSeoSchemaDate } from '../../utils/seo/schemaDate';
import { getResponsiveNetlifyImageProps } from '../../utils/performance/netlifyImageCdn';
import discoveryDates from '../../../public/discovery-lastmod.json';

const getText = (value: { en: string; zh: string }, isEnglish: boolean) => (isEnglish ? value.en : value.zh);
const SITE_ROOT_URL = canonicalPageUrl(SITE_ORIGIN);
const HERO_IMAGE_WIDTHS = [768, 1280, 1920, 2560];
const HERO_IMAGE_SIZES = '100vw';

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

const canonicalConfiguratorPath = (value: string) => {
  const url = new URL(value, SITE_ORIGIN);
  const search = url.search;
  const hash = url.hash;
  const canonical = new URL(canonicalPageUrl(url.toString()));

  return `${canonical.pathname}${search}${hash}`;
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
      '@type': 'ItemList',
      '@id': `${pageUrl}#related-guides`,
      name: isEnglish ? 'Related procurement guides' : '延伸採購指南',
      itemListElement: getRelatedConfiguratorSeoPages(slug).map((related, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: getText(related.title, isEnglish),
        url: canonicalPageUrl(`${SITE_ORIGIN}/solutions/${related.slug}`)
      }))
    },
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
          name: isEnglish ? 'Solutions' : '解決方案',
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
          '@id': `${pageUrl}#article`,
          headline: name,
          description,
          image: pageImage,
          datePublished: schemaDate,
          dateModified: schemaDate,
          author: {
            '@id': `${SITE_ORIGIN}/#organization`,
            '@type': 'Organization',
            name: 'EudTech',
            url: SITE_ROOT_URL
          },
          publisher: {
            '@id': `${SITE_ORIGIN}/#organization`,
            '@type': 'Organization',
            name: 'EudTech',
            url: SITE_ROOT_URL,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_ORIGIN}/logo.svg`
            }
          },
          mainEntityOfPage: pageUrl,
          citation: getConfiguratorGuideSources(slug).map(source => getConfiguratorGuideSourceHref(source, isEnglish))
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
            email: 'quote@eudaemonia.tech'
          },
          url: pageUrl,
          image: pageImage
        },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${pageUrl}#questions`,
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        '@id': `${pageUrl}#${faq.id}`,
        url: `${pageUrl}#${faq.id}`,
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
    return <NotFoundPage />;
  }

  const pageUrl = canonicalPageUrl(`${SITE_ORIGIN}/solutions/${page.slug}`);
  const configuratorHref = canonicalConfiguratorPath(page.configuratorHref);
  const quoteHref = canonicalConfiguratorPath(page.quoteHref);
  const relatedPages = getRelatedConfiguratorSeoPages(page.slug);
  const sources = getConfiguratorGuideSources(page.slug);
  const localizedPageUrl = canonicalPageUrl(`${SITE_ORIGIN}${isEnglish ? '/en' : ''}/solutions/${page.slug}`);
  const modifiedAt = discoveryDates.entries[localizedPageUrl as keyof typeof discoveryDates.entries]?.modifiedAt;
  const heroImage = getResponsiveNetlifyImageProps(page.image, {
    widths: HERO_IMAGE_WIDTHS,
    sizes: HERO_IMAGE_SIZES,
    quality: 92,
    format: 'webp'
  });

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
              src={heroImage.src}
              srcSet={heroImage.srcSet}
              sizes={heroImage.sizes}
              alt={getText(page.imageAlt, isEnglish)}
              className="h-full w-full object-cover opacity-40"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/86 to-gray-950/46" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <nav aria-label={isEnglish ? 'Breadcrumb' : '目前位置'} className="mb-6 text-sm text-gray-200">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
                  <li><Link to="/" className="rounded underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">{isEnglish ? 'Home' : '首頁'}</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link to="/solutions/" className="rounded underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">{isEnglish ? 'Solutions' : '解決方案'}</Link></li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="min-w-0 break-words">{getText(page.title, isEnglish)}</li>
                </ol>
              </nav>
              <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
                {getText(page.hero, isEnglish)}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
                {getText(page.lead, isEnglish)}
              </p>
              <p className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-300">
                <span>{isEnglish ? 'Prepared by ' : '整理：'}<Link to="/about/#verified-company-identity" rel="author" className="underline underline-offset-4">EudTech</Link></span>
                {modifiedAt && <span>{isEnglish ? 'Updated: ' : '更新：'}<time dateTime={modifiedAt}>{modifiedAt}</time></span>}
                <a href="#reference-sources" className="underline underline-offset-4">{isEnglish ? 'Manufacturer sources' : '查看原廠資料'}</a>
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={configuratorHref}
                  onClick={() => trackLeadIntent(page.slug, 'configure')}
                  className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <Cpu className="mr-2 h-4 w-4" />
                  {isEnglish ? 'Open configurator' : '開啟配置器'}
                </Link>
                <Link
                  to={quoteHref}
                  onClick={() => trackLeadIntent(page.slug, 'quote')}
                  className="inline-flex items-center justify-center rounded-md border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {isEnglish ? 'Request quote' : '取得報價'}
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-white/12 bg-white/8 p-6 backdrop-blur-sm">
              <h2 className="text-base font-semibold text-emerald-300">
                {isEnglish ? 'Configuration focus' : '配置重點'}
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
                    ? 'How to use this guide'
                    : '如何使用這份指南'
                  : isEnglish
                    ? 'What this page helps you prepare'
                    : '這一頁能協助準備什麼'}
              </h2>
              <p className="mt-5 text-base leading-8 text-gray-600 dark:text-gray-300">
                {page.kind === 'comparison' || page.kind === 'guide' || page.kind === 'checklist'
                  ? isEnglish
                    ? 'Use the information here to pick a starting configuration, confirm the assumptions, and prepare a quote request.'
                    : '先用這裡的資訊選定起始配置與必要假設，再準備詢價。'
                  : isEnglish
                    ? 'Clarify the workload and deployment constraints here, then decide the next step before requesting a quote.'
                    : '先釐清工作負載與部署限制，再決定詢價前的下一步。'}
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

        <section id="questions" aria-labelledby="questions-heading" className="scroll-mt-28 border-y border-gray-200 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 id="questions-heading" className="text-3xl font-bold">{isEnglish ? 'Procurement questions and answers' : '採購常見問答'}</h2>
            <nav aria-label={isEnglish ? 'Jump to an answer' : '快速前往答案'} className="my-8">
              <ul className="space-y-3">
                {page.faqs.map(faq => <li key={faq.id}><a href={`#${faq.id}`} className="text-sm font-medium leading-6 text-emerald-700 underline underline-offset-4 dark:text-emerald-300">{getText(faq.question, isEnglish)}</a></li>)}
              </ul>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              {page.faqs.map((faq) => (
                <article key={faq.id} id={faq.id} className="scroll-mt-28 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
                  <h3 className="text-lg font-semibold text-gray-950 dark:text-white">
                    {getText(faq.question, isEnglish)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                    {getText(faq.answer, isEnglish)}
                  </p>
                  <a href={`#${faq.id}`} aria-label={`${isEnglish ? 'Link to answer: ' : '答案連結：'}${getText(faq.question, isEnglish)}`} className="mt-4 inline-flex text-sm font-medium text-emerald-700 underline underline-offset-4 dark:text-emerald-300">{isEnglish ? 'Link to this answer' : '此答案的連結'}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                {isEnglish ? 'Decision worksheet' : '決策工作表'}
              </p>
              <h2 className="mt-4 text-3xl font-bold text-gray-950 dark:text-white">
                {getText(page.title, isEnglish)}
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                {isEnglish ? 'Record these three decisions before opening the configurator or requesting a quote.' : '先記錄以下三項決策，再開啟配置器或送出詢價。'}
              </p>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {page.specs.slice(0, 3).map((spec, index) => (
                <article key={getText(spec.label, isEnglish)} className="relative rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{String(index + 1).padStart(2, '0')}</span>
                    {index < 2 ? <ArrowRight className="hidden h-4 w-4 text-gray-400 lg:block" /> : null}
                  </div>
                  <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{getText(spec.label, isEnglish)}</h3>
                  <p className="mt-3 text-base font-semibold leading-7 text-gray-950 dark:text-white">{getText(spec.value, isEnglish)}</p>
                  <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">{page.highlights[index] ? getText(page.highlights[index], isEnglish) : getText(page.description, isEnglish)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reference-sources" aria-labelledby="reference-sources-heading" className="scroll-mt-28 border-y border-gray-200 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 id="reference-sources-heading" className="text-2xl font-bold">{isEnglish ? 'Manufacturer reference sources' : '原廠查證資料'}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 dark:text-gray-300">{isEnglish ? 'Use these sources to check hardware and deployment requirements. EudTech prepares the procurement guidance; the exact configuration, availability, pricing and acceptance terms are confirmed in the formal quotation.' : '以下資料供查核硬體與部署條件。採購建議由 EudTech 整理；實際配置、供貨、價格及驗收條件依正式報價確認。'}</p>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {sources.map(source => (
                <li key={source.id} className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
                  <a href={getConfiguratorGuideSourceHref(source, isEnglish)} className="font-semibold text-emerald-700 underline underline-offset-4 dark:text-emerald-300">{getText(source.title, isEnglish)}{!isEnglish && source.hrefZh ? '（繁體中文譯本）' : ''}</a>
                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">{getText(source.description, isEnglish)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="related-guides" aria-labelledby="related-guides-heading" className="scroll-mt-28 bg-white py-16 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-8 dark:border-gray-800 lg:flex-row lg:items-end">
              <div>
                <h2 id="related-guides-heading" className="text-2xl font-bold text-gray-950 dark:text-white">
                  {isEnglish ? 'Related procurement guides' : '延伸採購指南'}
                </h2>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {isEnglish
                    ? 'Continue to a related guide, or open the configurator once the assumptions are confirmed.'
                    : '確認必要假設後，繼續閱讀相關指南或開啟配置器。'}
                </p>
              </div>
              <Link
                to="/resources/"
                className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
              >
                {isEnglish ? 'All GPU procurement resources' : '全部 GPU 採購資源'}
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
