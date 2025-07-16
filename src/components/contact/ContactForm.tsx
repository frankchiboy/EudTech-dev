import React from 'react';
import { FormStatus } from '../../types';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

interface ContactFormProps {
  isEnglish: boolean;
  formStatus: FormStatus;
  onSubmit: (e: React.FormEvent) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isEnglish, formStatus, onSubmit }) => {
  const getSubmitButtonText = () => {
    switch (formStatus) {
      case 'submitting':
        return isEnglish ? 'Submitting...' : '提交中...';
      case 'success':
        return isEnglish ? 'Message Sent!' : '訊息已發送！';
      case 'error':
        return isEnglish ? 'Error! Please try again.' : '錯誤！請重試。';
      default:
        return isEnglish ? 'Send Message' : '發送訊息';
    }
  };

  return (
    <div className="p-12 dark:bg-gray-800">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            type="text"
            name="firstName"
            label={isEnglish ? 'First Name' : '名字'}
            required
            fullWidth
          />
          <Input
            type="text"
            name="lastName"
            label={isEnglish ? 'Last Name' : '姓氏'}
            required
            fullWidth
          />
        </div>

        <Input
          type="email"
          name="email"
          label={isEnglish ? 'Email' : '電子郵件'}
          required
          fullWidth
        />

        <Input
          type="text"
          name="company"
          label={isEnglish ? 'Company' : '公司'}
          fullWidth
        />

        <Textarea
          name="message"
          label={isEnglish ? 'Message' : '訊息'}
          rows={4}
          required
          fullWidth
        />

        <div className="flex items-start">
          <input
            id="privacy"
            name="privacy"
            type="checkbox"
            required
            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-800 focus:ring-blue-800 mt-1 dark:bg-gray-700"
          />
          <label
            htmlFor="privacy"
            className="ml-2 block text-sm text-gray-500 dark:text-gray-400"
          >
            {isEnglish
              ? 'I agree to the privacy policy and terms of service.'
              : '我同意隱私政策和服務條款。'}
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={formStatus === 'submitting'}
          disabled={formStatus === 'submitting'}
        >
          {getSubmitButtonText()}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;