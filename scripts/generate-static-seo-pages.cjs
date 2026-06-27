const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const siteOrigin = 'https://eudaemonia.tech';
const siteSuffix = 'EudTech - 下一代AI解決方案';
const defaultImage = `${siteOrigin}/grando-8gpu-server.jpg`;
const googleSiteVerification = process.env.VITE_GOOGLE_SITE_VERIFICATION || '';
const bingSiteVerification = process.env.VITE_BING_SITE_VERIFICATION || '';

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
  },
  {
    path: '/solutions/nvidia-h200-server',
    title: 'NVIDIA H200 GPU 伺服器配置器',
    description: '配置液冷 NVIDIA H200 GPU 伺服器，適用於 AI 訓練、推論與 HPC 工作負載，並可直接送出配置需求取得正式報價。',
    keywords: 'NVIDIA H200 伺服器, H200 GPU 伺服器, AI 訓練伺服器, HPC GPU 伺服器, GPU 伺服器報價, 液冷 GPU 伺服器, 台灣 AI 伺服器',
    image: `${siteOrigin}/grando-8gpu-server.jpg`,
    serviceName: 'NVIDIA H200 GPU 伺服器配置器',
    faq: [
      ['沒有選完所有零件也可以詢價嗎？', '可以。配置器會送出目前選擇狀態，未完成或選配項目可由 EudTech 後續確認。'],
      ['這個頁面適合台灣採購使用嗎？', '適合。EudTech 可協助台灣客戶進行本地諮詢與報價追蹤。']
    ]
  },
  {
    path: '/solutions/rtx-pro-6000-workstation',
    title: 'RTX PRO 6000 AI 工作站配置器',
    description: '配置 RTX PRO 6000 工作站，適用於 AI 開發、渲染、模擬與本地推論，並可直接送出需求給 EudTech 追蹤報價。',
    keywords: 'RTX PRO 6000 工作站, AI 工作站, GPU 工作站報價, NVIDIA 工作站 台灣, 本地 AI 推論工作站',
    image: `${siteOrigin}/comino-workstation-front.png`,
    serviceName: 'RTX PRO 6000 AI 工作站配置器',
    faq: [
      ['可以比較 RTX PRO 6000 與 H200 配置嗎？', '可以。分別使用工作站與機架式配置路徑，再把兩個連結交給 EudTech 比較。'],
      ['詢價會包含儲存與 CPU 選項嗎？', '會。送出內容包含已選 GPU、CPU、RAM、儲存與配置連結。']
    ]
  },
  {
    path: '/solutions/ai-workstation-taiwan',
    title: '台灣 AI 工作站配置器',
    description: '為台灣團隊配置 AI 工作站，支援 GPU 加速、本地推論、模型開發、渲染與模擬工作負載。',
    keywords: 'AI 工作站 台灣, GPU 工作站 台灣, AI 電腦報價, NVIDIA 工作站報價, 本地 AI 工作站',
    image: `${siteOrigin}/grando-desktop-01.jpg`,
    serviceName: '台灣 AI 工作站配置器',
    faq: [
      ['配置只是初稿也可以請 EudTech 協助嗎？', '可以。送出初稿配置後，EudTech 可依工作負載、預算與部署需求協助調整。'],
      ['這只適合大型伺服器嗎？', '不是。配置器包含工作站與伺服器方向，團隊可從符合場域的機構型態開始。']
    ]
  },
  {
    path: '/solutions/liquid-cooled-gpu-server',
    title: '液冷 GPU 伺服器配置器',
    description: '探索適合長時間 AI 與 HPC 工作負載的液冷 GPU 伺服器配置，並可配置 Grando 系統後向 EudTech 取得正式報價。',
    keywords: '液冷 GPU 伺服器, 液冷 AI 伺服器, Comino Grando, GPU 伺服器配置器, AI 伺服器報價 台灣',
    image: `${siteOrigin}/GRANDO DPR 4090-FT_6_01.jpg`,
    serviceName: '液冷 GPU 伺服器配置器',
    faq: [
      ['液冷 GPU 伺服器適合什麼情境？', '適合長時間、高密度 GPU 運算，例如 AI 訓練、HPC、模擬與資料中心工作負載。'],
      ['配置器會保留電源與散熱相關資訊嗎？', '會。配置連結會保留目前的 GPU、CPU、電源、儲存與網路選項，方便後續討論。']
    ]
  },
  {
    path: '/solutions/gpu-server-quote',
    title: 'GPU 伺服器報價與配置需求',
    description: '用 EudTech configurator 產生 GPU 伺服器與 AI 工作站報價需求，保留 GPU、CPU、RAM、儲存、電源與網路配置脈絡。',
    keywords: 'GPU 伺服器報價, AI 伺服器報價, server configurator, GPU server RFQ, AI workstation quote Taiwan',
    image: `${siteOrigin}/grando-8gpu-server.jpg`,
    serviceName: 'GPU 伺服器報價與配置需求',
    faq: [
      ['送出報價後會寄到哪裡？', '配置器報價需求會寄到 info@eudaemonia.tech，並包含配置摘要與連結。'],
      ['可以把配置連結給內部採購審查嗎？', '可以。分享功能會複製目前配置 URL，方便工程、採購與主管同步審查。']
    ]
  }
];

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
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: route.serviceName || route.title,
      description: route.description,
      serviceType: 'AI GPU server configuration and quote request',
      areaServed: { '@type': 'Country', name: 'Taiwan' },
      provider: { '@type': 'Organization', name: 'EudTech', url: siteOrigin, email: 'info@eudaemonia.tech' },
      url,
      image: route.image || defaultImage
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
  const managedHead = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta data-rh="true" name="description" content="${escapeHtml(route.description)}">`,
    `<meta data-rh="true" name="keywords" content="${escapeHtml(route.keywords)}">`,
    '<meta data-rh="true" name="author" content="EudTech">',
    '<meta data-rh="true" name="robots" content="index, follow">',
    `<meta data-rh="true" property="og:title" content="${escapeHtml(title)}">`,
    `<meta data-rh="true" property="og:description" content="${escapeHtml(route.description)}">`,
    `<meta data-rh="true" property="og:image" content="${escapeHtml(image)}">`,
    `<meta data-rh="true" property="og:image:alt" content="${escapeHtml(route.title)}">`,
    `<meta data-rh="true" property="og:url" content="${escapeHtml(url)}">`,
    '<meta data-rh="true" property="og:type" content="website">',
    '<meta data-rh="true" property="og:site_name" content="EudTech">',
    '<meta data-rh="true" property="og:locale" content="zh_TW">',
    '<meta data-rh="true" name="twitter:card" content="summary_large_image">',
    `<meta data-rh="true" name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta data-rh="true" name="twitter:description" content="${escapeHtml(route.description)}">`,
    `<meta data-rh="true" name="twitter:image" content="${escapeHtml(image)}">`,
    `<meta data-rh="true" name="twitter:url" content="${escapeHtml(url)}">`,
    `<link data-rh="true" rel="canonical" href="${escapeHtml(url)}">`,
    ...verificationTags(),
    ...routeSchema(route).map((item, index) => `<script data-rh="true" type="application/ld+json" data-static-seo="${index}">${safeJson(item)}</script>`)
  ].join('\n    ');

  return baseHtml
    .replace(/<html lang="[^"]*"/, '<html lang="zh-TW"')
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta[^>]+(?:name|property)="(?:description|keywords|author|robots|og:title|og:description|og:image|og:image:alt|og:url|og:type|og:site_name|og:locale|twitter:card|twitter:title|twitter:description|twitter:image|twitter:url)"[^>]*>/g, '')
    .replace(/\s*<link[^>]+rel="canonical"[^>]*>/g, '')
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
