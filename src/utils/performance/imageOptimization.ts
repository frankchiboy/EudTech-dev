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

// 智能預載入即將進入視區的圖片
export const setupIntelligentImagePreloading = (): void => {
  const images = document.querySelectorAll('img[data-src]');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.getAttribute('data-src');
          if (src) {
            preloadImage(src);
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    },
    { 
      threshold: 0.1,
      rootMargin: '300px 0px' // 提前 300px 開始預載入
    }
  );

  images.forEach(img => observer.observe(img));
};

// 批量預載入圖片並提供進度回調
export const preloadImagesWithProgress = (
  images: string[], 
  onProgress?: (loaded: number, total: number) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    let loadedCount = 0;
    const total = images.length;
    
    if (total === 0) {
      resolve();
      return;
    }
    
    images.forEach(src => 
      preloadImage(src)
        .then(() => {
          loadedCount++;
          onProgress?.(loadedCount, total);
          if (loadedCount === total) {
            resolve();
          }
        })
        .catch(reject)
    );
  });
};

// 生成或取得縮圖URL
export const getThumbnailUrl = (originalUrl: string): string => {
  // 直接返回原圖 - 更改策略為即時載入，避免看到空白區域
  return originalUrl;
  
  // 以下代碼已不使用，但保留給未來可能的優化
  /*
  // 如果是外部URL (例如 https://images.pexels.com)
  if (originalUrl.startsWith('http')) {
    if (originalUrl.includes('pexels.com')) {
      return `${originalUrl}?auto=compress&cs=tinysrgb&w=50&blur=15`;
    }
    if (originalUrl.includes('unsplash.com')) {
      return `${originalUrl}&w=50&blur=15&q=20`;
    }
    return originalUrl;
  }
  
  // 本地圖片 - 嘗試使用縮圖版本，或者使用相同圖片
  const parts = originalUrl.split('.');
  if (parts.length > 1) {
    const ext = parts.pop() || '';
    const base = parts.join('.');
    
    // 檢查是否已經是縮圖
    if (base.endsWith('-thumb')) {
      return originalUrl;
    }
    
    // 先檢查是否有對應的縮圖
    const thumbUrl = `${base}-thumb.${ext}`;
    
    // 如果是產品圖庫，通常會有預先生成的縮圖
    if (originalUrl.includes('/products/') || originalUrl.includes('/gallery/')) {
      return thumbUrl;
    }
    
    return originalUrl;
  }
  
  return originalUrl;
  */
};

// 為指定的圖片創建縮圖元素
export const createThumbnailElements = () => {
  // 這個函數可以在未來擴展，自動為網站上的圖片創建縮圖版本
  console.log('縮圖系統已啟動');
};

export const optimizeImageLoading = () => {
  // 預載入關鍵圖片
  const criticalImages = [
    // 首頁關鍵圖片
    '/grando-8gpu-server.jpg',
    '/comino-4xa100.jpg',
    '/comino-h100-server.jpg',
    '/comino-workstation-front.png',
    '/EudTech-Select-server-front.png',
    
    // 產品圖庫第一張圖片
    '/GRANDO DPR 4090-FT_6_01.jpg',
    '/comino-grando-logo.png',
    '/comino-facility-1.jpg',
    
    // 其他重要圖片
    '/GRANDO DPR 4090-FT_6_02.jpg',
    '/GRANDO DPR 4090-FT_6_03.jpg',
    '/GRANDO DPR 4090-FT_6_04.jpg',
    '/GRANDO DPR 4090-FT_6_05.jpg',
    '/GRANDO DPR 4090-FT_6_06.jpg',
    '/comino-facility-2.jpg',
    '/comino-facility-3.jpg',
    '/amd-logo.png',
    '/amd-partner-badge.jpg'
  ];
  
  // 立即預載入關鍵圖片
  preloadCriticalImages(criticalImages);
  
  // 激進預載入策略 - 延遲 500ms 後預載入所有 public 目錄下的圖片
  setTimeout(() => {
    // 找到頁面上所有圖片並預載入它們
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('data:')) {
        // 預載入原始圖片
        const preloadImg = new Image();
        preloadImg.src = src;
      }
    });
    
    // 啟動智能預載入系統
    setupIntelligentImagePreloading();
    
    // 預載入 public 目錄的常見格式圖片
    fetch('/public-images-list.json')
      .then(response => response.json())
      .catch(() => {
        console.log('找不到圖片清單，繼續使用默認預載入策略');
      });
      
  }, 500);
  
  console.log('增強型圖片預載入系統已啟動 - 將主動載入所有圖片資源');
};