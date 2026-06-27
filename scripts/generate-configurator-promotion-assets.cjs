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
          keyword: googleKeyword,
          landing_page: landingPage,
          utm_url: utmUrl
        });
      }
    }
  }
}

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

1. Google Ads 使用 \`docs/configurator-promotion-keywords.csv\` 匯入或人工建立廣告群組。
2. LinkedIn、Email、業務開發使用 \`docs/configurator-promotion-links.csv\` 內的 UTM 連結。
3. 所有推廣連結都保留 \`utm_source\`、\`utm_medium\`、\`utm_campaign\`、\`utm_content\`，搜尋廣告另保留 \`utm_term\`。
4. 實際投放前必須先在 Netlify 設定 GA4、GTM、Google Ads 或 LinkedIn 追蹤 ID。

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
`;

const outputs = [
  ['configurator-promotion-assets.md', markdown],
  ['configurator-promotion-keywords.csv', keywordCsv],
  ['configurator-promotion-links.csv', promotionLinksCsv]
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
      promotionLinkRows: linkRows.length
    },
    null,
    2
  )
);
