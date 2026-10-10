const authoritySources = require('../src/data/authoritySources.json');
const organization = require('../src/data/organization.json');
const homepageContent = require('../src/data/homepageContent.json');
const serviceQuestions = require('../src/data/serviceQuestions.json');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');
const { getConfiguratorSocialPreviewRoutes } = require('./configurator-social-preview-routes.cjs');
const { SITE_INFORMATION_ROUTES } = require('./site-information-routes.cjs');
const { publicProductRoutes, englishRoutes, careersRoute } = require('./seo-public-pages.cjs');
const cominoReference = require('../src/data/cominoProcurement.json');
const cominoConformity = require('../src/data/cominoConformity.json');

const { SITE_ORIGIN, CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO, getConfiguratorGuideSources, getConfiguratorGuideSourceHref } = readConfiguratorSeoPages();
const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';
const publicDir = path.resolve(__dirname, '..', 'public');
const pageUrl = (routePath) => canonicalPageUrl(`${siteOrigin}${routePath}`, siteOrigin);
const socialPreviewRoutes = getConfiguratorSocialPreviewRoutes();
const CONFIGURATOR_LINK_INDEX_PATH = '/configurator-links.html';
const now = new Date();
const taipeiDateParts = Object.fromEntries(
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
    .formatToParts(now)
    .filter((part) => part.type !== 'literal')
    .map((part) => [part.type, part.value])
);
const buildDate = `${taipeiDateParts.year}-${taipeiDateParts.month}-${taipeiDateParts.day}`;
const lastmodManifestPath = path.join(publicDir, 'discovery-lastmod.json');

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getZh = (value) => value.zh;
const contentHash = (value) => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const readLastmodManifest = () => {
  if (!fs.existsSync(lastmodManifestPath)) {
    return { entries: {} };
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(lastmodManifestPath, 'utf8'));
    return parsed && typeof parsed === 'object' && parsed.entries && typeof parsed.entries === 'object'
      ? parsed
      : { entries: {} };
  } catch {
    return { entries: {} };
  }
};
const formatRfc822Date = (dateValue) => {
  const date = new Date(`${dateValue}T00:00:00+08:00`);
  const weekday = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Taipei', weekday: 'short' }).format(date);
  const month = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Taipei', month: 'short' }).format(date);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Taipei',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value])
  );
  return `${weekday}, ${parts.day} ${month} ${parts.year} 00:00:00 +0800`;
};
const priorityBySlug = {
  'nvidia-h200-server': '0.9',
  'rtx-pro-6000-workstation': '0.9',
  'gpu-server-quote': '0.9',
  'h200-vs-rtx-pro-6000': '0.88',
  'gpu-server-rfq-checklist': '0.88',
  'comino-grando-configurator-taiwan': '0.9',
  'h200-gpu-server-rfq-taiwan': '0.9',
  'rtx-pro-6000-local-ai-inference': '0.88',
  'ai-server-procurement-case-taiwan': '0.88'
};
const solutionUrls = CONFIGURATOR_SEO_PAGES.map((page) => ({
  loc: pageUrl(`/solutions/${page.slug}`),
  title: getZh(page.title),
  description: getZh(page.description),
  priority: priorityBySlug[page.slug] || '0.85',
  source: page
}));
const productUrls = CONFIGURATOR_PRODUCT_SEO.map((product) => ({
  loc: pageUrl(product.configuratorHref),
  title: getZh(product.title),
  description: getZh(product.description),
  priority: product.id === 28 || product.id === 29 ? '0.9' : '0.86',
  source: product
}));
const homepageUrl = {
  loc: `${siteOrigin}/`,
  title: `${homepageContent.zh.seo.title}｜EudTech`,
  description: homepageContent.zh.seo.description,
  priority: '1.0',
  source: {
    title: `${homepageContent.zh.seo.title}｜EudTech`,
    description: homepageContent.zh.seo.description
  }
};
const solutionHubUrl = {
  loc: pageUrl('/solutions'),
  title: 'AI 與數位服務解決方案總覽｜EudTech',
  description: '從 PQC 遷移顧問、AWS 雲端銷售、AI 運算工作負載或社群情報需求，選擇 EudTech 四大導入路徑。',
  priority: '0.93',
  source: {
    title: 'AI 與數位服務解決方案總覽｜EudTech',
    description: 'EudTech 的 PQC 遷移顧問、AWS 雲端銷售、AI 運算基礎設施及 Cyabra 社群情報四大方案。',
    solutionSlugs: CONFIGURATOR_SEO_PAGES.map((page) => page.slug)
  }
};
const awsCloudUrl = {
  loc: pageUrl('/solutions/aws'),
  title: '企業 AWS 雲端銷售與導入',
  description: '協助企業規劃 AWS 運算、儲存、資料庫與生成式 AI，整合需求評估、採購報價、導入與維運範圍。',
  priority: '0.92',
  source: {
    title: '企業 AWS 雲端銷售與導入',
    description: 'EudTech 協助 AWS 選型、預算估算、採購報價與導入規劃。'
  }
};
const configuratorUrl = {
  loc: pageUrl('/configurator'),
  title: 'Comino Grando GPU 伺服器報價配置器',
  description: '配置 Comino Grando GPU 伺服器、RTX PRO 6000 工作站、NVIDIA H200 系統、儲存、電源與網路，並送出可供 RFQ 使用的報價需求。',
  priority: '0.95',
  source: {
    title: 'Comino Grando GPU 伺服器報價配置器',
    description: '配置 Comino Grando GPU 伺服器、RTX PRO 6000 工作站、NVIDIA H200 系統、儲存、電源與網路，並送出可供 RFQ 使用的報價需求。',
    productIds: CONFIGURATOR_PRODUCT_SEO.map((product) => product.id)
  }
};
const configuratorLinkIndexUrl = {
  loc: pageUrl(CONFIGURATOR_LINK_INDEX_PATH),
  title: 'EudTech 配置器公開連結索引',
  description: 'EudTech Comino Grando 配置器、GPU 伺服器報價、NVIDIA H200、RTX PRO 6000、RFQ 與液冷 AI 伺服器採購入口索引。',
  priority: '0.82',
  source: {
    title: 'EudTech 配置器公開連結索引',
    description: 'EudTech Comino Grando 配置器、GPU 伺服器報價、NVIDIA H200、RTX PRO 6000、RFQ 與液冷 AI 伺服器採購入口索引。',
    products: CONFIGURATOR_PRODUCT_SEO.map((product) => ({ id: product.id, title: product.title, description: product.description })),
    solutions: CONFIGURATOR_SEO_PAGES.map((page) => ({ slug: page.slug, title: page.title, description: page.description }))
  }
};
const siteInformationUrls = SITE_INFORMATION_ROUTES.map((route) => ({
  loc: pageUrl(route.path),
  title: route.title,
  description: route.description,
  priority: route.priority,
  source: route
}));

