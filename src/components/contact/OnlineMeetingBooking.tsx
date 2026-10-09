import React, { useState } from 'react';
import { Calendar, Copy, Mail } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';
import { SITE_BOOKING } from '../../data/siteArchitecture';
import organization from '../../data/organization.json';

const OnlineMeetingBooking: React.FC = () => {
  const { t, locale } = useI18n();
  const isEnglish = locale === 'en';
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'unavailable'>('idle');
  const emailAddress = organization.email;
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('unavailable');
    }
  };

  return (
    <div className="min-w-0 p-6 sm:p-10 lg:p-12 dark:bg-gray-800 flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {isEnglish ? SITE_BOOKING.title.en : SITE_BOOKING.title.zh}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {isEnglish ? SITE_BOOKING.description.en : SITE_BOOKING.description.zh}
        </p>
      </div>
      <a
        href={SITE_BOOKING.href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-md flex items-center justify-center py-4 px-6
                  bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800
                  text-white text-center font-medium rounded-lg shadow-lg transition-colors
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
      >
        <Calendar aria-hidden="true" className="h-5 w-5 shrink-0 mr-2" />
        {isEnglish ? SITE_BOOKING.label.en : SITE_BOOKING.label.zh}
        <span className="sr-only">{isEnglish ? ' (opens in a new tab)' : '（另開新分頁）'}</span>
      </a>
      <div className="w-full max-w-md flex items-center justify-center my-6" aria-hidden="true">
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
        <span className="px-4 text-sm text-gray-500 dark:text-gray-400">{t('contact.booking.or')}</span>
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
      </div>
      <a
        href={'mailto:' + emailAddress}
        className="w-full max-w-md flex items-center justify-center py-4 px-6
                  bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300
                  text-gray-800 text-center font-medium rounded-lg border border-gray-300 shadow-sm
                  dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700
                  dark:text-gray-200 dark:border-gray-600 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-offset-gray-800"
      >
        <Mail aria-hidden="true" className="h-5 w-5 shrink-0 mr-2" />
        {t('contact.booking.button.email')}
      </a>
      <p className="mt-4 max-w-full break-all text-sm text-gray-600 dark:text-gray-300">{emailAddress}</p>
      <button
        type="button"
        onClick={copyEmail}
        className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Copy aria-hidden="true" className="h-4 w-4 shrink-0" />
        {isEnglish ? 'Copy email address' : '複製 Email 地址'}
      </button>
      <p role="status" aria-live="polite" className="min-h-6 max-w-full text-center text-sm text-gray-600 dark:text-gray-300">
        {copyStatus === 'copied' && (isEnglish ? 'Email address copied.' : '已複製 Email 地址。')}
        {copyStatus === 'unavailable' && (isEnglish ? 'Select the email address above to copy it.' : '可選取上方 Email 地址複製。')}
      </p>
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">{t('contact.booking.note')}</p>
    </div>
  );
};
export default OnlineMeetingBooking;
