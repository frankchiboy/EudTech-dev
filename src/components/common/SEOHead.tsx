import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
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
  image = '/logo.svg',
  imageAlt,
  url = window.location.href,
  type = 'website',
  isEnglish = false,
  structuredData
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

  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const canonicalUrl = normalizeAbsoluteUrl(url);
  const imageUrl = normalizeAbsoluteUrl(image);
  const googleSiteVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined;
  const bingSiteVerification = import.meta.env.VITE_BING_SITE_VERIFICATION as string | undefined;
  const structuredDataItems = structuredData
    ? (Array.isArray(structuredData) ? structuredData : [structuredData])
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt || title || defaultTitle} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="EudTech" />
      <meta property="og:locale" content={isEnglish ? 'en_US' : 'zh_TW'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt || title || defaultTitle} />
      <meta name="twitter:url" content={canonicalUrl} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="EudTech" />
      <link rel="canonical" href={canonicalUrl} />
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
