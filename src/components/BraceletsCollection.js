import React from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import specific images for Bracelets
import bridal3 from '../ASSETS/bridalCollections/bridal3.jpg';
import bridal6 from '../ASSETS/bridalCollections/bridal6.jpg';
import bridal9 from '../ASSETS/bridalCollections/bridal9.jpg';

const BraceletsCollection = () => {
  const braceletsProducts = [
    {
      id: 'bracelets_1',
      name: 'Diamond Cut Bracelet',
      price: '₹16,500',
      originalPrice: '₹19,000',
      image: bridal3,
      category: 'bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver with Diamond Cut',
      description: 'Stunning diamond cut bracelet with sparkling finish'
    },
    {
      id: 'bracelets_2',
      name: 'Kundan Bracelet Set',
      price: '₹21,500',
      originalPrice: '₹24,000',
      image: bridal6,
      category: 'bracelets',
      size: 'Medium',
      material: '925 Sterling Silver with Kundan Work',
      description: 'Luxurious kundan bracelet set with royal elegance'
    },
    {
      id: 'bracelets_3',
      name: 'Contemporary Bracelet',
      price: '₹14,800',
      originalPrice: '₹17,500',
      image: bridal9,
      category: 'bracelets',
      size: 'One Size',
      material: '925 Sterling Silver with Modern Design',
      description: 'Modern design bracelet perfect for contemporary fashion'
    }
  ];

  return (
    <div className="bridal-collection">
      <div className="container">
        <div className="collection-header">
          <h1>BRACELETS COLLECTION</h1>
          <p>Stunning wrist accessories for elegant styling</p>
          <nav className="breadcrumb">
            <Link to="/">Home</Link> {' > '} <Link to="/bridal-collection">Bridal Collection</Link> {' > '} <span>Bracelets</span>
          </nav>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filter-nav">
          <div className="filter-buttons">
            <Link to="/bridal-collection" className="filter-btn">
              ALL
            </Link>
            <Link to="/bridal-collection/payal" className="filter-btn">
              PAYAL
            </Link>
            <Link to="/bridal-collection/chains" className="filter-btn">
              CHAINS
            </Link>
            <Link to="/bridal-collection/bracelets" className="filter-btn active">
              BRACELETS
            </Link>
            <Link to="/bridal-collection/necklace" className="filter-btn">
              NECKLACE
            </Link>
            <Link to="/bridal-collection/nose-rings" className="filter-btn">
              NOSE RINGS
            </Link>
          </div>
        </div>

        <div className="products-grid">
          {braceletsProducts.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              state={{ product: product }}
              className="product-card"
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-price">
                  <span className="current-price">{product.price}</span>
                  <span className="original-price">{product.originalPrice}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BraceletsCollection;
