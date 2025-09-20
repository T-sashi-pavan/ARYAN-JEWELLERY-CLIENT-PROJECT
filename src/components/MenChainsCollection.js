import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import chain videos
import chainVideo1 from '../ASSETS/menCollections/mens_chains/Cinematic_Silver_Necklace_Video_Generation.mp4';
import chainVideo2 from '../ASSETS/menCollections/mens_chains/Jewelry_Showcase_Video_Generation.mp4';
import chainVideo3 from '../ASSETS/menCollections/mens_chains/Luxury_Necklace_Video_Generation.mp4';
import chainVideo4 from '../ASSETS/menCollections/mens_chains/Realistic_D_Necklace_Showcase_Video (3).mp4';
import chainVideo5 from '../ASSETS/menCollections/mens_chains/Realistic_D_Necklace_Showcase_Video.mp4';
import chainVideo6 from '../ASSETS/menCollections/mens_chains/Realistic_Necklace_Video_Generation.mp4';
import chainVideo7 from '../ASSETS/menCollections/mens_chains/Realistic_Silver_Necklace_D_Showcase.mp4';

const MenChainsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const chainsProducts = [
    {
      id: 8,
      name: 'Cinematic Silver Chain',
      price: '₹7,200',
      originalPrice: '₹8,800',
      video: chainVideo1,
      category: 'chains',
      subcategory: 'men-chains',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Cinematic silver chain with sophisticated design and premium craftsmanship'
    },
    {
      id: 801,
      name: 'Jewelry Showcase Chain',
      price: '₹8,500',
      originalPrice: '₹10,200',
      video: chainVideo2,
      category: 'chains',
      subcategory: 'men-chains',
      size: '22 inch',
      material: '925 Sterling Silver',
      description: 'Showcase chain design with elegant presentation and modern appeal'
    },
    {
      id: 802,
      name: 'Luxury Silver Necklace',
      price: '₹9,800',
      originalPrice: '₹11,500',
      video: chainVideo3,
      category: 'chains',
      subcategory: 'men-chains',
      size: '24 inch',
      material: '925 Sterling Silver with Luxury Finish',
      description: 'Luxury necklace with exceptional quality and sophisticated styling'
    },
    {
      id: 803,
      name: 'Realistic Chain Showcase',
      price: '₹7,800',
      originalPrice: '₹9,200',
      video: chainVideo4,
      category: 'chains',
      subcategory: 'men-chains',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Realistic 3D chain showcase with detailed craftsmanship and modern design'
    },
    {
      id: 804,
      name: 'Premium Chain Collection',
      price: '₹8,200',
      originalPrice: '₹9,800',
      video: chainVideo5,
      category: 'chains',
      subcategory: 'men-chains',
      size: '22 inch',
      material: '925 Sterling Silver',
      description: 'Premium chain collection with superior quality and timeless appeal'
    },
    {
      id: 805,
      name: 'Realistic Necklace Design',
      price: '₹7,500',
      originalPrice: '₹8,900',
      video: chainVideo6,
      category: 'chains',
      subcategory: 'men-chains',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Realistic necklace design with contemporary styling and durable construction'
    },
    {
      id: 806,
      name: 'Silver Necklace Showcase',
      price: '₹9,200',
      originalPrice: '₹10,800',
      video: chainVideo7,
      category: 'chains',
      subcategory: 'men-chains',
      size: '24 inch',
      material: '925 Sterling Silver with Special Finish',
      description: 'Silver necklace showcase featuring premium materials and elegant design'
    }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Men's Chains Collection...</p>
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
          <h1 className="page-title">CHAINS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/mens-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/mens-collection/chains" className="category-filter-btn active">
            CHAINS
          </Link>
          <Link to="/mens-collection/bracelets" className="category-filter-btn">
            BRACELETS
          </Link>
          <Link to="/mens-collection/rings" className="category-filter-btn">
            RINGS
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

export default MenChainsCollection;
