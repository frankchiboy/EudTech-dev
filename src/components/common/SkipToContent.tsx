import React from 'react';
import { useLanguageContext } from '../../contexts/LanguageContext';

const SkipToContent: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200"
    >
      {isEnglish ? 'Skip to main content' : '跳到主要內容'}
    </a>
  );
};

export default SkipToContent;
