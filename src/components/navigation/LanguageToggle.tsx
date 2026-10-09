import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { languagePath } from '../../utils/seo/languageUrl';

interface LanguageToggleProps {
  isEnglish: boolean;
  toggleLanguage: () => void;
  textColorClass: string;
  mobile?: boolean;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  isEnglish, 
  toggleLanguage, 
  textColorClass,
  mobile = false 
}) => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Static HTML has no request query or fragment. Apply them after hydration
  // so opening the language link in a new tab retains the full destination.
  const destination = `${location.pathname}${mounted ? location.search + location.hash : ''}`;
  return (
    <a
      href={languagePath(destination, !isEnglish)}
      onClick={(event) => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); toggleLanguage(); } }}
      aria-label={isEnglish ? 'Switch to Chinese / 切換至中文' : 'Switch to English / 切換至英文'}
      className={`flex items-center ${mobile ? 'mr-2' : ''} ${textColorClass} ${mobile ? 'p-1' : 'px-3 py-2'} rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2`}
    >
      <Globe size={mobile ? 20 : 18} className="mr-1" />
      {isEnglish ? '中文' : 'EN'}
    </a>
  );
};

export default LanguageToggle;
