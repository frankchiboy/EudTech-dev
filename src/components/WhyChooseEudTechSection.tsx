import React from 'react';
import Section from './layout/Section';
import { Cpu, LifeBuoy, Wrench } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transform hover:-translate-y-2 transition-transform duration-300">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-lg">{description}</p>
  </div>
);

interface WhyChooseEudTechSectionProps {
  isEnglish: boolean;
}

const WhyChooseEudTechSection: React.FC<WhyChooseEudTechSectionProps> = ({ isEnglish }) => {
  const content = {
    en: {
      title: 'Why Choose EudTech?',
      subtitle: 'We are dedicated to providing cutting-edge AI solutions with a focus on performance, reliability, and customer satisfaction.',
      features: [
        {
          title: 'High-Performance Hardware',
          description: 'Our AI servers are equipped with the latest GPUs and liquid cooling technology to ensure maximum performance for your demanding workloads.',
        },
        {
          title: 'Expert Support',
          description: 'Our team of AI experts is available to provide you with dedicated support and guidance, from initial setup to ongoing optimization.',
        },
        {
          title: 'Customizable Solutions',
          description: 'We offer customizable server configurations and software solutions to meet the unique needs of your business.',
        },
      ],
    },
    zh: {
      title: '為何選擇 EudTech？',
      subtitle: '我們致力於提供尖端的 AI 解決方案，專注於性能、可靠性和客戶滿意度。',
      features: [
        {
          title: '高效能硬體',
          description: '我們的 AI 伺服器配備最新的 GPU 和液冷技術，確保為您要求嚴苛的工作負載提供最大性能。',
        },
        {
          title: '專家支援',
          description: '我們的 AI 專家團隊隨時為您提供專業支援和指導，從初始設定到持續優化。',
        },
        {
          title: '客製化解決方案',
          description: '我們提供可客製化的伺服器配置和軟體解決方案，以滿足您獨特的業務需求。',
        },
      ],
    },
  };

  const sectionContent = isEnglish ? content.en : content.zh;
  const icons = [
    <Cpu key="cpu" className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    <LifeBuoy key="support" className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    <Wrench key="custom" className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
  ];

  return (
    <Section id="why-choose-eudtech" background="white" padding="xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          {sectionContent.title}
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {sectionContent.subtitle}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        {sectionContent.features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            icon={icons[index]}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </Section>
  );
};

export default WhyChooseEudTechSection;
