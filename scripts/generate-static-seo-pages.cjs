const fs = require('fs');
const { formatSeoTitle, publicProductRoutes, englishRoutes, careersRoute } = require('./seo-public-pages.cjs');
const dates = require('../public/discovery-lastmod.json').entries;
const dateFor = route => dates[pageUrl(route.path)] || {};
const { renderEnglishPage, writeNotFoundPages, writeUtilityPages } = require('./generate-language-seo.cjs');
const path = require('path');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');
const {
  SOCIAL_IMAGE_WIDTH,
  SOCIAL_IMAGE_HEIGHT,
  getConfiguratorSocialPreviewRoutes
} = require('./configurator-social-preview-routes.cjs');
const { SITE_INFORMATION_ROUTES } = require('./site-information-routes.cjs');
const cominoReference = require('../src/data/cominoProcurement.json');
const cominoTestDrive = require('../src/data/cominoTestDrive.json');

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
  email: 'quote@eudaemonia.tech',
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
    email: 'quote@eudaemonia.tech',
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

const awsCloudRoute = {
  path: '/solutions/aws',
  title: 'AWS 雲端銷售服務｜選型、報價與導入',
  description: 'EudTech 協助企業規劃 AWS 運算、儲存、資料庫與生成式 AI，整合需求評估、採購報價、導入與維運範圍。',
  keywords: 'AWS 雲端服務, AWS 報價, Amazon EC2, Amazon S3, Amazon RDS, Amazon Bedrock',
  lead: '從服務選型、預算估算到採購與上線，由 EudTech 台灣窗口整合需求，讓每一筆雲端投資都有清楚的下一步。',
  image: `${siteOrigin}/aws-cloud-services.svg`,
  imageAlt: 'AWS 運算、儲存與資料庫服務規劃示意',
  contentType: 'information',
  quoteHref: '/contact',
  relatedLinks: [routeLink('/solutions', 'EudTech 解決方案'), routeLink('/products', '產品與品牌'), routeLink('/about', '認識 EudTech'), routeLink('/contact', '洽詢 AWS 銷售服務')],
  highlights: ['依工作負載規劃 AWS 運算、儲存備份、資料庫與生成式 AI。', '整合服務選型、預算估算與採購報價。', '確認建置移轉、驗收及維運分工。', '可供服務、計費條件及開通時程，依正式報價確認。'],
  specs: [{ label: '服務範圍', value: '選型、採購報價、導入與維運規劃' }, { label: '規劃方向', value: 'EC2、S3、RDS、Bedrock 等服務' }, { label: '聯絡方式', value: 'quote@eudaemonia.tech' }],
  faq: [],
  schema: [{ '@context': 'https://schema.org', '@type': 'Service', name: 'AWS 雲端銷售服務', description: 'AWS 選型、採購報價與導入規劃。', url: pageUrl('/solutions/aws'), provider: eudTechOrganization, areaServed: { '@type': 'Country', name: 'Taiwan' } }]
};

function configuratorProductLinks() {
  return CONFIGURATOR_PRODUCT_SEO.map((product) =>
    routeLink(product.configuratorHref, `${getZh(product.model)} 配置器`)
  );
}

function configuratorHubItemList() {
  const productItems = CONFIGURATOR_PRODUCT_SEO.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: getZh(product.title),
    url: pageUrl(product.configuratorHref)
  }));
  const solutionItems = [
    ['配置器解決方案總入口', '/solutions'],
    ['GPU 伺服器報價流程', '/solutions/gpu-server-quote'],
    ['GPU 伺服器 RFQ 檢核表', '/solutions/gpu-server-rfq-checklist'],
    ['液冷 GPU 伺服器採購', '/solutions/liquid-cooling-ai-server-procurement']
  ].map(([name, pathname], index) => ({
    '@type': 'ListItem',
    position: productItems.length + index + 1,
    name,
    url: pageUrl(pathname)
  }));

  return productItems.concat(solutionItems);
}

const solutionHubRoute = {
  path: '/solutions',
  title: 'AI 與數位服務解決方案總覽｜EudTech',
  description: '從企業 AWS 雲端銷售、AI 運算工作負載或社群情報需求，選擇 EudTech 三大導入路徑。',
  keywords: 'AI 解決方案, AWS 雲端銷售, AWS 採購, 雲端移轉, AI 運算基礎設施, Cyabra 社群情報, EudTech',
  lead: '從需要改善的營運流程、數位服務、運算工作負載或社群風險開始，進入有明確內容、下一步及可追蹤交付的方案。',
  image: defaultImage,
  imageAlt: 'EudTech AI 解決方案總覽',
  kind: 'collection',
  configuratorHref: '/configurator',
  quoteHref: '/configurator?request=true',
  relatedLinks: [
    routeLink('/solutions/aws', 'AWS 雲端銷售與導入'),
    routeLink('/solutions/ai-infrastructure', 'AI 運算基礎設施'),
    routeLink('/solutions/social-intelligence', '社群情報與品牌保護'),
    routeLink('/products', '產品與品牌'),
    routeLink('/resources', 'GPU 選購'),
    routeLink('/contact', '聯絡與諮詢')
  ],
  highlights: [
    'AWS 雲端銷售：服務選型、用量估算、採購報價與導入規劃。',
    'AI 運算基礎設施：從工作負載到可採購配置。',
    '社群情報：分析假帳號、敘事、擴散與品牌風險。'
  ],
  specs: [
    { label: '方案一', value: 'AWS 雲端銷售與導入' },
    { label: '方案二', value: 'AI 運算基礎設施' },
    { label: '方案三', value: 'Cyabra 社群情報' }
  ],
  faq: [
    ['如何選擇 EudTech 解決方案？', '需要串接既有系統、建立品牌入口、改善企業流程或導入 Agent 時，選擇 AWS 雲端銷售；需要 GPU 伺服器或工作站時選擇 AI 運算基礎設施；需要分析社群風險時選擇社群情報。'],
    ['方案是否可以先做小範圍驗證？', '可以。EudTech 會先定義問題、資料、負責人、證據與成功指標，再以可操作範圍開始。'],
    ['AI 運算方案可以直接配置嗎？', '可以。AI 運算基礎設施頁會連到 Comino 配置器，保留可分享配置並送出詢價。'],
    ['如何開始諮詢？', '使用聯絡頁選擇需求類型，再透過 Microsoft Bookings 或 quote@eudaemonia.tech 安排下一步。']
  ],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首頁', item: siteRootUrl },
        { '@type': 'ListItem', position: 2, name: 'AI 解決方案', item: pageUrl('/solutions') }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'AI 解決方案',
      description: 'EudTech 的 AWS 雲端銷售、AI 運算基礎設施及 Cyabra 社群情報三大方案。',
      url: pageUrl('/solutions'),
      publisher: eudTechOrganization,
      mainEntity: {
        '@type': 'ItemList',
        name: 'EudTech 三大解決方案',
        itemListElement: [
          ['AWS 雲端銷售與導入', '/solutions/aws'],
          ['AI 運算基礎設施', '/solutions/ai-infrastructure'],
          ['社群情報與品牌保護', '/solutions/social-intelligence']
        ].map(([name, pathname], index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name,
          url: pageUrl(pathname)
        }))
      }
    }
  ]
};

const productRoutes = CONFIGURATOR_PRODUCT_SEO.map((product) => {
  const model = getZh(product.model);
  const selectionNotes = (product.exposureNotes || []).map((note) => getZh(note));

  return {
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
      ...selectionNotes,
      `${model}：${getZh(product.category)}`,
      `GPU 重點：${getZh(product.properties.find((property) => getZh(property.name) === 'GPU 重點')?.value || product.category)}`,
      '送出詢價時會保留配置連結，方便技術與採購團隊審查。'
    ],
    specs: product.properties.map((property) => ({
      label: getZh(property.name),
      value: getZh(property.value)
    })),
    faq: [
      ...(selectionNotes.length
        ? [[`${model} 適合哪一類採購與部署評估？`, selectionNotes.join(' ')]]
        : []),
      ...(product.faqs || []).map((faq) => [getZh(faq.question), getZh(faq.answer)])
    ],
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
          { '@type': 'ListItem', position: 3, name: model, item: pageUrl(product.configuratorHref) }
        ]
      }
    ]
  };
});

