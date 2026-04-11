import React, { useState, useEffect } from 'react';
import { EmailFormData } from '../../../types';
import Input from '../Input';
import Textarea from '../Textarea';
import Checkbox from './Checkbox';
import Button from '../Button';
import FormGroup from './FormGroup';
import { isValidEmail } from '../../../utils/validators';
import { useI18n } from '../../../i18n/I18nProvider';

interface ContactFormProps {
  onSubmit: (data: EmailFormData) => Promise<void>;
  isLoading?: boolean;
}

// 用於儲存表單錯誤的介面，修正錯誤類型
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  message?: string;
  privacy?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, isLoading = false }) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState<EmailFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    privacy: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formTouched, setFormTouched] = useState<Record<keyof EmailFormData, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    company: false,
    message: false,
    privacy: false
  });

  // 當任何欄位被更新時，如果表單已提交過，重新驗證所有欄位
  useEffect(() => {
    if (formSubmitted) {
      validateForm(false);
    }
  }, [formData, formSubmitted]);

  const validateForm = (updateErrors = true): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('contact.form.errors.firstNameRequired');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('contact.form.errors.lastNameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errors.emailRequired');
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = t('contact.form.errors.emailInvalid');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.errors.messageRequired');
    }

    if (!formData.privacy) {
      newErrors.privacy = t('contact.form.errors.privacyRequired');
    }

    if (updateErrors) {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormSubmitted(true);
    
    // 標記所有欄位為已觸碰
    const allTouched = Object.keys(formTouched).reduce((acc, key) => {
      acc[key as keyof EmailFormData] = true;
      return acc;
    }, {} as Record<keyof EmailFormData, boolean>);
    
    setFormTouched(allTouched);
    
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
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
      setFormSubmitted(false);
      setFormTouched({
        firstName: false,
        lastName: false,
        email: false,
        company: false,
        message: false,
        privacy: false
      });
    } catch (error) {
      console.error('表單提交錯誤:', error);
    }
  };

  const handleChange = (field: keyof EmailFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // 標記此欄位為已觸碰
    setFormTouched(prev => ({ ...prev, [field]: true }));
    
    // 只有當欄位已觸碰或表單已提交時顯示錯誤
    if (formTouched[field] || formSubmitted) {
      // 實時驗證此欄位
      const newErrors = { ...errors };
      
      if (field === 'firstName' && !value.toString().trim()) {
        newErrors.firstName = t('contact.form.errors.firstNameRequired');
      } else if (field === 'firstName') {
        delete newErrors.firstName;
      }
      
      if (field === 'lastName' && !value.toString().trim()) {
        newErrors.lastName = t('contact.form.errors.lastNameRequired');
      } else if (field === 'lastName') {
        delete newErrors.lastName;
      }
      
      if (field === 'email') {
        if (!value.toString().trim()) {
          newErrors.email = t('contact.form.errors.emailRequired');
        } else if (!isValidEmail(value.toString())) {
          newErrors.email = t('contact.form.errors.emailInvalid');
        } else {
          delete newErrors.email;
        }
      }
      
      if (field === 'message' && !value.toString().trim()) {
        newErrors.message = t('contact.form.errors.messageRequired');
      } else if (field === 'message') {
        delete newErrors.message;
      }
      
      if (field === 'privacy' && !value) {
        newErrors.privacy = t('contact.form.errors.privacyRequired');
      } else if (field === 'privacy') {
        delete newErrors.privacy;
      }
      
      setErrors(newErrors);
    }
  };

  const shouldShowError = (field: keyof EmailFormData) => {
    return (formTouched[field] || formSubmitted) && Boolean(errors[field]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormGroup direction="row" spacing="md">
        <Input
          label={t('contact.form.labels.firstName')}
          value={formData.firstName}
          onChange={handleChange('firstName')}
          onBlur={() => setFormTouched(prev => ({ ...prev, firstName: true }))}
          error={shouldShowError('firstName') ? errors.firstName : undefined}
          required
          fullWidth
          disabled={isLoading}
        />
        <Input
          label={t('contact.form.labels.lastName')}
          value={formData.lastName}
          onChange={handleChange('lastName')}
          onBlur={() => setFormTouched(prev => ({ ...prev, lastName: true }))}
          error={shouldShowError('lastName') ? errors.lastName : undefined}
          required
          fullWidth
          disabled={isLoading}
        />
      </FormGroup>

      <Input
        type="email"
        label={t('contact.form.labels.email')}
        value={formData.email}
        onChange={handleChange('email')}
        onBlur={() => setFormTouched(prev => ({ ...prev, email: true }))}
        error={shouldShowError('email') ? errors.email : undefined}
        required
        fullWidth
        disabled={isLoading}
      />

      <Input
        label={t('contact.form.labels.company')}
        value={formData.company}
        onChange={handleChange('company')}
        onBlur={() => setFormTouched(prev => ({ ...prev, company: true }))}
        fullWidth
        disabled={isLoading}
      />

      <Textarea
        label={t('contact.form.labels.message')}
        value={formData.message}
        onChange={handleChange('message')}
        onBlur={() => setFormTouched(prev => ({ ...prev, message: true }))}
        error={shouldShowError('message') ? errors.message : undefined}
        rows={4}
        required
        fullWidth
        disabled={isLoading}
      />

      <Checkbox
        label={t('contact.form.labels.privacy')}
        checked={formData.privacy}
        onChange={handleChange('privacy')}
        error={shouldShowError('privacy') ? errors.privacy : undefined}
        required
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? t('contact.form.submitting') : t('contact.form.submit')}
      </Button>
    </form>
  );
};

export default ContactForm;