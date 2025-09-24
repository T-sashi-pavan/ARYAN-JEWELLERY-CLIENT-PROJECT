import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import bridal chain images
import bridal2 from '../ASSETS/bridalCollections/bridal2.jpg';
import bridal8 from '../ASSETS/bridalCollections/bridal8.jpg';
import bridal1 from '../ASSETS/bridalCollections/bridal1.jpg';

const BridalChainsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bridalChainsProducts, setBridalChainsProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBridalChainsProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/public/products?category=bridal&subcategory=chains');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
            const formattedProducts = data.data.map(product => ({
              id: product._id || product.id,
              name: product.name,
              image: product.image || (product.images && product.images.length > 0 ? product.images[0] : staticBridalChainsProducts[0]?.image),
              price: product.price,
              offer: product.offer || '',
              size: product.size || '',
              material: product.material || product.composition || '',
              description: product.description || '',
              category: product.category,
              subcategory: product.subcategory
            }));
            setBridalChainsProducts(formattedProducts);
          } else {
            setBridalChainsProducts(staticBridalChainsProducts);
          }
        } else {
          console.warn('API response not ok, using static data');
          setBridalChainsProducts(staticBridalChainsProducts);
        }
      } catch (error) {
        console.error('Error fetching bridal chains products:', error);
        setError('Failed to load products');
        setBridalChainsProducts(staticBridalChainsProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBridalChainsProducts();
  }, []);

  // Static fallback data
  const staticBridalChainsProducts = [
    {
      id: 1,
      name: 'Bridal Heritage Chain',
      image: bridal2,
      price: 15000,
      offer: '15% OFF',
      size: '20 inches',
      material: '925 Sterling Silver with Antique Finish',
      description: 'Traditional heritage chain perfect for layering with bridal necklaces',
      category: 'bridal',
      subcategory: 'chains'
    },
    {
      id: 2,
      name: 'Temple Work Chain',
      image: bridal8,
      price: 12000,
      offer: '12% OFF',
      size: '18 inches',
      material: '925 Sterling Silver with Temple Design',
      description: 'Elegant temple work chain with traditional motifs and secure clasp',
      category: 'bridal',
      subcategory: 'chains'
    },
    {
      id: 3,
      name: 'Royal Bridal Chain Set',
      image: bridal1,
      price: 20000,
      offer: '18% OFF',
      size: 'Set of 2 Chains',
      material: '925 Sterling Silver with Kundan',
      description: 'Complete bridal chain set with different lengths for perfect layering',
      category: 'bridal',
      subcategory: 'chains'
    }
  ];

  if (isLoading) {
    return (
      <div className="bridal-collection-page">
        <div className="container">
          <div className="loading-message">Loading bridal chains collection...</div>
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
          <h1 className="page-title">BRIDAL CHAINS</h1>
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
            <Link to="/bridal-collection/bracelets" className="filter-btn">
              BRACELETS
            </Link>
            <Link to="/bridal-collection/chains" className="filter-btn active">
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
          {bridalChainsProducts.map((product, index) => (
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
                    e.target.src = bridal2; // Fallback image
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

export default BridalChainsCollection;