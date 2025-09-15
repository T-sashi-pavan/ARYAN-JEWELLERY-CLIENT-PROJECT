import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useSearch, getSearchSuggestions } from '../utils/searchUtils';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const {
    searchQuery,
    searchResults,
    isSearching,
    isSearchOpen,
    handleSearch,
    toggleSearch,
    closeSearch,
    setSearchQuery
  } = useSearch();
  
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

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
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Initialize
    handleResize();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Search related effects
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        closeSearch();
        setShowSearchSuggestions(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeSearch();
        setShowSearchSuggestions(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isSearchOpen, closeSearch]);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      setShowSearchSuggestions(true);
    } else {
      setShowSearchSuggestions(false);
    }
  }, [searchQuery]);

  // Search handlers
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
      setShowSearchSuggestions(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    handleSearch(value);
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    closeSearch();
    setShowSearchSuggestions(false);
  };

  const handleSearchIconClick = () => {
    if (isSearchOpen && searchQuery.trim()) {
      // If search is open and has query, perform search
      handleSearchSubmit({ preventDefault: () => {} });
    } else {
      // Toggle search input
      toggleSearch();
    }
  };

  const toggleMobileMenu = () => {
    console.log('Toggling mobile menu. Current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log('Mobile menu will be:', !isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    console.log('Closing mobile menu');
    setIsMobileMenuOpen(false);
  };

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
            {/* Search functionality */}
            <div className="search-container" ref={searchContainerRef}>
              <button 
                className="icon-item search-icon"
                onClick={handleSearchIconClick}
                aria-label="Search products"
              >
                <span className="icon">🔍</span>
                <span className="icon-label">Search</span>
              </button>
              
              {/* Search Input Field */}
              <div className={`search-input-container ${isSearchOpen ? 'open' : ''}`}>
                <form onSubmit={handleSearchSubmit}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="search-input"
                  />
                  <button type="submit" className="search-submit-btn">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </form>
                
                {/* Search Suggestions Dropdown */}
                {showSearchSuggestions && searchQuery && (
                  <div className="search-suggestions">
                    {isSearching ? (
                      <div className="search-loading">Searching...</div>
                    ) : (
                      <>
                        {getSearchSuggestions(searchQuery).length > 0 ? (
                          <>
                            {getSearchSuggestions(searchQuery).map((product) => (
                              <div
                                key={product.id}
                                className="search-suggestion-item"
                                onClick={() => handleSuggestionClick(product)}
                              >
                                <img src={product.image} alt={product.name} className="suggestion-image" />
                                <div className="suggestion-content">
                                  <div className="suggestion-name">{product.name}</div>
                                  <div className="suggestion-price">{product.price}</div>
                                  <div className="suggestion-category">{product.category}</div>
                                </div>
                              </div>
                            ))}
                            <div className="search-suggestion-more">
                              <button onClick={handleSearchSubmit} className="view-all-btn">
                                View all results ({searchResults.length})
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="no-suggestions">No products found</div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            
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
          {/* Mobile Menu Button */}
          {isMobile && (
            <button 
              className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          )}

          <nav className={`nav-menu ${isMobile ? 'mobile-nav' : 'desktop-nav'} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {/* Debug info for mobile menu */}
            {isMobile && (
              <div style={{display: 'none'}}>
                Mobile: {isMobile ? 'true' : 'false'}, 
                MenuOpen: {isMobileMenuOpen ? 'true' : 'false'}
              </div>
            )}
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              HOME
            </Link>
            
            {/* Bridal Collection with Dropdown */}
            <div 
              className="nav-dropdown"
              onMouseEnter={() => !isMobile && setShowBridalDropdown(true)}
              onMouseLeave={() => !isMobile && setShowBridalDropdown(false)}
            >
              <Link 
                to="/bridal-collection" 
                className={`nav-link ${location.pathname === '/bridal-collection' ? 'active' : ''}`}
                onClick={() => {
                  if (isMobile) {
                    setShowBridalDropdown(!showBridalDropdown);
                  } else {
                    closeMobileMenu();
                  }
                }}
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
                        onClick={closeMobileMenu}
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
              onMouseEnter={() => !isMobile && setShowWomenDropdown(true)}
              onMouseLeave={() => !isMobile && setShowWomenDropdown(false)}
            >
              <Link 
                to="/women-collection" 
                className={`nav-link ${location.pathname === '/women-collection' ? 'active' : ''}`}
                onClick={() => {
                  if (isMobile) {
                    setShowWomenDropdown(!showWomenDropdown);
                  } else {
                    closeMobileMenu();
                  }
                }}
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
                        onClick={closeMobileMenu}
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
              onMouseEnter={() => !isMobile && setShowMenDropdown(true)}
              onMouseLeave={() => !isMobile && setShowMenDropdown(false)}
            >
              <Link 
                to="/mens-collection" 
                className={`nav-link ${location.pathname === '/mens-collection' ? 'active' : ''}`}
                onClick={() => {
                  if (isMobile) {
                    setShowMenDropdown(!showMenDropdown);
                  } else {
                    closeMobileMenu();
                  }
                }}
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
                        onClick={closeMobileMenu}
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
              onMouseEnter={() => !isMobile && setShowLifestyleDropdown(true)}
              onMouseLeave={() => !isMobile && setShowLifestyleDropdown(false)}
            >
              <Link 
                to="/lifestyle-collection" 
                className={`nav-link ${location.pathname === '/lifestyle-collection' ? 'active' : ''}`}
                onClick={() => {
                  if (isMobile) {
                    setShowLifestyleDropdown(!showLifestyleDropdown);
                  } else {
                    closeMobileMenu();
                  }
                }}
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
                        onClick={closeMobileMenu}
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
