import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { searchProducts, sortProductsByPrice, filterByCategory } from '../utils/searchUtils';
import './SearchResults.css';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Get search query from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q');
    
    if (query) {
      setSearchQuery(query);
      setIsLoading(true);
      
      // Simulate loading delay for better UX
      setTimeout(() => {
        const results = searchProducts(query);
        setSearchResults(results);
        setFilteredResults(results);
        setIsLoading(false);
      }, 300);
    } else {
      navigate('/');
    }
  }, [location.search, navigate]);

  // Apply filters and sorting
  useEffect(() => {
    let results = [...searchResults];
    
    // Apply category filter
    if (filterCategory !== 'all') {
      results = filterByCategory(results, filterCategory);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        results = sortProductsByPrice(results, 'asc');
        break;
      case 'price-high':
        results = sortProductsByPrice(results, 'desc');
        break;
      case 'name':
        results = results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep relevance order (original search order)
        break;
    }
    
    setFilteredResults(results);
  }, [searchResults, filterCategory, sortBy]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      material: product.material,
      quantity: 1
    });
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        material: product.material
      });
    }
  };

  const getUniqueCategories = () => {
    const categories = [...new Set(searchResults.map(product => product.category))];
    return categories;
  };

  if (isLoading) {
    return (
      <div className="search-results-container">
        <div className="search-loading-state">
          <div className="loading-spinner"></div>
          <p>Searching for "{searchQuery}"...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-header">
        <h1>Search Results</h1>
        <p className="search-query">
          {filteredResults.length > 0 
            ? `Found ${filteredResults.length} result${filteredResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
            : `No products found for "${searchQuery}"`
          }
        </p>
      </div>

      {searchResults.length > 0 && (
        <div className="search-filters">
          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="category-filter">Category:</label>
              <select 
                id="category-filter"
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {getUniqueCategories().map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-filter">Sort by:</label>
              <select 
                id="sort-filter"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
              </select>
            </div>

            <div className="view-mode-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                ⊞
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="search-results">
        {filteredResults.length > 0 ? (
          <div className={`products-grid ${viewMode}`}>
            {filteredResults.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <button
                    className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                    onClick={() => handleWishlistToggle(product)}
                    aria-label="Add to wishlist"
                  >
                    ♡
                  </button>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">
                    <Link to={`/product/${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  
                  <div className="product-category">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    {product.subcategory && ` • ${product.subcategory}`}
                  </div>
                  
                  <div className="product-prices">
                    <span className="current-price">{product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">{product.originalPrice}</span>
                    )}
                  </div>
                  
                  <div className="product-material">
                    {product.material}
                  </div>
                  
                  {viewMode === 'list' && (
                    <div className="product-description">
                      {product.description}
                    </div>
                  )}
                  
                  <div className="product-actions">
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <Link to={`/product/${product.id}`} className="view-details-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h2>No products found</h2>
            <p>
              We couldn't find any products matching "<strong>{searchQuery}</strong>". 
              Try adjusting your search terms or browse our collections.
            </p>
            
            <div className="search-suggestions">
              <h3>Search suggestions:</h3>
              <ul>
                <li>Check your spelling</li>
                <li>Try more general keywords</li>
                <li>Try searching by category (rings, necklaces, bracelets)</li>
                <li>Try searching by material (silver, gold, pearl)</li>
                <li>Try searching by collection (bridal, women, men)</li>
              </ul>
            </div>
            
            <div className="browse-categories">
              <h3>Browse our collections:</h3>
              <div className="category-links">
                <Link to="/bridal-collection" className="category-link">Bridal Collection</Link>
                <Link to="/women-collection" className="category-link">Women's Collection</Link>
                <Link to="/mens-collection" className="category-link">Men's Collection</Link>
                <Link to="/lifestyle-collection" className="category-link">Lifestyle Collection</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;