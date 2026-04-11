import React from 'react';
import ProgressiveImage from './media/ProgressiveImage';
import Section from './layout/Section';
import { useI18n } from '../i18n/I18nProvider';
import { Testimonial } from '../data/models/Content';

interface CyabraTestimonialsProps {
  isEnglish: boolean;
}

const CyabraTestimonials: React.FC<CyabraTestimonialsProps> = ({ isEnglish }) => {
  const { t } = useI18n();
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Jonny Bentwood',
      role: isEnglish ? 'Global President of Data & Analytics' : '全球數據和分析總裁',
      company: 'Golin',
      content: isEnglish 
        ? 'To protect the reputation of a brand, making sure that we understand what is fake and what is real is critical. Now that we\'ve got Cyabra as part of our data stack, we\'ve got new ways to protect our clients from misinformation.'
        : '為了保護品牌聲譽，確保我們了解什麼是假的和什麼是真的至關重要。現在我們將Cyabra作為我們數據堆疊的一部分，我們有了新的方式來保護我們的客戶免受誤導信息的影響。',
      avatar: '/cyabra-images/testimonials/jonny-bentwood.webp'
    },
    {
      id: 2,
      name: 'Todd Grossman',
      role: isEnglish ? 'Former Talkwalker CEO of Americas' : '前Talkwalker美洲區CEO',
      company: 'Talkwalker',
      content: isEnglish 
        ? 'While social media listening tools can handle mentions and sentiment, Cyabra goes deeper, analyzing the profiles of the people participating in the conversation to expose bots and fake campaigns. Cyabra\'s technology helps companies detect attacks on brands, respond in real time, and defend online.'
        : '雖然社交媒體監聽工具可以處理提及和情緒，但Cyabra更深入，分析參與討論的個人檔案，揭露機器人和假活動。Cyabra的技術幫助公司檢測針對品牌的攻擊，實時回應，並在線上進行防護。',
      avatar: '/cyabra-images/testimonials/todd-grossman.webp'
    },
    {
      id: 3,
      name: 'Vincent O\'Brien',
      role: isEnglish ? 'US State Department Diplomat' : '美國國務院外交官',
      company: isEnglish ? 'US State Department' : '美國國務院',
      content: isEnglish 
        ? 'Large audiences provide an opportunity for bad actors to piggyback on emerging disinformation narratives or tie long-standing disinformation narratives to new opportunities. Cyabra does a very good job of identifying information and presenting it in the way that is best suited for you to make decisions.'
        : '大型受眾為不良行為者提供了機會，讓他們可以藉此推廣新型的假資訊敘事，或將長期存在的假資訊敘事與新機會連結起來。Cyabra在識別信息並以最適合您做決策的方式呈現方面做得非常好。',
      avatar: '/cyabra-images/testimonials/vincent-obrien.webp'
    },
    {
      id: 4,
      name: 'Drew Himmelreich',
      role: isEnglish ? 'Manager, Social Insights & Technology' : '華納媒體社交洞察與技術經理',
      company: isEnglish ? 'Warner Media' : '華納媒體',
      content: isEnglish 
        ? 'During the Wonder Woman 1984 (WW84) launch, we wanted to track passionate conversation and voices. Cyabra helped us analyze the social conversation around the film and DC Comics fandoms online. Once we were able to identify the most passionate influencers and communities, our theatrical marketing team was able to better amplify our social reach.'
        : '在《神力女超人1984》(WW84)推出期間，我們想要追蹤熱情的對話和聲音。Cyabra幫助我們分析了關於電影和DC漫畫粉絲在線上的社交對話。一旦我們能夠識別出最熱情的影響者和社群，我們的影院行銷團隊就能夠更好地擴大我們的社交媒體影響力。',
      avatar: '/cyabra-images/testimonials/drew-himmelreich.webp'
    }
  ];

  return (
    <Section id="cyabra-testimonials" background="white">
      <div className="text-center mb-16">
        <h2 className="text-base font-semibold tracking-wide text-blue-600 dark:text-blue-300 uppercase mb-4">
          {t('cyabra.testimonials.heading')}
        </h2>
        <h3 className="text-4xl font-bold text-gray-800 dark:text-white sm:text-5xl mb-6">
          {t('cyabra.testimonials.subheading')}
        </h3>
        <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-12">
          {t('cyabra.testimonials.lead')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-6">
              <ProgressiveImage 
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 mr-4 flex-shrink-0"
                imgClassName="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  {testimonial.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {testimonial.company}
                </p>
              </div>
            </div>
            <blockquote className="text-gray-700 dark:text-gray-200 italic text-lg leading-relaxed">
              "{testimonial.content}"
            </blockquote>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {isEnglish 
            ? 'Explore the complete range of Cyabra products and solutions offered by EudTech'
            : '探索EudTech提供的完整Cyabra產品和解決方案'
          }
        </p>
        <a
          href="#contact"
          className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#003daa] hover:bg-[#002a75] transition duration-200"
        >
          {t('cyabra.testimonials.cta')}
        </a>
      </div>
    </Section>
  );
};

export default CyabraTestimonials;