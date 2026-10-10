import React from 'react';
import supply from '../../data/h200Availability.json';

export default function H200AvailabilityNotice({ isEnglish, compact = false }: { isEnglish: boolean; compact?: boolean }) {
  const language = isEnglish ? 'en' : 'zh';
  return <aside data-h200-supply-status={supply.asOf} aria-label={supply.title[language]} className="my-5 rounded-lg border border-amber-500/50 bg-amber-50 p-4 text-left text-sm leading-6 text-amber-950 dark:bg-amber-950 dark:text-amber-100">
    <p className="!block !text-inherit !text-sm !leading-6 font-semibold">{supply.title[language]}</p>
    <p className="mt-2 !block !text-inherit !text-sm !leading-6">{compact ? supply.summary[language] : supply.detail[language]}</p>
  </aside>;
}
