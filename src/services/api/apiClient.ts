import { ApiResponse, RequestConfig } from '../../types/api';

/**
 * API 客戶端配置
 */
export interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  headers?: Record<string, string>;
}

/**
 * 請求攔截器類型
 */
export type RequestInterceptor = (config: RequestInit) => RequestInit | Promise<RequestInit>;

/**
 * 響應攔截器類型
 */
export type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

/**
 * 錯誤攔截器類型
 */
export type ErrorInterceptor = (error: Error) => Error | Promise<Error>;

/**
 * API 客戶端類
 */
export class ApiClient {
  private config: ApiClientConfig;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  constructor(config: Partial<ApiClientConfig> = {}) {
    this.config = {
      baseURL: '',
      timeout: 10000,
      retries: 3,
      retryDelay: 1000,
      ...config
    };
  }

  /**
   * 添加請求攔截器
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * 添加響應攔截器
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * 添加錯誤攔截器
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor);
  }

  /**
   * 處理請求攔截器
   */
  private async applyRequestInterceptors(config: RequestInit): Promise<RequestInit> {
    let processedConfig = config;
    for (const interceptor of this.requestInterceptors) {
      processedConfig = await interceptor(processedConfig);
    }
    return processedConfig;
  }

  /**
   * 處理響應攔截器
   */
  private async applyResponseInterceptors(response: Response): Promise<Response> {
    let processedResponse = response;
    for (const interceptor of this.responseInterceptors) {
      processedResponse = await interceptor(processedResponse);
    }
    return processedResponse;
  }

  /**
   * 處理錯誤攔截器
   */
  private async applyErrorInterceptors(error: Error): Promise<Error> {
    let processedError = error;
    for (const interceptor of this.errorInterceptors) {
      processedError = await interceptor(processedError);
    }
    return processedError;
  }

  /**
   * 發送請求
   */
  async request<T>(
    endpoint: string,
    options: RequestInit & { config?: RequestConfig } = {}
  ): Promise<ApiResponse<T>> {
    const { config: requestConfig, ...fetchOptions } = options;
    const url = `${this.config.baseURL}${endpoint}`;
    
    // 合併配置
    const mergedConfig = {
      ...this.config,
      ...requestConfig
    };

    // 準備請求配置
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers,
        ...mergedConfig.headers,
        ...fetchOptions.headers
      },
      ...fetchOptions
    };

    // 應用請求攔截器
    const processedConfig = await this.applyRequestInterceptors(requestInit);

    // 執行請求（帶重試機制）
    return this.executeWithRetry(url, processedConfig, mergedConfig.retries, mergedConfig.retryDelay);
  }

  /**
   * 帶重試機制的請求執行
   */
  private async executeWithRetry<T>(
    url: string,
    config: RequestInit,
    retries: number,
    retryDelay: number
  ): Promise<ApiResponse<T>> {
    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // 設置超時
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(url, {
          ...config,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        // 應用響應攔截器
        const processedResponse = await this.applyResponseInterceptors(response.clone());

        if (!processedResponse.ok) {
          throw new Error(`HTTP Error: ${processedResponse.status} ${processedResponse.statusText}`);
        }

        const data = await processedResponse.json();
        return data;

      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // 應用錯誤攔截器
        lastError = await this.applyErrorInterceptors(lastError);

        // 如果不是最後一次嘗試，等待後重試
        if (attempt < retries) {
          await this.delay(retryDelay * Math.pow(2, attempt)); // 指數退避
        }
      }
    }

    throw lastError!;
  }

  /**
   * 延遲函數
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * GET 請求
   */
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', config });
  }

  /**
   * POST 請求
   */
  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      config
    });
  }

  /**
   * PUT 請求
   */
  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      config
    });
  }

  /**
   * PATCH 請求
   */
  async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      config
    });
  }

  /**
   * DELETE 請求
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', config });
  }
}

/**
 * 默認 API 客戶端實例
 */
export const apiClient = new ApiClient({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 10000,
  retries: 3,
  retryDelay: 1000
});

// 添加默認攔截器
apiClient.addRequestInterceptor((config) => {
  // 添加授權標頭等通用處理
  console.log('Processing request:', config);
  return config;
});

apiClient.addResponseInterceptor((response) => {
  // 記錄響應時間
  console.log(`API Response: ${response.url} - ${response.status} (${response.headers.get('content-length')} bytes)`);
  return response;
});

apiClient.addErrorInterceptor((error) => {
  // 統一錯誤處理
  console.error('API Error:', error.message);
  return error;
});
