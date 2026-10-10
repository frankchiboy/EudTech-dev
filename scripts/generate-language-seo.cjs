const h200Availability = require('../src/data/h200Availability.json');
const fs = require('fs');
const path = require('path');
const { formatSeoTitle, englishRoutes } = require('./seo-public-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');
const { getConfiguratorSocialPreviewRoutes } = require('./configurator-social-preview-routes.cjs');
const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const reference = require('../src/data/cominoProcurement.json');
const conformity = require('../src/data/cominoConformity.json');
const trial = require('../src/data/cominoTestDrive.json');
const dates = require('../public/discovery-lastmod.json').entries;
const organization = require('../src/data/organization.json');
const { CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();
const origin = 'https://eudaemonia.tech';
const absolute = p => canonicalPageUrl(p, origin);
const enUrl = p => absolute(`/en${p}`);
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
const social = new Map(getConfiguratorSocialPreviewRoutes().map(r => [r.path, r.socialImageUrl]));
const configuratorProductByPath = new Map(CONFIGURATOR_PRODUCT_SEO.map(product => [product.configuratorHref, product]));
const style = '<style>.seo-content{max-width:1080px;margin:auto;padding:100px 24px 48px;color:#172e38;background:#fff;font:17px/1.8 system-ui}.seo-content h1{font-size:2.3rem;line-height:1.25}.seo-content h2{font-size:1.5rem;margin-top:2em}.seo-content a{color:#0759a1;text-decoration:underline}.seo-content nav{display:flex;gap:20px;flex-wrap:wrap}.seo-content td,.seo-content th{padding:10px;text-align:left;border-bottom:1px solid #ddd}.seo-content li{margin-bottom:12px}</style>';

function cleanHead(html) {
  return html.replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(/<meta[^>]+(?:name|property)="(?:description|keywords|author|robots|og:[^"]+|twitter:[^"]+|article:[^"]+)"[^>]*>/g, '')
    .replace(/<link[^>]+rel="(?:canonical|alternate)"[^>]*>/g, '')
    .replace(/<script[^>]+type="application\/ld\+json"[\s\S]*?<\/script>/g, '');
}

function procurement() {
  return `<section id="procurement"><h2>${escape(reference.title.en)}</h2><p>${escape(reference.translationNote.en)}</p><ul>${reference.documents.map(d => `<li><a href="${escape(d.href)}">${escape(d.title.en)} ${escape(d.version)}</a> — ${escape(d.description.en)} <a href="${escape(d.source)}">Manufacturer source</a></li>`).join('')}</ul><h3>${escape(conformity.title.en)}</h3><p>${escape(conformity.translationBoundary.en)}</p><ul>${conformity.documents.map(d => `<li><a href="${escape(d.source)}">${escape(d.title.en)}</a> — ${escape(d.summary.en)}</li>`).join('')}</ul><p>${escape(conformity.fccBoundary.en)}</p><h3>Functions and evidence for specification review</h3>${reference.criteria.map(c => `<h4>${escape(c.title.en)}</h4><p>${escape(c.requirement.en)}</p><p>${escape(c.evidence.en)}</p>`).join('')}<p>${escape(reference.conformityNote.en)}</p><p>${escape(reference.procurementNote.en)}</p></section>`;
}

function testDrive() {
  return `<section id="test-drive"><h2>${escape(trial.title.en)}</h2><p>${escape(trial.description.en)}</p><a href="${escape(trial.application)}">${escape(trial.applyLabel.en)}</a><h3>${escape(trial.configurationsTitle.en)}</h3><ul>${trial.configurations.map(c => `<li><a href="${escape(c.href)}">${escape(c.gpu)}</a> · ${escape(c.format.en)} · ${escape(c.memory)} · ${escape(c.cpu.en)}</li>`).join('')}</ul><p>${escape(trial.configurationNote.en)}</p><h3>${escape(trial.stepsTitle.en)}</h3><ol>${trial.steps.map(s => `<li>${escape(s.title.en)} — ${escape(s.body.en)}</li>`).join('')}</ol><p>${escape(trial.terms.en)}</p><a href="${escape(trial.source)}">${escape(trial.creditLabel.en)}</a></section>`;
}

