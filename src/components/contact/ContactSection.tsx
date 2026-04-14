import React from 'react';
import ContactHeader from './ContactHeader';
import ContactInfo from './ContactInfo';
import OnlineMeetingBooking from './OnlineMeetingBooking';

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white py-20 dark:from-gray-900 dark:via-gray-950 dark:to-gray-950"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(29,78,216,0.08),transparent_75%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(29,78,216,0.18),transparent_75%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ContactHeader />
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl transition-transform duration-500 hover:scale-[1.01] dark:border-gray-700/50 dark:bg-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <ContactInfo />
            <OnlineMeetingBooking />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
