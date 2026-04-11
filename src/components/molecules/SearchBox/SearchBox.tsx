import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { classNames } from '../../../utils/helpers';
import { useDebouncedCallback } from '../../../hooks/performance/useDebounce';

interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
  debounceMs?: number;
  showClearButton?: boolean;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = '搜尋...',
  value: controlledValue,
  onSearch,
  onClear,
  debounceMs = 300,
  showClearButton = true,
  className
}) => {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  const debouncedSearch = useDebouncedCallback(onSearch, debounceMs);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    debouncedSearch(newValue);
  };

  const handleClear = () => {
    if (controlledValue === undefined) {
      setInternalValue('');
    }
    onClear?.();
    onSearch('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={classNames(
            'block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600',
            'rounded-lg shadow-sm placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'dark:bg-gray-700 dark:text-white transition-colors duration-200'
          )}
        />
        
        {showClearButton && value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBox;