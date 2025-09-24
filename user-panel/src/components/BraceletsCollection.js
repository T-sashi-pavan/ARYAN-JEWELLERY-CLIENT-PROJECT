import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import specific images for Bracelets
import bridal3 from '../ASSETS/bridalCollections/bridal3.jpg';
import bridal6 from '../ASSETS/bridalCollections/bridal6.jpg';
import bridal9 from '../ASSETS/bridalCollections/bridal9.jpg';

const BraceletsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [braceletsProducts, setBraceletsProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBraceletsProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/public/products?subcategory=bracelets');
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            const formattedProducts = data.map(product => ({
              id: product._id,
              name: product.name,
              image: product.images && product.images.length > 0 ? product.images[0] : staticBraceletsProducts[0]?.image,
              price: `₹${product.price.toLocaleString()}`,
              originalPrice: product.originalPrice ? `₹${product.originalPrice.toLocaleString()}` : '',
              category: product.subcategory || 'bracelets',
              size: product.size || '',
              material: product.material || product.composition || '',
              description: product.description || ''
            }));
            setBraceletsProducts(formattedProducts);
          } else {
            setBraceletsProducts(staticBraceletsProducts);
          }
        } else {
          console.warn('API response not ok, using static data');
          setBraceletsProducts(staticBraceletsProducts);
        }
      } catch (error) {
        console.error('Error fetching bracelets products:', error);
        setError('Failed to load products');
        setBraceletsProducts(staticBraceletsProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBraceletsProducts();
  }, []);

  // Static fallback data
  const staticBraceletsProducts = [
    {
      id: 'bracelets_1',
      name: 'Diamond Cut Bracelet',
      price: '₹16,500',
      originalPrice: '₹19,000',
      image: bridal3,
      category: 'bracelets',
      size: 'Adjustable',
      material: '925 Sterling Silver with Diamond Cut',
      description: 'Stunning diamond cut bracelet with sparkling finish'
    },
    {
      id: 'bracelets_2',
      name: 'Kundan Bracelet Set',
      price: '₹21,500',
      originalPrice: '₹24,000',
      image: bridal6,
      category: 'bracelets',
      size: 'Medium',
      material: '925 Sterling Silver with Kundan Work',
      description: 'Luxurious kundan bracelet set with royal elegance'
    },
    {
      id: 'bracelets_3',
      name: 'Contemporary Bracelet',
      price: '₹14,800',
      originalPrice: '₹17,500',
      image: bridal9,
      category: 'bracelets',
      size: 'One Size',
      material: '925 Sterling Silver with Modern Design',
      description: 'Modern design bracelet perfect for contemporary fashion'
    }
  ];

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
          <h1 className="page-title">BRACELETS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/bridal-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/bridal-collection/payal" className="category-filter-btn">
            PAYAL
          </Link>
          <Link to="/bridal-collection/chains" className="category-filter-btn">
            CHAINS
          </Link>
          <Link to="/bridal-collection/bracelets" className="category-filter-btn active">
            BRACELETS
          </Link>
          <Link to="/bridal-collection/necklace" className="category-filter-btn">
            NECKLACE
          </Link>
          <Link to="/bridal-collection/nose-rings" className="category-filter-btn">
            NOSE RINGS
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {braceletsProducts.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              state={{ product: product }}
              className="product-card"
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
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
                  <span className="current-price">{product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">{product.originalPrice}</span>
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

export default BraceletsCollection;
