import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import men rings images  
import men1 from '../ASSETS/menCollections/men1.webp';
import men2 from '../ASSETS/menCollections/men2.jpg';
import men3 from '../ASSETS/menCollections/men3.jpg';
import men4 from '../ASSETS/menCollections/men4.jpg';
import men6 from '../ASSETS/menCollections/men6.jpg';
import men7 from '../ASSETS/menCollections/men7.jpg';
import men9 from '../ASSETS/menCollections/men9.jpg';

const MenRingsCollection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ringsProducts, setRingsProducts] = useState([]);
  const [error, setError] = useState(null);

  // Static fallback data
  const staticRingsProducts = [
    {
      id: 1,
      name: 'Silver Ring',
      price: '₹3,500',
      originalPrice: '₹4,200',
      image: men1,
      category: 'rings',
      subcategory: 'men-rings',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Classic silver ring with modern design perfect for everyday wear'
    },
    {
      id: 2,
      name: 'Silver Ring SG',
      price: '₹4,200',
      originalPrice: '₹5,000',
      image: men2,
      category: 'rings',
      subcategory: 'men-rings',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Sophisticated silver ring with elegant finish for special occasions'
    },
    {
      id: 3,
      name: 'Silver Band Ring',
      price: '₹2,800',
      originalPrice: '₹3,500',
      image: men3,
      category: 'rings',
      subcategory: 'men-rings',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Minimalist band ring with clean lines and contemporary appeal'
    },
    {
      id: 4,
      name: 'Silver Signet Ring',
      price: '₹5,100',
      originalPrice: '₹6,200',
      image: men4,
      category: 'rings',
      subcategory: 'men-rings',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Traditional signet ring with bold presence and timeless style'
    },
    {
      id: 6,
      name: 'Silver Band',
      price: '₹3,200',
      originalPrice: '₹4,000',
      image: men6,
      category: 'rings',
      subcategory: 'men-rings',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Simple silver band with polished finish for understated elegance'
    },
    {
      id: 7,
      name: 'Silver Wedding Ring',
      price: '₹4,500',
      originalPrice: '₹5,500',
      image: men7,
      category: 'rings',
      subcategory: 'men-rings',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Elegant wedding ring with timeless design and premium finish'
    },
    {
      id: 9,
      name: 'Silver Designer Ring',
      price: '₹5,500',
      originalPrice: '₹6,800',
      image: men9,
      category: 'rings',
      subcategory: 'men-rings',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver with Design Elements',
      description: 'Designer ring with intricate patterns and modern aesthetic appeal'
    }
  ];

  useEffect(() => {
    const fetchMenRingsProducts = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching men\'s rings products from API...');
        
        const response = await fetch('http://localhost:5000/api/public/products?category=men&subcategory=rings');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response for men\'s rings products:', data);
        
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
          
          console.log(`Found ${formattedProducts.length} men's rings products from API`);
          
          // Combine API products with static products
          const allProducts = [...formattedProducts, ...staticRingsProducts];
          setRingsProducts(allProducts);
        } else {
          console.log('No men\'s rings products found in API, using static data');
          setRingsProducts(staticRingsProducts);
        }
      } catch (error) {
        console.error('Error fetching men\'s rings products:', error);
        setError('Failed to load products from server. Showing offline products.');
        setRingsProducts(staticRingsProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenRingsProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Men's Rings Collection...</p>
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
          <Link to="/mens-collection" className="breadcrumb-link">Men's Collection</Link>
          <span className="breadcrumb-separator">|</span>
          <h1 className="page-title">RINGS</h1>
        </div>

        {/* Category Filter Navigation */}
        <div className="category-filters">
          <Link to="/mens-collection" className="category-filter-btn">
            ALL
          </Link>
          <Link to="/mens-collection/chains" className="category-filter-btn">
            CHAINS
          </Link>
          <Link to="/mens-collection/bracelets" className="category-filter-btn">
            BRACELETS
          </Link>
          <Link to="/mens-collection/rings" className="category-filter-btn active">
            RINGS
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {ringsProducts.map(product => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`}
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

export default MenRingsCollection;
