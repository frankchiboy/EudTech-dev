// SEO 相關工具函數
export interface MetaTags {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

export const generateMetaTags = (meta: MetaTags, defaults: Partial<MetaTags> = {}) => {
  const tags: Array<{ name?: string; property?: string; content: string }> = [];
  
  const mergedMeta = { ...defaults, ...meta };

  // 基本 meta tags
  if (mergedMeta.description) {
    tags.push({ name: 'description', content: mergedMeta.description });
  }
  
  if (mergedMeta.keywords) {
    tags.push({ name: 'keywords', content: mergedMeta.keywords });
  }
  
  if (mergedMeta.author) {
    tags.push({ name: 'author', content: mergedMeta.author });
  }

  // Open Graph tags
  if (mergedMeta.title) {
    tags.push({ property: 'og:title', content: mergedMeta.title });
  }
  
  if (mergedMeta.description) {
    tags.push({ property: 'og:description', content: mergedMeta.description });
  }
  
  if (mergedMeta.image) {
    tags.push({ property: 'og:image', content: mergedMeta.image });
  }
  
  if (mergedMeta.url) {
    tags.push({ property: 'og:url', content: mergedMeta.url });
  }
  
  if (mergedMeta.type) {
    tags.push({ property: 'og:type', content: mergedMeta.type });
  }
  
  if (mergedMeta.siteName) {
    tags.push({ property: 'og:site_name', content: mergedMeta.siteName });
  }
  
  if (mergedMeta.locale) {
    tags.push({ property: 'og:locale', content: mergedMeta.locale });
  }

  // Twitter Card tags
  if (mergedMeta.twitterCard) {
    tags.push({ name: 'twitter:card', content: mergedMeta.twitterCard });
  }
  
  if (mergedMeta.title) {
    tags.push({ name: 'twitter:title', content: mergedMeta.title });
  }
  
  if (mergedMeta.description) {
    tags.push({ name: 'twitter:description', content: mergedMeta.description });
  }
  
  if (mergedMeta.image) {
    tags.push({ name: 'twitter:image', content: mergedMeta.image });
  }

  return tags;
};

// 結構化數據生成器
export const generateStructuredData = (type: string, data: Record<string, any>) => {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };
};

// 組織結構化數據
export const generateOrganizationSchema = (org: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
}) => {
  return generateStructuredData('Organization', org);
};

// 產品結構化數據
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image?: string[];
  brand?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
    url?: string;
  };
}) => {
  return generateStructuredData('Product', product);
};

// 網站導覽結構化數據
export const generateBreadcrumbSchema = (items: Array<{
  name: string;
  url: string;
}>) => {
  return generateStructuredData('BreadcrumbList', {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  });
};