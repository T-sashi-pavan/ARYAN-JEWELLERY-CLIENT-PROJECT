import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import women nose rings images  
import women5 from '../ASSETS/womenCollections/women5.jpg';
import women2 from '../ASSETS/womenCollections/women2.jpg';
import women1 from '../ASSETS/womenCollections/women1.jpg';

const WomenNoseRingsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const noseRingsProducts = [
    {
      id: 5,
      name: 'Silver Ear Pins',
      price: '₹1,800',
      originalPrice: '₹2,200',
      image: women5,
      category: 'noserings',
      subcategory: 'women-noserings',
      size: 'One Size',
      material: '925 Sterling Silver',
      description: 'Delicate ear pins with modern design for contemporary women'
    },
    {
      id: 2,
      name: 'Pearl Studded Earrings',
      price: '₹3,200',
      originalPrice: '₹3,800',
      image: women2,
      category: 'noserings',
      subcategory: 'women-noserings',
      size: 'One Size',
      material: '925 Sterling Silver with Pearls',
      description: 'Elegant pearl earrings that add sophistication to any outfit'
    },
    {
      id: 501,
      name: 'Traditional Nose Ring',
      price: '₹2,500',
      originalPrice: '₹3,000',
      image: women1,
      category: 'noserings',
      subcategory: 'women-noserings',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Beautiful traditional nose ring with intricate silver work and design'
    }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Women's Nose Rings Collection...</p>
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
          <h1 className="page-title">NOSE RINGS</h1>
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
          <Link to="/women-collection/necklace" className="category-filter-btn">
            NECKLACE
          </Link>
          <Link to="/women-collection/nose-rings" className="category-filter-btn active">
            NOSE RINGS
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {noseRingsProducts.map(product => (
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

export default WomenNoseRingsCollection;
