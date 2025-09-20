import React from 'react';
import { Link } from 'react-router-dom';
import './ItemsGrid.css';

// Import product videos
import womenVideo1 from '../ASSETS/womenCollections/women_rings/Realistic_D_Ring_Video_Generation.mp4';
import womenVideo2 from '../ASSETS/womenCollections/necklace/necklace2.mp4';
import menVideo1 from '../ASSETS/menCollections/mens_chains/Cinematic_Silver_Necklace_Video_Generation.mp4';
import bridalVideo from '../ASSETS/womenCollections/women_rings/gold ring.mp4'; // Default for bridal
import lifestyleVideo1 from '../ASSETS/womenCollections/womens braceletes/Golden_Bracelet_D_Video_Showcase.mp4';
import lifestyleVideo2 from '../ASSETS/womenCollections/women_rings/Elegant_Floral_Ring_Video_Generation.mp4';
import lifestyleVideo3 from '../ASSETS/womenCollections/necklace/necklace1.mp4';
import lifestyleVideo4 from '../ASSETS/womenCollections/payal/Realistic_Silver_Anklet_Showcase_Video.mp4';

const ItemsGrid = () => {
  const items = [
    {
      id: 1,
      name: 'Women\'s Elegant Necklace',
      video: womenVideo1,
      category: 'women',
      price: '₹2,500',
      originalPrice: '₹3,000',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Beautiful silver necklace perfect for special occasions'
    },
    {
      id: 2,
      name: 'Women\'s Pearl Earrings',
      video: womenVideo2,
      category: 'women',
      price: '₹1,800',
      originalPrice: '₹2,200',
      size: 'One Size',
      material: '925 Sterling Silver with Pearls',
      description: 'Elegant pearl earrings for a sophisticated look'
    },
    {
      id: 3,
      name: 'Men\'s Silver Chain',
      video: menVideo1,
      category: 'men',
      price: '₹3,500',
      originalPrice: '₹4,000',
      size: '20 inch',
      material: '925 Sterling Silver',
      description: 'Classic silver chain for men with modern design'
    },
    {
      id: 4,
      name: 'Bridal Collection Set',
      video: bridalVideo,
      category: 'bridal',
      price: '₹15,000',
      originalPrice: '₹18,000',
      size: 'Complete Set',
      material: '925 Sterling Silver with Gemstones',
      description: 'Exquisite bridal jewelry set for your special day'
    },
    {
      id: 5,
      name: 'Lifestyle Bracelet',
      video: lifestyleVideo1,
      category: 'lifestyle',
      price: '₹1,200',
      originalPrice: '₹1,500',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Trendy bracelet perfect for daily wear'
    },
    {
      id: 6,
      name: 'Modern Ring Set',
      video: lifestyleVideo2,
      category: 'lifestyle',
      price: '₹2,200',
      originalPrice: '₹2,800',
      size: 'Multiple Sizes',
      material: '925 Sterling Silver',
      description: 'Contemporary ring design for fashion lovers'
    },
    {
      id: 7,
      name: 'Designer Pendant',
      video: lifestyleVideo3,
      category: 'lifestyle',
      price: '₹1,800',
      originalPrice: '₹2,300',
      size: '18 inch chain',
      material: '925 Sterling Silver',
      description: 'Unique pendant design with intricate patterns'
    },
    {
      id: 8,
      name: 'Elegant Anklets',
      video: lifestyleVideo4,
      category: 'lifestyle',
      price: '₹900',
      originalPrice: '₹1,200',
      size: 'Adjustable',
      material: '925 Sterling Silver',
      description: 'Traditional anklets with melodious charms and elegant design'
    }
  ];

  return (
    <section className="items-grid-section">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="items-grid">
          {items.map((item) => (
            <Link 
              key={item.id} 
              to={`/product/${item.id}`} 
              state={{ product: item }}
              className="item-card"
            >
              <div className="item-image">
                <video 
                  src={item.video} 
                  alt={item.name}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={(e) => {
                    e.target.play().catch(() => {
                      // Handle autoplay failure silently
                    });
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div className="item-info">
                <h3 className="item-name">{item.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemsGrid;
