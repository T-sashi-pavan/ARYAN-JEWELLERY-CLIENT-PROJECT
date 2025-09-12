import React from 'react';
import { Link } from 'react-router-dom';
import './LivingRoomCollection.css';

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
    <div className="livingroom-collection">
      <div className="livingroom-header">
        <h1>LIVING ROOM COLLECTION</h1>
      </div>
      
      <div className="livingroom-grid">
        {livingRoomProducts.map((product) => (
          <Link 
            key={product.id}
            to="/product-detail" 
            state={{ product }}
            className="livingroom-card"
          >
            <div className="livingroom-card-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="livingroom-card-info">
              <h3>{product.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LivingRoomCollection;