const sitemapEntries = [
  { ...homepageUrl, changefreq: 'weekly' },
  { ...configuratorUrl, changefreq: 'weekly' },
  { ...solutionHubUrl, changefreq: 'weekly' },
  { ...awsCloudUrl, changefreq: 'weekly' },
  ...siteInformationUrls.map((entry) => ({
    ...entry,
    changefreq: SITE_INFORMATION_ROUTES.find((route) => pageUrl(route.path) === entry.loc)?.changefreq || 'monthly'
  })),
  ...productUrls.map((entry) => ({ ...entry, changefreq: 'weekly' })),
  ...solutionUrls.map((entry) => ({ ...entry, changefreq: 'weekly' }))
];
for (const route of [...publicProductRoutes(), careersRoute]) sitemapEntries.push({loc:pageUrl(route.path),title:route.title,description:route.description,source:route,priority:'0.7',changefreq:'monthly'});
for (const route of englishRoutes()) sitemapEntries.push({loc:pageUrl(`/en${route.path}`),title:route.title,description:route.description,source:route,priority:'0.7',changefreq:'monthly'});
for (const document of cominoReference.documents) sitemapEntries.push({loc:`${siteOrigin}${document.readerHrefZh.replace(/\.html$/, '').toLowerCase()}`,title:document.title.zh,description:document.description.zh,source:document,priority:'0.6',changefreq:'monthly'});
for (const document of cominoConformity.documents) sitemapEntries.push({loc:`${siteOrigin}${document.readerHrefZh.replace(/\.html$/, '').toLowerCase()}`,title:document.title.zh,description:document.summary.zh,source:document,priority:'0.6',changefreq:'monthly'});
const previousLastmodManifest = readLastmodManifest();
const sourcePages = {'/':'src/data/content.ts','/solutions':'src/components/pages/SolutionsOverviewPage.tsx','/solutions/aws':'src/components/pages/AwsCloudSolutionPage.tsx','/solutions/ai-infrastructure':'src/components/pages/AiInfrastructureSolutionPage.tsx','/solutions/social-intelligence':'src/components/pages/SocialIntelligenceSolutionPage.tsx','/products':'src/components/pages/ProductsOverviewPage.tsx','/resources':'src/components/pages/ResourcesOverviewPage.tsx','/about':'src/components/pages/AboutPage.tsx','/contact':'src/components/pages/ContactPage.tsx','/privacy':'src/components/pages/PrivacyPage.tsx','/careers':'src/components/CareersPage.tsx'};
function bodyFingerprint(loc) {
  const pathname=(new URL(loc).pathname.replace(/^\/en(?=\/|$)/,'').replace(/\/$/,'') || '/');
  const guide = CONFIGURATOR_SEO_PAGES.find(page => pathname === `/solutions/${page.slug}`);
  const service = serviceQuestions.services.find(item => item.path === `${pathname}/`);
  const files = sourcePages[pathname] ? [sourcePages[pathname]] : [];
  if (service) files.push('src/components/pages/ServiceFaqList.tsx');
  if (service?.id === 'pqc') files.push('src/components/pages/PqcAdvisoryPage.tsx', 'src/data/pqcAdvisory.ts');
  if (service?.id === 'cyabra') files.push('src/components/pages/CyabraExperiencePage.tsx', 'src/data/cyabraExperience.ts');
  if (pathname==='/contact') files.push('src/components/contact/ContactInfo.tsx','src/components/contact/OnlineMeetingBooking.tsx','src/data/siteArchitecture.ts','src/data/organization.json');
  if (pathname==='/about') files.push('src/data/authoritySources.json','src/data/organization.json');
  if (pathname==='/solutions/ai-infrastructure') files.push('src/data/cominoProcurement.json','src/data/cominoConformity.json','src/data/cominoTestDrive.json');
  if (guide) files.push('src/components/pages/ConfiguratorSolutionPage.tsx');
  if (guide?.comparison) files.push('src/components/pages/GpuComparisonTable.tsx');
  if (/^\/products\/\d+$/.test(pathname)) files.push('src/data/productData.ts');
  if (pathname.startsWith('/vendor/')) files.push('docs/comino-document-translations-zh.json','src/data/cominoConformity.json');
  return [
    ...files.map(file=>[file,crypto.createHash('sha256').update(fs.readFileSync(path.resolve(__dirname,'..',file))).digest('hex')]),
    ...(guide ? [['manufacturerSources', contentHash(getConfiguratorGuideSources(guide.slug))]] : []),
    ...(service ? [['serviceQuestions', contentHash(service)]] : []),
    ...(guide?.comparison ? [['gpuComparison', contentHash(guide.comparison)]] : [])
  ];
}
const lastmodEntries = Object.fromEntries(sitemapEntries.map((entry) => {
  const hash = contentHash({
    loc: entry.loc,
    changefreq: entry.changefreq,
    priority: entry.priority,
    source: entry.source,
    body: bodyFingerprint(entry.loc)
  });
  const previous = previousLastmodManifest.entries?.[entry.loc];
  const unchanged = previous?.hash === hash && /^\d{4}-\d{2}-\d{2}$/.test(previous.modifiedAt || '');
  const publishedAt = /^\d{4}-\d{2}-\d{2}$/.test(previous?.publishedAt || '')
    ? previous.publishedAt
    : buildDate;
  return [entry.loc, {
    hash,
    publishedAt,
    modifiedAt: unchanged ? previous.modifiedAt : buildDate
  }];
}));
const lastmodFor = (loc) => lastmodEntries[loc]?.modifiedAt || buildDate;
const publishedAtFor = (loc) => lastmodEntries[loc]?.publishedAt || buildDate;
const latestModifiedAt = Object.values(lastmodEntries)
  .map((entry) => entry.modifiedAt)
  .sort()
  .at(-1) || buildDate;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${lastmodFor(entry.loc)}</lastmod>
    ${entry.loc.includes('/vendor/') ? '' : (() => {
      const pathname = new URL(entry.loc).pathname.replace(/^\/en(?=\/|$)/, '') || '/';
      const zh = pageUrl(pathname), en = pageUrl(`/en${pathname}`);
      return [['zh-Hant',zh],['en',en],['x-default',zh]].map(([lang,href]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(href)}"/>`).join('\n    ');
    })()}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const sitemapIndexEntries = [
  `${siteOrigin}/sitemap.xml`,
  `${siteOrigin}/image-sitemap.xml`,
  `${siteOrigin}/feed.xml`
];
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexEntries
  .map(
    (loc) => `  <sitemap>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${latestModifiedAt}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>
`;

const robots = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

Sitemap: ${siteOrigin}/sitemap.xml
Sitemap: ${siteOrigin}/image-sitemap.xml
Sitemap: ${siteOrigin}/feed.xml
Sitemap: ${siteOrigin}/sitemap-index.xml
`;

const pageImageEntries = socialPreviewRoutes.map((route) => ({
  loc: route.canonicalUrl,
  images: [{ loc: route.socialImageUrl }]
}));

const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pageImageEntries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${lastmodFor(entry.loc)}</lastmod>
${entry.images
  .map(
    (image) => `    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>
    </image:image>`
  )
  .join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>
`;

const feedEntries = [configuratorUrl, solutionHubUrl, awsCloudUrl, ...siteInformationUrls, ...productUrls, ...solutionUrls];
const feedItems = feedEntries
  .map(
    (entry) => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(entry.loc)}</link>
      <guid>${escapeXml(entry.loc)}</guid>
      <pubDate>${formatRfc822Date(lastmodFor(entry.loc))}</pubDate>
      <description>${escapeXml(entry.description)}</description>
    </item>`
  )
  .join('\n');

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>EudTech Solutions and Resources</title>
    <link>${pageUrl('/solutions')}</link>
    <description>EudTech AWS cloud sales, AI infrastructure, social intelligence, products, resources, and consultation entry points.</description>
    <language>zh-TW</language>
    <lastBuildDate>${formatRfc822Date(latestModifiedAt)}</lastBuildDate>
    <atom:link href="${siteOrigin}/feed.xml" rel="self" type="application/rss+xml" />
${feedItems}
  </channel>
</rss>
`;

const jsonFeed = JSON.stringify(
  {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'EudTech Solutions and Resources',
    home_page_url: pageUrl('/solutions'),
    feed_url: `${siteOrigin}/feed.json`,
    description: 'EudTech AWS cloud sales, AI infrastructure, social intelligence, products, resources, and consultation entry points.',
    language: 'zh-TW',
    authors: [
      {
        name: 'EudTech',
        url: siteOrigin
      }
    ],
    items: feedEntries.map((entry) => ({
      id: entry.loc,
      url: entry.loc,
      title: entry.title,
      summary: entry.description,
      content_text: `${entry.title}\n\n${entry.description}\n\n${entry.loc}`,
      date_published: `${publishedAtFor(entry.loc)}T00:00:00+08:00`,
      date_modified: `${lastmodFor(entry.loc)}T00:00:00+08:00`
    }))
  },
  null,
  2
);

// Use the same public URL inventory as the sitemap, including both languages
// and document readers. This is a reference directory, not a ranking signal.
const llmsDirectory = [
  ['繁體中文頁面 / Traditional Chinese pages', entry => !entry.loc.startsWith(`${siteOrigin}/en/`) && !entry.loc.startsWith(`${siteOrigin}/vendor/`)],
  ['English pages', entry => entry.loc.startsWith(`${siteOrigin}/en/`)],
  ['中文文件閱讀頁 / Traditional Chinese document readers', entry => entry.loc.startsWith(`${siteOrigin}/vendor/`)]
].map(([heading, include]) => `## ${heading}\n\n${sitemapEntries.filter(include).map(entry => `- [${entry.title}](${entry.loc}): ${entry.description}`).join('\n')}`).join('\n\n');

const documentReaderUrl = document => `${siteOrigin}${document.readerHrefZh.replace(/\.html$/, '').toLowerCase()}`;
const cominoDocumentContext = `## Comino 原廠文件 / Manufacturer documents

${cominoReference.translationNote.zh}
${cominoReference.translationNote.en}

- 文件查核 / Documents reviewed: ${cominoReference.reviewedAt}
- 中文翻譯 / Translation date: ${cominoReference.translatedAt}

${cominoReference.documents.map(document => `### ${document.title.zh} / ${document.title.en}

- Version: ${document.version}
- 中文閱讀 / Chinese reader: ${documentReaderUrl(document)}
- 中文 PDF / Chinese PDF: ${siteOrigin}${document.hrefZh}
- English PDF: ${siteOrigin}${document.href}
- Manufacturer source: ${document.source}`).join('\n\n')}

## Comino 型號別符合性聲明 / Model-specific declarations

${cominoConformity.translationBoundary.zh}
${cominoConformity.translationBoundary.en}

- 文件查核 / Reviewed: ${cominoConformity.reviewedAt}

${cominoConformity.documents.map(document => `### ${document.title.zh} / ${document.title.en}

- Model: ${document.model}
- Submodels: ${document.submodels.join(', ')}
- 中文查閱稿 / Chinese reference reader: ${documentReaderUrl(document)}
- 中文查閱稿 PDF / Chinese reference PDF: ${siteOrigin}${document.hrefZh}
- Manufacturer source URL: ${document.source}
- ${document.summary.zh}
- ${document.summary.en}`).join('\n\n')}

### FCC 證據邊界 / FCC evidence boundary

${cominoConformity.fccBoundary.zh}
${cominoConformity.fccBoundary.en}

## Comino 採購問答 / Procurement questions

以下為 EudTech 的選型解讀，請連同原廠文件及交付型號、BOM 核對。
EudTech selection guidance; review the manufacturer documents and supplied model/BOM together.

${cominoReference.faqs.map(faq => {
  const document = cominoReference.documents.find(item => item.id === faq.documentId);
  return `### ${faq.question.zh}

${faq.answer.zh}

- 問答連結: ${pageUrl('/solutions/ai-infrastructure')}#${faq.id}
- 引用文件: ${documentReaderUrl(document)}#page-${faq.page}

### ${faq.question.en}

${faq.answer.en}

- Answer URL: ${pageUrl('/en/solutions/ai-infrastructure')}#${faq.id}
- Cited document: ${siteOrigin}${document.href}#page=${faq.page}`;
}).join('\n\n')}`;

const localized = (value) => `${getZh(value)} / ${value.en}`;
const formatSpecs = (specs) => specs.map((spec) => `  - ${localized(spec.label)}: ${localized(spec.value)}`).join('\n');
const formatProperties = (properties) => properties.map((property) => `  - ${localized(property.name)}: ${localized(property.value)}`).join('\n');
const formatHighlights = (highlights) => highlights.map((highlight) => `  - ${highlight.zh} / ${highlight.en}`).join('\n');
const relatedProductUrls = (product) =>
  (product.relatedProductIds || [])
    .map((id) => CONFIGURATOR_PRODUCT_SEO.find((candidate) => candidate.id === id))
    .filter(Boolean)
    .map((candidate) => `  - ${localized(candidate.model)}: ${pageUrl(candidate.configuratorHref)}`)
    .join('\n');
const formatFaqs = (faqs, slug) =>
  faqs
    .map(
      (faq) => `  - Q: ${localized(faq.question)}
    A: ${localized(faq.answer)}
    Answer URL (zh-TW): ${pageUrl(`/solutions/${slug}`)}#${faq.id}
    Answer URL (en): ${pageUrl(`/en/solutions/${slug}`)}#${faq.id}`
    )
    .join('\n');

