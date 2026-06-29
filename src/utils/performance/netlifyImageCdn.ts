const LOCAL_HOST_PATTERNS = [
  /^localhost$/,
  /^host\.docker\.internal$/,
  /^127\.0\.0\.1$/,
  /^192\.168\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./
];

type NetlifyImageOptions = {
  width: number;
  quality?: number;
  format?: 'avif' | 'webp' | 'jpg' | 'png';
};

type ResponsiveImageOptions = {
  widths: number[];
  sizes: string;
  quality?: number;
  format?: 'avif' | 'webp' | 'jpg' | 'png';
};

export const canUseNetlifyImageCdn = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return !LOCAL_HOST_PATTERNS.some((pattern) => pattern.test(window.location.hostname));
};

export const getNetlifyImageUrl = (url: string, options: NetlifyImageOptions) => {
  const params = new URLSearchParams({
    url,
    w: String(options.width)
  });

  if (options.quality) {
    params.set('q', String(options.quality));
  }

  if (options.format) {
    params.set('fm', options.format);
  }

  return `/.netlify/images?${params.toString()}`;
};

export const getResponsiveNetlifyImageProps = (url: string, options: ResponsiveImageOptions) => {
  if (!canUseNetlifyImageCdn()) {
    return {
      src: url,
      srcSet: undefined,
      sizes: undefined
    };
  }

  const widths = [...new Set(options.widths)].sort((a, b) => a - b);
  const largestWidth = widths[widths.length - 1] || options.widths[0];
  const toUrl = (width: number) => getNetlifyImageUrl(url, {
    width,
    quality: options.quality,
    format: options.format
  });

  return {
    src: toUrl(largestWidth),
    srcSet: widths.map((width) => `${toUrl(width)} ${width}w`).join(', '),
    sizes: options.sizes
  };
};
