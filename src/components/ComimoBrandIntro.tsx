import React from 'react';
import { Droplets, Award, Globe, TrendingUp } from 'lucide-react';

interface ComimoBrandIntroProps {
  isEnglish: boolean;
}

const ComimoBrandIntro: React.FC<ComimoBrandIntroProps> = ({ isEnglish }) => {
  const features = [
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
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: isEnglish ? 'Extreme Performance' : '極致效能',
      description: isEnglish
        ? '8 GPUs, 2 CPUs - 40% faster than air-cooled systems. Cooling capacity up to 5.5kW @25°C, enough to run up to 8x 600W GPUs with 90% utilization rate.'
        : '8個GPU，2個CPU - 比氣冷系統快40%。散熱容量在25°C下可達5.5kW，足以支援8個600W GPU在90%使用率下運作。'
    }
  ];

  const technologies = [
    { name: 'TensorFlow', logo: '/tensorflow-logo.png' },
    { name: 'PyTorch', logo: '/pytorch-logo.png' },
    { name: 'Keras', logo: '/keras-logo.png' },
    { name: 'NVIDIA', logo: '/nvidia-logo.png' },
    { name: 'AMD', logo: '/amd-logo.png' },
    { name: 'Comino', logo: '/comino-logo.png', needBackground: true }
  ];

  const reviews = [
    {
      name: 'Sentdex',
      image: '/sentdex-review.jpg',
      quote: isEnglish 
        ? 'A lot of inference power comes from this Powerhouse machine from Comino which has not one, not two, not three - it has six 4090s inside!'
        : 'Comino這台強大機器帶來大量推論能力，不是一個、不是兩個、不是三個 - 它內建6個4090！',
      role: isEnglish ? 'Harrison Kinsley, AI Researcher & YouTuber' : 'Harrison Kinsley，AI研究者與YouTuber'
    },
    {
      name: 'Linus Tech Tips',
      image: '/linus-review.jpg',
      quote: isEnglish
        ? 'Our Password Recovery Machine helps to improve passwords in a Crackinator Project by Linus Tech Tips.'
        : '我們的密碼破解機器協助Linus Tech Tips在Crackinator專案中提升密碼強度。',
      role: isEnglish ? 'Tech Reviewer' : '技術評測者'
    },
    {
      name: 'Storage Review',
      image: '/sentdex-review.jpg',
      quote: isEnglish
        ? 'StorageReview.com published an outstanding review of Comino Grando units. We\'re thrilled that Grando received the "Storage Review Best of 2024" award.'
        : 'StorageReview.com發表了對Comino Grando的傑出評測。我們很高興Grando榮獲「2024年StorageReview最佳獎」。',
      role: isEnglish ? 'Storage Review Team' : 'Storage Review團隊'
    }
  ];

  return (
    <section id="comino-brand" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Introduction */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <img 
                src="https://cdn.prod.website-files.com/628295a883124981fd568435/63dd331994de0e0afc29f236_Comino_Grando.png" 
                alt="Comino Grando Logo" 
                className="h-16 object-contain bg-gray-800 p-3 rounded shadow-md"
              />
            </div>
          </div>
          <h2 className="text-base font-semibold tracking-wide text-eudtech-600 uppercase mb-4">
            {isEnglish ? 'Authorized Distributor' : '授權經銷商'}
          </h2>
          <h3 className="text-4xl font-bold text-neutral-900 sm:text-5xl mb-6">
            {isEnglish ? 'Comino Grando' : 'Comino Grando'}
          </h3>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            {isEnglish
              ? 'EudTech is the authorized distributor of Comino, the world leader in liquid-cooled AI computing solutions. Comino Grando systems are engineered - not just assembled - delivering unprecedented performance for AI training, inference, and HPC workloads with liquid-cooled multi-GPU devices.'
              : 'EudTech是Comino的授權經銷商，Comino是液冷AI運算解決方案的全球領導者。Comino Grando系統經過工程設計而非僅僅組裝，為AI訓練、推論和HPC工作負載提供前所未有的效能。'}
          </p>
          
          {/* Authorization Information */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <p className="text-blue-800 font-medium">
              {isEnglish
                ? 'EudTech is listed as an official Comino distributor. You can verify our authorization on '
                : 'EudTech已列為Comino官方經銷商。您可以在Comino官網經銷商頁面查證我們的授權：'}
              <a 
                href="https://www.comino.com/en/company" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-blue-900"
              >
                {isEnglish ? 'Comino\'s distributor page' : 'Comino經銷商頁面'}
              </a>
            </p>
          </div>
          
          {/* AMD Partner Badge */}
          <div className="flex justify-center mb-12">
            <img 
              src="/amd-partner-badge.jpg" 
              alt="AMD Elite Partner" 
              className="h-20 object-contain"
            />
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="mb-20">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/comino-4xa100.jpg" 
              alt="Comino Grando AI System" 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
              <div className="text-white p-12">
                <h4 className="text-3xl font-bold mb-4">
                  {isEnglish ? 'Liquid-Cooled Multi-GPU Devices' : '液冷多GPU設備'}
                </h4>
                <p className="text-lg opacity-90">
                  {isEnglish
                    ? 'For AI Inference & Training - Engineered around liquid cooling technology with up to 8x RTX 4090 or H100 GPUs'
                    : '用於AI推論與訓練 - 圍繞液冷技術設計，最高支援8個RTX 4090或H100 GPU'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Technology Partners */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-20">
          <h4 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {isEnglish ? 'Compatible Technologies' : '相容技術'}
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="flex items-center">
                <img 
                  src={tech.logo} 
                  alt={tech.name} 
                  className={`h-12 object-contain hover:opacity-100 transition-opacity ${
                    tech.name === 'NVIDIA' || tech.needBackground ? 'bg-gray-800 p-2 rounded shadow-sm' : 
                    'opacity-70'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="text-center mb-16">
          <h4 className="text-2xl font-bold text-gray-900 mb-8">
            {isEnglish ? 'Industry Recognition' : '業界認可'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h5 className="font-semibold text-gray-900">{review.name}</h5>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{review.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Facility Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/comino-facility-1.jpg" 
              alt="Comino Manufacturing Facility" 
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/comino-facility-2.jpg" 
              alt="Comino Research Lab" 
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/comino-facility-3.jpg" 
              alt="Comino Quality Control" 
              className="w-full h-48 object-cover"
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            {isEnglish
              ? 'Discover the full range of Comino Grando products available through EudTech'
              : '探索EudTech提供的完整Comino Grando產品線'}
          </p>
          <a
            href="#comino-products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-eudtech-700 hover:bg-eudtech-800 transition duration-200"
          >
            {isEnglish ? 'Explore Comino Products' : '探索Comino產品'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComimoBrandIntro;