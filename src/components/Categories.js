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

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.clientWidth;
    let scrollPosition = 0;
    let direction = 1;

    const autoScroll = () => {
      scrollPosition += direction * 1.5; // Adjust speed here

      // Reverse direction when reaching ends
      if (scrollPosition >= scrollWidth - containerWidth) {
        direction = -1;
      } else if (scrollPosition <= 0) {
        direction = 1;
      }

      scrollContainer.scrollLeft = scrollPosition;
    };

    const scrollInterval = setInterval(autoScroll, 30); // Adjust frequency here

    // Pause auto-scroll on hover
    const handleMouseEnter = () => clearInterval(scrollInterval);
    const handleMouseLeave = () => {
      const newInterval = setInterval(autoScroll, 30);
      return newInterval;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(scrollInterval);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
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
