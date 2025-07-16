export const buildUrl = (base: string, params: Record<string, any> = {}): string => {
  const url = new URL(base, window.location.origin);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });
  
  return url.toString();
};

export const parseUrlParams = (search: string = window.location.search): Record<string, string> => {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
};

export const updateUrlParams = (params: Record<string, any>): void => {
  const url = new URL(window.location.href);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, String(value));
    }
  });
  
  window.history.replaceState({}, '', url.toString());
};

export const isExternalUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.origin !== window.location.origin;
  } catch {
    return false;
  }
};

export const sanitizeUrl = (url: string): string => {
  // 基本的 URL 清理，防止 XSS
  const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
  
  try {
    const urlObj = new URL(url, window.location.origin);
    
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return '#';
    }
    
    return urlObj.toString();
  } catch {
    return '#';
  }
};