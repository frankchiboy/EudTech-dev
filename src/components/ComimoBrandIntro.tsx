import React from 'react';
import { Droplets, Award, Globe, TrendingUp } from 'lucide-react';
import Section from './layout/Section';
import BrandHeader from './brand/BrandHeader';
import BrandFeatures from './brand/BrandFeatures';
import TechnologyPartners from './brand/TechnologyPartners';
import CustomerReviews from './brand/CustomerReviews';
import { ProductFeature } from '../data/models/Product';
import { Partnership } from '../data/models/Company';
import { Testimonial } from '../data/models/Content';

interface ComimoBrandIntroProps {
  isEnglish: boolean;
}

const ComimoBrandIntro: React.FC<ComimoBrandIntroProps> = ({ isEnglish }) => {
  const features: ProductFeature[] = [
    {
      icon: React.createElement(Droplets, { className: "h-8 w-8 text-blue-600" }),
      title: isEnglish ? 'Engineered Around Liquid Cooling' : '以液冷技術為核心設計',
      description: isEnglish 
        ? 'Grando is designed from scratch by the Comino team. Maximizes the benefits of liquid-cooling & minimizes its drawbacks with manufactured & tailored components.'
        : 'Grando由Comino團隊從零開始設計，最大化液冷技術優勢並最小化其缺點，採用專門製造和客製化元件'
    },
    {
      icon: React.createElement(Award, { className: "h-8 w-8 text-yellow-600" }),
      title: isEnglish ? 'Engineered for 24/7 Operation' : '24/7全天候運作設計',
      description: isEnglish
        ? 'Designed for continuous operation up to 40°C with zero thermal throttling. The quality assurance cycle from idea to support in single hands.'
        : '設計可在40°C高溫環境下24小時連續運作，無熱節流。從概念到支援的品質保證循環全由單一團隊掌控'
    },
    {
      icon: React.createElement(Globe, { className: "h-8 w-8 text-green-600" }),
      title: isEnglish ? 'Storage Review Best of 2024' : '2024年StorageReview最佳獎',
      description: isEnglish
        ? 'Comino Grando has received the "Storage Review Best of 2024" award for accommodating up to six 450W GPUs in a 4U chassis while ensuring optimal performance.'
        : 'Comino Grando榮獲「2024年StorageReview最佳獎」，在4U機箱中容納最多6個450W GPU，同時確保最佳效能'
    },
    {
      icon: React.createElement(TrendingUp, { className: "h-8 w-8 text-purple-600" }),
      title: isEnglish ? 'Extreme Performance' : '極致效能',
      description: isEnglish
        ? '8 GPUs, 2 CPUs - 40% faster than air-cooled systems. Cooling capacity up to 5.5kW @25°C, enough to run up to 8x 600W GPUs with 90% utilization rate.'
        : '8個GPU，2個CPU - 比氣冷系統快40%。散熱容量在25°C下可達5.5kW，足以支援8個600W GPU在90%使用率下運作'
    }
  ];

  const technologies: Partnership[] = [
    { id: 1, name: 'TensorFlow', logo: '/tensorflow-logo.png', description: '' },
    { id: 2, name: 'PyTorch', logo: '/pytorch-logo.png', description: '' },
    { id: 3, name: 'Keras', logo: '/keras-logo.png', description: '' },
    { id: 4, name: 'NVIDIA', logo: '/nvidia-logo.png', description: '' },
    { id: 5, name: 'AMD', logo: '/amd-logo.png', description: '' },
    { id: 6, name: 'Comino', logo: '/comino-logo.png', description: '' }
  ];

  const reviews: Testimonial[] = [
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
        : '我們的密碼破解機器協助Linus Tech Tips在Crackinator專案中提升密碼強度',
      avatar: '/linus-review.jpg'
    },
    {
      id: 3,
      name: 'Storage Review',
      role: isEnglish ? 'Storage Review Team' : 'Storage Review團隊',
      company: '',
      content: isEnglish
        ? 'StorageReview.com published an outstanding review of Comino Grando units. We\'re thrilled that Grando received the "Storage Review Best of 2024" award.'
        : 'StorageReview.com發表了對Comino Grando的傑出評測。我們很高興Grando榮獲「2024年StorageReview最佳獎」',
      avatar: '/sentdex-review.jpg'
    }
  ];

  return (
    <Section id="comino-brand" background="gradient">
      <BrandHeader isEnglish={isEnglish} />
      
      {/* Hero Image Section */}
      <div className="mb-20">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="/comino-4xa100.jpg" 
            alt="Comino Grando AI System" 
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="text-white p-12">
              <h4 className="text-3xl font-bold mb-4">
                {isEnglish ? 'Liquid-Cooled Multi-GPU Devices' : '液冷多GPU設備'}
              </h4>
              <p className="text-lg font-medium">
                {isEnglish
                  ? 'For AI Inference & Training - Engineered around liquid cooling technology with up to 8x RTX 4090 or H100 GPUs'
                  : '用於AI推論與訓練 - 圍繞液冷技術設計，最高支援8個RTX 4090或H100 GPU'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <BrandFeatures features={features} />
      <TechnologyPartners partners={technologies} isEnglish={isEnglish} />
      <CustomerReviews reviews={reviews} isEnglish={isEnglish} />
      
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {isEnglish
            ? 'Discover the full range of Comino Grando products available through EudTech'
            : '探索EudTech提供的完整Comino Grando產品線'}
        </p>
        <div className="flex flex-col items-center">
          <button
            disabled
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-500 bg-gray-300 dark:bg-gray-700 cursor-not-allowed mb-2"
          >
            {isEnglish ? 'Explore Comino Products' : '探索Comino產品'}
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isEnglish ? 'Coming Soon' : '即將推出'}
          </p>
        </div>
      </div>
    </Section>
  );
};

export default ComimoBrandIntro;