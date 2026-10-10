const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { readPublicProducts } = require('./read-public-products.cjs');
const englishCopy = require('../src/data/englishSeoPages.json');
const { CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO, getRelatedConfiguratorSeoPages } = readConfiguratorSeoPages();

const formatSeoTitle = title => `${title.replace(/\s*[|｜]\s*EudTech(?:\s*[-–].*)?$/i, '').trim()} | EudTech`;
const careersRoute = {path:'/careers',title:'職業機會 - 加入我們的團隊',description:'加入 EudTech，成為 AI 技術未來的一部分。我們正在尋找充滿熱忱的人才，協助我們打造創新解決方案。',lead:'EudTech 正在招募以下職缺。每個職缺都列出工作內容、條件需求、工作地點、工作時間與應徵方式。',highlights:['依職缺確認工作內容、條件需求、工作地點與時間。','由職缺說明中的應徵方式提出申請。'],image:'/brand-provenance/eudtech-brand-careers.webp',contentType:'information'};
const publicProductRoutes = (english = false) => readPublicProducts(english).map(p => ({
  path: `/products/${p.id}`, title: p.title, description: p.description,
  lead: p.detailedDescription?.introduction || p.description,
  highlights: p.features || [], specs: Object.entries(p.specs || {}).map(([label,value]) => ({label,value})),
  contentType: 'information', kind: 'product', image: p.image, imageAlt: p.title,
  quoteHref: '/contact', relatedLinks: [{href:'https://eudaemonia.tech/products/',label:english?'Products & brands':'產品與品牌'}]
}));

const englishRoutes = () => [
  ...Object.entries(englishCopy).map(([path, copy]) => ({path, ...copy, lead:copy.description})),
  ...CONFIGURATOR_SEO_PAGES.map(p => ({path:`/solutions/${p.slug}`,title:p.title.en,description:p.description.en,lead:p.lead.en,kind:p.kind,
    relatedPaths:getRelatedConfiguratorSeoPages(p.slug).map(related=>`/solutions/${related.slug}`),
    highlights:p.highlights.map(x=>x.en),specs:p.specs.map(x=>({label:x.label.en,value:x.value.en})),faq:p.faqs.map(x=>[x.question.en,x.answer.en])})),
  ...CONFIGURATOR_PRODUCT_SEO.map(p=>({path:p.configuratorHref,title:p.title.en,description:p.description.en,lead:p.description.en,
    highlights:(p.exposureNotes||[]).map(x=>x.en),specs:p.properties.map(x=>({label:x.name.en,value:x.value.en}))})),
  ...publicProductRoutes(true)
];
module.exports = { formatSeoTitle, publicProductRoutes, englishRoutes, careersRoute };
