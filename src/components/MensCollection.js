import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MensCollection.css';



// Import bracelet videos
import braceletVideo1 from '../ASSETS/menCollections/mens braceletes/Cinematic_Bracelet_Advertisement_Video.mp4';
import braceletVideo2 from '../ASSETS/menCollections/mens braceletes/Cinematic_Silver_Bracelet_Video_Generation.mp4';
import braceletVideo3 from '../ASSETS/menCollections/mens braceletes/Jewelry_Showcase_Video_Generation (2).mp4';
import braceletVideo4 from '../ASSETS/menCollections/mens braceletes/Jewelry_Showcase_Video_Generation (3).mp4';
import braceletVideo5 from '../ASSETS/menCollections/mens braceletes/Jewelry_Showcase_Video_Generation (6).mp4';
import braceletVideo6 from '../ASSETS/menCollections/mens braceletes/Jewelry_Showcase_Video_Generation (7).mp4';
import braceletVideo7 from '../ASSETS/menCollections/mens braceletes/Jewelry_Video_Generation_Showcase.mp4';

// Import chain videos
import chainVideo1 from '../ASSETS/menCollections/mens_chains/Cinematic_Silver_Necklace_Video_Generation.mp4';
import chainVideo2 from '../ASSETS/menCollections/mens_chains/Jewelry_Showcase_Video_Generation.mp4';
import chainVideo3 from '../ASSETS/menCollections/mens_chains/Luxury_Necklace_Video_Generation.mp4';
import chainVideo4 from '../ASSETS/menCollections/mens_chains/Realistic_D_Necklace_Showcase_Video (3).mp4';
import chainVideo5 from '../ASSETS/menCollections/mens_chains/Realistic_D_Necklace_Showcase_Video.mp4';
import chainVideo6 from '../ASSETS/menCollections/mens_chains/Realistic_Necklace_Video_Generation.mp4';
import chainVideo7 from '../ASSETS/menCollections/mens_chains/Realistic_Silver_Necklace_D_Showcase.mp4';

// Import ring videos
import ringVideo1 from '../ASSETS/menCollections/mens_rings/Realistic_Diamond_Ring_D_Showcase.mp4';
import ringVideo2 from '../ASSETS/menCollections/mens_rings/Realistic_Diamond_Ring_Video_Showcase.mp4';
import ringVideo3 from '../ASSETS/menCollections/mens_rings/Realistic_D_Ring_Video_Generation.mp4';

const MensCollection = () => {
  const [visibleItems, setVisibleItems] = useState(16);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const mensItems = [
    {
      id: 1,
      name: 'Diamond Ring Showcase',
      video: ringVideo1,
      price: '₹3,500',
      originalPrice: '₹4,200',
      category: 'men',
      type: 'ring',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Diamond ring showcase with modern design perfect for everyday wear'
    },
    {
      id: 2,
      name: 'Premium Diamond Ring',
      video: ringVideo2,
      price: '₹4,200',
      originalPrice: '₹5,000',
      category: 'men',
      type: 'ring',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Premium diamond ring with elegant finish for special occasions'
    },
    {
      id: 3,
      name: 'Designer Ring Collection',
      video: ringVideo3,
      price: '₹2,800',
      originalPrice: '₹3,500',
      category: 'men',
      type: 'ring',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Designer ring with clean lines and contemporary appeal'
    },
    // {
    //   id: 4,
    //   name: 'Silver Signet Ring',
    //   image: men4,
    //   price: '₹5,100',
    //   originalPrice: '₹6,200',
    //   category: 'men',
    //   type: 'ring',
    //   size: 'Multiple Sizes',
    //   material: '925 Sterling Silver',
    //   description: 'Traditional signet ring with bold presence and timeless style'
    // },
    {
      id: 5,
      name: 'Cinematic Silver Bracelet',
      video: braceletVideo1,
      price: '₹6,800',
      originalPrice: '₹8,000',
      category: 'men',
      type: 'bracelet',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Robust chain bracelet with masculine appeal and durable construction'
    },
    {
      id: 6,
      name: 'Premium Chain Bracelet',
      video: braceletVideo2,
      price: '₹7,500',
      originalPrice: '₹9,000',
      category: 'men',
      type: 'bracelet',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Premium silver bracelet with sophisticated chain design'
    },
    {
      id: 7,
      name: 'Designer Bracelet Collection',
      video: braceletVideo3,
      price: '₹8,200',
      originalPrice: '₹10,000',
      category: 'men',
      type: 'bracelet',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Designer bracelet with intricate patterns and modern appeal'
    },
    {
      id: 8,
      name: 'Luxury Silver Bracelet',
      video: braceletVideo4,
      price: '₹9,500',
      originalPrice: '₹11,500',
      category: 'men',
      type: 'bracelet',
      size: 'Adjustable',
      material: '925 Sterling Silver with Premium Finish',
      description: 'Luxury bracelet with exceptional craftsmanship and elegant design'
    },
    {
      id: 9,
      name: 'Executive Bracelet Style',
      video: braceletVideo5,
      price: '₹7,800',
      originalPrice: '₹9,200',
      category: 'men',
      type: 'bracelet',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Executive style bracelet perfect for professional and casual wear'
    },
    {
      id: 10,
      name: 'Modern Chain Bracelet',
      video: braceletVideo6,
      price: '₹6,500',
      originalPrice: '₹8,000',
      category: 'men',
      type: 'bracelet',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Modern chain bracelet with contemporary design elements'
    },
    {
      id: 11,
      name: 'Showcase Bracelet Design',
      video: braceletVideo7,
      price: '₹8,800',
      originalPrice: '₹10,500',
      category: 'men',
      type: 'bracelet',
      size: 'Adjustable',
      material: '925 Sterling Silver with Special Finish',
      description: 'Showcase design bracelet with unique styling and premium quality'
    },
    // {
    //   id: 12,
    //   name: 'Silver Band',
    //   image: men6,
    //   price: '₹3,200',
    //   originalPrice: '₹4,000',
    //   category: 'men',
    //   type: 'ring',
    //   size: 'Multiple Sizes',
    //   material: '925 Sterling Silver',
    //   description: 'Simple silver band with polished finish for understated elegance'
    // },
    // {
    //   id: 13,
    //   name: 'Silver Wedding Ring',
    //   image: men7,
    //   price: '₹4,500',
    //   originalPrice: '₹5,500',
    //   category: 'men',
    //   type: 'ring',
    //   size: 'Multiple Sizes',
    //   material: '925 Sterling Silver',
    //   description: 'Elegant wedding ring with timeless design and premium finish'
    // },
    {
      id: 14,
      name: 'Cinematic Silver Chain',
      video: chainVideo1,
      price: '₹7,200',
      originalPrice: '₹8,800',
      category: 'men',
      type: 'chain',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Cinematic silver chain with sophisticated design and premium craftsmanship'
    },
    {
      id: 16,
      name: 'Jewelry Showcase Chain',
      video: chainVideo2,
      price: '₹8,500',
      originalPrice: '₹10,200',
      category: 'men',
      type: 'chain',
      size: '22 inch',
      material: '925 Sterling Silver',
      description: 'Showcase chain design with elegant presentation and modern appeal'
    },
    {
      id: 17,
      name: 'Luxury Silver Necklace',
      video: chainVideo3,
      price: '₹9,800',
      originalPrice: '₹11,500',
      category: 'men',
      type: 'chain',
      size: '24 inch',
      material: '925 Sterling Silver with Luxury Finish',
      description: 'Luxury necklace with exceptional quality and sophisticated styling'
    },
    {
      id: 18,
      name: 'Realistic Chain Showcase',
      video: chainVideo4,
      price: '₹7,800',
      originalPrice: '₹9,200',
      category: 'men',
      type: 'chain',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Realistic 3D chain showcase with detailed craftsmanship and modern design'
    },
    {
      id: 19,
      name: 'Premium Chain Collection',
      video: chainVideo5,
      price: '₹8,200',
      originalPrice: '₹9,800',
      category: 'men',
      type: 'chain',
      size: '22 inch',
      material: '925 Sterling Silver',
      description: 'Premium chain collection with superior quality and timeless appeal'
    },
    {
      id: 20,
      name: 'Realistic Necklace Design',
      video: chainVideo6,
      price: '₹7,500',
      originalPrice: '₹8,900',
      category: 'men',
      type: 'chain',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Realistic necklace design with contemporary styling and durable construction'
    },
    {
      id: 21,
      name: 'Silver Necklace Showcase',
      video: chainVideo7,
      price: '₹9,200',
      originalPrice: '₹10,800',
      category: 'men',
      type: 'chain',
      size: '24 inch',
      material: '925 Sterling Silver with Special Finish',
      description: 'Silver necklace showcase featuring premium materials and elegant design'
    },
    // {
    //   id: 15,
    //   name: 'Silver Designer Ring',
    //   image: men9,
    //   price: '₹5,500',
    //   originalPrice: '₹6,800',
    //   category: 'men',
    //   type: 'ring',
    //   size: 'Multiple Sizes',
    //   material: '925 Sterling Silver with Design Elements',
    //   description: 'Designer ring with intricate patterns and modern aesthetic appeal'
    // }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 4, mensItems.length));
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Men's Collection...</p>
      </div>
    );
  }

  return (
    <div className="mens-collection-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="back-arrow">←</span>
          </Link>
          <h1 className="page-title">MEN COLLECTION PAGE</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/mens-collection" className="category-filter-btn active">
            ALL
          </Link>
          <Link to="/mens-collection/chains" className="category-filter-btn">
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
          {mensItems.slice(0, visibleItems).map((item, index) => (
            <Link 
              to={`/product/${item.id}`} 
              key={item.id} 
              state={{ product: item }}
              className="product-card"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="product-image">
                {item.video ? (
                  <video
                    src={item.video}
                    alt={item.name}
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
                  <img src={item.image} alt={item.name} />
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{item.name}</h3>
                <div className="product-price">
                  <span className="current-price">{item.price}</span>
                  {item.originalPrice && (
                    <span className="original-price">{item.originalPrice}</span>
                  )}
                </div>
                <div className="product-details">
                  <span className="product-size">{item.size}</span>
                  <span className="product-material">{item.material}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {visibleItems < mensItems.length && (
          <div className="load-more-section">
            <button className="load-more-btn" onClick={loadMore}>
              Load More Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MensCollection;
