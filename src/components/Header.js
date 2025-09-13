import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Header.css';
import logo from '../ASSETS/LOGO.png';

// Import bridal collection images for dropdown
import bridal1 from '../ASSETS/bridalCollections/bridal1.jpg';
import bridal2 from '../ASSETS/bridalCollections/bridal2.jpg';
import bridal3 from '../ASSETS/bridalCollections/bridal3.jpg';
import bridal6 from '../ASSETS/bridalCollections/bridal6.jpg';
import bridal7 from '../ASSETS/bridalCollections/bridal7.jpg';

// Import women's collection images for dropdown
import women1 from '../ASSETS/womenCollections/women1.jpg';
import women2 from '../ASSETS/womenCollections/women2.jpg';
import women3 from '../ASSETS/womenCollections/women3.jpg';
import women4 from '../ASSETS/womenCollections/women4.jpg';
import women5 from '../ASSETS/womenCollections/women5.jpg';

// Import men's collection images for dropdown
import men5 from '../ASSETS/menCollections/men5.jpg';
import men8 from '../ASSETS/menCollections/men8.jpg';
import men1 from '../ASSETS/menCollections/men1.webp';

// Import lifestyle collection images for dropdown
import coin1 from '../ASSETS/coinsCollections/coin1.jpg';
import murthi1 from '../ASSETS/murthiCollections/murthi1.jpg';
import decorative1 from '../ASSETS/decorativeCollections/decorative1.jpg';
import poojaitems1 from '../ASSETS/poojaitemsCollections/poojaitems1.jpg';
import livingroom1 from '../ASSETS/livingroomCollections/livingroom1.jpg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBridalDropdown, setShowBridalDropdown] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);
  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const [showLifestyleDropdown, setShowLifestyleDropdown] = useState(false);
  const location = useLocation();
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();

  // Bridal dropdown categories with specific images
  const bridalCategories = [
    {
      name: 'Payal',
      image: bridal1,
      description: 'Elegant ankle jewelry',
      route: '/bridal-collection/payal'
    },
    {
      name: 'Chains',
      image: bridal2,
      description: 'Beautiful silver chains',
      route: '/bridal-collection/chains'
    },
    {
      name: 'Bracelets',
      image: bridal3,
      description: 'Stunning wrist accessories',
      route: '/bridal-collection/bracelets'
    },
    {
      name: 'Necklace',
      image: bridal6,
      description: 'Traditional necklaces',
      route: '/bridal-collection/necklace'
    },
    {
      name: 'Nose Rings',
      image: bridal7,
      description: 'Classic nose jewelry',
      route: '/bridal-collection/nose-rings'
    }
  ];

  // Women's dropdown categories with specific images
  const womenCategories = [
    {
      name: 'Payal',
      image: women1,
      description: 'Elegant ankle jewelry',
      route: '/women-collection/payal'
    },
    {
      name: 'Chains',
      image: women2,
      description: 'Beautiful silver chains',
      route: '/women-collection/chains'
    },
    {
      name: 'Bracelets',
      image: women3,
      description: 'Stunning wrist accessories',
      route: '/women-collection/bracelets'
    },
    {
      name: 'Necklace',
      image: women4,
      description: 'Traditional necklaces',
      route: '/women-collection/necklace'
    },
    {
      name: 'Nose Rings',
      image: women5,
      description: 'Classic nose jewelry',
      route: '/women-collection/nose-rings'
    }
  ];

  // Men's dropdown categories with specific images
  const menCategories = [
    {
      name: 'Chains',
      image: men8,
      description: 'Durable silver chains',
      route: '/mens-collection/chains'
    },
    {
      name: 'Bracelets',
      image: men5,
      description: 'Masculine bracelets',
      route: '/mens-collection/bracelets'
    },
    {
      name: 'Rings',
      image: men1,
      description: 'Classic men\'s rings',
      route: '/mens-collection/rings'
    }
  ];

  // Lifestyle dropdown categories with specific images
  const lifestyleCategories = [
    {
      name: 'Coins Collections',
      image: coin1,
      description: 'Commemorative silver coins',
      route: '/lifestyle-collection/coins'
    },
    {
      name: 'Murthi Collections',
      image: murthi1,
      description: 'Sacred silver idols',
      route: '/lifestyle-collection/murthi'
    },
    {
      name: 'Decorative Collections',
      image: decorative1,
      description: 'Beautiful home decor',
      route: '/lifestyle-collection/decorative'
    },
    {
      name: 'Pooja Items Collections',
      image: poojaitems1,
      description: 'Religious silver items',
      route: '/lifestyle-collection/pooja-items'
    },
    {
      name: 'Living Room Collections',
      image: livingroom1,
      description: 'Elegant living accessories',
      route: '/lifestyle-collection/living-room'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container-fluid">
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
            
            {/* Bridal Collection with Dropdown */}
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setShowBridalDropdown(true)}
              onMouseLeave={() => setShowBridalDropdown(false)}
            >
              <Link 
                to="/bridal-collection" 
                className={`nav-link ${location.pathname === '/bridal-collection' ? 'active' : ''}`}
              >
                BRIDAL COLLECTION
                <span className="dropdown-arrow">▼</span>
              </Link>
              
              {showBridalDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-content">
                    {bridalCategories.map((category, index) => (
                      <Link 
                        key={index}
                        to={category.route} 
                        className="dropdown-item"
                      >
                        <div className="dropdown-item-image">
                          <img src={category.image} alt={category.name} />
                          <div className="shimmer-overlay"></div>
                        </div>
                        <div className="dropdown-item-content">
                          <h4>{category.name}</h4>
                          <p>{category.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Women Collection with Dropdown */}
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setShowWomenDropdown(true)}
              onMouseLeave={() => setShowWomenDropdown(false)}
            >
              <Link 
                to="/women-collection" 
                className={`nav-link ${location.pathname === '/women-collection' ? 'active' : ''}`}
              >
                WOMEN COLLECTION
                <span className="dropdown-arrow">▼</span>
              </Link>
              
              {showWomenDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-content">
                    {womenCategories.map((category, index) => (
                      <Link 
                        key={index}
                        to={category.route}
                        className="dropdown-item"
                      >
                        <div className="dropdown-item-image">
                          <img src={category.image} alt={category.name} />
                          <div className="shimmer-overlay"></div>
                        </div>
                        <div className="dropdown-item-content">
                          <h4>{category.name}</h4>
                          <p>{category.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Men Collection with Dropdown */}
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setShowMenDropdown(true)}
              onMouseLeave={() => setShowMenDropdown(false)}
            >
              <Link 
                to="/mens-collection" 
                className={`nav-link ${location.pathname === '/mens-collection' ? 'active' : ''}`}
              >
                MEN'S COLLECTION
                <span className="dropdown-arrow">▼</span>
              </Link>
              
              {showMenDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-content">
                    {menCategories.map((category, index) => (
                      <Link 
                        key={index}
                        to={category.route}
                        className="dropdown-item"
                      >
                        <div className="dropdown-item-image">
                          <img src={category.image} alt={category.name} />
                          <div className="shimmer-overlay"></div>
                        </div>
                        <div className="dropdown-item-content">
                          <h4>{category.name}</h4>
                          <p>{category.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Lifestyle Collection with Dropdown */}
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setShowLifestyleDropdown(true)}
              onMouseLeave={() => setShowLifestyleDropdown(false)}
            >
              <Link 
                to="/lifestyle-collection" 
                className={`nav-link ${location.pathname === '/lifestyle-collection' ? 'active' : ''}`}
              >
                LIFESTYLE COLLECTION
                <span className="dropdown-arrow">▼</span>
              </Link>
              
              {showLifestyleDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-content large-dropdown">
                    {lifestyleCategories.map((category, index) => (
                      <Link 
                        key={index}
                        to={category.route}
                        className="dropdown-item"
                      >
                        <div className="dropdown-item-image">
                          <img src={category.image} alt={category.name} />
                          <div className="shimmer-overlay"></div>
                        </div>
                        <div className="dropdown-item-content">
                          <h4>{category.name}</h4>
                          <p>{category.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
