import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import women chains videos
import chainVideo1 from '../ASSETS/womenCollections/womens_chains/Jewelry_Showcase_Video_Gen_Chain.mp4';
import chainVideo2 from '../ASSETS/womenCollections/womens_chains/Luxury_Jewelry_Showcase_Video_Generated.mp4';
import chainVideo3 from '../ASSETS/womenCollections/womens_chains/Realistic_D_Necklace_Showcase_Video (2).mp4';
import chainVideo4 from '../ASSETS/womenCollections/womens_chains/Realistic_D_Necklace_Showcase_Video.mp4';
import chainVideo5 from '../ASSETS/womenCollections/womens_chains/Realistic_Necklace_Video_Generation.mp4';
import chainVideo6 from '../ASSETS/womenCollections/womens_chains/Realistic_Necklace_Video_Showcase.mp4';
import chainVideo7 from '../ASSETS/womenCollections/womens_chains/Realistic_Silver_Necklace_D_Showcase.mp4';

// Import fallback images
import women8 from '../ASSETS/womenCollections/women8.jpg';
import women2 from '../ASSETS/womenCollections/women2.jpg';
import women4 from '../ASSETS/womenCollections/women4.jpg';

const WomenChainsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const chainsProducts = [
    {
      id: 8,
      name: 'Jewelry Chain Showcase',
      video: chainVideo1,
      image: women8,
      price: '₹2,900',
      originalPrice: '₹3,400',
      category: 'chains',
      subcategory: 'women-chains',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Classic silver chain perfect for layering or wearing alone'
    },
    {
      id: 201,
      name: 'Luxury Chain Collection',
      video: chainVideo2,
      image: women2,
      price: '₹3,200',
      originalPrice: '₹3,800',
      category: 'chains',
      subcategory: 'women-chains',
      size: '18 inch',
      material: '925 Sterling Silver',
      description: 'Elegant luxury chain perfect for pendants and charms'
    },
    {
      id: 202,
      name: 'Realistic Necklace Design',
      video: chainVideo3,
      image: women4,
      price: '₹4,100',
      originalPrice: '₹4,800',
      category: 'chains',
      subcategory: 'women-chains',
      size: '22 inch',
      material: '925 Sterling Silver',
      description: 'Realistic necklace design that makes a statement with any outfit'
    },
    {
      id: 203,
      name: 'Premium Necklace Showcase',
      video: chainVideo4,
      image: women8,
      price: '₹3,500',
      originalPrice: '₹4,200',
      category: 'chains',
      subcategory: 'women-chains',
      size: '19 inch',
      material: '925 Sterling Silver',
      description: 'Premium necklace with sophisticated design and elegant finish'
    },
    {
      id: 204,
      name: 'Elegant Necklace Generation',
      video: chainVideo5,
      image: women2,
      price: '₹4,500',
      originalPrice: '₹5,200',
      category: 'chains',
      subcategory: 'women-chains',
      size: '21 inch',
      material: '925 Sterling Silver with Gold Accents',
      description: 'Elegant necklace with modern generation design and premium quality'
    },
    {
      id: 205,
      name: 'Realistic Necklace Showcase',
      video: chainVideo6,
      image: women4,
      price: '₹3,800',
      originalPrice: '₹4,500',
      category: 'chains',
      subcategory: 'women-chains',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Realistic necklace showcase with contemporary appeal and timeless beauty'
    },
    {
      id: 206,
      name: 'Silver Necklace Premium',
      video: chainVideo7,
      image: women8,
      price: '₹5,200',
      originalPrice: '₹6,000',
      category: 'chains',
      subcategory: 'women-chains',
      size: '22 inch',
      material: '925 Sterling Silver with Premium Finish',
      description: 'Premium silver necklace with superior craftsmanship and luxury appeal'
    }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Women's Chains Collection...</p>
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
          <h1 className="page-title">CHAINS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/women-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/women-collection/payal" className="category-filter-btn">
            PAYAL
          </Link>
          <Link to="/women-collection/chains" className="category-filter-btn active">
            CHAINS
          </Link>
          <Link to="/women-collection/bracelets" className="category-filter-btn">
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
          {chainsProducts.map(product => (
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

export default WomenChainsCollection;