const llms = `# EudTech 官網資料導覽 / Website reference

${homepageContent.zh.seo.description}
${homepageContent.en.seo.description}

${llmsDirectory}

## Full Context

For detailed product, solution, quote, and FAQ context, read ${siteOrigin}/llms-full.txt

## Quote Flow

可用配置器整理 GPU、CPU、RAM、儲存、電源與網路需求；供貨、價格與正式規格以確認後的報價及 BOM 為準。
Use the configurator to prepare GPU, CPU, RAM, storage, power and networking requirements. Availability, pricing and formal specifications depend on the confirmed quotation and BOM.

## Contact

- Email: quote@eudaemonia.tech
- Site: ${siteOrigin}/
`;

const llmsFull = `# EudTech Solutions Full Context

Generated for AI assistants, search tools, and researchers that need a structured summary of EudTech solutions, products, resources, and configurator routes.

## Business Context

- Company: EudTech / Eudaemonia Technology
- Region: Taiwan
- Contact: quote@eudaemonia.tech
- Services: PQC migration advisory, AWS cloud sales and implementation, Comino AI infrastructure, and Cyabra social intelligence.
- Configurable items: GPU, CPU, RAM, OS drive, data drives, power supply, and networking.
- Public pricing: not published. Availability, pricing, warranty and acceptance criteria require a confirmed quotation and BOM.

## 公司與引用來源 / Company and sources

- 公司名稱 / Legal name: ${organization.legalName}
- English name: ${organization.alternateName[0]}
- 統一編號 / Taiwan business number: ${organization.taxID}
- 設立日期 / Established: ${organization.foundingDate}
- 登記地址 / Registered office: ${organization.address.addressRegion}${organization.address.addressLocality}${organization.address.streetAddress}
- 公司資料 / Company details: ${siteOrigin}/about/#verified-company-identity
- English details: ${siteOrigin}/en/about/#verified-company-identity
- 來源查核日期 / Sources last checked: ${authoritySources.lastVerified}

${authoritySources.sources.map(source => `- [${source.title.zh} / ${source.title.en}](${source.url}): ${source.description.zh} ${source.description.en}`).join('\n')}

公司與合作身分來源不等於特定型號的供貨、合規或商務承諾；這些項目仍須依型號文件與正式報價確認。
${authoritySources.scopeNote}

${llmsDirectory}

${cominoDocumentContext}

## 服務問答 / Service questions

以下為 EudTech 的服務與技術範圍說明，與各服務頁的可見問答一致；正式範圍、授權與費用仍依個案確認。
These EudTech explanations match the visible service-page answers. Confirm formal scope, licensing, and costs for each engagement.

${serviceQuestions.services.map(service => `### ${service.title.zh} / ${service.title.en}

${service.questions.map(question => `#### ${question.question.zh}

${question.answer.zh}
答案連結: ${siteOrigin}${service.path}#${question.id}

#### ${question.question.en}

${question.answer.en}
Answer URL: ${siteOrigin}/en${service.path}#${question.id}`).join('\n\n')}`).join('\n\n')}

## Site Information Routes

${SITE_INFORMATION_ROUTES.map((route) => `### ${route.title}

- URL: ${pageUrl(route.path)}
- Description: ${route.description}
- Lead: ${route.lead}
- Highlights:
${route.highlights.map((highlight) => `  - ${highlight}`).join('\n')}
- Details:
${route.specs.map((spec) => `  - ${spec.label}: ${spec.value}`).join('\n')}`).join('\n\n')}

## Configurator Product Routes

${CONFIGURATOR_PRODUCT_SEO.map(
  (product) => `### ${localized(product.title)}

- URL: ${pageUrl(product.configuratorHref)}
- Quote URL: ${pageUrl(product.quoteHref)}
- Model: ${localized(product.model)}
- Product ID: ${product.productId}
- Brand: ${product.brand}
- Manufacturer: ${product.manufacturer}
- Category: ${localized(product.category)}
- Description: ${localized(product.description)}
- Keywords: ${localized(product.keywords)}
- Image: ${siteOrigin}${product.image}
- Image alt: ${localized(product.imageAlt)}
- Exposure notes:
${formatHighlights(product.exposureNotes || [])}
- Related configurator routes:
${relatedProductUrls(product)}
- Properties:
${formatProperties(product.properties)}`
).join('\n\n')}

## Solution Routes

${CONFIGURATOR_SEO_PAGES.map(
  (page) => `### ${localized(page.title)}

- URL: ${pageUrl(`/solutions/${page.slug}`)}
- Kind: ${page.kind || 'solution'}
- Configurator URL: ${pageUrl(page.configuratorHref)}
- Quote URL: ${pageUrl(page.quoteHref)}
- Description: ${localized(page.description)}
- Keywords: ${localized(page.keywords)}
- Hero: ${localized(page.hero)}
- Lead: ${localized(page.lead)}
- Image: ${siteOrigin}${page.image}
- Image alt: ${localized(page.imageAlt)}
- Highlights:
${formatHighlights(page.highlights)}
- Specification cues:
${formatSpecs(page.specs)}
${page.comparison ? `- Manufacturer comparison (checked ${page.comparison.reviewedAt}):
  - Chinese URL: ${pageUrl(`/solutions/${page.slug}`)}#${page.comparison.id}
  - English URL: ${pageUrl(`/en/solutions/${page.slug}`)}#${page.comparison.id}
  - ${localized(page.comparison.title)}
  - ${localized(page.comparison.summary)}
  - ${localized(page.comparison.scope)}
${page.comparison.rows.map(row => `  - ${localized(row.label)}: ${page.comparison.columns.map((column, i) => `${column}: ${row.values[i]}`).join('; ')}${row.note ? `\n    ${localized(row.note)}` : ''}`).join('\n')}
  - ${localized(page.comparison.boundary)}
` : ''}- FAQs:
${formatFaqs(page.faqs, page.slug)}
- Manufacturer reference sources (hardware and deployment; commercial terms require a formal EudTech quote):
${getConfiguratorGuideSources(page.slug).map(source => `  - ${localized(source.title)}
    Scope: ${localized(source.description)}
    Reference (zh-TW): ${getConfiguratorGuideSourceHref(source, false)}
    Reference (en): ${getConfiguratorGuideSourceHref(source, true)}`).join('\n')}`
).join('\n\n')}

## 選擇閱讀入口 / Choosing a starting point

- GPU server and AI workstation configuration: ${pageUrl('/configurator')}.
- GPU server quotation requirements: ${pageUrl('/solutions/gpu-server-quote')}.
- NVIDIA H200 training and HPC planning: ${pageUrl('/solutions/nvidia-h200-server')}.
- RTX PRO 6000 workstation and local inference planning: ${pageUrl('/solutions/rtx-pro-6000-workstation')}.
- Procurement and RFQ preparation: ${pageUrl('/solutions/gpu-server-rfq-checklist')}.
`;

const configuratorLinkListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: configuratorLinkIndexUrl.title,
  description: configuratorLinkIndexUrl.description,
  url: configuratorLinkIndexUrl.loc,
  inLanguage: 'zh-TW',
  isPartOf: {
    '@type': 'WebSite',
    name: 'EudTech',
    url: siteOrigin
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'EudTech Configurator URLs',
    itemListElement: [configuratorUrl, solutionHubUrl, awsCloudUrl, ...siteInformationUrls, ...productUrls, ...solutionUrls].map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.title,
      url: entry.loc
    }))
  }
};

const linkCard = (entry) => `          <li>
            <a href="${escapeHtml(entry.loc)}">${escapeHtml(entry.title)}</a>
            <p>${escapeHtml(entry.description)}</p>
          </li>`;

const configuratorLinksHtml = `<!doctype html>
<html lang="zh-TW">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(configuratorLinkIndexUrl.title)} | EudTech</title>
    <meta name="description" content="${escapeHtml(configuratorLinkIndexUrl.description)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${escapeHtml(configuratorLinkIndexUrl.loc)}">
    <link rel="alternate" type="application/rss+xml" title="EudTech Configurator Updates" href="${siteOrigin}/feed.xml">
    <link rel="alternate" type="application/feed+json" title="EudTech Configurator Updates" href="${siteOrigin}/feed.json">
    <link rel="alternate" type="text/markdown" title="EudTech LLM Summary" href="${siteOrigin}/llms.txt">
    <link rel="alternate" type="text/markdown" title="EudTech Full LLM Context" href="${siteOrigin}/llms-full.txt">
    <style>
      :root {
        color-scheme: light dark;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      body {
        margin: 0;
        background: #f8fafc;
        color: #111827;
      }
      header {
        background: #0f172a;
        color: #ffffff;
      }
      nav {
        box-sizing: border-box;
        display: flex;
        max-width: 1080px;
        margin: 0 auto;
        padding: 18px 20px;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
      }
      nav > a {
        color: #67e8f9;
        font-size: 1.15rem;
        font-weight: 800;
        text-decoration: none;
      }
      .nav-links {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 16px;
      }
      .nav-links a {
        color: #e2e8f0;
        font-size: .9rem;
        font-weight: 700;
      }
      main {
        box-sizing: border-box;
        max-width: 1080px;
        margin: 0 auto;
        padding: 56px 20px 72px;
      }
      h1 {
        margin: 0;
        font-size: clamp(2rem, 4vw, 3.5rem);
        line-height: 1.12;
      }
      h2 {
        margin: 40px 0 16px;
        font-size: 1.35rem;
      }
      p {
        max-width: 780px;
        line-height: 1.7;
      }
      .lead {
        margin-top: 18px;
        color: #374151;
        font-size: 1.08rem;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 28px;
      }
      .actions a,
      li a {
        color: #047857;
        font-weight: 700;
      }
      .actions a {
        display: inline-flex;
        min-height: 44px;
        align-items: center;
        border: 1px solid #059669;
        border-radius: 6px;
        padding: 10px 16px;
        text-decoration: none;
      }
      .actions a:first-child {
        background: #059669;
        color: #ffffff;
      }
      ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 14px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        border: 1px solid #d1d5db;
        border-radius: 8px;
        background: #ffffff;
        padding: 16px;
      }
      li p {
        margin: 8px 0 0;
        color: #4b5563;
        font-size: .94rem;
      }
      footer {
        margin-top: 40px;
        border-top: 1px solid #d1d5db;
        padding-top: 24px;
        color: #4b5563;
        font-size: .9rem;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background: #030712;
          color: #f9fafb;
        }
        .lead,
        li p,
        footer {
          color: #d1d5db;
        }
        li {
          border-color: #1f2937;
          background: #111827;
        }
        .actions a,
        li a {
          color: #34d399;
        }
        .actions a:first-child {
          color: #ffffff;
        }
      }
      @media (max-width: 640px) {
        nav {
          align-items: flex-start;
          flex-direction: column;
        }
        .nav-links {
          justify-content: flex-start;
        }
      }
    </style>
    <script type="application/ld+json">${JSON.stringify(configuratorLinkListJsonLd).replace(/</g, '\\u003c')}</script>
  </head>
  <body>
    <header>
      <nav aria-label="網站主要導覽">
        <a href="https://eudaemonia.tech/">EudTech</a>
        <div class="nav-links">
          <a href="https://eudaemonia.tech/solutions/">解決方案</a>
          <a href="https://eudaemonia.tech/products/">產品與品牌</a>
          <a href="https://eudaemonia.tech/resources/">採購資源</a>
          <a href="https://eudaemonia.tech/contact/">預約諮詢</a>
        </div>
      </nav>
    </header>
    <main>
      <h1>${escapeHtml(configuratorLinkIndexUrl.title)}</h1>
      <p class="lead">${escapeHtml(configuratorLinkIndexUrl.description)} 此頁集中提供可爬取的正式 URL，方便採購者、搜尋引擎與 AI 搜尋工具進入正確配置頁。</p>
      <div class="actions">
        <a href="${escapeHtml(configuratorUrl.loc)}">開啟 Comino Grando 配置器</a>
        <a href="${escapeHtml(solutionHubUrl.loc)}">查看 AI 解決方案</a>
      </div>

      <section aria-labelledby="site-information-links">
        <h2 id="site-information-links">網站主要內容</h2>
        <ul>
${[solutionHubUrl, awsCloudUrl, ...siteInformationUrls].map(linkCard).join('\n')}
        </ul>
      </section>

      <section aria-labelledby="configurator-product-links">
        <h2 id="configurator-product-links">產品配置頁</h2>
        <ul>
${productUrls.map(linkCard).join('\n')}
        </ul>
      </section>

      <section aria-labelledby="configurator-solution-links">
        <h2 id="configurator-solution-links">採購與方案入口</h2>
        <ul>
${solutionUrls.map(linkCard).join('\n')}
        </ul>
      </section>

      <footer>
        <p>正式報價與供應條件以 EudTech 後續回覆為準。聯絡信箱：<a href="mailto:quote@eudaemonia.tech">quote@eudaemonia.tech</a></p>
        <p><a href="https://eudaemonia.tech/about/">關於 EudTech</a> · <a href="https://eudaemonia.tech/privacy/">隱私與資料使用</a></p>
      </footer>
    </main>
  </body>
</html>
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap.replace(/[ \t]+$/gm, ''));
fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
fs.writeFileSync(path.join(publicDir, 'image-sitemap.xml'), imageSitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
fs.writeFileSync(path.join(publicDir, 'feed.xml'), feed);
fs.writeFileSync(path.join(publicDir, 'feed.json'), `${jsonFeed}\n`);
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms);
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFull);
fs.writeFileSync(path.join(publicDir, 'configurator-links.html'), configuratorLinksHtml);
fs.writeFileSync(path.join(publicDir, 'ai-discovery.json'), `${JSON.stringify({
  version: 1,
  site: siteOrigin,
  contentUpdated: latestModifiedAt,
  languages: ['zh-TW', 'en'],
  discovery: {
    robots: `${siteOrigin}/robots.txt`,
    sitemapIndex: `${siteOrigin}/sitemap-index.xml`,
    llms: `${siteOrigin}/llms.txt`,
    llmsFull: `${siteOrigin}/llms-full.txt`,
    rss: `${siteOrigin}/feed.xml`,
    jsonFeed: `${siteOrigin}/feed.json`
  },
  permittedAgents: ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot'],
  entity: organization,
  authority: authoritySources
}, null, 2)}\n`);
fs.writeFileSync(
  lastmodManifestPath,
  `${JSON.stringify({ version: 1, entries: lastmodEntries }, null, 2)}\n`
);

console.log(`✓ Generated discovery files for ${solutionUrls.length + 1} configurator solution pages`);
console.log(`✓ Generated discovery files for ${productUrls.length} configurator product pages`);
console.log(`✓ Generated sitemap index for ${sitemapIndexEntries.length} sitemaps`);
console.log(`✓ Generated image sitemap for ${pageImageEntries.length} pages`);
console.log(`✓ Generated configurator link index at ${CONFIGURATOR_LINK_INDEX_PATH}`);
