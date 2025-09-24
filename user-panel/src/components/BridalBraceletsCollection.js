import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import bridal bracelet images
import bridal3 from '../ASSETS/bridalCollections/bridal3.jpg';
import bridal6 from '../ASSETS/bridalCollections/bridal6.jpg';
import bridal9 from '../ASSETS/bridalCollections/bridal9.jpg';

const BridalBraceletsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bridalBraceletsProducts, setBridalBraceletsProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBridalBraceletsProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/public/products?category=bridal&subcategory=bracelets');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
            const formattedProducts = data.data.map(product => ({
              id: product._id || product.id,
              name: product.name,
              image: product.image || (product.images && product.images.length > 0 ? product.images[0] : staticBridalBraceletsProducts[0]?.image),
              price: product.price,
              offer: product.offer || '',
              size: product.size || '',
              material: product.material || product.composition || '',
              description: product.description || '',
              category: product.category,
              subcategory: product.subcategory
            }));
            setBridalBraceletsProducts(formattedProducts);
          } else {
            setBridalBraceletsProducts(staticBridalBraceletsProducts);
          }
        } else {
          console.warn('API response not ok, using static data');
          setBridalBraceletsProducts(staticBridalBraceletsProducts);
        }
      } catch (error) {
        console.error('Error fetching bridal bracelets products:', error);
        setError('Failed to load products');
        setBridalBraceletsProducts(staticBridalBraceletsProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBridalBraceletsProducts();
  }, []);

  // Static fallback data
  const staticBridalBraceletsProducts = [
    {
      id: 1,
      name: 'Bridal Kundan Bracelet Set',
      image: bridal3,
      price: 18000,
      offer: '15% OFF',
      size: 'Set of 2 Bracelets',
      material: '925 Sterling Silver with Kundan',
      description: 'Beautiful bridal bracelet set with traditional Kundan work',
      category: 'bridal',
      subcategory: 'bracelets'
    },
    {
      id: 2,
      name: 'Royal Bridal Kada',
      image: bridal6,
      price: 25000,
      offer: '12% OFF',
      size: 'Adjustable Kada',
      material: '925 Sterling Silver with Antique Finish',
      description: 'Heavy bridal kada with intricate carving and royal design',
      category: 'bridal',
      subcategory: 'bracelets'
    },
    {
      id: 3,
      name: 'Temple Bridal Bracelet',
      image: bridal9,
      price: 22000,
      offer: '18% OFF',
      size: 'Medium Size',
      material: '925 Sterling Silver with Temple Work',
      description: 'Elegant temple work bridal bracelet with traditional motifs',
      category: 'bridal',
      subcategory: 'bracelets'
    }
  ];

  if (isLoading) {
    return (
      <div className="bridal-collection-page">
        <div className="container">
          <div className="loading-message">Loading bridal bracelets collection...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bridal-collection-page">
        <div className="container">
          <div className="error-message">Error: {error}</div>
        </div>
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
          <Link to="/bridal-collection" className="breadcrumb-link">Bridal Collection</Link>
          <span className="breadcrumb-separator">|</span>
          <h1 className="page-title">BRIDAL BRACELETS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filter-nav">
          <div className="filter-buttons">
            <Link to="/bridal-collection" className="filter-btn">
              ALL
            </Link>
            <Link to="/bridal-collection/necklace" className="filter-btn">
              NECKLACES
            </Link>
            <Link to="/bridal-collection/bracelets" className="filter-btn active">
              BRACELETS
            </Link>
            <Link to="/bridal-collection/chains" className="filter-btn">
              CHAINS
            </Link>
            <Link to="/bridal-collection/payal" className="filter-btn">
              PAYALS
            </Link>
            <Link to="/bridal-collection/nose-rings" className="filter-btn">
              NOSE RINGS
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {bridalBraceletsProducts.map((product, index) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              state={{ product: product }}
              className="product-card"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="product-image">
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = bridal3; // Fallback image
                  }}
                />
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
                  <span className="current-price">₹{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}</span>
                  {product.offer && (
                    <span className="offer-badge">{product.offer}</span>
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

export default BridalBraceletsCollection;