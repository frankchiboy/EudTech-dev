export const MESSAGES = {
  LOADING: {
    EN: 'Loading...',
    ZH: '載入中...'
  },
  ERROR: {
    GENERIC: {
      EN: 'An error occurred. Please try again.',
      ZH: '發生錯誤，請重試。'
    },
    NETWORK: {
      EN: 'Network error. Please check your connection.',
      ZH: '網路錯誤，請檢查您的連線。'
    },
    NOT_FOUND: {
      EN: 'The requested resource was not found.',
      ZH: '找不到請求的資源。'
    }
  },
  SUCCESS: {
    FORM_SUBMITTED: {
      EN: 'Form submitted successfully!',
      ZH: '表單提交成功！'
    },
    EMAIL_SENT: {
      EN: 'Email sent successfully!',
      ZH: '郵件發送成功！'
    }
  },
  VALIDATION: {
    REQUIRED: {
      EN: 'This field is required',
      ZH: '此欄位為必填'
    },
    EMAIL_INVALID: {
      EN: 'Please enter a valid email address',
      ZH: '請輸入有效的電子郵件地址'
    },
    MIN_LENGTH: {
      EN: (min: number) => `Minimum ${min} characters required`,
      ZH: (min: number) => `至少需要 ${min} 個字符`
    },
    MAX_LENGTH: {
      EN: (max: number) => `Maximum ${max} characters allowed`,
      ZH: (max: number) => `最多允許 ${max} 個字符`
    }
  }
} as const;

export const getMessage = (
  path: string,
  isEnglish: boolean,
  ...args: any[]
): string => {
  const keys = path.split('.');
  let message: any = MESSAGES;
  
  for (const key of keys) {
    message = message[key];
    if (!message) return path;
  }
  
  const localized = message[isEnglish ? 'EN' : 'ZH'];
  
  if (typeof localized === 'function') {
    return localized(...args);
  }
  
  return localized || path;
};