import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Product } from '../../data/models/Product';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ProductFeatures from './ProductFeatures';

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
      
      <div className="relative h-48">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="mb-2">{product.icon}</div>
          <h3 className="text-xl font-bold">{product.title}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
        
        <ProductFeatures features={product.features.slice(0, 4)} />
        
        <div className="border-t dark:border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            {showDetails && !product.comingSoon && (
              <Link
                to={`/products/${product.id}`}
                state={{ fromSection: `product-${product.id}` }}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center relative group"
              >
                <span className="relative z-10 flex items-center">
                  {isEnglish ? 'Learn More' : '了解更多'}
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            )}
            <a
              href="#contact"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium ml-auto"
            >
              {isEnglish ? 'Get Quote' : '取得報價'}
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;