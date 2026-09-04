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
    ? 'EudTech is listed as an official Comino distributor. You can verify this on the Comino distributor page:'
    : 'EudTech 已列為 Comino 官方經銷商。授權狀態可在 Comino 官網的經銷商頁面查證：';
  const ctaText = isEnglish ? 'Verify on the Comino website' : 'Comino 經銷商頁面';

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
      {isEnglish ? 'Compatible technologies' : '相容技術'}
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
      {isEnglish ? 'Industry recognition' : '業界認可'}
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
      title: isEnglish ? 'Engineered around liquid cooling' : '以液冷為核心的設計',
      description: isEnglish
        ? 'Grando is designed from the ground up by the Comino team. Purpose-made and tailored components keep the benefits of liquid cooling and limit its drawbacks.'
        : 'Grando 由 Comino 團隊從零設計。自製與客製元件保留液冷的優點，並減少其缺點。'
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: isEnglish ? 'Engineered for 24/7 operation' : '24/7 連續運作設計',
      description: isEnglish
        ? 'Designed for continuous operation at up to 40°C with no thermal throttling. One team handles quality from design to support.'
        : '可在最高 40°C 環境下連續運作，無熱節流。從設計到支援的品質流程由同一團隊負責。'
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: isEnglish ? 'Storage Review Best of 2024' : '2024 年 StorageReview 最佳獎',
      description: isEnglish
        ? 'Comino Grando received the "Storage Review Best of 2024" award for fitting up to six 450W GPUs in a 4U chassis while maintaining performance.'
        : 'Comino Grando 獲得「2024 年 StorageReview 最佳獎」，理由是在 4U 機箱內容納最多 6 顆 450W GPU 並維持效能。'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-teal-600" />,
      title: isEnglish ? 'Multi-GPU performance' : '多 GPU 效能',
      description: isEnglish
        ? 'Up to 8 GPUs and 2 CPUs, running up to 40% faster than air-cooled systems. Cooling capacity of 5.5kW at 25°C supports eight 600W GPUs at 90% utilisation.'
        : '最多 8 顆 GPU 與 2 顆 CPU，效能比氣冷系統高出最多 40%。25°C 下散熱能力 5.5kW，可支撐 8 顆 600W GPU 以 90% 使用率運作。'
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
      role: isEnglish ? 'Harrison Kinsley, AI researcher and YouTuber' : 'Harrison Kinsley，AI 研究者與 YouTuber',
      company: '',
      content: isEnglish
        ? 'A lot of inference power comes from this powerhouse machine from Comino, which has not one, not two, not three – it has six 4090s inside.'
        : '這台 Comino 主機提供大量推論算力，不是一顆、不是兩顆、不是三顆，裡面裝了 6 顆 4090。',
      avatar: '/sentdex-review.jpg'
    },
    {
      id: 2,
      name: 'Linus Tech Tips',
      role: isEnglish ? 'Tech reviewer' : '技術評測者',
      company: '',
      content: isEnglish
        ? 'The Comino Password Recovery Machine was used in the Crackinator project by Linus Tech Tips to help improve password strength.'
        : 'Comino Password Recovery Machine 用於 Linus Tech Tips 的 Crackinator 專案，協助提升密碼強度。',
      avatar: '/linus-review.jpg'
    },
    {
      id: 3,
      name: 'Storage Review',
      role: isEnglish ? 'Storage Review team' : 'Storage Review 團隊',
      company: '',
      content: isEnglish
        ? 'StorageReview.com reviewed Comino Grando units, and Grando received the "Storage Review Best of 2024" award.'
        : 'StorageReview.com 評測了 Comino Grando，Grando 並獲得「2024 年 StorageReview 最佳獎」。',
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
          {isEnglish ? 'Authorised distributor' : '授權經銷商'}
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
            ? 'EudTech is an authorised Comino distributor. Comino builds liquid-cooled AI computing systems. Grando systems are engineered, not just assembled, for AI training, inference, and HPC workloads on liquid-cooled multi-GPU hardware.'
            : 'EudTech 是 Comino 的授權經銷商。Comino 專注液冷 AI 運算系統。Grando 系列經工程設計而非只是組裝，適用於 AI 訓練、推論與 HPC 工作負載。'}
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
                {isEnglish ? 'Liquid-cooled multi-GPU systems' : '液冷多 GPU 系統'}
              </h4>
              <p className="text-lg font-medium">
                {isEnglish
                  ? 'For AI inference and training. Engineered around liquid cooling, with up to 8 GPUs.'
                  : '用於 AI 推論與訓練。以液冷為核心設計，最多支援 8 顆 GPU。'}
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
            ? 'See the Comino Grando products available through EudTech.'
            : '查看 EudTech 提供的 Comino Grando 產品。'}
        </p>
        <div className="flex flex-col items-center">
          <button
            type="button"
            disabled
            title={isEnglish ? 'Coming soon' : '即將推出'}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-400 bg-gray-300 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed transition duration-200"
          >
            {isEnglish ? 'Explore Comino products' : '查看 Comino 產品'}
          </button>
        </div>
      </div>
    </Section>
  );
};

export default ComimoBrandIntro;
