import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, getProductById, CATEGORIES, MATERIALS, validateProduct } from '../utils/productAPI';
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // For editing existing products
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    size: '',
    material: '',
    description: '',
    tags: '',
    image: null
  });
  
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  // Load product data for editing
  useEffect(() => {
    if (isEditing && id) {
      const product = getProductById(id);
      if (product) {
        setFormData({
          name: product.name || '',
          price: product.price?.replace('₹', '').replace(',', '') || '',
          originalPrice: product.originalPrice?.replace('₹', '').replace(',', '') || '',
          category: product.category || '',
          subcategory: product.subcategory || '',
          size: product.size || '',
          material: product.material || '',
          description: product.description || '',
          tags: product.tags?.join(', ') || '',
          image: null // Don't set file input, but show preview
        });
        setImagePreview(product.image || '');
      } else {
        setErrors({ general: 'Product not found' });
      }
    }
  }, [isEditing, id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Clear image error
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSubmitStatus('');

    try {
      // Prepare product data
      const productData = {
        name: formData.name.trim(),
        price: `₹${parseInt(formData.price).toLocaleString()}`,
        originalPrice: formData.originalPrice ? `₹${parseInt(formData.originalPrice).toLocaleString()}` : '',
        category: formData.category,
        subcategory: formData.subcategory,
        size: formData.size || 'One Size',
        material: formData.material,
        description: formData.description.trim(),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        image: imagePreview || formData.image // Use existing image for edits if no new image
      };

      // Validate data
      const validation = validateProduct(productData);
      if (!validation.isValid) {
        setErrors(validation.errors);
        setLoading(false);
        return;
      }

      // Create or update product
      let result;
      if (isEditing) {
        result = updateProduct(id, productData);
        setSubmitStatus('Product updated successfully!');
      } else {
        result = createProduct(productData);
        setSubmitStatus('Product created successfully!');
      }

      // Reset form for new products
      if (!isEditing) {
        setFormData({
          name: '',
          price: '',
          originalPrice: '',
          category: '',
          subcategory: '',
          size: '',
          material: '',
          description: '',
          tags: '',
          image: null
        });
        setImagePreview('');
      }

      // Navigate to product management page after a short delay
      setTimeout(() => {
        navigate('/product-management');
      }, 2000);
      
    } catch (error) {
      console.error('Error saving product:', error);
      setErrors({ general: error.message || 'Failed to save product' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <h1>{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
        <button 
          onClick={() => navigate('/product-management')} 
          className="back-btn"
        >
          ← Back to Products
        </button>
      </div>

      {errors.general && (
        <div className="error-message general-error">
          {errors.general}
        </div>
      )}

      {submitStatus && (
        <div className="success-message">
          {submitStatus}
        </div>
      )}

      <form onSubmit={handleSubmit} className="add-product-form">
        {/* Basic Information */}
        <div className="form-section">
          <h2>Basic Information</h2>
          
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter product name"
              required
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Current Price (₹) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={errors.price ? 'error' : ''}
                placeholder="25000"
                min="1"
                required
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="originalPrice">Original Price (₹)</label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                placeholder="30000"
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? 'error' : ''}
              placeholder="Enter detailed product description..."
              rows="4"
              required
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>
        </div>

        {/* Category & Specifications */}
        <div className="form-section">
          <h2>Category & Specifications</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={errors.category ? 'error' : ''}
                required
              >
                <option value="">Select Category</option>
                {Object.keys(CATEGORIES).map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
              {errors.category && <span className="error-text">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subcategory">Subcategory</label>
              <select
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                disabled={!formData.category}
              >
                <option value="">Select Subcategory</option>
                {formData.category && CATEGORIES[formData.category]?.map(subcat => (
                  <option key={subcat} value={subcat}>
                    {subcat.charAt(0).toUpperCase() + subcat.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="material">Material *</label>
              <select
                id="material"
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                className={errors.material ? 'error' : ''}
                required
              >
                <option value="">Select Material</option>
                {MATERIALS.map(material => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
              {errors.material && <span className="error-text">{errors.material}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="size">Size</label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                placeholder="e.g., Adjustable, 18 inches, Complete Set"
              />
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className="form-section">
          <h2>Product Image</h2>
          
          <div className="form-group">
            <label htmlFor="image">Product Image *</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className={errors.image ? 'error' : ''}
              required={!isEditing}
            />
            {errors.image && <span className="error-text">{errors.image}</span>}
            
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Product preview" />
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="form-section">
          <h2>Tags</h2>
          
          <div className="form-group">
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="e.g., bridal, necklace, traditional, luxury"
            />
            <small className="form-help">Add relevant tags separated by commas to help customers find this product</small>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product')}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/product-management')} 
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;