import { HeroContent } from '../types';

export const getHeroContent = (isEnglish: boolean): HeroContent => {
  return {
    title: {
      main: isEnglish ? 'Build the right AI system' : '把 AI 需求變成可執行方案',
      highlight: isEnglish ? 'from workload to measurable delivery' : '從工作負載到可驗證交付'
    },
    subtitle: isEnglish 
      ? 'EudTech brings AWS cloud services, liquid-cooled infrastructure, and social intelligence to your next project.'
      : 'EudTech 整合 AWS 雲端服務、液冷運算基礎設施與社群情報，從需求規劃到採購導入，協助團隊走出下一步。',
    buttons: {
      primary: isEnglish ? 'Explore solutions' : '查看解決方案',
      secondary: isEnglish ? 'Start a conversation' : '開始諮詢'
    }
  };
};
