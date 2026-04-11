import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Product } from '../../data/models/Product';
import OptimizedCard from '../ui/OptimizedCard';
import ProductFeatures from './ProductFeatures';
import LazyImage from '../common/LazyImage';

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
    <div id={`product-card-${product.id}`}>
      <OptimizedCard
        variant="elevated"
        padding="none"
        hover
        lazy
        className="overflow-hidden border border-gray-100 dark:border-gray-700/50"
      >
      {product.comingSoon && (
        <div className="bg-blue-800 dark:bg-blue-700 text-white text-center py-2 text-sm font-medium">
          {isEnglish ? 'COMING SOON' : '即將推出'}
        </div>
      )}
      
      <div className="relative h-52">
        <LazyImage
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute bottom-5 left-5 text-white">
          <div className="mb-2">{product.icon}</div>
          <h3 className="text-2xl font-extrabold tracking-tight">{product.title}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{product.description}</p>
        
        <ProductFeatures features={product.features.slice(0, 4)} />
        
        <div className="border-t dark:border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            {showDetails && !product.comingSoon && (
              <Link
                to={`/products/${product.id}`}
                state={{ 
                  fromSection: product.id >= 5 ? 'comino-products' : 'eudtech-products',
                  fromHome: true,
                  productId: product.id
                }}
                className="inline-flex items-center text-[#003daa] hover:text-[#002a75] font-semibold transition-colors duration-200 group cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  {isEnglish ? 'Learn More' : '了解更多'}
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            )}
            <a
              href="#contact"
              className="text-[#003daa] hover:text-[#002a75] font-semibold ml-auto"
            >
              {isEnglish ? 'Get Quote' : '取得報價'}
            </a>
          </div>
        </div>
      </div>
    </OptimizedCard>
    </div>
  );
};

export default ProductCard;