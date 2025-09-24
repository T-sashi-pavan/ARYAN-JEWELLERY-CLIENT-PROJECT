import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import { handleWishlistWhatsAppInquiry } from '../utils/whatsappUtils';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleRemoveFromWishlist = (itemId) => {
    removeFromWishlist(itemId);
  };

  const handleWhatsAppInquiry = () => {
    handleWishlistWhatsAppInquiry(wishlistItems);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="wishlist-header">
            <h1>MY WISHLIST</h1>
          </div>
          <div className="empty-wishlist">
            <div className="empty-wishlist-content">
              <div className="empty-wishlist-icon">
                <Heart size={48} strokeWidth={1} />
              </div>
              <h2>Your wishlist is empty</h2>
              <p>Add some beautiful jewelry pieces to your wishlist</p>
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
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>MY WISHLIST</h1>
          <div className="wishlist-actions">
            <span className="wishlist-count">{wishlistItems.length} items</span>
            <button className="whatsapp-inquiry-btn" onClick={handleWhatsAppInquiry}>
              <span className="whatsapp-icon">
                <MessageCircle size={18} />
              </span>
              Inquire via WhatsApp
            </button>
            <button className="clear-wishlist-btn" onClick={clearWishlist}>
              Clear All
            </button>
          </div>
        </div>

        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <div className="wishlist-item-image">
                <img src={item.image} alt={item.name} className="wishlist-item-img" />
                <button 
                  className="remove-from-wishlist"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  ×
                </button>
              </div>
              
              <div className="wishlist-item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="wishlist-item-category">{item.category}</div>
                <div className="wishlist-item-price">{item.price}</div>
                
                <div className="wishlist-item-actions">
                  <Link 
                    to={`/product/${item.id}`} 
                    className="view-details-btn"
                  >
                    View Details
                  </Link>
                  <button 
                    className={`add-to-cart-btn ${isInCart(item.id) ? 'in-cart' : ''}`}
                    onClick={() => handleAddToCart(item)}
                  >
                    {isInCart(item.id) ? '✓ In Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;