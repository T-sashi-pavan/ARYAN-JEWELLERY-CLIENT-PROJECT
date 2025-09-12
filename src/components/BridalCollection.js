import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import bridal collection images
import bridal1 from '../ASSETS/bridalCollections/bridal1.jpg';
import bridal2 from '../ASSETS/bridalCollections/bridal2.jpg';
import bridal3 from '../ASSETS/bridalCollections/bridal3.jpg';
import bridal4 from '../ASSETS/bridalCollections/bridal4.jpg';
import bridal6 from '../ASSETS/bridalCollections/bridal6.jpg';
import bridal7 from '../ASSETS/bridalCollections/bridal7.jpg';
import bridal8 from '../ASSETS/bridalCollections/bridal8.jpg';
import bridal9 from '../ASSETS/bridalCollections/bridal9.jpg';

const BridalCollection = () => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const bridalProducts = [
    {
      id: 1,
      name: 'Royal Bridal Necklace Set',
      price: '₹25,000',
      originalPrice: '₹30,000',
      image: bridal1,
      category: 'bridal',
      size: 'Complete Set',
      material: '925 Sterling Silver with Gemstones',
      description: 'Exquisite bridal necklace with matching earrings perfect for your special day'
    },
    {
      id: 2,
      name: 'Traditional Choker Set',
      price: '₹18,500',
      originalPrice: '₹22,000',
      image: bridal2,
      category: 'bridal',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Classic choker design with traditional motifs and intricate craftsmanship'
    },
    {
      id: 3,
      name: 'Pearl Bridal Collection',
      price: '₹35,000',
      originalPrice: '₹40,000',
      image: bridal4,
      category: 'bridal',
      size: 'Complete Set',
      material: '925 Sterling Silver with Natural Pearls',
      description: 'Elegant pearl jewelry set for modern brides with timeless appeal'
    },
    {
      id: 4,
      name: 'Diamond Cut Bridal Set',
      price: '₹45,000',
      originalPrice: '₹50,000',
      image: bridal3,
      category: 'bridal',
      size: 'Complete Set',
      material: '925 Sterling Silver with CZ Diamonds',
      description: 'Sparkling diamond cut silver bridal collection with brilliant shine'
    },
    {
      id: 5,
      name: 'Antique Bridal Jewelry',
      price: '₹28,000',
      originalPrice: '₹32,000',
      image: bridal7,
      category: 'bridal',
      size: 'Complete Set',
      material: '925 Sterling Silver with Antique Finish',
      description: 'Vintage inspired bridal jewelry collection with heritage design'
    },
    {
      id: 6,
      name: 'Temple Bridal Set',
      price: '₹22,000',
      originalPrice: '₹26,000',
      image: bridal8,
      category: 'bridal',
      size: 'Complete Set',
      material: '925 Sterling Silver with Temple Work',
      description: 'Traditional temple jewelry for sacred ceremonies and special occasions'
    },
    {
      id: 7,
      name: 'Kundan Bridal Collection',
      price: '₹38,000',
      originalPrice: '₹42,000',
      image: bridal6,
      category: 'bridal',
      size: 'Complete Set',
      material: '925 Sterling Silver with Kundan Work',
      description: 'Luxurious kundan work bridal jewelry set with royal elegance'
    },
    {
      id: 8,
      name: 'Contemporary Bridal Set',
      price: '₹32,000',
      originalPrice: '₹36,000',
      image: bridal9,
      category: 'bridal',
      size: 'Complete Set',
      material: '925 Sterling Silver with Modern Design',
      description: 'Modern design bridal jewelry for today\'s bride with contemporary elegance'
    }
  ];

  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 4, bridalProducts.length));
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Bridal Collection...</p>
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
          <h1 className="page-title">BRIDAL COLLECTION</h1>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {bridalProducts.slice(0, visibleItems).map((product, index) => (
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
        {visibleItems < bridalProducts.length && (
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

export default BridalCollection;
