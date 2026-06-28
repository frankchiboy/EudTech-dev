const fs = require('fs');
const path = require('path');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');

const args = new Set(process.argv.slice(2));
const checkOnly = args.has('--check');
const docsDir = path.resolve(__dirname, '..', 'docs');
const { SITE_ORIGIN, CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();
const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';

const getText = (value, language) => value[language];
const escapeCsv = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
const slugToCampaign = (slug) => `configurator_${slug.replace(/-/g, '_')}`;
const keywordList = (value) =>
  String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const normalizeTerm = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);

const titleCase = (value) => `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
const googleAdsLength = (value) =>
  [...String(value)].reduce((total, character) => total + (character.charCodeAt(0) > 255 ? 2 : 1), 0);
const validGoogleAdsText = (value, maxLength) => googleAdsLength(value) <= maxLength;

const withUtm = (landingPage, params) => {
  const url = new URL(landingPage);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
};

const landingPages = [
  {
    type: 'configurator',
    slug: 'configurator',
    path: '/configurator',
    title: { en: 'Comino Grando GPU Server Configurator', zh: 'Comino Grando GPU 伺服器配置器' },
    description: {
      en: 'Main configurator entry for GPU server and workstation quote requests.',
      zh: 'GPU 伺服器與工作站報價需求的主要配置器入口。'
    },
    keywords: {
      en: 'Comino Grando configurator, GPU server configurator, GPU server quote',
      zh: 'Comino Grando 配置器, GPU 伺服器配置器, GPU 伺服器報價'
    },
    intent: 'main configurator'
  },
  {
    type: 'solution-hub',
    slug: 'solutions',
    path: '/solutions',
    title: { en: 'Configurator Solutions Hub', zh: '配置器解決方案總覽' },
    description: {
      en: 'Solution hub for GPU server, AI workstation, procurement, power, rack, and liquid-cooling configurator landing pages.',
      zh: 'GPU 伺服器、AI 工作站、採購、電力、機架與液冷配置器落地頁總覽。'
    },
    keywords: {
      en: 'configurator solutions, GPU server quote guide, AI server configurator',
      zh: '配置器解決方案, GPU 伺服器報價指南, AI 伺服器配置器'
    },
    intent: 'solution hub'
  },
  ...CONFIGURATOR_PRODUCT_SEO.map((product) => ({
    type: 'configurator-product',
    slug: `configurator-${product.id}`,
    path: product.configuratorHref,
    title: product.title,
    description: product.description,
    keywords: product.keywords,
    intent: getText(product.category, 'en')
  })),
  ...CONFIGURATOR_SEO_PAGES.map((page) => ({
    type: page.kind || 'solution',
    slug: page.slug,
    path: `/solutions/${page.slug}`,
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    intent: page.kind || 'solution'
  }))
];

const keywordRows = [];
for (const page of landingPages) {
  for (const language of ['zh', 'en']) {
    const campaign = slugToCampaign(page.slug);
    const landingPage = canonicalPageUrl(`${siteOrigin}${page.path}`, siteOrigin);
    for (const keyword of keywordList(getText(page.keywords, language))) {
      for (const matchType of ['exact', 'phrase']) {
        const googleKeyword = matchType === 'exact' ? `[${keyword}]` : `"${keyword}"`;
        const utmTerm = normalizeTerm(keyword);
        const utmUrl = withUtm(landingPage, {
          utm_source: 'google',
          utm_medium: 'cpc',
          utm_campaign: campaign,
          utm_term: utmTerm,
          utm_content: `${language}_${matchType}`
        });
        keywordRows.push({
          channel: 'google_ads',
          campaign,
          ad_group: page.slug,
          language,
          intent: page.intent,
          match_type: matchType,
          keyword_text: keyword,
          keyword: googleKeyword,
          landing_page: landingPage,
          utm_url: utmUrl
        });
      }
    }
  }
}

const shortEnglishHeadlines = {
  configurator: 'Grando Configurator',
  solutions: 'Configurator Solutions',
  'configurator-28': 'GRANDO Rack Workstation',
  'configurator-29': 'H200 GPU Configurator',
  'nvidia-h200-server': 'H200 GPU Server Quote',
  'rtx-pro-6000-workstation': 'RTX PRO 6000 Workstation',
  'ai-workstation-taiwan': 'AI Workstation Taiwan',
  'liquid-cooled-gpu-server': 'Liquid GPU Server Quote',
  'gpu-server-quote': 'GPU Server Quote',
  'h200-vs-rtx-pro-6000': 'H200 vs RTX PRO 6000',
  'gpu-server-rfq-checklist': 'GPU Server RFQ Checklist',
  'liquid-cooling-ai-server-procurement': 'Liquid AI Server Guide',
  'gpu-server-power-planning': 'GPU Power Planning',
  'rack-ai-server-deployment': 'Rack AI Server Deploy',
  'taiwan-public-procurement-gpu-server': 'Public GPU Procurement',
  'supermicro-comino-gpu-server-comparison': 'Supermicro vs Comino',
  'ai-inference-server-taiwan': 'AI Inference Server TW'
};

const shortChineseHeadlines = {
  configurator: 'GPU伺服器報價',
  solutions: '配置器解決方案',
  'configurator-28': 'AI工作站報價',
  'configurator-29': 'H200伺服器報價',
  'nvidia-h200-server': 'H200伺服器報價',
  'rtx-pro-6000-workstation': 'RTX工作站報價',
  'ai-workstation-taiwan': '台灣AI工作站',
  'liquid-cooled-gpu-server': '液冷AI伺服器',
  'gpu-server-quote': 'GPU伺服器報價',
  'h200-vs-rtx-pro-6000': 'AI GPU比較',
  'gpu-server-rfq-checklist': 'GPU採購檢核',
  'liquid-cooling-ai-server-procurement': '液冷採購規劃',
  'gpu-server-power-planning': 'GPU電力規劃',
  'rack-ai-server-deployment': '機架AI伺服器',
  'taiwan-public-procurement-gpu-server': '公部門GPU採購',
  'supermicro-comino-gpu-server-comparison': 'GPU伺服器比較',
  'ai-inference-server-taiwan': 'AI推論伺服器'
};

const searchAdCopyByLanguage = {
  en: {
    headlines: (page) => [
      shortEnglishHeadlines[page.slug] || 'GPU Server Quote',
      'Configure With EudTech',
      'Formal RFQ Follow-Up'
    ],
    descriptions: () => [
      'Configure GPU, CPU, memory, NVMe, power, and network assumptions before RFQ.',
      'Send the selected build to EudTech for formal quote follow-up.'
    ],
    path1: 'configurator',
    path2: 'quote'
  },
  zh: {
    headlines: (page) => [
      shortChineseHeadlines[page.slug] || 'GPU伺服器報價',
      '液冷AI配置',
      'EudTech詢價'
    ],
    descriptions: () => [
      '整理GPU、CPU、記憶體與NVMe配置，送出後由EudTech追蹤正式報價。',
      '適合AI訓練、推論、HPC與採購規格確認。'
    ],
    path1: 'configurator',
    path2: 'quote'
  }
};

const organicCopyTemplates = {
  technical: {
    audience: '技術團隊',
    medium: 'organic',
    source: 'linkedin',
    ctaZh: '開啟配置器',
    ctaEn: 'Open configurator',
    zh: (page) =>
      `${getText(page.title, 'zh')}已可先整理 GPU、CPU、記憶體、NVMe、電源與網路假設。技術團隊可用配置器把討論內容轉成可追蹤的配置連結，再交給 EudTech 進行正式報價確認。`,
    en: (page) =>
      `${getText(page.title, 'en')} helps technical teams align GPU, CPU, memory, NVMe, power, and networking assumptions before RFQ. Use the configurator to create a trackable build link for EudTech quote follow-up.`
  },
  procurement: {
    audience: '採購團隊',
    medium: 'organic',
    source: 'linkedin',
    ctaZh: '取得配置連結',
    ctaEn: 'Get configuration link',
    zh: (page) =>
      `採購 GPU 伺服器或 AI 工作站時，先用「${getText(page.title, 'zh')}」把規格、用途與配置假設集中在同一個連結，方便內部審查與後續詢價。`,
    en: (page) =>
      `For GPU server or AI workstation procurement, ${getText(page.title, 'en')} keeps configuration assumptions and quote context in one reviewable link.`
  },
  rfq_followup: {
    audience: '詢價追蹤',
    medium: 'outreach',
    source: 'email',
    ctaZh: '回覆此信並附上配置',
    ctaEn: 'Reply with the configuration',
    zh: (page) =>
      `您好，這是「${getText(page.title, 'zh')}」的配置入口。若您正在評估 AI 訓練、推論、HPC 或 GPU 工作站需求，可先用此連結整理配置，再回覆給我們安排正式報價。`,
    en: (page) =>
      `Hello, this is the configuration entry for ${getText(page.title, 'en')}. If you are evaluating AI training, inference, HPC, or GPU workstation requirements, you can use this link to prepare the build before requesting a formal quote.`
  }
};

const googleAdsEditorRows = keywordRows.map((row) => ({
  Campaign: `EudTech Configurator ${row.language.toUpperCase()}`,
  'Campaign type': 'Search',
  Networks: 'Google Search',
  'Ad group': row.ad_group,
  Keyword: row.keyword_text,
  Type: titleCase(row.match_type),
  'Final URL': row.utm_url,
  Status: 'Paused',
  Comment: row.intent
}));

const searchAdCopyRows = [];
for (const page of landingPages) {
  const campaign = slugToCampaign(page.slug);
  const landingPage = canonicalPageUrl(`${siteOrigin}${page.path}`, siteOrigin);
  for (const language of ['zh', 'en']) {
    const copy = searchAdCopyByLanguage[language];
    const headlines = copy.headlines(page);
    const descriptions = copy.descriptions(page);
    const row = {
      campaign,
      ad_group: page.slug,
      language,
      title_zh: getText(page.title, 'zh'),
      title_en: getText(page.title, 'en'),
      landing_page: landingPage,
      final_url: withUtm(landingPage, {
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: campaign,
        utm_content: `${language}_search_ad`
      }),
      path_1: copy.path1,
      path_2: copy.path2,
      headline_1: headlines[0],
      headline_2: headlines[1],
      headline_3: headlines[2],
      description_1: descriptions[0],
      description_2: descriptions[1]
    };
    row.valid = [
      validGoogleAdsText(row.headline_1, 30),
      validGoogleAdsText(row.headline_2, 30),
      validGoogleAdsText(row.headline_3, 30),
      validGoogleAdsText(row.description_1, 90),
      validGoogleAdsText(row.description_2, 90),
      validGoogleAdsText(row.path_1, 15),
      validGoogleAdsText(row.path_2, 15)
    ].every(Boolean) ? 'yes' : 'no';
    searchAdCopyRows.push(row);
  }
}

const organicCopyRows = [];
for (const page of landingPages) {
  const campaign = slugToCampaign(page.slug);
  const landingPage = canonicalPageUrl(`${siteOrigin}${page.path}`, siteOrigin);
  for (const [content, template] of Object.entries(organicCopyTemplates)) {
    const utmUrl = withUtm(landingPage, {
      utm_source: template.source,
      utm_medium: template.medium,
      utm_campaign: campaign,
      utm_content: content
    });
    organicCopyRows.push({
      source: template.source,
      medium: template.medium,
      campaign,
      content,
      audience: template.audience,
      title_zh: getText(page.title, 'zh'),
      title_en: getText(page.title, 'en'),
      copy_zh: template.zh(page),
      copy_en: template.en(page),
      cta_zh: template.ctaZh,
      cta_en: template.ctaEn,
      landing_page: landingPage,
      utm_url: utmUrl
    });
  }
}

const linkedinTrackingRows = landingPages.map((page) => {
  const campaign = slugToCampaign(page.slug);
  const landingPage = canonicalPageUrl(`${siteOrigin}${page.path}`, siteOrigin);
  return {
    campaign,
    title_zh: getText(page.title, 'zh'),
    title_en: getText(page.title, 'en'),
    landing_page: landingPage,
    static_organic_url: withUtm(landingPage, {
      utm_source: 'linkedin',
      utm_medium: 'organic',
      utm_campaign: campaign,
      utm_content: 'organic_post'
    }),
    paid_static_parameters: `utm_source=linkedin&utm_medium=paid_social&utm_campaign=${campaign}&utm_content=creative`,
    paid_dynamic_parameters_current: 'utm_source=linkedin&utm_medium=paid_social&utm_campaign={{CAMPAIGN_NAME}}&utm_content={{CREATIVE_ID}}',
    paid_dynamic_parameters_oct_2025: 'utm_source=linkedin&utm_medium=paid_social&utm_campaign={{CAMPAIGN_NAME}}&utm_content={{AD_ID}}'
  };
});

const linkRows = [];
const socialVariants = [
  ['linkedin', 'organic', 'technical', '技術團隊'],
  ['linkedin', 'organic', 'procurement', '採購團隊'],
  ['email', 'outreach', 'rfq_followup', '詢價追蹤']
];
for (const page of landingPages) {
  const campaign = slugToCampaign(page.slug);
  const landingPage = canonicalPageUrl(`${siteOrigin}${page.path}`, siteOrigin);
  for (const [source, medium, content, audience] of socialVariants) {
    linkRows.push({
      source,
      medium,
      campaign,
      content,
      audience,
      title_zh: getText(page.title, 'zh'),
      title_en: getText(page.title, 'en'),
      landing_page: landingPage,
      utm_url: withUtm(landingPage, {
        utm_source: source,
        utm_medium: medium,
        utm_campaign: campaign,
        utm_content: content
      })
    });
  }
}

const csv = (rows, columns) =>
  [
    columns.join(','),
    ...rows.map((row) => columns.map((column) => escapeCsv(row[column])).join(','))
  ].join('\n') + '\n';

const promotionLinksCsv = csv(linkRows, [
  'source',
  'medium',
  'campaign',
  'content',
  'audience',
  'title_zh',
  'title_en',
  'landing_page',
  'utm_url'
]);

const keywordCsv = csv(keywordRows, [
  'channel',
  'campaign',
  'ad_group',
  'language',
  'intent',
  'match_type',
  'keyword',
  'landing_page',
  'utm_url'
]);

const googleAdsEditorKeywordCsv = csv(googleAdsEditorRows, [
  'Campaign',
  'Campaign type',
  'Networks',
  'Ad group',
  'Keyword',
  'Type',
  'Final URL',
  'Status',
  'Comment'
]);

const searchAdCopyCsv = csv(searchAdCopyRows, [
  'campaign',
  'ad_group',
  'language',
  'title_zh',
  'title_en',
  'landing_page',
  'final_url',
  'path_1',
  'path_2',
  'headline_1',
  'headline_2',
  'headline_3',
  'description_1',
  'description_2',
  'valid'
]);

const organicCopyCsv = csv(organicCopyRows, [
  'source',
  'medium',
  'campaign',
  'content',
  'audience',
  'title_zh',
  'title_en',
  'copy_zh',
  'copy_en',
  'cta_zh',
  'cta_en',
  'landing_page',
  'utm_url'
]);

const linkedinTrackingCsv = csv(linkedinTrackingRows, [
  'campaign',
  'title_zh',
  'title_en',
  'landing_page',
  'static_organic_url',
  'paid_static_parameters',
  'paid_dynamic_parameters_current',
  'paid_dynamic_parameters_oct_2025'
]);

const priorityPagesMarkdown = landingPages
  .map((page) => {
    const url = canonicalPageUrl(`${siteOrigin}${page.path}`, siteOrigin);
    return `| ${page.type} | ${getText(page.title, 'zh')} | ${getText(page.keywords, 'zh')} | ${url} |`;
  })
  .join('\n');

const topSearchGroupsMarkdown = landingPages
  .slice(0, 12)
  .map((page, index) => {
    const keywords = keywordList(getText(page.keywords, 'zh')).slice(0, 4).join('、');
    const landingPage = canonicalPageUrl(`${siteOrigin}${page.path}`, siteOrigin);
    return `${index + 1}. ${getText(page.title, 'zh')}：${keywords}。落地頁：${landingPage}`;
  })
  .join('\n');

const linkedinDraftsMarkdown = landingPages
  .filter((page) => ['configurator', 'configurator-29', 'gpu-server-quote', 'nvidia-h200-server', 'rtx-pro-6000-workstation', 'gpu-server-rfq-checklist'].includes(page.slug))
  .map((page) => {
    const landingPage = canonicalPageUrl(`${siteOrigin}${page.path}`, siteOrigin);
    const technicalUrl = withUtm(landingPage, {
      utm_source: 'linkedin',
      utm_medium: 'organic',
      utm_campaign: slugToCampaign(page.slug),
      utm_content: 'technical'
    });
    return `### ${getText(page.title, 'zh')}\n\n技術與採購團隊可以先用配置器整理 GPU、CPU、記憶體、NVMe、電源與網路假設，再把配置連結交給 EudTech 追蹤報價。\n\n${technicalUrl}\n`;
  })
  .join('\n');

