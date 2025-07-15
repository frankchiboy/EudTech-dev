import React from 'react';
import { getEudTechProducts } from '../data/productData';
import Section from './layout/Section';
import ProductGrid from './products/ProductGrid';

interface EudTechProductsSectionProps {
  isEnglish: boolean;
}

const EudTechProductsSection: React.FC<EudTechProductsSectionProps> = ({ isEnglish }) => {
  const products = getEudTechProducts(isEnglish);

  return (
    <Section id="eudtech-products" background="white">
      <div className="text-center mb-16">
        <h2 className="text-base font-semibold tracking-wide text-blue-800 dark:text-blue-400 uppercase">
          {isEnglish ? 'EudTech Solutions' : 'EudTech 解決方案'}
        </h2>
        <p className="mt-1 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight">
          {isEnglish ? 'Our Proprietary Products' : '我們的自有產品'}
        </p>
        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-300">
          {isEnglish
            ? 'Innovative AI solutions developed in-house to meet specific industry needs.'
            : '為滿足特定行業需求而內部開發的創新AI解決方案。'}
        </p>
      </div>
      
      <ProductGrid
        products={products.filter(product => product.id !== 1)}
        isEnglish={isEnglish}
        columns={2}
      />
    </Section>
  );
};

export default EudTechProductsSection;