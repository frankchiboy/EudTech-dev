import React from 'react';
import { useI18n } from '../../i18n/I18nProvider';

const ContactHeader: React.FC = () => {
  const { t } = useI18n();
  return (
    <div className="text-center mb-16">
      <h2 className="text-base font-semibold tracking-wide bg-gradient-to-r from-blue-800 to-teal-600 dark:from-blue-400 dark:to-teal-300 bg-clip-text text-transparent uppercase">
        {t('contact.header.kicker')}
      </h2>
      <p className="mt-1 text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent sm:text-5xl sm:tracking-tight">
        {t('contact.header.title')}
      </p>
      <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
        {t('contact.header.lead')}
      </p>
    </div>
  );
};

export default ContactHeader;