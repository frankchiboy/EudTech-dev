import React from 'react';
import type { ConfiguratorSeoPage } from '../../data/configuratorSeoPages';

type Props = {
  comparison: NonNullable<ConfiguratorSeoPage['comparison']>;
  isEnglish: boolean;
  sourceLinks: Array<{ id: string; title: string; href: string }>;
};

export default function GpuComparisonTable({ comparison, isEnglish, sourceLinks }: Props) {
  const language = isEnglish ? 'en' : 'zh';
  return (
    <section id={comparison.id} aria-labelledby={`${comparison.id}-heading`} className="scroll-mt-28 border-b border-gray-200 bg-white py-16 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 id={`${comparison.id}-heading`} className="text-3xl font-bold">{comparison.title[language]}</h2>
        <p className="mt-6 max-w-4xl text-base leading-8">{comparison.summary[language]}</p>
        <p id={`${comparison.id}-scope`} className="mt-4 max-w-4xl text-sm leading-7 text-gray-600 dark:text-gray-300">{comparison.scope[language]}</p>
        <div role="region" aria-label={comparison.title[language]} tabIndex={0} className="mt-8 overflow-x-auto rounded-lg border border-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-gray-700">
          <table aria-describedby={`${comparison.id}-scope ${comparison.id}-boundary`} className="w-full min-w-[640px] border-collapse text-left text-sm leading-6">
            <caption className="bg-gray-50 px-5 py-4 text-left font-medium dark:bg-gray-900">{isEnglish ? 'Single-GPU specifications · Sources checked: ' : '單顆 GPU 規格 · 來源核對日期：'}<time dateTime={comparison.reviewedAt}>{comparison.reviewedAt}</time></caption>
            <thead className="bg-gray-100 dark:bg-gray-800"><tr><th scope="col" className="p-5">{isEnglish ? 'Comparison item' : '比較項目'}</th>{comparison.columns.map(column => <th key={column} scope="col" className="max-w-64 p-5">{column}</th>)}</tr></thead>
            <tbody>{comparison.rows.map(row => <tr key={row.label.en} className="border-t border-gray-200 align-top dark:border-gray-700"><th scope="row" className="p-5 font-semibold">{row.label[language]}<span className="mt-2 block text-xs font-normal">{row.sourceIds.map((id, index) => <React.Fragment key={id}>{index > 0 ? ' · ' : ''}<a href={`#comparison-source-${id}`} className="text-emerald-700 underline underline-offset-4 dark:text-emerald-300">{isEnglish ? 'Source' : '來源'} {comparison.sourceIds.indexOf(id) + 1}</a></React.Fragment>)}</span></th>{row.values.map((value, index) => <td key={index} className="p-5"><span>{value}</span></td>)}</tr>)}</tbody>
          </table>
        </div>
        {comparison.rows.filter(row => row.note).map(row => <p key={row.label.en} className="mt-4 max-w-4xl text-sm leading-7 text-gray-600 dark:text-gray-300">{row.note?.[language]}</p>)}
        <p id={`${comparison.id}-boundary`} className="mt-6 max-w-4xl text-sm leading-7 text-gray-600 dark:text-gray-300">{comparison.boundary[language]}</p>
        <ol className="mt-6 list-inside list-decimal space-y-3 text-sm">{sourceLinks.map(source => <li key={source.id} id={`comparison-source-${source.id}`} className="scroll-mt-28"><a href={source.href} className="text-emerald-700 underline underline-offset-4 dark:text-emerald-300">{source.title}</a></li>)}</ol>
        <a href={`#${comparison.id}`} className="mt-6 inline-flex text-sm font-semibold text-emerald-700 underline underline-offset-4 dark:text-emerald-300">{isEnglish ? 'Link to this comparison' : '此比較表的連結'}</a>
      </div>
    </section>
  );
}
