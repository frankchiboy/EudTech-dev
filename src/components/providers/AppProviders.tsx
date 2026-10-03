import React, { useEffect } from 'react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import ErrorBoundary from '../common/ErrorBoundary/ErrorBoundary';
import { I18nProvider, useI18n } from '../../i18n/I18nProvider';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { isEnglishPath } from '../../utils/seo/languageUrl';

interface AppProvidersProps {
  children: React.ReactNode;
  initialPath: string;
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

const AppProviders: React.FC<AppProvidersProps> = ({ children, initialPath }) => {
  return (
    <ErrorBoundary>
      <I18nProvider initialLocale={isEnglishPath(initialPath) ? 'en' : 'zh'}>
        <ThemeProvider>
          <LanguageProvider initialPath={initialPath}>
            <I18nLanguageSync />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
