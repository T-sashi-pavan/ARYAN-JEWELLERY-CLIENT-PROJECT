import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GiftCollection.css';

// Import gift collection images
import gift1 from '../ASSETS/giftCollections/gift1.jpg';
import gift2 from '../ASSETS/giftCollections/gift2.jpg';
import gift3 from '../ASSETS/giftCollections/gift3.jpg';
import gift4 from '../ASSETS/giftCollections/gift4.jpg';
import gift5 from '../ASSETS/giftCollections/gift5.jpg';
import gift6 from '../ASSETS/giftCollections/gift6.jpg';

const GiftCollection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [giftProducts, setGiftProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGiftProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/public/products?category=gift');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data && data.data.length > 0) {
            const formattedProducts = data.data.map(product => ({
              id: product._id || product.id,
              name: product.name,
              image: product.image || (staticGiftProducts[0]?.image),
              price: product.price,
              offer: product.offer || '',
              size: product.size || '',
              material: product.material || product.composition || '',
              description: product.description || '',
              category: product.category
            }));
            setGiftProducts(formattedProducts);
          } else {
            setGiftProducts(staticGiftProducts);
          }
        } else {
          console.warn('API response not ok, using static data');
          setGiftProducts(staticGiftProducts);
        }
      } catch (error) {
        console.error('Error fetching gift products:', error);
        setError('Failed to load products');
        setGiftProducts(staticGiftProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGiftProducts();
  }, []);

  // Static fallback data
  const staticGiftProducts = [
    {
      id: 1,
      name: 'Silver Gift Set',
      image: gift1,
      price: 8500,
      offer: '15% OFF',
      size: 'Medium Gift Box',
      material: '925 Sterling Silver',
      description: 'Beautiful silver gift set perfect for special occasions and celebrations',
      category: 'gift'
    },
    {
      id: 2,
      name: 'Silver Decorative Item',
      image: gift2,
      price: 6200,
      offer: '12% OFF',
      size: 'Small Decorative Piece',
      material: '925 Sterling Silver',
      description: 'Elegant silver decorative item ideal for gifting to loved ones',
      category: 'gift'
    },
    {
      id: 3,
      name: 'Silver Anniversary Gift',
      image: gift3,
      price: 12500,
      offer: '18% OFF',
      size: 'Large Gift Box',
      material: '925 Sterling Silver',
      description: 'Premium silver anniversary gift set with beautiful craftsmanship',
      category: 'gift'
    },
    {
      id: 4,
      name: 'Silver Wedding Gift',
      image: gift4,
      price: 9800,
      offer: '14% OFF',
      size: 'Medium Gift Set',
      material: '925 Sterling Silver',
      description: 'Graceful silver wedding gift perfect for special ceremonies',
      category: 'gift'
    },
    {
      id: 5,
      name: 'Silver Birthday Gift',
      image: gift5,
      price: 7500,
      offer: '16% OFF',
      size: 'Small Gift Item',
      material: '925 Sterling Silver',
      description: 'Special silver birthday gift with elegant design and finish',
      category: 'gift'
    },
    {
      id: 6,
      name: 'Silver Corporate Gift',
      image: gift6,
      price: 11200,
      offer: '20% OFF',
      size: 'Executive Gift Box',
      material: '925 Sterling Silver',
      description: 'Professional silver corporate gift for business occasions',
      category: 'gift'
    }
  ];

  return (
    <div className="gift-collection">
      <div className="gift-header">
        <h1>GIFT COLLECTION</h1>
      </div>
      
      <div className="gift-grid">
        {giftProducts.map((product) => (
          <Link 
            key={product.id}
            to="/product-detail" 
            state={{ product }}
            className="gift-card"
          >
            <div className="gift-card-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="gift-card-info">
              <h3>{product.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GiftCollection;
