import React from 'react';
import { Globe } from 'lucide-react';

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
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={isEnglish ? 'Switch to Chinese / 切換至中文' : 'Switch to English / 切換至英文'}
      className={`flex items-center ${mobile ? 'mr-2' : ''} ${textColorClass} ${mobile ? 'p-1' : 'px-3 py-2'} rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2`}
    >
      <Globe size={mobile ? 20 : 18} className="mr-1" />
      {isEnglish ? '中文' : 'EN'}
    </button>
  );
};

export default LanguageToggle;
