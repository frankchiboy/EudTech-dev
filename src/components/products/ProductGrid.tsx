import React from 'react';
import { Product } from '../../data/models/Product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isEnglish: boolean;
  columns?: 1 | 2 | 3 | 4;
  showDetails?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isEnglish,
  columns = 2,
  showDetails = true
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-8 md:gap-10 lg:gap-12`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isEnglish={isEnglish}
          showDetails={showDetails}
        />
      ))}
    </div>
  );
};

export default ProductGrid;