const markdown = `# Configurator Promotion Assets

此文件由 \`npm run generate:promotion-assets\` 產生，來源是 \`src/data/configuratorSeoPages.ts\` 與 \`src/data/configuratorProductSeo.ts\`。

## 使用方式

1. Google Ads 使用 \`docs/configurator-promotion-keywords.csv\` 做規劃，或使用 \`docs/configurator-google-ads-editor-keywords.csv\` 匯入 Google Ads Editor。
2. 搜尋廣告文案使用 \`docs/configurator-search-ad-copy.csv\`，此檔會標記 headline、description、path 長度是否合格。
3. LinkedIn、Email、業務開發使用 \`docs/configurator-promotion-links.csv\` 內的 UTM 連結。
4. 完整自然曝光文案使用 \`docs/configurator-organic-posts.csv\`，覆蓋每個 landing page 的技術、採購、詢價追蹤三種情境。
5. LinkedIn Campaign Manager URL tracking 參數使用 \`docs/configurator-linkedin-url-parameters.csv\`。
6. 所有推廣連結都保留 \`utm_source\`、\`utm_medium\`、\`utm_campaign\`、\`utm_content\`，搜尋廣告另保留 \`utm_term\`。
7. 實際投放前必須先在 Netlify 設定 GA4、GTM、Google Ads 或 LinkedIn 追蹤 ID。

## Priority Landing Pages

| 類型 | 頁面 | 主要關鍵字 | URL |
|---|---|---|---|
${priorityPagesMarkdown}

## Google Ads Search Groups

${topSearchGroupsMarkdown}

## LinkedIn Organic Drafts

${linkedinDraftsMarkdown}
## Tracking Requirements

| 平台 | 必要設定 | 主要轉換 |
|---|---|---|
| GA4 / GTM | \`VITE_GTM_ID\` 或 \`VITE_GA_MEASUREMENT_ID\` | \`configurator_lead_intent\` |
| Google Ads | \`VITE_GOOGLE_ADS_ID\`、\`VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL\` | \`quote_submit_success\` |
| LinkedIn Insight | \`VITE_LINKEDIN_PARTNER_ID\`、\`VITE_LINKEDIN_QUOTE_CONVERSION_ID\` | \`quote_submit_success\` |
| Search Console | sitemap 已提交後追蹤 query、page、impressions、clicks | 非即時，需等待 Google 收錄與曝光 |

## Platform Import Notes

1. Google Ads Editor CSV 使用英文欄位：\`Campaign\`、\`Campaign type\`、\`Networks\`、\`Ad group\`、\`Keyword\`、\`Type\`、\`Final URL\`、\`Status\`。
2. Google 搜尋廣告文案包遵守 headline 30、description 90、path 15 的長度上限；中文字元以雙寬字元計算。
3. LinkedIn Campaign Manager 可使用 static UTM 或 dynamic URL parameters；新階層參數可用 \`AD_ID\`，舊階層仍保留 \`CREATIVE_ID\` 供帳戶畫面對照。
`;

