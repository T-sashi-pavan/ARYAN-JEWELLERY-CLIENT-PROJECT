import { useCallback, useState, useEffect } from 'react';
import { searchProducts } from '../utils/searchUtils';

// Debounce hook for search input
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for search functionality
export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  useEffect(() => {
    if (debouncedSearchQuery) {
      setIsSearching(true);
      const results = searchProducts(debouncedSearchQuery);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);
  
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);
  
  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
    if (isSearchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isSearchOpen]);
  
  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  }, []);
  
  return {
    searchQuery,
    searchResults,
    isSearching,
    isSearchOpen,
    handleSearch,
    toggleSearch,
    closeSearch,
    setSearchQuery
  };
};