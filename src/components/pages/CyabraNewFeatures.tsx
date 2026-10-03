import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Expand, Search } from 'lucide-react';
import { cyabraExpandedImageIds, cyabraOfficialImages, type CyabraOfficialImage } from '../../data/cyabraOfficialImages';
import { bilingual as b } from '../../data/cyabraExperience';
import { tx, type Bilingual } from './SitePagePrimitives';
import './CyabraNewFeatures.css';

const official = (id: number) => cyabraOfficialImages.find(image => image.id === `official-${String(id).padStart(2, '0')}`)!;
const expandedIds = new Set(cyabraExpandedImageIds);
const galleryImages = [...cyabraOfficialImages.filter(image => expandedIds.has(image.id)), ...cyabraOfficialImages.filter(image => !expandedIds.has(image.id))];
const imageNotes: Record<string, Bilingual> = {
  sample: b('原廠範例；數值為示意', 'Vendor sample; illustrative figures'),
  screenshot: b('Cyabra 原廠公開畫面', 'Screenshot published by Cyabra'),
  illustration: b('原廠功能概念與示意圖', 'Official capability illustration'),
  case: b('原廠案例研究圖；情境與數據見來源', 'Vendor case research; context and figures in source'),
  guide: b('原廠實務指南封面', 'Official playbook cover'),
  artwork: b('原廠功能發布主視覺', 'Official launch artwork')
};

export const CyabraOfficialFigure: React.FC<{ asset: CyabraOfficialImage; isEnglish: boolean; compact?: boolean }> = ({ asset, isEnglish, compact }) => (
  <figure className={`cy-official-figure${compact ? ' cy-official-compact' : ''}`}>
    <a href={asset.path} target="_blank" rel="noreferrer" aria-label={`${isEnglish ? 'Enlarge' : '放大'}：${tx(asset.title, isEnglish)}`}>
      <img src={asset.path} alt={tx(asset.title, isEnglish)} width={asset.width} height={asset.height} loading="lazy" decoding="async" />
      <span className="cy-image-expand"><Expand size={14} />{isEnglish ? 'Enlarge' : '放大圖片'}</span>
    </a>
    <figcaption><span>{tx(asset.title, isEnglish)}<small>{tx(imageNotes[asset.kind] ?? imageNotes.illustration, isEnglish)}</small></span><a href={asset.source} target="_blank" rel="noreferrer">{asset.kind === 'guide' ? (isEnglish ? 'Read guide' : '閱讀指南') : (isEnglish ? 'Source' : '原廠來源')}<ArrowUpRight size={13} /></a></figcaption>
  </figure>
);

