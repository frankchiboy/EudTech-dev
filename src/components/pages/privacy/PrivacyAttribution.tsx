import React from 'react';
import { useLanguageContext } from '../../../contexts/LanguageContext';
const PrivacyAttribution: React.FC=()=>{
 const {isEnglish}=useLanguageContext();
 return <section><h2 className="text-2xl font-bold">{isEnglish?'Customer-source attribution':'客戶來源追蹤'}</h2><p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{isEnglish?'The website may record campaign parameters, referrers, advertising click identifiers, and a customer-selected source. Anonymous identifiers can connect a campaign click to a quote request. Personal email addresses are not placed in public URLs.':'網站可能記錄活動參數、來源頁、廣告 click ID 及客戶自填來源。匿名識別碼可將活動點選與詢價對應，不會把個人電子郵件放入公開網址。'}</p><p className="mt-4 rounded-xl bg-cyan-50 p-5 text-sm leading-7 text-cyan-950 dark:bg-cyan-950/30 dark:text-cyan-100">{isEnglish?'Browser attribution data may remain available for up to 90 days. Customer-provided source information is kept separately as supporting evidence.':'瀏覽器來源資料最多可保留 90 天；客戶自行填寫的來源會分開保存，作為補充證據。'}</p></section>;
};
export default PrivacyAttribution;
