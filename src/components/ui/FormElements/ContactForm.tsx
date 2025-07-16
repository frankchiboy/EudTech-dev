import React, { useState } from 'react';
import { EmailFormData } from '../../../types';
import Input from '../Input';
import Textarea from '../Textarea';
import Checkbox from './Checkbox';
import Button from '../Button';
import FormGroup from './FormGroup';
import { isValidEmail } from '../../../utils/validators';

interface ContactFormProps {
  onSubmit: (data: EmailFormData) => Promise<void>;
  isEnglish: boolean;
  isLoading?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  isEnglish,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<EmailFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    privacy: false
  });

  const [errors, setErrors] = useState<Partial<EmailFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<EmailFormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = isEnglish ? 'First name is required' : '名字為必填';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = isEnglish ? 'Last name is required' : '姓氏為必填';
    }

    if (!formData.email.trim()) {
      newErrors.email = isEnglish ? 'Email is required' : '電子郵件為必填';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = isEnglish ? 'Invalid email format' : '電子郵件格式不正確';
    }

    if (!formData.message.trim()) {
      newErrors.message = isEnglish ? 'Message is required' : '訊息為必填';
    }

    if (!formData.privacy) {
      newErrors.privacy = isEnglish ? 'You must agree to the privacy policy' : '您必須同意隱私政策';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (field: keyof EmailFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // 清除該欄位的錯誤
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormGroup direction="row" spacing="md">
        <Input
          label={isEnglish ? 'First Name' : '名字'}
          value={formData.firstName}
          onChange={handleChange('firstName')}
          error={errors.firstName}
          required
          fullWidth
        />
        <Input
          label={isEnglish ? 'Last Name' : '姓氏'}
          value={formData.lastName}
          onChange={handleChange('lastName')}
          error={errors.lastName}
          required
          fullWidth
        />
      </FormGroup>

      <Input
        type="email"
        label={isEnglish ? 'Email' : '電子郵件'}
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        required
        fullWidth
      />

      <Input
        label={isEnglish ? 'Company' : '公司'}
        value={formData.company}
        onChange={handleChange('company')}
        fullWidth
      />

      <Textarea
        label={isEnglish ? 'Message' : '訊息'}
        value={formData.message}
        onChange={handleChange('message')}
        error={errors.message}
        rows={4}
        required
        fullWidth
      />

      <Checkbox
        label={isEnglish 
          ? 'I agree to the privacy policy and terms of service.'
          : '我同意隱私政策和服務條款。'
        }
        checked={formData.privacy}
        onChange={handleChange('privacy')}
        error={errors.privacy}
        required
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
        disabled={isLoading}
      >
        {isLoading 
          ? (isEnglish ? 'Submitting...' : '提交中...') 
          : (isEnglish ? 'Send Message' : '發送訊息')
        }
      </Button>
    </form>
  );
};

export default ContactForm;