function renderEnglishPage(baseHtml, route) {
  const title = formatSeoTitle(route.title), url = enUrl(route.path), zh = absolute(route.path);
  const image = social.get(route.path) || new URL(route.image || (route.path==='/careers'?'/brand-provenance/eudtech-brand-careers.webp':'/social/configurator/home.jpg'), origin).href;
  const article = ['comparison','guide','checklist'].includes(route.kind);
  const routes = englishRoutes();
  const related = route.relatedPaths
    ? route.relatedPaths.map(path => routes.find(candidate => candidate.path === path)).filter(Boolean)
    : routes.filter(r => r.path !== route.path && (['/resources','/products','/solutions','/configurator'].includes(route.path) || ['/solutions','/configurator','/resources','/contact'].includes(r.path)));
  const relatedItemList = related.length ? {
    '@context':'https://schema.org','@type':'ItemList','@id':`${url}#related-links`,name:`Related pages for ${route.title}`,
    itemListElement:related.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.title,url:enUrl(item.path)}))
  } : null;
  const configuratorProduct = configuratorProductByPath.get(route.path);
  const configuratorSchemas = configuratorProduct ? [
    {
      '@context':'https://schema.org','@type':'WebApplication',name:configuratorProduct.title.en,
      description:configuratorProduct.description.en,applicationCategory:'BusinessApplication',operatingSystem:'Web',url,
      provider:{'@id':`${origin}/#organization`},potentialAction:{'@type':'QuoteAction',target:enUrl(configuratorProduct.quoteHref)}
    },
    {
      '@context':'https://schema.org','@type':'Service',name:configuratorProduct.title.en,
      description:configuratorProduct.description.en,image:new URL(configuratorProduct.image,origin).href,url,
      provider:{'@id':`${origin}/#organization`},brand:{'@type':'Brand',name:configuratorProduct.brand},
      serviceType:'GPU server quote configuration',category:configuratorProduct.category.en,identifier:configuratorProduct.productId,
      additionalProperty:configuratorProduct.properties.map(property=>({'@type':'PropertyValue',name:property.name.en,value:property.value.en})),
      potentialAction:{'@type':'QuoteAction',target:enUrl(configuratorProduct.quoteHref)}
    }
  ] : route.path === '/configurator' ? [
    {
      '@context':'https://schema.org','@type':'WebApplication',name:route.title,description:route.description,
      applicationCategory:'BusinessApplication',operatingSystem:'Web',url,
      provider:{'@id':`${origin}/#organization`},potentialAction:{'@type':'QuoteAction',target:enUrl('/configurator?request=true')}
    },
    {
      '@context':'https://schema.org','@type':'ItemList',name:'EudTech configurator entries',
      itemListElement:[
        ...CONFIGURATOR_PRODUCT_SEO.map((product,index)=>({'@type':'ListItem',position:index+1,name:product.title.en,url:enUrl(product.configuratorHref)})),
        ...[
          ['Configurator solution hub','/solutions'],
          ['GPU server quote process','/solutions/gpu-server-quote'],
          ['GPU server RFQ checklist','/solutions/gpu-server-rfq-checklist'],
          ['Liquid-cooled GPU server procurement','/solutions/liquid-cooling-ai-server-procurement']
        ].map(([name,pathname],index)=>({'@type':'ListItem',position:CONFIGURATOR_PRODUCT_SEO.length+index+1,name,url:enUrl(pathname)}))
      ]
    }
  ] : [];
  const schemas = [
    {'@context':'https://schema.org',...organization},
    {'@context':'https://schema.org','@type':'WebSite','@id':`${origin}/#website`,name:'EudTech',url:`${origin}/`,inLanguage:['zh-TW','en']},
    {'@context':'https://schema.org','@type':article?'Article':'WebPage','@id':`${url}#webpage`,url,name:title,headline:route.title,description:route.description,inLanguage:'en',image,
      datePublished:dates[url]?.publishedAt,dateModified:dates[url]?.modifiedAt,publisher:{'@id':`${origin}/#organization`},isPartOf:{'@id':`${origin}/#website`}},
    {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'EudTech',item:enUrl('/')},...(route.path==='/'?[]:[{'@type':'ListItem',position:2,name:route.title,item:url}])]},
    ...configuratorSchemas,
    relatedItemList
  ].filter(Boolean);
  if (route.faq?.length) schemas.push({'@context':'https://schema.org','@type':'FAQPage',mainEntity:route.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))});
  const head = [
    `<title>${escape(title)}</title>`,
    `<meta data-rh="true" name="description" content="${escape(route.description)}">`,
    '<meta data-rh="true" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">',
    ...Object.entries({'og:title':title,'og:description':route.description,'og:url':url,'og:image':image,'og:image:alt':route.title,'og:type':article?'article':'website','og:locale':'en_US','og:site_name':'EudTech','twitter:card':'summary_large_image','twitter:title':title,'twitter:description':route.description,'twitter:image':image,'twitter:url':url}).map(([key,value])=>`<meta data-rh="true" ${key.startsWith('og:')?'property':'name'}="${key}" content="${escape(value)}">`),
    `<link data-rh="true" rel="canonical" href="${url}">`,
    ...[['zh-Hant',zh],['en',url],['x-default',zh]].map(([lang,href])=>`<link data-rh="true" rel="alternate" hreflang="${lang}" href="${href}">`),
    ...schemas.map(s=>`<script data-rh="true" type="application/ld+json">${json(s)}</script>`),style
  ].join('\n');
  const body = `<main class="seo-content" data-static-seo-fallback><nav aria-label="Main navigation"><a href="${enUrl('/')}">EudTech</a><a href="${enUrl('/solutions')}">Solutions</a><a href="${enUrl('/products')}">Products</a><a href="${enUrl('/contact')}">Contact</a><a lang="zh-Hant" href="${zh}">繁體中文</a></nav><h1>${escape(route.title)}</h1><p>${escape(route.lead || route.description)}</p>${/h200/i.test(JSON.stringify([route.title, route.description, route.specs])) ? `<aside data-h200-supply-status="${h200Availability.asOf}"><h2>${escape(h200Availability.title.en)}</h2><p>${escape(h200Availability.detail.en)}</p></aside>` : ''}${route.highlights?.length?`<h2>Overview</h2><ul>${route.highlights.map(h=>`<li>${escape(h)}</li>`).join('')}</ul>`:''}${route.specs?.length?`<h2>Specifications and service scope</h2><table><tbody>${route.specs.map(s=>`<tr><th scope="row">${escape(s.label)}</th><td>${escape(s.value)}</td></tr>`).join('')}</tbody></table>`:''}${route.path==='/solutions/ai-infrastructure'?testDrive()+procurement():''}${route.faq?.length?`<h2>Frequently asked questions</h2>${route.faq.map(([q,a])=>`<h3>${escape(q)}</h3><p>${escape(a)}</p>`).join('')}`:''}<h2>Explore related resources</h2><ul>${related.map(r=>`<li><a href="${enUrl(r.path)}">${escape(r.title)}</a></li>`).join('')}</ul><p><a href="mailto:quote@eudaemonia.tech">quote@eudaemonia.tech</a></p></main>`;
  return cleanHead(baseHtml).replace(/<html lang="[^"]*"/, '<html lang="en"').replace('</head>',head+'</head>').replace('<div id="root"></div>',`<div id="root">${body}</div>`);
}

