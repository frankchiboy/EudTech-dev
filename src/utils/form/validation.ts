// 表單驗證工具函數
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateField = (
  value: any,
  rules: ValidationRule,
  fieldName: string = '此欄位'
): ValidationResult => {
  const errors: string[] = [];

  // 必填驗證
  if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
    errors.push(`${fieldName}為必填`);
    return { isValid: false, errors };
  }

  // 如果值為空且不是必填，則跳過其他驗證
  if (!value || (typeof value === 'string' && !value.trim())) {
    return { isValid: true, errors: [] };
  }

  // 最小長度驗證
  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`${fieldName}至少需要${rules.minLength}個字符`);
  }

  // 最大長度驗證
  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`${fieldName}最多允許${rules.maxLength}個字符`);
  }

  // 正則表達式驗證
  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push(`${fieldName}格式不正確`);
  }

  // 自定義驗證
  if (rules.custom) {
    const result = rules.custom(value);
    if (typeof result === 'string') {
      errors.push(result);
    } else if (!result) {
      errors.push(`${fieldName}驗證失敗`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// 表單整體驗證
export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, ValidationRule>,
  fieldNames?: Record<keyof T, string>
): { isValid: boolean; errors: Record<keyof T, string[]> } => {
  const errors: Record<keyof T, string[]> = {} as any;
  let isValid = true;

  for (const [field, fieldRules] of Object.entries(rules) as [keyof T, ValidationRule][]) {
    const fieldName = fieldNames?.[field] || String(field);
    const result = validateField(data[field], fieldRules, fieldName);
    
    if (!result.isValid) {
      errors[field] = result.errors;
      isValid = false;
    }
  }

  return { isValid, errors };
};

// 預定義的驗證規則
export const commonRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (!value) return true;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || '請輸入有效的電子郵件地址';
    }
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    custom: (value: string) => {
      if (!value) return true;
      return /^[\+]?[1-9][\d]{0,15}$/.test(value) || '請輸入有效的電話號碼';
    }
  },
  url: {
    custom: (value: string) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return '請輸入有效的網址';
      }
    }
  },
  password: {
    minLength: 8,
    custom: (value: string) => {
      if (!value) return true;
      const hasLower = /[a-z]/.test(value);
      const hasUpper = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      
      if (!hasLower || !hasUpper || !hasNumber) {
        return '密碼必須包含大寫字母、小寫字母和數字';
      }
      return true;
    }
  }
};