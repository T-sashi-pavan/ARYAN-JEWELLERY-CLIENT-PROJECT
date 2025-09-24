import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import murthi collection images
import murthi1 from '../ASSETS/murthiCollections/murthi1.jpg';
import murthi2 from '../ASSETS/murthiCollections/murthi2.jpg';
import murthi3 from '../ASSETS/murthiCollections/murthi3.jpg';
import murthi4 from '../ASSETS/murthiCollections/murthi4.jpg';
import murthi5 from '../ASSETS/murthiCollections/murthi5.jpg';
import murthi6 from '../ASSETS/murthiCollections/murthi6.jpg';

const MurthiCollection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [murthiProducts, setMurthiProducts] = useState([]);
  const [error, setError] = useState(null);

  // Static fallback data
  const staticMurthiProducts = [
    {
      id: 1,
      name: 'Silver Ganesh Murthi',
      image: murthi1,
      price: 15000,
      offer: '15% OFF',
      size: '8 inch height',
      material: '925 Sterling Silver',
      description: 'Beautiful handcrafted silver Ganesh murthi for home temple and worship',
      category: 'murthi'
    },
    {
      id: 2,
      name: 'Silver Krishna Murthi',
      image: murthi2,
      price: 18500,
      offer: '12% OFF',
      size: '10 inch height',
      material: '925 Sterling Silver',
      description: 'Elegant silver Krishna murthi with intricate detailing for devotional purposes',
      category: 'murthi'
    },
    {
      id: 3,
      name: 'Silver Lakshmi Murthi',
      image: murthi3,
      price: 16500,
      offer: '18% OFF',
      size: '9 inch height',
      material: '925 Sterling Silver',
      description: 'Divine silver Lakshmi murthi for prosperity and wealth',
      category: 'murthi'
    },
    {
      id: 4,
      name: 'Silver Saraswati Murthi',
      image: murthi4,
      price: 17200,
      offer: '14% OFF',
      size: '9.5 inch height',
      material: '925 Sterling Silver',
      description: 'Graceful silver Saraswati murthi for knowledge and wisdom',
      category: 'murthi'
    },
    {
      id: 5,
      name: 'Silver Shiva Murthi',
      image: murthi5,
      price: 19800,
      offer: '16% OFF',
      size: '11 inch height',
      material: '925 Sterling Silver',
      description: 'Powerful silver Shiva murthi with traditional craftsmanship',
      category: 'murthi'
    },
    {
      id: 6,
      name: 'Silver Radha Krishna Murthi',
      image: murthi6,
      price: 22000,
      offer: '20% OFF',
      size: '12 inch height',
      material: '925 Sterling Silver',
      description: 'Divine silver Radha Krishna murthi set for temple decoration',
      category: 'murthi'
    }
  ];

  useEffect(() => {
    const fetchMurthiProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/public/products?category=murthi');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
          const allProducts = [...formattedProducts, ...staticMurthiProducts];
          setMurthiProducts(allProducts);
        } else {
          setMurthiProducts(staticMurthiProducts);
        }
      } catch (error) {
        setError('Failed to load products from server. Showing offline products.');
        setMurthiProducts(staticMurthiProducts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMurthiProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Murthi Collection...</p>
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
          <Link to="/lifestyle-collection" className="breadcrumb-link">Lifestyle Collection</Link>
          <span className="breadcrumb-separator">|</span>
          <h1 className="page-title">MURTHI</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/lifestyle-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/lifestyle-collection/coins" className="category-filter-btn">
            COINS
          </Link>
          <Link to="/lifestyle-collection/murthi" className="category-filter-btn active">
            MURTHI
          </Link>
          <Link to="/lifestyle-collection/decorative" className="category-filter-btn">
            DECORATIVE
          </Link>
          <Link to="/lifestyle-collection/pooja-items" className="category-filter-btn">
            POOJA ITEMS
          </Link>
          <Link to="/gift-collection" className="category-filter-btn">
            GIFT
          </Link>
          <Link to="/lifestyle-collection/living-room" className="category-filter-btn">
            LIVING ROOM
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {murthiProducts.map((product) => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`} 
              state={{ product }}
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
                  <span className="current-price">₹{product.price.toLocaleString()}</span>
                  {product.offer && (
                    <span className="original-price">{product.offer}</span>
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

export default MurthiCollection;