const informationRouteTitleByPath = new Map(SITE_INFORMATION_ROUTES.map((route) => [route.path, route.title]));
const siteInformationRoutes = SITE_INFORMATION_ROUTES.map((route) => ({
  ...route,
  contentType: 'information',
  image: `${siteOrigin}${route.sourceImage}`,
  configuratorHref: route.path === '/solutions/ai-infrastructure' || route.path === '/resources' ? '/configurator' : undefined,
  quoteHref: route.path === '/solutions/ai-infrastructure' ? '/configurator?request=true' : undefined,
  relatedLinks: route.relatedLinks.map((pathname) => routeLink(pathname, informationRouteTitleByPath.get(pathname) || pathname))
}));

const routes = [
  {
    path: '/',
    title: 'AWS 雲端銷售、GPU 運算與社群情報｜EudTech',
    description: 'EudTech 提供整合的 AWS 雲端銷售與導入、AI GPU 運算基礎設施及 Cyabra 社群情報解決方案。',
    keywords: 'AWS 雲端銷售, AWS 採購, 雲端移轉, AI GPU 伺服器, Comino Grando, Cyabra 社群情報, EudTech',
    lead: 'EudTech 將 AWS 雲端銷售、液冷 GPU 運算基礎設施及社群情報，連接到企業、研究單位與公部門的實際工作與決策流程。',
    imageAlt: 'EudTech AWS 雲端銷售、GPU 運算與社群情報解決方案',
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    relatedLinks: [
      routeLink('/solutions', 'AI 解決方案總覽'),
      routeLink('/solutions/aws', 'AWS 雲端銷售與導入'),
      routeLink('/solutions/ai-infrastructure', 'AI 運算基礎設施'),
      routeLink('/solutions/social-intelligence', '社群情報與品牌保護'),
      routeLink('/products', '產品與品牌'),
      routeLink('/contact', '聯絡與諮詢')
    ],
    highlights: [
      'AWS 雲端銷售整合服務選型、用量估算、採購報價與導入規劃。',
      'AI 運算基礎設施從工作負載連到配置、詢價與部署。',
      'Cyabra 社群情報協助辨識假帳號、敘事與品牌風險。'
    ],
    specs: [
      { label: '方案一', value: 'AWS 雲端銷售與導入' },
      { label: '方案二', value: 'AI GPU 運算基礎設施' },
      { label: '方案三', value: 'Cyabra 社群情報' }
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
    title: 'Comino Grando GPU 伺服器報價配置器',
    description: '配置 Comino Grando GPU 伺服器、RTX PRO 6000 工作站、NVIDIA H200 系統、儲存、電源與網路，並送出可供 RFQ 使用的報價需求。',
    keywords: 'Comino Grando 配置器, GPU 伺服器配置器, NVIDIA H200 伺服器, RTX PRO 6000 工作站, AI 工作站 台灣, GPU 伺服器報價',
    lead: '使用 EudTech 配置器建立 Comino Grando GPU 伺服器或 AI 工作站需求，確認 GPU、CPU、記憶體、儲存、電源與網路後送出報價。',
    imageAlt: 'Comino Grando GPU 伺服器報價配置器',
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    relatedLinks: [
      ...configuratorProductLinks(),
      routeLink('/configurator-links.html', '完整配置器產品連結索引'),
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
      { label: '報價流程', value: '配置器送出至 quote@eudaemonia.tech' },
      { label: '服務區域', value: 'Taiwan' }
    ],
    faq: [
      ['Comino Grando 配置器可以配置哪些項目？', '可以配置 Comino Grando GPU 伺服器與 AI 工作站，包含 GPU、CPU、RAM、OS Drive、Data Drive、Power Supply 與 Network 選項。'],
      ['配置器可以送出 GPU 伺服器報價需求嗎？', '可以。取得報價流程會送出目前配置、配置連結與聯絡資料，讓 EudTech 後續追蹤正式報價。'],
      ['配置器有涵蓋 NVIDIA H200 與 RTX PRO 6000 嗎？', '有。配置器包含 NVIDIA H200 伺服器、RTX PRO 6000 工作站與伺服器，以及相關 Comino Grando 配置入口。'],
      ['這個配置器適合 RFQ 前置準備嗎？', '適合。配置器可把 GPU、CPU、記憶體、儲存、電源與網路選項整理成可分享連結，供技術與採購團隊審查。']
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Comino Grando GPU 伺服器報價配置器',
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
        itemListElement: configuratorHubItemList()
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
  solutionHubRoute,
  awsCloudRoute,
  ...siteInformationRoutes
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

function staticSeoFallbackScript() {
  // Hide the static SEO fallback only while JavaScript is running so visitors do not see it flash
  // before React mounts. Crawlers without JS (and users if the app fails to mount within 4s)
  // still get the fully visible fallback content, so SEO exposure is unchanged.
  return `<script data-static-seo-fallback-js>document.documentElement.classList.add('static-seo-js');setTimeout(function(){document.documentElement.classList.remove('static-seo-js');},4000);</script>`;
}

function staticSeoFallbackStyle() {
  return `<style data-static-seo-fallback>
      html.static-seo-js .static-seo-fallback {
        opacity: 0;
        pointer-events: none;
      }
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

function relatedLinksItemListSchema(route) {
  const links = dedupeLinks(route.relatedLinks || []);
  if (!links.length) {
    return undefined;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl(route.path)}#related-links`,
    name: `${route.title} 相關配置器與採購頁面`,
    itemListElement: links.map((link, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: link.label,
      url: link.href
    }))
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
  const siblingProducts = relatedConfiguratorProducts(product, searchText);

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

  links.push(...siblingProducts);

  return dedupeLinks(links).slice(0, 12);
}

function productSearchText(product) {
  return [
    getZh(product.title),
    product.title.en,
    getZh(product.description),
    product.description.en,
    getZh(product.category),
    product.category.en,
    getZh(product.keywords),
    product.keywords.en,
    getZh(product.model),
    product.model.en
  ]
    .join(' ')
    .toLowerCase();
}

function productMatchScore(candidate, searchText) {
  const candidateText = productSearchText(candidate);
  let score = 0;
  for (const token of ['h200', 'pro 6000', '5090', 'r9700', 'workstation', '工作站', 'server', '伺服器', 'rackable', 'integration kit', '整合套件']) {
    if (searchText.includes(token) && candidateText.includes(token)) {
      score += 3;
    }
  }
  if (searchText.includes('server') && candidateText.includes('伺服器')) score += 2;
  if (searchText.includes('伺服器') && candidateText.includes('server')) score += 2;
  if (searchText.includes('workstation') && candidateText.includes('工作站')) score += 2;
  if (searchText.includes('工作站') && candidateText.includes('workstation')) score += 2;

  return score;
}

function relatedConfiguratorProducts(product, searchText = productSearchText(product)) {
  const explicitRelatedProducts = (product.relatedProductIds || [])
    .map((id) => CONFIGURATOR_PRODUCT_SEO.find((candidate) => candidate.id === id))
    .filter(Boolean)
    .map((candidate) => routeLink(candidate.configuratorHref, `${getZh(candidate.model)} 同系列配置`));

  if (explicitRelatedProducts.length > 0) {
    return dedupeLinks(explicitRelatedProducts).slice(0, 4);
  }

  return CONFIGURATOR_PRODUCT_SEO.filter((candidate) => candidate.id !== product.id)
    .map((candidate, index) => ({
      candidate,
      index,
      score: productMatchScore(candidate, searchText)
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 4)
    .map(({ candidate }) => routeLink(candidate.configuratorHref, `${getZh(candidate.model)} 同系列配置`));
}

function solutionRelatedLinks(page) {
  const searchText = [
    getZh(page.title),
    page.title.en,
    getZh(page.description),
    page.description.en,
    getZh(page.keywords),
    page.keywords.en,
    getZh(page.lead),
    page.lead.en
  ]
    .join(' ')
    .toLowerCase();
  const links = [
    routeLink('/solutions/gpu-server-quote', 'GPU 伺服器報價流程'),
    routeLink('/solutions/gpu-server-rfq-checklist', 'GPU 伺服器 RFQ 檢核表'),
    routeLink('/solutions/nvidia-h200-server', 'NVIDIA H200 伺服器配置'),
    routeLink('/solutions/rtx-pro-6000-workstation', 'RTX PRO 6000 工作站配置'),
    routeLink('/solutions/liquid-cooling-ai-server-procurement', '液冷 AI 伺服器採購')
  ].filter((link) => link.href !== pageUrl(`/solutions/${page.slug}`));

  const productLinks = CONFIGURATOR_PRODUCT_SEO.map((product, index) => ({
    product,
    index,
    score: productMatchScore(product, searchText)
  }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 4)
    .map(({ product }) => routeLink(product.configuratorHref, `${getZh(product.model)} 配置器`));

  return dedupeLinks([...links, ...productLinks]).slice(0, 8);
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
  if (route.contentType === 'information' || !route.path.startsWith('/configurator')) return [route.lead || route.description];
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
  if (route.contentType === 'information' || !route.path.startsWith('/configurator')) return [];
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
  if (route.contentType === 'information' || !route.path.startsWith('/configurator')) return [];
  const specLabels = specs.slice(0, 4).map((spec) => spec.label).join('、');

  return compactList([
    specLabels ? `確認 ${specLabels} 是否已符合採購或專案需求。` : '確認 GPU、CPU、記憶體、儲存、電源與網路需求是否已整理完成。',
    route.contentType === 'information' ? '依本頁提供的分類與內容選擇最符合需求的下一步，並保留需要進一步確認的問題。' : '',
    route.configuratorHref ? '開啟配置器後保留目前選項與可分享連結，避免規格溝通時版本不一致。' : '',
    route.quoteHref ? '使用取得報價流程送出聯絡資料、公司資訊、備註與配置連結。' : '',
    '送出後由 EudTech 透過 quote@eudaemonia.tech 追蹤正式報價，不以此靜態頁面上的文字取代正式報價單。'
  ]);
}

function routeFaqs(route, specs = []) {
  // Only these source-backed solution FAQs are also visible in the React page.
  if (!CONFIGURATOR_SEO_PAGES.some(page => route.path === `/solutions/${page.slug}`)) return [];
  const configuredFaqs = [...(route.faq || []), ...(route.faqs || [])]
    .map((faq) => (Array.isArray(faq) ? faq : [faq.question, faq.answer]))
    .filter(([question, answer]) => question && answer);
  return configuredFaqs.filter(([question], index, all) => all.findIndex(item => item[0] === question) === index);
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

function staticTestDrive(route) {
  if (route.path !== '/solutions/ai-infrastructure') return '';
  const trial = cominoTestDrive;
  const steps = trial.steps.map((step) => `<li><h3>${escapeHtml(step.title.zh)}</h3><p>${escapeHtml(step.body.zh)}</p></li>`).join('');
  const features = trial.features.map((feature) => `<li><h4>${escapeHtml(feature.title.zh)}</h4><p>${escapeHtml(feature.body.zh)}</p></li>`).join('');
  const configurations = trial.configurations.map((config) => `<li><h4>${escapeHtml(config.gpu)}</h4><p>${escapeHtml(config.format.zh)} · ${escapeHtml(trial.memoryLabel.zh)} ${escapeHtml(config.memory)} · ${escapeHtml(config.cpu.zh)} · ${escapeHtml(trial.coolingLabel.zh)}</p><a href="${escapeHtml(config.href)}">${escapeHtml(trial.configurationLabel.zh)} · ${escapeHtml(config.gpu)}</a></li>`).join('');
  return `<section id="test-drive" aria-labelledby="static-seo-test-drive"><p>${escapeHtml(trial.eyebrow.zh)}</p><h2 id="static-seo-test-drive">${escapeHtml(trial.title.zh)}</h2><p>${escapeHtml(trial.description.zh)}</p><p><a href="${escapeHtml(trial.application)}">${escapeHtml(trial.applyLabel.zh)}</a></p><h3>${escapeHtml(trial.ecosystemTitle.zh)}</h3><ul>${features}</ul><a href="${escapeHtml(trial.softwareSource)}">${escapeHtml(trial.softwareLabel.zh)}</a><div id="test-drive-configurations"><h3>${escapeHtml(trial.configurationsTitle.zh)}</h3><ul>${configurations}</ul><p>${escapeHtml(trial.configurationNote.zh)}</p></div><h3>${escapeHtml(trial.stepsTitle.zh)}</h3><ol>${steps}</ol><p>${escapeHtml(trial.terms.zh)}</p><p><a href="${escapeHtml(trial.source)}">${escapeHtml(trial.creditLabel.zh)}</a> <a href="/contact">${escapeHtml(trial.contactLabel.zh)}</a></p></section>`;
}

function staticProcurementReference(route) {
  if (route.procurement) {
    const reference = route.procurement;
    const documents = reference.documents.map((document) => `<li><a href="${escapeHtml(document.readerHrefZh)}">${escapeHtml(document.title.zh)} ${escapeHtml(document.version)}：線上閱讀</a> — ${escapeHtml(document.language.zh)}。${escapeHtml(document.description.zh)} <a href="${escapeHtml(document.hrefZh)}" download>下載中文版 PDF</a> <a href="${escapeHtml(document.source)}">原廠英文原文</a></li>`).join('');
    const criteria = reference.criteria.map((criterion) => {
      const document = reference.documents.find((item) => item.id === criterion.documentId);
      const source = document ? `<a href="${escapeHtml(document.readerHrefZh)}#page-${criterion.page}">中文譯本第 ${escapeHtml(criterion.pages)} 頁</a>` : '';
      return `<li><h3>${escapeHtml(criterion.title.zh)}</h3><p>${escapeHtml(criterion.requirement.zh)}</p><p>${escapeHtml(criterion.evidence.zh)} ${source}</p></li>`;
    }).join('');
    return `<section id="procurement" aria-labelledby="static-seo-procurement"><h2 id="static-seo-procurement">${escapeHtml(reference.title.zh)}</h2><p>文件查核日期：${escapeHtml(reference.reviewedAt)}</p><p>${escapeHtml(reference.translationNote.zh)} 翻譯日期：${escapeHtml(reference.translatedAt)}</p><ul>${documents}</ul><h3>可供規格研議的功能與證據</h3><ul>${criteria}</ul><h3>數值與適用條件</h3><ul>${['cooling', 'power', 'noise', 'temperature'].map((key) => `<li>${escapeHtml(reference.specs[key].zh)}</li>`).join('')}</ul><p>${escapeHtml(reference.conformityNote.zh)}</p><p>${escapeHtml(reference.procurementNote.zh)} <a href="${escapeHtml(reference.procurementSource)}">政府採購法第 26 條</a></p></section>`;
  }
  if (route.path === '/resources' || route.path === '/products' || route.path.startsWith('/configurator')) {
    return `<section aria-labelledby="static-seo-procurement"><h2 id="static-seo-procurement">${escapeHtml(cominoReference.title.zh)}</h2><p>${escapeHtml(cominoReference.configurationNote.zh)}</p><a href="${escapeHtml(cominoReference.href)}">查看功能、適用條件與原廠文件</a></section>`;
  }
  return '';
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
        <div class="static-seo-kicker">EudTech</div>
        <h1 id="static-seo-title">${escapeHtml(route.title)}</h1>
        <p class="static-seo-lead">${escapeHtml(route.lead || route.description)}</p>
        <nav class="static-seo-actions" aria-label="配置器曝光入口">
          ${links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join('\n          ')}
        </nav>
      </section>
      <section aria-labelledby="static-seo-overview">
        <h2 id="static-seo-overview">內容說明</h2>
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
      ${staticTestDrive(route)}
      ${staticProcurementReference(route)}
      <p class="static-seo-contact">正式詢價與配置討論請聯絡 <a href="mailto:quote@eudaemonia.tech">quote@eudaemonia.tech</a>。</p>
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
    dateModified: dateFor(route).modifiedAt,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: image,
      ...(image.includes('/social/configurator/') ? {width:SOCIAL_IMAGE_WIDTH, height:SOCIAL_IMAGE_HEIGHT} : {}),
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
    return [...route.schema, relatedLinksItemListSchema(route), faqSchema(route)].filter(Boolean);
  }

  const url = pageUrl(route.path);
  const pageImage = route.image || defaultImage;
  const isArticlePage = route.kind === 'comparison' || route.kind === 'guide' || route.kind === 'checklist';
  if (route.contentType === 'information') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首頁', item: siteRootUrl },
          { '@type': 'ListItem', position: 2, name: route.title, item: url }
        ]
      },
      relatedLinksItemListSchema(route),
      faqSchema(route)
    ].filter(Boolean);
  }
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
          datePublished: dateFor(route).publishedAt,
          dateModified: dateFor(route).modifiedAt,
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
    relatedLinksItemListSchema(route),
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
  const title = formatSeoTitle(route.title);
  const url = pageUrl(route.path);
  const socialPreview = socialPreviewByPath.get(route.path);
  const image = new URL(socialPreview?.socialImageUrl || route.image || defaultImage, siteOrigin).href;
  const imageAlt = socialPreview?.imageAlt || route.imageAlt || route.title;
  const isArticlePage = route.kind === 'comparison' || route.kind === 'guide' || route.kind === 'checklist';
  const ogType = socialPreview?.ogType || (isArticlePage ? 'article' : 'website');
  const articleTimeTags = isArticlePage
    ? [
        `<meta data-rh="true" property="article:published_time" content="${dateFor(route).publishedAt}">`,
        `<meta data-rh="true" property="article:modified_time" content="${dateFor(route).modifiedAt}">`
      ]
    : [];
  const schemaItems = [webPageSchema(route, { title, url, image, imageAlt }), ...routeSchema(route)].map(item =>
    item && ['WebPage','CollectionPage','Article'].includes(item['@type'])
      ? {...item, url, dateModified:dateFor(route).modifiedAt, ...(item['@type']==='Article'?{datePublished:dateFor(route).publishedAt}:{})} : item);
  const managedHead = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta data-rh="true" name="description" content="${escapeHtml(route.description)}">`,
    ...(route.keywords ? [`<meta data-rh="true" name="keywords" content="${escapeHtml(route.keywords)}">`] : []),
    '<meta data-rh="true" name="author" content="EudTech">',
    '<meta data-rh="true" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">',
    `<meta data-rh="true" property="og:title" content="${escapeHtml(title)}">`,
    `<meta data-rh="true" property="og:description" content="${escapeHtml(route.description)}">`,
    `<meta data-rh="true" property="og:image" content="${escapeHtml(image)}">`,
    `<meta data-rh="true" property="og:image:secure_url" content="${escapeHtml(image)}">`,
    `<meta data-rh="true" property="og:image:alt" content="${escapeHtml(imageAlt)}">`,
    ...(socialPreview ? [`<meta data-rh="true" property="og:image:width" content="${SOCIAL_IMAGE_WIDTH}">`,
      `<meta data-rh="true" property="og:image:height" content="${SOCIAL_IMAGE_HEIGHT}">`] : []),
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
    `<link data-rh="true" rel="alternate" hreflang="zh-Hant" href="${escapeHtml(url)}">`,
    `<link data-rh="true" rel="alternate" hreflang="en" href="${pageUrl(`/en${route.path}`)}">`,
    `<link data-rh="true" rel="alternate" hreflang="x-default" href="${escapeHtml(url)}">`,
    `<link data-rh="true" rel="alternate" type="application/rss+xml" title="EudTech Configurator Updates" href="${siteOrigin}/feed.xml">`,
    `<link data-rh="true" rel="alternate" type="application/feed+json" title="EudTech Configurator Updates" href="${siteOrigin}/feed.json">`,
    `<link data-rh="true" rel="alternate" type="text/markdown" title="EudTech LLM Summary" href="${siteOrigin}/llms.txt">`,
    `<link data-rh="true" rel="alternate" type="text/markdown" title="EudTech Full LLM Context" href="${siteOrigin}/llms-full.txt">`,
    staticSeoFallbackScript(),
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
    .replace(/\s*<link[^>]+rel="alternate"[^>]+type="application\/feed\+json"[^>]*>/g, '')
    .replace(/\s*<link[^>]+rel="alternate"[^>]+type="text\/markdown"[^>]*>/g, '')
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
[...routes, ...publicProductRoutes(), careersRoute].forEach((route) => writeRouteHtml(route, injectHead(baseHtml, route)));
console.log(`✓ Generated ${routes.length + publicProductRoutes().length + 1} Chinese and ${englishRoutes().length} English static SEO pages`);

englishRoutes().forEach(route => writeRouteHtml({path:`/en${route.path}`}, renderEnglishPage(baseHtml, route)));
writeNotFoundPages(distDir);
writeUtilityPages(distDir, baseHtml);
if (process.env.CONTEXT && process.env.CONTEXT !== 'production') {
  fs.appendFileSync(path.join(distDir, '_headers'), '\n/*\n  X-Robots-Tag: noindex, nofollow\n');
}
