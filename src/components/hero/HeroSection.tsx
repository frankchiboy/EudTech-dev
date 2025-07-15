import React from 'react';
import { getHeroContent } from '../../data/content';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import ScrollIndicator from './ScrollIndicator';

interface HeroSectionProps {
  isEnglish: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isEnglish }) => {
  const content = getHeroContent(isEnglish);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      <HeroContent content={content} />
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;