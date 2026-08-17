import React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />
      <img
        src="/grando-8gpu-server.jpg"
        alt="AI Server Background"
        className="absolute inset-0 w-full h-full object-cover transform scale-105 animate-subtle-zoom"
      />
    </div>
  );
};

export default HeroBackground;
