import React, { useState, useRef, useEffect } from 'react';
import { classNames } from '../../utils/helpers';

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
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div ref={imgRef} className={classNames('relative overflow-hidden', className)}>
      {!isInView ? (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
      ) : (
        <>
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className={classNames(
              'w-full h-full object-cover transition-opacity duration-200',
              isLoaded ? 'opacity-100' : 'opacity-0',
              !isLoaded && !hasError && 'bg-gray-200 dark:bg-gray-700'
            )}
          />
          {hasError && (
            <div className="absolute inset-0 w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">圖片載入失敗</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LazyImage;