import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { classNames } from '../../utils/helpers';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  isEnglish: boolean;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  isEnglish
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
        {isEnglish ? 'Product Gallery' : '產品圖庫'}
      </h3>
      
      {images.length === 1 ? (
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <img
            src={images[0]}
            alt={productName}
            className="w-full h-64 object-contain bg-gray-50 dark:bg-gray-700"
          />
        </div>
      ) : (
        <>
          <div className="relative rounded-xl overflow-hidden shadow-lg group">
            <img
              src={images[currentIndex]}
              alt={`${productName} ${currentIndex + 1}`}
              className="w-full h-64 object-contain bg-gray-50 dark:bg-gray-700 transition-transform duration-300"
            />
            
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={classNames(
                    'w-2 h-2 rounded-full transition-colors',
                    index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  )}
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={classNames(
                  'rounded-lg overflow-hidden border-2 transition-colors',
                  index === currentIndex 
                    ? 'border-blue-500' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                )}
              >
                <img
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-16 object-contain bg-gray-50 dark:bg-gray-700"
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductImageGallery;