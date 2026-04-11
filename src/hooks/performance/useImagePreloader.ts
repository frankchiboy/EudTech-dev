import { useEffect, useState } from 'react';
import { preloadImage } from '../../utils/performance/imageOptimization';

interface UseImagePreloaderOptions {
  /** 提前多少像素開始載入 */
  rootMargin?: string;
  /** 是否啟用預載入 */
  enabled?: boolean;
  /** 是否只觸發一次 */
  triggerOnce?: boolean;
  /** 預載入的優先級 */
  priority?: 'high' | 'normal' | 'low';
}

export const useImagePreloader = (
  imageSrc: string,
  targetRef: React.RefObject<HTMLElement>,
  options: UseImagePreloaderOptions = {}
) => {
  const {
    rootMargin = '300px 0px',
    enabled = true,
    triggerOnce = true,
    priority = 'normal'
  } = options;

  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled || !targetRef.current || isPreloaded) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isPreloaded) {
          setIsLoading(true);
          
          // 根據優先級決定載入延遲
          const delay = priority === 'high' ? 0 : priority === 'normal' ? 100 : 300;
          
          setTimeout(() => {
            preloadImage(imageSrc)
              .then(() => {
                setIsPreloaded(true);
                setIsLoading(false);
                console.log(`圖片預載入完成: ${imageSrc}`);
              })
              .catch((err) => {
                setError(err);
                setIsLoading(false);
                console.warn(`圖片預載入失敗: ${imageSrc}`, err);
              });
          }, delay);

          if (triggerOnce) {
            observer.disconnect();
          }
        }
      },
      { rootMargin }
    );

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [imageSrc, enabled, isPreloaded, priority, rootMargin, targetRef, triggerOnce]);

  return {
    isPreloaded,
    isLoading,
    error,
    preload: () => {
      if (!isPreloaded && !isLoading) {
        setIsLoading(true);
        preloadImage(imageSrc)
          .then(() => {
            setIsPreloaded(true);
            setIsLoading(false);
          })
          .catch((err) => {
            setError(err);
            setIsLoading(false);
          });
      }
    }
  };
};

// Hook for preloading multiple images
export const useMultipleImagePreloader = (images: string[]) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Error[]>([]);

  const preloadAll = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setLoadedCount(0);
    setErrors([]);

    for (let i = 0; i < images.length; i++) {
      try {
        await preloadImage(images[i]);
        setLoadedCount(i + 1);
      } catch (error) {
        setErrors(prev => [...prev, error as Error]);
      }
    }
    
    setIsLoading(false);
  };

  return {
    loadedCount,
    totalCount: images.length,
    isLoading,
    errors,
    progress: images.length > 0 ? (loadedCount / images.length) * 100 : 0,
    preloadAll
  };
};
