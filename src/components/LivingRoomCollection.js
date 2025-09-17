import React from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import living room collection images
import livingroom1 from '../ASSETS/livingroomCollections/livingroom1.jpg';
import livingroom2 from '../ASSETS/livingroomCollections/livingroom2.jpg';
import livingroom3 from '../ASSETS/livingroomCollections/livingroom3.jpg';
import livingroom4 from '../ASSETS/livingroomCollections/livingroom4.jpg';
import livingroom5 from '../ASSETS/livingroomCollections/livingroom5.jpg';
import livingroom6 from '../ASSETS/livingroomCollections/livingroom6.jpg';

const LivingRoomCollection = () => {
  const livingRoomProducts = [
    {
      id: 1,
      name: 'Silver Wall Mirror',
      image: livingroom1,
      price: 12500,
      offer: '15% OFF',
      size: '24x18 inches',
      material: '925 Sterling Silver Frame',
      description: 'Elegant silver-framed wall mirror perfect for living room decoration',
      category: 'livingroom'
    },
    {
      id: 2,
      name: 'Silver Coffee Table Set',
      image: livingroom2,
      price: 35000,
      offer: '20% OFF',
      size: 'Table 48x24 inches',
      material: '925 Sterling Silver Accents',
      description: 'Luxurious coffee table set with silver accents for modern living rooms',
      category: 'livingroom'
    },
    {
      id: 3,
      name: 'Silver Decorative Lamp',
      image: livingroom3,
      price: 18500,
      offer: '12% OFF',
      size: '28 inch height',
      material: '925 Sterling Silver Base',
      description: 'Sophisticated decorative lamp with silver base for ambient lighting',
      category: 'livingroom'
    },
    {
      id: 4,
      name: 'Silver Wall Clock',
      image: livingroom4,
      price: 8500,
      offer: '10% OFF',
      size: '16 inch diameter',
      material: '925 Sterling Silver',
      description: 'Elegant silver wall clock with intricate design for living room',
      category: 'livingroom'
    },
    {
      id: 5,
      name: 'Silver Centerpiece Bowl',
      image: livingroom5,
      price: 15200,
      offer: '18% OFF',
      size: '14 inch diameter',
      material: '925 Sterling Silver',
      description: 'Beautiful centerpiece bowl perfect for living room table decoration',
      category: 'livingroom'
    },
    {
      id: 6,
      name: 'Silver Photo Display Stand',
      image: livingroom6,
      price: 6500,
      offer: '8% OFF',
      size: '12x8 inches',
      material: '925 Sterling Silver',
      description: 'Stylish photo display stand to showcase memories in your living room',
      category: 'livingroom'
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
          <h1 className="page-title">LIVING ROOM</h1>
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
          <Link to="/lifestyle-collection/decorative" className="category-filter-btn">
            DECORATIVE
          </Link>
          <Link to="/lifestyle-collection/pooja-items" className="category-filter-btn">
            POOJA ITEMS
          </Link>
          <Link to="/lifestyle-collection/living-room" className="category-filter-btn active">
            LIVING ROOM
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {livingRoomProducts.map((product) => (
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

export default LivingRoomCollection;
