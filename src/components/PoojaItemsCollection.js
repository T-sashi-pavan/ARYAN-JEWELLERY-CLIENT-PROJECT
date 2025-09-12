import React from 'react';
import { Link } from 'react-router-dom';
import './PoojaItemsCollection.css';

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
    <div className="poojaitems-collection">
      <div className="poojaitems-header">
        <h1>POOJA ITEMS COLLECTION</h1>
      </div>
      
      <div className="poojaitems-grid">
        {poojaItemsProducts.map((product) => (
          <Link 
            key={product.id}
            to="/product-detail" 
            state={{ product }}
            className="poojaitems-card"
          >
            <div className="poojaitems-card-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="poojaitems-card-info">
              <h3>{product.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PoojaItemsCollection;
