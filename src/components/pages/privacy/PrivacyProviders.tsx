import React from 'react';
import { useLanguageContext } from '../../../contexts/LanguageContext';
const PrivacyProviders: React.FC=()=>{
 const {isEnglish}=useLanguageContext();
 return <section><h2 className="text-2xl font-bold">{isEnglish?'Website service providers':'網站服務提供者'}</h2><p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{isEnglish?'EudTech may use hosting, analytics, Microsoft 365, email, and customer-record systems to operate its website and respond to requests. Access is limited to each service’s function. Information is not sold. Product-specific handling is described separately below.':'EudTech 可能使用網站託管、分析、Microsoft 365、郵件與客戶紀錄系統來營運網站及回覆需求。各服務只取得執行功能所需的資料。EudTech 不出售個人資料。產品處理方式另於下方說明。'}</p></section>;
};
export default PrivacyProviders;
