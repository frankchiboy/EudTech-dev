/**
 * URL 驗證
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * HTTP/HTTPS URL 驗證
 */
export const validateHttpUrl = (url: string): boolean => {
  const httpUrlRegex = /^https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?$/;
  return httpUrlRegex.test(url);
};

/**
 * 域名驗證
 */
export const validateDomain = (domain: string): boolean => {
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
  return domainRegex.test(domain) && domain.length <= 253;
};

/**
 * IP 地址驗證
 */
export const validateIPAddress = (ip: string): boolean => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

/**
 * URL 驗證結果類型
 */
export interface UrlValidationResult {
  isValid: boolean;
  protocol?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  errors: string[];
}

/**
 * 詳細的 URL 驗證
 */
export const validateUrlDetailed = (url: string): UrlValidationResult => {
  const errors: string[] = [];
  
  if (!url) {
    errors.push('URL不能為空');
    return { isValid: false, errors };
  }
  
  try {
    const parsedUrl = new URL(url);
    
    const allowedProtocols = ['http:', 'https:', 'ftp:', 'ftps:'];
    if (!allowedProtocols.includes(parsedUrl.protocol)) {
      errors.push(`不支援的協議: ${parsedUrl.protocol}`);
    }
    
    if (!parsedUrl.hostname) {
      errors.push('URL必須包含主機名');
    }
    
    return {
      isValid: errors.length === 0,
      protocol: parsedUrl.protocol,
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      pathname: parsedUrl.pathname,
      errors
    };
  } catch (error) {
    errors.push('URL格式無效');
    return { isValid: false, errors };
  }
};

/**
 * 相對 URL 驗證
 */
export const validateRelativeUrl = (url: string): boolean => {
  const relativeUrlRegex = /^\/(?:[\w\/-]*(?:\?[\w&=%.-]*)?(?:#[\w.-]*)?)?$/;
  return relativeUrlRegex.test(url);
};
