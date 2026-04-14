import React from 'react';
import { Calendar, Clock, Globe, Mail } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

const ContactInfo: React.FC = () => {
  const { locale } = useI18n();
  const isEnglish = locale === 'en';
  const items = [
    {
      icon: Calendar,
      label: isEnglish ? 'Online Meeting' : '線上會議',
      value: isEnglish ? 'Via video conferencing' : '透過視訊會議',
    },
    {
      icon: Mail,
      label: isEnglish ? 'Email' : '電子郵件',
      value: 'info@eudaemonia.tech',
    },
    {
      icon: Clock,
      label: isEnglish ? 'Response Time' : '回覆時間',
      value: isEnglish ? 'Within 24 hours' : '24 小時內',
    },
    {
      icon: Globe,
      label: isEnglish ? 'Languages' : '語言',
      value: isEnglish ? 'English, Chinese' : '英文、中文',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-800 via-indigo-700 to-teal-700 dark:from-blue-700 dark:via-indigo-600 dark:to-teal-600 p-12 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Nmg2di02aC02em02IDZ2Nmg2di02aC02em0tNiA2djZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      <div className="relative z-10">
        <h3 className="mb-6 text-2xl font-bold">
          {isEnglish ? 'Meeting & Contact Info' : '會議與聯絡資訊'}
        </h3>
        <p className="mb-8 max-w-sm">
          {isEnglish
            ? 'Book an online consultation or contact us directly via email.'
            : '預約線上諮詢，或直接透過電子郵件聯繫我們。'}
        </p>
      </div>

      <div className="space-y-6 relative z-10">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="group flex items-start transition-transform duration-300 hover:translate-x-1">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 shadow-lg transition-all duration-300 group-hover:bg-white/20">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm opacity-75">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-700/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default ContactInfo;
