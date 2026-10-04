import React from 'react';
import { ArrowRight, Cpu, Shield, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { getCominoProducts, getCyabraProducts } from '../../data/productData';
import { VENDOR_EVIDENCE } from '../../data/vendorEvidence';
import { PageHero, PageShell, SourceLink, tx } from './SitePagePrimitives';

const ProductsOverviewPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const groups = [
    {
      label: { zh: '雲端服務與採購', en: 'Cloud services & procurement' },
      title: { zh: 'AWS 雲端銷售服務', en: 'AWS cloud sales' },
      body: { zh: '依工作負載規劃 AWS 服務、用量與預算，整合採購報價、建置移轉及維運範圍。可供服務與商務條件依正式報價確認。', en: 'Plan AWS services, usage, and budget around your workload, with procurement quotes, deployment, migration, and support scope. Availability and terms are confirmed in the formal quote.' },
      icon: Cloud,
      href: '/solutions/aws',
      image: '/aws-cloud-services.svg',
      imageAlt: { zh: 'AWS 運算、儲存與資料庫服務規劃示意', en: 'AWS compute, storage, and database planning illustration' },
      imageContain: false,
      imageCaption: { zh: '服務規劃示意；實際架構與可供服務依需求確認。', en: 'Planning illustration; architecture and service availability depend on your requirements.' },
      source: { href: 'https://aws.amazon.com/', label: { zh: 'AWS 原廠服務介紹', en: 'AWS service information' } },
      products: [
        { id: 'aws-compute', title: 'Amazon EC2', description: isEnglish ? 'Compute and hosting selection, sizing, and deployment planning.' : '運算與網站代管的資源選型、用量及部署規劃。', href: '/solutions/aws#aws-services' },
        { id: 'aws-storage', title: 'Amazon S3', description: isEnglish ? 'Storage tiers, data retention, and cost planning.' : '儲存分層、資料保存與費用規劃。', href: '/solutions/aws#aws-services' },
        { id: 'aws-database', title: 'Amazon RDS', description: isEnglish ? 'Managed database sizing, migration, and support scope.' : '受管資料庫規格、移轉與維運範圍評估。', href: '/solutions/aws#aws-services' }
      ]
    },
    {
      label: { zh: '合作硬體平台', en: 'Partner hardware platform' },
      title: { zh: 'Comino 液冷 AI 運算', en: 'Comino liquid-cooled AI computing' },
      body: { zh: '從桌邊工作站到機架式多 GPU 系統，以封閉式液冷為核心，依工作負載與場地條件評估噪音、空間、供電及散熱。確認方向後，可用配置器整理規格並詢價。', en: 'Closed-loop liquid-cooled systems, from deskside workstations to rack-mounted multi-GPU systems. Review noise, space, power and cooling against your workload and site, then use the configurator to prepare a specification and quote request.' },
      icon: Cpu,
      href: '/solutions/ai-infrastructure',
      image: VENDOR_EVIDENCE.comino.image,
      imageAlt: VENDOR_EVIDENCE.comino.imageAlt,
      imageContain: false,
      imageCaption: { zh: 'Comino GRANDO Blackwell 原廠產品圖片。', en: 'Official Comino GRANDO Blackwell product image.' },
      source: VENDOR_EVIDENCE.comino.sources.blackwell,
      products: getCominoProducts(isEnglish).slice(0, 3).map(product => ({ ...product, href: `/products/${product.id}` }))
    },
    {
      label: { zh: '合作情報平台', en: 'Partner intelligence platform' },
      title: { zh: 'Cyabra 社群情報', en: 'Cyabra social intelligence' },
      body: { zh: '分析帳號真實性、敘事與協調式行為，並提供即時警示。適合品牌保護、公關、資安與公部門情報團隊。', en: 'Analyses profile authenticity, narratives, and coordinated behaviour, with real-time alerts. Suited to brand protection, communications, security, and public-sector intelligence teams.' },
      icon: Shield,
      href: '/solutions/social-intelligence',
      image: VENDOR_EVIDENCE.cyabra.images.volume,
      imageAlt: { zh: 'Cyabra 原廠內容真實性與數量分析畫面', en: 'Official Cyabra content authenticity and volume analysis screen' },
      imageContain: true,
      imageCaption: { zh: 'Cyabra 原廠公開的內容真實性分析介面。', en: 'Official Cyabra content-authenticity analysis interface.' },
      source: VENDOR_EVIDENCE.cyabra.sources.authenticity,
      products: getCyabraProducts(isEnglish).slice(0, 2).map(product => ({ ...product, href: `/products/${product.id}` }))
    }
  ];
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://eudaemonia.tech/products/#collection',
    name: isEnglish ? 'EudTech products and brands' : 'EudTech 產品與品牌',
    description: isEnglish ? 'AWS cloud services, Comino liquid-cooled AI systems, and Cyabra social intelligence.' : 'AWS 雲端服務、Comino 液冷 AI 運算與 Cyabra 社群情報。',
    url: 'https://eudaemonia.tech/products/',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: groups.map((group, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tx(group.title, isEnglish),
        url: `https://eudaemonia.tech${group.href}/`
      }))
    }
  };
  return <PageShell title={{ zh: '產品與品牌｜EudTech', en: 'Products and brands | EudTech' }} description={{ zh: '瀏覽 AWS 雲端銷售服務、Comino 液冷 AI 運算及 Cyabra 社群情報產品。', en: 'Explore AWS cloud sales services, Comino liquid-cooled AI systems, and Cyabra social intelligence products.' }} path="/products" structuredData={structuredData}>
    <PageHero eyebrow={{ zh: '產品與品牌', en: 'Products & brands' }} title={{ zh: '先看產品能力，再進入導入或採購', en: 'Start with product capability, then move to implementation or procurement' }} lead={{ zh: '每個分類都說明原廠能力、EudTech 交付方式與產品明細，並提供諮詢或配置器入口。', en: 'Each category sets out vendor capability, EudTech delivery, and product details, with a route to consultation or the configurator.' }} isEnglish={isEnglish} />
    <section className="py-20"><div className="mx-auto max-w-7xl space-y-12 px-6 lg:px-8">{groups.map(({ label, title, body, icon: Icon, href, image, imageAlt, imageContain, imageCaption, source, products }) => <article key={tx(title, isEnglish)} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="grid lg:grid-cols-[0.84fr_1.16fr]"><div className={`relative min-h-[280px] overflow-hidden ${imageContain ? 'bg-white' : 'bg-slate-100 dark:bg-slate-950'}`}><img src={image} alt={tx(imageAlt, isEnglish)} loading="lazy" decoding="async" className={`absolute inset-0 h-full w-full ${imageContain ? 'object-contain p-6' : 'object-cover'}`} /></div><div className="p-7 sm:p-9"><div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><div className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200">{tx(label, isEnglish)}</div><Icon className="mt-5 h-7 w-7 text-cyan-600 dark:text-cyan-300" /><h2 className="mt-5 text-2xl font-bold">{tx(title, isEnglish)}</h2><p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{tx(body, isEnglish)}</p></div><Link to={href} className="inline-flex shrink-0 items-center text-sm font-semibold text-cyan-700 dark:text-cyan-300">{isEnglish ? 'View solution' : '查看解決方案'}<ArrowRight className="ml-2 h-4 w-4" /></Link></div><p className="mt-5 text-xs leading-5 text-slate-500 dark:text-slate-400">{tx(imageCaption, isEnglish)} <SourceLink href={source.href} label={source.label} isEnglish={isEnglish} /></p></div></div><div className="grid border-t border-slate-200 dark:border-slate-800 md:grid-cols-3">{products.map((product) => <Link key={product.id} to={product.href} className="border-b border-slate-200 p-6 transition hover:bg-cyan-50 dark:border-slate-800 dark:hover:bg-cyan-950/30 md:border-b-0 md:border-r last:md:border-r-0"><span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{tx(label, isEnglish)}</span><h3 className="mt-4 font-semibold">{product.title}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{product.description}</p><span className="mt-4 inline-flex items-center text-xs font-semibold text-cyan-700 dark:text-cyan-300">{isEnglish ? 'Product details' : '產品詳情'}<ArrowRight className="ml-1 h-3 w-3" /></span></Link>)}</div></article>)}</div></section>
    <section className="border-y border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/60"><div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3 lg:px-8">{[
      { title: { zh: '雲端先做需求與用量評估', en: 'Cloud starts with requirements and usage' }, body: { zh: '先確認應用、區域、用量與預算，再整理服務清單、報價與導入範圍。', en: 'Confirm applications, regions, usage, and budget before preparing the service list, quote, and deployment scope.' } },
      { title: { zh: '硬體先做工作負載盤點', en: 'Hardware starts with workload discovery' }, body: { zh: '依模型、軟體、資料、使用者與場地條件，整理出可審查的配置。', en: 'Turn models, software, data, users, and site conditions into a configuration that can be reviewed.' } },
      { title: { zh: '授權先確認使用方式', en: 'Licensing starts with the access model' }, body: { zh: '先確認使用者與資料範圍，再決定 SaaS、Managed Service、地端或 API 的需求。', en: 'Confirm users and data scope first, then whether SaaS, managed service, on-premises, or API access is required.' } }
    ].map((item) => <div key={tx(item.title, isEnglish)}><h2 className="text-lg font-semibold">{tx(item.title, isEnglish)}</h2><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(item.body, isEnglish)}</p></div>)}</div></section>
  </PageShell>;
};
export default ProductsOverviewPage;
