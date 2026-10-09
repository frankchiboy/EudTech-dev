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

      <h3 className="comino-reference-heading">{text('可供規格研議的功能與證據', 'Functions and evidence for specification review')}</h3>
      <div className="comino-reference-table-wrap" role="region" aria-label={text('功能與驗收參考表，可水平捲動', 'Functions and acceptance reference table, scrollable horizontally')} tabIndex={0}>
        <table className="comino-reference-table">
          <caption>{text('依實際需求選用，並以交付配置驗證。', 'Select criteria by need and verify the supplied configuration.')}</caption>
          <thead><tr><th scope="col">{text('需求方向', 'Requirement')}</th><th scope="col">{text('可研議的要求', 'Suggested review')}</th><th scope="col">{text('證據與驗收', 'Evidence and acceptance')}</th></tr></thead>
          <tbody>{reference.criteria.map(criterion => {
            const document = reference.documents.find(item => item.id === criterion.documentId);
            return <tr key={criterion.id}>
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
      <div className="comino-actions"><Link to="/contact" className="comino-button">{text('討論採購需求與文件', 'Discuss requirements and documents')}</Link><Link to="/solutions/gpu-server-rfq-checklist/" className="comino-button comino-button-secondary">{text('查看 RFQ 檢核表', 'View the RFQ checklist')}</Link></div>
    </div>
  </section>;
};

export default CominoProcurementSection;
