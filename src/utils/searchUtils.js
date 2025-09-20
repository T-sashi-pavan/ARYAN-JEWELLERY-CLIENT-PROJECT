import { useCallback, useState, useEffect } from 'react';

// Import all collection images
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
import women9 from '../ASSETS/womenCollections/women9.jpg';

import men1 from '../ASSETS/menCollections/men1.webp';
import men2 from '../ASSETS/menCollections/men2.jpg';
import men3 from '../ASSETS/menCollections/men3.jpg';
import men4 from '../ASSETS/menCollections/men4.jpg';
import men5 from '../ASSETS/menCollections/men5.jpg';
import men6 from '../ASSETS/menCollections/men6.jpg';
import men7 from '../ASSETS/menCollections/men7.jpg';
import men8 from '../ASSETS/menCollections/men8.jpg';
import men9 from '../ASSETS/menCollections/men9.jpg';

import coin1 from '../ASSETS/coinsCollections/coin1.jpg';
import coin2 from '../ASSETS/coinsCollections/coin2.jpg';
import coin3 from '../ASSETS/coinsCollections/coin3.jpg';
import coin4 from '../ASSETS/coinsCollections/coin4.jpg';
import coin5 from '../ASSETS/coinsCollections/coin5.jpg';
import coin6 from '../ASSETS/coinsCollections/coin6.jpg';

// Import murthi collection images
import murthi1 from '../ASSETS/murthiCollections/murthi1.jpg';
import murthi2 from '../ASSETS/murthiCollections/murthi2.jpg';
import murthi3 from '../ASSETS/murthiCollections/murthi3.jpg';
import murthi4 from '../ASSETS/murthiCollections/murthi4.jpg';

// Import women bracelets videos
import braceletVideo1 from '../ASSETS/womenCollections/womens braceletes/Bracelet_Video_Generation.mp4';
import braceletVideo2 from '../ASSETS/womenCollections/womens braceletes/Golden_Bracelet_D_Video_Showcase.mp4';
import braceletVideo3 from '../ASSETS/womenCollections/womens braceletes/Jewelry_Showcase_Video_Generation (4).mp4';
import braceletVideo4 from '../ASSETS/womenCollections/womens braceletes/Jewelry_Showcase_Video_Generation (5).mp4';
import braceletVideo5 from '../ASSETS/womenCollections/womens braceletes/Jewelry_Showcase_Video_Generation.mp4';
import braceletVideo6 from '../ASSETS/womenCollections/womens braceletes/Jewelry_Video_Generation.mp4';
import braceletVideo7 from '../ASSETS/womenCollections/womens braceletes/Realistic_Jewelry_Showcase_Video_Generation (2).mp4';
import braceletVideo8 from '../ASSETS/womenCollections/womens braceletes/Realistic_Jewelry_Showcase_Video_Generation (3).mp4';
import braceletVideo9 from '../ASSETS/womenCollections/womens braceletes/Realistic_Jewelry_Showcase_Video_Generation.mp4';

// Import women chains videos
import chainVideo1 from '../ASSETS/womenCollections/womens_chains/Jewelry_Showcase_Video_Gen_Chain.mp4';
import chainVideo2 from '../ASSETS/womenCollections/womens_chains/Luxury_Jewelry_Showcase_Video_Generated.mp4';
import chainVideo3 from '../ASSETS/womenCollections/womens_chains/Realistic_D_Necklace_Showcase_Video (2).mp4';
import chainVideo4 from '../ASSETS/womenCollections/womens_chains/Realistic_Silver_Necklace_D_Showcase.mp4';

// Import women rings videos
import ringVideo1 from '../ASSETS/womenCollections/women_rings/Elegant_Floral_Ring_Video_Generation.mp4';
import ringVideo2 from '../ASSETS/womenCollections/women_rings/gold ring.mp4';
import ringVideo3 from '../ASSETS/womenCollections/women_rings/Realistic_D_Ring_Video_Generation.mp4';

// Import women payal videos
import payalVideo1 from '../ASSETS/womenCollections/payal/Realistic_Silver_Anklet_Showcase_Video.mp4';

