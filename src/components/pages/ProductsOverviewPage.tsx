import React from 'react';
import { ArrowRight, Cpu, Shield, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { getCominoProducts, getCyabraProducts, getEudTechProducts } from '../../data/productData';
import { PageHero, PageShell, tx } from './SitePagePrimitives';

const ProductsOverviewPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const groups = [
    { title: { zh: 'EudTech 軟體與導入服務', en: 'EudTech software and implementation' }, body: { zh: '從 AI Agent、金融資料到企業流程，依需求設計可串接、可追蹤的導入方案。', en: 'From AI agents and financial data to business operations, design connected and traceable implementations.' }, icon: Workflow, href: '/solutions/ai-agent', products: getEudTechProducts(isEnglish).slice(0, 3) },
    { title: { zh: 'Comino 液冷 AI 運算', en: 'Comino liquid-cooled AI computing' }, body: { zh: '液冷工作站、伺服器與多 GPU 平台，透過配置器建立實際報價需求。', en: 'Liquid-cooled workstations, servers, and multi-GPU platforms with a quote-ready configurator.' }, icon: Cpu, href: '/solutions/ai-infrastructure', products: getCominoProducts(isEnglish).slice(0, 3) },
    { title: { zh: 'Cyabra 社群情報', en: 'Cyabra social intelligence' }, body: { zh: '假帳號、敘事與協調式行為分析，支援品牌保護與公部門情報需求。', en: 'Fake profile, narrative, and coordinated behaviour analysis for brand protection and public-sector intelligence.' }, icon: Shield, href: '/solutions/social-intelligence', products: getCyabraProducts(isEnglish).slice(0, 2) }
  ];
  return <PageShell title={{ zh: '產品與品牌｜EudTech', en: 'Products and brands | EudTech' }} description={{ zh: '瀏覽 EudTech 軟體、Comino 液冷 AI 運算與 Cyabra 社群情報產品。', en: 'Explore EudTech software, Comino liquid-cooled AI systems, and Cyabra social intelligence products.' }} path="/products">
    <PageHero eyebrow={{ zh: '產品與品牌', en: 'Products & brands' }} title={{ zh: '產品頁面連到實際下一步', en: 'Products connected to a practical next step' }} lead={{ zh: 'EudTech 代理與提供的產品，都對應到可閱讀、可配置、可諮詢或可送出需求的入口。', en: 'Every EudTech and partner product has a clear path to read, configure, discuss, or request.' }} isEnglish={isEnglish} />
    <section className="py-20"><div className="mx-auto max-w-7xl space-y-12 px-6 lg:px-8">{groups.map(({ title, body, icon: Icon, href, products }) => <article key={tx(title, isEnglish)} className="rounded-2xl border border-slate-200 p-7 dark:border-slate-800"><div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><Icon className="h-7 w-7 text-cyan-600 dark:text-cyan-300" /><h2 className="mt-5 text-2xl font-bold">{tx(title, isEnglish)}</h2><p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{tx(body, isEnglish)}</p></div><Link to={href} className="inline-flex items-center text-sm font-semibold text-cyan-700 dark:text-cyan-300">{isEnglish ? 'View category' : '查看分類'}<ArrowRight className="ml-2 h-4 w-4" /></Link></div><div className="mt-8 grid gap-4 md:grid-cols-3">{products.map((product) => <Link key={product.id} to={`/products/${product.id}`} className="rounded-xl bg-slate-50 p-5 transition hover:bg-cyan-50 dark:bg-slate-900 dark:hover:bg-cyan-950/30"><h3 className="font-semibold">{product.title}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{product.description}</p><span className="mt-4 inline-flex items-center text-xs font-semibold text-cyan-700 dark:text-cyan-300">{isEnglish ? 'Product details' : '產品詳情'}<ArrowRight className="ml-1 h-3 w-3" /></span></Link>)}</div></article>)}</div></section>
  </PageShell>;
};
export default ProductsOverviewPage;
