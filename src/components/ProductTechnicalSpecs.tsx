import React from 'react';

interface ProductTechnicalSpecsProps {
  product: any;
  isEnglish: boolean;
  technicalSpecsTranslations: Record<string, string>;
}

const ProductTechnicalSpecs: React.FC<ProductTechnicalSpecsProps> = ({ 
  product, 
  isEnglish, 
  technicalSpecsTranslations 
}) => {
  if (!product.detailedDescription) {
    return null;
  }

  // FinSight 的特殊佈局
  if (product.id === 3) {
    return (
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-12">
            {/* 系統架構說明 */}
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
                {isEnglish ? 'System Architecture' : '系統架構'}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-eudtech-700 dark:text-eudtech-400 mb-4">
                    {isEnglish ? 'Core Components' : '核心組件'}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="h-2 w-2 bg-eudtech-600 dark:bg-eudtech-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">FinSight-API</span>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          {isEnglish ? 'RESTful API for unified financial data access' : 'RESTful API 統一金融資料存取'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-2 w-2 bg-eudtech-600 dark:bg-eudtech-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">FinSight GTP</span>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          {isEnglish ? 'LLM interaction demonstration platform' : 'LLM 互動展示平台'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-eudtech-700 dark:text-eudtech-400 mb-4">
                    {isEnglish ? 'Key Features' : '主要功能'}
                  </h4>
                  <div className="space-y-3">
                    {product.detailedDescription.keyFeatures?.slice(0, 4).map((feature: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="h-2 w-2 bg-teal-600 dark:bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 技術規格 - 卡片式佈局 */}
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 text-center">
                {isEnglish ? 'Technical Specifications' : '技術規格'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.detailedDescription.technicalSpecs || {}).map(([key, value], index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-eudtech-700 dark:text-eudtech-400 mb-3 text-lg">
                      {isEnglish ? key : technicalSpecsTranslations[key] || key}
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {value as string}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 應用場景 */}
            {product.detailedDescription.applications && (
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
                  {isEnglish ? 'Applications' : '應用場景'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.detailedDescription.applications.map((application: string, index: number) => (
                    <div key={index} className="flex items-start p-4 bg-white dark:bg-gray-700/50 rounded-lg">
                      <div className="h-2 w-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">{application}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 其他產品的原有佈局
  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
              {isEnglish ? 'Technical Specifications' : '技術規格'}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 border border-neutral-200 dark:border-neutral-700">
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {Object.entries(product.detailedDescription?.technicalSpecs || {}).map(([key, value], index) => (
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

        {/* Available Configurations - for Comino Grando Rackable Workstation (id: 5), Desktop Workstation (id: 6), and Server (id: 7) */}
        {(product.id === 5 || product.id === 6 || product.id === 7) && product.detailedDescription && product.detailedDescription.relevantConfigurations && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
              {isEnglish ? 'Relevant Server Configurations' : '相關伺服器配置'}
            </h3>
            <div className="space-y-8">
              {Array.isArray(product.detailedDescription.relevantConfigurations) && 
               typeof product.detailedDescription.relevantConfigurations[0] === 'object' ? (
                // 新的結構化格式
                (product.detailedDescription.relevantConfigurations as any[]).map((section, sectionIndex) => (
                  <div key={sectionIndex} className="space-y-4">
                    <h4 className="text-xl font-semibold text-eudtech-700 dark:text-eudtech-400">
                      {section.title}
                    </h4>
                    {section.description && (
                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {section.description}
                      </p>
                    )}
                    {section.configurations && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.configurations.map((config: string, configIndex: number) => (
                          <div key={configIndex} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-start">
                              <div className="h-2 w-2 bg-eudtech-600 dark:bg-eudtech-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-neutral-700 dark:text-neutral-300">{config}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                // 舊的字串陣列格式（向後相容）
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(product.detailedDescription.relevantConfigurations as string[]).map((config, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-neo-light dark:shadow-neo-dark border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="h-2 w-2 bg-eudtech-600 dark:bg-eudtech-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-neutral-700 dark:text-neutral-300">{config}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTechnicalSpecs;
