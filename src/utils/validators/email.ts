/**
 * 電子郵件驗證
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 強化的電子郵件驗證（包含更嚴格的規則）
 */
export const validateEmailStrict = (email: string): boolean => {
  const strictEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return strictEmailRegex.test(email) && email.length <= 254;
};

/**
 * 電子郵件驗證結果類型
 */
export interface EmailValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * 詳細的電子郵件驗證
 */
export const validateEmailDetailed = (email: string): EmailValidationResult => {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('電子郵件不能為空');
    return { isValid: false, errors };
  }
  
  if (email.length > 254) {
    errors.push('電子郵件長度不能超過254個字符');
  }
  
  if (!email.includes('@')) {
    errors.push('電子郵件必須包含@符號');
  }
  
  const parts = email.split('@');
  if (parts.length !== 2) {
    errors.push('電子郵件格式無效');
  } else {
    const [localPart, domainPart] = parts;
    
    if (localPart.length === 0) {
      errors.push('電子郵件用戶名不能為空');
    } else if (localPart.length > 64) {
      errors.push('電子郵件用戶名長度不能超過64個字符');
    }
    
    if (domainPart.length === 0) {
      errors.push('電子郵件域名不能為空');
    } else if (domainPart.length > 253) {
      errors.push('電子郵件域名長度不能超過253個字符');
    }
    
    if (!domainPart.includes('.')) {
      errors.push('電子郵件域名必須包含至少一個點');
    }
  }
  
  if (!validateEmailStrict(email)) {
    errors.push('電子郵件格式無效');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * 批量驗證電子郵件
 */
export const validateEmails = (emails: string[]): { valid: string[]; invalid: string[] } => {
  const valid: string[] = [];
  const invalid: string[] = [];
  
  emails.forEach(email => {
    if (validateEmail(email)) {
      valid.push(email);
    } else {
      invalid.push(email);
    }
  });
  
  return { valid, invalid };
};
