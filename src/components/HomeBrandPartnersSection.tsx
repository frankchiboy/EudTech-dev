import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeBrandPartnersSection: React.FC<{ isEnglish: boolean }> = ({ isEnglish }) => {
  const steps = isEnglish ? [
    ['Define your requirements', 'Clarify workloads, existing systems, budget and site constraints.'],
    ['Agree on the next step', 'Set the scope for advisory, evaluation, procurement or deployment.'],
    ['Deliver and support', 'Confirm deliverables, acceptance criteria and support within the agreed scope.']
  ] : [
    ['釐清需求與範圍', '一起確認工作負載、既有系統、預算與場地條件。'],
    ['確認方案與下一步', '依需求安排顧問諮詢、產品評估、採購或導入規劃。'],
    ['交付與後續支援', '依約定範圍，確認交付項目、驗收條件與支援方式。']
  ];
  return (
    <section className="home-partners" aria-labelledby="home-partners-heading">
      <div className="home-container">
        <div className="home-partner-layout">
          <div><p className="home-eyebrow">{isEnglish ? 'Specialist technology. Local collaboration.' : '專業技術，在地協作'}</p><h2 id="home-partners-heading">{isEnglish ? 'Connected to the people behind the technology.' : '連結原廠，也連結你的需求。'}</h2><p className="home-muted">{isEnglish ? 'Work with EudTech to connect product information, technical discussions and procurement planning.' : '由 EudTech 協助串接產品資訊、技術討論與採購規劃。'}</p></div>
          <div className="home-partner-links">
            <a href="https://www.comino.com/en/company" target="_blank" rel="noreferrer"><span className="home-partner-logo home-comino-logo"><img src="/comino-grando-logo.png" width="210" height="60" alt="Comino GRANDO" loading="lazy" decoding="async" /></span><span>{isEnglish ? 'Listed Comino partner' : 'Comino 原廠合作名單'}<ArrowUpRight size={17} aria-hidden="true" /></span></a>
            <a href="https://cyabra.com/become-a-partner/" target="_blank" rel="noreferrer"><span className="home-partner-logo"><img src="/cyabra-logo.svg" width="170" height="60" alt="Cyabra" loading="lazy" decoding="async" /></span><span>{isEnglish ? 'Listed Cyabra partner' : 'Cyabra 原廠合作名單'}<ArrowUpRight size={17} aria-hidden="true" /></span></a>
          </div>
        </div>
        <div className="home-delivery" aria-labelledby="home-delivery-heading">
          <div className="home-delivery-intro"><h2 id="home-delivery-heading">{isEnglish ? 'A clear path from the first conversation.' : '從第一次討論，就知道怎麼往下走。'}</h2><Link to="/resources" className="home-secondary-link">{isEnglish ? 'Explore planning resources' : '先看採購與規劃指南'}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          <ol>{steps.map(([title, body], index) => <li key={title}><span className="home-step-number">0{index + 1}</span><img className="home-step-visual" src={`/ai-agent/micro-illustrations/${['event-intake', 'human-approval', 'connected-systems'][index]}-v1.webp`} width="56" height="56" alt="" loading="lazy" decoding="async" /><h3>{title}</h3><p>{body}</p></li>)}</ol>
        </div>
      </div>
    </section>
  );
};
export default HomeBrandPartnersSection;
