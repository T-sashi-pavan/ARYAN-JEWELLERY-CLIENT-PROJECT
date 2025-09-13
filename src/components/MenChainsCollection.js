import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import men chains images  
import men8 from '../ASSETS/menCollections/men8.jpg';
import men5 from '../ASSETS/menCollections/men5.jpg';
import men2 from '../ASSETS/menCollections/men2.jpg';

const MenChainsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const chainsProducts = [
    {
      id: 8,
      name: 'Silver Chain',
      price: '₹7,200',
      originalPrice: '₹8,800',
      image: men8,
      category: 'chains',
      subcategory: 'men-chains',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Heavy-duty silver chain with robust links for lasting durability'
    },
    {
      id: 801,
      name: 'Cuban Link Chain',
      price: '₹6,800',
      originalPrice: '₹8,000',
      image: men5,
      category: 'chains',
      subcategory: 'men-chains',
      size: '22 inch',
      material: '925 Sterling Silver',
      description: 'Bold Cuban link chain with masculine appeal and premium finish'
    },
    {
      id: 802,
      name: 'Box Chain Necklace',
      price: '₹4,200',
      originalPrice: '₹5,000',
      image: men2,
      category: 'chains',
      subcategory: 'men-chains',
      size: '18 inch',
      material: '925 Sterling Silver',
      description: 'Sophisticated box chain perfect for pendants and everyday wear'
    }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Men's Chains Collection...</p>
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
          <h1 className="page-title">CHAINS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/mens-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/mens-collection/chains" className="category-filter-btn active">
            CHAINS
          </Link>
          <Link to="/mens-collection/bracelets" className="category-filter-btn">
            BRACELETS
          </Link>
          <Link to="/mens-collection/rings" className="category-filter-btn">
            RINGS
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

export default MenChainsCollection;
