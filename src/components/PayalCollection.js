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
    <div className="bridal-collection">
      <div className="container">
        <div className="collection-header">
          <h1>PAYAL COLLECTION</h1>
          <p>Elegant ankle jewelry for special occasions</p>
          <nav className="breadcrumb">
            <Link to="/">Home</Link> {' > '} <Link to="/bridal-collection">Bridal Collection</Link> {' > '} <span>Payal</span>
          </nav>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filter-nav">
          <div className="filter-buttons">
            <Link to="/bridal-collection" className="filter-btn">
              ALL
            </Link>
            <Link to="/bridal-collection/payal" className="filter-btn active">
              PAYAL
            </Link>
            <Link to="/bridal-collection/chains" className="filter-btn">
              CHAINS
            </Link>
            <Link to="/bridal-collection/bracelets" className="filter-btn">
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
          {payalProducts.map((product) => (
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

export default PayalCollection;
