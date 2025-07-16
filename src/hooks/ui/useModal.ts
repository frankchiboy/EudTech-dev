import { useState, useEffect, useCallback } from 'react';

interface UseModalOptions {
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const useModal = (options: UseModalOptions = {}) => {
  const {
    closeOnEscape = true,
    closeOnOverlayClick = true,
    onOpen,
    onClose
  } = options;

  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape' && isOpen) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, close]);

  return {
    isOpen,
    open,
    close,
    toggle
  };
};