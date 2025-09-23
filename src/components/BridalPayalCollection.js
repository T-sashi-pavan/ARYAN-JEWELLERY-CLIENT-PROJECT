import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import bridal payal images
import bridal4 from '../ASSETS/bridalCollections/bridal4.jpg';
import bridal7 from '../ASSETS/bridalCollections/bridal7.jpg';
import bridal1 from '../ASSETS/bridalCollections/bridal1.jpg';

const BridalPayalCollection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bridalPayalProducts, setBridalPayalProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBridalPayalProducts = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching bridal payal products...');
        const response = await fetch('http://localhost:5000/api/public/products?category=bridal&subcategory=payal');
        console.log('API Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Bridal Payal API Response:', data);
          
          if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
            console.log('Number of products found:', data.data.length);
            const formattedProducts = data.data.map(product => ({
              id: product._id || product.id,
              name: product.name,
              image: product.image || (product.images && product.images.length > 0 ? product.images[0] : staticBridalPayalProducts[0]?.image),
              price: product.price,
              offer: product.offer || '',
              size: product.size || '',
              material: product.material || product.composition || '',
              description: product.description || '',
              category: product.category,
              subcategory: product.subcategory
            }));
            console.log('Formatted products:', formattedProducts);
            setBridalPayalProducts(formattedProducts);
          } else {
            console.log('No products found, using static data');
            setBridalPayalProducts(staticBridalPayalProducts);
          }
        } else {
          console.warn('API response not ok, using static data');
          setBridalPayalProducts(staticBridalPayalProducts);
        }
      } catch (error) {
        console.error('Error fetching bridal payal products:', error);
        setError('Failed to load products');
        setBridalPayalProducts(staticBridalPayalProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBridalPayalProducts();
  }, []);

  // Static fallback data
  const staticBridalPayalProducts = [
    {
      id: 1,
      name: 'Royal Bridal Payal Set',
      image: bridal4,
      price: 28000,
      offer: '15% OFF',
      size: 'Set of 2 Payals',
      material: '925 Sterling Silver with Kundan',
      description: 'Exquisite bridal payal set with traditional bells and Kundan work',
      category: 'bridal',
      subcategory: 'payal'
    },
    {
      id: 2,
      name: 'Heritage Ankle Chain',
      image: bridal7,
      price: 22000,
      offer: '12% OFF',
      size: 'Adjustable Length',
      material: '925 Sterling Silver with Antique Finish',
      description: 'Traditional heritage ankle chain with intricate patterns and charms',
      category: 'bridal',
      subcategory: 'payal'
    },
    {
      id: 3,
      name: 'Temple Bridal Payal',
      image: bridal1,
      price: 35000,
      offer: '18% OFF',
      size: 'Heavy Weight Payal',
      material: '925 Sterling Silver with Temple Work',
      description: 'Heavy temple work bridal payal with traditional motifs and melodious bells',
      category: 'bridal',
      subcategory: 'payal'
    }
  ];

  if (isLoading) {
    return (
      <div className="bridal-collection-page">
        <div className="container">
          <div className="loading-message">Loading bridal payal collection...</div>
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
          <h1 className="page-title">BRIDAL PAYALS</h1>
        </div>

        {/* Collection Header */}
        <div className="collection-header">
          <h2 className="collection-title">Bridal Payal Collection</h2>
          <p className="collection-description">
            Grace your feet with our stunning bridal payal collection, featuring traditional designs with melodious chimes.
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {bridalPayalProducts.map((product, index) => (
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
                    e.target.src = bridal4; // Fallback image
                  }}
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BridalPayalCollection;