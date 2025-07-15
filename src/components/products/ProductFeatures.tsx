import React from 'react';

interface ProductFeaturesProps {
  features: string[];
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center text-sm">
          <div className="h-1.5 w-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductFeatures;