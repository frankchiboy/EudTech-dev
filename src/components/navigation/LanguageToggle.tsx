import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  isEnglish: boolean;
  toggleLanguage: () => void;
  isScrolled: boolean;
  mobile?: boolean;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  isEnglish, 
  toggleLanguage, 
  isScrolled, 
  mobile = false 
}) => {
  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center ${mobile ? 'mr-2' : ''} ${
        isScrolled 
          ? 'text-neutral-800 dark:text-neutral-100 hover:text-eudtech-700 dark:hover:text-eudtech-400'
          : 'text-white hover:text-eudtech-200 dark:text-gray-100 dark:hover:text-eudtech-300'
      } ${mobile ? 'p-1' : 'px-3 py-2'} rounded-md text-sm font-medium transition-colors duration-200`}
    >
      <Globe size={mobile ? 20 : 18} className="mr-1" />
      {isEnglish ? '中文' : 'EN'}
    </button>
  );
};

export default LanguageToggle;