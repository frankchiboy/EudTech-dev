import { ThemeMode } from '../../types';

export const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const applyTheme = (mode: ThemeMode): void => {
  const root = document.documentElement;
  
  if (mode === 'system') {
    const systemTheme = getSystemTheme();
    if (systemTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  } else {
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
};

export const getThemeIcon = (mode: ThemeMode, isDark: boolean) => {
  if (mode === 'system') {
    return isDark ? 'moon' : 'sun';
  }
  return mode === 'dark' ? 'sun' : 'moon';
};

export const getNextTheme = (currentMode: ThemeMode): ThemeMode => {
  switch (currentMode) {
    case 'system':
      return 'light';
    case 'light':
      return 'dark';
    case 'dark':
      return 'system';
    default:
      return 'system';
  }
};