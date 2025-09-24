// Local Storage Utility Functions for Aryan's Silver Palace

// Storage keys
export const STORAGE_KEYS = {
  CART: 'aryan-jewelry-cart',
  WISHLIST: 'aryan-jewelry-wishlist',
  USER_PREFERENCES: 'aryan-jewelry-preferences'
};

// Check if localStorage is available
export const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// Safe localStorage getItem with error handling
export const getFromStorage = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    // Remove corrupted data
    localStorage.removeItem(key);
    return defaultValue;
  }
};

// Safe localStorage setItem with error handling
export const setToStorage = (key, value) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
};

// Remove item from localStorage
export const removeFromStorage = (key) => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
    return false;
  }
};

// Clear all app-related localStorage data
export const clearAllAppData = () => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing app data from localStorage:', error);
    return false;
  }
};

// Get storage usage info
export const getStorageInfo = () => {
  if (!isLocalStorageAvailable()) {
    return { available: false };
  }

  try {
    const cart = getFromStorage(STORAGE_KEYS.CART, []);
    const wishlist = getFromStorage(STORAGE_KEYS.WISHLIST, []);
    
    return {
      available: true,
      cartItems: Array.isArray(cart) ? cart.length : 0,
      wishlistItems: Array.isArray(wishlist) ? wishlist.length : 0,
      totalSize: new Blob([
        localStorage.getItem(STORAGE_KEYS.CART) || '',
        localStorage.getItem(STORAGE_KEYS.WISHLIST) || ''
      ]).size
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return { available: true, error: error.message };
  }
};

// Validate cart item structure
export const validateCartItem = (item) => {
  return (
    item &&
    typeof item === 'object' &&
    item.id &&
    item.name &&
    item.price &&
    typeof item.quantity === 'number' &&
    item.quantity > 0 &&
    item.quantity <= 99
  );
};

// Validate wishlist item structure
export const validateWishlistItem = (item) => {
  return (
    item &&
    typeof item === 'object' &&
    item.id &&
    item.name &&
    item.price
  );
};

// Migration function for old localStorage keys
export const migrateOldStorage = () => {
  try {
    // Migrate old 'cart' key to new key
    const oldCart = localStorage.getItem('cart');
    if (oldCart && !localStorage.getItem(STORAGE_KEYS.CART)) {
      localStorage.setItem(STORAGE_KEYS.CART, oldCart);
      localStorage.removeItem('cart');
    }

    // Migrate old 'wishlist' key to new key
    const oldWishlist = localStorage.getItem('wishlist');
    if (oldWishlist && !localStorage.getItem(STORAGE_KEYS.WISHLIST)) {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, oldWishlist);
      localStorage.removeItem('wishlist');
    }
  } catch (error) {
    console.error('Error migrating old storage:', error);
  }
};