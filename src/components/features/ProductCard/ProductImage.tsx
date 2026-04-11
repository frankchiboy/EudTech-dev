import React from 'react';
import LazyImage from '../../common/LazyImage';

interface ProductImageProps {
  src: string;
  alt: string;
  comingSoon?: boolean;
  isEnglish: boolean;
  className?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  comingSoon = false,
  isEnglish,
  className = "h-48"
}) => {
  return (
    <div className={`relative ${className}`}>
      <LazyImage
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      
      {comingSoon && (
        <div className="absolute top-2 right-2">
          <span className="bg-blue-800 dark:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium">
            {isEnglish ? 'COMING SOON' : '即將推出'}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductImage;