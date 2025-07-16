import React from 'react';
import ContactHeader from './ContactHeader';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

interface ContactSectionProps {
  isEnglish: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ isEnglish }) => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(29,78,216,0.07),transparent_80%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(29,78,216,0.15),transparent_80%)] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ContactHeader isEnglish={isEnglish} />
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-3d-light dark:shadow-3d-dark overflow-hidden border border-gray-100 dark:border-gray-700/50 backdrop-filter backdrop-blur-sm transform hover:scale-[1.01] transition-transform duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <ContactInfo isEnglish={isEnglish} />
            <ContactForm isEnglish={isEnglish} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;