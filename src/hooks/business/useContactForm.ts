import { useState } from 'react';
import { EmailFormData, FormStatus } from '../../types';
import { emailService } from '../../services/emailService';
import { isValidEmail } from '../../utils/validators';

interface UseContactFormOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useContactForm = (options: UseContactFormOptions = {}) => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState<EmailFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    privacy: false
  });
  const [errors, setErrors] = useState<Partial<EmailFormData>>({});

  const validateForm = (data: EmailFormData): boolean => {
    const newErrors: Partial<EmailFormData> = {};

    if (!data.firstName.trim()) {
      newErrors.firstName = '名字為必填';
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = '姓氏為必填';
    }

    if (!data.email.trim()) {
      newErrors.email = '電子郵件為必填';
    } else if (!isValidEmail(data.email)) {
      newErrors.email = '電子郵件格式不正確';
    }

    if (!data.message.trim()) {
      newErrors.message = '訊息為必填';
    }

    if (!data.privacy) {
      newErrors.privacy = '您必須同意隱私政策';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (data: EmailFormData) => {
    if (!validateForm(data)) {
      return false;
    }

    setFormStatus('submitting');

    try {
      await emailService.sendEmail(data);
      setFormStatus('success');
      
      // 重置表單
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: '',
        privacy: false
      });
      setErrors({});

      options.onSuccess?.();
      return true;
    } catch (error) {
      setFormStatus('error');
      const errorMessage = error instanceof Error ? error.message : '發送失敗';
      options.onError?.(errorMessage);
      return false;
    }
  };

  const updateField = (field: keyof EmailFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // 清除該欄位的錯誤
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      message: '',
      privacy: false
    });
    setErrors({});
    setFormStatus('idle');
  };

  return {
    formData,
    formStatus,
    errors,
    submitForm,
    updateField,
    resetForm,
    isLoading: formStatus === 'submitting',
    isSuccess: formStatus === 'success',
    isError: formStatus === 'error'
  };
};