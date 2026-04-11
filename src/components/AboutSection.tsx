import React from 'react';
import { Lightbulb } from 'lucide-react';
import Section from './layout/Section';
import AboutContent from './about/AboutContent';
import AboutImage from './about/AboutImage';
import AboutStats from './about/AboutStats';

interface AboutSectionProps {
  isEnglish: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ isEnglish }) => {
  const stats = [
    {
      id: 1,
      value: '15+',
      label: isEnglish ? 'AI Solutions' : 'AI解決方案',
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
    }
  ];

  return (



  <Section id="about" background="gradient" padding="xl">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
        <AboutContent isEnglish={isEnglish} />
        <div className="mt-12 lg:mt-0">
          <AboutImage isEnglish={isEnglish} />
          <div className="mt-8">
            <AboutStats stats={stats} />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;