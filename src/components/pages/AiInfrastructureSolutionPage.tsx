import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { VENDOR_EVIDENCE } from '../../data/vendorEvidence';
import { Bilingual, PageShell, tx } from './SitePagePrimitives';
import './AiInfrastructureSolutionPage.css';

const kit = '/vendor/comino/sales-kit-0911/';
const questions = [
  { title: { zh: '設備旁邊會有人工作嗎？', en: 'Will people work beside the system?' }, body: { zh: '先確認聲音與使用者距離，再選桌邊或機架部署。', en: 'Review acoustics and distance from users before choosing deskside or rack deployment.' } },
  { title: { zh: '現場有多少空間與電力？', en: 'What space and power are available?' }, body: { zh: '供電、排熱、搬運與維護空間，都要一起評估。', en: 'Consider power, heat removal, handling and service access together.' } },
  { title: { zh: '工作會連續執行多久？', en: 'How long will each workload run?' }, body: { zh: '短時開發與長時間滿載，對散熱與維運的要求不同。', en: 'Short development sessions and sustained loads place different demands on cooling and operations.' } },
];
const cooling = [
  { title: { zh: '冷卻模組接住熱', en: 'Cooling blocks collect heat' }, body: { zh: '高熱元件透過冷卻模組散熱，減少每張 GPU 各自配置大型散熱器所占的空間。', en: 'Cooling blocks transfer heat from high-load components, reducing the space required for individual GPU heatsinks.' } },
  { title: { zh: '冷卻液把熱帶走', en: 'Coolant transports heat' }, body: { zh: '管路將熱傳遞至機箱散熱器；冷卻模組、管路與機箱一起設計。', en: 'Pipework carries heat to the chassis radiator. Blocks, pipework and chassis are designed as one system.' } },
  { title: { zh: '氣流把熱排出機箱', en: 'Airflow releases heat' }, body: { zh: '散熱器透過氣流向外排熱，前段進氣也照顧 RAM 等仍需氣冷的元件。', en: 'Airflow removes heat through the radiator, while intake air also cools components such as RAM.' } },
];
const workloads = [
  { title: { zh: 'AI 推論與微調', en: 'AI inference and fine-tuning' }, body: { zh: '先確認模型、精度、同時使用人數與回應時間需求，再估算 GPU 記憶體、張數、RAM 與儲存。', en: 'Start with the model, precision, concurrent users and response-time targets, then size GPU memory, GPU count, RAM and storage.' }, note: { zh: '帶來：模型、軟體與預期使用量', en: 'Bring: models, software and expected usage' } },
  { title: { zh: '生命科學與工程運算', en: 'Life sciences and engineering' }, body: { zh: '確認軟體授權與支援、CPU／GPU 分工、雙精度需求、GPU 間資料交換與連續運作時間。', en: 'Review software licensing and support, CPU/GPU roles, precision, inter-GPU data movement and sustained run time.' }, note: { zh: '帶來：軟體版本與代表性工作負載', en: 'Bring: software versions and a representative workload' } },
  { title: { zh: '渲染與虛擬製作', en: 'Rendering and virtual production' }, body: { zh: '依場景、影像流程、GPU 記憶體、素材容量與周邊擴充需求，規劃運算、儲存與網路。', en: 'Plan compute, storage and networking around scenes, image workflows, GPU memory, asset volume and expansion needs.' }, note: { zh: '帶來：場景規模、工具與輸出需求', en: 'Bring: scene scale, tools and output requirements' } },
];
const operations = [
  { title: { zh: '知道設備的狀態', en: 'Know the system’s condition' }, body: { zh: '查看溫度、風扇、幫浦與冷卻相關狀態；監控與整合方式依機型確認。', en: 'Review temperatures, fans, pumps and cooling-system status. Monitoring and integration depend on the model.' } },
  { title: { zh: '維護有明確程序', en: 'Service with a defined procedure' }, body: { zh: '快速斷開接頭（QDC）是維修介面，操作仍依原廠程序；不表示所有零件都能不停機更換。', en: 'Quick-disconnect couplings (QDC) support servicing under manufacturer procedures; they do not make every component hot-swappable.' } },
  { title: { zh: '容量與備援分開確認', en: 'Check capacity and redundancy separately' }, body: { zh: '電源容量與備援方式依機型、負載及輸入電壓確認；多顆電源不一定代表具備備援餘量。', en: 'Confirm power capacity and redundancy against the model, load and input voltage. Multiple supplies do not automatically provide redundant capacity.' } },
];
const stages = [
  { title: { zh: '需求與工程選型', en: 'Requirements and engineering' }, body: { zh: '記錄模型、軟體、使用人數、資料規模與運作時間，整理 GPU、CPU、RAM、儲存與網路配置。', en: 'Record models, software, users, data scale and run time, then document GPU, CPU, RAM, storage and networking choices.' } },
  { title: { zh: '場地與配置審查', en: 'Site and configuration review' }, body: { zh: '核對機架、供電、排熱、噪音、搬運與網路。保留可分享的配置連結與版本，供使用、資訊與採購端共同確認。', en: 'Check racks, power, heat removal, noise, handling and networking. Keep a shareable configuration and version for users, IT and procurement.' } },
  { title: { zh: '正式報價與驗收', en: 'Quotation and acceptance' }, body: { zh: '確認供貨、安裝與文件，約定硬體辨識、壓力測試、溫度、錯誤紀錄及指定工作負載的驗收項目。', en: 'Confirm supply, installation and documentation, and agree hardware inventory, stress tests, thermals, error logs and workload acceptance.' } },
  { title: { zh: '維護與後續支援', en: 'Maintenance and support' }, body: { zh: '列明保固、維護責任、教育與支援範圍。涉及產地或採購要求時，依選定型號與原廠文件逐項核對。', en: 'Define warranty, maintenance responsibilities, training and support. Check origin and procurement requirements against the selected model and manufacturer documents.' } },
];

const StoryFigure: React.FC<{ src: string; alt: Bilingual; caption: Bilingual; isEnglish: boolean; eager?: boolean }> = ({ src, alt, caption, isEnglish, eager }) => (
  <figure className="comino-figure">
    <a href={src} target="_blank" rel="noreferrer" aria-label={(isEnglish ? 'Open full image: ' : '開啟完整圖片：') + tx(alt, isEnglish)}>
      <img src={src} alt={tx(alt, isEnglish)} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" />
    </a>
    <figcaption><span>{tx(caption, isEnglish)}</span><a href={src} target="_blank" rel="noreferrer">{isEnglish ? 'View full image' : '查看完整圖片'}</a></figcaption>
  </figure>
);

const AiInfrastructureSolutionPage: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const text = (zh: string, en: string) => isEnglish ? en : zh;
  const actions = <div className="comino-actions"><Link className="comino-button" to="/contact">{text('討論我的部署需求', 'Discuss my deployment')}</Link><Link className="comino-button comino-button-secondary" to="/configurator?request=true">{text('我已知道規格，開始配置', 'I know my specification')}</Link></div>;

  return <PageShell title={{ zh: 'AI 運算基礎設施｜EudTech', en: 'AI infrastructure | EudTech' }} description={{ zh: '從工作負載、選型、配置到報價與驗收，建立可採購的 Comino 液冷 AI GPU 運算基礎設施。', en: 'Build quote-ready Comino liquid-cooled AI GPU infrastructure from workload discovery through selection, configuration, quote, and acceptance.' }} path="/solutions/ai-infrastructure">
    <div className="comino-story">
      <section className="comino-hero" aria-labelledby="comino-title">
        <div className="comino-wrap comino-split">
          <div>
            <p className="comino-eyebrow">{text('AI 運算基礎設施', 'AI infrastructure')} · Comino GRANDO</p>
            <h1 id="comino-title">{text('多 GPU 算力，也要適合你的工作環境。', 'Multi-GPU computing that fits where you work.')}</h1>
            <p className="comino-lead">{text('從桌邊工作站到機架式多 GPU 系統，Comino GRANDO 以封閉式液冷為核心。EudTech 依你的工作負載，評估噪音、空間、供電與散熱，整理成可配置、可詢價的方案。', 'From deskside workstations to rack-mounted multi-GPU systems, Comino GRANDO is built around closed-loop liquid cooling. EudTech reviews your workload, noise, space, power and cooling needs to prepare a configuration and quotation.')}</p>
            {actions}
          </div>
          <StoryFigure src={VENDOR_EVIDENCE.comino.image} alt={VENDOR_EVIDENCE.comino.imageAlt} caption={{ zh: 'GRANDO 原廠實機：GPU 冷卻模組、管路與後段散熱器一起設計。', en: 'Official GRANDO system: GPU cooling blocks, pipework and rear radiator designed together.' }} isEnglish={isEnglish} eager />
        </div>
      </section>

      <section className="comino-section comino-tint" aria-labelledby="site-heading">
        <div className="comino-wrap">
          <div className="comino-intro"><p className="comino-eyebrow">{text('先看設備要放哪裡', 'Start with the site')}</p><h2 id="site-heading">{text('買得到 GPU，不代表場地已經準備好。', 'Buying the GPUs is only part of preparing the site.')}</h2><p>{text('設備需要的不只是安裝空間。長時間運算時的熱、噪音、供電與搬運方式，都會影響它能放在哪裡，以及後續如何使用。', 'A system needs more than floor or rack space. Heat, noise, power and handling affect where it can operate and how it will be maintained.')}</p></div>
          <div className="comino-three">{questions.map(item => <article key={item.title.en} className="comino-rule"><h3>{tx(item.title, isEnglish)}</h3><p>{tx(item.body, isEnglish)}</p></article>)}</div>
        </div>
      </section>

      <section className="comino-section" aria-labelledby="cooling-heading">
        <div className="comino-wrap">
          <div className="comino-intro"><p className="comino-eyebrow">{text('看懂液冷原理', 'Inside the cooling design')}</p><h2 id="cooling-heading">{text('把熱帶到散熱器，讓機箱空間留給運算。', 'Move heat to the radiator. Make room for compute.')}</h2><p>{text('冷卻液與氣流各有分工。熱從高負載元件經冷卻液傳遞，再由機箱散熱器排入周圍環境。', 'Coolant and airflow have different roles. Heat travels from high-load components through the coolant, then leaves the chassis radiator for the surrounding environment.')}</p></div>
          <div className="comino-explainer">
            <StoryFigure src={kit + 'liquid-airflow.webp'} alt={{ zh: 'GRANDO 冷卻液與氣流原理圖：藍紅色管路為冷卻液，波浪箭頭為氣流', en: 'GRANDO cooling diagram: blue and red pipes represent coolant; wavy arrows represent airflow' }} caption={{ zh: '原廠 Sales Kit 0911：實色管路是冷卻液，波浪箭頭是氣流。', en: 'Manufacturer Sales Kit 0911: solid pipes show coolant; wavy arrows show airflow. Original labels are in Chinese; the explanation is provided alongside.' }} isEnglish={isEnglish} />
            <ol className="comino-notes">{cooling.map((item, index) => <li key={item.title.en}><span className="comino-number">0{index + 1}</span><div><h3>{tx(item.title, isEnglish)}</h3><p>{tx(item.body, isEnglish)}</p></div></li>)}</ol>
          </div>
          <p className="comino-condition"><strong>{text('不接冷卻塔，不等於不需要空調。', 'No cooling tower does not mean no room cooling.')} </strong>{text('本頁介紹的機內封閉循環方案不需另接冷卻塔；熱仍會排入室內，現場空調、通風與供電仍須確認。', 'The self-contained design described here does not require an external cooling tower. Heat still enters the room, so air conditioning, ventilation and power must be checked.')}</p>
        </div>
      </section>

      <section className="comino-section comino-tint" aria-labelledby="deployment-heading">
        <div className="comino-wrap">
          <div className="comino-intro"><p className="comino-eyebrow">{text('兩種部署優先順序', 'Two deployment priorities')}</p><h2 id="deployment-heading">{text('要放在人旁邊，還是把機架密度放在第一位？', 'Working nearby, or maximising rack density?')}</h2><p>{text('相同品牌，不代表每個配置有相同噪音。GPU 功耗、張數、CPU 與進氣溫度，必須一起評估。', 'Systems from the same family do not all have the same noise level. GPU power, GPU count, CPU choice and intake temperature must be reviewed together.')}</p></div>
          <div className="comino-two">
            <article className="comino-deployment"><img src="/grando-desktop-03.jpg" alt={text('Comino GRANDO 桌邊工作站機箱實照', 'Comino GRANDO deskside workstation chassis')} width="3954" height="2224" loading="lazy" decoding="async" /><div><p className="comino-eyebrow">{text('桌邊／實驗室', 'Deskside / lab')}</p><h3>{text('讓工作環境先決定配置', 'Let the working environment lead')}</h3><p>{text('優先確認聲音、房間散熱、可用空間與使用者距離，再決定 GPU 與整機配置。', 'Review acoustics, room cooling, available space and distance from users before choosing the GPUs and system configuration.')}</p><p className="comino-small">{text('原廠工作站外觀示例；不表示所有 GPU 配置都適合辦公室。', 'Manufacturer workstation example; not every GPU configuration is suited to an office.')}</p></div></article>
            <article className="comino-deployment"><img src="/grando-rackable-01.jpg" alt={text('Comino GRANDO 可上架多 GPU 系統正面實照', 'Front view of a Comino GRANDO rackable multi-GPU system')} width="4173" height="2347" loading="lazy" decoding="async" /><div><p className="comino-eyebrow">{text('機架／運算服務', 'Rack / shared compute')}</p><h3>{text('把密度與持續運作一起規劃', 'Plan density and sustained operation together')}</h3><p>{text('優先確認供電、排熱、GPU 密度與維護空間。遠端管理及備援電源依選定機型與負載核對。', 'Review power, heat removal, GPU density and service access. Confirm remote management and redundant power for the selected model and load.')}</p><p className="comino-small">{text('原廠可上架機箱示例；GPU 張數與平台相容性須逐項確認。', 'Manufacturer rackable chassis example; GPU count and platform compatibility require review.')}</p></div></article>
          </div>
          <details className="comino-details">
            <summary>{text('為什麼不能只看 GPU 張數？查看原廠選型矩陣', 'Why GPU count is not enough: view the manufacturer’s selection matrix')}</summary>
            <div className="comino-details-content">
              <p>{text('這份 Sales Kit 0911（2025-09-11）矩陣以 GPU 功耗、張數與 CPU 平台，示意噪音及環境條件的取捨。它不是目前所有機型的即時相容性清單，灰格代表原稿未列，不等於不相容。', 'This Sales Kit 0911 matrix (11 September 2025) illustrates acoustic and environmental tradeoffs by GPU power, count and CPU platform. It is not a live compatibility list. Grey means “not presented”, not incompatible.')}</p>
              <StoryFigure src={kit + 'workload-selection-matrix.webp'} alt={{ zh: '原廠依 GPU TDP、單機張數與 CPU 平台分類的噪音／環境溫度矩陣', en: 'Manufacturer matrix of noise and ambient-temperature conditions by GPU TDP, GPUs per system and CPU platform' }} caption={{ zh: '原廠歷史配置參考；目前配置與適用條件以正式確認為準。', en: 'Historical manufacturer configuration reference; current configurations and conditions require confirmation.' }} isEnglish={isEnglish} />
              <dl className="comino-legend">
                <div><dt>{text('淺綠', 'Light green')}</dt><dd>{text('低噪音；桌面工作站方向。', 'Low noise; desktop workstation direction.')}</dd></div>
                <div><dt>{text('中綠', 'Medium green')}</dt><dd>{text('中噪音；桌面／可上架工作站方向。', 'Medium noise; desktop or rackable workstation direction.')}</dd></div>
                <div><dt>{text('其餘三階綠色', 'Three darker green levels')}</dt><dd>{text('高噪音；原稿分別標示環境溫度最高 35–40°C、25–30°C、15–20°C 的配置條件。', 'High noise; the source lists ambient-temperature limits of 35–40°C, 25–30°C and 15–20°C for the respective configurations.')}</dd></div>
                <div><dt>{text('灰色', 'Grey')}</dt><dd>{text('原稿未列（Not presented）。', 'Not presented in the source.')}</dd></div>
              </dl>
            </div>
          </details>
        </div>
      </section>

      <section className="comino-section" aria-labelledby="workload-heading">
        <div className="comino-wrap"><div className="comino-intro"><p className="comino-eyebrow">{text('回到你的工作', 'Start with your workload')}</p><h2 id="workload-heading">{text('從你要完成的工作，找到配置方向。', 'Start with the work you need to complete.')}</h2><p>{text('GPU 張數是一項配置條件，不是軟體效能的保證。先釐清軟體與資料如何使用 GPU，再把場地條件一起整理。', 'GPU count is a configuration choice, not a software-performance guarantee. Understand how the software and data use the GPUs, then bring site requirements into the decision.')}</p></div>
          <div className="comino-three">{workloads.map(item => <article className="comino-rule" key={item.title.en}><h3>{tx(item.title, isEnglish)}</h3><p>{tx(item.body, isEnglish)}</p><p className="comino-workload-note">{tx(item.note, isEnglish)}</p></article>)}</div>
          <p className="comino-condition">{text('H200、RTX PRO 6000 Blackwell 或 GeForce RTX 5090 都要放回完整系統評估；GPU 型號本身不決定部署場所。CPU 平台、GPU 間通訊、記憶體與擴充需求，依實際工作負載逐項確認。', 'Evaluate H200, RTX PRO 6000 Blackwell and GeForce RTX 5090 within the complete system; a GPU model alone does not determine the deployment site. Review CPU platform, inter-GPU communication, memory and expansion against the workload.')}</p>
        </div>
      </section>

      <section className="comino-section comino-tint" aria-labelledby="operations-heading">
        <div className="comino-wrap"><div className="comino-intro"><p className="comino-eyebrow">{text('長期使用與維護', 'Everyday operation')}</p><h2 id="operations-heading">{text('不只看滿載能力，也要看每天怎麼管理。', 'Plan for everyday operation, not only peak load.')}</h2><p>{text('原廠文件展示冷卻狀態監控、快速斷開接頭與不同電源設計。EudTech 會依選定機型，把監控方式、維護責任、保固與支援範圍列入交付確認。', 'Manufacturer documentation shows cooling-system monitoring, quick-disconnect couplings and different power designs. EudTech confirms monitoring, maintenance responsibilities, warranty and support for the selected system.')}</p></div>
          <div className="comino-explainer"><StoryFigure src={kit + 'monitoring-qdc.webp'} alt={{ zh: '原廠實照：左上工作站散熱器、右上電源模組、左下監控畫面、右下快速斷開接頭', en: 'Manufacturer images: workstation radiator at upper left, power modules at upper right, monitoring at lower left and quick-disconnect couplings at lower right' }} caption={{ zh: 'Sales Kit 0911 原廠實照。左下為監控、右下為 QDC、右上為電源模組。', en: 'Sales Kit 0911 manufacturer images. Lower left: monitoring; lower right: QDC; upper right: power modules. Original labels are in Chinese.' }} isEnglish={isEnglish} /><div className="comino-operation-notes">{operations.map(item => <article key={item.title.en}><h3>{tx(item.title, isEnglish)}</h3><p>{tx(item.body, isEnglish)}</p></article>)}</div></div>
        </div>
      </section>

      <section className="comino-section" aria-labelledby="delivery-heading">
        <div className="comino-wrap"><div className="comino-intro"><p className="comino-eyebrow">Comino × EudTech</p><h2 id="delivery-heading">{text('從原廠配置，到台灣現場的部署與驗收。', 'From the manufacturer’s configuration to deployment in Taiwan.')}</h2><p>{text('Comino 提供硬體與液冷系統設計；EudTech 承接在地需求、配置審查與交付討論，讓使用端、資訊端與採購端能對齊同一份資料。', 'Comino provides the hardware and liquid-cooling system design. EudTech handles local requirements, configuration review and delivery planning so users, IT and procurement work from the same information.')}</p></div>
          <ol className="comino-delivery">{stages.map((item, index) => <li key={item.title.en}><span className="comino-number">0{index + 1}</span><h3>{tx(item.title, isEnglish)}</h3><p>{tx(item.body, isEnglish)}</p></li>)}</ol>
          <p className="comino-small">{text('實際供貨、安裝、測試與支援項目，以正式報價及約定範圍為準。', 'Actual supply, installation, testing and support are defined by the formal quotation and agreed scope.')}</p>
          <div className="comino-sources"><span>{text('進一步查證', 'Further reading')}</span>{[VENDOR_EVIDENCE.comino.sources.blackwell, VENDOR_EVIDENCE.comino.sources.server, VENDOR_EVIDENCE.comino.sources.downloads].map(source => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{tx(source.label, isEnglish)}</a>)}</div>
        </div>
      </section>

      <section className="comino-section comino-final" aria-labelledby="next-heading"><div className="comino-wrap">
        <div className="comino-intro"><p className="comino-eyebrow">{text('開始規劃', 'Plan your next step')}</p><h2 id="next-heading">{text('告訴我們要跑什麼、放哪裡。', 'Tell us what you need to run and where it will operate.')}</h2><p>{text('已有配置方向，可以直接使用配置器；尚未確定時，先提供軟體、GPU 需求、連續運作時間、場地與預算範圍。EudTech 協助整理下一步需要確認的條件。', 'Use the configurator if you already have a specification. Otherwise, share your software, GPU requirements, run time, site and budget range. EudTech helps identify what needs to be confirmed next.')}</p>{actions}</div>
        <div className="comino-retrofit"><h3>{text('已有設備？評估液冷改裝的可行性。', 'Already own the hardware? Assess a liquid-cooling retrofit.')}</h3><p>{text('提供現有硬體、機箱與用途，先確認相容性、施工範圍與保固影響，再評估是否適合改裝。', 'Share your existing hardware, chassis and use case. Compatibility, modification scope and warranty implications must be reviewed before proposing a retrofit.')}</p><Link to="/contact">{text('討論既有設備', 'Discuss existing hardware')}</Link></div>
      </div></section>
    </div>
  </PageShell>;
};
export default AiInfrastructureSolutionPage;
