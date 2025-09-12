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
      price: '₹2,500',
      originalPrice: '₹3,000',
      image: women1,
      category: 'women',
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
      name: 'Traditional Bangles',
      price: '₹4,100',
      originalPrice: '₹4,800',
      image: women4,
      category: 'women',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Traditional silver bangles with beautiful patterns and designs'
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
      name: 'Silver Chain',
      price: '₹2,900',
      originalPrice: '₹3,400',
      image: women8,
      category: 'women',
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
                <img src={product.image} alt={product.name} />
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
