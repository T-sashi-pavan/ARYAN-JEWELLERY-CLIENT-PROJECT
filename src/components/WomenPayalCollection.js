import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import women payal images  
import women9 from '../ASSETS/womenCollections/women9.jpg';
import women1 from '../ASSETS/womenCollections/women1.jpg';
import women5 from '../ASSETS/womenCollections/women5.jpg';

const WomenPayalCollection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const payalProducts = [
    {
      id: 9,
      name: 'Designer Anklets',
      price: '₹2,200',
      originalPrice: '₹2,700',
      image: women9,
      category: 'payal',
      subcategory: 'women-payal',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Beautiful anklets with traditional charm and modern appeal'
    },
    {
      id: 101,
      name: 'Traditional Payal',
      price: '₹3,500',
      originalPrice: '₹4,200',
      image: women1,
      category: 'payal',
      subcategory: 'women-payal',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Classic traditional payal with intricate silver work'
    },
    {
      id: 102,
      name: 'Modern Ankle Chain',
      price: '₹2,800',
      originalPrice: '₹3,300',
      image: women5,
      category: 'payal',
      subcategory: 'women-payal',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Contemporary ankle chain perfect for modern women'
    }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Women's Payal Collection...</p>
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
          <h1 className="page-title">PAYAL</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/women-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/women-collection/payal" className="category-filter-btn active">
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
          <Link to="/women-collection/nose-rings" className="category-filter-btn">
            NOSE RINGS
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {payalProducts.map(product => (
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

export default WomenPayalCollection;
