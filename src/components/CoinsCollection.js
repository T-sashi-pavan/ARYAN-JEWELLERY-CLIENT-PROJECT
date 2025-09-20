import React from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import coins videos
import coinVideo1 from '../ASSETS/coinsCollections/coins_videos/Realistic_Rotating_Coin_Showcase_Video.mp4';
import coinVideo2 from '../ASSETS/coinsCollections/coins_videos/Realistic_Rotating_Coin_Showcase_Video (3).mp4';
import coinVideo3 from '../ASSETS/coinsCollections/coins_videos/Ganesha_Idol_Showcase_Video_Generation.mp4';

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
      video: coinVideo1,
      image: coin1,
      price: '₹5,500',
      originalPrice: '₹6,250',
      size: '40mm diameter',
      material: '999 Pure Silver',
      description: 'Beautiful commemorative silver coin with intricate design and premium finish',
      category: 'coins'
    },
    {
      id: 2,
      name: 'Silver Religious Coin',
      video: coinVideo2,
      image: coin2,
      price: '₹4,800',
      originalPrice: '₹5,333',
      size: '35mm diameter',
      material: '999 Pure Silver',
      description: 'Sacred silver coin featuring religious motifs perfect for gifting',
      category: 'coins'
    },
    {
      id: 3,
      name: 'Silver Anniversary Coin',
      video: coinVideo3,
      image: coin3,
      price: '₹6,200',
      originalPrice: '₹7,294',
      size: '45mm diameter',
      material: '999 Pure Silver',
      description: 'Special anniversary edition silver coin with elegant design',
      category: 'coins'
    },
    // {
    //   id: 4,
    //   name: 'Silver Heritage Coin',
    //   image: coin4,
    //   price: 5800,
    //   offer: '8% OFF',
    //   size: '38mm diameter',
    //   material: '999 Pure Silver',
    //   description: 'Heritage collection silver coin showcasing traditional craftsmanship',
    //   category: 'coins'
    // },
    // {
    //   id: 5,
    //   name: 'Silver Festival Coin',
    //   image: coin5,
    //   price: 4500,
    //   offer: '14% OFF',
    //   size: '32mm diameter',
    //   material: '999 Pure Silver',
    //   description: 'Festival special silver coin with auspicious symbols and designs',
    //   category: 'coins'
    // },
    // {
    //   id: 6,
    //   name: 'Silver Limited Edition Coin',
    //   image: coin6,
    //   price: 7500,
    //   offer: '18% OFF',
    //   size: '50mm diameter',
    //   material: '999 Pure Silver',
    //   description: 'Limited edition silver coin with exclusive design and collector value',
    //   category: 'coins'
    // }
  ];

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
                {product.video ? (
                  <video
                    src={product.video}
                    alt={product.name}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onMouseEnter={(e) => e.target.pause()}
                    onMouseLeave={(e) => e.target.play()}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                ) : (
                  <img src={product.image} alt={product.name} />
                )}
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
                  <span className="current-price">{product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">{product.originalPrice}</span>
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
