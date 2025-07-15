import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  isEnglish: boolean;
  toggleLanguage: () => void;
  isScrolled: boolean;
  textColorClass: string;
  mobile?: boolean;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  isEnglish, 
  toggleLanguage, 
  isScrolled, 
  textColorClass,
  mobile = false 
}) => {
  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center ${mobile ? 'mr-2' : ''} ${textColorClass} ${mobile ? 'p-1' : 'px-3 py-2'} rounded-md text-sm font-medium transition-colors duration-200`}
    >
      <Globe size={mobile ? 20 : 18} className="mr-1" />
      {isEnglish ? '中文' : 'EN'}
    </button>
  );
};

export default LanguageToggle;