import React from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import lifestyle collection images
import lifestyle1 from '../ASSETS/lifestyleCollections/lifestyle1.jpg';
import lifestyle2 from '../ASSETS/lifestyleCollections/lifestyle2.webp';
import lifestyle3 from '../ASSETS/lifestyleCollections/lifestyle3.jpg';
import lifestyle4 from '../ASSETS/lifestyleCollections/lifestyle4.webp';
import lifestyle5 from '../ASSETS/lifestyleCollections/lifestyle5.jpg';
import lifestyle6 from '../ASSETS/lifestyleCollections/lifestyle6.jpg';
import lifestyle7 from '../ASSETS/lifestyleCollections/lifestyle7.jpg';
import lifestyle8 from '../ASSETS/lifestyleCollections/lifestyle8.jpg';
import lifestyle9 from '../ASSETS/lifestyleCollections/lifestyle9.png';

const LifestyleCollection = () => {
  const lifestyleProducts = [
    {
      id: 1,
      name: 'Silver Dinner Set',
      image: lifestyle1,
      price: 25000,
      offer: '15% OFF',
      size: 'Set of 12 pieces',
      material: '925 Sterling Silver',
      description: 'Elegant silver dinner set perfect for special occasions and daily dining',
      category: 'lifestyle'
    },
    {
      id: 2,
      name: 'Silver Photo Frame',
      image: lifestyle2,
      price: 8500,
      offer: '10% OFF',
      size: '8x10 inches',
      material: '925 Sterling Silver',
      description: 'Beautiful silver photo frame to showcase your precious memories',
      category: 'lifestyle'
    },
    {
      id: 3,
      name: 'Silver Decorative Bowl',
      image: lifestyle3,
      price: 12000,
      offer: '20% OFF',
      size: '12 inch diameter',
      material: '925 Sterling Silver',
      description: 'Handcrafted decorative bowl perfect for home decoration',
      category: 'lifestyle'
    },
    {
      id: 4,
      name: 'Silver Candle Holder',
      image: lifestyle4,
      price: 6800,
      offer: '12% OFF',
      size: '6 inch height',
      material: '925 Sterling Silver',
      description: 'Elegant candle holder to create a perfect ambiance',
      category: 'lifestyle'
    },
    {
      id: 5,
      name: 'Silver Tray Set',
      image: lifestyle5,
      price: 18500,
      offer: '18% OFF',
      size: 'Set of 3 trays',
      material: '925 Sterling Silver',
      description: 'Premium tray set for serving and decoration',
      category: 'lifestyle'
    },
    {
      id: 6,
      name: 'Silver Vase',
      image: lifestyle6,
      price: 15200,
      offer: '15% OFF',
      size: '10 inch height',
      material: '925 Sterling Silver',
      description: 'Beautiful silver vase for flowers and decoration',
      category: 'lifestyle'
    },
    {
      id: 7,
      name: 'Silver Jewelry Box',
      image: lifestyle7,
      price: 9800,
      offer: '10% OFF',
      size: '8x6x4 inches',
      material: '925 Sterling Silver',
      description: 'Elegant jewelry box to store your precious ornaments',
      category: 'lifestyle'
    },
    {
      id: 8,
      name: 'Silver Mirror Frame',
      image: lifestyle8,
      price: 11500,
      offer: '14% OFF',
      size: '12x16 inches',
      material: '925 Sterling Silver',
      description: 'Decorative mirror frame for your dressing table',
      category: 'lifestyle'
    },
    {
      id: 9,
      name: 'Silver Tea Set',
      image: lifestyle9,
      price: 22000,
      offer: '16% OFF',
      size: 'Set of 6 pieces',
      material: '925 Sterling Silver',
      description: 'Traditional silver tea set for special occasions',
      category: 'lifestyle'
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
          <h1 className="page-title">LIFESTYLE COLLECTION</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/lifestyle-collection" className="category-filter-btn active">
            ALL
          </Link>
          <Link to="/lifestyle-collection/coins" className="category-filter-btn">
            COINS
          </Link>
          <Link to="/lifestyle-collection/murthi" className="category-filter-btn">
            MURTHI
          </Link>
          <Link to="/lifestyle-collection/decorative" className="category-filter-btn">
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
          {lifestyleProducts.map((product) => (
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

export default LifestyleCollection;
