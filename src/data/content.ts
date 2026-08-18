import { HeroContent } from '../types';

export const getHeroContent = (isEnglish: boolean): HeroContent => {
  return {
    title: {
      main: isEnglish ? 'Build the right AI system' : '把 AI 需求變成可執行方案',
      highlight: isEnglish ? 'from workload to measurable delivery' : '從工作負載到可驗證交付'
    },
    subtitle: isEnglish 
      ? 'EudTech connects AI agents, liquid-cooled infrastructure, and social intelligence to the systems and decisions your team already owns.'
      : 'EudTech 將 AI Agent、液冷運算基礎設施與社群情報，連接到團隊既有的系統與決策流程。',
    buttons: {
      primary: isEnglish ? 'Explore solutions' : '查看解決方案',
      secondary: isEnglish ? 'Start a conversation' : '開始諮詢'
    }
  };
};
