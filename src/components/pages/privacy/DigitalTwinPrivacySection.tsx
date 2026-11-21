import React from 'react';
import { useLanguageContext } from '../../../contexts/LanguageContext';
import DigitalTwinPrivacyData from './DigitalTwinPrivacyData';
import DigitalTwinPrivacyHandling from './DigitalTwinPrivacyHandling';
const DigitalTwinPrivacySection: React.FC=()=>{
 const {isEnglish}=useLanguageContext();
 return <section id="digital-twin-os" className="scroll-mt-24"><h2 className="text-2xl font-bold">{isEnglish?'Digital Twin OS for macOS':'Digital Twin OS macOS App'}</h2><DigitalTwinPrivacyData/><DigitalTwinPrivacyHandling/><p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{isEnglish?'For product privacy questions,':'產品隱私問題請'} <a className="text-cyan-700 underline dark:text-cyan-300" href="/contact">{isEnglish?'contact EudTech':'聯絡 EudTech'}</a>.</p></section>;
};
export default DigitalTwinPrivacySection;
