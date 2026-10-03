import React from 'react';
import heroSmall from '../../assets/hero/grando-960.webp';
import heroMedium from '../../assets/hero/grando-1600.webp';
import heroLarge from '../../assets/hero/grando-2560.webp';

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />
      <img
        src={heroMedium}
        srcSet={`${heroSmall} 960w, ${heroMedium} 1600w, ${heroLarge} 2560w`}
        sizes="100vw"
        width={2898}
        height={1934}
        loading="eager"
        fetchPriority="high"
        alt=""
        className="absolute inset-0 w-full h-full object-cover transform scale-105 animate-subtle-zoom"
      />
    </div>
  );
};

export default HeroBackground;
