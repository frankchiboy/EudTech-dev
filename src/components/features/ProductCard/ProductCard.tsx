import React from 'react';
import { Product } from '../../../data/models/Product';
import { Card } from '../../ui';
import ProductImage from './ProductImage';
import ProductContent from './ProductContent';
import ProductActions from './ProductActions';

interface ProductCardProps {
  product: Product;
  isEnglish: boolean;
  showDetails?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isEnglish,
  showDetails = true
}) => {
  return (
    <Card
      variant="elevated"
      padding="none"
      hover
      className="overflow-hidden border border-gray-100 dark:border-gray-700/50"
    >
      {product.comingSoon && (
        <div className="bg-blue-800 dark:bg-blue-700 text-white text-center py-2 text-sm font-medium">
          {isEnglish ? 'COMING SOON' : '即將推出'}
        </div>
      )}
      
      <ProductImage
        src={product.image}
        alt={product.title}
        comingSoon={product.comingSoon}
        isEnglish={isEnglish}
      />
      
      <ProductContent
        icon={product.icon}
        title={product.title}
        description={product.description}
        features={product.features}
      />
      
      <div className="px-6 pb-6">
        <ProductActions
          productId={product.id}
          isEnglish={isEnglish}
          comingSoon={product.comingSoon}
          showDetails={showDetails}
        />
      </div>
    </Card>
  );
};

export default ProductCard;