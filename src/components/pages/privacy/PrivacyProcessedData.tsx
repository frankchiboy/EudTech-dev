import React from 'react';
import { useLanguageContext } from '../../../contexts/LanguageContext';
type B = { zh: string; en: string };
const rows: { c: B; e: B; p: B }[] = [
 { c:{zh:'聯絡與公司資料',en:'Contact and company data'}, e:{zh:'姓名、公司、工作 Email、電話',en:'Name, company, work email, phone'}, p:{zh:'確認需求、聯絡及提供服務',en:'Request review, contact, and service delivery'} },
 { c:{zh:'配置與需求資料',en:'Configuration and request data'}, e:{zh:'產品、數量、工作負載、配置連結與留言',en:'Products, quantities, workload, configuration URL, and message'}, p:{zh:'技術審查、報價與驗收規劃',en:'Technical review, quoting, and acceptance planning'} },
 { c:{zh:'來源與裝置事件',en:'Attribution and device events'}, e:{zh:'UTM、referrer、click ID、首次與最後有效來源',en:'UTM, referrer, click ID, first and last non-direct touch'}, p:{zh:'判斷管道、避免重複事件及改善網站',en:'Channel attribution, event deduplication, and site improvement'} },
];
const PrivacyProcessedData: React.FC = () => {
 const {isEnglish}=useLanguageContext(); const t=(x:B)=>isEnglish?x.en:x.zh;
 return <section><h2 className="text-2xl font-bold">{isEnglish?'Website information':'網站處理的資料'}</h2><p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{isEnglish?'Information submitted through the configurator or contact form is used to understand requests, prepare replies, and maintain related business records.':'透過配置器或聯絡表單提交的資料，用於理解需求、準備回覆及保存相關業務紀錄。'}</p><div className="mt-8 grid gap-4 md:grid-cols-3">{rows.map(r=><article key={r.c.zh} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"><h3 className="font-semibold">{t(r.c)}</h3><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{t(r.e)}</p><p className="mt-3 text-sm leading-6 text-slate-500">{t(r.p)}</p></article>)}</div></section>;
};
export default PrivacyProcessedData;
