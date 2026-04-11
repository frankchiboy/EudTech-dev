import React from 'react';
import Section from './layout/Section';

interface AuthorizedDistributorHeaderProps {
  isEnglish: boolean;
}

const AuthorizedDistributorHeader: React.FC<AuthorizedDistributorHeaderProps> = ({ isEnglish }) => {
  return (
    <Section id="authorized-distributors" background="white">
      <div className="text-center">
        <h2 className="text-base font-semibold tracking-wide text-blue-600 dark:text-blue-300 uppercase mb-4">
          {isEnglish ? 'Our Partners' : '我們的合作夥伴'}
        </h2>
        <h3 className="text-4xl font-bold text-gray-800 dark:text-white sm:text-5xl mb-6">
          {isEnglish ? 'Authorized Distributors' : '授權經銷商'}
        </h3>
        <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          {isEnglish 
            ? 'EudTech partners with industry-leading technology companies to deliver cutting-edge AI solutions and enterprise-grade hardware to our clients.'
            : 'EudTech與業界領先的科技公司合作，為客戶提供尖端的AI解決方案和企業級硬體設備。'
          }
        </p>
      </div>
    </Section>
  );
};

export default AuthorizedDistributorHeader;