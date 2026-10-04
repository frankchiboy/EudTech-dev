import React from 'react';
import { Link } from 'react-router-dom';
import CominoSewpEvidence from './CominoSewpEvidence';

/** Manufacturer statements are distinct from configuration-specific procurement evidence. */
export default function CominoComplianceSection({ isEnglish }: { isEnglish: boolean }) {
  const text = (zh: string, en: string) => isEnglish ? en : zh;
  const topics = [
    {
      title: text('TAA 符合性', 'TAA compliance'),
      body: text('NASA SEWP 公開型錄將 Comino RM V2S 的 D9612 配置列為 TAA 合規，詳見下方查詢紀錄。採購時仍須核對實際供貨機型、原產地與符合性文件。', 'NASA SEWP’s public catalog lists the Comino RM V2S D9612 configuration as TAA compliant; see the record below. Review the actual supplied model, country of origin and compliance documentation for each purchase.'),
      evidence: text('確認文件：指定機型的原產地與 TAA 聲明。', 'Evidence to confirm: model-specific origin and TAA declarations.'),
    },
    {
      title: text('歐盟製造與系統整合', 'EU manufacturing and integration'),
      body: text('依原廠簡報，核心封閉式液冷模組與系統整合於歐盟完成。這項製造說明不代表所有零組件都來自歐盟；整機與關鍵零組件的產地須分別確認。', 'According to the manufacturer’s presentation, core closed-loop liquid-cooling modules and system integration are completed in the EU. This does not establish EU origin for every component; system and key-component origins require separate confirmation.'),
      evidence: text('確認文件：製造／整合地點、整機產地及關鍵零組件清單。', 'Evidence to confirm: manufacturing and integration locations, system origin and key-component list.'),
    },
    {
      title: text('降低供應鏈採購風險', 'Reduce supply-chain procurement risk'),
      body: text('對來源有限制的企業或政府採購，將禁限用條件、關鍵零組件與可追溯性納入配置審查。以實際 BOM 和供應商文件確認，不以品牌或組裝地推定全部符合。', 'For enterprise or government purchases with sourcing restrictions, review restricted sources, key components and traceability during configuration. Confirm against the actual BOM and supplier evidence rather than assuming compliance from the brand or assembly location.'),
      evidence: text('確認文件：BOM、來源限制對照與替代料變更約定。', 'Evidence to confirm: BOM, sourcing-restriction review and component-substitution terms.'),
    },
    {
      title: text('安全要求，落實到交付', 'Make security part of delivery'),
      body: text('面向高安全要求的使用環境，先定義管理介面、存取權限、韌體更新、維護責任與驗收項目。設備是否適用，仍需依機關或企業的安全政策逐案確認。', 'For security-sensitive environments, define management interfaces, access permissions, firmware updates, maintenance responsibilities and acceptance checks. Suitability must be assessed against the organisation’s security policy for each deployment.'),
      evidence: text('確認文件：安全需求、支援範圍與驗收紀錄。', 'Evidence to confirm: security requirements, support scope and acceptance records.'),
    },
  ];
  return <section id="compliance" className="comino-section comino-compliance" aria-labelledby="compliance-heading">
    <div className="comino-wrap">
      <div className="comino-intro">
        <p className="comino-eyebrow">{text('企業與政府採購 · 合規與信任', 'Enterprise & government procurement · Compliance & trust')}</p>
        <h2 id="compliance-heading">{text('採購信任，從製造來源到交付文件。', 'Procurement confidence, from manufacturing origin to delivery evidence.')}</h2>
        <p>{text('理解 Comino 提出的合規與製造優勢，再把採購條件落實到選定機型、配置與文件。EudTech 協助整理需求與原廠資料，讓採購審查有據可查。', 'Understand Comino’s stated compliance and manufacturing advantages, then tie procurement requirements to the selected model, configuration and documentation. EudTech helps organise requirements and manufacturer information for an evidence-based review.')}</p>
      </div>
      <div className="comino-two">{topics.map(topic => <article className="comino-rule" key={topic.title}>
        <h3>{topic.title}</h3><p>{topic.body}</p><p className="comino-small comino-compliance-evidence">{topic.evidence}</p>
      </article>)}</div>
      <p className="comino-condition">{text('TAA 不等於所有零件均為非中國製，也不是資安認證。原廠簡報的說明不取代指定配置的正式聲明，亦不代表自動符合所有政府標案；實際供貨與符合性須以採購條款及正式文件確認。', 'TAA compliance does not mean every component is made outside China, and it is not a cybersecurity certification. Manufacturer presentation statements do not replace declarations for a specific configuration or establish eligibility for every government tender. Confirm supply and compliance against the procurement terms and formal documentation.')}</p>
      <CominoSewpEvidence isEnglish={isEnglish} />
      <div className="comino-sources"><span>{text('資料依據', 'Source context')}</span><span className="comino-compliance-source">{text('Comino 原廠簡報〈Compliance & Trust〉；適用範圍須依機型確認。', 'Comino manufacturer presentation, “Compliance & Trust”; applicability requires model-specific confirmation.')}</span><a href="https://www.acquisition.gov/far/25.001" target="_blank" rel="noreferrer">{text('美國 FAR：貿易協定原產地規則（英文）', 'U.S. FAR: trade-agreement origin rules')}</a></div>
      <div className="comino-actions"><a className="comino-button" href="#procurement">{text('查看採購參考與文件', 'Review procurement references')}</a><Link className="comino-button comino-button-secondary" to="/contact">{text('討論採購條件', 'Discuss procurement requirements')}</Link></div>
    </div>
  </section>;
}