// Import women bangles videos
import banglesVideo1 from '../ASSETS/womenCollections/bangles/Realistic_Jewelry_Showcase_Video_Generation.mp4';
import banglesVideo2 from '../ASSETS/womenCollections/bangles/Realistic_Jewelry_Showcase_Video_Generation (2).mp4';
import banglesVideo3 from '../ASSETS/womenCollections/bangles/Realistic_Jewelry_Showcase_Video_Generation (3).mp4';

// Import women necklace videos
import necklaceVideo1 from '../ASSETS/womenCollections/necklace/necklace1.mp4';
import necklaceVideo2 from '../ASSETS/womenCollections/necklace/necklace2.mp4';

// Import coins videos
import coinVideo1 from '../ASSETS/coinsCollections/coins_videos/Realistic_Rotating_Coin_Showcase_Video.mp4';
import coinVideo2 from '../ASSETS/coinsCollections/coins_videos/Realistic_Rotating_Coin_Showcase_Video (3).mp4';
import coinVideo3 from '../ASSETS/coinsCollections/coins_videos/Ganesha_Idol_Showcase_Video_Generation.mp4';

// Import murthi/idol videos
import murthiVideo1 from '../ASSETS/murthiCollections/idol_videos/Realistic_D_Ganesh_Idol_Showcase.mp4';
import murthiVideo2 from '../ASSETS/murthiCollections/idol_videos/Silver_Ganesh_Idol_D_Showcase.mp4';
import murthiVideo3 from '../ASSETS/murthiCollections/idol_videos/Realistic_D_Idol_Showcase_Video.mp4';
import murthiVideo4 from '../ASSETS/murthiCollections/idol_videos/D_Idol_Showcase_Video_Generation.mp4';

