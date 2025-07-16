import { useState, useEffect } from 'react';
import { ApiState, RequestStatus } from '../../types/api';

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export const useApi = <T = any>(
  apiCall: () => Promise<T>,
  options: UseApiOptions = {}
) => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    status: 'idle',
    error: null
  });

  const execute = async () => {
    setState(prev => ({ ...prev, status: 'loading', error: null }));
    
    try {
      const data = await apiCall();
      setState({
        data,
        status: 'success',
        error: null,
        lastUpdated: Date.now()
      });
      
      if (options.onSuccess) {
        options.onSuccess(data);
      }
      
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState(prev => ({
        ...prev,
        status: 'error',
        error: errorMessage
      }));
      
      if (options.onError) {
        options.onError(errorMessage);
      }
      
      throw error;
    }
  };

  const reset = () => {
    setState({
      data: null,
      status: 'idle',
      error: null
    });
  };

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, []);

  return {
    ...state,
    execute,
    reset,
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error'
  };
};