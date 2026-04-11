/**
 * 手機號碼驗證（台灣）
 */
export const validateTaiwanPhone = (phone: string): boolean => {
  const taiwanPhoneRegex = /^09\d{8}$/;
  return taiwanPhoneRegex.test(phone.replace(/\s+/g, ''));
};

/**
 * 手機號碼驗證（國際格式）
 */
export const validateInternationalPhone = (phone: string): boolean => {
  const internationalPhoneRegex = /^\+?[1-9]\d{1,14}$/;
  return internationalPhoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

/**
 * 台灣市話驗證
 */
export const validateTaiwanLandline = (phone: string): boolean => {
  const landlineRegex = /^0[2-8]\d{7,8}$/;
  return landlineRegex.test(phone.replace(/\s+/g, ''));
};

/**
 * 手機號碼格式化（台灣）
 */
export const formatTaiwanPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('09')) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

/**
 * 手機號碼驗證結果類型
 */
export interface PhoneValidationResult {
  isValid: boolean;
  type: 'mobile' | 'landline' | 'international' | 'unknown';
  formatted?: string;
  errors: string[];
}

/**
 * 綜合手機號碼驗證
 */
export const validatePhone = (phone: string): PhoneValidationResult => {
  const errors: string[] = [];
  
  if (!phone) {
    errors.push('手機號碼不能為空');
    return { isValid: false, type: 'unknown', errors };
  }
  
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  if (validateTaiwanPhone(cleaned)) {
    return {
      isValid: true,
      type: 'mobile',
      formatted: formatTaiwanPhone(cleaned),
      errors: []
    };
  }
  
  if (validateTaiwanLandline(cleaned)) {
    return {
      isValid: true,
      type: 'landline',
      formatted: cleaned,
      errors: []
    };
  }
  
  if (validateInternationalPhone(cleaned)) {
    return {
      isValid: true,
      type: 'international',
      formatted: cleaned,
      errors: []
    };
  }
  
  errors.push('手機號碼格式無效');
  return {
    isValid: false,
    type: 'unknown',
    errors
  };
};
