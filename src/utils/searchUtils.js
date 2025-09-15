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
    price: '₹15,000',
    originalPrice: '₹18,000',
    image: women3,
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
    price: '₹1,500',
    originalPrice: '₹1,800',
    image: coin1,
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
    price: '₹800',
    originalPrice: '₹1,000',
    image: coin3,
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