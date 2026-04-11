import React, { useState, useRef } from 'react';
import { classNames } from '../../../utils/helpers';
import { getThumbnailUrl } from '../../../utils/performance/imageOptimization';

interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  fallback?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  fallback = '/placeholder-image.jpg',
  loading = 'eager', // 預設使用 eager 加載，確保圖片立即加載
  className,
  onLoad,
  onError
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // 預載入原始圖片
  React.useEffect(() => {
    const imgToLoad = hasError ? fallback : src;
    const img = document.createElement('img');
    img.src = imgToLoad;
  }, [src, fallback, hasError]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  };

  // 獲取縮圖URL
  const thumbnailUrl = getThumbnailUrl(hasError ? fallback : src);

  return (
    <div 
      ref={imgRef}
      className={classNames(
        'relative overflow-hidden',
        className
      )}
      style={{ width, height }}
    >
      <div 
        className={classNames(
          'absolute inset-0 w-full h-full bg-center bg-cover transition-opacity duration-300 filter blur-sm transform scale-105',
          isLoaded ? 'opacity-0' : 'opacity-100'
        )}
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
          backgroundSize: objectFit,
          backgroundPosition: 'center'
        }}
      />
      <img
        src={hasError ? fallback : src}
        alt={alt}
        width="100%"
        height="100%"
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={classNames(
          objectFitClasses[objectFit],
          'w-full h-full transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
};

export default Image;
