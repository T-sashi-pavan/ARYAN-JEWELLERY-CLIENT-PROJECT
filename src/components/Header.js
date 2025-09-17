import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useSearch, getSearchSuggestions } from '../utils/searchUtils';
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
    <header className={`sticky-top shadow-sm bg-info text-white ${isScrolled ? 'shadow-lg' : ''}`} style={{zIndex: 1000, width: '100%', margin: 0, padding: 0}}>
      <div style={{width: '100%', margin: 0, padding: 0}}>
        {/* Top Row - Logo and Icons */}
        <div className="d-flex justify-content-between align-items-center py-2 px-3 border-bottom border-light border-opacity-25" style={{backgroundColor: '#0097B2', width: '100%', margin: 0}}>
          {/* Left side - Mobile menu button (mobile only) or Wishlist (desktop) */}
          <div className="d-flex align-items-center" style={{minWidth: '60px'}}>
            {isMobile ? (
              <button 
                className={`btn border-0 d-flex justify-content-center align-items-center mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
                style={{padding: '8px', zIndex: 1001}}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X size={20} color="white" />
                ) : (
                  <Menu size={20} color="white" />
                )}
              </button>
            ) : (
              <Link to="/wishlist" className="text-decoration-none text-white d-flex flex-column align-items-center p-2 rounded-3 bg-white bg-opacity-10 position-relative" style={{transition: 'all 0.3s ease'}}>
                <Heart size={20} />
                <span className="small text-uppercase fw-medium" style={{fontSize: '0.7rem', letterSpacing: '0.5px'}}>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.7rem'}}>
                    {wishlistCount}
                  </span>
                )}
              </Link>
            )}
          </div>
          
          {/* Center - Logo */}
          <Link to="/" className="text-decoration-none text-white d-flex justify-content-center" style={{flexGrow: 1}}>
            <img 
              src={logo} 
              alt="Aryan's Silver Palace" 
              className="img-fluid" 
              style={{
                height: isMobile ? '45px' : '60px', 
                maxWidth: isMobile ? '150px' : '200px', 
                filter: 'brightness(1.1) contrast(1.1)'
              }} 
            />
          </Link>
          
          {/* Right side - Search and Cart icons */}
          <div className="d-flex align-items-center" style={{gap: isMobile ? '8px' : '16px', minWidth: '60px', justifyContent: 'flex-end'}}>
            {/* Search functionality */}
            <div className="position-relative" ref={searchContainerRef}>
              <button 
                className={`btn text-white d-flex ${isMobile ? 'justify-content-center align-items-center mobile-icon-button' : 'flex-column align-items-center'} p-2 rounded-3 bg-white bg-opacity-10 border-0`} 
                style={{transition: 'all 0.3s ease'}}
                onClick={handleSearchIconClick}
                aria-label="Search products"
              >
                <Search size={isMobile ? 18 : 20} />
                {!isMobile && <span className="small text-uppercase fw-medium" style={{fontSize: '0.7rem', letterSpacing: '0.5px'}}>Search</span>}
              </button>
              
              {/* Search Input Field */}
              <div className={`position-absolute top-100 end-0 bg-white bg-opacity-95 rounded-4 shadow-lg mt-2 ${isMobile ? 'mobile-search-container' : ''} ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} style={{width: isMobile ? '280px' : '350px', maxWidth: '90vw', zIndex: 2000, transition: 'all 0.3s ease', transform: isSearchOpen ? 'translateY(10px) scale(1)' : 'translateY(-10px) scale(0.9)'}}>
                <form onSubmit={handleSearchSubmit} className="d-flex align-items-center p-3">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="form-control rounded-pill border-2 border-light-subtle fs-6 text-dark"
                    style={{boxShadow: 'none'}}
                  />
                  <button type="submit" className="btn btn-info rounded-circle ms-2 d-flex align-items-center justify-content-center" style={{width: '44px', height: '44px'}}>
                    <Search size={18} />
                  </button>
                </form>
                
                {/* Search Suggestions Dropdown */}
                {showSearchSuggestions && searchQuery && (
                  <div className="border-top border-light-subtle bg-white rounded-bottom-4" style={{maxHeight: '400px', overflowY: 'auto'}}>
                    {isSearching ? (
                      <div className="p-3 text-center text-info fst-italic">Searching...</div>
                    ) : (
                      <>
                        {getSearchSuggestions(searchQuery).length > 0 ? (
                          <>
                            {getSearchSuggestions(searchQuery).map((product) => (
                              <div
                                key={product.id}
                                className="d-flex align-items-center p-3 border-bottom border-light-subtle cursor-pointer"
                                style={{cursor: 'pointer', transition: 'background-color 0.2s ease'}}
                                onClick={() => handleSuggestionClick(product)}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              >
                                <img src={product.image} alt={product.name} className="rounded-2 border border-light-subtle me-3" style={{width: '40px', height: '40px', objectFit: 'cover'}} />
                                <div className="flex-grow-1">
                                  <div className="fw-semibold text-dark small mb-1" style={{lineHeight: '1.3'}}>{product.name}</div>
                                  <div className="text-info fw-bold small mb-1">{product.price}</div>
                                  <div className="text-muted small text-capitalize">{product.category}</div>
                                </div>
                              </div>
                            ))}
                            <div className="p-3 border-top border-light-subtle text-center">
                              <button onClick={handleSearchSubmit} className="btn btn-info btn-sm rounded-pill px-4 fw-semibold">
                                View all results ({searchResults.length})
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="p-3 text-center text-muted fst-italic">No products found</div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <Link to="/cart" className={`text-decoration-none text-white d-flex ${isMobile ? 'justify-content-center align-items-center mobile-icon-button' : 'flex-column align-items-center'} p-2 rounded-3 bg-white bg-opacity-10 position-relative`} style={{transition: 'all 0.3s ease'}}>
              <ShoppingCart size={isMobile ? 18 : 20} />
              {!isMobile && <span className="small text-uppercase fw-medium" style={{fontSize: '0.7rem', letterSpacing: '0.5px'}}>Cart</span>}
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.7rem'}}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Bottom Row - Navigation */}
        <div className="d-flex align-items-center justify-content-center py-0" style={{background: 'linear-gradient(135deg, #1fb3a8 0%, #17a2b8 100%)', minHeight: '50px', width: '100%', margin: 0}}>
          
          <nav className={`${isMobile ? (isMobileMenuOpen ? 'd-flex' : 'd-none') + ' position-fixed top-0 start-0 w-100 h-100 flex-column bg-info' : 'd-flex justify-content-center align-items-center gap-5'}`} style={isMobile ? {top: '80px', zIndex: 1000, paddingTop: '15px', paddingBottom: '15px', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto', background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)', gap: '5px'} : {height: '50px', width: '100%'}}>
            
            <Link 
              to="/" 
              className={`nav-link-custom text-decoration-none text-white fw-medium text-uppercase px-3 py-2 rounded-pill position-relative ${location.pathname === '/' ? 'nav-link-active' : ''} ${isMobile ? 'text-center w-100 d-block rounded-0' : ''}`}
              style={{fontSize: '0.9rem', letterSpacing: '0.8px', transition: 'all 0.3s ease', margin: '2px 0'}}
              onClick={closeMobileMenu}
            >
              HOME
            </Link>
            
            {/* Bridal Collection with Dropdown */}
            <div 
              className={`${isMobile ? 'w-100' : 'position-relative'}`}
              onMouseEnter={() => !isMobile && setShowBridalDropdown(true)}
              onMouseLeave={() => !isMobile && setShowBridalDropdown(false)}
            >
              <Link 
                to="/bridal-collection" 
                className={`nav-link-custom text-decoration-none text-white fw-medium text-uppercase px-3 py-2 rounded-pill position-relative ${location.pathname === '/bridal-collection' ? 'nav-link-active' : ''} ${isMobile ? 'text-center w-100 d-block rounded-0' : ''}`}
                style={{fontSize: '0.9rem', letterSpacing: '0.8px', transition: 'all 0.3s ease', margin: '2px 0'}}
                onClick={() => {
                  if (isMobile) {
                    setShowBridalDropdown(!showBridalDropdown);
                  } else {
                    closeMobileMenu();
                  }
                }}
              >
                BRIDAL COLLECTION
                <ChevronDown 
                  size={14} 
                  className="ms-2" 
                  style={{
                    transition: 'transform 0.3s ease', 
                    transform: showBridalDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} 
                />
              </Link>
              
              {showBridalDropdown && (
                <div className={`${isMobile ? 'position-fixed top-0 start-0 w-100 vh-100 bg-white p-4' : 'position-absolute bg-white rounded-3 shadow-lg p-2 mt-2'}`} style={isMobile ? {zIndex: 1050, overflowY: 'auto'} : {top: '100%', left: '50%', transform: 'translateX(-50%)', minWidth: '180px', maxWidth: '200px', zIndex: 1000, opacity: 1, animation: 'fadeIn 0.3s ease'}}>
                  {isMobile && (
                    <button 
                      onClick={() => setShowBridalDropdown(false)}
                      className="btn btn-light position-absolute top-0 end-0 m-3 rounded-pill fw-bold border-2 d-flex align-items-center gap-2"
                      style={{zIndex: 1051}}
                    >
                      <X size={16} /> CLOSE
                    </button>
                  )}
                  <div className={`${isMobile ? 'd-flex flex-column gap-3' : 'd-flex flex-column gap-1'}`} style={isMobile ? {paddingTop: '70px', maxHeight: '250px', overflowY: 'auto'} : {}}>
                    {bridalCategories.map((category, index) => (
                      <Link 
                        key={index}
                        to={category.route} 
                        className={`text-decoration-none d-flex align-items-center gap-2 p-2 rounded-2 text-dark border ${isMobile ? 'border-2 border-light-subtle bg-white shadow-sm' : 'border-transparent'}`}
                        style={isMobile ? {transition: 'all 0.3s ease', fontSize: '1rem', fontWeight: '600'} : {transition: 'all 0.3s ease'}}
                        onClick={closeMobileMenu}
                        onMouseEnter={(e) => {
                          if (isMobile) {
                            e.target.style.background = 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)';
                            e.target.style.color = 'white';
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.borderColor = '#17a2b8';
                            e.target.style.boxShadow = '0 8px 25px rgba(23, 162, 184, 0.25)';
                          } else {
                            e.target.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
                            e.target.style.transform = 'translateX(2px)';
                            e.target.style.borderColor = '#17a2b8';
                            e.target.style.boxShadow = '0 2px 8px rgba(23, 162, 184, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (isMobile) {
                            e.target.style.background = '#ffffff';
                            e.target.style.color = '#2c3e50';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.borderColor = '#e9ecef';
                            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                          } else {
                            e.target.style.background = 'transparent';
                            e.target.style.transform = 'translateX(0)';
                            e.target.style.borderColor = 'transparent';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <div className={`${isMobile ? 'rounded-2 border-2 border-light-subtle' : 'rounded-1 border border-light-subtle'}`} style={isMobile ? {width: '55px', height: '55px', overflow: 'hidden', flexShrink: 0} : {width: '28px', height: '28px', overflow: 'hidden', flexShrink: 0}}>
                          <img 
                            src={category.image} 
                            alt={category.name} 
                            className="w-100 h-100"
                            style={{objectFit: 'cover'}}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className={`fw-semibold text-dark mb-0 ${isMobile ? 'fs-6' : 'small'}`} style={isMobile ? {lineHeight: '1.3'} : {fontSize: '0.75rem', letterSpacing: '0.2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{category.name}</h6>
                          <p className={`text-muted mb-0 ${isMobile ? 'small' : ''}`} style={isMobile ? {lineHeight: '1.3'} : {fontSize: '0.6rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{category.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Women Collection with Dropdown */}
            <div 
              className={`${isMobile ? 'w-100' : 'position-relative'}`}
              onMouseEnter={() => !isMobile && setShowWomenDropdown(true)}
              onMouseLeave={() => !isMobile && setShowWomenDropdown(false)}
            >
              <Link 
                to="/women-collection" 
                className={`nav-link-custom text-decoration-none text-white fw-medium text-uppercase px-3 py-2 rounded-pill position-relative ${location.pathname === '/women-collection' ? 'nav-link-active' : ''} ${isMobile ? 'text-center w-100 d-block rounded-0' : ''}`}
                style={{fontSize: '0.9rem', letterSpacing: '0.8px', transition: 'all 0.3s ease', margin: '2px 0'}}
                onClick={() => {
                  if (isMobile) {
                    setShowWomenDropdown(!showWomenDropdown);
                  } else {
                    closeMobileMenu();
                  }
                }}
              >
                WOMEN COLLECTION
                <ChevronDown 
                  size={14} 
                  className="ms-2" 
                  style={{
                    transition: 'transform 0.3s ease', 
                    transform: showWomenDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} 
                />
              </Link>
              
              {showWomenDropdown && (
                <div className={`${isMobile ? 'position-fixed top-0 start-0 w-100 vh-100 bg-white p-4' : 'position-absolute bg-white rounded-3 shadow-lg p-2 mt-2'}`} style={isMobile ? {zIndex: 1050, overflowY: 'auto'} : {top: '100%', left: '50%', transform: 'translateX(-50%)', minWidth: '180px', maxWidth: '200px', zIndex: 1000, opacity: 1}}>
                  {isMobile && (
                    <button 
                      onClick={() => setShowWomenDropdown(false)}
                      className="btn btn-light position-absolute top-0 end-0 m-3 rounded-pill fw-bold border-2 d-flex align-items-center gap-2"
                      style={{zIndex: 1051}}
                    >
                      <X size={16} /> CLOSE
                    </button>
                  )}
                  <div className={`${isMobile ? 'd-flex flex-column gap-3' : 'd-flex flex-column gap-1'}`} style={isMobile ? {paddingTop: '70px'} : {}}>
                    {womenCategories.map((category, index) => (
                      <Link 
                        key={index}
                        to={category.route}
                        className={`text-decoration-none d-flex align-items-center gap-2 p-2 rounded-2 text-dark border ${isMobile ? 'border-2 border-light-subtle bg-white shadow-sm' : 'border-transparent'}`}
                        style={isMobile ? {transition: 'all 0.3s ease'} : {transition: 'all 0.3s ease'}}
                        onClick={closeMobileMenu}
                        onMouseEnter={(e) => {
                          if (isMobile) {
                            e.target.style.background = 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)';
                            e.target.style.color = 'white';
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.borderColor = '#17a2b8';
                            e.target.style.boxShadow = '0 8px 25px rgba(23, 162, 184, 0.25)';
                          } else {
                            e.target.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
                            e.target.style.transform = 'translateX(2px)';
                            e.target.style.borderColor = '#17a2b8';
                            e.target.style.boxShadow = '0 2px 8px rgba(23, 162, 184, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (isMobile) {
                            e.target.style.background = '#ffffff';
                            e.target.style.color = '#2c3e50';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.borderColor = '#e9ecef';
                            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                          } else {
                            e.target.style.background = 'transparent';
                            e.target.style.transform = 'translateX(0)';
                            e.target.style.borderColor = 'transparent';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <div className={`${isMobile ? 'rounded-2 border-2 border-light-subtle' : 'rounded-1 border border-light-subtle'}`} style={isMobile ? {width: '55px', height: '55px', overflow: 'hidden', flexShrink: 0} : {width: '28px', height: '28px', overflow: 'hidden', flexShrink: 0}}>
                          <img 
                            src={category.image} 
                            alt={category.name} 
                            className="w-100 h-100"
                            style={{objectFit: 'cover'}}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className={`fw-semibold text-dark mb-0 ${isMobile ? 'fs-6' : 'small'}`} style={isMobile ? {} : {fontSize: '0.75rem', letterSpacing: '0.2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{category.name}</h6>
                          <p className={`text-muted mb-0 ${isMobile ? 'small' : ''}`} style={isMobile ? {} : {fontSize: '0.6rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{category.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Men Collection with Dropdown */}
            <div 
              className={`${isMobile ? 'w-100' : 'position-relative'}`}
              onMouseEnter={() => !isMobile && setShowMenDropdown(true)}
              onMouseLeave={() => !isMobile && setShowMenDropdown(false)}
            >
              <Link 
                to="/mens-collection" 
                className={`nav-link-custom text-decoration-none text-white fw-medium text-uppercase px-3 py-2 rounded-pill position-relative ${location.pathname === '/mens-collection' ? 'nav-link-active' : ''} ${isMobile ? 'text-center w-100 d-block rounded-0' : ''}`}
                style={{fontSize: '0.9rem', letterSpacing: '0.8px', transition: 'all 0.3s ease', margin: '2px 0'}}
                onClick={() => {
                  if (isMobile) {
                    setShowMenDropdown(!showMenDropdown);
                  } else {
                    closeMobileMenu();
                  }
                }}
              >
                MEN'S COLLECTION
                <ChevronDown 
                  size={14} 
                  className="ms-2" 
                  style={{
                    transition: 'transform 0.3s ease', 
                    transform: showMenDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} 
                />
              </Link>
              
              {showMenDropdown && (
                <div className={`${isMobile ? 'position-fixed top-0 start-0 w-100 vh-100 bg-white p-4' : 'position-absolute bg-white rounded-3 shadow-lg p-2 mt-2'}`} style={isMobile ? {zIndex: 1050, overflowY: 'auto'} : {top: '100%', left: '50%', transform: 'translateX(-50%)', minWidth: '180px', maxWidth: '200px', zIndex: 1000, opacity: 1}}>
                  {isMobile && (
                    <button 
                      onClick={() => setShowMenDropdown(false)}
                      className="btn btn-light position-absolute top-0 end-0 m-3 rounded-pill fw-bold border-2 d-flex align-items-center gap-2"
                      style={{zIndex: 1051}}
                    >
                      <X size={16} /> CLOSE
                    </button>
                  )}
                  <div className={`${isMobile ? 'd-flex flex-column gap-3' : 'd-flex flex-column gap-1'}`} style={isMobile ? {paddingTop: '70px'} : {}}>
                    {menCategories.map((category, index) => (
                      <Link 
                        key={index}
                        to={category.route}
                        className={`text-decoration-none d-flex align-items-center gap-2 p-2 rounded-2 text-dark border ${isMobile ? 'border-2 border-light-subtle bg-white shadow-sm' : 'border-transparent'}`}
                        style={isMobile ? {transition: 'all 0.3s ease'} : {transition: 'all 0.3s ease'}}
                        onClick={closeMobileMenu}
                        onMouseEnter={(e) => {
                          if (isMobile) {
                            e.target.style.background = 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)';
                            e.target.style.color = 'white';
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.borderColor = '#17a2b8';
                            e.target.style.boxShadow = '0 8px 25px rgba(23, 162, 184, 0.25)';
                          } else {
                            e.target.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
                            e.target.style.transform = 'translateX(2px)';
                            e.target.style.borderColor = '#17a2b8';
                            e.target.style.boxShadow = '0 2px 8px rgba(23, 162, 184, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (isMobile) {
                            e.target.style.background = '#ffffff';
                            e.target.style.color = '#2c3e50';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.borderColor = '#e9ecef';
                            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                          } else {
                            e.target.style.background = 'transparent';
                            e.target.style.transform = 'translateX(0)';
                            e.target.style.borderColor = 'transparent';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <div className={`${isMobile ? 'rounded-2 border-2 border-light-subtle' : 'rounded-1 border border-light-subtle'}`} style={isMobile ? {width: '55px', height: '55px', overflow: 'hidden', flexShrink: 0} : {width: '28px', height: '28px', overflow: 'hidden', flexShrink: 0}}>
                          <img 
                            src={category.image} 
                            alt={category.name} 
                            className="w-100 h-100"
                            style={{objectFit: 'cover'}}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className={`fw-semibold text-dark mb-0 ${isMobile ? 'fs-6' : 'small'}`} style={isMobile ? {} : {fontSize: '0.75rem', letterSpacing: '0.2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{category.name}</h6>
                          <p className={`text-muted mb-0 ${isMobile ? 'small' : ''}`} style={isMobile ? {} : {fontSize: '0.6rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{category.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Lifestyle Collection with Dropdown */}
            <div 
              className={`${isMobile ? 'w-100' : 'position-relative'}`}
              onMouseEnter={() => !isMobile && setShowLifestyleDropdown(true)}
              onMouseLeave={() => !isMobile && setShowLifestyleDropdown(false)}
            >
              <Link 
                to="/lifestyle-collection" 
                className={`nav-link-custom text-decoration-none text-white fw-medium text-uppercase px-3 py-2 rounded-pill position-relative ${location.pathname === '/lifestyle-collection' ? 'nav-link-active' : ''} ${isMobile ? 'text-center w-100 d-block rounded-0' : ''}`}
                style={{fontSize: '0.9rem', letterSpacing: '0.8px', transition: 'all 0.3s ease', margin: '2px 0'}}
                onClick={() => {
                  if (isMobile) {
                    setShowLifestyleDropdown(!showLifestyleDropdown);
                  } else {
                    closeMobileMenu();
                  }
                }}
              >
                LIFESTYLE COLLECTION
                <ChevronDown 
                  size={14} 
                  className="ms-2" 
                  style={{
                    transition: 'transform 0.3s ease', 
                    transform: showLifestyleDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} 
                />
              </Link>
              
              {showLifestyleDropdown && (
                <div className={`${isMobile ? 'position-fixed top-0 start-0 w-100 vh-100 bg-white p-4' : 'position-absolute bg-white rounded-3 shadow-lg p-2 mt-2'}`} style={isMobile ? {zIndex: 1050, overflowY: 'auto'} : {top: '100%', left: '50%', transform: 'translateX(-50%)', minWidth: '180px', maxWidth: '200px', zIndex: 1000, opacity: 1}}>
                  {isMobile && (
                    <button 
                      onClick={() => setShowLifestyleDropdown(false)}
                      className="btn btn-light position-absolute top-0 end-0 m-3 rounded-pill fw-bold border-2 d-flex align-items-center gap-2"
                      style={{zIndex: 1051}}
                    >
                      <X size={16} /> CLOSE
                    </button>
                  )}
                  <div className={`${isMobile ? 'd-flex flex-column gap-3' : 'd-flex flex-column gap-1'}`} style={isMobile ? {paddingTop: '70px'} : {}}>
                    {lifestyleCategories.map((category, index) => (
                      <Link 
                        key={index}
                        to={category.route}
                        className={`text-decoration-none d-flex align-items-center gap-2 p-2 rounded-2 text-dark border ${isMobile ? 'border-2 border-light-subtle bg-white shadow-sm' : 'border-transparent'}`}
                        style={isMobile ? {transition: 'all 0.3s ease'} : {transition: 'all 0.3s ease', padding: '3px 6px'}}
                        onClick={closeMobileMenu}
                        onMouseEnter={(e) => {
                          if (isMobile) {
                            e.target.style.background = 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)';
                            e.target.style.color = 'white';
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.borderColor = '#17a2b8';
                            e.target.style.boxShadow = '0 8px 25px rgba(23, 162, 184, 0.25)';
                          } else {
                            e.target.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
                            e.target.style.transform = 'translateX(2px)';
                            e.target.style.borderColor = '#17a2b8';
                            e.target.style.boxShadow = '0 2px 8px rgba(23, 162, 184, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (isMobile) {
                            e.target.style.background = '#ffffff';
                            e.target.style.color = '#2c3e50';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.borderColor = '#e9ecef';
                            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                          } else {
                            e.target.style.background = 'transparent';
                            e.target.style.transform = 'translateX(0)';
                            e.target.style.borderColor = 'transparent';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <div className={`${isMobile ? 'rounded-2 border-2 border-light-subtle' : 'rounded-1 border border-light-subtle'}`} style={isMobile ? {width: '55px', height: '55px', overflow: 'hidden', flexShrink: 0} : {width: '26px', height: '26px', overflow: 'hidden', flexShrink: 0}}>
                          <img 
                            src={category.image} 
                            alt={category.name} 
                            className="w-100 h-100"
                            style={{objectFit: 'cover'}}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className={`fw-semibold text-dark mb-0 ${isMobile ? 'fs-6' : 'small'}`} style={isMobile ? {} : {fontSize: '0.75rem', letterSpacing: '0.2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{category.name}</h6>
                          <p className={`text-muted mb-0 ${isMobile ? 'small' : ''}`} style={isMobile ? {} : {fontSize: '0.6rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{category.description}</p>
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
