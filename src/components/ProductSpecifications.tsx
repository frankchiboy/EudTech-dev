import React from 'react';

interface ProductSpecificationsProps {
  product: any;
  isEnglish: boolean;
  technicalSpecsTranslations: Record<string, string>;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ 
  product, 
  isEnglish, 
  technicalSpecsTranslations 
}) => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-16 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgNnY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 dark:opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-8 text-center">
          {isEnglish ? 'System Overview' : '系統總覽'}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-neutral-200 dark:border-neutral-700">
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {Object.entries(product.specs).map(([key, value], index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800' : 'bg-white dark:bg-gray-800'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100 w-1/3">
                    {isEnglish ? key : technicalSpecsTranslations[key] || key}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                    {value as string}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {product.id !== 3 && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 text-center">
            {isEnglish 
              ? '* - depends on the configuration' 
              : '* - 取決於配置'}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductSpecifications;
