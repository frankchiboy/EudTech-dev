import React, { useEffect, useRef, useState } from 'react';

export interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderClassName?: string; // skeleton 樣式
  fadeDurationMs?: number;       // 淡入時間
  onLoadComplete?: () => void;   // 完成後回呼（僅觸發一次）
  imgClassName?: string;         // 內層 <img> 的 class，可覆蓋預設 object-cover w-full h-full
}

/**
 * ProgressiveImage：
 *  - 先顯示骨架 / 背景 placeholder
 *  - 圖片載入完成後淡入顯示
 *  - 失敗 fallback（若提供 onError 或 alt）
 */
export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  placeholderClassName = 'bg-gray-200 dark:bg-gray-700 animate-pulse',
  fadeDurationMs = 500,
  imgClassName,
  onLoad,
  onLoadComplete,
  onError,
  ...imgProps
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const calledRef = useRef(false);

  useEffect(() => {
    // 若 src 變動，重置狀態
    setLoaded(false);
    setFailed(false);
    calledRef.current = false;
  }, [src]);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setLoaded(true);
    onLoad?.(e);
    if (!calledRef.current) {
      calledRef.current = true;
      onLoadComplete?.();
    }
  };

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setFailed(true);
    onError?.(e);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ position: 'relative' }}>
      {!loaded && !failed && (
        <div className={`absolute inset-0 ${placeholderClassName}`} aria-hidden="true" />
      )}
      {failed ? (
        <div className="flex items-center justify-center text-xs text-red-500 h-full w-full bg-gray-100 dark:bg-gray-800">
          {alt || 'Image failed'}
        </div>
      ) : (
        <img
          {...imgProps}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{ ...(imgProps as any).style, transitionDuration: `${fadeDurationMs}ms` }}
          className={`${imgClassName ?? 'object-cover w-full h-full'} transition-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};

export default ProgressiveImage;
