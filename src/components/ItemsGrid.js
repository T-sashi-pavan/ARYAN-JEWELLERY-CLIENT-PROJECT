import React from 'react';
import { Link } from 'react-router-dom';
import './ItemsGrid.css';

// Import product images
import women1 from '../ASSETS/womenCollections/women1.jpg';
import women2 from '../ASSETS/womenCollections/women2.jpg';
import men1 from '../ASSETS/menCollections/men1.webp';
import bridal1 from '../ASSETS/bridalCollections/bridal1.jpg';
import lifestyle1 from '../ASSETS/lifestyleCollections/lifestyle1.jpg';
import lifestyle2 from '../ASSETS/lifestyleCollections/lifestyle2.webp';
import lifestyle4 from '../ASSETS/lifestyleCollections/lifestyle4.webp';
import lifestyle5 from '../ASSETS/lifestyleCollections/lifestyle5.jpg';

const ItemsGrid = () => {
  const items = [
    {
      id: 1,
      name: 'Women\'s Elegant Necklace',
      image: women1,
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
      image: women2,
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
      image: men1,
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
      image: bridal1,
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
      image: lifestyle1,
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
      image: lifestyle2,
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
      image: lifestyle4,
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
      image: lifestyle5,
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
                <img src={item.image} alt={item.name} />
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
