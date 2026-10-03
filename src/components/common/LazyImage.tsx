import React from 'react';
import { classNames } from '../../utils/helpers';
import { getResponsiveNetlifyImageProps } from '../../utils/performance/netlifyImageCdn';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  sizes?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  onLoad,
  onError,
  priority = false,
  sizes = '(max-width: 1023px) 100vw, 50vw'
}) => {
  const image = src.startsWith('/') && /\.(?:jpe?g|png|webp)$/i.test(src)
    ? getResponsiveNetlifyImageProps(src, { widths: [480, 768, 1280, 1920], sizes, quality: 80, format: 'webp' })
    : { src };

  return (
    <div className={classNames('relative overflow-hidden', className)}>
      <img
        {...image}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => onLoad?.()}
        onError={(event) => {
          const target = event.currentTarget;
          if (image.src !== src && !target.dataset.originalFallback) {
            target.dataset.originalFallback = 'true';
            target.removeAttribute('srcset');
            target.src = src;
          } else onError?.();
        }}
        className="w-full h-full"
        style={{
          objectFit: className?.includes('object-contain') ? 'contain' : 'cover',
          objectPosition: 'center'
        }}
      />
    </div>
  );
};

export default LazyImage;
