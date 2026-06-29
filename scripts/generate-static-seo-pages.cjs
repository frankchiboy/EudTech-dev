const fs = require('fs');
const path = require('path');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');
const {
  SOCIAL_IMAGE_WIDTH,
  SOCIAL_IMAGE_HEIGHT,
  getConfiguratorSocialPreviewRoutes
} = require('./configurator-social-preview-routes.cjs');

const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const { SITE_ORIGIN, CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();
const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';
const siteRootUrl = canonicalPageUrl(siteOrigin, siteOrigin);
const siteSuffix = 'EudTech - 下一代AI解決方案';
const defaultImage = `${siteOrigin}/grando-8gpu-server.jpg`;
const googleSiteVerification = process.env.VITE_GOOGLE_SITE_VERIFICATION || '';
const bingSiteVerification = process.env.VITE_BING_SITE_VERIFICATION || '';
const taipeiDateParts = Object.fromEntries(
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
    .formatToParts(new Date())
    .filter((part) => part.type !== 'literal')
    .map((part) => [part.type, part.value])
);
const schemaDate = `${taipeiDateParts.year}-${taipeiDateParts.month}-${taipeiDateParts.day}`;

const getZh = (value) => value.zh;
const productSeoById = new Map((CONFIGURATOR_PRODUCT_SEO || []).map((product) => [product.id, product]));
const pageUrl = (routePath) => canonicalPageUrl(`${siteOrigin}${routePath}`, siteOrigin);
const organizationId = `${siteRootUrl}#organization`;
const websiteId = `${siteRootUrl}#website`;
const eudTechOrganization = {
  '@type': 'Organization',
  '@id': organizationId,
  name: 'EudTech',
  alternateName: 'Eudaemonia Technology',
  url: siteRootUrl,
  email: 'info@eudaemonia.tech',
  logo: {
    '@type': 'ImageObject',
    url: `${siteOrigin}/logo.svg`
  },
  areaServed: {
    '@type': 'Country',
    name: 'Taiwan'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'info@eudaemonia.tech',
    availableLanguage: ['zh-TW', 'en']
  }
};
const eudTechWebSite = {
  '@type': 'WebSite',
  '@id': websiteId,
  name: 'EudTech',
  url: siteRootUrl,
  publisher: {
    '@id': organizationId
  },
  inLanguage: 'zh-TW'
};
const socialPreviewByPath = new Map(getConfiguratorSocialPreviewRoutes().map((route) => [route.path, route]));

function configuratorServiceSchemaFor(id) {
  const product = productSeoById.get(id);
  if (!product) {
    return undefined;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: getZh(product.title),
    description: getZh(product.description),
    image: `${siteOrigin}${product.image}`,
    url: pageUrl(product.configuratorHref),
    provider: eudTechOrganization,
    brand: { '@type': 'Brand', name: product.brand },
    serviceType: 'GPU 伺服器報價配置',
    category: getZh(product.category),
    identifier: product.productId,
    additionalProperty: product.properties.map((property) => ({
      '@type': 'PropertyValue',
      name: getZh(property.name),
      value: getZh(property.value)
    })),
    potentialAction: {
      '@type': 'QuoteAction',
      target: pageUrl(product.quoteHref)
      }
    };
  }

const solutionRoutes = CONFIGURATOR_SEO_PAGES.map((page) => ({
  path: `/solutions/${page.slug}`,
  title: getZh(page.title),
  description: getZh(page.description),
  keywords: getZh(page.keywords),
  lead: getZh(page.lead),
  image: `${siteOrigin}${page.image}`,
  imageAlt: getZh(page.imageAlt),
  serviceName: getZh(page.title),
  kind: page.kind || 'solution',
  configuratorHref: page.configuratorHref,
  quoteHref: page.quoteHref,
  relatedLinks: solutionRelatedLinks(page),
  highlights: page.highlights.map((highlight) => getZh(highlight)),
  specs: page.specs.map((spec) => ({
    label: getZh(spec.label),
    value: getZh(spec.value)
  })),
  faq: page.faqs.map((faq) => [getZh(faq.question), getZh(faq.answer)])
}));
const solutionHubRoute = {
  path: '/solutions',
  title: '配置器解決方案與 GPU 伺服器報價指南',
  description: 'EudTech 配置器入口索引，集中 GPU 伺服器報價、NVIDIA H200、RTX PRO 6000 工作站、RFQ 檢核表與液冷 AI 伺服器採購頁面。',
  keywords: 'GPU 伺服器報價, AI 伺服器報價, 配置器解決方案, NVIDIA H200 伺服器, RTX PRO 6000 工作站, GPU 伺服器 RFQ, 液冷 AI 伺服器',
  lead: '集中整理 EudTech 配置器、GPU 伺服器報價、AI 工作站與採購檢核內容，協助技術與採購團隊進入最符合需求的配置頁。',
  image: defaultImage,
  imageAlt: 'EudTech GPU 伺服器報價配置器解決方案',
  kind: 'collection',
  configuratorHref: '/configurator',
  quoteHref: '/configurator?request=true',
  relatedLinks: [
    routeLink('/configurator', '開啟 Comino Grando 配置器'),
    routeLink('/solutions/gpu-server-quote', 'GPU 伺服器報價流程'),
    routeLink('/solutions/nvidia-h200-server', 'NVIDIA H200 伺服器配置'),
    routeLink('/solutions/rtx-pro-6000-workstation', 'RTX PRO 6000 工作站配置'),
    routeLink('/solutions/gpu-server-rfq-checklist', 'GPU 伺服器 RFQ 檢核表')
  ],
  highlights: [
    '高意圖搜尋入口：GPU 伺服器報價、NVIDIA H200、RTX PRO 6000、液冷 AI 伺服器。',
    '每個頁面都連回可操作的配置器與詢價流程。',
    '適合台灣企業、研究單位與採購團隊進行規格初步對齊。'
  ],
  specs: [
    { label: '主要轉換', value: '送出配置器詢價需求' },
    { label: '服務區域', value: 'Taiwan' },
    { label: '聯絡信箱', value: 'info@eudaemonia.tech' }
  ],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首頁', item: siteRootUrl },
        { '@type': 'ListItem', position: 2, name: '配置器解決方案', item: pageUrl('/solutions') }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: '配置器解決方案',
      description: 'EudTech 配置器入口索引，集中 GPU 伺服器報價、NVIDIA H200、RTX PRO 6000 工作站、RFQ 檢核表與液冷 AI 伺服器採購頁面。',
      url: pageUrl('/solutions'),
      publisher: eudTechOrganization,
      mainEntity: {
        '@type': 'ItemList',
        name: '配置器解決方案頁面',
        itemListElement: CONFIGURATOR_SEO_PAGES.map((page, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: getZh(page.title),
          url: pageUrl(`/solutions/${page.slug}`)
        }))
      }
    }
  ]
};

const productRoutes = CONFIGURATOR_PRODUCT_SEO.map((product) => ({
  path: product.configuratorHref,
  title: getZh(product.title),
  description: getZh(product.description),
  keywords: getZh(product.keywords),
  lead: getZh(product.description),
  image: `${siteOrigin}${product.image}`,
  imageAlt: getZh(product.imageAlt),
  kind: 'configurator-product',
  configuratorHref: product.configuratorHref,
  quoteHref: product.quoteHref,
  relatedLinks: productRelatedLinks(product),
  highlights: [
    `${getZh(product.model)}：${getZh(product.category)}`,
    `GPU 重點：${getZh(product.properties.find((property) => getZh(property.name) === 'GPU 重點')?.value || product.category)}`,
    '送出詢價時會保留配置連結，方便技術與採購團隊審查。'
  ],
  specs: product.properties.map((property) => ({
    label: getZh(property.name),
    value: getZh(property.value)
  })),
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: getZh(product.title),
      description: getZh(product.description),
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: pageUrl(product.configuratorHref),
      provider: eudTechOrganization,
      potentialAction: { '@type': 'QuoteAction', target: pageUrl(product.quoteHref) }
    },
    configuratorServiceSchemaFor(product.id),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首頁', item: siteRootUrl },
        { '@type': 'ListItem', position: 2, name: '配置器', item: pageUrl('/configurator') },
        { '@type': 'ListItem', position: 3, name: getZh(product.model), item: pageUrl(product.configuratorHref) }
      ]
    }
  ]
}));

const routes = [
  {
    path: '/',
    title: 'AI GPU 伺服器與 Comino 配置器',
    description: 'EudTech 提供 AI GPU 伺服器、Comino Grando 液冷系統，以及可送出 GPU 伺服器與工作站報價需求的配置器。',
    keywords: 'AI GPU 伺服器, GPU 伺服器報價, Comino Grando, NVIDIA H200 伺服器, RTX PRO 6000 工作站, 液冷 GPU 伺服器, 台灣 AI 工作站',
    lead: 'EudTech 協助台灣團隊規劃 AI GPU 伺服器、AI 工作站與 Comino Grando 液冷系統，並提供可送出正式報價需求的配置器入口。',
    imageAlt: 'EudTech AI GPU 伺服器與 Comino 配置器',
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    relatedLinks: [
      routeLink('/configurator', 'Comino Grando GPU 伺服器配置器'),
      routeLink('/solutions', '配置器解決方案總覽'),
      routeLink('/solutions/gpu-server-quote', 'GPU 伺服器報價流程'),
      routeLink('/solutions/nvidia-h200-server', 'NVIDIA H200 伺服器配置'),
      routeLink('/solutions/rtx-pro-6000-workstation', 'RTX PRO 6000 工作站配置')
    ],
    highlights: [
      '可配置 GPU、CPU、記憶體、儲存、電源與網路選項。',
      '配置完成後可送出詢價，並保留可分享的配置連結。',
      '面向台灣 AI、HPC、研究與企業採購需求。'
    ],
    specs: [
      { label: '主力產品', value: 'AI GPU 伺服器與 AI 工作站' },
      { label: '配置器', value: 'Comino Grando GPU 伺服器配置器' },
      { label: '聯絡信箱', value: 'info@eudaemonia.tech' }
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        ...eudTechOrganization
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        ...eudTechWebSite
      }
    ]
  },
  {
    path: '/configurator',
    title: 'Comino Grando GPU 伺服器配置器',
    description: '配置 Comino Grando GPU 伺服器、RTX PRO 工作站、NVIDIA H200 系統、儲存、電源與網路，並向 EudTech 取得報價。',
    keywords: 'Comino Grando 配置器, GPU 伺服器配置器, NVIDIA H200 伺服器, RTX PRO 6000 工作站, AI 工作站 台灣, GPU 伺服器報價',
    lead: '使用 EudTech 配置器建立 Comino Grando GPU 伺服器或 AI 工作站需求，確認硬體選項後送出報價。',
    imageAlt: 'Comino Grando GPU 伺服器配置器',
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    relatedLinks: [
      routeLink('/configurator/29', 'SERVER 6xH200 配置器'),
      routeLink('/configurator/28', 'SERVER 4xH200 配置器'),
      routeLink('/configurator/23', 'SERVER 8x PRO 6000 配置器'),
      routeLink('/solutions/gpu-server-quote', 'GPU 伺服器報價流程'),
      routeLink('/solutions/gpu-server-rfq-checklist', 'GPU 伺服器 RFQ 檢核表')
    ],
    highlights: [
      '支援 GPU、CPU、RAM、OS Drive、Data Drive、Power Supply 與 Network 選項。',
      '詢價表單會包含目前配置、配置連結與聯絡資訊。',
      '適合在採購前先完成技術規格對齊。'
    ],
    specs: [
      { label: '可配置項目', value: 'GPU、CPU、RAM、儲存、電源、網路' },
      { label: '報價流程', value: '配置器送出至 info@eudaemonia.tech' },
      { label: '服務區域', value: 'Taiwan' }
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Comino Grando GPU 伺服器配置器',
        description: '配置 Comino Grando GPU 伺服器與 AI 工作站，並將已選 GPU、CPU、RAM、儲存、電源與網路選項送交 EudTech 追蹤報價。',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: pageUrl('/configurator'),
        provider: eudTechOrganization,
        potentialAction: {
          '@type': 'QuoteAction',
          target: pageUrl('/configurator?request=true')
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'EudTech 配置器入口',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '配置器解決方案總入口', url: pageUrl('/solutions') },
          { '@type': 'ListItem', position: 2, name: 'GPU 伺服器報價配置器', url: pageUrl('/solutions/gpu-server-quote') },
          { '@type': 'ListItem', position: 3, name: 'NVIDIA H200 GPU 伺服器配置器', url: pageUrl('/solutions/nvidia-h200-server') },
          { '@type': 'ListItem', position: 4, name: 'RTX PRO 6000 工作站配置器', url: pageUrl('/solutions/rtx-pro-6000-workstation') },
          { '@type': 'ListItem', position: 5, name: '液冷 GPU 伺服器採購', url: pageUrl('/solutions/liquid-cooling-ai-server-procurement') }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首頁', item: siteRootUrl },
          { '@type': 'ListItem', position: 2, name: '配置器', item: pageUrl('/configurator') }
        ]
      }
    ]
  },
  ...productRoutes,
  solutionHubRoute
].concat(solutionRoutes);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function staticSeoFallbackStyle() {
  return `<style data-static-seo-fallback>
      .static-seo-fallback {
        box-sizing: border-box;
        max-width: 1040px;
        margin: 0 auto;
        padding: 56px 20px 72px;
        color: #111827;
        background: #ffffff;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.65;
      }
      .static-seo-fallback * { box-sizing: border-box; }
      .static-seo-fallback h1 {
        margin: 0 0 16px;
        font-size: clamp(2rem, 4vw, 3.5rem);
        line-height: 1.12;
        color: #0f172a;
      }
      .static-seo-fallback h2 {
        margin: 40px 0 14px;
        font-size: 1.25rem;
        color: #0f172a;
      }
      .static-seo-fallback p { margin: 0 0 16px; font-size: 1rem; }
      .static-seo-kicker {
        margin-bottom: 10px;
        color: #047857;
        font-size: .82rem;
        font-weight: 700;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      .static-seo-lead {
        max-width: 760px;
        color: #374151;
        font-size: 1.08rem;
      }
      .static-seo-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin: 28px 0 36px;
      }
      .static-seo-actions a {
        display: inline-flex;
        align-items: center;
        min-height: 44px;
        padding: 10px 18px;
        border: 1px solid #059669;
        border-radius: 6px;
        color: #047857;
        font-weight: 700;
        text-decoration: none;
      }
      .static-seo-actions a:first-child {
        background: #059669;
        color: #ffffff;
      }
      .static-seo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 14px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .static-seo-grid li,
      .static-seo-faq li,
      .static-seo-checklist li {
        border: 1px solid #d1d5db;
        border-radius: 8px;
        padding: 14px 16px;
        background: #f9fafb;
      }
      .static-seo-specs {
        width: 100%;
        border-collapse: collapse;
        overflow: hidden;
        border: 1px solid #d1d5db;
        border-radius: 8px;
      }
      .static-seo-specs th,
      .static-seo-specs td {
        padding: 12px 14px;
        border-bottom: 1px solid #e5e7eb;
        text-align: left;
        vertical-align: top;
      }
      .static-seo-specs th {
        width: 30%;
        color: #111827;
        background: #f3f4f6;
      }
      .static-seo-faq {
        display: grid;
        gap: 12px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .static-seo-copy {
        max-width: 860px;
      }
      .static-seo-checklist {
        display: grid;
        gap: 12px;
        margin: 0;
        padding-left: 20px;
      }
      .static-seo-faq strong { display: block; margin-bottom: 6px; color: #111827; }
      .static-seo-related {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 10px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .static-seo-related a {
        display: block;
        min-height: 44px;
        padding: 12px 14px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        color: #065f46;
        background: #ffffff;
        font-weight: 700;
        text-decoration: none;
      }
      .static-seo-contact {
        margin-top: 40px;
        padding-top: 24px;
        border-top: 1px solid #e5e7eb;
        color: #374151;
      }
    </style>`;
}

