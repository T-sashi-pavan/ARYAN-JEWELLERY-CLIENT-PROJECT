import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import women bracelets videos
import braceletVideo1 from '../ASSETS/womenCollections/womens braceletes/Bracelet_Video_Generation.mp4';
import braceletVideo2 from '../ASSETS/womenCollections/womens braceletes/Golden_Bracelet_D_Video_Showcase.mp4';
import braceletVideo3 from '../ASSETS/womenCollections/womens braceletes/Jewelry_Showcase_Video_Generation (4).mp4';
import braceletVideo4 from '../ASSETS/womenCollections/womens braceletes/Jewelry_Showcase_Video_Generation (5).mp4';
import braceletVideo5 from '../ASSETS/womenCollections/womens braceletes/Jewelry_Showcase_Video_Generation.mp4';
import braceletVideo6 from '../ASSETS/womenCollections/womens braceletes/Jewelry_Video_Generation.mp4';
import braceletVideo7 from '../ASSETS/womenCollections/womens braceletes/Realistic_Jewelry_Showcase_Video_Generation (2).mp4';
import braceletVideo8 from '../ASSETS/womenCollections/womens braceletes/Realistic_Jewelry_Showcase_Video_Generation (3).mp4';
import braceletVideo9 from '../ASSETS/womenCollections/womens braceletes/Realistic_Jewelry_Showcase_Video_Generation.mp4';

// Import fallback images
import women4 from '../ASSETS/womenCollections/women4.jpg';
import women1 from '../ASSETS/womenCollections/women1.jpg';
import women3 from '../ASSETS/womenCollections/women3.jpg';

const WomenBraceletsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const braceletsProducts = [
    {
      id: 4,
      name: 'Traditional Gold Bracelet',
      video: braceletVideo1,
      image: women4,
      price: '₹4,100',
      originalPrice: '₹4,800',
      category: 'bracelets',
      subcategory: 'women-bracelets',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Traditional silver bracelet with beautiful patterns and designs'
    },
    {
      id: 301,
      name: 'Golden Bracelet Showcase',
      video: braceletVideo2,
      image: women1,
      price: '₹2,500',
      originalPrice: '₹3,000',
      category: 'bracelets',
      subcategory: 'women-bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Elegant golden bracelet with premium finish and contemporary design'
    },
    {
      id: 302,
      name: 'Designer Bracelet Collection',
      video: braceletVideo3,
      image: women3,
      price: '₹8,900',
      originalPrice: '₹10,500',
      category: 'bracelets',
      subcategory: 'women-bracelets',
      size: 'Complete Set',
      material: '925 Sterling Silver with Gemstones',
      description: 'Exquisite designer bracelet perfect for special occasions and events'
    },
    {
      id: 303,
      name: 'Luxury Jewelry Bracelet',
      video: braceletVideo4,
      image: women4,
      price: '₹5,200',
      originalPrice: '₹6,000',
      category: 'bracelets',
      subcategory: 'women-bracelets',
      size: 'One Size',
      material: '925 Sterling Silver',
      description: 'Luxury bracelet with intricate details and modern styling'
    },
    {
      id: 304,
      name: 'Classic Jewelry Showcase',
      video: braceletVideo5,
      image: women1,
      price: '₹3,800',
      originalPrice: '₹4,500',
      category: 'bracelets',
      subcategory: 'women-bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Classic bracelet design with timeless appeal and elegant finish'
    },
    {
      id: 305,
      name: 'Premium Jewelry Generation',
      video: braceletVideo6,
      image: women3,
      price: '₹6,500',
      originalPrice: '₹7,800',
      category: 'bracelets',
      subcategory: 'women-bracelets',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver with Gold Accents',
      description: 'Premium bracelet with innovative design and superior craftsmanship'
    },
    {
      id: 306,
      name: 'Realistic Jewelry Showcase',
      video: braceletVideo7,
      image: women4,
      price: '₹4,700',
      originalPrice: '₹5,500',
      category: 'bracelets',
      subcategory: 'women-bracelets',
      size: 'One Size',
      material: '925 Sterling Silver',
      description: 'Realistic jewelry design with contemporary patterns and premium quality'
    },
    {
      id: 307,
      name: 'Elite Bracelet Collection',
      video: braceletVideo8,
      image: women1,
      price: '₹7,200',
      originalPrice: '₹8,500',
      category: 'bracelets',
      subcategory: 'women-bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver with Diamonds',
      description: 'Elite bracelet collection featuring premium materials and exquisite design'
    },
    {
      id: 308,
      name: 'Masterpiece Bracelet',
      video: braceletVideo9,
      image: women3,
      price: '₹9,100',
      originalPrice: '₹10,800',
      category: 'bracelets',
      subcategory: 'women-bracelets',
      size: 'Complete Set',
      material: '925 Sterling Silver with Precious Stones',
      description: 'Masterpiece bracelet showcasing artistic excellence and luxury craftsmanship'
    }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Women's Bracelets Collection...</p>
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
          <Link to="/women-collection" className="breadcrumb-link">Women Collection</Link>
          <span className="breadcrumb-separator">|</span>
          <h1 className="page-title">BRACELETS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/women-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/women-collection/payal" className="category-filter-btn">
            PAYAL
          </Link>
          <Link to="/women-collection/chains" className="category-filter-btn">
            CHAINS
          </Link>
          <Link to="/women-collection/bracelets" className="category-filter-btn active">
            BRACELETS
          </Link>
          <Link to="/women-collection/bangles" className="category-filter-btn">
            BANGLES
          </Link>
          <Link to="/women-collection/necklace" className="category-filter-btn">
            NECKLACE
          </Link>
          <Link to="/women-collection/rings" className="category-filter-btn">
            RINGS
          </Link>
          <Link to="/women-collection/nose-rings" className="category-filter-btn">
            NOSE RINGS
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

export default WomenBraceletsCollection;
