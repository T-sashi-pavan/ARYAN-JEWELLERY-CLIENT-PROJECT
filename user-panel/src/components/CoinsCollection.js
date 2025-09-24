import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import coins collection images
import coin1 from '../ASSETS/coinsCollections/coin1.jpg';
import coin2 from '../ASSETS/coinsCollections/coin2.jpg';
import coin3 from '../ASSETS/coinsCollections/coin3.jpg';
import coin4 from '../ASSETS/coinsCollections/coin4.jpg';
import coin5 from '../ASSETS/coinsCollections/coin5.jpg';
import coin6 from '../ASSETS/coinsCollections/coin6.jpg';

const CoinsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coinsProducts, setCoinsProducts] = useState([]);
  const [error, setError] = useState(null);

  // Static fallback data
  const staticCoinsProducts = [
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

  useEffect(() => {
    const fetchCoinsProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/public/products?category=coins');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && data.data && Array.isArray(data.data)) {
          const formattedProducts = data.data.map(product => ({
            id: product.id || product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            originalPrice: product.originalPrice,
            category: product.category,
            subcategory: product.subcategory,
            size: product.size,
            material: product.material,
            description: product.description
          }));
          const allProducts = [...formattedProducts, ...staticCoinsProducts];
          setCoinsProducts(allProducts);
        } else {
          setCoinsProducts(staticCoinsProducts);
        }
      } catch (error) {
        setError('Failed to load products from server. Showing offline products.');
        setCoinsProducts(staticCoinsProducts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoinsProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Coins Collection...</p>
      </div>
    );
  }

  return (
    <div className="bridal-collection-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="back-arrow">←</span>
          </Link>
          <span className="breadcrumb-separator">|</span>
          <Link to="/lifestyle-collection" className="breadcrumb-link">Lifestyle Collection</Link>
          <span className="breadcrumb-separator">|</span>
          <h1 className="page-title">COINS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/lifestyle-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/lifestyle-collection/coins" className="category-filter-btn active">
            COINS
          </Link>
          <Link to="/lifestyle-collection/murthi" className="category-filter-btn">
            MURTHI
          </Link>
          <Link to="/lifestyle-collection/decorative" className="category-filter-btn">
            DECORATIVE
          </Link>
          <Link to="/lifestyle-collection/pooja-items" className="category-filter-btn">
            POOJA ITEMS
          </Link>
          <Link to="/gift-collection" className="category-filter-btn">
            GIFT
          </Link>
          <Link to="/lifestyle-collection/living-room" className="category-filter-btn">
            LIVING ROOM
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {coinsProducts.map((product) => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`} 
              state={{ product }}
              className="product-card"
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <div className="overlay-content">
                    <p className="product-description">{product.description}</p>
                    <span className="view-details">View Details</span>
                  </div>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  <span className="current-price">₹{product.price.toLocaleString()}</span>
                  {product.offer && (
                    <span className="original-price">{product.offer}</span>
                  )}
                </div>
                <div className="product-details">
                  <span className="product-size">{product.size}</span>
                  <span className="product-material">{product.material}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoinsCollection;
