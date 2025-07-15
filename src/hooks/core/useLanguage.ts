import { useState, useEffect } from 'react';
import { LANGUAGE_STORAGE_KEY } from '../../constants';

export const useLanguage = () => {
  const [isEnglish, setIsEnglish] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage) {
      setIsEnglish(savedLanguage === 'en');
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = !isEnglish;
    setIsEnglish(newLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage ? 'en' : 'zh');
  };

  return {
    isEnglish,
    toggleLanguage
  };
};