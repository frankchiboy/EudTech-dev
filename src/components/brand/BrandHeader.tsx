import React from 'react';

interface Brand {
  name: string;
  description: string;
  logo: string;
  website: string;
}

interface VerificationLink {
  text: string;
  href: string;
}

interface HeroImage {
  src: string;
  alt: string;
}

interface BrandHeaderProps {
  isEnglish: boolean;
  brand?: Brand;
  verificationText?: string;
  verificationLink?: VerificationLink;
  heroImage?: HeroImage;
  heroTitle?: string;
  heroDescription?: string;
  certificationImage?: {
    src: string;
    alt: string;
  };
  /** 主題色：預設藍色；Comino 使用紫色系 */
  colorTheme?: 'blue' | 'comino' | 'cyabra';
}

const BrandHeader: React.FC<BrandHeaderProps> = ({ 
  isEnglish,
  brand = {
    name: 'Comino Grando',
    description: isEnglish
      ? 'EudTech is the authorized distributor of Comino, the world leader in liquid-cooled AI computing solutions. Comino Grando systems are engineered - not just assembled - delivering unprecedented performance for AI training, inference, and HPC workloads with liquid-cooled multi-GPU devices.'
      : 'EudTech是Comino的授權經銷商，Comino是液冷AI運算解決方案的全球領導者。Comino Grando系統經過工程設計而非僅僅組裝，為AI訓練、推論和HPC工作負載提供前所未有的效能。',
    logo: '/comino-grando-logo.png',
    website: 'https://www.grando.ai/'
  },
  verificationText = isEnglish
    ? 'EudTech is listed as an official Comino distributor. You can verify our authorization on '
    : 'EudTech已列為Comino官方經銷商。您可以在Comino官網經銷商頁面查證我們的授權：',
  verificationLink = {
    text: isEnglish ? 'Comino\'s distributor page' : 'Comino經銷商頁面',
    href: 'https://www.comino.com/en/company'
  },
  heroImage = {
    src: '/comino-4xa100.jpg',
    alt: 'Comino Grando AI System'
  },
  heroTitle = isEnglish ? 'Liquid-Cooled Multi-GPU Devices' : '液冷多GPU設備',
  heroDescription = isEnglish
    ? 'For AI Inference & Training - Engineered around liquid cooling technology with up to 8x RTX 4090 or H100 GPUs'
    : '用於AI推論與訓練 - 圍繞液冷技術設計，最高支援8個RTX 4090或H100 GPU',
  certificationImage = {
    src: '/amd-partner-badge.jpg',
    alt: 'AMD Elite Partner'
  },
  colorTheme = 'blue'
}) => {
  const themes = {
    comino: {
      small: 'text-purple-600 dark:text-purple-400',
      linkHover: 'hover:text-purple-700 dark:hover:text-purple-300',
      badgeBg: 'bg-purple-50 dark:bg-purple-900/30',
      badgeText: 'text-purple-800 dark:text-purple-300',
    },
    blue: {
      small: 'text-blue-600 dark:text-blue-400',
      linkHover: 'hover:text-blue-700 dark:hover:text-blue-300',
      badgeBg: 'bg-blue-50 dark:bg-blue-900/30',
      badgeText: 'text-blue-800 dark:text-blue-300',
    },
    cyabra: {
      small: 'text-cyan-600 dark:text-cyan-400',
      linkHover: 'hover:text-cyan-700 dark:hover:text-cyan-300',
      badgeBg: 'bg-cyan-50 dark:bg-cyan-900/30',
      badgeText: 'text-cyan-800 dark:text-cyan-300',
    }
  };

  const accent = themes[colorTheme] || themes.blue;

  return (
    <div className="text-center mb-16">
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <a 
            href={brand.website}
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-90 transition-opacity"
          >
            <img 
              src={brand.logo}
              alt={brand.name} 
              className="h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            />
          </a>
        </div>
      </div>
      
      <h2 className={`text-base font-semibold tracking-wide uppercase mb-4 ${accent.small}`}>
        {isEnglish ? 'Authorized Distributor' : '授權經銷商'}
      </h2>
      
      <h3 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-6">
        <a 
          href={brand.website}
          target="_blank" 
          rel="noopener noreferrer"
          className={`underline-offset-2 transition-colors ${accent.linkHover}`}
        >
          {brand.name}
        </a>
      </h3>
      
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl md:max-w-4xl mx-auto mb-8 leading-relaxed">
        {brand.description}
      </p>
      
      <div className={`rounded-lg p-6 mb-8 max-w-2xl mx-auto ${accent.badgeBg}`}>
        <p className={`${accent.badgeText} font-medium`}>
          {verificationText}
          <a 
            href={verificationLink.href}
            target="_blank" 
            rel="noopener noreferrer"
            className={`underline ${accent.linkHover}`}
          >
            {verificationLink.text}
          </a>
        </p>
      </div>
      
      {certificationImage && (
        <div className="flex justify-center mb-12">
          <img 
            src={certificationImage.src}
            alt={certificationImage.alt}
            className="h-20 object-contain"
          />
        </div>
      )}
      
      {/* Hero Image Section */}
      {heroImage && (
        <div className="mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={heroImage.src}
              alt={heroImage.alt}
              className="w-full h-72 sm:h-80 md:h-96 lg:h-[28rem] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent flex items-center">
              <div className="text-white p-6 sm:p-8 md:p-12 max-w-xl">
                <h4 className="text-3xl font-bold mb-4">
                  {heroTitle}
                </h4>
                <p className="text-base sm:text-lg font-medium leading-relaxed">
                  {heroDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandHeader;