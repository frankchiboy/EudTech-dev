import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../../contexts/LanguageContext';
import SEOHead from '../common/SEOHead';
import Footer from '../Footer';
import { canonicalPageUrl } from '../../utils/seo/canonicalUrl';

export type Bilingual = { zh: string; en: string };
export const tx = (value: Bilingual, isEnglish: boolean) => (isEnglish ? value.en : value.zh);

export const PageShell: React.FC<{ children: React.ReactNode; title: Bilingual; description: Bilingual; path: string }> = ({ children, title, description, path }) => {
  const { isEnglish } = useLanguageContext();
  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <SEOHead title={tx(title, isEnglish)} description={tx(description, isEnglish)} url={canonicalPageUrl(`https://eudaemonia.tech${path}`)} isEnglish={isEnglish} />
      {children}
      <Footer isEnglish={isEnglish} />
    </div>
  );
};

export const PageHero: React.FC<{
  eyebrow: Bilingual;
  title: Bilingual;
  lead: Bilingual;
  isEnglish: boolean;
  actions?: React.ReactNode;
  image?: string;
  imageAlt?: Bilingual;
  imagePosition?: string;
}> = ({ eyebrow, title, lead, isEnglish, actions, image, imageAlt, imagePosition = 'center' }) => (
  <section className="relative isolate overflow-hidden bg-slate-950 pb-20 pt-32 text-white sm:pb-24">
    {image && (
      <>
        <img src={image} alt={imageAlt ? tx(imageAlt, isEnglish) : ''} className="absolute inset-0 -z-20 h-full w-full object-cover" style={{ objectPosition: imagePosition }} loading="eager" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/45" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-slate-950/35" aria-hidden="true" />
      </>
    )}
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">{tx(eyebrow, isEnglish)}</p>
      <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{tx(title, isEnglish)}</h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">{tx(lead, isEnglish)}</p>
      {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>}
    </div>
  </section>
);

export const ActionLink: React.FC<{ href: string; children: React.ReactNode; secondary?: boolean }> = ({ href, children, secondary }) => {
  const className = secondary
    ? 'inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300'
    : 'inline-flex items-center justify-center rounded-md bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200';
  const content = <>{children}<ArrowRight className="ml-2 h-4 w-4" /></>;

  if (href.startsWith('mailto:') || href.startsWith('#')) {
    return <a href={href} className={className}>{content}</a>;
  }

  return <Link to={href} className={className}>{content}</Link>;
};

export const CardGrid: React.FC<{ items: Array<{ title: Bilingual; body: Bilingual; href?: string }>; isEnglish: boolean }> = ({ items, isEnglish }) => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {items.map((item) => {
      const content = <><h3 className="text-xl font-semibold">{tx(item.title, isEnglish)}</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{tx(item.body, isEnglish)}</p>{item.href && <span className="mt-5 inline-flex items-center text-sm font-semibold text-cyan-700 dark:text-cyan-300">{isEnglish ? 'Explore' : '查看內容'}<ArrowRight className="ml-2 h-4 w-4" /></span>}</>;
      return item.href ? <Link key={item.href} to={item.href} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-cyan-400 dark:border-slate-800 dark:bg-slate-900">{content}</Link> : <article key={tx(item.title, isEnglish)} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">{content}</article>;
    })}
  </div>
);

export const CheckList: React.FC<{ items: Bilingual[]; isEnglish: boolean }> = ({ items, isEnglish }) => <ul className="space-y-3">{items.map((item) => <li key={tx(item, isEnglish)} className="flex gap-3 text-sm leading-7 text-slate-600 dark:text-slate-300"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />{tx(item, isEnglish)}</li>)}</ul>;

export const SourceLink: React.FC<{ href: string; label: Bilingual; isEnglish: boolean; inverse?: boolean }> = ({ href, label, isEnglish, inverse }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`inline-flex items-center gap-1.5 text-xs font-semibold underline decoration-current/30 underline-offset-4 transition hover:decoration-current ${inverse ? 'text-cyan-200' : 'text-cyan-700 dark:text-cyan-300'}`}
  >
    {tx(label, isEnglish)}
    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
  </a>
);

export const VendorMedia: React.FC<{
  src: string;
  alt: Bilingual;
  caption: Bilingual;
  sourceHref: string;
  sourceLabel: Bilingual;
  isEnglish: boolean;
  contain?: boolean;
}> = ({ src, alt, caption, sourceHref, sourceLabel, isEnglish, contain }) => (
  <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className={`relative aspect-[16/10] overflow-hidden ${contain ? 'bg-white p-4 sm:p-6' : 'bg-slate-100 dark:bg-slate-900'}`}>
      <img
        src={src}
        alt={tx(alt, isEnglish)}
        loading="lazy"
        decoding="async"
        className={`h-full w-full ${contain ? 'object-contain' : 'object-cover'}`}
      />
    </div>
    <figcaption className="flex flex-col gap-2 border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between">
      <span>{tx(caption, isEnglish)}</span>
      <SourceLink href={sourceHref} label={sourceLabel} isEnglish={isEnglish} />
    </figcaption>
  </figure>
);
