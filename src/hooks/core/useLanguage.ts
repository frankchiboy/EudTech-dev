import { useState } from 'react';
import { LANGUAGE_STORAGE_KEY } from '../../constants/index';
import { isEnglishPath, languagePath } from '../../utils/seo/languageUrl';

export const useLanguage = () => {
  // The URL is authoritative so every visitor and crawler sees the same language.
  const [isEnglish, setIsEnglish] = useState(() => isEnglishPath(window.location.pathname));

  const setLanguage = (language: 'en' | 'zh') => {
    const newIsEnglish = language === 'en';
    setIsEnglish(newIsEnglish);
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, language); } catch { /* Storage is optional. */ }
    if (newIsEnglish !== isEnglishPath(window.location.pathname)) {
      window.location.assign(languagePath(window.location.href, newIsEnglish));
    }
  };

  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'zh' : 'en';
    setLanguage(newLanguage);
  };

  return {
    isEnglish,
    toggleLanguage,
    setLanguage
  };
};
