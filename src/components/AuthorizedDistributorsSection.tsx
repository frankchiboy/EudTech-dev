import React from 'react';
import Section from './layout/Section';
import { useI18n } from '../i18n/I18nProvider';

const AuthorizedDistributorsSection: React.FC = () => {
  const { t, locale } = useI18n();
  const isEnglish = locale === 'en';
  return (
    <Section id="authorized-distributors" background="gray" padding="lg" className="pb-2">
      <div className="text-center">
        <h2 className="text-base font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
          {t('brand.authorized.distributor')}
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {isEnglish ? "World's Leading AI Solutions" : "全球領先的 AI 解決方案"}
        </p>
        <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          {isEnglish
            ? 'EudTech is an authorized distributor for the world’s leading AI solution providers, bringing you the most advanced and reliable technologies.'
            : 'EudTech 是全球頂尖 AI 解決方案供應商的授權經銷商，為您帶來最先進、最可靠的技術。'}
        </p>
      </div>
    </Section>
  );
};

export default AuthorizedDistributorsSection;
