import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import women necklace images (fallback for static products)
import women3 from '../ASSETS/womenCollections/women3.jpg';
import women6 from '../ASSETS/womenCollections/women6.jpg';
import women7 from '../ASSETS/womenCollections/women7.jpg';

const WomenNecklaceCollection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        console.log('🔍 Fetching women necklace products from API...');
        
        const response = await fetch('http://localhost:5000/api/public/products?category=women&subcategory=necklace&limit=50');
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
          console.log('✅ Fetched necklace products:', data.data.length);
          setProducts(data.data);
        } else {
          console.warn('⚠️ No necklace products found, using fallback static data');
          setProducts(getStaticNecklaceProducts());
        }
      } catch (error) {
        console.error('❌ Error fetching necklace products:', error);
        console.log('🔄 Using fallback static data');
        setError('Failed to load latest products. Showing cached data.');
        setProducts(getStaticNecklaceProducts());
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Static fallback data (original hardcoded products)
  const getStaticNecklaceProducts = () => [
    {
      id: 3,
      name: 'Silver Bridal Set',
      price: '₹8,900',
      originalPrice: '₹10,500',
      image: women3,
      category: 'necklace',
      subcategory: 'women-necklace',
      size: 'Complete Set',
      material: '925 Sterling Silver with Gemstones',
      description: 'Exquisite bridal jewelry set perfect for special occasions'
    },
    {
      id: 6,
      name: 'Silver Pendant',
      price: '₹3,500',
      originalPrice: '₹4,000',
      image: women6,
      category: 'necklace',
      subcategory: 'women-necklace',
      size: '18 inch chain',
      material: '925 Sterling Silver',
      description: 'Elegant pendant necklace with unique design and premium finish'
    },
    {
      id: 7,
      name: 'Silver Necklace Set',
      price: '₹5,500',
      originalPrice: '₹6,500',
      image: women7,
      category: 'necklace',
      subcategory: 'women-necklace',
      size: 'Complete Set',
      material: '925 Sterling Silver',
      description: 'Complete necklace set with matching earrings for special occasions'
    }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Women's Necklace Collection...</p>
      </div>
    );
  }

  return (
    <div className="bridal-collection-page">
      <div className="container">
        {/* Error Message */}
        {error && (
          <div className="error-banner">
            <p>⚠️ {error}</p>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="back-arrow">←</span>
          </Link>
          <span className="breadcrumb-separator">|</span>
          <Link to="/women-collection" className="breadcrumb-link">Women Collection</Link>
          <span className="breadcrumb-separator">|</span>
          <h1 className="page-title">NECKLACE ({products.length} items)</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/women-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/women-collection/payal" className="category-filter-btn">
            PAYAL
          </Link>
          <Link to="/women-collection/chains" className="category-filter-btn">
            CHAINS
          </Link>
          <Link to="/women-collection/bracelets" className="category-filter-btn">
            BRACELETS
          </Link>
          <Link to="/women-collection/necklace" className="category-filter-btn active">
            NECKLACE
          </Link>
          <Link to="/women-collection/nose-rings" className="category-filter-btn">
            NOSE RINGS
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {products.map(product => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`}
              state={{ product: product }}
              className="product-card"
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <div className="overlay-content">
                    <p className="product-description">{product.description}</p>
                    <span className="view-details">View Details</span>
                  </div>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  <span className="current-price">{product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">{product.originalPrice}</span>
                  )}
                </div>
                <div className="product-details">
                  <span className="product-size">{product.size}</span>
                  <span className="product-material">{product.material}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WomenNecklaceCollection;
