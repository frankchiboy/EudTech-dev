import React, { useState } from 'react';
import { useContactForm } from '../../hooks/business/useContactForm';
import BaseContactForm from '../ui/FormElements/ContactForm';
import { EmailFormData } from '../../types';
import { useI18n } from '../../i18n/I18nProvider';

interface ContactFormProps {
  hidden?: boolean;
}

/**
 * 聯繫表單組件 - 當前不直接使用，但保留以備將來需要
 * 由於需求更改為線上預約，此組件暫時不在 UI 中顯示
 */
const ContactForm: React.FC<ContactFormProps> = ({ hidden = true }) => {
  const { t } = useI18n();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { submitForm, isLoading } = useContactForm({
    onSuccess: () => {
      console.log('Contact form submitted successfully');
      setShowSuccess(true);
      setShowError(false);
      // 5秒後隱藏成功訊息
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    },
    onError: (error) => {
      console.error('Contact form error:', error);
      setShowError(true);
      setShowSuccess(false);
      setErrorMessage(error);
      // 5秒後隱藏錯誤訊息
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  });

  // 包裝提交函數以處理結果
  const handleSubmit = async (data: EmailFormData) => {
    try {
      await submitForm(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (hidden) return null;

  return (
    <div className="p-12 dark:bg-gray-800 relative">
      {showSuccess && (
        <div className="mb-4 p-3 rounded-md bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
          <p>{t('contact.form.success')}</p>
        </div>
      )}

      {showError && (
        <div className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
          <p>{t('contact.form.errorPrefix')}{errorMessage || t('contact.form.errorFallback')}</p>
        </div>
      )}

  <BaseContactForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default ContactForm;