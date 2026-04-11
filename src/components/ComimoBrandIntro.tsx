import React from 'react';
import { Droplets, Award, Globe, TrendingUp } from 'lucide-react';
import Section from './layout/Section';
import DealerBadge from './brand/DealerBadge';

interface ComimoBrandIntroProps {
  isEnglish: boolean;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Partner {
  id: number;
  name: string;
  logo: string;
}

interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

const VerificationCard: React.FC<{ isEnglish: boolean }> = ({ isEnglish }) => {
  const infoText = isEnglish
    ? 'EudTech is now the official Comino distributor. You can check our authorization on the official Comino distributor page:'
    : 'EudTech已列為Comino官方經銷商。您可以在Comino官網經銷商頁面查證我們的授權：';
  const ctaText = isEnglish ? 'Verify on Comino Website' : 'Comino經銷商頁面';

  return (
    <div className="bg-gradient-to-r from-white to-gray-50 dark:from-blue-900/40 dark:to-teal-800/40 p-8 rounded-xl mb-12 max-w-3xl mx-auto shadow-lg border border-gray-200 dark:border-blue-900/20 backdrop-blur-sm">
      <div className="flex justify-center items-center gap-6 mb-6">
        <div className="rounded overflow-hidden shadow-md">
          <img
            src="/comino-grando-logo.png"
            alt="Comino Logo"
            className="h-16 object-contain bg-gray-800 p-3 rounded shadow-md"
          />
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-white/20 backdrop-blur">
          <span className="text-gray-600 dark:text-white text-xl font-bold">×</span>
        </div>
        <DealerBadge />
      </div>
      <p className="text-gray-700 dark:text-white text-center text-lg font-medium">{infoText}</p>
      <div className="flex justify-center mt-4">
        <a
          href="https://www.comino.com/en/company"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow flex items-center"
        >
          {ctaText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

const FeatureGrid: React.FC<{ features: Feature[] }> = ({ features }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
    {features.map((feature, index) => (
      <div key={index} className="text-center group">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-teal-50 dark:bg-teal-900/30 transition-colors">
            {feature.icon}
          </div>
        </div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">{feature.title}</h4>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
      </div>
    ))}
  </div>
);

const PartnerLogos: React.FC<{ partners: Partner[]; isEnglish: boolean }> = ({ partners, isEnglish }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 mb-20">
    <h4 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6 sm:mb-8">
      {isEnglish ? 'Compatible Technologies' : '相容技術'}
    </h4>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap justify-center items-center gap-x-6 sm:gap-x-8 gap-y-10 py-4">
      {partners.map((partner) => {
        const isHighlighted = ['NVIDIA', 'Comino'].includes(partner.name);
        const isAMD = partner.name === 'AMD';
        return (
          <div key={partner.id} className="flex items-center group relative">
            {isHighlighted && (
              <div className="absolute inset-0 rounded-full blur-lg opacity-25 bg-gradient-to-r from-blue-300 to-blue-500 -z-10" />
            )}
            {isAMD && (
              <div className="absolute inset-0 rounded-full blur-xl opacity-0 dark:opacity-30 bg-gradient-to-r from-red-500 to-red-600 -z-10" />
            )}
            <div
              className={`flex items-center justify-center ${
                isHighlighted ? 'p-3 relative bg-gray-800 dark:bg-gray-800 rounded shadow-md' : isAMD ? 'p-3 relative' : ''
              }`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className={`w-auto h-14 max-w-[120px] opacity-90 ${
                  isHighlighted
                    ? 'drop-shadow-md dark:opacity-100 dark:drop-shadow-lg filter dark:invert-0'
                    : isAMD
                    ? 'drop-shadow-sm dark:drop-shadow-lg dark:opacity-100 dark:filter dark:brightness-125'
                    : 'dark:opacity-90'
                } object-contain transition-all duration-300 group-hover:scale-105`}
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const ReviewGrid: React.FC<{ reviews: Review[]; isEnglish: boolean }> = ({ reviews, isEnglish }) => (
  <div className="text-center mb-16">
    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
      {isEnglish ? 'Industry Recognition' : '業界認可'}
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-4">
            <img
              src={review.avatar || '/default-avatar.png'}
              alt={review.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h5 className="font-semibold text-gray-900 dark:text-white">{review.name}</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">{review.role}</p>
              {review.company && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{review.company}</p>
              )}
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-200 italic">"{review.content}"</p>
        </div>
      ))}
    </div>
  </div>
);

const ComimoBrandIntro: React.FC<ComimoBrandIntroProps> = ({ isEnglish }) => {
  const features: Feature[] = [
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      title: isEnglish ? 'Engineered Around Liquid Cooling' : '以液冷技術為核心設計',
      description: isEnglish
        ? 'Grando is designed from scratch by the Comino team. Maximizes the benefits of liquid-cooling & minimizes its drawbacks with manufactured & tailored components.'
        : 'Grando由Comino團隊從零開始設計，最大化液冷技術優勢並最小化其缺點，採用專門製造和客製化元件。'
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: isEnglish ? 'Engineered for 24/7 Operation' : '24/7全天候運作設計',
      description: isEnglish
        ? 'Designed for continuous operation up to 40°C with zero thermal throttling. The quality assurance cycle from idea to support in single hands.'
        : '設計可在40°C高溫環境下24小時連續運作，無熱節流。從概念到支援的品質保證循環全由單一團隊掌控。'
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: isEnglish ? 'Storage Review Best of 2024' : '2024年StorageReview最佳獎',
      description: isEnglish
        ? 'Comino Grando has received the "Storage Review Best of 2024" award for accommodating up to six 450W GPUs in a 4U chassis while ensuring optimal performance.'
        : 'Comino Grando榮獲「2024年StorageReview最佳獎」，在4U機箱中容納最多6個450W GPU，同時確保最佳效能。'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-teal-600" />,
      title: isEnglish ? 'Extreme Performance' : '極致效能',
      description: isEnglish
        ? '8 GPUs, 2 CPUs - 40% faster than air-cooled systems. Cooling capacity up to 5.5kW @25°C, enough to run up to 8x 600W GPUs with 90% utilization rate.'
        : '8個GPU，2個CPU - 比氣冷系統快40%。散熱容量在25°C下可達5.5kW，足以支援8個600W GPU在90%使用率下運作。'
    }
  ];

  const partners: Partner[] = [
    { id: 1, name: 'TensorFlow', logo: '/tensorflow-logo.png' },
    { id: 2, name: 'PyTorch', logo: '/pytorch-logo.png' },
    { id: 3, name: 'Keras', logo: '/keras-logo.png' },
    { id: 4, name: 'NVIDIA', logo: '/nvidia-logo.png' },
    { id: 5, name: 'AMD', logo: '/amd-logo.png' },
    { id: 6, name: 'Comino', logo: '/comino-logo.png' }
  ];

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Sentdex',
      role: isEnglish ? 'Harrison Kinsley, AI Researcher & YouTuber' : 'Harrison Kinsley，AI研究者與YouTuber',
      company: '',
      content: isEnglish
        ? 'A lot of inference power comes from this Powerhouse machine from Comino which has not one, not two, not three - it has six 4090s inside!'
        : 'Comino這台強大機器帶來大量推論能力，不是一個、不是兩個、不是三個 - 它內建6個4090！',
      avatar: '/sentdex-review.jpg'
    },
    {
      id: 2,
      name: 'Linus Tech Tips',
      role: isEnglish ? 'Tech Reviewer' : '技術評測者',
      company: '',
      content: isEnglish
        ? 'Our Password Recovery Machine helps to improve passwords in a Crackinator Project by Linus Tech Tips.'
        : '我們的密碼破解機器協助Linus Tech Tips在Crackinator專案中提升密碼強度。',
      avatar: '/linus-review.jpg'
    },
    {
      id: 3,
      name: 'Storage Review',
      role: isEnglish ? 'Storage Review Team' : 'Storage Review團隊',
      company: '',
      content: isEnglish
        ? 'StorageReview.com published an outstanding review of Comino Grando units. We\'re thrilled that Grando received the "Storage Review Best of 2024" award.'
        : 'StorageReview.com發表了對Comino Grando的傑出評測。我們很高興Grando榮獲「2024年StorageReview最佳獎」。',
      avatar: '/sentdex-review.jpg'
    }
  ];

  return (
    <Section id="comino-brand" background="gradient" padding="xl">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <a
              href="https://www.grando.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="/comino-grando-logo.png"
                alt="Comino Grando Logo"
                className="h-16 object-contain bg-gray-800 p-3 rounded shadow-md"
              />
            </a>
          </div>
        </div>
        <h2 className="text-base font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase mb-4">
          {isEnglish ? 'Authorized Distributor' : '授權經銷商'}
        </h2>
        <h3 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-6">
          <a
            href="https://www.grando.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Comino Grando
          </a>
        </h3>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          {isEnglish
            ? 'EudTech is the authorized distributor of Comino, the world leader in liquid-cooled AI computing solutions. Comino Grando systems are engineered - not just assembled - delivering unprecedented performance for AI training, inference, and HPC workloads with liquid-cooled multi-GPU devices.'
            : 'EudTech是Comino的授權經銷商，Comino是液冷AI運算解決方案的全球領導者。Comino Grando系統經過工程設計而非僅僅組裝，為AI訓練、推論和HPC工作負載提供前所未有的效能。'}
        </p>
        <div className="flex justify-center mb-12">
          <img src="/amd-partner-badge.jpg" alt="AMD Elite Partner" className="h-20 object-contain" />
        </div>
      </div>

      <VerificationCard isEnglish={isEnglish} />

      <div className="mb-20">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="/comino-4xa100.jpg"
            alt="Comino Grando AI System"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="text-white p-12 max-w-xl">
              <h4 className="text-3xl font-bold mb-4">
                {isEnglish ? 'Liquid-Cooled Multi-GPU Devices' : '液冷多GPU設備'}
              </h4>
              <p className="text-lg font-medium">
                {isEnglish
                  ? 'For AI Inference & Training - Engineered around liquid cooling technology with up to 8 GPUs'
                  : '用於AI推論與訓練 - 圍繞液冷技術設計，最高支援8個GPU'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-16">
        <img
          src="/amd-partner-badge.jpg"
          alt="AMD Partner Program ELITE"
          className="h-24 shadow-lg rounded"
        />
      </div>

      <FeatureGrid features={features} />
      <PartnerLogos partners={partners} isEnglish={isEnglish} />
      <ReviewGrid reviews={reviews} isEnglish={isEnglish} />

      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {isEnglish
            ? 'Discover the full range of Comino Grando products available through EudTech'
            : '探索EudTech提供的完整Comino Grando產品線'}
        </p>
        <div className="flex flex-col items-center">
          <button
            type="button"
            disabled
            title={isEnglish ? 'Coming soon' : '即將推出'}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-400 bg-gray-300 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed transition duration-200"
          >
            {isEnglish ? 'Explore Comino Products' : '探索Comino產品'}
          </button>
        </div>
      </div>
    </Section>
  );
};

export default ComimoBrandIntro;
