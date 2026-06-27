const fs = require('fs');
const path = require('path');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');

const { SITE_ORIGIN, CONFIGURATOR_SEO_PAGES } = readConfiguratorSeoPages();
const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';
const publicDir = path.resolve(__dirname, '..', 'public');
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
const lastmod = `${taipeiDateParts.year}-${taipeiDateParts.month}-${taipeiDateParts.day}`;
const pubDateWeekday = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Taipei', weekday: 'short' }).format(now);
const pubDateMonth = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Taipei', month: 'short' }).format(now);
const pubDate = `${pubDateWeekday}, ${taipeiDateParts.day} ${pubDateMonth} ${taipeiDateParts.year} 00:00:00 +0800`;

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const getZh = (value) => value.zh;
const absoluteUrl = (value) => {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  return `${siteOrigin}${value.startsWith('/') ? value : `/${value}`}`;
};

const priorityBySlug = {
  'nvidia-h200-server': '0.9',
  'rtx-pro-6000-workstation': '0.9',
  'gpu-server-quote': '0.9',
  'h200-vs-rtx-pro-6000': '0.88',
  'gpu-server-rfq-checklist': '0.88'
};
const solutionUrls = CONFIGURATOR_SEO_PAGES.map((page) => ({
  loc: `${siteOrigin}/solutions/${page.slug}`,
  title: getZh(page.title),
  description: getZh(page.description),
  priority: priorityBySlug[page.slug] || '0.85'
}));
const solutionHubUrl = {
  loc: `${siteOrigin}/solutions`,
  title: '配置器解決方案與 GPU 伺服器報價指南',
  description: 'EudTech 配置器入口索引，集中 GPU 伺服器報價、NVIDIA H200、RTX PRO 6000 工作站、RFQ 檢核表與液冷 AI 伺服器採購頁面。',
  priority: '0.93'
};

const sitemapEntries = [
  { loc: `${siteOrigin}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${siteOrigin}/configurator`, changefreq: 'weekly', priority: '0.95' },
  { loc: solutionHubUrl.loc, changefreq: 'weekly', priority: solutionHubUrl.priority },
  { loc: `${siteOrigin}/configurator/28`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${siteOrigin}/configurator/29`, changefreq: 'weekly', priority: '0.9' },
  ...solutionUrls.map((entry) => ({ loc: entry.loc, changefreq: 'weekly', priority: entry.priority })),
  { loc: `${siteOrigin}/careers`, changefreq: 'monthly', priority: '0.45' }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const sitemapIndexEntries = [
  `${siteOrigin}/sitemap.xml`,
  `${siteOrigin}/image-sitemap.xml`
];
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexEntries
  .map(
    (loc) => `  <sitemap>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>
`;

const pageImageEntries = [
  {
    loc: `${siteOrigin}/`,
    images: [
      { loc: absoluteUrl('/grando-8gpu-server.jpg'), title: 'EudTech Comino Grando GPU 伺服器' },
      { loc: absoluteUrl('/grando-desktop-01.jpg'), title: 'EudTech AI 工作站' },
      { loc: absoluteUrl('/comino-workstation-front.png'), title: 'Comino Grando 工作站正面' }
    ]
  },
  {
    loc: `${siteOrigin}/configurator`,
    images: [
      { loc: absoluteUrl('/grando-8gpu-server.jpg'), title: 'Comino Grando GPU 伺服器配置器' },
      { loc: absoluteUrl('/grando-rackable-01.jpg'), title: 'Grando 機架式工作站配置器' },
      { loc: absoluteUrl('/images/configurator/devices/comino-integration-kit-8x-pro-6000.webp'), title: 'Comino Integration Kit GPU 伺服器' },
      { loc: absoluteUrl('/images/configurator/devices/comino-rtx-pro-6000-workstation.webp'), title: 'Comino RTX PRO 6000 工作站' }
    ]
  },
  {
    loc: `${siteOrigin}/configurator/28`,
    images: [
      { loc: absoluteUrl('/comino-workstation-front.png'), title: 'GRANDO 機架式工作站配置器' },
      { loc: absoluteUrl('/images/configurator/devices/comino-rtx-pro-6000-workstation.webp'), title: 'RTX PRO 6000 工作站配置' }
    ]
  },
  {
    loc: `${siteOrigin}/configurator/29`,
    images: [
      { loc: absoluteUrl('/grando-8gpu-server.jpg'), title: 'NVIDIA H200 GPU 伺服器配置器' },
      { loc: absoluteUrl('/images/configurator/devices/comino-integration-kit-8x-pro-6000.webp'), title: '高密度 GPU 伺服器配置' }
    ]
  },
  {
    loc: solutionHubUrl.loc,
    images: [{ loc: absoluteUrl('/grando-8gpu-server.jpg'), title: solutionHubUrl.title }]
  },
  ...CONFIGURATOR_SEO_PAGES.map((page) => ({
    loc: `${siteOrigin}/solutions/${page.slug}`,
    images: [
      {
        loc: absoluteUrl(page.image),
        title: getZh(page.imageAlt),
        caption: getZh(page.description)
      }
    ]
  }))
];

const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pageImageEntries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
${entry.images
  .map(
    (image) => `    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>${image.caption ? `\n      <image:caption>${escapeXml(image.caption)}</image:caption>` : ''}
    </image:image>`
  )
  .join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>
`;

const feedItems = [solutionHubUrl, ...solutionUrls]
  .map(
    (entry) => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(entry.loc)}</link>
      <guid>${escapeXml(entry.loc)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(entry.description)}</description>
    </item>`
  )
  .join('\n');

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>EudTech Configurator Updates</title>
    <link>${siteOrigin}/solutions</link>
    <description>AI GPU server, Comino Grando configurator, workstation quote, and procurement solution entry points from EudTech.</description>
    <language>zh-TW</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${siteOrigin}/feed.xml" rel="self" type="application/rss+xml" />
${feedItems}
  </channel>
</rss>
`;

const llmsPrimaryUrls = [
  ['Homepage', `${siteOrigin}/`],
  ['Comino Grando Configurator', `${siteOrigin}/configurator`],
  ['Configurator Solutions Hub', `${siteOrigin}/solutions`],
  ['NVIDIA H200 GPU Server Configurator', `${siteOrigin}/configurator/29`],
  ['GRANDO Rackable Workstation Configurator', `${siteOrigin}/configurator/28`],
  ...solutionUrls.map((entry) => [entry.title, entry.loc])
];

const llmsTopics = [
  'GPU server quote',
  'AI server quote',
  'NVIDIA H200 server',
  'RTX PRO 6000 workstation',
  'Comino Grando configurator',
  'Liquid-cooled GPU server',
  'AI workstation Taiwan',
  'H200 vs RTX PRO 6000',
  'GPU server RFQ checklist',
  'Liquid-cooling AI server procurement'
];

const llms = `# EudTech Configurator

EudTech provides AI GPU server, AI workstation, and Comino Grando liquid-cooled system configuration services for Taiwan buyers.

## Primary URLs

${llmsPrimaryUrls.map(([label, url]) => `- ${label}: ${url}`).join('\n')}

## High-Intent Topics

${llmsTopics.map((topic) => `- ${topic}`).join('\n')}

## Quote Flow

Users can configure GPU, CPU, RAM, storage, power supply, and networking options in the configurator. Quote requests are sent to info@eudaemonia.tech with the selected configuration URL and marketing attribution when available.

## Contact

- Email: info@eudaemonia.tech
- Site: ${siteOrigin}/
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
fs.writeFileSync(path.join(publicDir, 'image-sitemap.xml'), imageSitemap);
fs.writeFileSync(path.join(publicDir, 'feed.xml'), feed);
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms);

console.log(`✓ Generated discovery files for ${solutionUrls.length + 1} configurator solution pages`);
console.log(`✓ Generated sitemap index for ${sitemapIndexEntries.length} sitemaps`);
console.log(`✓ Generated image sitemap for ${pageImageEntries.length} pages`);