function dedupeLinks(links) {
  const seen = new Set();
  return links.filter((link) => {
    if (!link.href || seen.has(link.href)) {
      return false;
    }
    seen.add(link.href);
    return true;
  });
}

function routeLink(pathname, label) {
  return {
    label,
    href: pageUrl(pathname)
  };
}

function productRelatedLinks(product) {
  const searchText = [
    getZh(product.title),
    product.title.en,
    getZh(product.description),
    product.description.en,
    getZh(product.category),
    product.category.en,
    getZh(product.keywords),
    product.keywords.en
  ].join(' ').toLowerCase();
  const links = [
    routeLink('/configurator', 'Comino Grando 配置器總覽'),
    routeLink('/solutions', '配置器解決方案總覽'),
    routeLink('/solutions/gpu-server-quote', 'GPU 伺服器報價流程'),
    routeLink('/solutions/gpu-server-rfq-checklist', 'GPU 伺服器 RFQ 檢核表')
  ];

  if (searchText.includes('h200')) {
    links.push(routeLink('/solutions/nvidia-h200-server', 'NVIDIA H200 伺服器配置指南'));
  }
  if (searchText.includes('pro 6000')) {
    links.push(routeLink('/solutions/rtx-pro-6000-workstation', 'RTX PRO 6000 工作站配置指南'));
  }
  if (searchText.includes('workstation') || searchText.includes('工作站')) {
    links.push(routeLink('/solutions/ai-workstation-taiwan', '台灣 AI 工作站採購入口'));
  }
  if (searchText.includes('server') || searchText.includes('伺服器') || searchText.includes('integration kit')) {
    links.push(routeLink('/solutions/liquid-cooled-gpu-server', '液冷 GPU 伺服器配置'));
    links.push(routeLink('/solutions/rack-ai-server-deployment', '機架式 AI 伺服器部署'));
  }

  return dedupeLinks(links).slice(0, 5);
}

