import React from 'react';
import { useLanguageContext } from '../../../contexts/LanguageContext';
const DigitalTwinPrivacyHandling: React.FC=()=>{
 const {isEnglish}=useLanguageContext();
 return <div className="mt-6 space-y-4 rounded-2xl bg-cyan-50 p-6 text-sm leading-7 text-cyan-950 dark:bg-cyan-950/30 dark:text-cyan-100"><p>{isEnglish?'This information is processed on your Mac while the app runs. The app has no accounts, ads, or analytics, and does not send this information to EudTech or another server.':'上述資訊只在 App 執行期間於你的 Mac 本機處理。App 沒有帳號、廣告或分析功能，也不會將這些資訊傳送給 EudTech 或其他伺服器。'}</p><p>{isEnglish?'Opened document text stays in app memory. If you choose Save as New File, the app writes a new copy to the location you select and does not overwrite the source file.':'開啟的文件內容留在 App 記憶體中。你選擇另存新檔時，App 只在你選定的位置建立新副本，不覆寫原檔。'}</p><p>{isEnglish?'This section covers the Mac app only. Website visits and contact forms are covered by the website sections above. Effective date: 21 November 2026.':'本節只說明 Mac App；瀏覽網站與聯絡表單依本頁上方網站說明處理。生效日期：2026 年 11 月 21 日。'}</p></div>;
};
export default DigitalTwinPrivacyHandling;