const launches = [
  {
    id: 'ai-investigator', date: '2026.07.28', label: 'COORDINATED ACTIVITY DETECTION',
    title: b('AI 自動調查員', 'An AI investigator'),
    headline: b('有人一起帶風向？讓 AI 先把證據找出來。', 'Coordinated activity? Let AI connect the evidence.'),
    short: b('辨識協同操作，自動整理調查報告。', 'Detect coordination and produce an evidence report.'),
    body: b('每次掃描自動交叉分析帳號、發文時間、內容與擴散行為，協助判斷是否存在有組織的操作，並說明依據。', 'Each scan compares profiles, timing, content, and amplification to assess whether activity is coordinated and explain the evidence.'),
    points: [b('檢查八類訊號：帳號集中、同步發文、共用內容、相同敘事、標籤操作、放大行為、地理群聚及跨平台協同。', 'Evaluate eight signals: profile concentration, posting synchronization, shared content, aligned narratives, hashtags, amplification, geographic clustering, and cross-platform coordination.'), b('自動提供協同行動判斷與支持證據，方便分析人員複核。', 'Get an automatic assessment with supporting evidence for analyst review.'), b('下載報告，供內部調查、主管簡報與後續應對使用。', 'Download a report for investigations, briefings, and response planning.')],
    input: b('既有 Cyabra 掃描', 'A Cyabra scan'), output: b('協同判斷＋證據＋可下載報告', 'Assessment + evidence + downloadable report'),
    images: [34], source: 'https://cyabra.com/blog/introducing-cyabras-coordinated-activity-detection/'
  },
  {
    id: 'news-claims', date: '2026.04.22', label: 'NEWS CLAIMS ANALYSIS',
    title: b('新聞查核', 'News claims analysis'),
    headline: b('新聞裡的每個說法，都能往回查證。', 'Trace each news claim back to its evidence.'),
    short: b('逐條拆解新聞主張，附上查核依據。', 'Extract news claims and check their supporting sources.'),
    body: b('輸入新聞網址或批次上傳 CSV，AI 會抽出可查證的事實主張，再比對外部網路來源，將結果與引用一起交給團隊。', 'Submit a news URL or upload a CSV. AI extracts factual claims, cross-checks external sources, and returns an assessment with references.'),
    points: [b('三種結果：有支持證據、被來源反駁、尚無法確認。', 'Three results: Verified, False, or Unverified.'), b('每項判斷附來源連結與相關摘錄，可逐一檢視。', 'Review source links and relevant excerpts behind each assessment.'), b('支援單筆網址、CSV 批次匯入及結果匯出，並提供來源網站政治偏向辨識。', 'Use single URLs, bulk CSV input, CSV export, and political-bias detection for source websites.')],
    input: b('新聞網址／CSV 清單', 'News URL / CSV list'), output: b('逐條主張＋三類結果＋引用來源', 'Claims + three result types + references'),
    images: [35,36,37], source: 'https://cyabra.com/blog/introducing-news-claims-analysis-verify-what-the-news-is-actually-saying/'
  },
  {
    id: 'narrative-warning', date: '2026.02.05', label: 'NARRATIVE ALERTS',
    title: b('輿論危機預警', 'Narrative early warning'),
    headline: b('危機還沒燒大，先知道誰在推動。', 'See who is driving a narrative before it escalates.'),
    short: b('追蹤有害敘事，提早掌握危機線索。', 'Track harmful narratives and emerging risk signals.'),
    body: b('持續分析社群與新聞中的議題變化，辨識可疑帳號與異常放大，將源頭、推動者、擴散速度與可能影響整理成警示。', 'Monitor changes across social and news discussions, identify suspicious participation and amplification, and surface origins, key actors, spread, and potential impact.'),
    points: [b('追蹤謠言、詐騙、冒名、仇恨與其他有害敘事。', 'Track misinformation, scams, impersonation, hate, and other harmful narratives.'), b('比較真實與不真實帳號的參與量，找出帶動討論的關鍵貼文。', 'Compare authentic and inauthentic engagement and identify influential posts.'), b('依工作需要安排通知頻率，協助公關、資安與情報團隊排定處理順序。', 'Set a reporting cadence and help communications, security, and intelligence teams prioritize review.')],
    input: b('持續追蹤的品牌／人物／議題', 'A monitored brand / person / topic'), output: b('風險敘事＋參與帳號＋關鍵貼文', 'Risk narratives + participants + key posts'),
    images: [38,39,40], source: 'https://cyabra.com/blog/cyabra-launches-narrative-alerts-to-help-organizations-stay-ahead-of-online-manipulation/'
  }
];

export const CyabraNewFeatures: React.FC<{ isEnglish: boolean }> = ({ isEnglish }) => {
  const t = (value: Bilingual) => tx(value, isEnglish);
  return <section id="updates" className="cy-section cy-launches"><div className="cy-container">
    <div className="cy-section-heading"><div><p className="cy-eyebrow">WHAT’S NEW · 2026</p><h2>{t(b('三項新能力，看懂今年的 Cyabra。', 'Three new ways to get clarity.'))}</h2></div><p>{t(b('從自動調查、新聞查核到提早預警，都是 Cyabra 平台內的新能力。', 'Automated investigations, news verification, and early warning—new capabilities within the Cyabra platform.'))}</p></div>
    <div className="cy-launch-shortcuts">{launches.map((item,index)=><a href={`#${item.id}`} key={item.id}><span>0{index+1} / {item.date}</span><h3>{t(item.title)}</h3><p>{t(item.short)}</p><ArrowDown size={18}/></a>)}</div>
    {launches.map((item,index)=><article id={item.id} className="cy-launch-detail" key={item.id}>
      <div className="cy-launch-copy"><p className="cy-eyebrow">0{index+1} / {item.label}</p><h3>{t(item.headline)}</h3><p>{t(item.body)}</p>
        {item.id==='news-claims' && <div className="cy-verdicts"><span>{t(b('有支持證據','Verified'))}</span><span>{t(b('被來源反駁','False'))}</span><span>{t(b('尚無法確認','Unverified'))}</span></div>}
        <ul>{item.points.map(point=><li key={point.en}><Check size={17}/><span>{t(point)}</span></li>)}</ul>
        <dl className="cy-launch-io"><div><dt>{t(b('提供什麼','INPUT'))}</dt><dd>{t(item.input)}</dd></div><div><dt>{t(b('得到什麼','OUTPUT'))}</dt><dd>{t(item.output)}</dd></div></dl>
        <a className="cy-link" href={item.source} target="_blank" rel="noreferrer">{t(b('查看原廠功能發布','Read the official announcement'))}<ArrowUpRight size={16}/></a>
        {item.id==='news-claims' && <p className="cy-launch-note">{t(b('判斷依據是系統找到的外部資料；團隊仍可回到原始來源複核。附圖為原廠示範畫面。','Assessments depend on the external evidence found. Teams can review the original sources. Images are vendor examples.'))}</p>}
      </div>
      <div className={`cy-launch-media${item.images.length===1?' cy-launch-portrait':''}`}>{item.images.map(id=><CyabraOfficialFigure key={id} asset={official(id)} isEnglish={isEnglish}/>)}</div>
    </article>)}
  </div></section>;
};

