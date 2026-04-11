import React, { useState, useRef } from 'react';
import { classNames } from '../../utils/helpers';
import { getThumbnailUrl } from '../../utils/performance/imageOptimization';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    onError?.();
  };

  // 使用導入的 getThumbnailUrl 函數來獲取縮圖URL
  const thumbnailUrl = getThumbnailUrl(src);

  // 預載入高清圖片
  React.useEffect(() => {
    const img = new Image();
    img.src = src;
  }, [src]);

  return (
    <div ref={imgRef} className={classNames('relative overflow-hidden', className)}>
      <div 
        className={classNames(
          'absolute inset-0 w-full h-full bg-center bg-cover transition-opacity duration-300 filter blur-sm transform scale-105',
          isLoaded ? 'opacity-0' : 'opacity-100'
        )}
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(15, 23, 42, 0.3)'
        }}
      />
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={classNames(
          'w-full h-full transition-all duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          objectFit: className?.includes('object-contain') ? 'contain' : 'cover',
          objectPosition: 'center'
        }}
      />
    </div>
  );
};

export default LazyImage;
