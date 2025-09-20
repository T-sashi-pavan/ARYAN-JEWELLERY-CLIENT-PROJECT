import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './WomenCollection.css';

// Import women collection images  
import women1 from '../ASSETS/womenCollections/women1.jpg';
import women2 from '../ASSETS/womenCollections/women2.jpg';
import women3 from '../ASSETS/womenCollections/women3.jpg';
import women4 from '../ASSETS/womenCollections/women4.jpg';
import women5 from '../ASSETS/womenCollections/women5.jpg';
import women6 from '../ASSETS/womenCollections/women6.jpg';
import women7 from '../ASSETS/womenCollections/women7.jpg';
import women8 from '../ASSETS/womenCollections/women8.jpg';
import women9 from '../ASSETS/womenCollections/women9.jpg';

// Import women bracelets videos
import braceletVideo1 from '../ASSETS/womenCollections/womens braceletes/Bracelet_Video_Generation.mp4';
import braceletVideo2 from '../ASSETS/womenCollections/womens braceletes/Golden_Bracelet_D_Video_Showcase.mp4';
import braceletVideo3 from '../ASSETS/womenCollections/womens braceletes/Jewelry_Showcase_Video_Generation (4).mp4';
import braceletVideo4 from '../ASSETS/womenCollections/womens braceletes/Jewelry_Showcase_Video_Generation (5).mp4';
import braceletVideo5 from '../ASSETS/womenCollections/womens braceletes/Jewelry_Showcase_Video_Generation.mp4';
import braceletVideo6 from '../ASSETS/womenCollections/womens braceletes/Jewelry_Video_Generation.mp4';

// Import women chains videos
import chainVideo1 from '../ASSETS/womenCollections/womens_chains/Jewelry_Showcase_Video_Gen_Chain.mp4';
import chainVideo2 from '../ASSETS/womenCollections/womens_chains/Luxury_Jewelry_Showcase_Video_Generated.mp4';
import chainVideo3 from '../ASSETS/womenCollections/womens_chains/Realistic_D_Necklace_Showcase_Video (2).mp4';
import chainVideo4 from '../ASSETS/womenCollections/womens_chains/Realistic_Silver_Necklace_D_Showcase.mp4';

// Import women rings videos
import ringVideo1 from '../ASSETS/womenCollections/women_rings/Elegant_Floral_Ring_Video_Generation.mp4';
import ringVideo2 from '../ASSETS/womenCollections/women_rings/gold ring.mp4';
import ringVideo3 from '../ASSETS/womenCollections/women_rings/Realistic_D_Ring_Video_Generation.mp4';

const WomenCollection = () => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const womenProducts = [
    {
      id: 1,
      name: 'Elegant Silver Ring',
      video: ringVideo1,
      image: women1,
      price: '₹2,500',
      originalPrice: '₹3,000',
      category: 'women',
      subcategory: 'women-rings',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Beautiful silver ring with intricate design perfect for everyday wear'
    },
    {
      id: 2,
      name: 'Pearl Studded Earrings',
      price: '₹3,200',
      originalPrice: '₹3,800',
      image: women2,
      category: 'women',
      size: 'One Size',
      material: '925 Sterling Silver with Pearls',
      description: 'Elegant pearl earrings that add sophistication to any outfit'
    },
    {
      id: 3,
      name: 'Silver Bridal Set',
      price: '₹8,900',
      originalPrice: '₹10,500',
      image: women3,
      category: 'women',
      size: 'Complete Set',
      material: '925 Sterling Silver with Gemstones',
      description: 'Exquisite bridal jewelry set perfect for special occasions'
    },
    {
      id: 4,
      name: 'Traditional Gold Bracelet',
      video: braceletVideo1,
      image: women4,
      price: '₹4,100',
      originalPrice: '₹4,800',
      category: 'women',
      subcategory: 'women-bracelets',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Traditional silver bracelet with beautiful patterns and designs'
    },
    {
      id: 5,
      name: 'Silver Ear Pins',
      price: '₹1,800',
      originalPrice: '₹2,200',
      image: women5,
      category: 'women',
      size: 'One Size',
      material: '925 Sterling Silver',
      description: 'Delicate ear pins with modern design for contemporary women'
    },
    {
      id: 6,
      name: 'Silver Pendant',
      price: '₹3,500',
      originalPrice: '₹4,000',
      image: women6,
      category: 'women',
      size: '18 inch chain',
      material: '925 Sterling Silver',
      description: 'Elegant pendant necklace with unique design and premium finish'
    },
    {
      id: 7,
      name: 'Silver Necklace Set',
      price: '₹5,500',
      originalPrice: '₹6,500',
      image: women7,
      category: 'women',
      size: 'Complete Set',
      material: '925 Sterling Silver',
      description: 'Complete necklace set with matching earrings for special occasions'
    },
    {
      id: 8,
      name: 'Jewelry Chain Showcase',
      video: chainVideo1,
      image: women8,
      price: '₹2,900',
      originalPrice: '₹3,400',
      category: 'women',
      subcategory: 'women-chains',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Classic silver chain perfect for layering or wearing alone'
    },
    {
      id: 9,
      name: 'Designer Anklets',
      price: '₹2,200',
      originalPrice: '₹2,700',
      image: women9,
      category: 'women',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Beautiful anklets with traditional charm and modern appeal'
    },
    {
      id: 301,
      name: 'Golden Bracelet Showcase',
      video: braceletVideo2,
      image: women1,
      price: '₹2,500',
      originalPrice: '₹3,000',
      category: 'women',
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
      category: 'women',
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
      category: 'women',
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
      category: 'women',
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
      category: 'women',
      subcategory: 'women-bracelets',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver with Gold Accents',
      description: 'Premium bracelet with innovative design and superior craftsmanship'
    },
    {
      id: 401,
      name: 'Luxury Chain Collection',
      video: chainVideo2,
      image: women2,
      price: '₹3,200',
      originalPrice: '₹3,800',
      category: 'women',
      subcategory: 'women-chains',
      size: '18 inch',
      material: '925 Sterling Silver',
      description: 'Luxury chain with elegant design perfect for special occasions'
    },
    {
      id: 402,
      name: 'Realistic Necklace Design',
      video: chainVideo3,
      image: women4,
      price: '₹4,100',
      originalPrice: '₹4,800',
      category: 'women',
      subcategory: 'women-chains',
      size: '22 inch',
      material: '925 Sterling Silver',
      description: 'Realistic necklace design with contemporary appeal and premium finish'
    },
    {
      id: 403,
      name: 'Silver Necklace Premium',
      video: chainVideo4,
      image: women8,
      price: '₹5,200',
      originalPrice: '₹6,000',
      category: 'women',
      subcategory: 'women-chains',
      size: '20 inch',
      material: '925 Sterling Silver with Premium Finish',
      description: 'Premium silver necklace with superior craftsmanship and luxury appeal'
    },
    {
      id: 501,
      name: 'Golden Ring Collection',
      video: ringVideo2,
      image: women2,
      price: '₹3,500',
      originalPrice: '₹4,200',
      category: 'women',
      subcategory: 'women-rings',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver with Gold Plating',
      description: 'Beautiful golden ring with premium plating and elegant design'
    },
    {
      id: 502,
      name: 'Realistic Ring Design',
      video: ringVideo3,
      image: women4,
      price: '₹4,200',
      originalPrice: '₹5,000',
      category: 'women',
      subcategory: 'women-rings',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Realistic ring design with intricate details and modern styling'
    }
  ];

  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 4, womenProducts.length));
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Women Collection...</p>
      </div>
    );
  }

  return (
    <div className="women-collection-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <span className="back-arrow">←</span>
          </Link>
          <h1 className="page-title">WOMEN COLLECTION</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/women-collection" className="category-filter-btn active">
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
          {womenProducts.slice(0, visibleItems).map((product, index) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              state={{ product: product }}
              className="product-card"
              style={{animationDelay: `${index * 0.1}s`}}
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
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {visibleItems < womenProducts.length && (
          <div className="load-more-section">
            <button className="load-more-btn" onClick={loadMore}>
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WomenCollection;
