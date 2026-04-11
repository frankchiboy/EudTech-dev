// 數據格式化工具
export const formatters = {
  // 數字格式化
  number: {
    currency: (value: number, currency: string = 'TWD', locale: string = 'zh-TW') => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
      }).format(value);
    },

    percent: (value: number, decimals: number = 1, locale: string = 'zh-TW') => {
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(value);
    },

    decimal: (value: number, decimals: number = 2, locale: string = 'zh-TW') => {
      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(value);
    },

    compact: (value: number, locale: string = 'zh-TW') => {
      const formatter = new Intl.NumberFormat(locale, { 
        notation: 'compact',
        compactDisplay: 'short'
      });
      return formatter.format(value);
    },

    fileSize: (bytes: number, decimals: number = 2) => {
      if (bytes === 0) return '0 Bytes';
      
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
    }
  },

  // 日期格式化
  date: {
    full: (date: Date | string, locale: string = 'zh-TW') => {
      const dateObj = new Date(date);
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }).format(dateObj);
    },

    short: (date: Date | string, locale: string = 'zh-TW') => {
      const dateObj = new Date(date);
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(dateObj);
    },

    relative: (date: Date | string, locale: string = 'zh-TW') => {
      const dateObj = new Date(date);
      const now = new Date();
      const diffInMs = now.getTime() - dateObj.getTime();
      const diffInSeconds = Math.floor(diffInMs / 1000);

      if (diffInSeconds < 60) return '剛剛';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分鐘前`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}小時前`;
      if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}天前`;
      
      return formatters.date.short(dateObj, locale);
    },

    time: (date: Date | string, locale: string = 'zh-TW') => {
      const dateObj = new Date(date);
      return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(dateObj);
    },

    iso: (date: Date | string) => {
      return new Date(date).toISOString();
    }
  },

  // 文字格式化
  text: {
    truncate: (text: string, length: number, suffix: string = '...') => {
      if (text.length <= length) return text;
      return text.substring(0, length).trim() + suffix;
    },

    words: (text: string, wordCount: number, suffix: string = '...') => {
      const words = text.split(' ');
      if (words.length <= wordCount) return text;
      return words.slice(0, wordCount).join(' ') + suffix;
    },

    capitalize: (text: string) => {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },

    titleCase: (text: string) => {
      return text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    },

    camelCase: (text: string) => {
      return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, '');
    },

    kebabCase: (text: string) => {
      return text
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
    },

    snakeCase: (text: string) => {
      return text
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[\s-]+/g, '_')
        .toLowerCase();
    }
  },

  // 電話號碼格式化
  phone: {
    taiwan: (phone: string) => {
      const cleaned = phone.replace(/\D/g, '');
      if (cleaned.length === 10) {
        return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
      }
      return phone;
    },

    international: (phone: string, countryCode: string = '+886') => {
      const cleaned = phone.replace(/\D/g, '');
      return `${countryCode}-${cleaned}`;
    }
  },

  // 地址格式化
  address: {
    taiwan: (components: {
      city?: string;
      district?: string;
      street?: string;
      number?: string;
    }) => {
      const { city, district, street, number } = components;
      return [city, district, street, number].filter(Boolean).join('');
    }
  }
};

// 驗證和格式化組合
export const validateAndFormat = {
  email: (email: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return {
      isValid,
      formatted: email.toLowerCase().trim()
    };
  },

  phone: (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const isValid = /^09\d{8}$/.test(cleaned);
    return {
      isValid,
      formatted: isValid ? formatters.phone.taiwan(cleaned) : phone
    };
  },

  url: (url: string) => {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      return {
        isValid: true,
        formatted: urlObj.toString()
      };
    } catch {
      return {
        isValid: false,
        formatted: url
      };
    }
  }
};