// Consolidated product database
export const ALL_PRODUCTS = [
  // Bridal Collection
  {
    id: 'bridal-1',
    name: 'Royal Bridal Necklace Set',
    price: '₹25,000',
    originalPrice: '₹30,000',
    image: bridal1,
    category: 'bridal',
    subcategory: 'necklace',
    size: 'Complete Set',
    material: '925 Sterling Silver with Gemstones',
    description: 'Exquisite bridal necklace with matching earrings perfect for your special day',
    tags: ['bridal', 'necklace', 'set', 'royal', 'gemstones', 'wedding', 'traditional']
  },
  {
    id: 'bridal-2',
    name: 'Traditional Choker Set',
    price: '₹18,500',
    originalPrice: '₹22,000',
    image: bridal2,
    category: 'bridal',
    subcategory: 'necklace',
    size: 'Adjustable',
    material: '925 Sterling Silver',
    description: 'Classic choker design with traditional motifs and intricate craftsmanship',
    tags: ['bridal', 'choker', 'traditional', 'silver', 'set', 'wedding']
  },
  {
    id: 'bridal-3',
    name: 'Pearl Bridal Collection',
    price: '₹35,000',
    originalPrice: '₹40,000',
    image: bridal3,
    category: 'bridal',
    subcategory: 'necklace',
    size: 'Complete Set',
    material: '925 Sterling Silver with Pearls',
    description: 'Elegant pearl necklace set with timeless beauty for brides',
    tags: ['bridal', 'pearl', 'elegant', 'necklace', 'set', 'wedding', 'luxury']
  },
  {
    id: 'bridal-4',
    name: 'Heritage Bridal Set',
    price: '₹42,000',
    originalPrice: '₹48,000',
    image: bridal4,
    category: 'bridal',
    subcategory: 'necklace',
    size: 'Complete Set',
    material: '925 Sterling Silver with Gemstones',
    description: 'Traditional heritage design with modern craftsmanship for your special day',
    tags: ['bridal', 'heritage', 'traditional', 'gemstones', 'set', 'wedding']
  },
  {
    id: 'bridal-6',
    name: 'Elegant Bridal Chain',
    price: '₹15,500',
    originalPrice: '₹18,000',
    image: bridal6,
    category: 'bridal',
    subcategory: 'chains',
    size: 'Adjustable',
    material: '925 Sterling Silver',
    description: 'Delicate chain perfect for layering or standalone bridal look',
    tags: ['bridal', 'chain', 'elegant', 'delicate', 'layering', 'wedding']
  },
  {
    id: 'bridal-7',
    name: 'Royal Wedding Chain',
    price: '₹28,000',
    originalPrice: '₹32,000',
    image: bridal7,
    category: 'bridal',
    subcategory: 'chains',
    size: 'Multiple Lengths',
    material: '925 Sterling Silver with Gold Plating',
    description: 'Luxurious chain with royal design elements for grand celebrations',
    tags: ['bridal', 'royal', 'wedding', 'chain', 'luxury', 'gold', 'plating']
  },
  {
    id: 'bridal-8',
    name: 'Traditional Bridal Bracelet',
    price: '₹12,500',
    originalPrice: '₹15,000',
    image: bridal8,
    category: 'bridal',
    subcategory: 'bracelets',
    size: 'Adjustable',
    material: '925 Sterling Silver',
    description: 'Beautiful traditional bracelet with intricate patterns for brides',
    tags: ['bridal', 'bracelet', 'traditional', 'patterns', 'intricate', 'wedding']
  },
  {
    id: 'bridal-9',
    name: 'Classic Bridal Payal',
    price: '₹8,500',
    originalPrice: '₹10,000',
    image: bridal9,
    category: 'bridal',
    subcategory: 'payal',
    size: 'Adjustable',
    material: '925 Sterling Silver',
    description: 'Traditional ankle chain with melodious bells for bridal wear',
    tags: ['bridal', 'payal', 'ankle', 'bells', 'traditional', 'wedding']
  },

  // Women's Collection
  {
    id: 'women-1',
    name: 'Elegant Silver Ring',
    price: '₹2,500',
    originalPrice: '₹3,000',
    image: women1,
    category: 'women',
    subcategory: 'rings',
    size: 'Adjustable',
    material: '925 Sterling Silver',
    description: 'Beautiful silver ring with intricate design perfect for everyday wear',
    tags: ['women', 'ring', 'elegant', 'everyday', 'silver', 'adjustable']
  },
  {
    id: 'women-2',
    name: 'Pearl Studded Earrings',
    price: '₹3,200',
    originalPrice: '₹3,800',
    image: women2,
    category: 'women',
    subcategory: 'earrings',
    size: 'One Size',
    material: '925 Sterling Silver with Pearls',
    description: 'Elegant pearl earrings that add sophistication to any outfit',
    tags: ['women', 'earrings', 'pearl', 'elegant', 'sophisticated', 'silver']
  },
  {
    id: 'women-3',
    name: 'Silver Bridal Set',
    video: necklaceVideo1,
    image: women3,
    price: '₹15,000',
    originalPrice: '₹18,000',
    category: 'women',
    subcategory: 'necklace',
    size: 'Complete Set',
    material: '925 Sterling Silver',
    description: 'Complete bridal jewelry set for special occasions',
    tags: ['women', 'bridal', 'set', 'necklace', 'special', 'occasions', 'silver']
  },
  {
    id: 'women-4',
    name: 'Designer Chain Necklace',
    price: '₹4,500',
    originalPrice: '₹5,200',
    image: women4,
    category: 'women',
    subcategory: 'necklace',
    size: 'Adjustable',
    material: '925 Sterling Silver',
    description: 'Modern designer chain perfect for casual and formal wear',
    tags: ['women', 'designer', 'chain', 'necklace', 'modern', 'casual', 'formal']
  },
  {
    id: 'women-5',
    name: 'Women\'s Charm Bracelet',
    price: '₹3,800',
    originalPrice: '₹4,500',
    image: women5,
    category: 'women',
    subcategory: 'bracelets',
    size: 'Adjustable',
    material: '925 Sterling Silver',
    description: 'Stylish charm bracelet with multiple pendants for trendy look',
    tags: ['women', 'charm', 'bracelet', 'stylish', 'trendy', 'pendants']
  },
  {
    id: '6',
    name: 'Silver Pendant',
    video: necklaceVideo2,
    image: women6,
    price: '₹3,500',
    originalPrice: '₹4,000',
    category: 'necklace',
    subcategory: 'women-necklace',
    size: '18 inch chain',
    material: '925 Sterling Silver',
    description: 'Elegant pendant necklace with unique design and premium finish',
    tags: ['women', 'pendant', 'necklace', 'elegant', 'unique', 'premium', 'silver']
  },

  // Women's Bracelet Video Collection
  {
    id: '4',
    name: 'Traditional Gold Bracelet',
    video: braceletVideo1,
    image: women4,
    price: '₹4,100',
    originalPrice: '₹4,800',
    category: 'bracelets',
    subcategory: 'women-bracelets',
    size: 'Multiple Sizes',
    material: '925 Sterling Silver',
    description: 'Traditional silver bracelet with beautiful patterns and designs',
    tags: ['women', 'bracelet', 'traditional', 'patterns', 'silver', 'jewelry']
  },
  {
    id: '301',
    name: 'Golden Bracelet Showcase',
    video: braceletVideo2,
    image: women1,
    price: '₹2,500',
    originalPrice: '₹3,000',
    category: 'bracelets',
    subcategory: 'women-bracelets',
    size: 'Adjustable',
    material: '925 Sterling Silver',
    description: 'Elegant golden bracelet with premium finish and contemporary design',
    tags: ['women', 'bracelet', 'golden', 'elegant', 'contemporary', 'premium']
  },
  {
    id: '302',
    name: 'Designer Bracelet Collection',
    video: braceletVideo3,
    image: women3,
    price: '₹8,900',
    originalPrice: '₹10,500',
    category: 'bracelets',
    subcategory: 'women-bracelets',
    size: 'Complete Set',
    material: '925 Sterling Silver with Gemstones',
    description: 'Exquisite designer bracelet perfect for special occasions and events',
    tags: ['women', 'bracelet', 'designer', 'gemstones', 'special', 'occasions']
  },
  {
    id: '303',
    name: 'Luxury Jewelry Bracelet',
    video: braceletVideo4,
    image: women4,
    price: '₹5,200',
    originalPrice: '₹6,000',
    category: 'bracelets',
    subcategory: 'women-bracelets',
    size: 'One Size',
    material: '925 Sterling Silver',
    description: 'Luxury bracelet with intricate details and modern styling',
    tags: ['women', 'bracelet', 'luxury', 'intricate', 'modern', 'styling']
  },
  {
    id: '304',
    name: 'Classic Jewelry Showcase',
    video: braceletVideo5,
    image: women1,
    price: '₹3,800',
    originalPrice: '₹4,500',
    category: 'bracelets',
    subcategory: 'women-bracelets',
    size: 'Adjustable',
    material: '925 Sterling Silver',
    description: 'Classic bracelet design with timeless appeal and elegant finish',
    tags: ['women', 'bracelet', 'classic', 'timeless', 'elegant', 'silver']
  },
  {
    id: '305',
    name: 'Premium Jewelry Generation',
    video: braceletVideo6,
    image: women3,
    price: '₹6,500',
    originalPrice: '₹7,800',
    category: 'bracelets',
    subcategory: 'women-bracelets',
    size: 'Multiple Sizes',
    material: '925 Sterling Silver with Gold Accents',
    description: 'Premium bracelet with innovative design and superior craftsmanship',
    tags: ['women', 'bracelet', 'premium', 'innovative', 'craftsmanship', 'gold']
  },
  {
    id: '306',
    name: 'Realistic Jewelry Showcase',
    video: braceletVideo7,
    image: women4,
    price: '₹4,700',
    originalPrice: '₹5,500',
    category: 'bracelets',
    subcategory: 'women-bracelets',
    size: 'One Size',
    material: '925 Sterling Silver',
    description: 'Realistic jewelry design with contemporary patterns and premium quality',
    tags: ['women', 'bracelet', 'realistic', 'contemporary', 'premium', 'quality']
  },
  {
    id: '307',
    name: 'Elite Bracelet Collection',
    video: braceletVideo8,
    image: women1,
    price: '₹7,200',
    originalPrice: '₹8,500',
    category: 'bracelets',
    subcategory: 'women-bracelets',
    size: 'Adjustable',
    material: '925 Sterling Silver with Diamonds',
    description: 'Elite bracelet collection featuring premium materials and exquisite design',
    tags: ['women', 'bracelet', 'elite', 'diamonds', 'premium', 'exquisite']
  },
  {
    id: '308',
    name: 'Masterpiece Bracelet',
    video: braceletVideo9,
    image: women3,
    price: '₹9,100',
    originalPrice: '₹10,800',
    category: 'bracelets',
    subcategory: 'women-bracelets',
    size: 'Complete Set',
    material: '925 Sterling Silver with Precious Stones',
    description: 'Masterpiece bracelet showcasing artistic excellence and luxury craftsmanship',
    tags: ['women', 'bracelet', 'masterpiece', 'artistic', 'luxury', 'precious']
  },

  // Women's Chain Video Collection
  {
    id: '8',
    name: 'Jewelry Chain Showcase',
    video: chainVideo1,
    image: women8,
    price: '₹2,900',
    originalPrice: '₹3,400',
    category: 'chains',
    subcategory: 'women-chains',
    size: '20 inch',
    material: '925 Sterling Silver',
    description: 'Classic silver chain perfect for layering or wearing alone',
    tags: ['women', 'chain', 'jewelry', 'classic', 'silver', 'layering']
  },
  {
    id: '401',
    name: 'Luxury Chain Collection',
    video: chainVideo2,
    image: women2,
    price: '₹3,200',
    originalPrice: '₹3,800',
    category: 'chains',
    subcategory: 'women-chains',
    size: '18 inch',
    material: '925 Sterling Silver',
    description: 'Luxury chain with elegant design perfect for special occasions',
    tags: ['women', 'chain', 'luxury', 'elegant', 'special', 'occasions']
  },
  {
    id: '402',
    name: 'Realistic Necklace Design',
    video: chainVideo3,
    image: women4,
    price: '₹4,100',
    originalPrice: '₹4,800',
    category: 'chains',
    subcategory: 'women-chains',
    size: '22 inch',
    material: '925 Sterling Silver',
    description: 'Realistic necklace design with contemporary appeal and premium finish',
    tags: ['women', 'necklace', 'realistic', 'contemporary', 'premium', 'design']
  },
  {
    id: '403',
    name: 'Silver Necklace Premium',
    video: chainVideo4,
    image: women8,
    price: '₹5,200',
    originalPrice: '₹6,000',
    category: 'chains',
    subcategory: 'women-chains',
    size: '20 inch',
    material: '925 Sterling Silver with Premium Finish',
    description: 'Premium silver necklace with superior craftsmanship and luxury appeal',
    tags: ['women', 'necklace', 'premium', 'silver', 'craftsmanship', 'luxury']
  },

  // Women's Ring Video Collection
  {
    id: '1',
    name: 'Elegant Silver Ring',
    video: ringVideo1,
    image: women1,
    price: '₹2,500',
    originalPrice: '₹3,000',
    category: 'rings',
    subcategory: 'women-rings',
    size: 'Adjustable',
    material: '925 Sterling Silver',
    description: 'Beautiful silver ring with intricate design perfect for everyday wear',
    tags: ['women', 'ring', 'elegant', 'silver', 'intricate', 'everyday']
  },
  {
    id: '501',
    name: 'Golden Ring Collection',
    video: ringVideo2,
    image: women2,
    price: '₹3,500',
    originalPrice: '₹4,200',
    category: 'rings',
    subcategory: 'women-rings',
    size: 'Multiple Sizes',
    material: '925 Sterling Silver with Gold Plating',
    description: 'Beautiful golden ring with premium plating and elegant design',
    tags: ['women', 'ring', 'golden', 'premium', 'plating', 'elegant']
  },
  {
    id: '502',
    name: 'Realistic Ring Design',
    video: ringVideo3,
    image: women4,
    price: '₹4,200',
    originalPrice: '₹5,000',
    category: 'rings',
    subcategory: 'women-rings',
    size: 'Adjustable',
    material: '925 Sterling Silver',
    description: 'Realistic ring design with intricate details and modern styling',
    tags: ['women', 'ring', 'realistic', 'intricate', 'modern', 'styling']
  },

  // Women's Payal Collection
  {
    id: '9',
    name: 'Designer Anklets',
    video: payalVideo1,
    image: women9,
    price: '₹2,200',
    originalPrice: '₹2,700',
    category: 'payal',
    subcategory: 'women-payal',
    size: 'Adjustable',
    material: '925 Sterling Silver',
    description: 'Beautiful anklets with traditional charm and modern appeal',
    tags: ['women', 'payal', 'anklets', 'traditional', 'designer', 'silver']
  },

  // Women's Bangles Collection
  {
    id: '601',
    name: 'Realistic Bangles Showcase',
    video: banglesVideo1,
    image: women1,
    price: '₹3,200',
    originalPrice: '₹3,800',
    category: 'bangles',
    subcategory: 'women-bangles',
    size: 'Multiple Sizes',
    material: '925 Sterling Silver',
    description: 'Beautiful silver bangles with realistic design and premium finish',
    tags: ['women', 'bangles', 'realistic', 'silver', 'premium', 'jewelry']
  },
  {
    id: '602',
    name: 'Elegant Bangles Set',
    video: banglesVideo2,
    image: women2,
    price: '₹4,500',
    originalPrice: '₹5,200',
    category: 'bangles',
    subcategory: 'women-bangles',
    size: 'Set of 4',
    material: '925 Sterling Silver with Gold Plating',
    description: 'Elegant bangles set with intricate patterns and golden finish',
    tags: ['women', 'bangles', 'elegant', 'set', 'gold', 'plating']
  },
  {
    id: '603',
    name: 'Designer Bangles Collection',
    video: banglesVideo3,
    image: women3,
    price: '₹5,800',
    originalPrice: '₹6,800',
    category: 'bangles',
    subcategory: 'women-bangles',
    size: 'Set of 6',
    material: '925 Sterling Silver with Gemstones',
    description: 'Designer bangles collection with precious gemstones and artistic designs',
    tags: ['women', 'bangles', 'designer', 'gemstones', 'collection', 'artistic']
  },

  // Men's Collection
  {
    id: 'men-1',
    name: 'Silver Ring',
    price: '₹3,500',
    originalPrice: '₹4,200',
    image: men1,
    category: 'men',
    subcategory: 'rings',
    size: 'Multiple Sizes',
    material: '925 Sterling Silver',
    description: 'Classic silver ring with modern design perfect for everyday wear',
    tags: ['men', 'ring', 'classic', 'modern', 'everyday', 'silver']
  },
  {
    id: 'men-2',
    name: 'Silver Ring SG',
    price: '₹4,200',
    originalPrice: '₹5,000',
    image: men2,
    category: 'men',
    subcategory: 'rings',
    size: 'Multiple Sizes',
    material: '925 Sterling Silver',
    description: 'Sophisticated silver ring with elegant finish for special occasions',
    tags: ['men', 'ring', 'sophisticated', 'elegant', 'special', 'occasions']
  },
  {
    id: 'men-3',
    name: 'Silver Band Ring',
    price: '₹2,800',
    originalPrice: '₹3,300',
    image: men3,
    category: 'men',
    subcategory: 'rings',
    size: 'Multiple Sizes',
    material: '925 Sterling Silver',
    description: 'Simple band ring with clean lines for minimalist style',
    tags: ['men', 'band', 'ring', 'simple', 'minimalist', 'clean', 'silver']
  },
  {
    id: 'men-4',
    name: 'Men\'s Chain Necklace',
    price: '₹5,500',
    originalPrice: '₹6,500',
    image: men4,
    category: 'men',
    subcategory: 'chains',
    size: 'Multiple Lengths',
    material: '925 Sterling Silver',
    description: 'Sturdy chain necklace with masculine design for bold look',
    tags: ['men', 'chain', 'necklace', 'sturdy', 'masculine', 'bold']
  },
  {
    id: 'men-5',
    name: 'Designer Men\'s Bracelet',
    price: '₹4,800',
    originalPrice: '₹5,600',
    image: men5,
    category: 'men',
    subcategory: 'bracelets',
    size: 'Adjustable',
    material: '925 Sterling Silver',
    description: 'Stylish bracelet with unique pattern for fashion-forward men',
    tags: ['men', 'designer', 'bracelet', 'stylish', 'unique', 'fashion']
  },

  // Coins Collection
  {
    id: 'coin-1',
    name: 'Goddess Lakshmi Coin',
    video: coinVideo1,
    image: coin1,
    price: '₹1,500',
    originalPrice: '₹1,800',
    category: 'lifestyle',
    subcategory: 'coins',
    size: 'Standard',
    material: '925 Sterling Silver',
    description: 'Sacred coin featuring Goddess Lakshmi for prosperity and wealth',
    tags: ['coin', 'lakshmi', 'goddess', 'prosperity', 'wealth', 'sacred', 'silver']
  },
  {
    id: 'coin-2',
    name: 'Ganesha Silver Coin',
    video: coinVideo2,
    image: coin2,
    price: '₹1,200',
    originalPrice: '₹1,500',
    image: coin2,
    category: 'lifestyle',
    subcategory: 'coins',
    size: 'Standard',
    material: '925 Sterling Silver',
    description: 'Auspicious Ganesha coin for removing obstacles and bringing good luck',
    tags: ['coin', 'ganesha', 'auspicious', 'obstacles', 'luck', 'silver']
  },
  {
    id: 'coin-3',
    name: 'Om Sacred Coin',
    video: coinVideo3,
    image: coin3,
    price: '₹800',
    originalPrice: '₹1,000',
    category: 'lifestyle',
    subcategory: 'coins',
    size: 'Standard',
    material: '925 Sterling Silver',
    description: 'Sacred Om symbol coin for spiritual blessing and meditation',
    tags: ['coin', 'om', 'sacred', 'spiritual', 'blessing', 'meditation', 'silver']
  },
  {
    id: 'coin-4',
    name: 'Saraswati Wisdom Coin',
    price: '₹1,300',
    originalPrice: '₹1,600',
    image: coin4,
    category: 'lifestyle',
    subcategory: 'coins',
    size: 'Standard',
    material: '925 Sterling Silver',
    description: 'Goddess Saraswati coin for knowledge, wisdom and learning',
    tags: ['coin', 'saraswati', 'wisdom', 'knowledge', 'learning', 'goddess', 'silver']
  },
  {
    id: 'coin-5',
    name: 'Hanuman Power Coin',
    price: '₹1,100',
    originalPrice: '₹1,400',
    image: coin5,
    category: 'lifestyle',
    subcategory: 'coins',
    size: 'Standard',
    material: '925 Sterling Silver',
    description: 'Lord Hanuman coin for strength, courage and protection',
    tags: ['coin', 'hanuman', 'power', 'strength', 'courage', 'protection', 'silver']
  },
  {
    id: 'coin-6',
    name: 'Shiva Blessed Coin',
    price: '₹1,400',
    originalPrice: '₹1,700',
    image: coin6,
    category: 'lifestyle',
    subcategory: 'coins',
    size: 'Standard',
    material: '925 Sterling Silver',
    description: 'Lord Shiva coin for transformation and spiritual awakening',
    tags: ['coin', 'shiva', 'blessed', 'transformation', 'spiritual', 'awakening', 'silver']
  },

  // Murthi Collection
  {
    id: 'murthi-1',
    name: 'Silver Ganesh Murthi',
    video: murthiVideo1,
    image: murthi1,
    price: '₹15,000',
    originalPrice: '₹17,500',
    category: 'lifestyle',
    subcategory: 'murthi',
    size: '8 inch height',
    material: '925 Sterling Silver',
    description: 'Beautiful handcrafted silver Ganesh murthi for home temple and worship',
    tags: ['murthi', 'ganesh', 'handcrafted', 'temple', 'worship', 'silver', 'divine']
  },
  {
    id: 'murthi-2',
    name: 'Silver Krishna Murthi',
    video: murthiVideo2,
    image: murthi2,
    price: '₹18,500',
    originalPrice: '₹21,000',
    category: 'lifestyle',
    subcategory: 'murthi',
    size: '10 inch height',
    material: '925 Sterling Silver',
    description: 'Elegant silver Krishna murthi with intricate detailing for devotional purposes',
    tags: ['murthi', 'krishna', 'elegant', 'devotional', 'intricate', 'silver', 'divine']
  },
  {
    id: 'murthi-3',
    name: 'Silver Lakshmi Murthi',
    video: murthiVideo3,
    image: murthi3,
    price: '₹16,500',
    originalPrice: '₹19,000',
    category: 'lifestyle',
    subcategory: 'murthi',
    size: '9 inch height',
    material: '925 Sterling Silver',
    description: 'Divine silver Lakshmi murthi for prosperity and wealth',
    tags: ['murthi', 'lakshmi', 'divine', 'prosperity', 'wealth', 'silver', 'goddess']
  },
  {
    id: 'murthi-4',
    name: 'Silver Saraswati Murthi',
    video: murthiVideo4,
    image: murthi4,
    price: '₹17,200',
    originalPrice: '₹20,000',
    category: 'lifestyle',
    subcategory: 'murthi',
    size: '9.5 inch height',
    material: '925 Sterling Silver',
    description: 'Graceful silver Saraswati murthi for knowledge and wisdom',
    tags: ['murthi', 'saraswati', 'graceful', 'knowledge', 'wisdom', 'silver', 'goddess']
  }
];

