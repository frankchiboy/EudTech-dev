import React from 'react';

interface ContactHeaderProps {
  isEnglish: boolean;
}

const ContactHeader: React.FC<ContactHeaderProps> = ({ isEnglish }) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-base font-semibold tracking-wide bg-gradient-to-r from-blue-800 to-teal-600 dark:from-blue-400 dark:to-teal-300 bg-clip-text text-transparent uppercase">
        {isEnglish ? 'Contact Us' : '聯絡我們'}
      </h2>
      <p className="mt-1 text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent sm:text-5xl sm:tracking-tight">
        {isEnglish ? 'Get in Touch' : '與我們聯繫'}
      </p>
      <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
        {isEnglish
          ? 'Have questions about our AI server solutions? Our team is here to help.'
          : '對我們的AI伺服器解決方案有疑問？我們的團隊隨時為您提供幫助。'}
      </p>
    </div>
  );
};

export default ContactHeader;