import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Header.css';
import logo from '../ASSETS/LOGO.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        {/* Top Row - Logo and Icons */}
        <div className="header-top">
          <div className="header-icons-left">
            <Link to="/wishlist" className="icon-item wishlist-icon">
              <span className="icon">♡</span>
              <span className="icon-label">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="wishlist-count">{wishlistCount}</span>
              )}
            </Link>
          </div>
          
          <Link to="/" className="logo-section">
            <img src={logo} alt="Aryan's Silver Palace" className="logo-image" />
          </Link>
          
          <div className="header-icons-right">
            <Link to="/cart" className="icon-item cart-icon">
              <span className="icon">🛒</span>
              <span className="icon-label">Cart</span>
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>

        {/* Bottom Row - Navigation */}
        <div className="header-bottom">
          <nav className="nav-menu">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>HOME</Link>
            <Link to="/bridal-collection" className={`nav-link ${location.pathname === '/bridal-collection' ? 'active' : ''}`}>BRIDAL COLLECTION</Link>
            <Link to="/women-collection" className={`nav-link ${location.pathname === '/women-collection' ? 'active' : ''}`}>WOMEN COLLECTION</Link>
            <Link to="/mens-collection" className={`nav-link ${location.pathname === '/mens-collection' ? 'active' : ''}`}>MEN'S COLLECTION</Link>
            <Link to="/lifestyle-collection" className={`nav-link ${location.pathname === '/lifestyle-collection' ? 'active' : ''}`}>LIFESTYLE COLLECTION</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
