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
    <div className="bridal-collection">
      <div className="container">
        <div className="collection-header">
          <h1>CHAINS COLLECTION</h1>
          <p>Beautiful silver chains for every occasion</p>
          <nav className="breadcrumb">
            <Link to="/">Home</Link> {' > '} <Link to="/bridal-collection">Bridal Collection</Link> {' > '} <span>Chains</span>
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
            <Link to="/bridal-collection/chains" className="filter-btn active">
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
          {chainsProducts.map((product) => (
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

export default ChainsCollection;
