import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import ErrorBoundary from '../common/ErrorBoundary/ErrorBoundary';
import { I18nProvider, useI18n } from '../../i18n/I18nProvider';
import { useLanguageContext } from '../../contexts/LanguageContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

// 將 LanguageContext 的語言設定同步到 I18nProvider
const I18nLanguageSync: React.FC = () => {
  const { isEnglish } = useLanguageContext();
  const { setLocale } = useI18n();
  useEffect(() => {
    setLocale(isEnglish ? 'en' : 'zh');
  }, [isEnglish, setLocale]);
  return null;
};

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <I18nProvider initialLocale="zh">
        <ThemeProvider>
          <LanguageProvider>
            <I18nLanguageSync />
            <Router>
              {children}
            </Router>
          </LanguageProvider>
        </ThemeProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;