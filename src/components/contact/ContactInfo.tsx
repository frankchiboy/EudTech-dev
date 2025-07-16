import React from 'react';
import { Mail } from 'lucide-react';

interface ContactInfoProps {
  isEnglish: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ isEnglish }) => {
  return (
    <div className="bg-gradient-to-br from-blue-800 via-indigo-700 to-teal-700 dark:from-blue-700 dark:via-indigo-600 dark:to-teal-600 p-12 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Nmg2di02aC02em02IDZ2Nmg2di02aC02em0tNiA2djZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-6">
          {isEnglish ? 'Contact Information' : '聯絡資訊'}
        </h3>
        <p className="mb-8 max-w-sm">
          {isEnglish
            ? 'Fill out the form and our team will get back to you within 24 hours.'
            : '填寫表格，我們的團隊將在24小時內回覆您'}
        </p>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="flex items-start group hover:translate-x-1 transition-transform duration-300">
          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4 shadow-lg group-hover:bg-white/20 transition-all duration-300">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm opacity-75">
              {isEnglish ? 'Email' : '電子郵件'}
            </p>
            <p className="font-medium">info@eudaemonia.tech</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-700/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default ContactInfo;