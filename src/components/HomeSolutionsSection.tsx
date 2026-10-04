import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import homepageContent from '../data/homepageContent.json';
import './HomePageSections.css';

const HomeSolutionsSection: React.FC<{ isEnglish: boolean }> = ({ isEnglish }) => {
  const content = homepageContent[isEnglish ? 'en' : 'zh'];
  return (
    <section className="home-overview" aria-labelledby="home-solutions-heading">
      <div className="home-container">
        <header className="home-section-intro">
          <p className="home-eyebrow">{isEnglish ? 'Four areas of expertise' : '四大解決方案'}</p>
          <h2 id="home-solutions-heading">{isEnglish ? 'Find your next technology starting point.' : '找到你的下一個技術起點。'}</h2>
          <p>{isEnglish ? 'From cryptographic migration and cloud procurement to GPU computing and social intelligence. Choose your goal and take the next step.' : '從密碼遷移、雲端採購到 GPU 運算與社群情報，選擇你的目標，展開下一步。'}</p>
        </header>
        <div className="home-solution-grid">
          {content.services.map((item) => (
            <article key={item.id} className={`home-solution-card home-solution-${item.id}`}>
              <div className="home-service-media">
                {item.id === 'pqc' ? (
                  <div className="home-experts">
                    {[['chung-hao-frank-hsu', 'Chung-hao (Frank) Hsu'], ['hung-jr-shiu', 'Hung-Jr Shiu']].map(([slug, name]) => (
                      <figure key={slug}><img src={`/vendor/pqc/home-${slug}.webp`} width="240" height="240" alt={name} loading="lazy" decoding="async" /><figcaption>{name}</figcaption></figure>
                    ))}
                  </div>
                ) : item.id === 'aws' ? (
                  <div className="home-aws-visual" aria-label={isEnglish ? 'AWS: EC2 compute, S3 storage, RDS databases and Bedrock generative AI' : 'AWS：EC2 運算、S3 儲存、RDS 資料庫與 Bedrock 生成式 AI'}>
                    <span className="home-aws-wordmark">AWS<span aria-hidden="true" /></span>
                    <div>{['EC2', 'S3', 'RDS', 'Bedrock'].map((name) => <span key={name}>{name}</span>)}</div>
                  </div>
                ) : (
                  <figure className="home-product-visual">
                    <img src={item.id === 'comino' ? '/vendor/comino/test-drive/r9700-rack.webp' : '/vendor/cyabra/2026/coordination.webp'} width={item.id === 'comino' ? 640 : 1200} height={item.id === 'comino' ? 450 : 800} alt={item.id === 'comino' ? (isEnglish ? 'Comino liquid-cooled multi-GPU rack system' : 'Comino 液冷多 GPU 機架系統') : (isEnglish ? 'Cyabra coordinated-activity analysis, manufacturer illustration' : 'Cyabra 協同行動分析原廠功能示意')} loading="lazy" decoding="async" />
                    <figcaption>{item.id === 'comino' ? 'COMINO GRANDO' : (isEnglish ? 'CYABRA · Manufacturer illustration' : 'CYABRA · 原廠功能示意')}</figcaption>
                  </figure>
                )}
              </div>
              <div className="home-service-content">
                <p className="home-service-category">{item.category}</p><h3>{isEnglish ? item.title : item.title.split('，').map((phrase, index, phrases) => <span className="home-title-phrase" key={phrase}>{phrase}{index < phrases.length - 1 ? '，' : ''}</span>)}</h3>
                <p className="home-service-description">{item.body}</p><p className="home-service-capabilities">{item.capabilities}</p>
                <div className="home-service-actions">
                  <Link to={item.href} className="home-primary-link">{item.primary}<ArrowRight size={18} aria-hidden="true" /></Link>
                  <Link to={`${item.href}${item.anchor}`} className="home-secondary-link">{item.secondary}<ArrowUpRight size={17} aria-hidden="true" /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="home-next-step" aria-labelledby="home-next-step-heading">
          <div><p className="home-eyebrow">{isEnglish ? 'Take the next step' : '把想法帶到下一步'}</p><h2 id="home-next-step-heading">{isEnglish ? 'Ready to plan your project?' : '準備規劃下一步？'}</h2><p>{isEnglish ? 'Configure a GPU system, or talk through the requirements for your project.' : '先配置一台 GPU 系統，或與我們討論你的專案需求。'}</p></div>
          <div className="home-next-actions"><Link to="/configurator?request=true" className="home-cta-primary">{isEnglish ? 'Configure & request a quote' : '配置 GPU 與詢價'}<ArrowRight size={18} aria-hidden="true" /></Link><Link to="/contact" className="home-cta-secondary">{isEnglish ? 'Discuss your project' : '討論專案需求'}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        </aside>
      </div>
    </section>
  );
};
export default HomeSolutionsSection;
