import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';



// Import ring videos
import ringVideo1 from '../ASSETS/menCollections/mens_rings/Realistic_Diamond_Ring_D_Showcase.mp4';
import ringVideo2 from '../ASSETS/menCollections/mens_rings/Realistic_Diamond_Ring_Video_Showcase.mp4';
import ringVideo3 from '../ASSETS/menCollections/mens_rings/Realistic_D_Ring_Video_Generation.mp4';

const MenRingsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const ringsProducts = [
    {
      id: 1,
      name: 'Diamond Ring Showcase',
      price: '₹3,500',
      originalPrice: '₹4,200',
      video: ringVideo1,
      category: 'rings',
      subcategory: 'men-rings',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Diamond ring showcase with modern design perfect for everyday wear'
    },
    {
      id: 2,
      name: 'Premium Diamond Ring',
      price: '₹4,200',
      originalPrice: '₹5,000',
      video: ringVideo2,
      category: 'rings',
      subcategory: 'men-rings',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Premium diamond ring with elegant finish for special occasions'
    },
    {
      id: 3,
      name: 'Designer Ring Collection',
      price: '₹2,800',
      originalPrice: '₹3,500',
      video: ringVideo3,
      category: 'rings',
      subcategory: 'men-rings',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Designer ring with clean lines and contemporary appeal'
    },
    // {
    //   id: 4,
    //   name: 'Silver Signet Ring',
    //   price: '₹5,100',
    //   originalPrice: '₹6,200',
    //   image: men4,
    //   category: 'rings',
    //   subcategory: 'men-rings',
    //   size: 'Multiple Sizes',
    //   material: '925 Sterling Silver',
    //   description: 'Traditional signet ring with bold presence and timeless style'
    // },
    // {
    //   id: 6,
    //   name: 'Silver Band',
    //   price: '₹3,200',
    //   originalPrice: '₹4,000',
    //   image: men6,
    //   category: 'rings',
    //   subcategory: 'men-rings',
    //   size: 'Multiple Sizes',
    //   material: '925 Sterling Silver',
    //   description: 'Simple silver band with polished finish for understated elegance'
    // },
    // {
    //   id: 7,
    //   name: 'Silver Wedding Ring',
    //   price: '₹4,500',
    //   originalPrice: '₹5,500',
    //   image: men7,
    //   category: 'rings',
    //   subcategory: 'men-rings',
    //   size: 'Multiple Sizes',
    //   material: '925 Sterling Silver',
    //   description: 'Elegant wedding ring with timeless design and premium finish'
    // },
    // {
    //   id: 9,
    //   name: 'Silver Designer Ring',
    //   price: '₹5,500',
    //   originalPrice: '₹6,800',
    //   image: men9,
    //   category: 'rings',
    //   subcategory: 'men-rings',
    //   size: 'Multiple Sizes',
    //   material: '925 Sterling Silver',
    //   description: 'Contemporary designer ring with unique pattern and modern styling'
    // }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Men's Rings Collection...</p>
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
          <h1 className="page-title">RINGS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/mens-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/mens-collection/chains" className="category-filter-btn">
            CHAINS
          </Link>
          <Link to="/mens-collection/bracelets" className="category-filter-btn">
            BRACELETS
          </Link>
          <Link to="/mens-collection/rings" className="category-filter-btn active">
            RINGS
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {ringsProducts.map(product => (
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

export default MenRingsCollection;
