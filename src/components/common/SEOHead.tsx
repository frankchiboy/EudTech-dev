import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  isEnglish?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image = '/logo.svg',
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
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="EudTech" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="EudTech" />
      <link rel="canonical" href={url} />
      
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