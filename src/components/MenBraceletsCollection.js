import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import bracelet videos
import braceletVideo1 from '../ASSETS/menCollections/mens braceletes/Cinematic_Bracelet_Advertisement_Video.mp4';
import braceletVideo2 from '../ASSETS/menCollections/mens braceletes/Cinematic_Silver_Bracelet_Video_Generation.mp4';
import braceletVideo3 from '../ASSETS/menCollections/mens braceletes/Jewelry_Showcase_Video_Generation (2).mp4';
import braceletVideo4 from '../ASSETS/menCollections/mens braceletes/Jewelry_Showcase_Video_Generation (3).mp4';
import braceletVideo5 from '../ASSETS/menCollections/mens braceletes/Jewelry_Showcase_Video_Generation (6).mp4';
import braceletVideo6 from '../ASSETS/menCollections/mens braceletes/Jewelry_Showcase_Video_Generation (7).mp4';
import braceletVideo7 from '../ASSETS/menCollections/mens braceletes/Jewelry_Video_Generation_Showcase.mp4';

const MenBraceletsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const braceletsProducts = [
    {
      id: 5,
      name: 'Cinematic Silver Bracelet',
      price: '₹6,800',
      originalPrice: '₹8,000',
      video: braceletVideo1,
      category: 'bracelets',
      subcategory: 'men-bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Robust chain bracelet with masculine appeal and durable construction'
    },
    {
      id: 501,
      name: 'Premium Chain Bracelet',
      price: '₹7,500',
      originalPrice: '₹9,000',
      video: braceletVideo2,
      category: 'bracelets',
      subcategory: 'men-bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Premium silver bracelet with sophisticated chain design'
    },
    {
      id: 502,
      name: 'Designer Bracelet Collection',
      price: '₹8,200',
      originalPrice: '₹10,000',
      video: braceletVideo3,
      category: 'bracelets',
      subcategory: 'men-bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Designer bracelet with intricate patterns and modern appeal'
    },
    {
      id: 503,
      name: 'Luxury Silver Bracelet',
      price: '₹9,500',
      originalPrice: '₹11,500',
      video: braceletVideo4,
      category: 'bracelets',
      subcategory: 'men-bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver with Premium Finish',
      description: 'Luxury bracelet with exceptional craftsmanship and elegant design'
    },
    {
      id: 504,
      name: 'Executive Bracelet Style',
      price: '₹7,800',
      originalPrice: '₹9,200',
      video: braceletVideo5,
      category: 'bracelets',
      subcategory: 'men-bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Executive style bracelet perfect for professional and casual wear'
    },
    {
      id: 505,
      name: 'Modern Chain Bracelet',
      price: '₹6,500',
      originalPrice: '₹8,000',
      video: braceletVideo6,
      category: 'bracelets',
      subcategory: 'men-bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Modern chain bracelet with contemporary design elements'
    },
    {
      id: 506,
      name: 'Showcase Bracelet Design',
      price: '₹8,800',
      originalPrice: '₹10,500',
      video: braceletVideo7,
      category: 'bracelets',
      subcategory: 'men-bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver with Special Finish',
      description: 'Showcase design bracelet with unique styling and premium quality'
    }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Men's Bracelets Collection...</p>
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
          <Link to="/mens-collection" className="breadcrumb-link">Men's Collection</Link>
          <span className="breadcrumb-separator">|</span>
          <h1 className="page-title">BRACELETS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/mens-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/mens-collection/chains" className="category-filter-btn">
            CHAINS
          </Link>
          <Link to="/mens-collection/bracelets" className="category-filter-btn active">
            BRACELETS
          </Link>
          <Link to="/mens-collection/rings" className="category-filter-btn">
            RINGS
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {braceletsProducts.map(product => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`}
              state={{ product: product }}
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

export default MenBraceletsCollection;
