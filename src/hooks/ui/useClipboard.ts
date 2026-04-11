import { useState, useCallback } from 'react';

interface UseClipboardOptions {
  successDuration?: number;
  onSuccess?: (text: string) => void;
  onError?: (error: Error) => void;
}

export const useClipboard = (options: UseClipboardOptions = {}) => {
  const {
    successDuration = 2000,
    onSuccess,
    onError
  } = options;

  const [hasCopied, setHasCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) {
          throw new Error('Failed to copy text');
        }
      }

      setHasCopied(true);
      setError(null);
      onSuccess?.(text);

      // Reset after success duration
      setTimeout(() => {
        setHasCopied(false);
      }, successDuration);

    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to copy');
      setError(error.message);
      setHasCopied(false);
      onError?.(error);
    }
  }, [successDuration, onSuccess, onError]);

  const readFromClipboard = useCallback(async (): Promise<string | null> => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        return await navigator.clipboard.readText();
      }
      return null;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to read clipboard');
      setError(error.message);
      onError?.(error);
      return null;
    }
  }, [onError]);

  const reset = useCallback(() => {
    setHasCopied(false);
    setError(null);
  }, []);

  return {
    copyToClipboard,
    readFromClipboard,
    hasCopied,
    error,
    reset,
    isSupported: !!(navigator.clipboard || document.execCommand)
  };
};