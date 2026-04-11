import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Link } from '../../ui/Typography';
import { Flex } from '../../ui/Layout';

interface ProductActionsProps {
  productId: number;
  isEnglish: boolean;
  comingSoon?: boolean;
  showDetails?: boolean;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  isEnglish,
  comingSoon = false,
  showDetails = true
}) => {
  return (
    <div className="border-t dark:border-gray-700 pt-4">
      <Flex justify="between" align="center">
        {showDetails && !comingSoon && (
          <RouterLink
            to={`/products/${productId}`}
            state={{ 
              fromSection: `product-${productId}`,
              fromHome: true
            }}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center group"
          >
            <span className="flex items-center">
              {isEnglish ? 'Learn More' : '了解更多'}
              <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </RouterLink>
        )}
        
        <Link
          href="#contact"
          color="primary"
          className="ml-auto font-medium"
        >
          {isEnglish ? 'Get Quote' : '取得報價'}
        </Link>
      </Flex>
    </div>
  );
};

export default ProductActions;