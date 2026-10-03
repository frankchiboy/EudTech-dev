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
  // Build-rendered markup and hydration must request the same image variants.
  // Development uses source images; production and Netlify previews use the CDN.
  return import.meta.env.PROD;
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
