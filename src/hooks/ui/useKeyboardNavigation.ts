import { useEffect, useRef, useCallback } from 'react';

interface UseKeyboardNavigationOptions {
  enabled?: boolean;
  loop?: boolean;
  onSelect?: (index: number) => void;
  onEscape?: () => void;
}

export const useKeyboardNavigation = (
  itemCount: number,
  options: UseKeyboardNavigationOptions = {}
) => {
  const {
    enabled = true,
    loop = true,
    onSelect,
    onEscape
  } = options;

  const activeIndexRef = useRef(-1);
  const containerRef = useRef<HTMLElement>(null);

  const setActiveIndex = useCallback((index: number) => {
    if (!enabled) return;

    let newIndex = index;
    
    if (loop) {
      if (newIndex >= itemCount) newIndex = 0;
      if (newIndex < 0) newIndex = itemCount - 1;
    } else {
      newIndex = Math.max(0, Math.min(itemCount - 1, newIndex));
    }

    activeIndexRef.current = newIndex;

    // 更新焦點
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('[data-keyboard-nav-item]');
      const activeItem = items[newIndex] as HTMLElement;
      
      if (activeItem) {
        activeItem.focus();
      }
    }
  }, [itemCount, loop, enabled]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex(activeIndexRef.current + 1);
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex(activeIndexRef.current - 1);
        break;
        
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
        
      case 'End':
        event.preventDefault();
        setActiveIndex(itemCount - 1);
        break;
        
      case 'Enter':
        event.preventDefault();
        if (activeIndexRef.current >= 0) {
          onSelect?.(activeIndexRef.current);
        }
        break;
        
      case 'Escape':
        event.preventDefault();
        onEscape?.();
        break;
    }
  }, [enabled, itemCount, setActiveIndex, onSelect, onEscape]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    container.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, enabled]);

  const reset = useCallback(() => {
    activeIndexRef.current = -1;
  }, []);

  return {
    containerRef,
    activeIndex: activeIndexRef.current,
    setActiveIndex,
    reset
  };
};