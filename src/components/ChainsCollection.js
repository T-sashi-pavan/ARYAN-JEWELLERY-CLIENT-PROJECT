import React from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import specific images for Chains
import bridal2 from '../ASSETS/bridalCollections/bridal2.jpg';
import bridal3 from '../ASSETS/bridalCollections/bridal3.jpg';
import bridal8 from '../ASSETS/bridalCollections/bridal8.jpg';

const ChainsCollection = () => {
  const chainsProducts = [
    {
      id: 'chains_1',
      name: 'Traditional Silver Chain',
      price: '₹15,500',
      originalPrice: '₹18,000',
      image: bridal2,
      category: 'chains',
      size: '18 inches',
      material: '925 Sterling Silver',
      description: 'Classic silver chain with traditional design and secure clasp'
    },
    {
      id: 'chains_2',
      name: 'Diamond Cut Chain',
      price: '₹22,000',
      originalPrice: '₹25,500',
      image: bridal3,
      category: 'chains',
      size: '20 inches',
      material: '925 Sterling Silver with Diamond Cut',
      description: 'Sparkling diamond cut chain with brilliant shine and elegance'
    },
    {
      id: 'chains_3',
      name: 'Temple Work Chain',
      price: '₹18,800',
      originalPrice: '₹21,000',
      image: bridal8,
      category: 'chains',
      size: '16 inches',
      material: '925 Sterling Silver with Temple Work',
      description: 'Sacred temple design chain perfect for religious ceremonies'
    }
  ];

  return (
    <div className="bridal-collection-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="back-arrow">←</span>
          </Link>
          <span className="breadcrumb-separator">|</span>
          <Link to="/bridal-collection" className="breadcrumb-link">Bridal Collection</Link>
          <span className="breadcrumb-separator">|</span>
          <h1 className="page-title">CHAINS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/bridal-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/bridal-collection/payal" className="category-filter-btn">
            PAYAL
          </Link>
          <Link to="/bridal-collection/chains" className="category-filter-btn active">
            CHAINS
          </Link>
          <Link to="/bridal-collection/bracelets" className="category-filter-btn">
            BRACELETS
          </Link>
          <Link to="/bridal-collection/necklace" className="category-filter-btn">
            NECKLACE
          </Link>
          <Link to="/bridal-collection/nose-rings" className="category-filter-btn">
            NOSE RINGS
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {chainsProducts.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
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

export default ChainsCollection;