function solutionRelatedLinks(page) {
  const links = [
    routeLink('/solutions/gpu-server-quote', 'GPU 伺服器報價流程'),
    routeLink('/solutions/gpu-server-rfq-checklist', 'GPU 伺服器 RFQ 檢核表'),
    routeLink('/solutions/nvidia-h200-server', 'NVIDIA H200 伺服器配置'),
    routeLink('/solutions/rtx-pro-6000-workstation', 'RTX PRO 6000 工作站配置'),
    routeLink('/solutions/liquid-cooling-ai-server-procurement', '液冷 AI 伺服器採購')
  ].filter((link) => link.href !== pageUrl(`/solutions/${page.slug}`));

  return dedupeLinks(links).slice(0, 4);
}

function compactList(values) {
  return values.map((value) => String(value || '').trim()).filter(Boolean);
}

function routeKeywords(route) {
  return compactList(String(route.keywords || '').split(',')).slice(0, 4);
}

function routeSpecSummary(specs) {
  return specs
    .slice(0, 4)
    .map((spec) => `${spec.label}：${spec.value}`)
    .join('；');
}

function routeStaticCopy(route, specs, highlights) {
  const keywords = routeKeywords(route);
  const specSummary = routeSpecSummary(specs);
  const firstHighlight = highlights[0] || route.lead || route.description;
  const quoteText = route.quoteHref
    ? '送出詢價時會帶入目前配置連結與表單聯絡資料，方便 EudTech 後續確認正式規格與報價。'
    : '此頁提供進入配置器與相關採購頁面的路徑，便於後續整理詢價需求。';

  return compactList([
    `${route.title} 是 EudTech 針對 ${keywords.length ? keywords.join('、') : 'AI GPU 伺服器與工作站需求'} 建立的配置與詢價入口，重點是讓技術規格、採購語境與可分享連結集中在同一個頁面。`,
    specSummary ? `頁面目前可直接讀取的規格重點包含 ${specSummary}。這些內容可協助採購、IT 與研發團隊在開啟互動配置器前先完成初步判斷。` : '',
    `${firstHighlight} ${quoteText}`,
    '本頁不顯示公開售價或預估價格；正式金額、交期與供應條件需依實際配置與需求，由 EudTech 以正式報價回覆確認。'
  ]);
}

function routeUseCases(route, specs, highlights) {
  const gpuSpec = specs.find((spec) => /GPU|顯示|圖形/i.test(spec.label)) || specs[0];
  const platformSpec = specs.find((spec) => /CPU|平台|機構|型態/i.test(spec.label)) || specs[1];
  const bestFitSpec = specs.find((spec) => /適合|Best fit|需求/i.test(spec.label)) || specs[2];

  return compactList([
    gpuSpec ? `需要先確認 ${gpuSpec.label} 為 ${gpuSpec.value} 的 GPU 伺服器、AI 工作站或整合套件採購。` : '',
    platformSpec ? `需要把 ${platformSpec.label}、記憶體、儲存、電源與網路選項放在同一次規格審查中。` : '',
    bestFitSpec ? `適合以「${bestFitSpec.value}」作為初步需求輪廓，再進入配置器確認細節。` : '',
    highlights[1] ? `${highlights[1]}` : ''
  ]).slice(0, 4);
}

