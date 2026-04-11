import React from 'react';
import { Calendar, Mail } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

const OnlineMeetingBooking: React.FC = () => {
  const { t } = useI18n();
  const bookingUrl = "https://haxc4.r.bh.d.sendibt3.com/mk/cl/f/sh/1f8JIKXx3IkdaCaYhIptfOBWxd/EpLv3U0PdFph";
  const emailAddress = "info@eudaemonia.tech";

  const handleBookMeeting = () => {
    window.open(bookingUrl, '_blank');
  };

  const handleEmailContact = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <div className="p-12 dark:bg-gray-800 flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t('contact.booking.title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {t('contact.booking.lead')}
        </p>
      </div>

      {/* 預約會議按鈕 */}
      <button
        onClick={handleBookMeeting}
        className="w-full max-w-md flex items-center justify-center py-4 px-6 mb-6 
                  bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800
                  text-white font-medium rounded-lg shadow-lg transform transition-all duration-300 
                  hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-blue-500 dark:focus:ring-offset-gray-800"
      >
        <Calendar className="h-5 w-5 mr-2" />
        {t('contact.booking.button.meeting')}
      </button>

      {/* 分隔線 */}
      <div className="w-full max-w-md flex items-center justify-center my-6">
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
        <span className="px-4 text-sm text-gray-500 dark:text-gray-400">{t('contact.booking.or')}</span>
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
      </div>

      {/* 電子郵件聯繫按鈕 */}
      <button
        onClick={handleEmailContact}
        className="w-full max-w-md flex items-center justify-center py-4 px-6
                  bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300
                  text-gray-800 font-medium rounded-lg border border-gray-300 shadow-sm 
                  dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700
                  dark:text-gray-200 dark:border-gray-600
                  transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 
                  dark:focus:ring-offset-gray-800"
      >
        <Mail className="h-5 w-5 mr-2" />
        {t('contact.booking.button.email')}
      </button>

      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
        {t('contact.booking.note')}
      </p>
    </div>
  );
};

export default OnlineMeetingBooking;