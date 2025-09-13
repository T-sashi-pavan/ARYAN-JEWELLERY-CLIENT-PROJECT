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
    <div className="bridal-collection">
      <div className="container">
        <div className="collection-header">
          <h1>NOSE RINGS COLLECTION</h1>
          <p>Classic nose jewelry for traditional elegance</p>
          <nav className="breadcrumb">
            <Link to="/">Home</Link> {' > '} <Link to="/bridal-collection">Bridal Collection</Link> {' > '} <span>Nose Rings</span>
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
            <Link to="/bridal-collection/bracelets" className="filter-btn">
              BRACELETS
            </Link>
            <Link to="/bridal-collection/necklace" className="filter-btn">
              NECKLACE
            </Link>
            <Link to="/bridal-collection/nose-rings" className="filter-btn active">
              NOSE RINGS
            </Link>
          </div>
        </div>

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

export default NoseRingsCollection;
