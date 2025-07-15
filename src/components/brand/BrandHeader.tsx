import React from 'react';

interface BrandHeaderProps {
  isEnglish: boolean;
}

const BrandHeader: React.FC<BrandHeaderProps> = ({ isEnglish }) => {
  return (
    <div className="text-center mb-16">
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <img 
            src="/comino-grando-logo.png" 
            alt="Comino Grando Logo" 
            className="h-16 object-contain bg-gray-800 p-3 rounded shadow-md"
          />
        </div>
      </div>
      
      <h2 className="text-base font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase mb-4">
        {isEnglish ? 'Authorized Distributor' : '授權經銷商'}
      </h2>
      
      <h3 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-6">
        {isEnglish ? 'Comino Grando' : 'Comino Grando'}
      </h3>
      
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
        {isEnglish
          ? 'EudTech is the authorized distributor of Comino, the world leader in liquid-cooled AI computing solutions. Comino Grando systems are engineered - not just assembled - delivering unprecedented performance for AI training, inference, and HPC workloads with liquid-cooled multi-GPU devices.'
          : 'EudTech是Comino的授權經銷商，Comino是液冷AI運算解決方案的全球領導者。Comino Grando系統經過工程設計而非僅僅組裝，為AI訓練、推論和HPC工作負載提供前所未有的效能。'}
      </p>
      
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
        <p className="text-blue-800 dark:text-blue-300 font-medium">
          {isEnglish
            ? 'EudTech is listed as an official Comino distributor. You can verify our authorization on '
            : 'EudTech已列為Comino官方經銷商。您可以在Comino官網經銷商頁面查證我們的授權：'}
          <a 
            href="https://www.comino.com/en/company" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-blue-900 dark:hover:text-blue-200"
          >
            {isEnglish ? 'Comino\'s distributor page' : 'Comino經銷商頁面'}
          </a>
        </p>
      </div>
      
      <div className="flex justify-center mb-12">
        <img 
          src="/amd-partner-badge.jpg" 
          alt="AMD Elite Partner" 
          className="h-20 object-contain"
        />
      </div>
    </div>
  );
};

export default BrandHeader;