function writeNotFoundPages(dist) {
  for (const en of [false,true]) {
    const title = en?'Page not found':'找不到頁面', home=en?'/en/':'/';
    const html = `<!doctype html><html lang="${en?'en':'zh-TW'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, follow"><title>${title} | EudTech</title>${style}</head><body><main class="seo-content"><h1>${title}</h1><p>${en?'This address is unavailable.':'這個網址目前沒有頁面。'}</p><nav><a href="${home}">${en?'Home':'首頁'}</a><a href="${home}solutions/">${en?'Solutions':'解決方案'}</a><a href="${home}contact/">${en?'Contact':'聯絡我們'}</a></nav></main></body></html>`;
    const dir=path.join(dist,en?'en':'');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'404.html'),html);
  }
}

// These functional pages remain reachable, but are not search landing pages.
function writeUtilityPages(dist, base) {
  for (const en of [false,true]) for (const route of ['official-document-notifier']) {
    const dir=path.join(dist,en?'en':'',route);fs.mkdirSync(dir,{recursive:true});
    const html=cleanHead(base).replace(/<html lang="[^"]*"/,`<html lang="${en?'en':'zh-TW'}"`).replace('</head>','<meta data-rh="true" name="robots" content="noindex, follow"></head>');
    fs.writeFileSync(path.join(dir,'index.html'),html);
  }
}
module.exports={renderEnglishPage,writeNotFoundPages,writeUtilityPages};
