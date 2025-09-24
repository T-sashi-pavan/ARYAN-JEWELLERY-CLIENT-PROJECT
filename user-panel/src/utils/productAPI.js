// Product Management API for CRUD operations
import { ALL_PRODUCTS } from './searchUtils';

// In-memory storage for dynamic products (in a real app, this would be a database)
let dynamicProducts = [];

// Get unique ID for new products
const generateId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `product-${timestamp}-${random}`;
};

// Get all products (static + dynamic)
export const getAllProducts = () => {
  return [...ALL_PRODUCTS, ...dynamicProducts];
};

// Get product by ID
export const getProductById = (id) => {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === id);
};

// Create new product
export const createProduct = (productData) => {
  const newProduct = {
    id: generateId(),
    ...productData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  dynamicProducts.push(newProduct);
  return newProduct;
};

// Update existing product
export const updateProduct = (id, productData) => {
  const allProducts = getAllProducts();
  const productIndex = dynamicProducts.findIndex(product => product.id === id);
  
  if (productIndex !== -1) {
    // Update dynamic product
    dynamicProducts[productIndex] = {
      ...dynamicProducts[productIndex],
      ...productData,
      id, // Preserve original ID
      updatedAt: new Date().toISOString()
    };
    return dynamicProducts[productIndex];
  } else {
    // If it's a static product, create a copy in dynamic products
    const staticProduct = ALL_PRODUCTS.find(p => p.id === id);
    if (staticProduct) {
      const updatedProduct = {
        ...staticProduct,
        ...productData,
        id, // Preserve original ID
        updatedAt: new Date().toISOString()
      };
      dynamicProducts.push(updatedProduct);
      return updatedProduct;
    }
  }
  
  throw new Error('Product not found');
};

// Delete product
export const deleteProduct = (id) => {
  const productIndex = dynamicProducts.findIndex(product => product.id === id);
  
  if (productIndex !== -1) {
    const deletedProduct = dynamicProducts[productIndex];
    dynamicProducts.splice(productIndex, 1);
    return deletedProduct;
  }
  
  throw new Error('Product not found or cannot delete static product');
};

// Get products by category
export const getProductsByCategory = (category) => {
  const allProducts = getAllProducts();
  return allProducts.filter(product => product.category === category);
};

// Search products
export const searchProducts = (query) => {
  const allProducts = getAllProducts();
  const searchTerm = query.toLowerCase();
  
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.subcategory?.toLowerCase().includes(searchTerm) ||
    product.material.toLowerCase().includes(searchTerm) ||
    product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

// Category and subcategory definitions
export const CATEGORIES = {
  'bridal': ['necklace', 'earrings', 'bangles', 'rings', 'chains', 'bracelets', 'nose-rings', 'payal'],
  'women': ['necklace', 'earrings', 'bangles', 'rings', 'chains', 'bracelets', 'nose-rings', 'payal'],
  'men': ['chains', 'bracelets', 'rings'],
  'coins': ['gold-coins', 'silver-coins', 'commemorative'],
  'lifestyle': ['casual', 'formal', 'party', 'daily-wear'],
  'murthi': ['ganesha', 'krishna', 'shiva', 'lakshmi', 'saraswati'],
  'decorative': ['wall-hangings', 'figurines', 'frames', 'showpieces'],
  'gift': ['gift-sets', 'vouchers', 'combos'],
  'poojaitems': ['idols', 'diyas', 'plates', 'accessories'],
  'livingroom': ['artifacts', 'decorative-items', 'lighting'],
  'household': ['utensils', 'containers', 'sets']
};

export const MATERIALS = [
  '925 Sterling Silver',
  '925 Sterling Silver with Gold Plating',
  '925 Sterling Silver with Gemstones',
  '925 Sterling Silver with Pearls',
  'Gold Plated Silver',
  'Antique Silver',
  'Oxidized Silver',
  'Pure Silver'
];

// Validation helper
export const validateProduct = (productData) => {
  const errors = {};
  
  if (!productData.name || productData.name.trim().length < 2) {
    errors.name = 'Product name must be at least 2 characters long';
  }
  
  if (!productData.category) {
    errors.category = 'Category is required';
  }
  
  if (!productData.material) {
    errors.material = 'Material is required';
  }
  
  if (!productData.price || parseFloat(productData.price.replace(/[₹,]/g, '')) <= 0) {
    errors.price = 'Valid price is required';
  }
  
  if (!productData.image) {
    errors.image = 'Product image is required';
  }
  
  if (!productData.description || productData.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters long';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};