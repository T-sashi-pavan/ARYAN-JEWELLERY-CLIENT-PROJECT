import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import women bangles videos
import banglesVideo1 from '../ASSETS/womenCollections/bangles/Realistic_Jewelry_Showcase_Video_Generation.mp4';
import banglesVideo2 from '../ASSETS/womenCollections/bangles/Realistic_Jewelry_Showcase_Video_Generation (2).mp4';
import banglesVideo3 from '../ASSETS/womenCollections/bangles/Realistic_Jewelry_Showcase_Video_Generation (3).mp4';

// Import fallback images
import women1 from '../ASSETS/womenCollections/women1.jpg';
import women2 from '../ASSETS/womenCollections/women2.jpg';
import women3 from '../ASSETS/womenCollections/women3.jpg';

const WomenBanglesCollection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const banglesProducts = [
    {
      id: 601,
      name: 'Realistic Bangles Showcase',
      video: banglesVideo1,
      image: women1,
      price: '₹3,200',
      originalPrice: '₹3,800',
      category: 'bangles',
      subcategory: 'women-bangles',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Beautiful silver bangles with realistic design and premium finish'
    },
    {
      id: 602,
      name: 'Elegant Bangles Set',
      video: banglesVideo2,
      image: women2,
      price: '₹4,500',
      originalPrice: '₹5,200',
      category: 'bangles',
      subcategory: 'women-bangles',
      size: 'Set of 4',
      material: '925 Sterling Silver with Gold Plating',
      description: 'Elegant bangles set with intricate patterns and golden finish'
    },
    {
      id: 603,
      name: 'Designer Bangles Collection',
      video: banglesVideo3,
      image: women3,
      price: '₹5,800',
      originalPrice: '₹6,800',
      category: 'bangles',
      subcategory: 'women-bangles',
      size: 'Set of 6',
      material: '925 Sterling Silver with Gemstones',
      description: 'Designer bangles collection with precious gemstones and artistic designs'
    },
    // {
    //   id: 604,
    //   name: 'Traditional Silver Bangles',
    //   image: women1,
    //   price: '₹2,800',
    //   originalPrice: '₹3,300',
    //   category: 'bangles',
    //   subcategory: 'women-bangles',
    //   size: 'Adjustable',
    //   material: '925 Sterling Silver',
    //   description: 'Traditional silver bangles with classic appeal and timeless design'
    // },
    // {
    //   id: 605,
    //   name: 'Modern Bangles Set',
    //   image: women2,
    //   price: '₹3,900',
    //   originalPrice: '₹4,500',
    //   category: 'bangles',
    //   subcategory: 'women-bangles',
    //   size: 'Set of 3',
    //   material: '925 Sterling Silver',
    //   description: 'Modern bangles set with contemporary styling and sleek finish'
    // },
    // {
    //   id: 606,
    //   name: 'Antique Bangles Collection',
    //   image: women3,
    //   price: '₹4,200',
    //   originalPrice: '₹4,900',
    //   category: 'bangles',
    //   subcategory: 'women-bangles',
    //   size: 'Set of 2',
    //   material: '925 Sterling Silver with Antique Finish',
    //   description: 'Antique bangles collection with vintage charm and heritage appeal'
    // }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Women's Bangles Collection...</p>
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
          <h1 className="page-title">BANGLES</h1>
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
          <Link to="/women-collection/bracelets" className="category-filter-btn">
            BRACELETS
          </Link>
          <Link to="/women-collection/bangles" className="category-filter-btn active">
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
          {banglesProducts.map(product => (
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

export default WomenBanglesCollection;