const outputs = [
  ['configurator-promotion-assets.md', markdown],
  ['configurator-promotion-keywords.csv', keywordCsv],
  ['configurator-promotion-links.csv', promotionLinksCsv],
  ['configurator-google-ads-editor-keywords.csv', googleAdsEditorKeywordCsv],
  ['configurator-search-ad-copy.csv', searchAdCopyCsv],
  ['configurator-organic-posts.csv', organicCopyCsv],
  ['configurator-linkedin-url-parameters.csv', linkedinTrackingCsv]
];

const mismatches = [];
for (const [filename, content] of outputs) {
  const outputPath = path.join(docsDir, filename);
  if (checkOnly) {
    const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';
    if (current !== content) {
      mismatches.push(filename);
    }
  } else {
    fs.writeFileSync(outputPath, content);
  }
}

if (mismatches.length > 0) {
  console.error(
    JSON.stringify(
      {
        ok: false,
        error: 'Promotion assets are out of date. Run npm run generate:promotion-assets.',
        files: mismatches
      },
      null,
      2
    )
  );
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      mode: checkOnly ? 'check' : 'write',
      landingPages: landingPages.length,
      keywordRows: keywordRows.length,
      promotionLinkRows: linkRows.length,
      googleAdsEditorRows: googleAdsEditorRows.length,
      searchAdCopyRows: searchAdCopyRows.length,
      organicCopyRows: organicCopyRows.length,
      linkedinTrackingRows: linkedinTrackingRows.length
    },
    null,
    2
  )
);
