import React from 'react';
import { Link } from 'react-router-dom';
import './DecorativeCollection.css';

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
    <div className="decorative-collection">
      <div className="decorative-header">
        <h1>DECORATIVE COLLECTION</h1>
      </div>
      
      <div className="decorative-grid">
        {decorativeProducts.map((product) => (
          <Link 
            key={product.id}
            to="/product-detail" 
            state={{ product }}
            className="decorative-card"
          >
            <div className="decorative-card-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="decorative-card-info">
              <h3>{product.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DecorativeCollection;
