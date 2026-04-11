import { useState, useCallback } from 'react';

/**
 * 模態框狀態管理 Hook
 */
export interface UseModalReturn {
  /** 是否開啟 */
  isOpen: boolean;
  /** 開啟模態框 */
  open: () => void;
  /** 關閉模態框 */
  close: () => void;
  /** 切換模態框狀態 */
  toggle: () => void;
}

export const useModal = (initialState = false): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle
  };
};

/**
 * 切換狀態 Hook
 */
export interface UseToggleReturn {
  /** 當前狀態 */
  value: boolean;
  /** 切換狀態 */
  toggle: () => void;
  /** 設置為 true */
  setTrue: () => void;
  /** 設置為 false */
  setFalse: () => void;
  /** 設置特定值 */
  setValue: (value: boolean) => void;
}

export const useToggle = (initialValue = false): UseToggleReturn => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue
  };
};

/**
 * 計數器 Hook
 */
export interface UseCounterReturn {
  /** 當前值 */
  count: number;
  /** 增加 */
  increment: (step?: number) => void;
  /** 減少 */
  decrement: (step?: number) => void;
  /** 重置 */
  reset: () => void;
  /** 設置值 */
  setCount: (value: number) => void;
}

export const useCounter = (
  initialValue = 0,
  options: { min?: number; max?: number } = {}
): UseCounterReturn => {
  const { min, max } = options;
  const [count, setCount] = useState(initialValue);

  const increment = useCallback((step = 1) => {
    setCount(prev => {
      const newValue = prev + step;
      if (max !== undefined && newValue > max) return max;
      return newValue;
    });
  }, [max]);

  const decrement = useCallback((step = 1) => {
    setCount(prev => {
      const newValue = prev - step;
      if (min !== undefined && newValue < min) return min;
      return newValue;
    });
  }, [min]);

  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  const setValue = useCallback((value: number) => {
    setCount(() => {
      if (min !== undefined && value < min) return min;
      if (max !== undefined && value > max) return max;
      return value;
    });
  }, [min, max]);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount: setValue
  };
};

/**
 * 陣列狀態管理 Hook
 */
export interface UseArrayReturn<T> {
  /** 陣列值 */
  value: T[];
  /** 設置陣列 */
  setValue: (value: T[]) => void;
  /** 新增項目 */
  push: (...items: T[]) => void;
  /** 移除最後一項 */
  pop: () => T | undefined;
  /** 新增項目到開頭 */
  unshift: (...items: T[]) => void;
  /** 移除第一項 */
  shift: () => T | undefined;
  /** 移除指定索引的項目 */
  removeAt: (index: number) => void;
  /** 在指定索引插入項目 */
  insertAt: (index: number, item: T) => void;
  /** 更新指定索引的項目 */
  updateAt: (index: number, item: T) => void;
  /** 清空陣列 */
  clear: () => void;
  /** 過濾陣列 */
  filter: (predicate: (item: T, index: number) => boolean) => void;
  /** 移除特定項目 */
  remove: (item: T) => void;
}

export const useArray = <T>(initialValue: T[] = []): UseArrayReturn<T> => {
  const [value, setValue] = useState<T[]>(initialValue);

  const push = useCallback((...items: T[]) => {
    setValue(prev => [...prev, ...items]);
  }, []);

  const pop = useCallback(() => {
    let poppedItem: T | undefined;
    setValue(prev => {
      poppedItem = prev[prev.length - 1];
      return prev.slice(0, -1);
    });
    return poppedItem;
  }, []);

  const unshift = useCallback((...items: T[]) => {
    setValue(prev => [...items, ...prev]);
  }, []);

  const shift = useCallback(() => {
    let shiftedItem: T | undefined;
    setValue(prev => {
      shiftedItem = prev[0];
      return prev.slice(1);
    });
    return shiftedItem;
  }, []);

  const removeAt = useCallback((index: number) => {
    setValue(prev => prev.filter((_, i) => i !== index));
  }, []);

  const insertAt = useCallback((index: number, item: T) => {
    setValue(prev => [
      ...prev.slice(0, index),
      item,
      ...prev.slice(index)
    ]);
  }, []);

  const updateAt = useCallback((index: number, item: T) => {
    setValue(prev => prev.map((existingItem, i) => i === index ? item : existingItem));
  }, []);

  const clear = useCallback(() => setValue([]), []);

  const filter = useCallback((predicate: (item: T, index: number) => boolean) => {
    setValue(prev => prev.filter(predicate));
  }, []);

  const remove = useCallback((item: T) => {
    setValue(prev => prev.filter(existingItem => existingItem !== item));
  }, []);

  return {
    value,
    setValue,
    push,
    pop,
    unshift,
    shift,
    removeAt,
    insertAt,
    updateAt,
    clear,
    filter,
    remove
  };
};
