import React from 'react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { ActionLink, PageHero, PageShell } from './SitePagePrimitives';
import PrivacyProcessedData from './privacy/PrivacyProcessedData';
import PrivacyAttribution from './privacy/PrivacyAttribution';
import PrivacyProviders from './privacy/PrivacyProviders';
import PrivacyRequests from './privacy/PrivacyRequests';
import DigitalTwinPrivacySection from './privacy/DigitalTwinPrivacySection';

const PrivacyPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  return <PageShell title={{ zh: '隱私與資料使用｜EudTech', en: 'Privacy and data use | EudTech' }} description={{ zh: 'EudTech 說明網站與 Digital Twin OS 的資料處理方式。', en: 'Learn how EudTech handles website data and Digital Twin OS.' }} path="/privacy">
    <PageHero eyebrow={{ zh: '隱私與資料使用', en: 'Privacy and data use' }} title={{ zh: '資料使用方式清楚可查', en: 'Clear information about data use' }} lead={{ zh: 'EudTech 說明詢價服務與產品的資料處理方式，並維持必要的安全與稽核控制。', en: 'EudTech explains how data is handled by its website services and products, with appropriate security and audit controls.' }} isEnglish={isEnglish} actions={<ActionLink href="mailto:quote@eudaemonia.tech">quote@eudaemonia.tech</ActionLink>} />
    <main className="mx-auto max-w-5xl space-y-16 px-6 py-20 lg:px-8">
      <PrivacyProcessedData /><PrivacyAttribution /><PrivacyProviders /><PrivacyRequests />
      <DigitalTwinPrivacySection />
    </main>
  </PageShell>;
};
export default PrivacyPage;
