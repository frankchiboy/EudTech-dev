import React from 'react';
import { Helmet } from 'react-helmet-async';
import { canonicalPageUrl } from '../../utils/seo/canonicalUrl';
import discoveryDates from '../../../public/discovery-lastmod.json';
import englishCopy from '../../data/englishSeoPages.json';

const SITE_ORIGIN = 'https://eudaemonia.tech';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: string;
  isEnglish?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown> | undefined>;
  noIndex?: boolean;
}

const normalizeAbsoluteUrl = (value: string) => {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  return `${SITE_ORIGIN}${value.startsWith('/') ? value : `/${value}`}`;
};

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  imageAlt,
  url = window.location.href,
  type = 'website',
  isEnglish = false,
  structuredData,
  noIndex = false
}) => {
  const defaultTitle = isEnglish 
    ? 'EudTech - Next Generation AI Solutions'
    : 'EudTech - 下一代AI解決方案';
  
  const defaultDescription = isEnglish
    ? 'EudTech provides cutting-edge AI infrastructure solutions including AI servers, financial AI systems, and liquid-cooled computing systems.'
    : 'EudTech提供尖端的AI基礎設施解決方案，包括AI伺服器、金融AI系統和液冷運算系統。';

  const defaultKeywords = isEnglish
    ? 'AI servers, artificial intelligence, machine learning, GPU computing, liquid cooling, financial AI, EudTech'
    : 'AI伺服器, 人工智能, 機器學習, GPU運算, 液冷, 金融AI, EudTech';

  const basePath = new URL(url, SITE_ORIGIN).pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  const copy = isEnglish ? englishCopy[(basePath.replace(/\/$/, '') || '/') as keyof typeof englishCopy] : undefined;
  const pageTitle = copy?.title || title;
  const pageDescription = copy?.description || description || defaultDescription;
  const fullTitle = pageTitle ? `${pageTitle.replace(/\s*[|｜]\s*EudTech(?:\s*[-–].*)?$/i, '').trim()} | EudTech` : defaultTitle;
  const zhUrl = canonicalPageUrl(`${SITE_ORIGIN}${basePath}`, SITE_ORIGIN);
  const enUrl = canonicalPageUrl(`${SITE_ORIGIN}/en${basePath}`, SITE_ORIGIN);
  const canonicalUrl = isEnglish ? enUrl : zhUrl;
  const shouldIndex = !noIndex && canonicalUrl in discoveryDates.entries;
  const socialSlug = basePath === '/' ? 'home' : basePath.replace(/^\/+|\/+$/g, '').replace(/\//g, '-');
  const imageUrl = normalizeAbsoluteUrl(image || `/social/configurator/${shouldIndex ? socialSlug : 'home'}.jpg`);
  const hasSocialImageDimensions = imageUrl.includes('/social/configurator/');
  const dates = discoveryDates.entries[canonicalUrl as keyof typeof discoveryDates.entries];
  const googleSiteVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined;
  const bingSiteVerification = import.meta.env.VITE_BING_SITE_VERIFICATION as string | undefined;
  const suppliedData = structuredData
    ? (Array.isArray(structuredData) ? structuredData : [structuredData])
    : [];
  const localizeSchema = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(localizeSchema);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, localizeSchema(val)]));
    if (isEnglish && typeof value === 'string' && value.startsWith(SITE_ORIGIN)) {
      const candidate = new URL(value);
      const page = canonicalPageUrl(candidate.href, SITE_ORIGIN);
      if (page in discoveryDates.entries && !candidate.pathname.startsWith('/vendor/') && !candidate.pathname.startsWith('/en/')) {
        // Organization and website entity identifiers remain language-independent.
        if (candidate.pathname === '/' && ['#organization', '#website'].includes(candidate.hash)) return value;
        return `${SITE_ORIGIN}/en${candidate.pathname}${candidate.search}${candidate.hash}`;
      }
    }
    return value;
  };
  const structuredDataItems: Array<Record<string, unknown>> = suppliedData.filter((item): item is Record<string, unknown> => Boolean(item))
    .filter(item => !(item['@type'] === 'FAQPage' && basePath.startsWith('/configurator'))).map(item => {
    if (['Organization', 'WebSite'].includes(String(item['@type']))) return item;
    const copy = localizeSchema(item) as Record<string, unknown>;
    if (copy['@type'] === 'Article' && dates) {
      copy.url = canonicalUrl;
      copy.datePublished = dates.publishedAt;
      copy.dateModified = dates.modifiedAt;
      copy.mainEntityOfPage = canonicalUrl;
    }
    if (typeof copy.url === 'string' && new URL(copy.url, SITE_ORIGIN).pathname === basePath) copy.url = canonicalUrl;
    return copy;
  });
  if (shouldIndex) structuredDataItems.push({
    '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl, name: fullTitle, description: pageDescription, inLanguage: isEnglish ? 'en' : 'zh-TW',
    ...(dates ? { dateModified: dates.modifiedAt } : {}),
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` }, publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    primaryImageOfPage: { '@type': 'ImageObject', url: imageUrl }
  });

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt || title || defaultTitle} />
      {hasSocialImageDimensions && <meta property="og:image:width" content="1200" />}
      {hasSocialImageDimensions && <meta property="og:image:height" content="630" />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="EudTech" />
      <meta property="og:locale" content={isEnglish ? 'en_US' : 'zh_TW'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt || title || defaultTitle} />
      <meta name="twitter:url" content={canonicalUrl} />
      
      {/* Additional SEO */}
      <meta name="robots" content={shouldIndex ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, follow'} />
      <meta name="author" content="EudTech" />
      <link rel="canonical" href={canonicalUrl} />
      {shouldIndex && <link rel="alternate" hrefLang="zh-Hant" href={zhUrl} />}
      {shouldIndex && <link rel="alternate" hrefLang="en" href={enUrl} />}
      {shouldIndex && <link rel="alternate" hrefLang="x-default" href={zhUrl} />}
      <link rel="alternate" type="application/rss+xml" title="EudTech Configurator Updates" href={`${SITE_ORIGIN}/feed.xml`} />
      <link rel="alternate" type="application/feed+json" title="EudTech Configurator Updates" href={`${SITE_ORIGIN}/feed.json`} />
      <link rel="alternate" type="text/markdown" title="EudTech LLM Summary" href={`${SITE_ORIGIN}/llms.txt`} />
      <link rel="alternate" type="text/markdown" title="EudTech Full LLM Context" href={`${SITE_ORIGIN}/llms-full.txt`} />
      {googleSiteVerification ? <meta name="google-site-verification" content={googleSiteVerification} /> : null}
      {bingSiteVerification ? <meta name="msvalidate.01" content={bingSiteVerification} /> : null}
      
      {/* Language */}
      <html lang={isEnglish ? 'en' : 'zh-TW'} />

      {structuredDataItems.map((item, index) => (
        <script key={`structured-data-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
