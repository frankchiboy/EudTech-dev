import React from 'react';

interface ProductFeaturesProps {
  features: string[];
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => (
  <div className="mb-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-neo-light dark:shadow-neo-dark">
    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 text-center">
      主要特色
    </h3>
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start group hover:translate-x-1 transition-transform duration-300">
          <div className="h-2 w-2 bg-eudtech-600 dark:bg-eudtech-400 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:animate-pulse"></div>
          <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ProductFeatures;
