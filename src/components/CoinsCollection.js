import React from 'react';
import { Link } from 'react-router-dom';
import './CoinsCollection.css';

// Import coins collection images
import coin1 from '../ASSETS/coinsCollections/coin1.jpg';
import coin2 from '../ASSETS/coinsCollections/coin2.jpg';
import coin3 from '../ASSETS/coinsCollections/coin3.jpg';
import coin4 from '../ASSETS/coinsCollections/coin4.jpg';
import coin5 from '../ASSETS/coinsCollections/coin5.jpg';
import coin6 from '../ASSETS/coinsCollections/coin6.jpg';

const CoinsCollection = () => {
  const coinsProducts = [
    {
      id: 1,
      name: 'Silver Commemorative Coin',
      image: coin1,
      price: 5500,
      offer: '12% OFF',
      size: '40mm diameter',
      material: '999 Pure Silver',
      description: 'Beautiful commemorative silver coin with intricate design and premium finish',
      category: 'coins'
    },
    {
      id: 2,
      name: 'Silver Religious Coin',
      image: coin2,
      price: 4800,
      offer: '10% OFF',
      size: '35mm diameter',
      material: '999 Pure Silver',
      description: 'Sacred silver coin featuring religious motifs perfect for gifting',
      category: 'coins'
    },
    {
      id: 3,
      name: 'Silver Anniversary Coin',
      image: coin3,
      price: 6200,
      offer: '15% OFF',
      size: '45mm diameter',
      material: '999 Pure Silver',
      description: 'Special anniversary edition silver coin with elegant design',
      category: 'coins'
    },
    {
      id: 4,
      name: 'Silver Heritage Coin',
      image: coin4,
      price: 5800,
      offer: '8% OFF',
      size: '38mm diameter',
      material: '999 Pure Silver',
      description: 'Heritage collection silver coin showcasing traditional craftsmanship',
      category: 'coins'
    },
    {
      id: 5,
      name: 'Silver Festival Coin',
      image: coin5,
      price: 4500,
      offer: '14% OFF',
      size: '32mm diameter',
      material: '999 Pure Silver',
      description: 'Festival special silver coin with auspicious symbols and designs',
      category: 'coins'
    },
    {
      id: 6,
      name: 'Silver Limited Edition Coin',
      image: coin6,
      price: 7500,
      offer: '18% OFF',
      size: '50mm diameter',
      material: '999 Pure Silver',
      description: 'Limited edition silver coin with exclusive design and collector value',
      category: 'coins'
    }
  ];

  return (
    <div className="coins-collection">
      <div className="coins-header">
        <h1>COINS COLLECTION</h1>
      </div>
      
      <div className="coins-grid">
        {coinsProducts.map((product) => (
          <Link 
            key={product.id}
            to="/product-detail" 
            state={{ product }}
            className="coins-card"
          >
            <div className="coins-card-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="coins-card-info">
              <h3>{product.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoinsCollection;
