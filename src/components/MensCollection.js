import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MensCollection.css';

// Import men collection images
import men1 from '../ASSETS/menCollections/men1.webp';
import men2 from '../ASSETS/menCollections/men2.jpg';
import men3 from '../ASSETS/menCollections/men3.jpg';
import men4 from '../ASSETS/menCollections/men4.jpg';
import men5 from '../ASSETS/menCollections/men5.jpg';
import men6 from '../ASSETS/menCollections/men6.jpg';
import men7 from '../ASSETS/menCollections/men7.jpg';
import men8 from '../ASSETS/menCollections/men8.jpg';
import men9 from '../ASSETS/menCollections/men9.jpg';

const MensCollection = () => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [mensItems, setMensItems] = useState([]);
  const [error, setError] = useState(null);

  // Static fallback data
  const staticMensItems = [
    {
      id: 1,
      name: 'Silver Ring',
      image: men1,
      price: '₹3,500',
      originalPrice: '₹4,200',
      category: 'men',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Classic silver ring with modern design perfect for everyday wear'
    },
    {
      id: 2,
      name: 'Silver Ring SG',
      image: men2,
      price: '₹4,200',
      originalPrice: '₹5,000',
      category: 'men',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Sophisticated silver ring with elegant finish for special occasions'
    },
    {
      id: 3,
      name: 'Silver Band Ring',
      image: men3,
      price: '₹2,800',
      originalPrice: '₹3,500',
      category: 'men',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Minimalist band ring with clean lines and contemporary appeal'
    },
    {
      id: 4,
      name: 'Silver Signet Ring',
      image: men4,
      price: '₹5,100',
      originalPrice: '₹6,200',
      category: 'men',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Traditional signet ring with bold presence and timeless style'
    },
    {
      id: 5,
      name: 'Silver Chain Bracelet',
      image: men5,
      price: '₹6,800',
      originalPrice: '₹8,000',
      category: 'men',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Robust chain bracelet with masculine appeal and durable construction'
    },
    {
      id: 6,
      name: 'Silver Band',
      image: men6,
      price: '₹3,200',
      originalPrice: '₹4,000',
      category: 'men',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Simple silver band with polished finish for understated elegance'
    },
    {
      id: 7,
      name: 'Silver Wedding Ring',
      image: men7,
      price: '₹4,500',
      originalPrice: '₹5,500',
      category: 'men',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Elegant wedding ring with timeless design and premium finish'
    },
    {
      id: 8,
      name: 'Silver Chain',
      image: men8,
      price: '₹7,200',
      originalPrice: '₹8,800',
      category: 'men',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Heavy-duty silver chain with robust links for lasting durability'
    },
    {
      id: 9,
      name: 'Silver Designer Ring',
      image: men9,
      price: '₹5,500',
      originalPrice: '₹6,800',
      category: 'men',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver with Design Elements',
      description: 'Designer ring with intricate patterns and modern aesthetic appeal'
    }
  ];

  useEffect(() => {
    const fetchMensProducts = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching men\'s products from API...');
        
        const response = await fetch('http://localhost:5000/api/public/products?category=men');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response for men\'s products:', data);
        
        if (data.success && data.data && Array.isArray(data.data)) {
          const formattedProducts = data.data.map(product => ({
            id: product.id || product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            originalPrice: product.originalPrice,
            category: product.category,
            subcategory: product.subcategory,
            size: product.size,
            material: product.material,
            description: product.description
          }));
          
          console.log(`Found ${formattedProducts.length} men's products from API`);
          
          // Combine API products with static products
          const allProducts = [...formattedProducts, ...staticMensItems];
          setMensItems(allProducts);
        } else {
          console.log('No men\'s products found in API, using static data');
          setMensItems(staticMensItems);
        }
      } catch (error) {
        console.error('Error fetching men\'s products:', error);
        setError('Failed to load products from server. Showing offline products.');
        setMensItems(staticMensItems);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMensProducts();
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

        {/* Error Message */}
        {error && (
          <div className="error-message" style={{
            background: '#fff3cd',
            border: '1px solid #ffecb5',
            color: '#856404',
            padding: '0.75rem 1.25rem',
            marginBottom: '1rem',
            borderRadius: '0.25rem'
          }}>
            {error}
          </div>
        )}

        {/* Product Count */}
        <div style={{ marginBottom: '1rem', color: '#666' }}>
          Showing {Math.min(visibleItems, mensItems.length)} of {mensItems.length} products
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
                <img src={item.image} alt={item.name} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{item.name}</h3>
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
