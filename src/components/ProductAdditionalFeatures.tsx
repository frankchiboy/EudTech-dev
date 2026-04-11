import React from 'react';

interface ProductAdditionalFeaturesProps {
  product: any;
  isEnglish: boolean;
}

const ProductAdditionalFeatures: React.FC<ProductAdditionalFeaturesProps> = ({ product, isEnglish }) => {
  if (product.id === 5 && product.detailedDescription && product.detailedDescription.additionalFeatures) {
    return (
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-8 text-center">
            {isEnglish ? 'Features' : '功能特色'}
          </h2>
          <div className="space-y-6">
            {Object.entries(product.detailedDescription.additionalFeatures || {}).map(([title, description], index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <h4 className="font-semibold text-eudtech-700 dark:text-eudtech-400 mb-3 text-lg">
                  {title}
                </h4>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {description as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (product.detailedDescription && product.id !== 5 && 'additionalFeatures' in product.detailedDescription && product.detailedDescription.additionalFeatures) {
    return (
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-8 text-center">
            {isEnglish ? 'Features' : '功能特色'}
          </h2>
          <div className="space-y-6">
            {Object.entries(product.detailedDescription.additionalFeatures || {}).map(([title, description], index) => (
              <div key={index} className="border-l-4 border-eudtech-600 pl-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h4>
                <p className="text-gray-700 dark:text-gray-300">{description as string}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default ProductAdditionalFeatures;
