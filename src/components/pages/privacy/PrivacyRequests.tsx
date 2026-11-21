import React from 'react';
import { useLanguageContext } from '../../../contexts/LanguageContext';
import { CheckList } from '../SitePagePrimitives';
const PrivacyRequests: React.FC=()=>{
 const {isEnglish}=useLanguageContext();
 const items=[{zh:'詢價及業務紀錄依服務、契約、稽核與法令遵循需要保存；目的消失後會刪除或去識別化。',en:'Quote and business records are retained for service, contract, audit, and legal needs, then deleted or de-identified when the purpose ends.'},{zh:'來源證據與詢價事件分開保存，避免只用姓名、公司或學校身分推測來源。',en:'Source evidence and quote events are kept separately; source is not inferred from a name, company, or affiliation alone.'},{zh:'使用存取控制、傳輸保護、事件去重與操作紀錄降低未授權使用風險。',en:'Access control, transport protection, event deduplication, and operation records reduce unauthorised-use risk.'},{zh:'如需查詢、更正、停止使用或刪除網站資料，請透過聯絡頁提出。',en:'For access, correction, restriction, or deletion requests about website data, use the contact page.'}];
 return <section><h2 className="text-2xl font-bold">{isEnglish?'Retention, security, and requests':'保存、安全與資料請求'}</h2><CheckList isEnglish={isEnglish} items={items}/><p className="mt-4"><a className="text-cyan-700 underline dark:text-cyan-300" href="/contact">{isEnglish?'Contact EudTech':'聯絡 EudTech'}</a></p><p className="mt-8 text-sm text-slate-500 dark:text-slate-400">{isEnglish?'Effective date: 16 August 2026.':'生效日期：2026 年 8 月 16 日。'} {isEnglish?'This notice may change when data handling or service providers change.':'資料處理方式或服務提供者變更時，本說明會更新。'}</p></section>;
};
export default PrivacyRequests;
