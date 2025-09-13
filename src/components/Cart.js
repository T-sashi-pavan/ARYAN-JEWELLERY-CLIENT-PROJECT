import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { handleCartWhatsAppCheckout } from '../utils/whatsappUtils';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  // Helper function to extract numeric value from price (handles both string and number)
  const getPriceValue = (price) => {
    if (typeof price === 'number') {
      return price;
    }
    if (typeof price === 'string') {
      return parseInt(price.replace(/[^\d]/g, ''));
    }
    return 0;
  };

  // Helper function to format price for display
  const formatPrice = (price) => {
    if (typeof price === 'string' && price.includes('₹')) {
      return price;
    }
    return `₹${price?.toLocaleString() || '0'}`;
  };

  const handleWhatsAppCheckout = () => {
    handleCartWhatsAppCheckout(cartItems, getCartTotal());
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1>CART LIST</h1>
          </div>
          <div className="empty-cart">
            <div className="empty-cart-content">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Add some beautiful jewelry pieces to your cart</p>
              <Link to="/" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>CART LIST</h1>
          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                </div>
                
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="cart-item-category">{item.category}</div>
                </div>

                <div className="cart-item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-price">
                  <div className="unit-price">{formatPrice(item.price)}</div>
                  <div className="total-price">
                    ₹{(getPriceValue(item.price) * item.quantity).toLocaleString()}
                  </div>
                </div>

                <button 
                  className="remove-item-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-summary-content">
              <h3>Order Summary</h3>
              
              <div className="summary-line">
                <span>Items ({cartItems.length})</span>
                <span>₹{getCartTotal().toLocaleString()}</span>
              </div>
              
              <div className="summary-line">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="summary-line total">
                <span>Total</span>
                <span>₹{getCartTotal().toLocaleString()}</span>
              </div>

              <div className="cart-buttons">
                <Link to="/" className="continue-shopping">
                  Continue Shopping
                </Link>
                <button className="checkout-btn whatsapp-checkout" onClick={handleWhatsAppCheckout}>
                  <span className="whatsapp-icon">📱</span>
                  Checkout via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
