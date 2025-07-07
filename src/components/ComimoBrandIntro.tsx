import React from 'react';
import { Droplets, Award, Globe, TrendingUp } from 'lucide-react';

interface ComimoBrandIntroProps {
  isEnglish: boolean;
}

const ComimoBrandIntro: React.FC<ComimoBrandIntroProps> = ({ isEnglish }) => {
  const features = [
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      title: isEnglish ? 'Revolutionary Liquid Cooling' : '革命性液冷技術',
      description: isEnglish 
        ? 'CoolIT liquid cooling technology enables maximum performance while maintaining whisper-quiet operation and optimal component temperatures.'
        : 'CoolIT液冷技術實現最大效能，同時保持超靜音運作和最佳組件溫度。'
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: isEnglish ? 'Industry Recognition' : '業界認可',
      description: isEnglish
        ? 'Trusted by leading tech reviewers and AI researchers worldwide, including Linus Tech Tips and Sentdex.'
        : '受到全球領先技術評測者和AI研究人員信賴，包括Linus Tech Tips和Sentdex。'
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: isEnglish ? 'Global Deployment' : '全球部署',
      description: isEnglish
        ? 'From research labs to enterprise data centers, Comino systems power AI innovation across 50+ countries.'
        : '從研究實驗室到企業數據中心，Comino系統為超過50個國家的AI創新提供動力。'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: isEnglish ? 'Performance Leadership' : '效能領導',
      description: isEnglish
        ? 'Delivering up to 40% better performance than air-cooled alternatives while reducing energy consumption.'
        : '比氣冷替代方案提供高達40%的效能提升，同時降低能耗。'
    }
  ];

  const technologies = [
    { name: 'TensorFlow', logo: '/tensorflow-logo.png' },
    { name: 'PyTorch', logo: '/pytorch-logo.png' },
    { name: 'Keras', logo: '/keras-logo.png' },
    { name: 'NVIDIA', logo: '/nvidia-logo.png' },
    { name: 'AMD', logo: '/amd-logo.png' }
  ];

  const reviews = [
    {
      name: 'Sentdex',
      image: '/sentdex-review.jpg',
      quote: isEnglish 
        ? 'Incredible performance for AI workloads'
        : 'AI工作負載的絕佳效能',
      role: isEnglish ? 'AI Researcher & YouTuber' : 'AI研究者與YouTuber'
    },
    {
      name: 'Linus Tech Tips',
      image: '/linus-review.jpg',
      quote: isEnglish
        ? 'Revolutionary liquid cooling design'
        : '革命性液冷設計',
      role: isEnglish ? 'Tech Reviewer' : '技術評測者'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Introduction */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <img 
              src="/comino-logo.png" 
              alt="Comino Grando Logo" 
              className="h-16 object-contain"
            />
          </div>
          <h2 className="text-base font-semibold tracking-wide text-blue-800 uppercase mb-4">
            {isEnglish ? 'Authorized Partner' : '授權合作夥伴'}
          </h2>
          <h3 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
            {isEnglish ? 'Comino Grando' : 'Comino Grando'}
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {isEnglish
              ? 'EudTech is the authorized distributor of Comino, the world leader in liquid-cooled AI computing solutions. Comino Grando systems deliver unprecedented performance for AI training, inference, and high-performance computing workloads.'
              : 'EudTech是Comino的授權經銷商，Comino是液冷AI運算解決方案的全球領導者。Comino Grando系統為AI訓練、推論和高效能運算工作負載提供前所未有的效能。'}
          </p>
          
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
                  {isEnglish ? 'Next-Generation AI Computing' : '下一代AI運算'}
                </h4>
                <p className="text-lg opacity-90">
                  {isEnglish
                    ? 'Liquid-cooled GPU servers with up to 8x RTX 4090 or H100 GPUs'
                    : '液冷GPU伺服器，最高支援8個RTX 4090或H100 GPU'}
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
                  className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-900 transition duration-200"
          >
            {isEnglish ? 'Explore Comino Products' : '探索Comino產品'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComimoBrandIntro;