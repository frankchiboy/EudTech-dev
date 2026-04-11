import { useState, useEffect } from 'react';
import { preloadImage } from '../../utils/performance/imageOptimization';

/**
 * 自定義 hook 用於畫廊圖片的預載入
 * @param images 要預載入的圖片 URL 列表
 * @param currentIndex 當前顯示的圖片索引
 * @param preloadCount 預載入多少張相鄰的圖片 (默認: 2)
 */
export const useGalleryPreloader = (
  images: string[],
  currentIndex: number,
  preloadCount: number = 2
) => {
  const [preloadStatus, setPreloadStatus] = useState<Record<number, 'loading' | 'loaded' | 'error'>>({});

  useEffect(() => {
    if (!images.length) return;

    // 預載入當前索引周圍的圖片
    const indicesToPreload = [];
    for (let i = 1; i <= preloadCount; i++) {
      const nextIdx = (currentIndex + i) % images.length;
      const prevIdx = (currentIndex - i + images.length) % images.length;
      indicesToPreload.push(nextIdx);
      if (prevIdx !== nextIdx) { // 避免在圖片數量少的情況下重複
        indicesToPreload.push(prevIdx);
      }
    }

    const uniqueIndices = [...new Set(indicesToPreload)];

    // 更新載入狀態
    uniqueIndices.forEach(idx => {
      if (!preloadStatus[idx]) {
        setPreloadStatus(prev => ({
          ...prev,
          [idx]: 'loading'
        }));

        preloadImage(images[idx])
          .then(() => {
            setPreloadStatus(prev => ({
              ...prev,
              [idx]: 'loaded'
            }));
          })
          .catch(() => {
            setPreloadStatus(prev => ({
              ...prev,
              [idx]: 'error'
            }));
          });
      }
    });
  }, [images, currentIndex, preloadCount, preloadStatus]);

  return preloadStatus;
};

/**
 * 預載入整個畫廊的所有圖片
 * @param images 要預載入的圖片 URL 列表
 * @returns 載入進度資訊
 */
export const useFullGalleryPreloader = (images: string[]) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // 啟動預載入
  const startPreloading = () => {
    if (isLoading || isComplete || !images.length) return;
    
    setIsLoading(true);
    let completed = 0;

    const loadImage = (index: number) => {
      if (index >= images.length) {
        setIsComplete(true);
        setIsLoading(false);
        return;
      }

      preloadImage(images[index])
        .then(() => {
          completed++;
          setLoadedCount(completed);
          
          // 載入下一張
          loadImage(index + 1);
        })
        .catch(() => {
          // 即使失敗也繼續載入下一張
          completed++;
          setLoadedCount(completed);
          loadImage(index + 1);
        });
    };

    // 開始載入第一張圖片
    loadImage(0);
  };
  
  return {
    loadedCount,
    totalCount: images.length,
    isLoading,
    isComplete,
    progress: images.length ? (loadedCount / images.length) * 100 : 0,
    startPreloading
  };
};
