import React from 'react';
import { SiteLink as Link } from '../common/SiteLink';
import reference from '../../data/cominoProcurement.json';
import conformity from '../../data/cominoConformity.json';
import { tx } from './SitePagePrimitives';
import { cominoQuestionSource } from '../../utils/seo/cominoQuestions';

const CominoProcurementSection: React.FC<{ isEnglish: boolean }> = ({ isEnglish }) => {
  const text = (zh: string, en: string) => isEnglish ? en : zh;

  return <section id="procurement" className="comino-section comino-tint comino-procurement" aria-labelledby="procurement-heading">
    <div className="comino-wrap">
      <div className="comino-intro">
        <p className="comino-eyebrow">{tx(reference.title, isEnglish)}</p>
        <h2 id="procurement-heading">{text('把設備特色，轉成可查證的需求與驗收。', 'Turn system features into verifiable requirements.')}</h2>
        <p>{text('供使用單位、資訊人員與採購人員共同研議：從散熱、維護、監控及場地需求出發，再核對實際配置與原廠文件。', 'For users, IT and procurement teams: start with cooling, service, monitoring and site requirements, then review the actual build and manufacturer documentation.')}</p>
        <p className="comino-small">{text('文件查核日期：', 'Documents reviewed: ')}<time dateTime={reference.reviewedAt}>{reference.reviewedAt}</time></p>
      </div>

      <p className="comino-small">{tx(reference.translationNote, isEnglish)} {text('翻譯日期：', 'Translation date: ')}<time dateTime={reference.translatedAt}>{reference.translatedAt}</time></p>
      <div className="comino-document-grid" aria-label={text('原廠文件與中文譯本', 'Manufacturer documents')}>
        {reference.documents.map(document => <article className="comino-document" key={document.id}>
          <p className="comino-eyebrow">{document.version} · {tx(document.language, isEnglish)}</p>
          <h3>{tx(document.title, isEnglish)}</h3>
          <p>{tx(document.description, isEnglish)}</p>
          <div className="comino-document-links">
            {!isEnglish && <a href={document.readerHrefZh}>線上閱讀繁體中文版</a>}
            <a href={isEnglish ? document.href : document.hrefZh} download>{text('下載繁體中文版 PDF', 'Download manufacturer PDF')}</a>
            <a href={document.source} target="_blank" rel="noreferrer">{text('查看原廠英文原文', 'View manufacturer source')}</a>
          </div>
        </article>)}
      </div>

      <section id="model-declarations" aria-labelledby="model-declarations-heading">
        <h3 id="model-declarations-heading" className="comino-reference-heading">{tx(conformity.title, isEnglish)}</h3>
        <p>{tx(conformity.intro, isEnglish)}</p>
        <p className="comino-condition">{tx(conformity.translationBoundary, isEnglish)}</p>
        <div className="comino-document-grid" aria-label={text('Comino 型號別符合性聲明', 'Comino model-specific declarations')}>
          {conformity.documents.map(document => <article className="comino-document" key={document.id}>
            <p className="comino-eyebrow">{document.kind} · {document.date}</p>
            <h4 className="text-lg font-semibold">{tx(document.title, isEnglish)}</h4>
            <p><strong>{text('型號：', 'Model: ')}</strong>{document.model}<br/><strong>{text('子型號：', 'Submodels: ')}</strong>{document.submodels.join(' · ')}</p>
            <p>{tx(document.summary, isEnglish)}</p>
            <div className="comino-document-links">
              {!isEnglish && <a href={document.readerHrefZh}>閱讀繁中關鍵欄位查閱稿</a>}
              {!isEnglish && <a href={document.hrefZh} download>下載繁中查閱稿 PDF</a>}
              <a href={document.source} target="_blank" rel="noreferrer">{text('原廠英文 PDF 網址', 'Manufacturer PDF URL')}</a>
            </div>
          </article>)}
        </div>
        <p className="comino-condition"><strong>{text('FCC 證據邊界：', 'FCC evidence boundary: ')}</strong>{tx(conformity.fccBoundary, isEnglish)}</p>
      </section>

      <article id="lawful-procurement-specification" className="comino-document scroll-mt-28">
        <p className="comino-eyebrow">{text('政府採購規格形成方式', 'How to form public-procurement requirements')}</p>
        <h3>{text('先證明需要，再寫功能、效益與驗收門檻', 'Establish the need first, then state functions, outcomes and acceptance thresholds')}</h3>
        <p>{text('以下內容供公開市場調查與需求研議，不是特定標案的代擬招標文件，也不保證任何條件可直接複製。機關應先保存工作負載、場地限制、預算與替代方案比較，再選用與目的相稱且可驗收的條件。符合的廠商家數不是判斷有無限制競爭的唯一標準。', 'The material below supports open market research and requirement development. It is not a tender document drafted for a particular procurement, and no condition is represented as safe to copy without review. The agency should first retain its workload, site constraints, budget and comparison of alternatives, then select proportionate and testable conditions. The number of suppliers that can comply is not by itself the test for whether competition is restricted.')}</p>
        <ol>
          <li>{text('需求紀錄：寫明模型、精度、資料量、併發、訓練或推論時限，以及現場電力、空調、機櫃與維護限制。', 'Need record: state the model, precision, data volume, concurrency, training or inference deadline, plus site power, room cooling, rack and service constraints.')}</li>
          <li>{text('市場調查：比較可達成相同目的的完整整機、其他 GPU 數量或容量，以及不同冷卻架構；記錄採用或排除的理由。', 'Market research: compare complete systems, alternative GPU counts or capacities, and cooling architectures that can achieve the same purpose; record the reason for including or excluding each route.')}</li>
          <li>{text('規格文字：優先寫可量測的功能、效益、介面與場地結果。只有無法精確描述時，才引用品牌或型號，並依採購法處理同等品及審查基準。', 'Requirement wording: prefer measurable functions, outcomes, interfaces and site results. Refer to a brand or model only where the requirement cannot otherwise be described precisely, and apply the statutory equivalent-product and evaluation rules.')}</li>
          <li>{text('驗收設計：在公告前定義測試資料、環境溫度、工作負載、測試時數、效能門檻及失敗判定，並對所有投標方案使用相同方法。', 'Acceptance design: before publication, define test data, ambient temperature, workload, duration, performance thresholds and failure criteria, and apply the same method to all offered solutions.')}</li>
        </ol>
        <p className="comino-small">{text('若廠商實際為特定機關提供規劃、設計或代擬招標文件，後續參與同案須另依政府採購法施行細則第 38、39 條處理；公開網站資料不能取代機關的利益衝突與公平競爭判斷。', 'If a supplier actually provides planning, design or tender-document drafting for a specific agency, participation in the resulting procurement must be handled separately under Articles 38 and 39 of the Enforcement Rules. Public website material does not replace the agency’s conflict-of-interest and fair-competition determination.')}</p>
        <div className="comino-document-links">
          <a href="https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=A0030057&flno=26" target="_blank" rel="noreferrer">{text('政府採購法第 26 條', 'Government Procurement Act, Article 26')}</a>
          <a href="https://www.pcc.gov.tw/content/cp.aspx?lang=1&n=1B9564664158991B" target="_blank" rel="noreferrer">{text('工程會第 26 條執行注意事項', 'PCC implementation notes for Article 26')}</a>
          <a href="https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=A0030058&flno=38" target="_blank" rel="noreferrer">{text('施行細則第 38 條', 'Enforcement Rules, Article 38')}</a>
          <a href="https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=A0030058&flno=39" target="_blank" rel="noreferrer">{text('施行細則第 39 條', 'Enforcement Rules, Article 39')}</a>
        </div>
      </article>

      <article id="sealed-liquid-loop" className="comino-document scroll-mt-28">
        <p className="comino-eyebrow">{text('產品架構證據與需求檢核', 'Product architecture evidence and needs assessment')}</p>
        <h3>{text('密封式液冷迴路（Sealed Liquid Loop）', 'Sealed Liquid Loop')}</h3>
        <p>{text('冷卻液在密封管路內循環，由機內散熱器與風扇將熱排至周圍空氣。Comino 原廠八卡 RTX PRO 6000 GRANDO 頁面明列此設計，無須外接設施冷卻水；其他型號須以對應原廠文件確認。', 'Coolant circulates within sealed pipework, with an internal radiator and fans transferring heat to ambient air. Comino identifies this design for its eight-GPU RTX PRO 6000 GRANDO, without facility water connections; verify other models against their manufacturer documents.')}</p>
        <h4>{text('有場地必要性時的功能式規格範例', 'Outcome-based example where a documented site need exists')}</h4>
        <blockquote>{text('因部署場所無設施冷卻水介面，且不具備增設水路的條件，所報完整整機不得要求連接設施冷卻水。廠商應說明完整冷卻架構、設備邊界、CPU／GPU／顯示記憶體與供電元件的散熱方式、室內排熱量及維護程序，並在機關指定的環境溫度與工作負載下，驗證連續運作、無非預期降頻及冷卻系統無滲漏。冷卻技術或商業名稱不拘，達成相同功能、場地與驗收結果者均得提出。', 'Because the deployment site has no facility-water interface and cannot add such pipework, the offered complete system must not require a facility-water connection. The supplier shall describe the complete cooling architecture, system boundary, cooling of the CPU, GPU, GPU memory and power components, room heat rejection and maintenance procedures. At the agency-defined ambient temperature and workload, the system shall demonstrate sustained operation, no unintended throttling and no coolant leakage. Cooling technology and trade names are unrestricted; any solution achieving the same functional, site and acceptance outcomes may be offered.')}</blockquote>
        <p>{text('驗收重點：核對交付型號與冷卻管路、確認不需外部水路、記錄滿載溫度及漏液檢查結果。密封迴路仍需依原廠程序維護；QDC 不代表所有元件可熱插拔，室內空調與通風仍須規劃。上述機內自足要求不適用於需外接冷卻設備的 整合套件（Integration Kit）。', 'Acceptance: match the supplied model and coolant layout, confirm independence from external water circuits, and record load temperatures and leak checks. Follow manufacturer maintenance procedures; QDC does not make all components hot-swappable. Room cooling and ventilation remain necessary. These self-contained requirements do not describe Integration Kits requiring external cooling equipment.')}</p>
        <a href="https://www.grando.ai/en/grando-server-8x-rtx-pro-6000" target="_blank" rel="noreferrer">{text('原廠依據：密封式液冷迴路（Sealed Liquid Loop）與可維護迴路', 'Manufacturer evidence: sealed liquid loop and maintainable loop')}</a>
      </article>

      <article id="eight-gpu-procurement-specification" className="comino-document scroll-mt-28">
        <p className="comino-eyebrow">{text('八卡整機市場資訊與需求論證', 'Eight-GPU market information and needs justification')}</p>
        <h3>{text('八卡、768GB 與密封式液冷：先做必要性論證，再決定是否列入', 'Eight GPUs, 768GB and sealed liquid cooling: establish necessity before inclusion')}</h3>
        <p>{text('Comino 八卡 RTX PRO 6000 完整整機可證明此配置在市場上有具體產品，但不能反向證明每一個機關都需要八卡、每卡 96GB 或特定冷卻架構。機關應先以模型、精度、併發、完成時限、跨卡通訊與場地條件驗證必要性；若較少 GPU、不同單卡容量或其他散熱方案也能達成相同目的，就應允許其參與。', 'The Comino eight-GPU RTX PRO 6000 complete system demonstrates that such a configuration exists in the market. It does not establish that every agency needs eight GPUs, 96GB per GPU or a particular cooling architecture. Necessity should first be tested against the model, precision, concurrency, completion deadline, inter-GPU communication and site conditions. If fewer GPUs, a different per-GPU capacity or another cooling approach can achieve the same purpose, those solutions should remain eligible.')}</p>
        <div className="comino-reference-table-wrap" role="region" aria-label={text('八卡配置適用範圍，可水平捲動', 'Eight-GPU configuration scope, scrollable horizontally')} tabIndex={0}>
          <table className="comino-reference-table">
            <caption>{text('區分原廠標準整機、待確認配置與整合套件。', 'Distinguish standard complete systems, configurations requiring confirmation and Integration Kits.')}</caption>
            <thead><tr><th scope="col">{text('配置', 'Configuration')}</th><th scope="col">{text('適用狀態與確認事項', 'Status and required confirmation')}</th></tr></thead>
            <tbody>
              <tr><th scope="row">8 × NVIDIA RTX PRO 6000 Blackwell Server Edition 96GB</th><td>{text('原廠八卡密封式液冷完整整機參考，配置器 #23；每卡 96GB，合計 768GB。報價仍須核對當次型號、BOM 與原廠文件。', 'Manufacturer-standard eight-GPU sealed-liquid-loop complete-system reference, configurator #23: 96GB per GPU, 768GB total. Verify the quoted model, BOM and manufacturer documents for each offer.')} <a href="https://www.grando.ai/en/grando-server-8x-rtx-pro-6000" target="_blank" rel="noreferrer">{text('原廠八卡產品頁', 'Manufacturer eight-GPU product page')}</a></td></tr>
              <tr><th scope="row">RTX A6000 / RTX 6000 Ada / RTX PRO 6000 Blackwell / A40 / L40S / A100 / H100 / H200</th><td>{text('GRANDO Server 規格書列出的 GPU／運算卡系列，最高八卡須依當次主機板、冷頭、供電與散熱配置向原廠確認；不能把系列清單當成每款都已確認的八卡標準整機。', 'GPU/accelerator families listed in the GRANDO Server datasheet. An up-to-eight-GPU configuration requires manufacturer confirmation of the motherboard, cold plates, power and cooling for the offered build; the family list does not establish every model as a confirmed standard eight-GPU complete system.')}</td></tr>
              <tr><th scope="row">8 × GeForce RTX 5090</th><td>{text('以專案配置評估，報價前取得原廠對八卡完整整機及冷卻架構的書面確認。', 'Evaluate as a project configuration and obtain written manufacturer confirmation of the complete eight-GPU system and cooling architecture before quotation.')}</td></tr>
              <tr><th scope="row">Radeon PRO W7900 / Radeon AI PRO R9700</th><td>{text('公開預設配置包含六卡 R9700 工作站，W7900 亦屬工作站選項；不能直接視為八卡 GRANDO Server 標準選項，數量與整機架構另案確認。', 'Published presets include a six-GPU R9700 workstation; W7900 is also a workstation option. These must not be treated as standard eight-GPU GRANDO Server options; confirm GPU count and complete-system architecture separately.')}</td></tr>
              <tr><th scope="row">8 × H200 Integration Kit</th><td>{text('整合套件與機內自足的密封式液冷完整整機具有不同設備邊界，可能需要外接冷卻設備。機關應依已論證的場地條件與相同驗收門檻比較；H200 供貨與交期均須取得原廠當次書面確認。', 'An Integration Kit has a different system boundary from a self-contained sealed-liquid-loop complete system and may require external cooling equipment. Compare them under documented site conditions and the same acceptance thresholds. H200 availability and lead time both require current written manufacturer confirmation.')}</td></tr>
            </tbody>
          </table>
        </div>
        <h4>{text('優先採用的功能與效益規格範例', 'Preferred function-and-outcome specification example')}</h4>
        <blockquote>{text('所報系統應於機關指定之軟體環境，以指定模型、精度、輸入資料、併發量及測試時數，完成約定之訓練或推論工作，並達到事先公告的吞吐量、延遲、完成時間、穩定性及錯誤率門檻。廠商應提供完整整機型號、BOM、加速器數量與單卡記憶體、跨卡互連方式、功耗、冷卻架構及場地需求。加速器品牌、數量與冷卻技術不拘；達成相同功能、效益、相容性、場地限制與驗收結果者均得提出。', 'In the agency-defined software environment, the offered system shall complete the agreed training or inference workload using the specified model, precision, input data, concurrency and test duration, and meet the published thresholds for throughput, latency, completion time, stability and error rate. The supplier shall provide the complete-system model and BOM, accelerator count and memory per device, interconnect method, power draw, cooling architecture and site requirements. Accelerator brand, count and cooling technology are unrestricted; any solution achieving the same function, outcome, compatibility, site constraints and acceptance results may be offered.')}</blockquote>
        <h4>{text('八卡與每卡 96GB 確有必要時的附加條件', 'Additional condition only where eight GPUs and 96GB per device are demonstrably necessary')}</h4>
        <blockquote>{text('經需求分析確認，指定工作須同時使用八個獨立 GPU 執行單元，且每一執行單元須容納超過較低容量方案可承載的模型分片或資料集，因此要求至少八張 GPU、每張可用顯示記憶體至少 96GB。機關應將上述工作負載、容量計算、跨卡分配方式及替代方案比較納入需求紀錄，並以相同測試驗證所有投標方案；若投標方案以不同架構達成相同功能與效益，應依公告之同等性基準審查。', 'The agency’s needs analysis has established that the specified workload requires eight independent GPU execution units concurrently and that each unit must hold a model shard or data set larger than lower-capacity alternatives can accommodate. The requirement is therefore at least eight GPUs with at least 96GB of usable memory per GPU. The agency should retain the workload, capacity calculation, multi-GPU allocation method and comparison of alternatives in its need record, and validate every bid with the same test. A different architecture achieving the same function and outcome should be assessed under the published equivalence criteria.')}</blockquote>
        <p className="comino-small">{text('768GB 是八張 GPU 記憶體容量的總和，不代表單一共享記憶體，也不保證任一模型可直接使用全部容量。應另訂工作負載、框架相容性及跨卡通訊需求，並以實測確認。機內散熱仍會將熱排入室內，空調、通風與供電容量須一併評估。', '768GB is the sum of memory across eight GPUs, not a single shared memory pool or a guarantee that any model can use the full capacity directly. Specify workload, framework compatibility and inter-GPU communication requirements separately, and verify them by testing. Internal heat rejection still releases heat into the room; assess room cooling, ventilation and power capacity together.')}</p>
        <div className="comino-document-links">
          <a href="https://faq.comino.com/datasheets/datasheet_comino_grando_server.pdf#page=5" target="_blank" rel="noreferrer">{text('GRANDO Server 原廠規格書第 5 頁', 'Manufacturer GRANDO Server datasheet, page 5')}</a>
          <a href="https://configurator.grando.ai/" target="_blank" rel="noreferrer">{text('原廠配置器', 'Manufacturer configurator')}</a>
          <a href="https://www.comino.com/en/ai-configurator" target="_blank" rel="noreferrer">{text('原廠 AI 配置頁', 'Manufacturer AI configuration page')}</a>
        </div>
      </article>

      <h3 className="comino-reference-heading">{text('可供規格研議的功能與證據', 'Functions and evidence for specification review')}</h3>
      <div className="comino-reference-table-wrap" role="region" aria-label={text('功能與驗收參考表，可水平捲動', 'Functions and acceptance reference table, scrollable horizontally')} tabIndex={0}>
        <table className="comino-reference-table">
          <caption>{text('依實際需求選用，並以交付配置驗證。', 'Select criteria by need and verify the supplied configuration.')}</caption>
          <thead><tr><th scope="col">{text('編號', 'No.')}</th><th scope="col">{text('需求方向', 'Requirement')}</th><th scope="col">{text('可研議的要求', 'Suggested review')}</th><th scope="col">{text('證據與驗收', 'Evidence and acceptance')}</th></tr></thead>
          <tbody>{reference.criteria.map((criterion, index) => {
            const document = reference.documents.find(item => item.id === criterion.documentId);
            return <tr key={criterion.id}>
              <td>{index + 1}</td>
              <th scope="row">{tx(criterion.title, isEnglish)}</th>
              <td>{tx(criterion.requirement, isEnglish)}</td>
              <td>{tx(criterion.evidence, isEnglish)}{document && <a href={isEnglish ? `${document.href}#page=${criterion.page}` : `${document.readerHrefZh}#page-${criterion.page}`} target="_blank" rel="noreferrer">{text('中文譯本', 'Manufacturer document')} · {text('第 ', 'pp. ')}{criterion.pages}{text(' 頁', '')}</a>}</td>
            </tr>;
          })}</tbody>
        </table>
      </div>

      <details className="comino-details">
        <summary>{text('引用最高值前，先核對這些條件', 'Check these conditions before citing maximum values')}</summary>
        <dl className="comino-spec-conditions">
          <div><dt>{text('冷卻能力', 'Cooling capacity')}</dt><dd>{tx(reference.specs.cooling, isEnglish)}</dd></div>
          <div><dt>{text('電源與備援', 'Power and redundancy')}</dt><dd>{tx(reference.specs.power, isEnglish)}</dd></div>
          <div><dt>{text('噪音', 'Noise')}</dt><dd>{tx(reference.specs.noise, isEnglish)}</dd></div>
          <div><dt>{text('環境溫度', 'Temperature')}</dt><dd>{tx(reference.specs.temperature, isEnglish)}</dd></div>
        </dl>
        <p className="comino-small">{text('中文 PDF 與英文原文頁碼一致；上述摘要補充引用時的條件。改裝套件的效能、節能與環境溫度宣稱，需以改裝後整機、外部冷卻設備及實測條件確認。', 'Manufacturer PDFs retain their original wording; the summary clarifies conditions for citation. Performance, energy-saving and temperature claims for retrofit kits require the complete modified system, external cooling equipment and test conditions.')}</p>
      </details>

      <p className="comino-condition">{tx(reference.conformityNote, isEnglish)}</p>
      <p className="comino-small">{tx(reference.procurementNote, isEnglish)} <a href={reference.procurementSource} target="_blank" rel="noreferrer">{text('政府採購法第 26 條', 'Government Procurement Act, Article 26')}</a></p>
      <section id="procurement-questions" aria-labelledby="procurement-questions-heading">
        <h3 id="procurement-questions-heading" className="comino-reference-heading">{text('採購常見問題', 'Procurement questions')}</h3>
        <p className="comino-small">{text('以下為 EudTech 依原廠資料整理的選型解讀；請連同引用頁面、實際型號與 BOM 核對。', 'EudTech selection guidance based on manufacturer documents. Review each cited page together with the actual model and BOM.')}</p>
        <div className="comino-document-grid">
          {reference.faqs.map(faq => <article id={faq.id} className="comino-document scroll-mt-28" key={faq.id}>
            <h4 className="text-lg font-semibold">{tx(faq.question, isEnglish)}</h4>
            <p>{tx(faq.answer, isEnglish)}</p>
            <div className="comino-document-links">
              <a href={cominoQuestionSource(faq.documentId, faq.page, isEnglish)}>{text('核對規格書第 ', 'Review datasheet p. ')}{faq.page}{text(' 頁', '')}</a>
              <a href={`#${faq.id}`} aria-label={`${text('此問答的連結：', 'Link to this answer: ')}${tx(faq.question, isEnglish)}`}>{text('問答連結', 'Link to answer')}</a>
            </div>
          </article>)}
        </div>
      </section>
      <div className="comino-actions"><Link to="/contact" className="comino-button">{text('取得產品資料與配置證據', 'Request product and configuration evidence')}</Link><Link to="/solutions/gpu-server-rfq-checklist/" className="comino-button comino-button-secondary">{text('查看 RFQ 檢核表', 'View the RFQ checklist')}</Link></div>
    </div>
  </section>;
};

export default CominoProcurementSection;
