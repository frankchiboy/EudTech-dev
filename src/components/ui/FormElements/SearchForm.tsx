import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import Input from '../Input';
import Button from '../Button';
import { useDebouncedCallback } from '../../../hooks/performance/useDebounce';

interface SearchFormProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  showClearButton?: boolean;
  debounceMs?: number;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  placeholder = 'Search...',
  className,
  showClearButton = true,
  debounceMs = 300
}) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useDebouncedCallback((searchQuery: string) => {
    onSearch(searchQuery);
  }, debounceMs);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-10 pr-10"
          fullWidth
        />
        {showClearButton && query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchForm;