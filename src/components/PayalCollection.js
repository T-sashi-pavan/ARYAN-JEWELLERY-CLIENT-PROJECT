import React from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import specific images for Payal (Ankle Jewelry)
import bridal1 from '../ASSETS/bridalCollections/bridal1.jpg';
import bridal4 from '../ASSETS/bridalCollections/bridal4.jpg';
import bridal7 from '../ASSETS/bridalCollections/bridal7.jpg';

const PayalCollection = () => {
  const payalProducts = [
    {
      id: 'payal_1',
      name: 'Royal Silver Payal',
      price: '₹8,500',
      originalPrice: '₹10,000',
      image: bridal1,
      category: 'payal',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Elegant ankle jewelry with traditional bells and intricate patterns'
    },
    {
      id: 'payal_2',
      name: 'Pearl Anklet Set',
      price: '₹12,000',
      originalPrice: '₹14,500',
      image: bridal4,
      category: 'payal',
      size: 'One Size',
      material: '925 Sterling Silver with Pearls',
      description: 'Beautiful pearl anklet set perfect for bridal occasions'
    },
    {
      id: 'payal_3',
      name: 'Antique Payal Design',
      price: '₹9,800',
      originalPrice: '₹11,500',
      image: bridal7,
      category: 'payal',
      size: 'Adjustable',
      material: '925 Sterling Silver with Antique Finish',
      description: 'Vintage inspired ankle jewelry with heritage charm'
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
          <h1 className="page-title">PAYAL</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/bridal-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/bridal-collection/payal" className="category-filter-btn active">
            PAYAL
          </Link>
          <Link to="/bridal-collection/chains" className="category-filter-btn">
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
          {payalProducts.map((product) => (
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

export default PayalCollection;
