// API 相關類型定義
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    current_page: number;
    total_pages: number;
    per_page: number;
    total_items: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

// 請求狀態
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

// 通用 API 狀態
export interface ApiState<T = any> {
  data: T | null;
  status: RequestStatus;
  error: string | null;
  lastUpdated?: number;
}