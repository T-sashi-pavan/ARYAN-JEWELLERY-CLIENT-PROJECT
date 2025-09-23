import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import bridal nose ring images
import bridal7 from '../ASSETS/bridalCollections/bridal7.jpg';
import bridal4 from '../ASSETS/bridalCollections/bridal4.jpg';
import bridal8 from '../ASSETS/bridalCollections/bridal8.jpg';

const BridalNoseRingsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bridalNoseRingsProducts, setBridalNoseRingsProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBridalNoseRingsProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/public/products?category=bridal&subcategory=nose-rings');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
            const formattedProducts = data.data.map(product => ({
              id: product._id || product.id,
              name: product.name,
              image: product.image || (product.images && product.images.length > 0 ? product.images[0] : staticBridalNoseRingsProducts[0]?.image),
              price: product.price,
              offer: product.offer || '',
              size: product.size || '',
              material: product.material || product.composition || '',
              description: product.description || '',
              category: product.category,
              subcategory: product.subcategory
            }));
            setBridalNoseRingsProducts(formattedProducts);
          } else {
            setBridalNoseRingsProducts(staticBridalNoseRingsProducts);
          }
        } else {
          console.warn('API response not ok, using static data');
          setBridalNoseRingsProducts(staticBridalNoseRingsProducts);
        }
      } catch (error) {
        console.error('Error fetching bridal nose rings products:', error);
        setError('Failed to load products');
        setBridalNoseRingsProducts(staticBridalNoseRingsProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBridalNoseRingsProducts();
  }, []);

  // Static fallback data
  const staticBridalNoseRingsProducts = [
    {
      id: 1,
      name: 'Royal Bridal Nose Ring',
      image: bridal7,
      price: 8500,
      offer: '15% OFF',
      size: 'Adjustable',
      material: '925 Sterling Silver with Kundan',
      description: 'Elegant bridal nose ring with traditional Kundan work and chain',
      category: 'bridal',
      subcategory: 'noserings'
    },
    {
      id: 2,
      name: 'Heritage Nose Pin Set',
      image: bridal4,
      price: 12000,
      offer: '12% OFF',
      size: 'Set of 3 Pieces',
      material: '925 Sterling Silver with Antique Finish',
      description: 'Traditional heritage nose pin set with different designs for various occasions',
      category: 'bridal',
      subcategory: 'noserings'
    },
    {
      id: 3,
      name: 'Temple Bridal Nose Ring',
      image: bridal8,
      price: 10000,
      offer: '18% OFF',
      size: 'Medium Size',
      material: '925 Sterling Silver with Temple Work',
      description: 'Exquisite temple work nose ring perfect for the traditional bride',
      category: 'bridal',
      subcategory: 'noserings'
    }
  ];

  if (isLoading) {
    return (
      <div className="bridal-collection-page">
        <div className="container">
          <div className="loading-message">Loading bridal nose rings collection...</div>
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
          <h1 className="page-title">BRIDAL NOSE RINGS</h1>
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
            <Link to="/bridal-collection/chains" className="filter-btn">
              CHAINS
            </Link>
            <Link to="/bridal-collection/payal" className="filter-btn">
              PAYALS
            </Link>
            <Link to="/bridal-collection/nose-rings" className="filter-btn active">
              NOSE RINGS
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {bridalNoseRingsProducts.map((product, index) => (
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
                    e.target.src = bridal7; // Fallback image
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

export default BridalNoseRingsCollection;