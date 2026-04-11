import React from 'react';
import LazyImage from './common/LazyImage';

interface ProductImageGalleryProps {
  product: any;
  isEnglish: boolean;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ product, isEnglish }) => {
  if (!product.images || product.images.length === 0 || product.id === 3) {
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.05),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.1),transparent_40%)] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-8 text-center">
          {isEnglish ? 'Product Gallery' : '產品圖庫'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.images.map((image: string, idx: number) => (          <div 
            key={idx} 
            className="bg-white dark:bg-gray-900/90 rounded-xl shadow-neo-light dark:shadow-neo-dark overflow-hidden group hover:shadow-glow-blue dark:hover:shadow-glow-blue transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02] relative"
          >            <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              <LazyImage 
                src={image} 
                alt={`${product.title} ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
              />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
