import React from 'react';
import { Link } from 'react-router-dom';
import './MurthiCollection.css';

// Import murthi collection images
import murthi1 from '../ASSETS/murthiCollections/murthi1.jpg';
import murthi2 from '../ASSETS/murthiCollections/murthi2.jpg';
import murthi3 from '../ASSETS/murthiCollections/murthi3.jpg';
import murthi4 from '../ASSETS/murthiCollections/murthi4.jpg';
import murthi5 from '../ASSETS/murthiCollections/murthi5.jpg';
import murthi6 from '../ASSETS/murthiCollections/murthi6.jpg';

const MurthiCollection = () => {
  const murthiProducts = [
    {
      id: 1,
      name: 'Silver Ganesh Murthi',
      image: murthi1,
      price: 15000,
      offer: '15% OFF',
      size: '8 inch height',
      material: '925 Sterling Silver',
      description: 'Beautiful handcrafted silver Ganesh murthi for home temple and worship',
      category: 'murthi'
    },
    {
      id: 2,
      name: 'Silver Krishna Murthi',
      image: murthi2,
      price: 18500,
      offer: '12% OFF',
      size: '10 inch height',
      material: '925 Sterling Silver',
      description: 'Elegant silver Krishna murthi with intricate detailing for devotional purposes',
      category: 'murthi'
    },
    {
      id: 3,
      name: 'Silver Lakshmi Murthi',
      image: murthi3,
      price: 16500,
      offer: '18% OFF',
      size: '9 inch height',
      material: '925 Sterling Silver',
      description: 'Divine silver Lakshmi murthi for prosperity and wealth',
      category: 'murthi'
    },
    {
      id: 4,
      name: 'Silver Saraswati Murthi',
      image: murthi4,
      price: 17200,
      offer: '14% OFF',
      size: '9.5 inch height',
      material: '925 Sterling Silver',
      description: 'Graceful silver Saraswati murthi for knowledge and wisdom',
      category: 'murthi'
    },
    {
      id: 5,
      name: 'Silver Shiva Murthi',
      image: murthi5,
      price: 19800,
      offer: '16% OFF',
      size: '11 inch height',
      material: '925 Sterling Silver',
      description: 'Powerful silver Shiva murthi with traditional craftsmanship',
      category: 'murthi'
    },
    {
      id: 6,
      name: 'Silver Radha Krishna Murthi',
      image: murthi6,
      price: 22000,
      offer: '20% OFF',
      size: '12 inch height',
      material: '925 Sterling Silver',
      description: 'Divine silver Radha Krishna murthi set for temple decoration',
      category: 'murthi'
    }
  ];

  return (
    <div className="murthi-collection">
      <div className="murthi-header">
        <h1>MURTHI COLLECTION</h1>
      </div>
      
      <div className="murthi-grid">
        {murthiProducts.map((product) => (
          <Link 
            key={product.id}
            to="/product-detail" 
            state={{ product }}
            className="murthi-card"
          >
            <div className="murthi-card-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="murthi-card-info">
              <h3>{product.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MurthiCollection;
