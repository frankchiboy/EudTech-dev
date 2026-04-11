import React from 'react';
import { technicalSpecsTranslations } from './productUtils';

interface ProductSpecsProps {
  specs: Record<string, string>;
  isEnglish: boolean;
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ specs, isEnglish }) => (
  <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-16 relative">
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-8 text-center">
        系統總覽
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-neutral-200 dark:border-neutral-700">
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {Object.entries(specs).map(([key, value], index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800' : 'bg-white dark:bg-gray-800'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100 w-1/3">
                  {isEnglish ? key : technicalSpecsTranslations[key] || key}
                </td>
                <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default ProductSpecs;
