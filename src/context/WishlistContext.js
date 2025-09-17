import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  STORAGE_KEYS, 
  getFromStorage, 
  setToStorage, 
  validateWishlistItem,
  migrateOldStorage 
} from '../utils/localStorageUtils';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load wishlist from localStorage on mount with error handling
  useEffect(() => {
    const loadWishlistFromStorage = () => {
      try {
        // First migrate any old storage keys
        migrateOldStorage();
        
        const savedWishlist = getFromStorage(STORAGE_KEYS.WISHLIST, []);
        if (Array.isArray(savedWishlist)) {
          // Validate each item
          const validatedWishlist = savedWishlist.filter(validateWishlistItem);
          setWishlistItems(validatedWishlist);
          
          // If some items were filtered out, save the cleaned version
          if (validatedWishlist.length !== savedWishlist.length) {
            setToStorage(STORAGE_KEYS.WISHLIST, validatedWishlist);
          }
        }
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlistFromStorage();
  }, []);

  // Save wishlist to localStorage whenever it changes with error handling
  useEffect(() => {
    if (!isLoading) {
      setToStorage(STORAGE_KEYS.WISHLIST, wishlistItems);
    }
  }, [wishlistItems, isLoading]);

  const addToWishlist = (product) => {
    // Validate product data
    if (!product || !product.id || !product.name || !product.price) {
      console.error('Invalid product data:', product);
      return;
    }

    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (!exists) {
        // Limit wishlist to 50 items to prevent excessive storage usage
        if (prev.length >= 50) {
          console.warn('Wishlist limit reached (50 items)');
          return prev;
        }
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist,
      clearWishlist,
      wishlistCount: wishlistItems.length,
      isLoading
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
