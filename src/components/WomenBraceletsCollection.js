import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import women bracelets images  
import women4 from '../ASSETS/womenCollections/women4.jpg';
import women1 from '../ASSETS/womenCollections/women1.jpg';
import women3 from '../ASSETS/womenCollections/women3.jpg';

const WomenBraceletsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const braceletsProducts = [
    {
      id: 4,
      name: 'Traditional Bangles',
      price: '₹4,100',
      originalPrice: '₹4,800',
      image: women4,
      category: 'bracelets',
      subcategory: 'women-bracelets',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Traditional silver bangles with beautiful patterns and designs'
    },
    {
      id: 301,
      name: 'Modern Cuff Bracelet',
      price: '₹2,500',
      originalPrice: '₹3,000',
      image: women1,
      category: 'bracelets',
      subcategory: 'women-bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Contemporary cuff bracelet with sleek design for modern women'
    },
    {
      id: 302,
      name: 'Designer Bracelet Set',
      price: '₹8,900',
      originalPrice: '₹10,500',
      image: women3,
      category: 'bracelets',
      subcategory: 'women-bracelets',
      size: 'Complete Set',
      material: '925 Sterling Silver with Gemstones',
      description: 'Exquisite bracelet set perfect for special occasions and events'
    }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Women's Bracelets Collection...</p>
      </div>
    );
  }

  return (
    <div className="bridal-collection-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="back-arrow">←</span>
          </Link>
          <span className="breadcrumb-separator">|</span>
          <Link to="/women-collection" className="breadcrumb-link">Women Collection</Link>
          <span className="breadcrumb-separator">|</span>
          <h1 className="page-title">BRACELETS</h1>
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
          <Link to="/women-collection/bracelets" className="category-filter-btn active">
            BRACELETS
          </Link>
          <Link to="/women-collection/necklace" className="category-filter-btn">
            NECKLACE
          </Link>
          <Link to="/women-collection/nose-rings" className="category-filter-btn">
            NOSE RINGS
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {braceletsProducts.map(product => (
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

export default WomenBraceletsCollection;
