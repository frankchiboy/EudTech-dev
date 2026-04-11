/**
 * 基礎 API 回應類型
 */
export interface ApiResponse<T = any> {
  /** 是否成功 */
  success: boolean;
  /** 回應數據 */
  data?: T;
  /** 回應訊息 */
  message?: string;
  /** 錯誤列表 */
  errors?: string[];
  /** HTTP 狀態碼 */
  status?: number;
  /** 時間戳 */
  timestamp?: string;
}

/**
 * 分頁回應類型
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  /** 分頁資訊 */
  pagination: {
    current_page: number;
    total_pages: number;
    per_page: number;
    total_items: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

/**
 * API 錯誤類型
 */
export interface ApiError {
  /** 錯誤訊息 */
  message: string;
  /** 錯誤代碼 */
  code?: string;
  /** 錯誤詳情 */
  details?: any;
  /** 錯誤字段 */
  field?: string;
  /** 錯誤堆疊 */
  stack?: string;
}

/**
 * 查詢參數類型
 */
export interface QueryParams {
  /** 頁數 */
  page?: number;
  /** 每頁筆數 */
  limit?: number;
  /** 搜尋關鍵字 */
  search?: string;
  /** 分類 */
  category?: string;
  /** 排序字段 */
  sort?: string;
  /** 排序方向 */
  order?: 'asc' | 'desc';
  /** 篩選條件 */
  filters?: Record<string, any>;
  /** 包含字段 */
  include?: string[];
  /** 排除字段 */
  exclude?: string[];
}

/**
 * 請求狀態類型
 */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * 通用 API 狀態類型
 */
export interface ApiState<T = any> {
  /** 數據 */
  data: T | null;
  /** 請求狀態 */
  status: RequestStatus;
  /** 錯誤訊息 */
  error: string | null;
  /** 最後更新時間 */
  lastUpdated?: number;
  /** 是否載入中 */
  loading?: boolean;
}

/**
 * API 請求配置類型
 */
export interface RequestConfig {
  /** 請求超時時間（毫秒） */
  timeout?: number;
  /** 重試次數 */
  retries?: number;
  /** 重試延遲（毫秒） */
  retryDelay?: number;
  /** 是否快取 */
  cache?: boolean;
  /** 快取時間（毫秒） */
  cacheTime?: number;
  /** 請求頭 */
  headers?: Record<string, string>;
  /** 身份驗證令牌 */
  token?: string;
}

/**
 * 文件上傳類型
 */
export interface FileUpload {
  /** 文件對象 */
  file: File;
  /** 上傳進度 */
  progress?: number;
  /** 上傳狀態 */
  status: 'pending' | 'uploading' | 'success' | 'error';
  /** 錯誤訊息 */
  error?: string;
  /** 上傳後的 URL */
  url?: string;
}

/**
 * WebSocket 訊息類型
 */
export interface WebSocketMessage<T = any> {
  /** 訊息類型 */
  type: string;
  /** 訊息內容 */
  payload: T;
  /** 訊息 ID */
  id?: string;
  /** 時間戳 */
  timestamp: string;
}