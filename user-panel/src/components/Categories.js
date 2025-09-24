import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

// Import representative images from each collection
import bridalImage from '../ASSETS/bridalCollections/bridal1.jpg';
import womenImage from '../ASSETS/womenCollections/women1.jpg';
import menImage from '../ASSETS/menCollections/men1.webp';
import lifestyleImage from '../ASSETS/lifestyleCollections/lifestyle1.jpg';
import coinImage from '../ASSETS/coinsCollections/coin1.jpg';
import murthiImage from '../ASSETS/murthiCollections/murthi1.jpg';
import livingroomImage from '../ASSETS/livingroomCollections/livingroom1.jpg';
import poojaImage from '../ASSETS/poojaitemsCollections/poojaitems1.jpg';
import giftImage from '../ASSETS/giftCollections/gift1.jpg';
import decorativeImage from '../ASSETS/decorativeCollections/decorative1.jpg';

const Categories = () => {
  const scrollRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const directionRef = useRef(1);
  const isHoveredRef = useRef(false);

  const categories = [
    {
      id: 1,
      name: 'BRIDAL COLLECTION',
      image: bridalImage,
      link: '/bridal-collection'
    },
    {
      id: 2,
      name: 'WOMEN COLLECTION',
      image: womenImage,
      link: '/women-collection'
    },
    {
      id: 3,
      name: 'MEN\'S COLLECTION',
      image: menImage,
      link: '/mens-collection'
    },
    {
      id: 4,
      name: 'LIFESTYLE COLLECTION',
      image: lifestyleImage,
      link: '/lifestyle-collection'
    },
    {
      id: 5,
      name: 'COINS COLLECTION',
      image: coinImage,
      link: '/coins-collection'
    },
    {
      id: 6,
      name: 'MURTHI COLLECTION',
      image: murthiImage,
      link: '/murthi-collection'
    },
    {
      id: 7,
      name: 'LIVING ROOM COLLECTION',
      image: livingroomImage,
      link: '/livingroom-collection'
    },
    {
      id: 8,
      name: 'POOJA ITEMS COLLECTION',
      image: poojaImage,
      link: '/poojaitems-collection'
    },
    {
      id: 9,
      name: 'GIFT COLLECTION',
      image: giftImage,
      link: '/gift-collection'
    },
    {
      id: 10,
      name: 'DECORATIVE COLLECTION',
      image: decorativeImage,
      link: '/decorative-collection'
    }
  ];

  // Auto-scroll functionality with smooth animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    let startTime = null;
    const scrollSpeed = 0.5; // pixels per frame

    const smoothAutoScroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      
      if (isHoveredRef.current) {
        animationFrameId = requestAnimationFrame(smoothAutoScroll);
        return;
      }
      
      const scrollWidth = scrollContainer.scrollWidth;
      const containerWidth = scrollContainer.clientWidth;
      const maxScroll = scrollWidth - containerWidth;
      
      // Update scroll position smoothly
      scrollPositionRef.current += directionRef.current * scrollSpeed;
      
      // Check boundaries and reverse direction
      if (scrollPositionRef.current >= maxScroll) {
        scrollPositionRef.current = maxScroll;
        directionRef.current = -1;
      } else if (scrollPositionRef.current <= 0) {
        scrollPositionRef.current = 0;
        directionRef.current = 1;
      }
      
      // Apply scrolling without behavior: 'smooth' to avoid conflicts
      scrollContainer.scrollLeft = scrollPositionRef.current;
      
      animationFrameId = requestAnimationFrame(smoothAutoScroll);
    };

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      // Sync the reference position with actual scroll position
      scrollPositionRef.current = scrollContainer.scrollLeft;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      // Restart auto-scroll smoothly from current position
      scrollPositionRef.current = scrollContainer.scrollLeft;
    };

    // Add event listeners to the track instead of scroll container
    const categoryTrack = scrollContainer.querySelector('.categories-track');
    if (categoryTrack) {
      categoryTrack.addEventListener('mouseenter', handleMouseEnter);
      categoryTrack.addEventListener('mouseleave', handleMouseLeave);
    }

    // Initialize smooth auto-scroll using requestAnimationFrame
    animationFrameId = requestAnimationFrame(smoothAutoScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (categoryTrack) {
        categoryTrack.removeEventListener('mouseenter', handleMouseEnter);
        categoryTrack.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const scrollLeft = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    // Pause auto-scroll temporarily
    isHoveredRef.current = true;
    
    const cardWidth = 250 + 20; // card width + gap
    const currentScroll = scrollContainer.scrollLeft;
    const targetScroll = Math.max(0, currentScroll - cardWidth);
    
    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    // Update position reference and resume auto-scroll after animation
    setTimeout(() => {
      scrollPositionRef.current = scrollContainer.scrollLeft;
      isHoveredRef.current = false;
    }, 600);
  };

  const scrollRight = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    // Pause auto-scroll temporarily
    isHoveredRef.current = true;
    
    const cardWidth = 250 + 20; // card width + gap
    const currentScroll = scrollContainer.scrollLeft;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const targetScroll = Math.min(maxScroll, currentScroll + cardWidth);
    
    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    // Update position reference and resume auto-scroll after animation
    setTimeout(() => {
      scrollPositionRef.current = scrollContainer.scrollLeft;
      isHoveredRef.current = false;
    }, 600);
  };

  return (
    <div className="categories-section">
      <div className="categories-container">
        <div className="categories-header">
          <h2>CATEGORIES</h2>
          <div className="scroll-indicators">
            <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
            <button className="scroll-btn right" onClick={scrollRight}>›</button>
          </div>
        </div>
        
        <div className="categories-scroll" ref={scrollRef}>
          <div className="categories-track">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={category.link}
                className="category-card"
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                  <div className="category-overlay"></div>
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
