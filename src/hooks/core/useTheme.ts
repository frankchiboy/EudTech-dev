import { useState, useEffect, startTransition } from 'react';
import { ThemeMode } from '../../types';
import { THEME_STORAGE_KEY } from '../../constants/index';

export const useTheme = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [isDarkModeActive, setIsDarkModeActive] = useState(false);

  useEffect(() => {
    let savedTheme: ThemeMode | null = null;
    try { savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null; } catch { /* Storage is optional. */ }
    // A lazy route may still be hydrating when browser preferences are restored.
    // Let React finish that boundary before applying the context update.
    startTransition(() => {
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeMode(savedTheme);
        applyTheme(savedTheme);
      } else {
        setThemeMode('system');
        applyTheme('system');
      }
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (themeMode === 'system') {
        const isDark = e.matches;
        startTransition(() => setIsDarkModeActive(isDark));
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    startTransition(() => {
      setIsDarkModeActive(themeMode === 'system' ? mediaQuery.matches : themeMode === 'dark');
    });

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
    
    startTransition(() => {
      setThemeMode(newMode);
      applyTheme(newMode);
    });
    try { localStorage.setItem(THEME_STORAGE_KEY, newMode); } catch { /* Storage is optional. */ }
  };

  return {
    themeMode,
    isDarkModeActive,
    toggleDarkMode
  };
};
