import React from 'react';
import { Link } from 'react-router-dom';
import './BridalCollection.css';

// Import murthi/idol videos  
import murthiVideo1 from '../ASSETS/murthiCollections/idol_videos/Realistic_D_Ganesh_Idol_Showcase.mp4';
import murthiVideo2 from '../ASSETS/murthiCollections/idol_videos/Silver_Ganesh_Idol_D_Showcase.mp4';
import murthiVideo3 from '../ASSETS/murthiCollections/idol_videos/Realistic_D_Idol_Showcase_Video.mp4';
import murthiVideo4 from '../ASSETS/murthiCollections/idol_videos/D_Idol_Showcase_Video_Generation.mp4';
import murthiVideo5 from '../ASSETS/murthiCollections/idol_videos/Realistic_D_Idol_Showcase_Video (3).mp4';
import murthiVideo6 from '../ASSETS/murthiCollections/idol_videos/Idol_Showcase_Video_Generation (2).mp4';
// import murthiVideo7 from '../ASSETS/murthiCollections/idol_videos/Realistic_D_Idol_Showcase_Video_Generation (3).mp4';
// Import murthi collection images
import murthi1 from '../ASSETS/murthiCollections/murthi1.jpg';
import murthi2 from '../ASSETS/murthiCollections/murthi2.jpg';
import murthi3 from '../ASSETS/murthiCollections/murthi3.jpg';
import murthi4 from '../ASSETS/murthiCollections/murthi4.jpg';
import murthi5 from '../ASSETS/murthiCollections/murthi5.jpg';
import murthi6 from '../ASSETS/murthiCollections/murthi6.jpg';

const MurthiCollection = () => {
  const murthiProducts = [
    {
      id: 1,
      name: 'Silver Ganesh Murthi',
      video: murthiVideo1,
      image: murthi1,
      price: '₹15,000',
      originalPrice: '₹17,647',
      size: '8 inch height',
      material: '925 Sterling Silver',
      description: 'Beautiful handcrafted silver Ganesh murthi for home temple and worship',
      category: 'murthi'
    },
    {
      id: 2,
      name: 'Silver Krishna Murthi',
      video: murthiVideo2,
      image: murthi2,
      price: '₹18,500',
      originalPrice: '₹21,023',
      size: '10 inch height',
      material: '925 Sterling Silver',
      description: 'Elegant silver Krishna murthi with intricate detailing for devotional purposes',
      category: 'murthi'
    },
    {
      id: 3,
      name: 'Silver Lakshmi Murthi',
      video: murthiVideo3,
      image: murthi3,
      price: '₹16,500',
      originalPrice: '₹20,122',
      size: '9 inch height',
      material: '925 Sterling Silver',
      description: 'Divine silver Lakshmi murthi for prosperity and wealth',
      category: 'murthi'
    },
    {
      id: 4,
      name: 'Silver Saraswati Murthi',
      video: murthiVideo4,
      image: murthi4,
      price: '₹17,200',
      originalPrice: '₹20,000',
      size: '9.5 inch height',
      material: '925 Sterling Silver',
      description: 'Graceful silver Saraswati murthi for knowledge and wisdom',
      category: 'murthi'
    },
    {
      id: 5,
      name: 'Silver Shiva Murthi',
      image: murthi5,
      price: '₹19,800',
      originalPrice: '₹23,571',
      size: '11 inch height',
      material: '925 Sterling Silver',
      description: 'Powerful silver Shiva murthi with traditional craftsmanship',
      category: 'murthi'
    },
    {
      id: 6,
      name: 'Silver Radha Krishna Murthi',
      image: murthi6,
      price: '₹22,000',
      originalPrice: '₹27,500',
      size: '12 inch height',
      material: '925 Sterling Silver',
      description: 'Divine silver Radha Krishna murthi set for temple decoration',
      category: 'murthi'
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
                {product.video ? (
                  <video
                    src={product.video}
                    alt={product.name}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onMouseEnter={(e) => e.target.pause()}
                    onMouseLeave={(e) => e.target.play()}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                ) : (
                  <img src={product.image} alt={product.name} />
                )}
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

export default MurthiCollection;