export const CyabraOfficialGallery: React.FC<{ isEnglish: boolean }> = ({ isEnglish }) => {
  const [group,setGroup]=useState('all');
  const [expanded,setExpanded]=useState(false);
  const groups=[...new Map(cyabraOfficialImages.map(item=>[item.group,item.groupTitle])).entries()];
  const matches=galleryImages.filter(item=>group==='all'||(group==='added' ? expandedIds.has(item.id) : item.group===group));
  const shown=expanded?matches:matches.slice(0,12);
  const count=cyabraOfficialImages.length;
  return <section id="official-gallery" className="cy-section cy-surface"><div className="cy-container">
    <div className="cy-section-heading"><div><p className="cy-eyebrow">INSIDE CYABRA</p><h2>{isEnglish?'See the platform, one image at a time.':'直接看原廠畫面，理解每一步。'}</h2></div><p>{isEnglish?`${count} official screenshots, case-study visuals, workflow illustrations, and playbook covers. Enlarge any image to explore the detail.`:`${count} 張原廠操作畫面、案例分析、流程示意與指南封面。點圖放大，看懂每個分析環節。`}</p></div>
    <div className="cy-gallery-filters" role="group" aria-label={isEnglish?'Filter official images':'原廠圖片分類'}><button aria-pressed={group==='all'} onClick={()=>{setGroup('all');setExpanded(false);}}>{isEnglish?'All images':'全部圖片'} <span>{count}</span></button><button aria-pressed={group==='added'} onClick={()=>{setGroup('added');setExpanded(false);}}>{isEnglish?'Added collection':'新增圖片'} <span>{cyabraExpandedImageIds.length}</span></button>{groups.map(([key,title])=><button key={key} aria-pressed={group===key} onClick={()=>{setGroup(key);setExpanded(false);}}>{tx(title,isEnglish)}</button>)}</div>
    <p className="cy-gallery-status" role="status"><Search size={14}/>{isEnglish?`Showing ${shown.length} of ${matches.length} images`:`顯示 ${shown.length} / ${matches.length} 張圖片`}</p>
    <div className="cy-gallery-grid">{shown.map(asset=><CyabraOfficialFigure key={asset.id} asset={asset} isEnglish={isEnglish} compact/>)}</div>
    {!expanded && matches.length>shown.length && <button className="cy-gallery-more" onClick={()=>setExpanded(true)}>{isEnglish?`Show all ${matches.length} images`:`展開全部 ${matches.length} 張原廠圖片`}<ArrowDown size={17}/></button>}
    <p className="cy-fineprint">{isEnglish?'Images are published by Cyabra. Captions distinguish interface screenshots, research cases, concept artwork, and guide covers. Case context and figures are documented in the vendor source; interface and availability may vary by version.':'圖片均來自 Cyabra 公開官網，並區分操作畫面、案例研究、功能概念與指南封面。案例情境及數據請參閱原廠來源；實際介面與可用功能依版本而定。'}</p>
  </div></section>;
};

export const CyabraPublicGuides: React.FC<{ isEnglish: boolean }> = ({ isEnglish }) => (
  <div className="cy-guide-library">
    <div className="cy-section-heading"><div><p className="cy-eyebrow">OFFICIAL PLAYBOOKS</p><h3>{isEnglish ? 'Start with a practical guide.' : '先用一份實務指南，理解怎麼應對。'}</h3></div><p>{isEnglish ? 'Explore Cyabra’s public guides on comment sections, disinformation, deepfakes, crises, and harmful profiles.' : '從留言區、假資訊、深偽、危機預警到有害帳號，直接閱讀原廠公開指南。'}</p></div>
    <div className="cy-gallery-grid">{cyabraOfficialImages.filter(asset => asset.group === 'playbooks').map(asset => <CyabraOfficialFigure key={asset.id} asset={asset} isEnglish={isEnglish} compact />)}</div>
  </div>
);