function routeQuoteChecklist(route, specs) {
  const specLabels = specs.slice(0, 4).map((spec) => spec.label).join('、');

  return compactList([
    specLabels ? `確認 ${specLabels} 是否已符合採購或專案需求。` : '確認 GPU、CPU、記憶體、儲存、電源與網路需求是否已整理完成。',
    route.configuratorHref ? '開啟配置器後保留目前選項與可分享連結，避免規格溝通時版本不一致。' : '',
    route.quoteHref ? '使用取得報價流程送出聯絡資料、公司資訊、備註與配置連結。' : '',
    '送出後由 EudTech 透過 info@eudaemonia.tech 追蹤正式報價，不以此靜態頁面上的文字取代正式報價單。'
  ]);
}

function routeFaqs(route, specs = []) {
  const configuredFaqs = (route.faq || []).filter(([question, answer]) => question && answer);
  const specLabels = specs.slice(0, 4).map((spec) => spec.label).join('、');
  const generatedFaqs = [
    [
      `${route.title} 的詢價會包含哪些資訊？`,
      specLabels
        ? `詢價會包含目前頁面的配置連結、${specLabels} 等已選或已整理的資訊，以及使用者在表單中提供的聯絡資料。`
        : '詢價會包含目前頁面的配置連結、已選硬體資訊，以及使用者在表單中提供的聯絡資料。'
    ],
    [
      `${route.title} 是否有公開價格？`,
      '沒有。本頁不顯示預估價格或公開售價；正式報價會依實際配置、採購需求與供應條件由 EudTech 回覆確認。'
    ],
    [
      `${route.title} 適合台灣採購流程使用嗎？`,
      '適合。此頁保留中文搜尋內容、配置器入口、詢價連結與 EudTech 聯絡信箱，便於台灣企業、研究單位與採購團隊整理需求。'
    ]
  ];
  const seen = new Set();

  return [...configuredFaqs, ...generatedFaqs].filter(([question]) => {
    if (seen.has(question)) {
      return false;
    }
    seen.add(question);
    return true;
  }).slice(0, 4);
}

function faqSchema(route) {
  const faqs = routeFaqs(route, (route.specs || []).filter((spec) => spec.label && spec.value));
  if (!faqs.length) {
    return undefined;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer }
    }))
  };
}

