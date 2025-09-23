import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import bridal necklace images
import bridal1 from '../ASSETS/bridalCollections/bridal1.jpg';
import bridal2 from '../ASSETS/bridalCollections/bridal2.jpg';
import bridal6 from '../ASSETS/bridalCollections/bridal6.jpg';

const BridalNecklaceCollection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bridalNecklaceProducts, setBridalNecklaceProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBridalNecklaceProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/public/products?category=bridal&subcategory=necklace');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
            const formattedProducts = data.data.map(product => ({
              id: product._id || product.id,
              name: product.name,
              image: product.image || (product.images && product.images.length > 0 ? product.images[0] : staticBridalNecklaceProducts[0]?.image),
              price: product.price,
              offer: product.offer || '',
              size: product.size || '',
              material: product.material || product.composition || '',
              description: product.description || '',
              category: product.category,
              subcategory: product.subcategory
            }));
            setBridalNecklaceProducts(formattedProducts);
          } else {
            setBridalNecklaceProducts(staticBridalNecklaceProducts);
          }
        } else {
          console.warn('API response not ok, using static data');
          setBridalNecklaceProducts(staticBridalNecklaceProducts);
        }
      } catch (error) {
        console.error('Error fetching bridal necklace products:', error);
        setError('Failed to load products');
        setBridalNecklaceProducts(staticBridalNecklaceProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBridalNecklaceProducts();
  }, []);

  // Static fallback data
  const staticBridalNecklaceProducts = [
    {
      id: 1,
      name: 'Royal Bridal Necklace Set',
      image: bridal1,
      price: 45000,
      offer: '15% OFF',
      size: 'Complete Set with Earrings',
      material: '925 Sterling Silver with Kundan',
      description: 'Exquisite bridal necklace set with traditional Kundan work and matching earrings',
      category: 'bridal',
      subcategory: 'necklace'
    },
    {
      id: 2,
      name: 'Heritage Bridal Choker',
      image: bridal2,
      price: 32000,
      offer: '12% OFF',
      size: 'Adjustable Choker',
      material: '925 Sterling Silver with Gemstones',
      description: 'Traditional heritage choker perfect for the modern bride',
      category: 'bridal',
      subcategory: 'necklace'
    },
    {
      id: 3,
      name: 'Temple Bridal Necklace',
      image: bridal6,
      price: 38000,
      offer: '18% OFF',
      size: 'Long Necklace Set',
      material: '925 Sterling Silver with Temple Work',
      description: 'Elegant temple work bridal necklace with intricate designs',
      category: 'bridal',
      subcategory: 'necklace'
    }
  ];

  if (isLoading) {
    return (
      <div className="bridal-collection-page">
        <div className="container">
          <div className="loading-message">Loading bridal necklace collection...</div>
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
          <h1 className="page-title">BRIDAL NECKLACES</h1>
        </div>

        {/* Collection Header */}
        <div className="collection-header">
          <h2 className="collection-title">Bridal Necklace Collection</h2>
          <p className="collection-description">
            Discover our exquisite collection of bridal necklaces, crafted with premium silver and adorned with traditional designs perfect for your special day.
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {bridalNecklaceProducts.map((product, index) => (
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
                    e.target.src = bridal1; // Fallback image
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

export default BridalNecklaceCollection;