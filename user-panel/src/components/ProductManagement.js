import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProduct, getProductsByCategory } from '../utils/productAPI';
import './ProductManagement.css';

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteModal, setDeleteModal] = useState({ show: false, product: null });
  const [notification, setNotification] = useState('');

  // Load products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    try {
      const allProducts = getAllProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      setNotification('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.material.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  // Handle product deletion
  const handleDelete = async (product) => {
    try {
      await deleteProduct(product.id);
      setNotification(`Product "${product.name}" deleted successfully`);
      loadProducts(); // Reload products
      setDeleteModal({ show: false, product: null });
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error deleting product:', error);
      setNotification('Error deleting product: ' + error.message);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Format price for display
  const formatPrice = (price) => {
    if (typeof price === 'string') return price;
    return `₹${price.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="product-management-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-management-container">
      <div className="management-header">
        <div className="header-left">
          <h1>Product Management</h1>
          <p>Manage your jewelry collection</p>
        </div>
        <div className="header-actions">
          <Link to="/add-product" className="add-product-btn">
            + Add New Product
          </Link>
          <Link to="/" className="view-website-btn">
            View Website
          </Link>
        </div>
      </div>

      {notification && (
        <div className={`notification ${notification.includes('Error') ? 'error' : 'success'}`}>
          {notification}
        </div>
      )}

      <div className="management-controls">
        <div className="search-controls">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : 
                 category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>
        <div className="results-count">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">📦</div>
            <h3>No products found</h3>
            <p>{searchTerm || selectedCategory !== 'all' ? 
               'Try adjusting your search or filter' : 
               'Start by adding your first product'}</p>
            <Link to="/add-product" className="add-first-product-btn">
              Add Product
            </Link>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-badges">
                  <span className="category-badge">
                    {product.category}
                  </span>
                  {product.subcategory && (
                    <span className="subcategory-badge">
                      {product.subcategory}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-material">{product.material}</p>
                <div className="product-pricing">
                  <span className="current-price">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <p className="product-description">
                  {product.description.length > 100 
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </p>
                {product.tags && product.tags.length > 0 && (
                  <div className="product-tags">
                    {product.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                    {product.tags.length > 3 && (
                      <span className="tag more-tags">+{product.tags.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="product-actions">
                <Link 
                  to={`/product-detail/${product.id}`}
                  state={{ product }}
                  className="view-btn"
                >
                  View
                </Link>
                <Link 
                  to={`/edit-product/${product.id}`}
                  className="edit-btn"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setDeleteModal({ show: true, product })}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{deleteModal.product?.name}"?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                onClick={() => handleDelete(deleteModal.product)}
                className="confirm-delete-btn"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteModal({ show: false, product: null })}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;