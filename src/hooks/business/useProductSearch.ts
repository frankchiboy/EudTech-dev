import { useState, useEffect } from 'react';
import { Product } from '../../data/models/Product';
import { productService } from '../../services/product/ProductService';
import { useDebounce } from '../performance/useDebounce';

interface UseProductSearchOptions {
  debounceMs?: number;
  minQueryLength?: number;
}

export const useProductSearch = (
  isEnglish: boolean,
  options: UseProductSearchOptions = {}
) => {
  const { debounceMs = 300, minQueryLength = 2 } = options;
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, debounceMs);

  useEffect(() => {
    const searchProducts = async () => {
      if (debouncedQuery.length < minQueryLength) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const searchResults = await productService.searchProducts(debouncedQuery, isEnglish);
        setResults(searchResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchProducts();
  }, [debouncedQuery, isEnglish, minQueryLength]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setError(null);
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    clearSearch,
    hasResults: results.length > 0,
    isEmpty: debouncedQuery.length >= minQueryLength && results.length === 0 && !isLoading
  };
};