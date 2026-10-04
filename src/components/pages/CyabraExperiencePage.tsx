import React, { useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, BellRing, BookOpen, Check, ChevronDown, FileText, Fingerprint, Globe2, Layers, Network, Play, ScanFace, Search, ShieldCheck } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { cyabraCapabilities, cyabraLearning, cyabraScenarios, bilingual as b } from '../../data/cyabraExperience';
import { ActionLink, PageShell, tx, type Bilingual } from './SitePagePrimitives';
import './CyabraExperiencePage.css';
import { CyabraNewFeatures, CyabraOfficialGallery, CyabraPublicGuides } from './CyabraNewFeatures';

const icons = [Network, Fingerprint, Layers, BellRing, Search, ScanFace, ShieldCheck, FileText];
const sourceLabel = b('閱讀原廠說明', 'Read the vendor overview');
const portal = 'https://partners.cyabra.com/px/digital-asset-management';
const assetSearch = (query: string) => `${portal}/admin/media-library?renderMode=Collection&q=${encodeURIComponent(query)}`;

const External: React.FC<{ href: string; children: React.ReactNode; className?: string }> = ({ href, children, className = '' }) => <a className={`cy-link ${className}`} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;

const CyabraExperiencePage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const t = (value: Bilingual) => tx(value, isEnglish);
  const [active, setActive] = useState(0);
  const [scenario, setScenario] = useState(0);
  const featureTabs = useRef<Array<HTMLButtonElement | null>>([]);
  const scenarioTabs = useRef<Array<HTMLButtonElement | null>>([]);
  const feature = cyabraCapabilities[active];
  const useCase = cyabraScenarios[scenario];
  const navigateTabs = (event: React.KeyboardEvent, index: number, length: number, update: (value: number) => void, refs: React.MutableRefObject<Array<HTMLButtonElement | null>>) => {
    const next = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? (index + 1) % length : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? (index - 1 + length) % length : event.key === 'Home' ? 0 : event.key === 'End' ? length - 1 : null;
    if (next !== null) { event.preventDefault(); update(next); refs.current[next]?.focus(); }
  };
  const faqs = [
    {q:b('與一般社群聆聽工具有什麼不同？','How does Cyabra complement social listening?'),a:b('一般社群聆聽協助掌握提及量與情緒。Cyabra 進一步分析參與帳號、行為與協同關係，讓團隊理解聲量的真實性，以及背後是否存在有組織的操作。','Social listening measures mentions and sentiment. Cyabra adds profile authenticity, behavior, and coordination analysis to explain who is driving that activity.')},
    {q:b('分析的是哪些資料？','What data does it analyze?'),a:b('依原廠資料方法教材，分析以公開的社群與新聞資料為基礎，並依來源、議題與掃描設定採集及抽樣。不是私訊讀取服務，也不代表涵蓋每一則網路內容。','The vendor methodology describes collection and sampling of publicly available social and news data according to the source, topic, and scan settings. It does not imply access to private messages or exhaustive coverage.')},
    {q:b('可以分析中文與跨國議題嗎？','Can it investigate multilingual topics?'),a:b('原廠提供多語言敘事與情緒分析；技術教材也列有中文。實際平台、語言、歷史期間及資料量，會依需求與授權範圍確認。','Cyabra provides multilingual narrative and sentiment analysis, and its technical materials include Chinese. Platform, language, history, and volume requirements are confirmed for each scope and license.')},
    {q:b('AI 判斷可以直接當作事實嗎？','Should an AI finding be treated as a confirmed fact?'),a:b('應連同判斷理由、原始來源與情境一起檢視。團隊可使用系統整理的證據安排調查與回應；帳號分類、位置線索與媒體判讀仍需要人員確認。','Review findings alongside their reasons, sources, and context. Profile classifications, location indicators, and media assessments support investigation and require human review.')},
    {q:b('發現冒名或違規內容，會自動下架嗎？','Does detection automatically remove content?'),a:b('Cyabra 可整理證據、對照平台政策並支援減害工作。內容是否下架由各社群平台依政策審查決定。','Cyabra supports evidence preparation, policy mapping, and mitigation workflows. Removal decisions remain with each social platform.')},
    {q:b('EudTech 如何協助開始？','How does EudTech help a team get started?'),a:b('先從一個品牌、人物或公共議題開始，確認監測問題、平台與語言、分析期間、交付格式及決策負責人，再安排原廠展示、授權評估與操作培訓。','Start with a brand, person, or public issue. Define the question, sources, languages, time range, deliverables, and decision owner, then plan a demo, licensing assessment, and training.')}
  ];

  const structuredData = [
    { '@context': 'https://schema.org', '@type': 'Service', name: t(b('Cyabra 敘事情報與威脅分析', 'Cyabra narrative intelligence and threat analysis')), serviceType: t(b('帳號真實性、協同行動、敘事預警與證據報告', 'Profile authenticity, coordinated activity, narrative alerts, and evidence reporting')), provider: { '@id': 'https://eudaemonia.tech/#organization' }, areaServed: { '@type': 'Country', name: 'Taiwan' }, url: 'https://eudaemonia.tech/solutions/social-intelligence/' },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(item => ({ '@type': 'Question', name: t(item.q), acceptedAnswer: { '@type': 'Answer', text: t(item.a) } })) }
  ];

  return <PageShell title={b('Cyabra 敘事情報與威脅分析', 'Cyabra Narrative Intelligence & Threat Analysis')} description={b('從帳號真實性、協同行動與敘事預警，到深偽辨識、證據報告與實務培訓。探索 EudTech 的 Cyabra 社群情報方案。','Explore Cyabra authenticity, coordination, narrative alerts, deepfake detection, evidence reports, and training with EudTech.')} path="/solutions/social-intelligence" structuredData={structuredData}>
    <div className="cy-experience">
      <section className="cy-hero">
        <div className="cy-hero-background" aria-hidden="true" />
        <div className="cy-container cy-hero-grid">
          <div className="cy-hero-copy">
            <div className="cy-brandline"><span>EudTech</span><i aria-hidden="true" /><strong>Cyabra</strong><span className="cy-brand-caption">NARRATIVE INTELLIGENCE</span></div>
            <h1>{isEnglish ? <>Cyabra narrative intelligence:<br /><em>profiles, coordination, alerts.</em></> : <>Cyabra 敘事情報：<br /><em>假帳號、協同行動與風險預警</em></>}</h1>
            <p className="cy-hero-lead">{t(b('從假帳號、協同操作到深偽影像，連結人物、內容與行為，將網路聲量轉為有證據的情報。','Connect actors, content, and behavior—from fake profiles and coordinated activity to deepfakes—and turn online conversation into evidence-based intelligence.'))}</p><p className="cy-fineprint">{t(b('內容最後檢閱：2026-10-04','Content reviewed: 2026-10-04'))}</p>
            <div className="cy-hero-actions"><ActionLink href="/contact">{t(b('預約 Cyabra 展示','Request a Cyabra demo'))}</ActionLink><a href="#updates" className="cy-quiet-button">{t(b('看三大新功能','Explore what’s new'))}<ArrowDown size={17}/></a></div>
            <div className="cy-hero-audience">{t(b('品牌與公關 / 威脅情報 / 政府與公共安全','BRANDS & COMMS / THREAT INTELLIGENCE / PUBLIC SECTOR'))}</div>
          </div>
          <figure className="cy-hero-visual">
            <div className="cy-visual-top"><span><Network size={16}/> COORDINATION ANALYSIS</span><span>Cyabra</span></div>
            <img src="/vendor/cyabra/2026/coordination.webp" alt={t(b('Cyabra 原廠帳號關係與群組分析畫面','Cyabra official profile network and cluster analysis illustration'))} width="1200" height="800" fetchPriority="high" />
            <figcaption><span>{t(b('連結帳號，還原影響力網絡','Connect profiles. Reveal the influence network.'))}</span><span>{t(b('原廠功能示意','Official capability illustration'))}</span></figcaption>
          </figure>
        </div>
        <div className="cy-container cy-hero-bottom"><span>{t(b('辨識真實性','ASSESS AUTHENTICITY'))}</span><i/><span>{t(b('追查協同行動','TRACE COORDINATION'))}</span><i/><span>{t(b('以證據支持決策','ACT WITH EVIDENCE'))}</span></div>
      </section>

      <nav className="cy-section-nav" aria-label={t(b('Cyabra 頁面導覽','Cyabra page navigation'))}><div className="cy-container">{[['updates',b('三大新功能','What’s new')],['capabilities',b('平台能力','Capabilities')],['official-gallery',b('原廠圖片','Official gallery')],['scenarios',b('應用情境','Use cases')],['workflow',b('分析流程','Workflow')],['learning',b('學習資源','Learning')],['faq',b('常見問題','FAQ')]].map(([id,label])=><a key={id as string} href={`#${id}`}>{t(label as Bilingual)}</a>)}</div></nav>

      <CyabraNewFeatures isEnglish={isEnglish}/>

      <section className="cy-section" id="capabilities"><div className="cy-container">
        <div className="cy-section-heading"><div><p className="cy-eyebrow">THE PLATFORM</p><h2>{t(b('從一則訊息，看見整個脈絡。','One message. The bigger picture.'))}</h2></div><p>{t(b('八大能力彼此串接，從「誰在說」一路追到「如何擴散、如何回應」。','Eight connected capabilities take you from who is speaking to how a narrative spreads—and what to do next.'))}</p></div>
        <div className="cy-feature-tabs" role="tablist" aria-label={t(b('平台功能','Platform capabilities'))}>{cyabraCapabilities.map((item,index)=>{const Icon=icons[index];return <button key={item.id} role="tab" id={`tab-${item.id}`} aria-selected={index===active} aria-controls="capability-panel" tabIndex={index===active?0:-1} ref={element=>{featureTabs.current[index]=element;}} onKeyDown={event=>navigateTabs(event,index,cyabraCapabilities.length,setActive,featureTabs)} onClick={()=>setActive(index)}><Icon size={18}/>{t(item.title)}</button>;})}</div>
        <div className="cy-feature-panel" id="capability-panel" role="tabpanel" aria-labelledby={`tab-${feature.id}`} tabIndex={0}>
          <div className="cy-feature-copy"><span className="cy-number">0{active+1}<small>/ 08</small></span><p className="cy-eyebrow">{feature.label}</p><h3>{t(feature.question)}</h3><p>{t(feature.body)}</p><ul>{feature.points.map(point=><li key={point.en}><Check size={17}/>{t(point)}</li>)}</ul><div className="cy-output"><FileText size={18}/><div><span>{t(b('你會得到','YOUR OUTPUT'))}</span><p>{t(feature.output)}</p></div></div><External href={feature.source}>{t(sourceLabel)}</External></div>
          <figure className="cy-feature-image"><img key={feature.image} src={feature.image.replace('.svg','.webp')} alt={t(b(`Cyabra 原廠${feature.title.zh}功能示意`,`Official Cyabra ${feature.title.en} illustration`))} width="1200" height="800" loading="lazy"/><figcaption>{t(b('Cyabra 原廠公開畫面；實際介面依版本與授權範圍為準。','Official Cyabra illustration. Interface and availability depend on the contracted version and scope.'))}</figcaption></figure>
        </div>
        <div className="cy-learning-grid" aria-label={t(b('全部平台能力摘要','All platform capability summaries'))}>{cyabraCapabilities.map(item=><details key={item.id} className="cy-learning-card"><summary><div><h3>{t(item.title)}</h3><span>{item.label}</span></div><ChevronDown size={20}/></summary><div className="cy-learning-content"><h4>{t(item.question)}</h4><p>{t(item.body)}</p><ul>{item.points.map(point=><li key={point.en}><Check size={14}/>{t(point)}</li>)}</ul><p><strong>{t(b('交付：','Output: '))}</strong>{t(item.output)}</p><External href={item.source}>{t(sourceLabel)}</External></div></details>)}</div>
      </div></section>



      <CyabraOfficialGallery isEnglish={isEnglish}/>

      <section className="cy-extension"><div className="cy-container"><div className="cy-extension-heading"><p className="cy-eyebrow">CONNECTED INTELLIGENCE</p><h2>{t(b('跨平台，也接上既有工作。','Across platforms. Into your workflow.'))}</h2><External href="https://ir.cyabra.com/news-events/press-releases/detail/39/cyabra-reports-first-quarter-2026-results-and-highlights-commercial-progress-following-nasdaq-listing">{t(b('原廠 2026 平台更新','2026 platform update'))}</External></div><div className="cy-extension-items">{[
        [b('匯入既有監測資料','Import social listening data'),b('Meltwater / Talkwalker','Meltwater / Talkwalker'),b('將社群聆聽資料帶入真實性與敘事分析。','Bring existing listening data into authenticity and narrative analysis.')],
        [b('延伸中文平台覆蓋','Extend Chinese-platform coverage'),b('Douyin 抖音 / WeChat 微信','Douyin / WeChat'),b('擴展中文社群來源，依專案確認可用資料。','Expand Chinese-language sources; confirm the available data for your project.')],
        [b('比較異常與常態','Put anomalies in context'),'Authenticity Benchmark',b('比較相似情境下的不真實活動程度。','Compare inauthentic activity with similar environments.')],
        [b('逐條查核新聞主張','Verify individual news claims'),'News Claims Analysis',b('比對外部來源，提供三類查核結果與引用證據。','Cross-check external sources and return three assessment types with references.')]
      ].map(([title,label,body])=><div key={typeof title==='string'?title:title.en}><h3>{t(title as Bilingual)}</h3><strong>{typeof label==='string'?label:t(label)}</strong><p>{t(body as Bilingual)}</p></div>)}</div></div></section>

      <section id="scenarios" className="cy-section"><div className="cy-container"><div className="cy-section-heading"><div><p className="cy-eyebrow">BUILT FOR YOUR MISSION</p><h2>{t(b('同一套情報，回答不同的關鍵問題。','Different teams. Critical questions.'))}</h2></div></div>
        <div className="cy-scenario-layout"><div className="cy-scenario-tabs" role="tablist" aria-orientation="vertical" aria-label={t(b('產業應用','Industry use cases'))}>{cyabraScenarios.map((item,index)=><button key={item.title.en} role="tab" id={`scenario-${index}`} aria-selected={scenario===index} aria-controls="scenario-panel" tabIndex={scenario===index?0:-1} ref={element=>{scenarioTabs.current[index]=element;}} onKeyDown={event=>navigateTabs(event,index,cyabraScenarios.length,setScenario,scenarioTabs)} onClick={()=>setScenario(index)}><span>0{index+1}</span>{t(item.title)}<ArrowUpRight size={18}/></button>)}</div><div className="cy-scenario-panel" role="tabpanel" id="scenario-panel" aria-labelledby={`scenario-${scenario}`} tabIndex={0}><Globe2 size={32}/><h3>{t(useCase.intro)}</h3><p>{t(useCase.body)}</p><div className="cy-deliverables"><span>{t(b('可規劃的情報交付','POTENTIAL DELIVERABLES'))}</span>{useCase.deliverables.map(item=><p key={item.en}><Check size={17}/>{t(item)}</p>)}</div><ActionLink href="/contact">{t(b('討論我的應用情境','Discuss your use case'))}</ActionLink></div></div><div className="cy-learning-grid" aria-label={t(b('全部應用情境摘要','All use-case summaries'))}>{cyabraScenarios.map(item=><details key={item.title.en} className="cy-learning-card"><summary><div><h3>{t(item.title)}</h3><span>{t(item.intro)}</span></div><ChevronDown size={20}/></summary><div className="cy-learning-content"><p>{t(item.body)}</p><ul>{item.deliverables.map(output=><li key={output.en}><Check size={14}/>{t(output)}</li>)}</ul><External href={item.source}>{t(b('原廠應用資料','Vendor solution source'))}</External></div></details>)}</div>
      </div></section>

      <section id="workflow" className="cy-section cy-workflow"><div className="cy-container"><div className="cy-section-heading"><div><p className="cy-eyebrow">FROM SIGNAL TO DECISION</p><h2>{t(b('把調查，變成可重複的工作流程。','A repeatable path from signal to decision.'))}</h2></div><p>{t(b('結合原廠資料方法與操作教材，從定義問題開始，交付可追溯的情報。','Grounded in Cyabra methodology and training: define the question and deliver traceable intelligence.'))}</p></div><div className="cy-process">{[
        [b('定義議題','Define'),b('品牌、人物、事件','Brand, person, event'),b('設定關鍵字、平台、語言與時間。','Set keywords, platforms, languages, and time range.')],
        [b('蒐集與整理','Collect'),b('公開內容與來源','Public content & sources'),b('依掃描範圍蒐集、抽樣與整理資料。','Collect, sample, and organize the scoped data.')],
        [b('辨識與分析','Analyze'),b('真實性、敘事、情緒','Authenticity, narratives, sentiment'),b('比較帳號特徵、內容與變化趨勢。','Compare profiles, content, and changing patterns.')],
        [b('連結與查核','Investigate'),b('群組與擴散關係','Clusters & propagation'),b('找出關鍵帳號，檢視原始證據。','Identify key profiles and review source evidence.')],
        [b('交付與回應','Act'),b('警示、報告、主管簡報','Alerts, reports, executive briefs'),b('安排風險優先順序與後續行動。','Prioritize risks and decide next actions.')]
      ].map(([title,label,body],index)=><article key={title.en}><span className="cy-process-no">0{index+1}</span><h3>{t(title)}</h3><strong>{t(label)}</strong><p>{t(body)}</p></article>)}</div><p className="cy-method-note">{t(b('分析以公開資料及設定的採樣範圍為基礎；系統發現由人員檢視後，形成組織的決策。','Analysis uses public data and the configured sampling scope. People review the findings and make the organization’s decisions.'))}</p></div></section>

      <section className="cy-section"><div className="cy-container"><div className="cy-section-heading"><div><p className="cy-eyebrow">INTELLIGENCE IN PRACTICE</p><h2>{t(b('從真實案例，理解情報的用途。','See the role of intelligence in practice.'))}</h2></div><External href="https://cyabra.com/case-studies/">{t(b('原廠案例與客戶證言','Vendor case studies'))}</External></div><div className="cy-cases">{[
        {name:'U.S. State Department',image:'state-department.png',label:b('公共部門 / 假資訊與境外影響','PUBLIC SECTOR / FOREIGN INFLUENCE'),title:b('辨識虛假討論與外部影響','Identify fake discourse and foreign influence'),body:b('Cyabra 原廠公開案例，展示政府團隊如何運用帳號與敘事分析，理解資訊環境。','A Cyabra-published case on using profile and narrative analysis to understand the information environment.')},
        {name:'WarnerMedia',image:'warner-media.png',label:b('媒體娛樂 / 帳號群與聲量','MEDIA / AUDIENCE AUTHENTICITY'),title:b('看見電影聲量背後的機器人群','Uncover bot networks behind movie discussions'),body:b('原廠案例描述針對電影上映話題的帳號網絡調查，分析可能影響票房預測的操弄。','The vendor case investigates bot networks targeting upcoming releases and manipulating box-office predictions.')}
      ].map(item=><article key={item.name}><div className="cy-case-image"><img src={`/vendor/cyabra/2026/${item.image}`} alt={item.name} loading="lazy"/></div><div className="cy-case-copy"><span className="cy-eyebrow">{t(item.label)}</span><h3>{t(item.title)}</h3><p>{t(item.body)}</p><External href="https://cyabra.com/case-studies/">{item.name}</External></div></article>)}</div><p className="cy-fineprint">{t(b('以上為 Cyabra 原廠案例，供方案評估參考。','These are Cyabra vendor case studies, provided as solution references.'))}</p></div></section>

      <section id="learning" className="cy-section cy-surface"><div className="cy-container"><div className="cy-section-heading"><div><p className="cy-eyebrow">LEARN TO INVESTIGATE</p><h2>{t(b('從看懂情報，到自己完成分析。','From understanding intelligence to producing it.'))}</h2></div><p>{t(b('以原廠操作影片、指南與培訓工作表，規劃四段學習路徑。','Four learning stages organized around vendor videos, guides, and training worksheets.'))}</p></div><div className="cy-learning-grid">{cyabraLearning.map((item,index)=><details key={item.step} className="cy-learning-card" open={index===0?true:undefined}><summary><span className="cy-learning-step">{item.step}</span><div><h3>{t(item.title)}</h3><span>{item.modules.length} {t(b('項學習素材','learning resources'))}</span></div><ChevronDown size={20}/></summary><div className="cy-learning-content"><p>{t(item.body)}</p><ul>{item.modules.map(name=><li key={name}>{/Overview|How to|Map|Graph|Analysis|Walkthrough|Status|Tags|Trends|CSV|Clusters|Activity|Mentions/.test(name)?<Play size={14}/>:<BookOpen size={14}/>}<a href={assetSearch(name)} target="_blank" rel="noreferrer">{name}<ArrowUpRight size={13}/></a></li>)}</ul></div></details>)}</div><div className="cy-learning-footer"><span><BookOpen size={18}/>{t(b('教材存取需具備 Cyabra 合作夥伴或受訓帳號。','Access requires an eligible Cyabra partner or training account.'))}</span><External href={portal}>{t(b('開啟原廠學習平台','Open the partner learning portal'))}</External></div><CyabraPublicGuides isEnglish={isEnglish}/><div className="cy-public-resources"><h3>{t(b('也可以先從公開資源開始','Start with public resources'))}</h3>{[['https://cyabra.com/product/',b('產品全覽','Product overview')],['https://cyabra.com/playbooks/',b('實務指南與 Playbooks','Practical playbooks')],['https://cyabra.com/case-studies/',b('案例與客戶證言','Cases & testimonials')],['https://cyabra.com/terms-and-policies/',b('資料治理、條款與政策','Data governance, terms, and policies')]].map(([href,label])=><External key={href as string} href={href as string}>{t(label as Bilingual)}</External>)}</div></div></section>

      <section className="cy-section"><div className="cy-container"><div className="cy-section-heading"><div><p className="cy-eyebrow">A FIT FOR YOUR TEAM</p><h2>{t(b('選擇適合團隊的使用方式。','Choose how your team works.'))}</h2></div><p>{t(b('由 EudTech 協助確認需求、原廠授權與交付範圍。','EudTech helps define requirements, vendor licensing, and delivery scope.'))}</p></div><div className="cy-access">{[
        ['01',b('自行調查','Self-service'), 'SaaS Platform',b('團隊設定掃描、檢視資料並產出分析。','Your team runs scans, reviews evidence, and produces analysis.')],
        ['02',b('取得分析支援','Analyst support'),'Managed Services',b('由原廠分析服務協助整理議題與報告。','Vendor analysts support investigations and report preparation.')],
        ['03',b('持續掌握變化','Stay informed'),'Narrative Alerts',b('依敘事與風險需求安排預警及情報摘要。','Receive alerts and briefs around relevant narratives and risks.')],
        ['04',b('接入既有環境','Integrate'),'API / On-Prem',b('評估系統整合或地端需求，另行確認可用範圍。','Assess integration or on-premises needs and confirm availability.')]
      ].map(([num,title,label,body])=><article key={num as string}><span>{num as string}</span><h3>{t(title as Bilingual)}</h3><strong>{label as string}</strong><p>{t(body as Bilingual)}</p></article>)}</div></div></section>

      <section id="faq" className="cy-section cy-faq-section"><div className="cy-container cy-faq-layout"><div><p className="cy-eyebrow">A FEW THINGS TO KNOW</p><h2>{t(b('開始之前，先把問題說清楚。','Clarity before you begin.'))}</h2><p className="cy-muted">{t(b('資料、能力與交付範圍，都值得先確認。','Align on data, capabilities, and deliverables.'))}</p></div><div className="cy-faq-list">{faqs.map(item=><details key={item.q.en}><summary>{t(item.q)}<ChevronDown size={18}/></summary><p>{t(item.a)}</p></details>)}</div></div></section>

      <section className="cy-cta"><div className="cy-container"><div><p className="cy-eyebrow">LET’S MAKE SENSE OF IT</p><h2>{t(b('從你最關心的一個議題開始。','Start with the issue that matters to you.'))}</h2><p>{t(b('告訴我們你要保護的品牌、人物或公共議題，一起定義值得採取行動的情報。','Tell us about the brand, person, or public issue you care about. Together, we’ll define the intelligence your team can act on.'))}</p></div><ActionLink href="/contact">{t(b('與 EudTech 討論需求','Talk to EudTech'))}</ActionLink></div></section>
    </div>
  </PageShell>;
};
export default CyabraExperiencePage;
