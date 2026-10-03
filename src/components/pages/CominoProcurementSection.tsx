import React from 'react';
import reference from '../../data/cominoProcurement.json';
import { tx } from './SitePagePrimitives';

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

      <div className="comino-document-grid" aria-label={text('原廠文件', 'Manufacturer documents')}>
        {reference.documents.map(document => <article className="comino-document" key={document.id}>
          <p className="comino-eyebrow">{document.version} · {tx(document.language, isEnglish)}</p>
          <h3>{tx(document.title, isEnglish)}</h3>
          <p>{tx(document.description, isEnglish)}</p>
          <div className="comino-document-links">
            <a href={document.href} download>{text('下載原廠 PDF', 'Download manufacturer PDF')}</a>
            <a href={document.source} target="_blank" rel="noreferrer">{text('查看原廠來源', 'View manufacturer source')}</a>
          </div>
        </article>)}
      </div>

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
              <td>{tx(criterion.evidence, isEnglish)}{document && <a href={`${document.href}#page=${criterion.page}`} target="_blank" rel="noreferrer">{text('原廠文件', 'Manufacturer document')} · {text('第 ', 'pp. ')}{criterion.pages}{text(' 頁', '')}</a>}</td>
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
        <p className="comino-small">{text('原廠 PDF 保留原文；上述摘要補充引用時的條件。改裝套件的效能、節能與環境溫度宣稱，需以改裝後整機、外部冷卻設備及實測條件確認。', 'Manufacturer PDFs retain their original wording; the summary clarifies conditions for citation. Performance, energy-saving and temperature claims for retrofit kits require the complete modified system, external cooling equipment and test conditions.')}</p>
      </details>

      <p className="comino-condition">{tx(reference.conformityNote, isEnglish)}</p>
      <p className="comino-small">{tx(reference.procurementNote, isEnglish)} <a href={reference.procurementSource} target="_blank" rel="noreferrer">{text('政府採購法第 26 條', 'Government Procurement Act, Article 26')}</a></p>
      <div className="comino-actions"><a href="/contact" className="comino-button">{text('討論採購需求與文件', 'Discuss requirements and documents')}</a><a href="/solutions/gpu-server-rfq-checklist/" className="comino-button comino-button-secondary">{text('查看 RFQ 檢核表', 'View the RFQ checklist')}</a></div>
    </div>
  </section>;
};

export default CominoProcurementSection;