// Debounce hook for search input
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Search function
export const searchProducts = (query, products = ALL_PRODUCTS) => {
  if (!query || query.trim() === '') {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  
  return products.filter(product => {
    // Search in name
    const nameMatch = product.name.toLowerCase().includes(searchTerm);
    
    // Search in description
    const descriptionMatch = product.description.toLowerCase().includes(searchTerm);
    
    // Search in category
    const categoryMatch = product.category.toLowerCase().includes(searchTerm);
    
    // Search in subcategory
    const subcategoryMatch = product.subcategory?.toLowerCase().includes(searchTerm);
    
    // Search in material
    const materialMatch = product.material.toLowerCase().includes(searchTerm);
    
    // Search in tags
    const tagsMatch = product.tags?.some(tag => 
      tag.toLowerCase().includes(searchTerm)
    );
    
    return nameMatch || descriptionMatch || categoryMatch || subcategoryMatch || materialMatch || tagsMatch;
  });
};

// Get search suggestions (first 5 results)
export const getSearchSuggestions = (query, products = ALL_PRODUCTS) => {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const results = searchProducts(query, products);
  return results.slice(0, 5); // Return only first 5 suggestions
};

// Filter products by category
export const filterByCategory = (products, category) => {
  if (!category) return products;
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

// Sort products by price
export const sortProductsByPrice = (products, order = 'asc') => {
  return [...products].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[₹,]/g, ''));
    const priceB = parseInt(b.price.replace(/[₹,]/g, ''));
    
    return order === 'asc' ? priceA - priceB : priceB - priceA;
  });
};

// Custom hook for search functionality
export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  useEffect(() => {
    if (debouncedSearchQuery) {
      setIsSearching(true);
      const results = searchProducts(debouncedSearchQuery);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);
  
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);
  
  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
    if (isSearchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isSearchOpen]);
  
  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  }, []);
  
  return {
    searchQuery,
    searchResults,
    isSearching,
    isSearchOpen,
    handleSearch,
    toggleSearch,
    closeSearch,
    setSearchQuery
  };
};