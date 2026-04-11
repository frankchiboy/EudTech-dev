import React from 'react';
import { Shield, AlertCircle, Search, Globe } from 'lucide-react';
import Section from './layout/Section';
import DealerBadge from './brand/DealerBadge';

interface CyabraBrandIntroProps {
  isEnglish: boolean;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StatItem {
  value: string;
  labelEn: string;
  labelZh: string;
}

interface Testimonial {
  name: string;
  roleEn: string;
  roleZh: string;
  companyEn: string;
  companyZh: string;
  quoteEn: string;
  quoteZh: string;
  avatar: string;
}

const CyabraVerificationCard: React.FC<{ isEnglish: boolean }> = ({ isEnglish }) => {
  const infoText = isEnglish
    ? 'EudTech is now the official Cyabra distributor. You can check our authorization on the official Cyabra distributor page:'
    : 'EudTech已列為Cyabra官方經銷商。您可以在Cyabra官網經銷商頁面查證我們的授權：';
  const ctaText = isEnglish ? 'Verify on Cyabra Website' : 'Cyabra經銷商頁面';

  return (
    <div className="bg-gradient-to-r from-white to-gray-50 dark:from-blue-900/40 dark:to-blue-800/40 p-8 rounded-xl mb-12 max-w-3xl mx-auto shadow-lg border border-gray-200 dark:border-blue-900/20 backdrop-blur-sm">
      <div className="flex justify-center items-center gap-6 mb-6">
        <div className="rounded overflow-hidden shadow-md">
          <img
            src="/cyabra-logo.svg"
            alt="Cyabra Logo"
            className="w-28 h-28 object-contain bg-white rounded-xl p-4 border border-gray-200"
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
          href="https://cyabra.com/become-a-partner/"
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
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
    {features.map((feature, index) => (
      <div
        key={index}
        className="bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:bg-gray-100 dark:hover:bg-white/20 transition-colors duration-300"
      >
        <div className="mb-4">{feature.icon}</div>
        <h3 className="text-xl font-bold mb-3 text-[#003daa] dark:text-white">{feature.title}</h3>
        <p className="text-gray-700 dark:text-gray-200">{feature.description}</p>
      </div>
    ))}
  </div>
);

const StatsSection: React.FC<{ stats: StatItem[]; isEnglish: boolean }> = ({ stats, isEnglish }) => (
  <div className="bg-gray-100 dark:bg-[#001e54]/50 rounded-xl p-8 mb-16 shadow-md">
    <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
      {isEnglish ? 'Why Cyabra Matters' : '為何Cyabra重要'}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.value} className="text-center">
          <div className="text-4xl font-bold mb-2 text-blue-600 dark:text-blue-300">{stat.value}</div>
          <div className="text-lg text-gray-700 dark:text-white">
            {isEnglish ? stat.labelEn : stat.labelZh}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial; isEnglish: boolean }> = ({
  testimonial,
  isEnglish
}) => (
  <div className="bg-white dark:bg-gray-800/40 rounded-xl p-6 shadow-lg relative border border-gray-100 dark:border-blue-900/20 hover:shadow-xl transition-shadow duration-300">
    <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
      <svg
        className="w-6 h-6 text-blue-600 dark:text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    </div>
    <div className="flex items-center mb-6">
      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-200">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-full h-full object-cover"
          onError={(event) => {
            const target = event.currentTarget;
            target.src = '/cyabra-logo.svg';
            target.classList.add('bg-white', 'p-2');
          }}
        />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {isEnglish ? testimonial.roleEn : testimonial.roleZh}
        </p>
        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
          {isEnglish ? testimonial.companyEn : testimonial.companyZh}
        </p>
      </div>
    </div>
    <blockquote className="text-gray-700 dark:text-white italic text-lg">
      "
      {isEnglish ? testimonial.quoteEn : testimonial.quoteZh}
      "
    </blockquote>
  </div>
);

const FrostRecognition: React.FC<{ isEnglish: boolean }> = ({ isEnglish }) => (
  <div className="container mx-auto px-4 py-16">
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="md:w-1/2">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#003daa]">
          {isEnglish ? 'Cyabra Named Innovation Leader by Frost & Sullivan' : 'Cyabra被Frost & Sullivan評為創新領導者'}
        </h2>
        <p className="text-lg mb-6">
          "
          {isEnglish
            ? 'By uncovering fake accounts and tracking disinformation waves, Cyabra empowers organizations to protect their brand reputation and ensure the authenticity of online discourse.'
            : '通過揭露假帳戶和追蹤假資訊浪潮，Cyabra使組織能夠保護其品牌聲譽並確保線上對話的真實性。'}
          "
        </p>
        <p className="mb-4">
          {isEnglish
            ? 'Following independent research Frost & Sullivan recognized Cyabra with the 2025 North American Technology Innovation Leadership Award.'
            : '在獨立研究後，Frost & Sullivan授予Cyabra 2025年北美技術創新領導獎。'}
        </p>
      </div>
      <div className="md:w-1/2">
        <img
          src="/cyabra-images/soc2-type-2-compliance-badge.webp"
          alt="Cyabra Award"
          className="rounded-lg shadow-lg w-full h-auto max-w-xs mx-auto"
          onError={(event) => {
            const target = event.currentTarget;
            target.src = '/cyabra-logo.svg';
            target.classList.add('p-10', 'bg-gray-100');
          }}
        />
      </div>
    </div>
  </div>
);

const CyabraBrandIntro: React.FC<CyabraBrandIntroProps> = ({ isEnglish }) => {
  const features: Feature[] = [
    {
      icon: <Shield className="h-8 w-8 text-[#003daa]" />,
      title: isEnglish ? 'Brand Protection' : '品牌保護',
      description: isEnglish
        ? 'Protect your brand from fake profiles and disinformation campaigns that can damage your reputation and user trust.'
        : '保護您的品牌免受可能損害聲譽與用戶信任的假帳號和假資訊活動影響。'
    },
    {
      icon: <AlertCircle className="h-8 w-8 text-[#003daa]" />,
      title: isEnglish ? 'Real-time Alerts' : '即時警報',
      description: isEnglish
        ? 'Receive proactive notifications about potential threats to your brand reputation with 24/7 monitoring.'
        : '透過24/7監控，主動接收可能影響品牌聲譽的威脅通知。'
    },
    {
      icon: <Search className="h-8 w-8 text-[#003daa]" />,
      title: isEnglish ? 'Fake Profile Detection' : '假帳號偵測',
      description: isEnglish
        ? 'AI-powered analysis identifies fake accounts and suspicious behavior across social media platforms.'
        : 'AI分析偵測社群平台上的假帳號與可疑行為。'
    },
    {
      icon: <Globe className="h-8 w-8 text-[#003daa]" />,
      title: isEnglish ? 'Trend Analysis' : '趨勢分析',
      description: isEnglish
        ? 'Understand authentic vs. artificial online trends to make better marketing and PR decisions.'
        : '掌握真實與人造的網路趨勢，做出更佳的行銷與公關決策。'
    }
  ];

  const stats: StatItem[] = [
    {
      value: '#1',
      labelEn: 'Disinformation - Major Global Risk',
      labelZh: '假資訊 - 主要全球風險'
    },
    {
      value: '$500B',
      labelEn: 'Spent on Disinformation by 2028',
      labelZh: '到2028年用於假資訊的支出'
    },
    {
      value: '24/7',
      labelEn: 'Real-time Threat Monitoring',
      labelZh: '即時威脅監控'
    },
    {
      value: '89%',
      labelEn: 'Accuracy in Detecting Fake Profiles',
      labelZh: '假帳號檢測準確率'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Jonny Bentwood',
      roleEn: 'Global President of Data & Analytics, Golin',
      roleZh: '全球數據與分析總裁，Golin',
      companyEn: 'Leading global PR and communications firm',
      companyZh: '全球領先的公關與傳播公司',
      quoteEn:
        "To protect the reputation of a brand, making sure that we understand what is fake and what is real is critical. Now that we've got Cyabra as part of our data stack, we've got new ways to protect our clients from misinformation.",
      quoteZh:
        '為了保護品牌聲譽，確保我們了解什麼是假的和什麼是真的至關重要。現在我們將Cyabra作為數據堆疊的一部分，我們有了新的方式來保護客戶免受假資訊影響。',
      avatar: '/cyabra-images/testimonials/jonny-bentwood.webp'
    },
    {
      name: 'Todd Grossman',
      roleEn: 'Former Talkwalker CEO of Americas',
      roleZh: '前Talkwalker美洲區CEO',
      companyEn: 'Leading social listening and analytics platform',
      companyZh: '領先的社交媒體監聽與分析平台',
      quoteEn:
        "Whereas social media listening tools address mentions and sentiment, Cyabra goes deeper, analyzing the profiles involved in the discourse, exposing bots, and uncovering fake campaigns. Cyabra's technology helps companies detect attacks against their brand, respond in real-time, and defend themselves online.",
      quoteZh:
        '雖然社交媒體監聽工具可以處理提及和情緒，但Cyabra更深入，分析參與討論的個人檔案，揭露機器人和假活動。Cyabra的技術協助公司檢測品牌攻擊，實時回應並自我防護。',
      avatar: '/cyabra-images/testimonials/todd-grossman.webp'
    },
    {
      name: "Vincent O'Brien",
      roleEn: 'Foreign Service Officer, US State Department',
      roleZh: '美國國務院外交官',
      companyEn: 'Specialist in diplomatic communication and global affairs',
      companyZh: '外交通訊與全球事務專家',
      quoteEn:
        'Large audiences provide a large opportunity for nefarious actors to use it as a hook to either push new types of disinformation narratives or to connect long-standing disinformation narratives to exploit this new opportunity. Cyabra has really done a good job at identifying the information and just presenting it to you in a way that you can best make a decision.',
      quoteZh:
        '大型受眾為不良行為者提供了機會，讓他們推廣新型假資訊敘事或結合既有敘事。Cyabra在識別資訊並以最適合決策的方式呈現方面表現出色。',
      avatar: '/cyabra-images/testimonials/vincent-obrien.webp'
    },
    {
      name: 'Drew Himmelreich',
      roleEn: 'Manager of Social Insights & Technology, Warner Media',
      roleZh: '華納媒體社交洞察與技術經理',
      companyEn: 'Global entertainment and media conglomerate',
      companyZh: '全球娛樂與媒體集團',
      quoteEn:
        'Around the launch of Wonder Woman 1984 (WW84) we wanted to map out enthusiastic conversations and voices. Cyabra helped us analyze the social discourse around the movie and DC Comics fandom online. Once we were able to identify the most passionate influencers and communities, our theatrical marketing team was better equipped to magnify our social presence.',
      quoteZh:
        '在《神力女超人1984》(WW84)推出期間，我們希望追蹤熱情對話與聲音。Cyabra協助分析電影與DC粉絲的線上社交對話，使我們能辨識關鍵影響者與社群，強化行銷聲量。',
      avatar: '/cyabra-images/testimonials/drew-himmelreich.webp'
    }
  ];

  return (
    <Section
      id="cyabra-brand"
      background="transparent"
      padding="xl"
      className="bg-gradient-to-r from-white to-gray-100 dark:from-[#001e54] dark:to-[#003daa] text-gray-800 dark:text-white"
    >
      <div className="text-center mb-16">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <a
              href="https://www.cyabra.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity shadow-xl"
            >
              <img
                src="/cyabra-logo.svg"
                alt="Cyabra"
                className="w-32 h-32 object-contain bg-white rounded-xl p-4 border border-gray-200"
              />
            </a>
          </div>
        </div>
        <h2 className="text-base font-semibold tracking-wide text-blue-600 dark:text-blue-300 uppercase mb-4">
          {isEnglish ? 'Authorized Distributor' : '授權經銷商'}
        </h2>
        <h3 className="text-4xl font-bold text-gray-800 dark:text-white sm:text-5xl mb-6">
          <a
            href="https://www.cyabra.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          >
            Cyabra
          </a>
        </h3>
        <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto mb-8">
          {isEnglish
            ? 'EudTech is the authorized distributor of Cyabra, the leader in disinformation detection and brand protection solutions. Cyabra uses AI to uncover fake profiles, harmful narratives, and deepfakes that threaten corporate and public sector communications.'
            : 'EudTech是Cyabra的授權經銷商，Cyabra是虛假資訊檢測與品牌保護解決方案的領導者。Cyabra運用AI揭露假帳號、有害敘事與深度偽造，守護企業與公部門的溝通。'}
        </p>
      </div>

      <CyabraVerificationCard isEnglish={isEnglish} />

      <div className="mb-20">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="/cyabra-images/cyabra-activity-graph-min-300x225.png"
            alt="Cyabra Dashboard"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="text-white p-12 max-w-xl">
              <h4 className="text-3xl font-bold mb-4">
                {isEnglish ? 'Uncovering The Good, Bad, and Fake Online' : '揭露網路上的真相、風險與假訊息'}
              </h4>
              <p className="text-lg font-medium">
                {isEnglish
                  ? 'Advanced AI tools that detect disinformation campaigns, fake profiles, and protect brand reputation.'
                  : '先進AI工具偵測假資訊活動與假帳號，保護品牌聲譽。'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <FeatureGrid features={features} />
      <StatsSection stats={stats} isEnglish={isEnglish} />

      <div className="mb-16">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-base font-semibold tracking-wide text-blue-600 dark:text-blue-300 uppercase">
            {isEnglish ? 'TESTIMONIALS' : '客戶見證'}
          </h2>
          <h3 className="text-3xl font-bold mt-2 text-center text-gray-800 dark:text-white">
            {isEnglish ? 'What Industry Leaders Say About Cyabra' : '行業領導者對Cyabra的評價'}
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-teal-500 mt-4 rounded-full" />
          <p className="max-w-3xl text-center mt-6 text-gray-600 dark:text-gray-300 text-lg">
            {isEnglish
              ? 'Cyabra is trusted by leading organizations across government, PR, entertainment, and cybersecurity sectors to provide actionable insights and protection against disinformation.'
              : 'Cyabra受到政府、公關、娛樂與資安等領域領先組織信任，提供可行洞察並抵禦假資訊威脅。'}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {testimonials.slice(0, 2).map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} isEnglish={isEnglish} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.slice(2).map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} isEnglish={isEnglish} />
          ))}
        </div>
      </div>

      <FrostRecognition isEnglish={isEnglish} />

      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {isEnglish
            ? 'Explore how Cyabra protects brands, campaigns, and public institutions against coordinated disinformation.'
            : '探索Cyabra如何保護品牌、活動與公部門免受協調式假資訊影響。'}
        </p>
        <div className="flex flex-col items-center">
          <button
            type="button"
            disabled
            title={isEnglish ? 'Coming soon' : '即將推出'}
            className="inline-flex items-center px-6 py-3 border border-gray-200 text-base font-medium rounded-md shadow-sm text-gray-400 bg-gray-100 dark:bg-gray-700 dark:text-gray-500 dark:border-gray-600 cursor-not-allowed transition duration-200"
          >
            {isEnglish ? 'Explore Cyabra Solutions' : '探索Cyabra解決方案'}
          </button>
        </div>
      </div>
    </Section>
  );
};

export default CyabraBrandIntro;
