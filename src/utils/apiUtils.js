// API utility for the main website to fetch products from the admin backend
import { ALL_PRODUCTS } from './searchUtils.js';

const API_BASE_URL = 'http://localhost:5000/api/public';

// Fetch all products from the backend
export const fetchProductsFromAPI = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.subcategory) queryParams.append('subcategory', filters.subcategory);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.featured !== undefined) queryParams.append('featured', filters.featured);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.skip) queryParams.append('skip', filters.skip);
    
    const url = `${API_BASE_URL}/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    } else {
      console.error('Failed to fetch products:', data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching products from API:', error);
    return [];
  }
};

// Fetch a single product by ID
export const fetchProductByIdFromAPI = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    } else {
      console.error('Failed to fetch product:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching product from API:', error);
    return null;
  }
};

// Fetch categories with product counts
export const fetchCategoriesFromAPI = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    } else {
      console.error('Failed to fetch categories:', data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching categories from API:', error);
    return [];
  }
};

// Helper function to check if the API is available
export const checkAPIConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=1`);
    return response.ok;
  } catch (error) {
    console.error('API connection failed:', error);
    return false;
  }
};

// Fallback to static data if API is not available
export const getProducts = async (filters = {}) => {
  // First try to get data from API
  const apiProducts = await fetchProductsFromAPI(filters);
  
  if (apiProducts && apiProducts.length > 0) {
    return apiProducts;
  }
  
  // Fallback to static data
  console.log('Falling back to static product data');
  let products = [...ALL_PRODUCTS];
  
  // Apply filters to static data
  if (filters.category) {
    products = products.filter(p => p.category === filters.category);
  }
  if (filters.subcategory) {
    products = products.filter(p => p.subcategory === filters.subcategory);
  }
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description?.toLowerCase().includes(searchTerm) ||
      p.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  if (filters.featured !== undefined) {
    products = products.filter(p => p.featured === filters.featured);
  }
  
  // Apply pagination
  if (filters.skip) {
    products = products.slice(filters.skip);
  }
  if (filters.limit) {
    products = products.slice(0, filters.limit);
  }
  
  return products;
};

export const getProductById = async (id) => {
  // First try to get data from API
  const apiProduct = await fetchProductByIdFromAPI(id);
  
  if (apiProduct) {
    return apiProduct;
  }
  
  // Fallback to static data
  console.log('Falling back to static product data for ID:', id);
  return ALL_PRODUCTS.find(p => p.id === id);
};