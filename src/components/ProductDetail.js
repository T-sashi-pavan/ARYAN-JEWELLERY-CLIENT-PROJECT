import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

// Import recommended products images
import women3 from '../ASSETS/womenCollections/women3.jpg';
import women4 from '../ASSETS/womenCollections/women4.jpg';
import women6 from '../ASSETS/womenCollections/women6.jpg';
import lifestyle1 from '../ASSETS/lifestyleCollections/lifestyle1.jpg';
import lifestyle2 from '../ASSETS/lifestyleCollections/lifestyle2.webp';
import lifestyle3 from '../ASSETS/lifestyleCollections/lifestyle3.jpg';
import lifestyle4 from '../ASSETS/lifestyleCollections/lifestyle4.webp';
import lifestyle5 from '../ASSETS/lifestyleCollections/lifestyle5.jpg';
import lifestyle6 from '../ASSETS/lifestyleCollections/lifestyle6.jpg';
import lifestyle7 from '../ASSETS/lifestyleCollections/lifestyle7.jpg';
import lifestyle8 from '../ASSETS/lifestyleCollections/lifestyle8.jpg';
import coin1 from '../ASSETS/coinsCollections/coin1.jpg';
import coin2 from '../ASSETS/coinsCollections/coin2.jpg';
import coin3 from '../ASSETS/coinsCollections/coin3.jpg';
import coin4 from '../ASSETS/coinsCollections/coin4.jpg';
import murthi1 from '../ASSETS/murthiCollections/murthi1.jpg';
import murthi2 from '../ASSETS/murthiCollections/murthi2.jpg';
import murthi3 from '../ASSETS/murthiCollections/murthi3.jpg';
import murthi4 from '../ASSETS/murthiCollections/murthi4.jpg';
import decorative1 from '../ASSETS/decorativeCollections/decorative1.jpg';
import decorative2 from '../ASSETS/decorativeCollections/decorative2.webp';
import decorative3 from '../ASSETS/decorativeCollections/decorative3.jpg';
import decorative4 from '../ASSETS/decorativeCollections/decorative4.jpg';
import gift1 from '../ASSETS/giftCollections/gift1.jpg';
import gift2 from '../ASSETS/giftCollections/gift2.jpg';
import gift3 from '../ASSETS/giftCollections/gift3.jpg';
import gift4 from '../ASSETS/giftCollections/gift4.jpg';
import poojaitems1 from '../ASSETS/poojaitemsCollections/poojaitems1.jpg';
import poojaitems2 from '../ASSETS/poojaitemsCollections/poojaitems2.jpg';
import poojaitems3 from '../ASSETS/poojaitemsCollections/poojaitems3.jpg';
import poojaitems4 from '../ASSETS/poojaitemsCollections/poojaitems4.jpg';
import livingroom1 from '../ASSETS/livingroomCollections/livingroom1.jpg';
import livingroom2 from '../ASSETS/livingroomCollections/livingroom2.jpg';
import livingroom3 from '../ASSETS/livingroomCollections/livingroom3.jpg';
import livingroom4 from '../ASSETS/livingroomCollections/livingroom4.jpg';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  // If no product data, redirect back to home
  if (!product) {
    navigate('/');
    return null;
  }

  // Calculate discount percentage
  const originalPriceNum = typeof product.originalPrice === 'string' 
    ? parseInt(product.originalPrice.replace(/[^\d]/g, ''))
    : product.originalPrice;
  const currentPriceNum = typeof product.price === 'string' 
    ? parseInt(product.price.replace(/[^\d]/g, ''))
    : product.price;
  const discountPercentage = Math.round(((originalPriceNum - currentPriceNum) / originalPriceNum) * 100);

  // Murthi collection recommendations
  const murthiRecommendations = [
    {
      id: 301,
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
      id: 302,
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
      id: 303,
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
      id: 304,
      name: 'Silver Saraswati Murthi',
      image: murthi4,
      price: 17200,
      offer: '14% OFF',
      size: '9.5 inch height',
      material: '925 Sterling Silver',
      description: 'Graceful silver Saraswati murthi for knowledge and wisdom',
      category: 'murthi'
    }
  ];

  // Coins collection recommendations  
  const coinsRecommendations = [
    {
      id: 401,
      name: 'Silver Ganesh Coin',
      image: coin1,
      price: 2500,
      offer: '10% OFF',
      size: '2 inch diameter',
      material: '925 Sterling Silver',
      description: 'Auspicious silver Ganesh coin for gifts and collection',
      category: 'coins'
    },
    {
      id: 402,
      name: 'Silver Lakshmi Coin',
      image: coin2,
      price: 3000,
      offer: '12% OFF',
      size: '2.5 inch diameter',
      material: '925 Sterling Silver',
      description: 'Prosperity silver Lakshmi coin with intricate design',
      category: 'coins'
    },
    {
      id: 403,
      name: 'Silver Om Coin',
      image: coin3,
      price: 2200,
      offer: '8% OFF',
      size: '1.8 inch diameter',
      material: '925 Sterling Silver',
      description: 'Sacred Om symbol silver coin for spiritual purposes',
      category: 'coins'
    },
    {
      id: 404,
      name: 'Silver Commemorative Coin',
      image: coin4,
      price: 3500,
      offer: '15% OFF',
      size: '3 inch diameter',
      material: '925 Sterling Silver',
      description: 'Special commemorative silver coin for collection',
      category: 'coins'
    }
  ];

  // Living Room collection recommendations
  const livingRoomRecommendations = [
    {
      id: 501,
      name: 'Silver Wall Mirror',
      image: livingroom1,
      price: 12500,
      offer: '15% OFF',
      size: '24x18 inches',
      material: '925 Sterling Silver Frame',
      description: 'Elegant silver-framed wall mirror perfect for living room decoration',
      category: 'livingroom'
    },
    {
      id: 502,
      name: 'Silver Coffee Table Set',
      image: livingroom2,
      price: 35000,
      offer: '20% OFF',
      size: 'Table 48x24 inches',
      material: '925 Sterling Silver Accents',
      description: 'Luxurious coffee table set with silver accents for modern living rooms',
      category: 'livingroom'
    },
    {
      id: 503,
      name: 'Silver Decorative Lamp',
      image: livingroom3,
      price: 18500,
      offer: '12% OFF',
      size: '28 inch height',
      material: '925 Sterling Silver Base',
      description: 'Sophisticated decorative lamp with silver base for ambient lighting',
      category: 'livingroom'
    },
    {
      id: 504,
      name: 'Silver Wall Clock',
      image: livingroom4,
      price: 8500,
      offer: '10% OFF',
      size: '16 inch diameter',
      material: '925 Sterling Silver',
      description: 'Elegant silver wall clock with intricate design for living room',
      category: 'livingroom'
    }
  ];

  // Pooja Items collection recommendations
  const poojaItemsRecommendations = [
    {
      id: 501,
      name: 'Silver Pooja Thali Set',
      image: poojaitems1,
      price: 12000,
      offer: '15% OFF',
      size: '12 inch diameter',
      material: '925 Sterling Silver',
      description: 'Complete silver pooja thali set for religious ceremonies and daily worship',
      category: 'poojaitems'
    },
    {
      id: 502,
      name: 'Silver Diya Set',
      image: poojaitems2,
      price: 8500,
      offer: '12% OFF',
      size: 'Set of 5 diyas',
      material: '925 Sterling Silver',
      description: 'Beautiful silver diya set for festivals and special occasions',
      category: 'poojaitems'
    },
    {
      id: 503,
      name: 'Silver Kalash',
      image: poojaitems3,
      price: 15000,
      offer: '18% OFF',
      size: '8 inch height',
      material: '925 Sterling Silver',
      description: 'Sacred silver kalash for religious rituals and temple ceremonies',
      category: 'poojaitems'
    },
    {
      id: 504,
      name: 'Silver Incense Holder',
      image: poojaitems4,
      price: 6500,
      offer: '10% OFF',
      size: '6 inch length',
      material: '925 Sterling Silver',
      description: 'Elegant silver incense holder for aromatic worship experience',
      category: 'poojaitems'
    }
  ];

  // Gift collection recommendations
  const giftRecommendations = [
    {
      id: 601,
      name: 'Silver Gift Set',
      image: gift1,
      price: 8500,
      offer: '15% OFF',
      size: 'Medium Gift Box',
      material: '925 Sterling Silver',
      description: 'Beautiful silver gift set perfect for special occasions and celebrations',
      category: 'gift'
    },
    {
      id: 602,
      name: 'Silver Decorative Item',
      image: gift2,
      price: 6200,
      offer: '12% OFF',
      size: 'Small Decorative Piece',
      material: '925 Sterling Silver',
      description: 'Elegant silver decorative item ideal for gifting to loved ones',
      category: 'gift'
    },
    {
      id: 603,
      name: 'Silver Anniversary Gift',
      image: gift3,
      price: 12500,
      offer: '18% OFF',
      size: 'Large Gift Box',
      material: '925 Sterling Silver',
      description: 'Premium silver anniversary gift set with beautiful craftsmanship',
      category: 'gift'
    },
    {
      id: 604,
      name: 'Silver Wedding Gift',
      image: gift4,
      price: 9800,
      offer: '14% OFF',
      size: 'Medium Gift Set',
      material: '925 Sterling Silver',
      description: 'Graceful silver wedding gift perfect for special ceremonies',
      category: 'gift'
    }
  ];

  // Lifestyle collection recommendations
  const lifestyleRecommendations = [
    {
      id: 201,
      name: 'Silver Dinner Set',
      image: lifestyle1,
      price: 25000,
      offer: '15% OFF',
      size: 'Set of 12 pieces',
      material: '925 Sterling Silver',
      description: 'Elegant silver dinner set perfect for special occasions and daily dining',
      category: 'lifestyle'
    },
    {
      id: 202,
      name: 'Silver Photo Frame',
      image: lifestyle2,
      price: 8500,
      offer: '10% OFF',
      size: '8x10 inches',
      material: '925 Sterling Silver',
      description: 'Beautiful silver photo frame to showcase your precious memories',
      category: 'lifestyle'
    },
    {
      id: 203,
      name: 'Silver Decorative Bowl',
      image: lifestyle3,
      price: 12000,
      offer: '20% OFF',
      size: '12 inch diameter',
      material: '925 Sterling Silver',
      description: 'Handcrafted decorative bowl perfect for home decoration',
      category: 'lifestyle'
    },
    {
      id: 204,
      name: 'Silver Candle Holder',
      image: lifestyle4,
      price: 6800,
      offer: '12% OFF',
      size: '6 inch height',
      material: '925 Sterling Silver',
      description: 'Elegant candle holder to create a perfect ambiance',
      category: 'lifestyle'
    },
    {
      id: 205,
      name: 'Silver Tray Set',
      image: lifestyle5,
      price: 18500,
      offer: '18% OFF',
      size: 'Set of 3 trays',
      material: '925 Sterling Silver',
      description: 'Premium tray set for serving and decoration',
      category: 'lifestyle'
    },
    {
      id: 206,
      name: 'Silver Vase',
      image: lifestyle6,
      price: 15200,
      offer: '15% OFF',
      size: '10 inch height',
      material: '925 Sterling Silver',
      description: 'Beautiful silver vase for flowers and decoration',
      category: 'lifestyle'
    },
    {
      id: 207,
      name: 'Silver Jewelry Box',
      image: lifestyle7,
      price: 9800,
      offer: '10% OFF',
      size: '8x6x4 inches',
      material: '925 Sterling Silver',
      description: 'Elegant jewelry box to store your precious ornaments',
      category: 'lifestyle'
    },
    {
      id: 208,
      name: 'Silver Mirror Frame',
      image: lifestyle8,
      price: 11500,
      offer: '14% OFF',
      size: '12x16 inches',
      material: '925 Sterling Silver',
      description: 'Decorative mirror frame for your dressing table',
      category: 'lifestyle'
    }
  ];

  // Decorative collection recommendations
  const decorativeRecommendations = [
    {
      id: 801,
      name: 'Silver Decorative Vase',
      image: decorative1,
      price: 12500,
      offer: '15% OFF',
      size: '12 inch height',
      material: '925 Sterling Silver',
      description: 'Elegant silver decorative vase perfect for home decoration and gifting',
      category: 'decorative'
    },
    {
      id: 802,
      name: 'Silver Decorative Bowl',
      image: decorative2,
      price: 8500,
      offer: '12% OFF',
      size: '8 inch diameter',
      material: '925 Sterling Silver',
      description: 'Beautiful silver decorative bowl for centerpiece and table decoration',
      category: 'decorative'
    },
    {
      id: 803,
      name: 'Silver Decorative Plate',
      image: decorative3,
      price: 15000,
      offer: '18% OFF',
      size: '10 inch diameter',
      material: '925 Sterling Silver',
      description: 'Handcrafted silver decorative plate with intricate design patterns',
      category: 'decorative'
    },
    {
      id: 804,
      name: 'Silver Decorative Figurine',
      image: decorative4,
      price: 9800,
      offer: '14% OFF',
      size: '6 inch height',
      material: '925 Sterling Silver',
      description: 'Artistic silver figurine for home decoration and collection',
      category: 'decorative'
    }
  ];

  // General recommended products
  const generalRecommendations = [
    {
      id: 101,
      name: 'Silver Ring Collection',
      image: women3,
      price: '₹1,400',
      originalPrice: '₹1,800',
      category: 'women',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Beautiful collection of silver rings with intricate designs perfect for any occasion'
    },
    {
      id: 102,
      name: 'Elegant Bracelet Set',
      image: women4,
      price: '₹2,100',
      originalPrice: '₹2,600',
      category: 'women',
      size: 'One Size',
      material: '925 Sterling Silver with Gemstones',
      description: 'Elegant bracelet set featuring beautiful gemstones and traditional craftsmanship'
    },
    {
      id: 103,
      name: 'Designer Earrings',
      image: women6,
      price: '₹1,600',
      originalPrice: '₹2,000',
      category: 'women',
      size: 'One Size',
      material: '925 Sterling Silver',
      description: 'Designer earrings with contemporary style and premium finish'
    },
    {
      id: 104,
      name: 'Lifestyle Chain',
      image: lifestyle7,
      price: '₹1,900',
      originalPrice: '₹2,400',
      category: 'lifestyle',
      size: '18 inch',
      material: '925 Sterling Silver',
      description: 'Modern lifestyle chain perfect for daily wear with elegant design'
    }
  ];

  // Choose recommendations based on product category
  const recommendedProducts = product.category === 'lifestyle' 
    ? lifestyleRecommendations.filter(item => item.id !== product.id).slice(0, 4)
    : product.category === 'coins'
    ? coinsRecommendations.filter(item => item.id !== product.id).slice(0, 4)
    : product.category === 'murthi'
    ? murthiRecommendations.filter(item => item.id !== product.id).slice(0, 4)
    : product.category === 'livingroom'
    ? livingRoomRecommendations.filter(item => item.id !== product.id).slice(0, 4)
    : product.category === 'poojaitems'
    ? poojaItemsRecommendations.filter(item => item.id !== product.id).slice(0, 4)
    : product.category === 'gift'
    ? giftRecommendations.filter(item => item.id !== product.id).slice(0, 4)
    : product.category === 'decorative'
    ? decorativeRecommendations.filter(item => item.id !== product.id).slice(0, 4)
    : generalRecommendations;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleAddToWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div className="product-detail">
      <div className="container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        
        <div className="product-main">
          <div className="product-image-section">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>
          
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="price-section">
              <span className="current-price">{product.price}</span>
              <span className="original-price">{product.originalPrice}</span>
              <span className="discount-badge">{discountPercentage}% OFF</span>
            </div>
            
            <div className="product-details">
              <div className="detail-item">
                <strong>Material:</strong> {product.material}
              </div>
              <div className="detail-item">
                <strong>Size:</strong> {product.size}
              </div>
              <div className="detail-item">
                <strong>Category:</strong> {product.category}
              </div>
            </div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="action-buttons">
              <button 
                className={`add-to-cart-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                onClick={handleAddToCart}
              >
                {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
              </button>
              <button 
                className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={handleAddToWishlist}
              >
                {isInWishlist(product.id) ? '♥ In Wishlist' : '♡ Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="recommendations-section">
          <h2>Recommended Products</h2>
          <div className="recommendations-grid">
            {recommendedProducts.map((item) => (
              <Link 
                key={item.id} 
                to={`/product/${item.id}`} 
                state={{ product: item }}
                className="recommendation-card"
              >
                <div className="recommendation-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="recommendation-info">
                  <h4>{item.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
