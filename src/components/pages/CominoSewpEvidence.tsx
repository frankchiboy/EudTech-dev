import React from 'react';

const lookupUrl = 'https://www.sewp.nasa.gov/sewpv/sewp5public/provider';
const recordUrl = `${lookupUrl}/getProviderItemDetails/22067/7/10/0/0`;

/** A dated, configuration-specific catalogue record; not a brand certification. */
export default function CominoSewpEvidence({ isEnglish }: { isEnglish: boolean }) {
  const text = (zh: string, en: string) => isEnglish ? en : zh;

  return <section id="nasa-sewp" className="comino-sewp" aria-labelledby="sewp-heading">
    <header className="comino-sewp-heading">
      <div>
        <p className="comino-eyebrow">{text('可公開查核的採購紀錄', 'Publicly verifiable procurement record')}</p>
        <h3 id="sewp-heading">{text('Comino RM V2S：NASA SEWP 列載的 TAA 合規配置', 'Comino RM V2S: a TAA-compliant configuration listed in NASA SEWP')}</h3>
        <p>{text('NASA 管理的美國政府 IT 採購型錄，列有由 Blue Tech 提供的這筆 Comino 產品。以下依官方查詢結果整理。', 'NASA’s U.S. government IT procurement catalog lists this Comino product through Blue Tech. The record below is transcribed from its public lookup.')}</p>
      </div>
      <p className="comino-sewp-date">{text('查核日期', 'Verified on')}<br /><time dateTime="2026-10-04">2026-10-04</time></p>
    </header>

    <div className="comino-sewp-record">
      <div className="comino-sewp-product">
        <p className="comino-sewp-label">Comino Holding Ltd.</p>
        <h4>Comino RM V2S</h4>
        <p>{text('液冷伺服器平台', 'Liquid-cooled server platform')}</p>
        <dl className="comino-sewp-identifiers">
          <div><dt>{text('料號', 'Part number')}</dt><dd>D9612</dd></div>
          <div><dt>{text('合約商', 'Contract holder')}</dt><dd>Blue Tech</dd></div>
          <div><dt>{text('型錄項目（CLIN）', 'Catalog line item (CLIN)')}</dt><dd>BTD9612-63615</dd></div>
        </dl>
      </div>
      <div className="comino-sewp-status">
        <p className="comino-sewp-label">{text('TAA 欄位', 'TAA field')}</p>
        <p className="comino-sewp-value"><span>C</span><strong>{text('列為合規', 'Listed as compliant')}</strong></p>
        <p>{text('適用於這筆型錄項目中的指定配置。', 'Applies to the specific configuration in this catalog line item.')}</p>
      </div>
    </div>

    <p className="comino-sewp-scope">{text('這是合約商在 NASA SEWP 型錄中申報的產品狀態，並非 NASA 核發的認證證書。其他 Comino／GRANDO 機型與客製配置，仍須逐案確認原產地及 TAA 聲明。', 'This is the product status reported by the contract holder in NASA SEWP, rather than a NASA-issued certificate. Other Comino/GRANDO models and custom configurations require their own origin and TAA documentation.')}</p>

    <div className="comino-actions">
      <a className="comino-button" href={lookupUrl} target="_blank" rel="noopener noreferrer">{text('前往 NASA 官方查詢', 'Open NASA’s official lookup')} ↗</a>
      <a className="comino-button comino-button-secondary" href={recordUrl} target="_blank" rel="noopener noreferrer">{text('查看該筆原始資料（JSON）', 'View this record’s source data (JSON)')} ↗</a>
    </div>
    <p className="comino-small comino-sewp-query-path">{text('官方查詢路徑：搜尋 Comino → Comino Holding Ltd. → Blue Tech → 產品項目。', 'Lookup path: search Comino → Comino Holding Ltd. → Blue Tech → product item.')}</p>

    <details className="comino-details comino-sewp-details">
      <summary>{text('展開配置與其他型錄欄位', 'Show configuration and other catalog fields')}</summary>
      <div className="comino-details-content">
        <p>{text('本筆配置：Threadripper 3970X、32 GB DDR4、2 TB NVMe、1 張 NVIDIA RTX 3080、4U 機殼。此歷史型號用於說明可查核紀錄；現行需求另行選型。', 'Listed configuration: Threadripper 3970X, 32 GB DDR4, 2 TB NVMe, one NVIDIA RTX 3080 and a 4U enclosure. This earlier-generation configuration illustrates the verifiable record; current requirements need separate sizing.')}</p>
        <dl className="comino-sewp-fields">
          <div><dt>EPEAT</dt><dd>NC · {text('型錄標示不符合', 'Listed as non-compliant')}</dd></div>
          <div><dt>Energy Star</dt><dd>C · {text('型錄標示符合', 'Listed as compliant')}</dd></div>
          <div><dt>SCRM</dt><dd>N · {text('未授權，或無原廠授權計畫', 'Not authorized or no provider authorized program')}</dd></div>
          <div><dt>{text('SEWP 型錄價格', 'SEWP catalog price')}</dt><dd>US$10,200 · {text('非 EudTech 報價', 'Not an EudTech quotation')}</dd></div>
        </dl>
        <p className="comino-small">{text('各欄位分別表示不同狀態；EPEAT 的 NC 與 SCRM 的 N 不會改變這筆資料的 TAA 欄位 C。', 'These fields describe separate statuses. EPEAT’s NC and SCRM’s N do not change this record’s TAA field of C.')}</p>
        <div className="comino-sources"><a href="https://www.sewp.nasa.gov/documents/SEWP_FAQs.pdf" target="_blank" rel="noopener noreferrer">{text('NASA SEWP FAQ：型錄與 TAA 說明（英文 PDF）', 'NASA SEWP FAQ: catalog and TAA guidance (PDF)')} ↗</a></div>
      </div>
    </details>
  </section>;
}
