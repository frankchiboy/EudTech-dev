import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  isEnglish: boolean;
  toggleLanguage: () => void;
  textColor: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  isEnglish,
  toggleLanguage,
  textColor
}) => {
  return (
    <button
      onClick={toggleLanguage}
      className={`${textColor} hover:opacity-80 flex items-center px-3 py-2 text-sm font-medium transition-all duration-200`}
    >
      <Globe size={16} className="mr-1" />
      {isEnglish ? '中文' : 'EN'}
    </button>
  );
};

export default LanguageToggle;