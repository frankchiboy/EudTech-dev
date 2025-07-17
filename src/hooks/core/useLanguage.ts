import { useState, useEffect } from 'react';
import { LANGUAGE_STORAGE_KEY } from '../../constants/index';

export const useLanguage = () => {
  const [isEnglish, setIsEnglish] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage) {
      setIsEnglish(savedLanguage === 'en');
    }
  }, []);

  const setLanguage = (language: 'en' | 'zh') => {
    const newIsEnglish = language === 'en';
    setIsEnglish(newIsEnglish);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
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