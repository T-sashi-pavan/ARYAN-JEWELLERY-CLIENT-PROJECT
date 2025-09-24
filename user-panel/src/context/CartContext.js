import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  STORAGE_KEYS, 
  getFromStorage, 
  setToStorage, 
  validateCartItem,
  migrateOldStorage 
} from '../utils/localStorageUtils';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount with error handling
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        // First migrate any old storage keys
        migrateOldStorage();
        
        const savedCart = getFromStorage(STORAGE_KEYS.CART, []);
        if (Array.isArray(savedCart)) {
          // Validate each item
          const validatedCart = savedCart.filter(validateCartItem);
          setCartItems(validatedCart);
          
          // If some items were filtered out, save the cleaned version
          if (validatedCart.length !== savedCart.length) {
            setToStorage(STORAGE_KEYS.CART, validatedCart);
          }
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartFromStorage();
  }, []);

  // Save cart to localStorage whenever it changes with error handling
  useEffect(() => {
    if (!isLoading) {
      setToStorage(STORAGE_KEYS.CART, cartItems);
    }
  }, [cartItems, isLoading]);

  const addToCart = (product) => {
    // Validate product data
    if (!product || !product.id || !product.name || !product.price) {
      console.error('Invalid product data:', product);
      return;
    }

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 99) } // Limit quantity to 99
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    // Validate quantity
    if (typeof newQuantity !== 'number' || newQuantity < 0) {
      console.error('Invalid quantity:', newQuantity);
      return;
    }

    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.min(newQuantity, 99) } // Limit quantity to 99
          : item
      )
    );
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Handle both string prices (like '₹25,000') and numeric prices (like 25000)
      let price;
      if (typeof item.price === 'number') {
        price = item.price;
      } else if (typeof item.price === 'string') {
        price = parseInt(item.price.replace(/[^\d]/g, ''));
      } else {
        price = 0;
      }
      return total + (price * item.quantity);
    }, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    isInCart,
    getCartItemCount,
    getCartTotal,
    clearCart,
    cartCount: getCartItemCount(),
    isLoading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};