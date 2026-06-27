const fs = require('fs');
const path = require('path');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');

const { SITE_ORIGIN, CONFIGURATOR_SEO_PAGES } = readConfiguratorSeoPages();
const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';
const publicDir = path.resolve(__dirname, '..', 'public');
const lastmod = '2026-06-28';
const pubDate = 'Sun, 28 Jun 2026 00:00:00 +0800';

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const getZh = (value) => value.zh;
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

const sitemapEntries = [
  { loc: `${siteOrigin}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${siteOrigin}/configurator`, changefreq: 'weekly', priority: '0.95' },
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

const feedItems = solutionUrls
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
    <link>${siteOrigin}/configurator</link>
    <description>AI GPU server, Comino Grando configurator, and workstation quote entry points from EudTech.</description>
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
fs.writeFileSync(path.join(publicDir, 'feed.xml'), feed);
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms);

console.log(`✓ Generated discovery files for ${solutionUrls.length} configurator solution pages`);
