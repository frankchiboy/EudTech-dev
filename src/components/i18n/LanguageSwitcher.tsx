import React from 'react';
import { useI18n } from '../../i18n/I18nProvider';

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

// 簡易語言切換：使用 I18nProvider
// 若同時存在舊 isEnglish context，可暫時並存；後續統一移除舊 context
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', compact = false }) => {
  const { locale, setLocale } = useI18n();
  const toggle = () => setLocale(locale === 'zh' ? 'en' : 'zh');

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm font-medium bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label={locale === 'zh' ? '切換為 English' : 'Switch to 中文'}
    >
      {compact ? (locale === 'zh' ? '中' : 'EN') : (locale === 'zh' ? '中文 / Chinese' : 'English')}
    </button>
  );
};

export default LanguageSwitcher;