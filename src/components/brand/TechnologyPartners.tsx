import React from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import ProgressiveImage from '../media/ProgressiveImage';
import { Partnership } from '../../data/models/Company';

interface TechnologyPartnersProps {
  partners: Partnership[];
}

const TechnologyPartners: React.FC<TechnologyPartnersProps> = ({ partners }) => {
  const { t } = useI18n();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-10 mb-20">
      <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
        {t('brand.partners.title')}
      </h4>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10">
        {partners.map((partner, index) => (
          <div key={index} className="flex items-center group">
            <ProgressiveImage 
              src={partner.logo}
              alt={partner.name}
              className="h-12 md:h-14"
              imgClassName="h-12 md:h-14 object-contain opacity-70 hover:opacity-100 dark:opacity-90 group-hover:scale-110 transition-all duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyPartners;