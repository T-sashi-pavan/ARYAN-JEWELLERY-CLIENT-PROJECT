import React from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import specific images for Necklace
import bridal1 from '../ASSETS/bridalCollections/bridal1.jpg';
import bridal6 from '../ASSETS/bridalCollections/bridal6.jpg';
import bridal2 from '../ASSETS/bridalCollections/bridal2.jpg';

const NecklaceCollection = () => {
  const necklaceProducts = [
    {
      id: 'necklace_1',
      name: 'Royal Bridal Necklace Set',
      price: '₹25,000',
      originalPrice: '₹30,000',
      image: bridal1,
      category: 'necklace',
      size: 'Complete Set',
      material: '925 Sterling Silver with Gemstones',
      description: 'Exquisite bridal necklace with matching earrings perfect for your special day'
    },
    {
      id: 'necklace_2',
      name: 'Kundan Necklace Collection',
      price: '₹38,000',
      originalPrice: '₹42,000',
      image: bridal6,
      category: 'necklace',
      size: 'Complete Set',
      material: '925 Sterling Silver with Kundan Work',
      description: 'Luxurious kundan work necklace set with royal elegance'
    },
    {
      id: 'necklace_3',
      name: 'Traditional Choker Set',
      price: '₹18,500',
      originalPrice: '₹22,000',
      image: bridal2,
      category: 'necklace',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Classic choker design with traditional motifs and intricate craftsmanship'
    }
  ];

  return (
    <div className="bridal-collection">
      <div className="container">
        <div className="collection-header">
          <h1>NECKLACE COLLECTION</h1>
          <p>Traditional necklaces for special occasions</p>
          <nav className="breadcrumb">
            <Link to="/">Home</Link> {' > '} <Link to="/bridal-collection">Bridal Collection</Link> {' > '} <span>Necklace</span>
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
            <Link to="/bridal-collection/necklace" className="filter-btn active">
              NECKLACE
            </Link>
            <Link to="/bridal-collection/nose-rings" className="filter-btn">
              NOSE RINGS
            </Link>
          </div>
        </div>

        <div className="products-grid">
          {necklaceProducts.map((product) => (
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

export default NecklaceCollection;
