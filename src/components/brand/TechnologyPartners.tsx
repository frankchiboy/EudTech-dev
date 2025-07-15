import React from 'react';
import { Partnership } from '../../data/models/Company';

interface TechnologyPartnersProps {
  partners: Partnership[];
  isEnglish: boolean;
}

const TechnologyPartners: React.FC<TechnologyPartnersProps> = ({ partners, isEnglish }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-20">
      <h4 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
        {isEnglish ? 'Compatible Technologies' : '相容技術'}
      </h4>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {partners.map((partner, index) => (
          <div key={index} className="flex items-center group">
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="h-12 object-contain hover:opacity-100 transition-opacity opacity-70 dark:opacity-90 group-hover:scale-110 transition-transform"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyPartners;