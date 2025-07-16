import React from 'react';
import { useIntersectionObserver } from '../../hooks/performance/useIntersectionObserver';
import { getHeroContent } from '../../data/content';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import ScrollIndicator from './ScrollIndicator';
import LazyImage from '../common/LazyImage';

interface HeroSectionProps {
  isEnglish: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isEnglish }) => {
  const content = getHeroContent(isEnglish);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <section 
      id="home" 
      ref={targetRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label={isEnglish ? 'Hero section' : '主要區塊'}
    >
      <HeroBackground />
      <HeroContent content={content} />
      {isIntersecting && <ScrollIndicator />}
    </section>
  );
};

export default HeroSection;