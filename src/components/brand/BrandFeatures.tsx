import React from 'react';
import { ProductFeature } from '../../data/models/Product';

interface BrandFeaturesProps {
  features: ProductFeature[];
  colorTheme?: 'blue' | 'comino';
}

const BrandFeatures: React.FC<BrandFeaturesProps> = ({ features, colorTheme = 'blue' }) => {
  const hoverBg = colorTheme === 'comino'
    ? 'group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30'
    : 'group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30';
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
      {features.map((feature, index) => (
        <div key={index} className="text-center group">
          <div className="flex justify-center mb-4">
            <div className={`p-3 bg-gray-100 dark:bg-gray-800 rounded-full transition-colors ${hoverBg}`}>
              {feature.icon}
            </div>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            {feature.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BrandFeatures;