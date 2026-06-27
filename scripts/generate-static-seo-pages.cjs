const fs = require('fs');
const path = require('path');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');

const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const { SITE_ORIGIN, CONFIGURATOR_SEO_PAGES } = readConfiguratorSeoPages();
const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';
const siteSuffix = 'EudTech - 下一代AI解決方案';
const defaultImage = `${siteOrigin}/grando-8gpu-server.jpg`;
const googleSiteVerification = process.env.VITE_GOOGLE_SITE_VERIFICATION || '';
const bingSiteVerification = process.env.VITE_BING_SITE_VERIFICATION || '';

const getZh = (value) => value.zh;
const solutionRoutes = CONFIGURATOR_SEO_PAGES.map((page) => ({
  path: `/solutions/${page.slug}`,
  title: getZh(page.title),
  description: getZh(page.description),
  keywords: getZh(page.keywords),
  image: `${siteOrigin}${page.image}`,
  imageAlt: getZh(page.imageAlt),
  serviceName: getZh(page.title),
  kind: page.kind || 'solution',
  faq: page.faqs.map((faq) => [getZh(faq.question), getZh(faq.answer)])
}));

const routes = [
  {
    path: '/',
    title: 'AI GPU 伺服器與 Comino 配置器',
    description: 'EudTech 提供 AI GPU 伺服器、Comino Grando 液冷系統，以及可送出 GPU 伺服器與工作站報價需求的配置器。',
    keywords: 'AI GPU 伺服器, GPU 伺服器報價, Comino Grando, NVIDIA H200 伺服器, RTX PRO 6000 工作站, 液冷 GPU 伺服器, 台灣 AI 工作站',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'EudTech',
        alternateName: 'Eudaemonia Technology',
        url: siteOrigin,
        email: 'info@eudaemonia.tech',
        sameAs: [`${siteOrigin}/configurator`]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'EudTech',
        url: siteOrigin
      }
    ]
  },
  {
    path: '/configurator',
    title: 'Comino Grando GPU 伺服器配置器',
    description: '配置 Comino Grando GPU 伺服器、RTX PRO 工作站、NVIDIA H200 系統、儲存、電源與網路，並向 EudTech 取得報價。',
    keywords: 'Comino Grando 配置器, GPU 伺服器配置器, NVIDIA H200 伺服器, RTX PRO 6000 工作站, AI 工作站 台灣, GPU 伺服器報價',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Comino Grando GPU 伺服器配置器',
        description: '配置 Comino Grando GPU 伺服器與 AI 工作站，並將已選 GPU、CPU、RAM、儲存、電源與網路選項送交 EudTech 追蹤報價。',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: `${siteOrigin}/configurator`,
        provider: {
          '@type': 'Organization',
          name: 'EudTech',
          url: siteOrigin,
          email: 'info@eudaemonia.tech'
        },
        potentialAction: {
          '@type': 'QuoteAction',
          target: `${siteOrigin}/configurator?request=true`
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'EudTech 配置器入口',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'GPU 伺服器報價配置器', url: `${siteOrigin}/solutions/gpu-server-quote` },
          { '@type': 'ListItem', position: 2, name: 'NVIDIA H200 GPU 伺服器配置器', url: `${siteOrigin}/solutions/nvidia-h200-server` },
          { '@type': 'ListItem', position: 3, name: 'RTX PRO 6000 工作站配置器', url: `${siteOrigin}/solutions/rtx-pro-6000-workstation` },
          { '@type': 'ListItem', position: 4, name: '液冷 GPU 伺服器採購', url: `${siteOrigin}/solutions/liquid-cooling-ai-server-procurement` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首頁', item: siteOrigin },
          { '@type': 'ListItem', position: 2, name: '配置器', item: `${siteOrigin}/configurator` }
        ]
      }
    ]
  },
  {
    path: '/configurator/28',
    title: 'GRANDO 機架式工作站 GPU 配置器',
    description: '自訂 GRANDO 機架式工作站的 GPU、CPU、記憶體、NVMe 儲存、電源與網路，並送出完整配置給 EudTech 追蹤報價。',
    keywords: 'GRANDO 機架式工作站, GPU 工作站報價, RTX PRO 6000 工作站, Comino Grando, EudTech',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'GRANDO 機架式工作站 GPU 配置器',
        description: '配置 GRANDO 機架式工作站並送出 GPU 工作站報價需求。',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: `${siteOrigin}/configurator/28`,
        provider: { '@type': 'Organization', name: 'EudTech', url: siteOrigin, email: 'info@eudaemonia.tech' },
        potentialAction: { '@type': 'QuoteAction', target: `${siteOrigin}/configurator/28?request=true` }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首頁', item: siteOrigin },
          { '@type': 'ListItem', position: 2, name: '配置器', item: `${siteOrigin}/configurator` },
          { '@type': 'ListItem', position: 3, name: 'GRANDO 機架式工作站', item: `${siteOrigin}/configurator/28` }
        ]
      }
    ]
  },
  {
    path: '/configurator/29',
    title: 'NVIDIA H200 GPU 伺服器配置器',
    description: '自訂 NVIDIA H200、RTX PRO 6000 與高密度 GPU 伺服器配置，送出 GPU、CPU、RAM、儲存與電源需求給 EudTech 取得報價。',
    keywords: 'NVIDIA H200 GPU 伺服器, H200 伺服器報價, GPU 伺服器配置器, 液冷 GPU 伺服器, Comino Grando',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'NVIDIA H200 GPU 伺服器配置器',
        description: '配置 NVIDIA H200 與高密度 GPU 伺服器並送出正式報價需求。',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: `${siteOrigin}/configurator/29`,
        provider: { '@type': 'Organization', name: 'EudTech', url: siteOrigin, email: 'info@eudaemonia.tech' },
        potentialAction: { '@type': 'QuoteAction', target: `${siteOrigin}/configurator/29?request=true` }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首頁', item: siteOrigin },
          { '@type': 'ListItem', position: 2, name: '配置器', item: `${siteOrigin}/configurator` },
          { '@type': 'ListItem', position: 3, name: 'NVIDIA H200 GPU 伺服器', item: `${siteOrigin}/configurator/29` }
        ]
      }
    ]
  }
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

function routeSchema(route) {
  if (route.schema) {
    return route.schema;
  }

  const url = `${siteOrigin}${route.path}`;
  const pageImage = route.image || defaultImage;
  const isArticlePage = route.kind === 'comparison' || route.kind === 'guide' || route.kind === 'checklist';
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首頁', item: siteOrigin },
        { '@type': 'ListItem', position: 2, name: '配置器解決方案', item: `${siteOrigin}/configurator` },
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
          datePublished: '2026-06-28',
          dateModified: '2026-06-28',
          author: { '@type': 'Organization', name: 'EudTech', url: siteOrigin },
          publisher: {
            '@type': 'Organization',
            name: 'EudTech',
            url: siteOrigin,
            logo: { '@type': 'ImageObject', url: `${siteOrigin}/logo.svg` }
          },
          mainEntityOfPage: url
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: route.serviceName || route.title,
          description: route.description,
          serviceType: 'AI GPU server configuration and quote request',
          areaServed: { '@type': 'Country', name: 'Taiwan' },
          provider: { '@type': 'Organization', name: 'EudTech', url: siteOrigin, email: 'info@eudaemonia.tech' },
          url,
          image: pageImage
        },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (route.faq || []).map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer }
      }))
    }
  ];
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
  const url = `${siteOrigin}${route.path}`;
  const image = route.image || defaultImage;
  const isArticlePage = route.kind === 'comparison' || route.kind === 'guide' || route.kind === 'checklist';
  const managedHead = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta data-rh="true" name="description" content="${escapeHtml(route.description)}">`,
    `<meta data-rh="true" name="keywords" content="${escapeHtml(route.keywords)}">`,
    '<meta data-rh="true" name="author" content="EudTech">',
    '<meta data-rh="true" name="robots" content="index, follow">',
    `<meta data-rh="true" property="og:title" content="${escapeHtml(title)}">`,
    `<meta data-rh="true" property="og:description" content="${escapeHtml(route.description)}">`,
    `<meta data-rh="true" property="og:image" content="${escapeHtml(image)}">`,
    `<meta data-rh="true" property="og:image:alt" content="${escapeHtml(route.imageAlt || route.title)}">`,
    '<meta data-rh="true" property="og:image:width" content="1200">',
    '<meta data-rh="true" property="og:image:height" content="630">',
    `<meta data-rh="true" property="og:url" content="${escapeHtml(url)}">`,
    `<meta data-rh="true" property="og:type" content="${isArticlePage ? 'article' : 'website'}">`,
    '<meta data-rh="true" property="og:site_name" content="EudTech">',
    '<meta data-rh="true" property="og:locale" content="zh_TW">',
    '<meta data-rh="true" name="twitter:card" content="summary_large_image">',
    `<meta data-rh="true" name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta data-rh="true" name="twitter:description" content="${escapeHtml(route.description)}">`,
    `<meta data-rh="true" name="twitter:image" content="${escapeHtml(image)}">`,
    `<meta data-rh="true" name="twitter:image:alt" content="${escapeHtml(route.imageAlt || route.title)}">`,
    `<meta data-rh="true" name="twitter:url" content="${escapeHtml(url)}">`,
    `<link data-rh="true" rel="canonical" href="${escapeHtml(url)}">`,
    `<link data-rh="true" rel="alternate" type="application/rss+xml" title="EudTech Configurator Updates" href="${siteOrigin}/feed.xml">`,
    ...verificationTags(),
    ...routeSchema(route).map((item, index) => `<script data-rh="true" type="application/ld+json" data-static-seo="${index}">${safeJson(item)}</script>`)
  ].join('\n    ');

  return baseHtml
    .replace(/<html lang="[^"]*"/, '<html lang="zh-TW"')
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta[^>]+(?:name|property)="(?:description|keywords|author|robots|og:title|og:description|og:image|og:image:alt|og:image:width|og:image:height|og:url|og:type|og:site_name|og:locale|twitter:card|twitter:title|twitter:description|twitter:image|twitter:image:alt|twitter:url)"[^>]*>/g, '')
    .replace(/\s*<link[^>]+rel="canonical"[^>]*>/g, '')
    .replace(/\s*<link[^>]+rel="alternate"[^>]+type="application\/rss\+xml"[^>]*>/g, '')
    .replace(/\s*<script[^>]+type="application\/ld\+json"[\s\S]*?<\/script>/g, '')
    .replace('</head>', `    ${managedHead}\n  </head>`);
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