function staticSeoFallback(route) {
  const links = dedupeLinks([
    route.configuratorHref ? { label: '開啟配置器', href: pageUrl(route.configuratorHref) } : null,
    route.quoteHref ? { label: '取得報價', href: pageUrl(route.quoteHref) } : null,
    route.path !== '/solutions' ? { label: '查看解決方案', href: pageUrl('/solutions') } : null
  ].filter(Boolean));
  const relatedLinks = dedupeLinks(route.relatedLinks || []);
  const highlights = (route.highlights || []).filter(Boolean);
  const specs = (route.specs || []).filter((spec) => spec.label && spec.value);
  const copy = routeStaticCopy(route, specs, highlights);
  const useCases = routeUseCases(route, specs, highlights);
  const checklist = routeQuoteChecklist(route, specs);
  const faqs = routeFaqs(route, specs);

  return `<main class="static-seo-fallback" data-static-seo-fallback>
      <section aria-labelledby="static-seo-title">
        <div class="static-seo-kicker">EudTech Configurator</div>
        <h1 id="static-seo-title">${escapeHtml(route.title)}</h1>
        <p class="static-seo-lead">${escapeHtml(route.lead || route.description)}</p>
        <nav class="static-seo-actions" aria-label="配置器曝光入口">
          ${links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join('\n          ')}
        </nav>
      </section>
      <section aria-labelledby="static-seo-overview">
        <h2 id="static-seo-overview">配置與詢價說明</h2>
        <div class="static-seo-copy">
          ${copy.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n          ')}
        </div>
      </section>
      ${
        highlights.length
          ? `<section aria-labelledby="static-seo-highlights">
        <h2 id="static-seo-highlights">重點</h2>
        <ul class="static-seo-grid">
          ${highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n          ')}
        </ul>
      </section>`
          : ''
      }
      ${
        specs.length
          ? `<section aria-labelledby="static-seo-specs">
        <h2 id="static-seo-specs">規格與服務資訊</h2>
        <table class="static-seo-specs">
          <tbody>
            ${specs.map((spec) => `<tr><th scope="row">${escapeHtml(spec.label)}</th><td>${escapeHtml(spec.value)}</td></tr>`).join('\n            ')}
          </tbody>
        </table>
      </section>`
          : ''
      }
      ${
        useCases.length
          ? `<section aria-labelledby="static-seo-use-cases">
        <h2 id="static-seo-use-cases">適用情境</h2>
        <ul class="static-seo-grid">
          ${useCases.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n          ')}
        </ul>
      </section>`
          : ''
      }
      ${
        checklist.length
          ? `<section aria-labelledby="static-seo-checklist">
        <h2 id="static-seo-checklist">詢價前檢核</h2>
        <ol class="static-seo-checklist">
          ${checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n          ')}
        </ol>
      </section>`
          : ''
      }
      ${
        faqs.length
          ? `<section aria-labelledby="static-seo-faq">
        <h2 id="static-seo-faq">常見問題</h2>
        <ul class="static-seo-faq">
          ${faqs.map(([question, answer]) => `<li><strong>${escapeHtml(question)}</strong>${escapeHtml(answer)}</li>`).join('\n          ')}
        </ul>
      </section>`
          : ''
      }
      ${
        relatedLinks.length
          ? `<section aria-labelledby="static-seo-related">
        <h2 id="static-seo-related">相關配置器與採購頁面</h2>
        <ul class="static-seo-related">
          ${relatedLinks.map((link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`).join('\n          ')}
        </ul>
      </section>`
          : ''
      }
      <p class="static-seo-contact">正式詢價與配置討論請聯絡 <a href="mailto:info@eudaemonia.tech">info@eudaemonia.tech</a>。</p>
    </main>`;
}

function webPageSchema(route, { title, url, image, imageAlt }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': route.kind === 'collection' ? 'CollectionPage' : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description: route.description,
    inLanguage: 'zh-TW',
    isPartOf: {
      '@id': websiteId
    },
    publisher: {
      '@id': organizationId
    },
    dateModified: schemaDate,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: image,
      width: SOCIAL_IMAGE_WIDTH,
      height: SOCIAL_IMAGE_HEIGHT,
      caption: imageAlt
    },
    breadcrumb: {
      '@id': `${url}#breadcrumb`
    }
  };

  if (route.quoteHref) {
    schema.potentialAction = {
      '@type': 'QuoteAction',
      target: pageUrl(route.quoteHref)
    };
  }

  return schema;
}

function routeSchema(route) {
  if (route.schema) {
    return [...route.schema, faqSchema(route)].filter(Boolean);
  }

  const url = pageUrl(route.path);
  const pageImage = route.image || defaultImage;
  const isArticlePage = route.kind === 'comparison' || route.kind === 'guide' || route.kind === 'checklist';
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首頁', item: siteRootUrl },
        { '@type': 'ListItem', position: 2, name: '配置器解決方案', item: pageUrl('/solutions') },
        { '@type': 'ListItem', position: 3, name: route.serviceName || route.title, item: url }
      ]
    },
    isArticlePage
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: route.serviceName || route.title,
          description: route.description,
          image: pageImage,
          datePublished: schemaDate,
          dateModified: schemaDate,
          author: { '@type': 'Organization', name: 'EudTech', url: siteRootUrl },
          publisher: eudTechOrganization,
          mainEntityOfPage: url
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: route.serviceName || route.title,
          description: route.description,
          serviceType: 'AI GPU server configuration and quote request',
          areaServed: { '@type': 'Country', name: 'Taiwan' },
          provider: eudTechOrganization,
          url,
          image: pageImage,
          potentialAction: route.quoteHref
            ? {
                '@type': 'QuoteAction',
                target: pageUrl(route.quoteHref)
              }
            : undefined
        },
    faqSchema(route)
  ].filter(Boolean);
}

function verificationTags() {
  return [
    googleSiteVerification
      ? `<meta data-rh="true" name="google-site-verification" content="${escapeHtml(googleSiteVerification)}">`
      : '',
    bingSiteVerification ? `<meta data-rh="true" name="msvalidate.01" content="${escapeHtml(bingSiteVerification)}">` : ''
  ].filter(Boolean);
}

