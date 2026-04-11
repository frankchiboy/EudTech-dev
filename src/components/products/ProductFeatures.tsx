import React from 'react';

interface ProductFeaturesProps {
  features: string[];
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-2 gap-2.5 mb-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center text-[13px] leading-snug">
          <div className="h-1.5 w-1.5 bg-[#003daa] rounded-full mr-2 flex-shrink-0"></div>
          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductFeatures;