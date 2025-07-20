import React from 'react';
import { Mail, MapPin, Clock, Briefcase, CheckCircle } from 'lucide-react';
import { useLanguageContext } from '../contexts/LanguageContext';
import { useThemeContext } from '../contexts/ThemeContext';
import NavBar from './navigation/NavBar';
import Footer from './Footer';
import Section from './layout/Section';
import Card from './ui/Card';
import Button from './ui/Button';
import SEOHead from './common/SEOHead';

const CareersPage: React.FC = () => {
  const { isEnglish, toggleLanguage } = useLanguageContext();
  const { themeMode, isDarkModeActive, toggleDarkMode } = useThemeContext();

  const jobData = [
    {
      id: 1,
      title: {
        zh: '政府標案商務經理',
        en: 'Public Sector Business Manager'
      },
      responsibilities: {
        zh: [
          '對政府機關與學校進行簡報、提案與標案推廣',
          '撰寫標案文件、管理投標流程與競爭策略',
          '負責中標後履約進度、業主聯繫與協調',
          '與銀行窗口洽談履約貸款與保證金安排',
          '準備並提交貸款相關文件（契約、財報、用途說明等）',
          '追蹤貸款核撥、撥款與履約金流狀況'
        ],
        en: [
          'Present proposals and promote tenders to government agencies and schools',
          'Draft tender documents, manage bidding processes and competitive strategies',
          'Handle post-award contract execution progress, client communication and coordination',
          'Negotiate performance loans and guarantee arrangements with bank representatives',
          'Prepare and submit loan-related documents (contracts, financial reports, purpose statements, etc.)',
          'Track loan approval, disbursement and contract cash flow status'
        ]
      },
      requirements: {
        zh: [
          '熟悉政府採購流程，具標案經驗',
          '有銀行貸款或授信協調經驗者佳',
          '具備提案簡報、商務談判與自主執行能力'
        ],
        en: [
          'Familiar with government procurement processes with tender experience',
          'Experience in bank loan or credit coordination preferred',
          'Strong proposal presentation, business negotiation and independent execution capabilities'
        ]
      },
      location: {
        zh: '台灣（全遠端工作）',
        en: 'Taiwan (Fully Remote)'
      },
      workTime: {
        zh: '日班／一般工時（Regular time）',
        en: 'Day Shift / Regular Hours'
      }
    },
    {
      id: 2,
      title: {
        zh: '銀行授信協調經理',
        en: 'Banking Relationship Manager'
      },
      responsibilities: {
        zh: [
          '與銀行建立合作關係，處理履約貸款、授信與保證金事務',
          '準備貸款申請所需文件（契約、財報、資金用途說明）',
          '與授信窗口溝通利率、還款條件、擔保安排等議題',
          '定期追蹤貸款進度，確保撥款與標案履約時程對齊',
          '探索多元融資管道，強化公司財務靈活性'
        ],
        en: [
          'Establish banking partnerships and handle performance loans, credit facilities and guarantee arrangements',
          'Prepare loan application documents (contracts, financial reports, fund usage statements)',
          'Communicate with credit officers on interest rates, repayment terms, and collateral arrangements',
          'Regularly track loan progress to ensure disbursement aligns with contract execution timeline',
          'Explore diverse financing channels to enhance company financial flexibility'
        ]
      },
      requirements: {
        zh: [
          '具銀行授信、融資申請、貸款協調實務經驗',
          '熟悉金融文件準備與貸款流程',
          '具良好溝通與談判能力，能獨立完成對外協商任務'
        ],
        en: [
          'Practical experience in bank credit, financing applications, and loan coordination',
          'Familiar with financial document preparation and loan processes',
          'Strong communication and negotiation skills, capable of independent external negotiations'
        ]
      },
      location: {
        zh: '台灣（遠端工作）',
        en: 'Taiwan (Remote Work)'
      },
      workTime: {
        zh: '日班／一般工時',
        en: 'Day Shift / Regular Hours'
      }
    },
    {
      id: 3,
      title: {
        zh: '組織溝通經理',
        en: 'Organizational Communication Manager'
      },
      responsibilities: {
        zh: [
          '作為創辦人與全體員工之間的主要溝通橋梁',
          '傳達公司決策、價值觀與目標，確保上下訊息一致',
          '彙整並回報員工意見、部門需求與潛在問題',
          '協助解決跨部門誤解、推進團隊共識與協作效率',
          '撰寫內部公告、會議摘要、組織溝通材料',
          '支援公司制度變動、文化活動與政策說明'
        ],
        en: [
          'Serve as the primary communication channel between the founder and all staff',
          'Convey company decisions, values, and goals to ensure consistent understanding',
          'Gather and relay employee feedback, team needs, and organizational concerns',
          'Mediate internal miscommunications and drive alignment across teams',
          'Draft internal announcements, meeting summaries, and communication materials',
          'Support internal change communications, cultural initiatives, and policy rollouts'
        ]
      },
      requirements: {
        zh: [
          '擅長跨部門溝通與協調，能快速理解並整合多方觀點',
          '具備清晰邏輯與文字表達能力，可獨立撰寫簡報與溝通稿件',
          '熟悉常用內部溝通工具（如Slack、Notion、Google Workspace）',
          '有高層幕僚、營運協調或溝通相關經驗尤佳'
        ],
        en: [
          'Strong cross-functional communication and coordination skills',
          'Excellent verbal and written clarity; able to draft presentations and communication content',
          'Familiar with internal tools such as Slack, Notion, and Google Workspace',
          'Experience in executive support, operations, or organizational communication is a plus'
        ]
      },
      location: {
        zh: '台灣（全遠端工作）',
        en: 'Taiwan (Fully Remote)'
      },
      workTime: {
        zh: '日班／一般工時（Regular time）',
        en: 'Day Shift / Regular Hours'
      }
    }
  ];

  const handleApply = (jobTitle: string) => {
    const subject = encodeURIComponent(`應徵${jobTitle}職位`);
    const body = encodeURIComponent('請在此附上您的履歷與期待薪資');
    window.location.href = `mailto:frank.hsu@eudaemonia.tech?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <SEOHead
        title={isEnglish ? 'Careers - Join Our Team' : '職業機會 - 加入我們的團隊'}
        description={isEnglish 
          ? 'Join EudTech and be part of the future of AI technology. We are looking for passionate individuals to help us build innovative solutions.'
          : '加入EudTech，成為AI技術未來的一部分。我們正在尋找充滿熱忱的人才，協助我們打造創新解決方案。'
        }
        isEnglish={isEnglish}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <NavBar 
          isEnglish={isEnglish}
          toggleLanguage={toggleLanguage}
          themeMode={themeMode}
          isDarkMode={isDarkModeActive}
          toggleDarkMode={toggleDarkMode}
        />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative h-96 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                alt="Team collaboration"
                className="w-full h-full object-cover transform scale-105"
              />
              <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
            </div>
            <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {isEnglish ? 'Join Our Team' : '加入我們的團隊'}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                {isEnglish 
                  ? 'Be part of the future of AI technology. We\'re looking for passionate individuals to help us build innovative solutions.'
                  : '成為AI技術未來的一部分。我們正在尋找充滿熱忱的人才，協助我們打造創新解決方案。'
                }
              </p>
            </div>
          </section>

          {/* Job Openings */}
          <Section background="white" padding="xl">
            <div className="max-w-4xl mx-auto space-y-12">
              {jobData.map((job) => (
                <Card key={job.id} variant="elevated" padding="lg" className="border border-gray-200 dark:border-gray-700">
                  {/* Job Title */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {isEnglish ? 'Position' : '職缺'}
                      </h2>
                    </div>
                    <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-300">
                      {isEnglish ? job.title.en : job.title.zh}
                    </h3>
                  </div>

                  {/* Internal Application Notice */}
                  <div className="mb-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                    <p className="text-blue-800 dark:text-blue-300 font-medium text-center">
                      {isEnglish 
                        ? 'Internal applications welcome. This position can also be taken as a concurrent role with additional compensation.'
                        : '本職缺歡迎內部同仁申請，亦可採加給方式兼任。'
                      }
                    </p>
                  </div>

                  {/* Job Responsibilities */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                      {isEnglish ? 'Job Responsibilities' : '工作內容'}
                    </h3>
                    <ul className="space-y-3">
                      {(isEnglish ? job.responsibilities.en : job.responsibilities.zh).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-2 w-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CheckCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 mr-2" />
                      {isEnglish ? 'Requirements' : '條件需求'}
                    </h3>
                    <ul className="space-y-3">
                      {(isEnglish ? job.requirements.en : job.requirements.zh).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-2 w-2 bg-orange-600 dark:bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Location and Work Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                        {isEnglish ? 'Location' : '工作地點'}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {isEnglish ? job.location.en : job.location.zh}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Clock className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" />
                        {isEnglish ? 'Working Hours' : '工作時間'}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {isEnglish ? job.workTime.en : job.workTime.zh}
                      </p>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      onClick={() => handleApply(isEnglish ? job.title.en : job.title.zh)}
                      variant="primary"
                      size="lg"
                      className="inline-flex items-center"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      {isEnglish ? 'Apply Now' : '立即應徵'}
                    </Button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                      {isEnglish 
                        ? 'Send Resume & Expected Salary'
                        : '提供履歷與期待薪資'
                      }
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* Company Culture Section */}
          <Section background="gradient" padding="xl">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {isEnglish ? 'Why Join EudTech?' : '為什麼選擇 EudTech？'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {isEnglish ? 'Innovation Focus' : '創新導向'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {isEnglish 
                      ? 'Work on cutting-edge AI technologies that shape the future'
                      : '參與塑造未來的尖端AI技術工作'
                    }
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {isEnglish ? 'Remote Flexibility' : '遠端彈性'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {isEnglish 
                      ? 'Enjoy the freedom of fully remote work across Taiwan'
                      : '享受台灣全境完全遠端工作的自由'
                    }
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {isEnglish ? 'Growth Opportunity' : '成長機會'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {isEnglish 
                      ? 'Develop your career in the rapidly expanding AI industry'
                      : '在快速發展的AI產業中發展您的職業生涯'
                    }
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </main>

        <Footer isEnglish={isEnglish} />
      </div>
    </>
  );
};

export default CareersPage;