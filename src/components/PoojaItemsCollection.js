import React from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import pooja items collection images
import poojaitems1 from '../ASSETS/poojaitemsCollections/poojaitems1.jpg';
import poojaitems2 from '../ASSETS/poojaitemsCollections/poojaitems2.jpg';
import poojaitems3 from '../ASSETS/poojaitemsCollections/poojaitems3.jpg';
import poojaitems4 from '../ASSETS/poojaitemsCollections/poojaitems4.jpg';
import poojaitems5 from '../ASSETS/poojaitemsCollections/poojaitems5.jpg';
import poojaitems6 from '../ASSETS/poojaitemsCollections/poojaitems6.jpg';

const PoojaItemsCollection = () => {
  const poojaItemsProducts = [
    {
      id: 1,
      name: 'Silver Pooja Thali Set',
      image: poojaitems1,
      price: 12000,
      offer: '15% OFF',
      size: '12 inch diameter',
      material: '925 Sterling Silver',
      description: 'Complete silver pooja thali set for religious ceremonies and daily worship',
      category: 'poojaitems'
    },
    {
      id: 2,
      name: 'Silver Diya Set',
      image: poojaitems2,
      price: 8500,
      offer: '12% OFF',
      size: 'Set of 5 diyas',
      material: '925 Sterling Silver',
      description: 'Beautiful silver diya set for festivals and special occasions',
      category: 'poojaitems'
    },
    {
      id: 3,
      name: 'Silver Kalash',
      image: poojaitems3,
      price: 15000,
      offer: '18% OFF',
      size: '8 inch height',
      material: '925 Sterling Silver',
      description: 'Sacred silver kalash for religious rituals and temple ceremonies',
      category: 'poojaitems'
    },
    {
      id: 4,
      name: 'Silver Incense Holder',
      image: poojaitems4,
      price: 6500,
      offer: '10% OFF',
      size: '6 inch length',
      material: '925 Sterling Silver',
      description: 'Elegant silver incense holder for aromatic worship experience',
      category: 'poojaitems'
    },
    {
      id: 5,
      name: 'Silver Camphor Stand',
      image: poojaitems5,
      price: 4500,
      offer: '14% OFF',
      size: '4 inch height',
      material: '925 Sterling Silver',
      description: 'Traditional silver camphor stand for aarti and prayers',
      category: 'poojaitems'
    },
    {
      id: 6,
      name: 'Silver Pooja Bell',
      image: poojaitems6,
      price: 7200,
      offer: '16% OFF',
      size: '5 inch height',
      material: '925 Sterling Silver',
      description: 'Melodious silver pooja bell for temple worship and home prayers',
      category: 'poojaitems'
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
          <h1 className="page-title">POOJA ITEMS</h1>
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
          <Link to="/lifestyle-collection/pooja-items" className="category-filter-btn active">
            POOJA ITEMS
          </Link>
          <Link to="/lifestyle-collection/living-room" className="category-filter-btn">
            LIVING ROOM
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {poojaItemsProducts.map((product) => (
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

export default PoojaItemsCollection;
