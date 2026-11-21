import React from 'react';
import { useLanguageContext } from '../../../contexts/LanguageContext';
const DigitalTwinPrivacyData: React.FC=()=>{
 const {isEnglish}=useLanguageContext();
 const items=isEnglish?['System metrics: CPU use, memory use, and storage capacity.','Running app names and visible window app names, titles, and positions.','A UTF-8 plain-text file up to 1 MB only when you choose to open it.']:['系統指標：CPU 使用率、記憶體使用量與儲存容量。','執行中 App 名稱，以及可見視窗的 App 名稱、標題與位置。','只有你選擇開啟時，才讀取不超過 1 MB 的 UTF-8 純文字檔。'];
 return <><p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{isEnglish?'Digital Twin OS reads the following information on your Mac to display system status:':'Digital Twin OS 會在你的 Mac 本機讀取下列資訊，以顯示系統狀態：'}</p><ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-600 dark:text-slate-300">{items.map(x=><li key={x}>{x}</li>)}</ul><p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{isEnglish?'Its built-in commands can display the current date, device name, account name, current directory, or text you enter. They do not run arbitrary shell commands.':'內建指令可顯示日期、裝置名稱、帳號名稱、目前目錄或你輸入的文字，不會執行任意 shell 指令。'}</p></>;
};
export default DigitalTwinPrivacyData;
