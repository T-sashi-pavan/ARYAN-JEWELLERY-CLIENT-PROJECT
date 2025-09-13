import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import men bracelets images  
import men5 from '../ASSETS/menCollections/men5.jpg';
import men6 from '../ASSETS/menCollections/men6.jpg';
import men8 from '../ASSETS/menCollections/men8.jpg';

const MenBraceletsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const braceletsProducts = [
    {
      id: 5,
      name: 'Silver Chain Bracelet',
      price: '₹6,800',
      originalPrice: '₹8,000',
      image: men5,
      category: 'bracelets',
      subcategory: 'men-bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Robust chain bracelet with masculine appeal and durable construction'
    },
    {
      id: 501,
      name: 'Classic Silver Band',
      price: '₹3,200',
      originalPrice: '₹4,000',
      image: men6,
      category: 'bracelets',
      subcategory: 'men-bracelets',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Simple silver band bracelet with polished finish for understated elegance'
    },
    {
      id: 502,
      name: 'Heavy Link Bracelet',
      price: '₹7,200',
      originalPrice: '₹8,800',
      image: men8,
      category: 'bracelets',
      subcategory: 'men-bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Heavy-duty link bracelet with bold design and premium craftsmanship'
    }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Men's Bracelets Collection...</p>
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
          <Link to="/mens-collection" className="breadcrumb-link">Men's Collection</Link>
          <span className="breadcrumb-separator">|</span>
          <h1 className="page-title">BRACELETS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/mens-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/mens-collection/chains" className="category-filter-btn">
            CHAINS
          </Link>
          <Link to="/mens-collection/bracelets" className="category-filter-btn active">
            BRACELETS
          </Link>
          <Link to="/mens-collection/rings" className="category-filter-btn">
            RINGS
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

export default MenBraceletsCollection;
