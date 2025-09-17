import React from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import specific images for Nose Rings
import bridal7 from '../ASSETS/bridalCollections/bridal7.jpg';
import bridal8 from '../ASSETS/bridalCollections/bridal8.jpg';
import bridal4 from '../ASSETS/bridalCollections/bridal4.jpg';

const NoseRingsCollection = () => {
  const noseRingsProducts = [
    {
      id: 'noserings_1',
      name: 'Antique Nose Ring',
      price: '₹6,500',
      originalPrice: '₹8,000',
      image: bridal7,
      category: 'noserings',
      size: 'Adjustable',
      material: '925 Sterling Silver with Antique Finish',
      description: 'Vintage inspired nose ring with heritage design and traditional charm'
    },
    {
      id: 'noserings_2',
      name: 'Temple Work Nose Pin',
      price: '₹5,800',
      originalPrice: '₹7,200',
      image: bridal8,
      category: 'noserings',
      size: 'One Size',
      material: '925 Sterling Silver with Temple Work',
      description: 'Sacred temple design nose pin perfect for religious ceremonies'
    },
    {
      id: 'noserings_3',
      name: 'Pearl Nose Ring',
      price: '₹7,200',
      originalPrice: '₹8,800',
      image: bridal4,
      category: 'noserings',
      size: 'Adjustable',
      material: '925 Sterling Silver with Natural Pearls',
      description: 'Elegant pearl nose ring with delicate design for special occasions'
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
          <h1 className="page-title">NOSE RINGS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/bridal-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/bridal-collection/payal" className="category-filter-btn">
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
          <Link to="/bridal-collection/nose-rings" className="category-filter-btn active">
            NOSE RINGS
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {noseRingsProducts.map((product) => (
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

export default NoseRingsCollection;
