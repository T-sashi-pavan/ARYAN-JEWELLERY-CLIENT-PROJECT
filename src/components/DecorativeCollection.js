import React from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import decorative collection images
import decorative1 from '../ASSETS/decorativeCollections/decorative1.jpg';
import decorative2 from '../ASSETS/decorativeCollections/decorative2.webp';
import decorative3 from '../ASSETS/decorativeCollections/decorative3.jpg';
import decorative4 from '../ASSETS/decorativeCollections/decorative4.jpg';
import decorative5 from '../ASSETS/decorativeCollections/decorative5.jpg';
import decorative6 from '../ASSETS/decorativeCollections/decorative6.jpg';

const DecorativeCollection = () => {
  const decorativeProducts = [
    {
      id: 1,
      name: 'Silver Decorative Vase',
      image: decorative1,
      price: 12500,
      offer: '15% OFF',
      size: '12 inch height',
      material: '925 Sterling Silver',
      description: 'Elegant silver decorative vase perfect for home decoration and gifting',
      category: 'decorative'
    },
    {
      id: 2,
      name: 'Silver Decorative Bowl',
      image: decorative2,
      price: 8500,
      offer: '12% OFF',
      size: '8 inch diameter',
      material: '925 Sterling Silver',
      description: 'Beautiful silver decorative bowl for centerpiece and table decoration',
      category: 'decorative'
    },
    {
      id: 3,
      name: 'Silver Decorative Plate',
      image: decorative3,
      price: 15000,
      offer: '18% OFF',
      size: '10 inch diameter',
      material: '925 Sterling Silver',
      description: 'Handcrafted silver decorative plate with intricate design patterns',
      category: 'decorative'
    },
    {
      id: 4,
      name: 'Silver Decorative Figurine',
      image: decorative4,
      price: 9800,
      offer: '14% OFF',
      size: '6 inch height',
      material: '925 Sterling Silver',
      description: 'Artistic silver figurine for home decoration and collection',
      category: 'decorative'
    },
    {
      id: 5,
      name: 'Silver Decorative Candle Stand',
      image: decorative5,
      price: 7500,
      offer: '10% OFF',
      size: '8 inch height',
      material: '925 Sterling Silver',
      description: 'Elegant silver candle stand for creating beautiful ambiance',
      category: 'decorative'
    },
    {
      id: 6,
      name: 'Silver Decorative Frame',
      image: decorative6,
      price: 11200,
      offer: '16% OFF',
      size: '9x12 inches',
      material: '925 Sterling Silver',
      description: 'Premium silver decorative frame for photos and artwork',
      category: 'decorative'
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
          <Link to="/lifestyle-collection" className="breadcrumb-link">Lifestyle Collection</Link>
          <span className="breadcrumb-separator">|</span>
          <h1 className="page-title">DECORATIVE</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/lifestyle-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/lifestyle-collection/coins" className="category-filter-btn">
            COINS
          </Link>
          <Link to="/lifestyle-collection/murthi" className="category-filter-btn">
            MURTHI
          </Link>
          <Link to="/lifestyle-collection/decorative" className="category-filter-btn active">
            DECORATIVE
          </Link>
          <Link to="/lifestyle-collection/pooja-items" className="category-filter-btn">
            POOJA ITEMS
          </Link>
          <Link to="/lifestyle-collection/living-room" className="category-filter-btn">
            LIVING ROOM
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {decorativeProducts.map((product) => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`} 
              state={{ product }}
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
                  <span className="current-price">₹{product.price.toLocaleString()}</span>
                  {product.offer && (
                    <span className="original-price">{product.offer}</span>
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

export default DecorativeCollection;
