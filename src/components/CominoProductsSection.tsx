import React from 'react';
import { getCominoProducts } from '../data/productData';
import Section from './layout/Section';
import ProductGrid from './products/ProductGrid';

interface CominoProductsSectionProps {
  isEnglish: boolean;
}

const CominoProductsSection: React.FC<CominoProductsSectionProps> = ({ isEnglish }) => {
  const products = getCominoProducts(isEnglish);

  return (
    <Section id="comino-products" background="gradient">
      <div className="text-center mb-16">
        <h2 className="text-base font-semibold tracking-wide text-purple-600 dark:text-purple-400 uppercase bg-gradient-to-r from-purple-700 to-indigo-500 dark:from-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">
          {isEnglish ? 'Comino Products' : 'Comino 產品'}
        </h2>
        <p className="mt-1 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight">
          {isEnglish ? 'Liquid-Cooled AI Computing' : '液冷AI運算'}
        </p>
        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-300">
          {isEnglish
            ? 'Engineered - not just assembled. Grando products are built around liquid cooling technology and tailored for AI inference & training, delivering up to 40% faster performance than air-cooled systems.'
            : '工程設計而非僅僅組裝。Grando產品圍繞液冷技術構建，專為AI推論與訓練量身打造，比氣冷系統提供高達40%的效能提升。'}
        </p>
      </div>
      
      <ProductGrid
        products={products}
        isEnglish={isEnglish}
        columns={1}
      />
        
      <div className="mt-16 text-center">
        <a
          href="#contact"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-700 hover:bg-purple-800 transition duration-200"
        >
          {isEnglish ? 'Get Custom Configuration' : '獲取客製配置'}
        </a>
      </div>
    </Section>
  );
};

export default CominoProductsSection;