import React from 'react';
import { ProductSpecs } from '../../data/models/Product';

interface ProductSpecsTableProps {
  specs: ProductSpecs;
  isEnglish: boolean;
  title?: string;
}

const ProductSpecsTable: React.FC<ProductSpecsTableProps> = ({
  specs,
  isEnglish,
  title
}) => {
  const technicalSpecsTranslations: Record<string, string> = {
    'Processing': '處理器',
    'Memory': '記憶體',
    'Storage': '儲存',
    'GPU': 'GPU',
    'Network': '網路',
    'Power': '電源',
    'Cooling': '散熱',
    'Form Factor': '機箱規格',
    'Dimensions': '尺寸',
    'Weight': '重量'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      {title && (
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {Object.entries(specs).map(([key, value], index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white w-1/3">
                  {isEnglish ? key : technicalSpecsTranslations[key] || key}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSpecsTable;