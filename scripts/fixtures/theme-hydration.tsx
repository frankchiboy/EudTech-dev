import React, { lazy, Suspense } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ThemeProvider, useThemeContext } from '../../src/contexts/ThemeContext';

// Exercise preference restoration while a real Suspense boundary is pending.
// This harness is built under ignored tmp/, never into the published website.
localStorage.setItem('theme', 'dark');
const errors: string[] = [];
const original = document.getElementById('hydration-route');
export const DelayedRoute = lazy(() => new Promise<{ default: React.FC }>(resolve => {
  setTimeout(() => resolve({ default: () => <p id="hydration-route">Hydrated route</p> }), 1500);
}));
export function Layout() {
  const { themeMode, isDarkModeActive } = useThemeContext();
  return <>
    <output id="theme-state">{`${themeMode}:${isDarkModeActive ? 'dark' : 'light'}`}</output>
    <Suspense fallback={<p>Loading</p>}><DelayedRoute /></Suspense>
  </>;
}
hydrateRoot(document.getElementById('root')!, <ThemeProvider><Layout /></ThemeProvider>, {
  onRecoverableError(error) { errors.push(String(error)); }
});
setTimeout(() => {
  const preserved = document.getElementById('hydration-route') === original;
  const theme = document.getElementById('theme-state')?.textContent;
  const result = { passed: preserved && theme === 'dark:dark' && errors.length === 0, preserved, theme, errors };
  document.getElementById('result')!.textContent = JSON.stringify(result, null, 2);
}, 4000);
