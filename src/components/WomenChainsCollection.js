import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import women chains images  
import women8 from '../ASSETS/womenCollections/women8.jpg';
import women2 from '../ASSETS/womenCollections/women2.jpg';
import women4 from '../ASSETS/womenCollections/women4.jpg';

const WomenChainsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const chainsProducts = [
    {
      id: 8,
      name: 'Silver Chain',
      price: '₹2,900',
      originalPrice: '₹3,400',
      image: women8,
      category: 'chains',
      subcategory: 'women-chains',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Classic silver chain perfect for layering or wearing alone'
    },
    {
      id: 201,
      name: 'Delicate Chain',
      price: '₹3,200',
      originalPrice: '₹3,800',
      image: women2,
      category: 'chains',
      subcategory: 'women-chains',
      size: '18 inch',
      material: '925 Sterling Silver',
      description: 'Elegant delicate chain perfect for pendants and charms'
    },
    {
      id: 202,
      name: 'Bold Statement Chain',
      price: '₹4,100',
      originalPrice: '₹4,800',
      image: women4,
      category: 'chains',
      subcategory: 'women-chains',
      size: '22 inch',
      material: '925 Sterling Silver',
      description: 'Bold chain design that makes a statement with any outfit'
    }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Women's Chains Collection...</p>
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
          <h1 className="page-title">CHAINS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/women-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/women-collection/payal" className="category-filter-btn">
            PAYAL
          </Link>
          <Link to="/women-collection/chains" className="category-filter-btn active">
            CHAINS
          </Link>
          <Link to="/women-collection/bracelets" className="category-filter-btn">
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
          {chainsProducts.map(product => (
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

export default WomenChainsCollection;
