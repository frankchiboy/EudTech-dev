/**
 * 表單欄位驗證規則類型
 */
export interface ValidationRule {
  /** 規則名稱 */
  name: string;
  /** 驗證函數 */
  validator: (value: any, formData?: Record<string, any>) => boolean;
  /** 錯誤訊息 */
  message: string;
}

/**
 * 表單驗證配置類型
 */
export interface FormValidationConfig {
  [fieldName: string]: ValidationRule[];
}

/**
 * 表單驗證結果類型
 */
export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

/**
 * 必填驗證規則
 */
export const requiredRule = (message = '此欄位為必填'): ValidationRule => ({
  name: 'required',
  validator: (value) => value !== null && value !== undefined && value !== '',
  message
});

/**
 * 最小長度驗證規則
 */
export const minLengthRule = (minLength: number, message?: string): ValidationRule => ({
  name: 'minLength',
  validator: (value) => String(value).length >= minLength,
  message: message || `最少需要 ${minLength} 個字符`
});

/**
 * 最大長度驗證規則
 */
export const maxLengthRule = (maxLength: number, message?: string): ValidationRule => ({
  name: 'maxLength',
  validator: (value) => String(value).length <= maxLength,
  message: message || `最多只能 ${maxLength} 個字符`
});

/**
 * 正則表達式驗證規則
 */
export const patternRule = (pattern: RegExp, message: string): ValidationRule => ({
  name: 'pattern',
  validator: (value) => pattern.test(String(value)),
  message
});

/**
 * 數字範圍驗證規則
 */
export const rangeRule = (min: number, max: number, message?: string): ValidationRule => ({
  name: 'range',
  validator: (value) => {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
  },
  message: message || `值必須在 ${min} 到 ${max} 之間`
});

/**
 * 數字驗證規則
 */
export const numberRule = (message = '必須是有效的數字'): ValidationRule => ({
  name: 'number',
  validator: (value) => !isNaN(Number(value)) && isFinite(Number(value)),
  message
});

/**
 * 整數驗證規則
 */
export const integerRule = (message = '必須是整數'): ValidationRule => ({
  name: 'integer',
  validator: (value) => Number.isInteger(Number(value)),
  message
});

/**
 * 確認密碼驗證規則
 */
export const confirmPasswordRule = (passwordField: string, message = '密碼確認不匹配'): ValidationRule => ({
  name: 'confirmPassword',
  validator: (value, formData) => formData ? value === formData[passwordField] : false,
  message
});

/**
 * 日期驗證規則
 */
export const dateRule = (message = '必須是有效的日期'): ValidationRule => ({
  name: 'date',
  validator: (value) => {
    const date = new Date(value);
    return date instanceof Date && !isNaN(date.getTime());
  },
  message
});

/**
 * 未來日期驗證規則
 */
export const futureDateRule = (message = '日期必須是未來的日期'): ValidationRule => ({
  name: 'futureDate',
  validator: (value) => {
    const date = new Date(value);
    return date > new Date();
  },
  message
});

/**
 * 驗證單個欄位
 */
export const validateField = (value: any, rules: ValidationRule[], formData?: Record<string, any>): string[] => {
  const errors: string[] = [];
  
  for (const rule of rules) {
    if (!rule.validator(value, formData)) {
      errors.push(rule.message);
    }
  }
  
  return errors;
};

/**
 * 驗證整個表單
 */
export const validateForm = (formData: Record<string, any>, config: FormValidationConfig): FormValidationResult => {
  const errors: Record<string, string[]> = {};
  let isValid = true;
  
  for (const [fieldName, rules] of Object.entries(config)) {
    const fieldErrors = validateField(formData[fieldName], rules, formData);
    if (fieldErrors.length > 0) {
      errors[fieldName] = fieldErrors;
      isValid = false;
    }
  }
  
  return { isValid, errors };
};

/**
 * 異步驗證規則類型
 */
export interface AsyncValidationRule {
  name: string;
  validator: (value: any, formData?: Record<string, any>) => Promise<boolean>;
  message: string;
}

/**
 * 異步驗證欄位
 */
export const validateFieldAsync = async (
  value: any, 
  rules: (ValidationRule | AsyncValidationRule)[], 
  formData?: Record<string, any>
): Promise<string[]> => {
  const errors: string[] = [];
  
  for (const rule of rules) {
    try {
      const isValid = 'validator' in rule 
        ? await rule.validator(value, formData)
        : rule.validator(value, formData);
        
      if (!isValid) {
        errors.push(rule.message);
      }
    } catch (error) {
      errors.push(`驗證失敗: ${error instanceof Error ? error.message : '未知錯誤'}`);
    }
  }
  
  return errors;
};
