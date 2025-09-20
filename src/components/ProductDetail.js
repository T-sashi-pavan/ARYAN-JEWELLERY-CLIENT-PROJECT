import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart } from 'lucide-react';
import { ALL_PRODUCTS } from '../utils/searchUtils';
import './ProductDetail.css';

// Import recommended products images
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
import bridal1 from '../ASSETS/bridalCollections/bridal1.jpg';
import bridal2 from '../ASSETS/bridalCollections/bridal2.jpg';
import bridal3 from '../ASSETS/bridalCollections/bridal3.jpg';
import bridal4 from '../ASSETS/bridalCollections/bridal4.jpg';
import bridal6 from '../ASSETS/bridalCollections/bridal6.jpg';
import bridal7 from '../ASSETS/bridalCollections/bridal7.jpg';
import bridal8 from '../ASSETS/bridalCollections/bridal8.jpg';
import bridal9 from '../ASSETS/bridalCollections/bridal9.jpg';
import women1 from '../ASSETS/womenCollections/women1.jpg';
import women2 from '../ASSETS/womenCollections/women2.jpg';
import women3 from '../ASSETS/womenCollections/women3.jpg';
import women4 from '../ASSETS/womenCollections/women4.jpg';
import women5 from '../ASSETS/womenCollections/women5.jpg';
import women6 from '../ASSETS/womenCollections/women6.jpg';
import women7 from '../ASSETS/womenCollections/women7.jpg';
import women8 from '../ASSETS/womenCollections/women8.jpg';
import men1 from '../ASSETS/menCollections/men1.webp';
import men2 from '../ASSETS/menCollections/men2.jpg';
import men5 from '../ASSETS/menCollections/men5.jpg';
import men8 from '../ASSETS/menCollections/men8.jpg';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    const loadProduct = () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, try to get product from location.state (existing functionality)
        const stateProduct = location.state?.product;
        if (stateProduct) {
          setProduct(stateProduct);
          setLoading(false);
          return;
        }
        
        // If no state product and we have an ID from URL params, search for it
        if (id) {
          const foundProduct = ALL_PRODUCTS.find(p => p.id === id);
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            setError('Product not found');
          }
        } else {
          setError('No product information available');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product');
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, location.state]);

  // Loading state
  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="product-detail-container">
        <div className="error-state">
          <div className="error-icon">❌</div>
          <h2>Product Not Found</h2>
          <p>{error || 'The product you are looking for could not be found.'}</p>
          <div className="error-actions">
            <button onClick={() => navigate(-1)} className="back-btn">
              Go Back
            </button>
            <Link to="/" className="home-btn">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate discount percentage
  const originalPriceNum = typeof product.originalPrice === 'string' 
    ? parseInt(product.originalPrice.replace(/[^\d]/g, ''))
    : product.originalPrice;
  const currentPriceNum = typeof product.price === 'string' 
    ? parseInt(product.price.replace(/[^\d]/g, ''))
    : product.price;
  const discountPercentage = Math.round(((originalPriceNum - currentPriceNum) / originalPriceNum) * 100);

  // Bridal collection recommendations
  const bridalRecommendations = [
    {
      id: 101,
      name: 'Elegant Gold Payal',
      image: bridal1,
      price: 15000,
      offer: '15% OFF',
      size: 'Adjustable',
      material: '22K Gold Plated',
      description: 'Traditional gold payal with intricate designs perfect for bridal wear',
      category: 'bridal'
    },
    {
      id: 102,
      name: 'Royal Bridal Chain',
      image: bridal2,
      price: 25000,
      offer: '20% OFF',
      size: '18 inch length',
      material: '22K Gold Plated',
      description: 'Exquisite bridal chain with traditional motifs for wedding ceremonies',
      category: 'bridal'
    },
    {
      id: 103,
      name: 'Designer Bridal Bracelet',
      image: bridal3,
      price: 12000,
      offer: '12% OFF',
      size: '7 inch',
      material: '22K Gold Plated',
      description: 'Beautiful designer bracelet perfect for bridal occasions',
      category: 'bridal'
    },
    {
      id: 104,
      name: 'Traditional Necklace Set',
      image: bridal4,
      price: 35000,
      offer: '25% OFF',
      size: 'Medium',
      material: '22K Gold Plated',
      description: 'Complete traditional necklace set for bridal ceremonies',
      category: 'bridal'
    },
    {
      id: 105,
      name: 'Antique Nose Ring',
      image: bridal6,
      price: 8000,
      offer: '10% OFF',
      size: 'One Size',
      material: '22K Gold Plated',
      description: 'Traditional antique nose ring with ethnic patterns',
      category: 'bridal'
    },
    {
      id: 106,
      name: 'Bridal Jewelry Set',
      image: bridal7,
      price: 45000,
      offer: '30% OFF',
      size: 'Complete Set',
      material: '22K Gold Plated',
      description: 'Complete bridal jewelry set including necklace, earrings, and accessories',
      category: 'bridal'
    },
    {
      id: 107,
      name: 'Gold Plated Anklet',
      image: bridal8,
      price: 18000,
      offer: '18% OFF',
      size: 'Adjustable',
      material: '22K Gold Plated',
      description: 'Elegant gold plated anklet with traditional bells',
      category: 'bridal'
    },
    {
      id: 108,
      name: 'Heritage Chain Design',
      image: bridal9,
      price: 28000,
      offer: '22% OFF',
      size: '20 inch length',
      material: '22K Gold Plated',
      description: 'Heritage chain design with traditional craftsmanship',
      category: 'bridal'
    }
  ];

  // Women collection recommendations
  const womenRecommendations = [
    {
      id: 1,
      name: 'Elegant Silver Ring',
      image: women1,
      price: 2500,
      offer: '17% OFF',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Beautiful silver ring with intricate design perfect for everyday wear',
      category: 'women'
    },
    {
      id: 2,
      name: 'Pearl Studded Earrings',
      image: women2,
      price: 3200,
      offer: '16% OFF',
      size: 'One Size',
      material: '925 Sterling Silver with Pearls',
      description: 'Elegant pearl earrings that add sophistication to any outfit',
      category: 'women'
    },
    {
      id: 3,
      name: 'Silver Bridal Set',
      image: women3,
      price: 8900,
      offer: '15% OFF',
      size: 'Complete Set',
      material: '925 Sterling Silver with Gemstones',
      description: 'Exquisite bridal jewelry set perfect for special occasions',
      category: 'women'
    },
    {
      id: 4,
      name: 'Traditional Bangles',
      image: women4,
      price: 4100,
      offer: '15% OFF',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Traditional silver bangles with beautiful patterns and designs',
      category: 'women'
    },
    {
      id: 5,
      name: 'Silver Ear Pins',
      image: women5,
      price: 1800,
      offer: '18% OFF',
      size: 'One Size',
      material: '925 Sterling Silver',
      description: 'Delicate ear pins with modern design for contemporary women',
      category: 'women'
    },
    {
      id: 6,
      name: 'Silver Pendant',
      image: women6,
      price: 3500,
      offer: '13% OFF',
      size: '18 inch chain',
      material: '925 Sterling Silver',
      description: 'Elegant pendant necklace with unique design and premium finish',
      category: 'women'
    },
    {
      id: 7,
      name: 'Silver Necklace Set',
      image: women7,
      price: 5500,
      offer: '15% OFF',
      size: 'Complete Set',
      material: '925 Sterling Silver',
      description: 'Complete necklace set with matching earrings for special occasions',
      category: 'women'
    },
    {
      id: 8,
      name: 'Silver Chain',
      image: women8,
      price: 2900,
      offer: '15% OFF',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Classic silver chain perfect for layering or wearing alone',
      category: 'women'
    }
  ];

  // Men's collection recommendations
  const menRecommendations = [
    {
      id: 1,
      name: 'Silver Ring',
      image: men1,
      price: 3500,
      offer: '17% OFF',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Classic silver ring with modern design perfect for everyday wear',
      category: 'men'
    },
    {
      id: 2,
      name: 'Silver Ring SG',
      image: men2,
      price: 4200,
      offer: '16% OFF',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Sophisticated silver ring with elegant finish for special occasions',
      category: 'men'
    },
    {
      id: 5,
      name: 'Silver Chain Bracelet',
      image: men5,
      price: 6800,
      offer: '15% OFF',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Robust chain bracelet with masculine appeal and durable construction',
      category: 'men'
    },
    {
      id: 8,
      name: 'Silver Chain',
      image: men8,
      price: 7200,
      offer: '18% OFF',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Heavy-duty silver chain with robust links for lasting durability',
      category: 'men'
    }
  ];

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
  const recommendedProducts = (product.category === 'women' || product.subcategory === 'women-payal' || product.subcategory === 'women-chains' || product.subcategory === 'women-bracelets' || product.subcategory === 'women-necklace' || product.subcategory === 'women-noserings')
    ? womenRecommendations.filter(item => item.id !== product.id).slice(0, 4)
    : (product.category === 'men' || product.subcategory === 'men-chains' || product.subcategory === 'men-bracelets' || product.subcategory === 'men-rings')
    ? menRecommendations.filter(item => item.id !== product.id).slice(0, 4)
    : (product.category === 'bridal' || (product.category === 'payal' && !product.subcategory) || (product.category === 'chains' && !product.subcategory) || (product.category === 'bracelets' && !product.subcategory) || (product.category === 'necklace' && !product.subcategory) || (product.category === 'noserings' && !product.subcategory))
    ? bridalRecommendations.filter(item => item.id !== product.id).slice(0, 4)
    : (product.category === 'lifestyle' || product.category === 'coins' || product.category === 'murthi' || product.category === 'decorative' || product.category === 'poojaitems' || product.category === 'livingroom')
    ? (product.category === 'coins' ? coinsRecommendations : 
       product.category === 'murthi' ? murthiRecommendations :
       product.category === 'decorative' ? decorativeRecommendations :
       product.category === 'poojaitems' ? poojaItemsRecommendations :
       product.category === 'livingroom' ? livingRoomRecommendations :
       lifestyleRecommendations).filter(item => item.id !== product.id).slice(0, 4)
    : product.category === 'gift'
    ? giftRecommendations.filter(item => item.id !== product.id).slice(0, 4)
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
              {product.video ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="product-video"
                >
                  <source src={product.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={product.image} alt={product.name} />
              )}
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
                onClick={handleAddToWishlist}
                style={{
                  background: isInWishlist(product.id) ? '#e74c3c' : 'transparent',
                  color: isInWishlist(product.id) ? 'white' : '#e74c3c',
                  border: '2px solid #e74c3c',
                  padding: '15px 30px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  flex: '1',
                  display: 'block',
                  visibility: 'visible',
                  opacity: '1',
                  minWidth: '180px',
                  minHeight: '50px'
                }}
                onMouseEnter={(e) => {
                  if (!isInWishlist(product.id)) {
                    e.target.style.background = '#e74c3c';
                    e.target.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isInWishlist(product.id)) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#e74c3c';
                  }
                }}
              >
                <Heart 
                  size={16} 
                  fill={isInWishlist(product.id) ? 'currentColor' : 'none'} 
                  className="me-2"
                />
                {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
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
