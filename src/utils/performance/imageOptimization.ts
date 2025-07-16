export const generateSrcSet = (baseUrl: string, sizes: number[]): string => {
  return sizes
    .map(size => `${baseUrl}?w=${size} ${size}w`)
    .join(', ');
};

export const generateSizes = (breakpoints: { [key: string]: string }): string => {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
    .join(', ');
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadCriticalImages = async (images: string[]): Promise<void> => {
  const promises = images.map(preloadImage);
  await Promise.all(promises);
};

export const optimizeImageLoading = () => {
  // 預載入關鍵圖片
  const criticalImages = [
    '/grando-8gpu-server.jpg',
    '/comino-4xa100.jpg'
  ];
  
  preloadCriticalImages(criticalImages);
};