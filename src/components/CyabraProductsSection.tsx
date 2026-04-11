import React from 'react';
import { getCyabraProducts } from '../data/productData';
import Section from './layout/Section';
import ProductGrid from './products/ProductGrid';

interface CyabraProductsSectionProps {
  isEnglish: boolean;
}

const CyabraProductsSection: React.FC<CyabraProductsSectionProps> = ({ isEnglish }) => {
  const products = getCyabraProducts(isEnglish);

  return (
    <Section id="cyabra-products" background="white" padding="xl">
      <div className="text-center mb-16">
        <h2 className="text-base font-semibold tracking-wide text-[#003daa] dark:text-blue-400 uppercase bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
          {isEnglish ? 'Cyabra Solutions' : 'Cyabra 解決方案'}
        </h2>
        <p className="mt-1 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight">
          {isEnglish ? 'Disinformation Detection & Brand Protection' : '假資訊偵測與品牌保護'}
        </p>
        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-300">
          {isEnglish
            ? 'Advanced AI solutions to protect your brand from disinformation and fake profiles.'
            : '先進的AI解決方案，保護您的品牌免受假資訊和假帳號的威脅。'}
        </p>
      </div>
      
      <ProductGrid
        products={products}
        isEnglish={isEnglish}
        columns={2}
      />
      
      <div className="text-center mt-12">
        <a
          href="#contact"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#003daa] hover:bg-[#002a75] transition duration-200"
        >
          {isEnglish ? 'Get Custom Solution' : '獲取客製解決方案'}
        </a>
      </div>
    </Section>
  );
};

export default CyabraProductsSection;