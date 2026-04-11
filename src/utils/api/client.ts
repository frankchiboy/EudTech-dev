// API 客戶端工具
interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = '', defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };
  }

  private async makeRequest(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<any> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = 10000,
      retries = 0,
      retryDelay = 1000
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    
    const requestConfig: RequestInit = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers
      },
      ...(body && { body: JSON.stringify(body) })
    };

    // 添加超時控制
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    requestConfig.signal = controller.signal;

    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, requestConfig);
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await response.json();
        }
        
        return await response.text();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        }
      }
    }

    throw lastError!;
  }

  // HTTP 方法包裝器
  async get(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) {
    return this.makeRequest(endpoint, { ...config, method: 'GET' });
  }

  async post(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>) {
    return this.makeRequest(endpoint, { ...config, method: 'POST', body });
  }

  async put(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>) {
    return this.makeRequest(endpoint, { ...config, method: 'PUT', body });
  }

  async delete(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) {
    return this.makeRequest(endpoint, { ...config, method: 'DELETE' });
  }

  async patch(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>) {
    return this.makeRequest(endpoint, { ...config, method: 'PATCH', body });
  }

  // 設置認證 token
  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // 移除認證 token
  removeAuthToken() {
    delete this.defaultHeaders['Authorization'];
  }

  // 更新預設 headers
  setDefaultHeaders(headers: Record<string, string>) {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }
}

// 創建預設客戶端實例
export const apiClient = new ApiClient();

// 匯出類別供自訂使用
export { ApiClient };