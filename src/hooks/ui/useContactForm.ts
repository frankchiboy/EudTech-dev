import { useState, useEffect } from 'react';
import { FormStatus } from '../../types';
import { emailService } from '../../services/emailService';

export const useContactForm = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  useEffect(() => {
    emailService.init();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.target as HTMLFormElement;
    
    try {
      await emailService.sendForm(form);
      setFormStatus('success');
      form.reset();
    } catch (error) {
      console.error('發送郵件錯誤', error);
      setFormStatus('error');
    }
  };

  return {
    formStatus,
    handleSubmit
  };
};