import React from 'react';
import { useContactForm } from '../../hooks/business/useContactForm';
import BaseContactForm from '../ui/FormElements/ContactForm';

interface ContactFormProps {
  isEnglish: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isEnglish }) => {
  const { submitForm, isLoading } = useContactForm({
    onSuccess: () => {
      console.log('Contact form submitted successfully');
    },
    onError: (error) => {
      console.error('Contact form error:', error);
    }
  });

  return (
    <div className="p-12 dark:bg-gray-800">
      <BaseContactForm
        onSubmit={submitForm}
        isEnglish={isEnglish}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ContactForm;