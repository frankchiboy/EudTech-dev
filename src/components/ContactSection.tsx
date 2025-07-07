import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactSectionProps {
  isEnglish: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ isEnglish }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    emailjs.init("58neCQ5g_YI5coA2S"); // 請替換成您的 EmailJS Public Key
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.target as HTMLFormElement;
    
    try {
      await emailjs.sendForm(
        'service_xlvbakk', // 請替換成您的 Service ID
        'template_b0hn82o', // 請替換成您的 Template ID
        form,
        '58neCQ5g_YI5coA2S' // 請替換成您的 Public Key
      );

      setFormStatus('success');
      form.reset();
    } catch (error) {
      console.error('發送郵件錯誤：', error);
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold tracking-wide text-blue-800 uppercase">
            {isEnglish ? 'Contact Us' : '聯絡我們'}
          </h2>
          <p className="mt-1 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight">
            {isEnglish ? 'Get in Touch' : '與我們聯繫'}
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            {isEnglish
              ? 'Have questions about our AI server solutions? Our team is here to help.'
              : '對我們的AI伺服器解決方案有疑問？我們的團隊隨時為您提供幫助。'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-800 to-teal-700 p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">
                {isEnglish ? 'Contact Information' : '聯絡資訊'}
              </h3>
              <p className="mb-8 max-w-sm">
                {isEnglish
                  ? 'Fill out the form and our team will get back to you within 24 hours.'
                  : '填寫表格，我們的團隊將在24小時內回覆您。'}
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4" />
                  <div>
                    <p className="text-sm opacity-75">
                      {isEnglish ? 'Email' : '電子郵件'}
                    </p>
                    <p>info@eudaemonia.tech</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {isEnglish ? 'First Name' : '名字'}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {isEnglish ? 'Last Name' : '姓氏'}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {isEnglish ? 'Email' : '電子郵件'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {isEnglish ? 'Company' : '公司'}
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {isEnglish ? 'Message' : '訊息'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border outline-none resize-none"
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-800 mt-1"
                  />
                  <label
                    htmlFor="privacy"
                    className="ml-2 block text-sm text-gray-500"
                  >
                    {isEnglish
                      ? 'I agree to the privacy policy and terms of service.'
                      : '我同意隱私政策和服務條款。'}
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                      formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {isEnglish ? 'Submitting...' : '提交中...'}
                      </span>
                    ) : formStatus === 'success' ? (
                      <span className="flex items-center">
                        <svg
                          className="-ml-1 mr-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {isEnglish ? 'Message Sent!' : '訊息已發送！'}
                      </span>
                    ) : formStatus === 'error' ? (
                      <span className="text-red-500">
                        {isEnglish ? 'Error! Please try again.' : '錯誤！請重試。'}
                      </span>
                    ) : (
                      <span>
                        {isEnglish ? 'Send Message' : '發送訊息'}
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;