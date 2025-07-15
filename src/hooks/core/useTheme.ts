import { useState, useEffect } from 'react';
import { ThemeMode } from '../../types';
import { THEME_STORAGE_KEY } from '../../constants';

export const useTheme = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [isDarkModeActive, setIsDarkModeActive] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setThemeMode(savedTheme);
      applyTheme(savedTheme);
    } else {
      setThemeMode('system');
      applyTheme('system');
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (themeMode === 'system') {
        const isDark = e.matches;
        setIsDarkModeActive(isDark);
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    if (themeMode === 'system') {
      const isDark = mediaQuery.matches;
      setIsDarkModeActive(isDark);
    } else {
      setIsDarkModeActive(themeMode === 'dark');
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  const applyTheme = (mode: ThemeMode) => {
    if (mode === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkModeActive(systemDark);
      if (systemDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      const isDark = mode === 'dark';
      setIsDarkModeActive(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const toggleDarkMode = () => {
    let newMode: ThemeMode;
    
    if (themeMode === 'system') {
      newMode = 'light';
    } else if (themeMode === 'light') {
      newMode = 'dark';
    } else {
      newMode = 'system';
    }
    
    setThemeMode(newMode);
    applyTheme(newMode);
    localStorage.setItem(THEME_STORAGE_KEY, newMode);
  };

  return {
    themeMode,
    isDarkModeActive,
    toggleDarkMode
  };
};