function injectHead(baseHtml, route) {
  const title = `${route.title} | ${siteSuffix}`;
  const url = pageUrl(route.path);
  const socialPreview = socialPreviewByPath.get(route.path);
  const image = socialPreview?.socialImageUrl || route.image || defaultImage;
  const imageAlt = socialPreview?.imageAlt || route.imageAlt || route.title;
  const isArticlePage = route.kind === 'comparison' || route.kind === 'guide' || route.kind === 'checklist';
  const ogType = socialPreview?.ogType || (isArticlePage ? 'article' : 'website');
  const articleTimeTags = isArticlePage
    ? [
        `<meta data-rh="true" property="article:published_time" content="${schemaDate}">`,
        `<meta data-rh="true" property="article:modified_time" content="${schemaDate}">`
      ]
    : [];
  const schemaItems = [webPageSchema(route, { title, url, image, imageAlt }), ...routeSchema(route)];
  const managedHead = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta data-rh="true" name="description" content="${escapeHtml(route.description)}">`,
    `<meta data-rh="true" name="keywords" content="${escapeHtml(route.keywords)}">`,
    '<meta data-rh="true" name="author" content="EudTech">',
    '<meta data-rh="true" name="robots" content="index, follow">',
    `<meta data-rh="true" property="og:title" content="${escapeHtml(title)}">`,
    `<meta data-rh="true" property="og:description" content="${escapeHtml(route.description)}">`,
    `<meta data-rh="true" property="og:image" content="${escapeHtml(image)}">`,
    `<meta data-rh="true" property="og:image:secure_url" content="${escapeHtml(image)}">`,
    `<meta data-rh="true" property="og:image:alt" content="${escapeHtml(imageAlt)}">`,
    `<meta data-rh="true" property="og:image:width" content="${SOCIAL_IMAGE_WIDTH}">`,
    `<meta data-rh="true" property="og:image:height" content="${SOCIAL_IMAGE_HEIGHT}">`,
    `<meta data-rh="true" property="og:url" content="${escapeHtml(url)}">`,
    `<meta data-rh="true" property="og:type" content="${ogType}">`,
    '<meta data-rh="true" property="og:site_name" content="EudTech">',
    '<meta data-rh="true" property="og:locale" content="zh_TW">',
    ...articleTimeTags,
    '<meta data-rh="true" name="twitter:card" content="summary_large_image">',
    `<meta data-rh="true" name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta data-rh="true" name="twitter:description" content="${escapeHtml(route.description)}">`,
    `<meta data-rh="true" name="twitter:image" content="${escapeHtml(image)}">`,
    `<meta data-rh="true" name="twitter:image:alt" content="${escapeHtml(imageAlt)}">`,
    `<meta data-rh="true" name="twitter:url" content="${escapeHtml(url)}">`,
    `<link data-rh="true" rel="canonical" href="${escapeHtml(url)}">`,
    `<link data-rh="true" rel="alternate" type="application/rss+xml" title="EudTech Configurator Updates" href="${siteOrigin}/feed.xml">`,
    staticSeoFallbackStyle(),
    ...verificationTags(),
    ...schemaItems
      .filter(Boolean)
      .map((item, index) => `<script data-rh="true" type="application/ld+json" data-static-seo="${index}">${safeJson(item)}</script>`)
  ].join('\n    ');

  return baseHtml
    .replace(/<html lang="[^"]*"/, '<html lang="zh-TW"')
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta[^>]+(?:name|property)="(?:description|keywords|author|robots|og:title|og:description|og:image|og:image:secure_url|og:image:alt|og:image:width|og:image:height|og:url|og:type|og:site_name|og:locale|article:published_time|article:modified_time|twitter:card|twitter:title|twitter:description|twitter:image|twitter:image:alt|twitter:url)"[^>]*>/g, '')
    .replace(/\s*<link[^>]+rel="canonical"[^>]*>/g, '')
    .replace(/\s*<link[^>]+rel="alternate"[^>]+type="application\/rss\+xml"[^>]*>/g, '')
    .replace(/\s*<script[^>]+type="application\/ld\+json"[\s\S]*?<\/script>/g, '')
    .replace('</head>', `    ${managedHead}\n  </head>`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">\n    ${staticSeoFallback(route)}\n    </div>`);
}

function writeRouteHtml(route, html) {
  const outputDir = path.join(distDir, ...route.path.split('/').filter(Boolean));
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
}

if (!fs.existsSync(indexPath)) {
  throw new Error(`Missing dist index: ${indexPath}`);
}

const baseHtml = fs.readFileSync(indexPath, 'utf8');
routes.forEach((route) => writeRouteHtml(route, injectHead(baseHtml, route)));
console.log(`✓ Generated ${routes.length} static SEO route HTML files`);
