import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import specific images for Necklace
import bridal1 from '../ASSETS/bridalCollections/bridal1.jpg';
import bridal6 from '../ASSETS/bridalCollections/bridal6.jpg';
import bridal2 from '../ASSETS/bridalCollections/bridal2.jpg';

const NecklaceCollection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [necklaceProducts, setNecklaceProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNecklaceProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/public/products?subcategory=necklace');
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            const formattedProducts = data.map(product => ({
              id: product._id,
              name: product.name,
              image: product.images && product.images.length > 0 ? product.images[0] : staticNecklaceProducts[0]?.image,
              price: `₹${product.price.toLocaleString()}`,
              originalPrice: product.originalPrice ? `₹${product.originalPrice.toLocaleString()}` : '',
              category: product.subcategory || 'necklace',
              size: product.size || '',
              material: product.material || product.composition || '',
              description: product.description || ''
            }));
            setNecklaceProducts(formattedProducts);
          } else {
            setNecklaceProducts(staticNecklaceProducts);
          }
        } else {
          console.warn('API response not ok, using static data');
          setNecklaceProducts(staticNecklaceProducts);
        }
      } catch (error) {
        console.error('Error fetching necklace products:', error);
        setError('Failed to load products');
        setNecklaceProducts(staticNecklaceProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNecklaceProducts();
  }, []);

  // Static fallback data
  const staticNecklaceProducts = [
    {
      id: 'necklace_1',
      name: 'Royal Bridal Necklace Set',
      price: '₹25,000',
      originalPrice: '₹30,000',
      image: bridal1,
      category: 'necklace',
      size: 'Complete Set',
      material: '925 Sterling Silver with Gemstones',
      description: 'Exquisite bridal necklace with matching earrings perfect for your special day'
    },
    {
      id: 'necklace_2',
      name: 'Kundan Necklace Collection',
      price: '₹38,000',
      originalPrice: '₹42,000',
      image: bridal6,
      category: 'necklace',
      size: 'Complete Set',
      material: '925 Sterling Silver with Kundan Work',
      description: 'Luxurious kundan work necklace set with royal elegance'
    },
    {
      id: 'necklace_3',
      name: 'Traditional Choker Set',
      price: '₹18,500',
      originalPrice: '₹22,000',
      image: bridal2,
      category: 'necklace',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Classic choker design with traditional motifs and intricate craftsmanship'
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
          <h1 className="page-title">NECKLACE</h1>
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
          <Link to="/bridal-collection/bracelets" className="category-filter-btn">
            BRACELETS
          </Link>
          <Link to="/bridal-collection/necklace" className="category-filter-btn active">
            NECKLACE
          </Link>
          <Link to="/bridal-collection/nose-rings" className="category-filter-btn">
            NOSE RINGS
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {necklaceProducts.map((product) => (
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

export default NecklaceCollection;
