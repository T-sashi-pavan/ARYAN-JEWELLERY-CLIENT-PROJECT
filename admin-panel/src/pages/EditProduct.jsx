import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { productsAPI } from '../services/api'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  // Simplified form data with only essential fields
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    material: '',
    description: '',
    inStock: true,
    featured: false
  })
  
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [currentImage, setCurrentImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch existing product data
  const { data: productData, isLoading: isLoadingProduct, error: productError } = useQuery(
    ['product', id],
    () => productsAPI.getById(id),
    {
      enabled: !!id
    }
  )

  // Pre-fill form data when product data is loaded
  useEffect(() => {
    if (productData) {
      console.log('✅ Product data received:', productData)
      const product = productData.data || productData
      
      console.log('🔄 Pre-filling form with product data:', product)
      
      // Pre-fill form with existing data
      setFormData({
        name: product.name || '',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        category: product.category || '',
        subcategory: product.subcategory || '',
        material: product.material || '',
        description: product.description || '',
        inStock: product.inStock ?? true,
        featured: product.featured ?? false
      })
      
      // Set current image
      if (product.image) {
        setCurrentImage(product.image)
        console.log('🖼️ Current image set:', product.image)
      }
      
      console.log('✅ Form pre-filled successfully with:', {
        name: product.name,
        category: product.category,
        price: product.price,
        material: product.material
      })
    }
  }, [productData])

  // Handle product loading error
  useEffect(() => {
    if (productError) {
      toast.error('❌ Failed to load product data')
      console.error('❌ Error loading product:', productError)
    }
  }, [productError])

  // Simple categories and subcategories
  const categories = {
    'bridal': ['necklace', 'payal', 'chains', 'nose-rings', 'bracelets'],
    'women': ['necklace', 'earrings', 'bangles', 'rings', 'chains', 'bracelets', 'nose-rings', 'payal'],
    'men': ['chains', 'bracelets', 'rings', 'pendants'],
    'coins': ['gold-coins', 'silver-coins', 'commemorative'],
    'lifestyle': ['casual', 'formal', 'party', 'daily-wear'],
    'murthi': ['ganesha', 'krishna', 'shiva', 'lakshmi', 'saraswati'],
    'decorative': ['wall-hangings', 'figurines', 'frames', 'showpieces'],
    'gift': ['gift-sets', 'vouchers', 'combos'],
    'poojaitems': ['idols', 'diyas', 'plates', 'accessories'],
    'livingroom': ['artifacts', 'decorative-items', 'lighting'],
    'household': ['utensils', 'containers', 'accessories']
  }

  const materials = [
    '925 Sterling Silver',
    '925 Sterling Silver with Gold Plating',
    '925 Sterling Silver with Gemstones',
    '925 Sterling Silver with Pearls',
    'Gold Plated Silver',
    'Antique Silver',
    'Oxidized Silver',
    'Pure Silver'
  ]

  // Update product mutation
  const updateMutation = useMutation(
    (data) => productsAPI.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products')
        queryClient.invalidateQueries(['product', id])
        toast.success('✅ Product updated successfully!')
        navigate('/products')
      },
      onError: (error) => {
        const message = error.response?.data?.message || 'Failed to update product'
        toast.error(`❌ ${message}`)
        setIsSubmitting(false)
        console.error('❌ Update error:', error)
      }
    }
  )

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.category || !formData.material) {
      toast.error('❌ Please fill in required fields: Name, Price, Category, Material')
      return
    }

    setIsSubmitting(true)
    console.log('🔄 Updating product with data:', formData)

    try {
      // Prepare form data for submission
      const submitData = new FormData()
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key])
      })

      // Add image if selected
      if (image) {
        submitData.append('image', image)
      }

      await updateMutation.mutateAsync(submitData)
    } catch (error) {
      console.error('❌ Submit error:', error)
    }
  }

  if (isLoadingProduct) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
        <span className="ml-3 text-gray-600">🔄 Loading product data to pre-fill form...</span>
      </div>
    )
  }

  if (productError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Link to="/products" className="text-gray-400 hover:text-gray-500">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        </div>
        <div className="card">
          <div className="card-body text-center py-12">
            <p className="text-red-600">Failed to load product data. Please try again.</p>
            <Link to="/products" className="btn-primary mt-4">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Link to="/products" className="text-gray-400 hover:text-gray-500">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">ID: {id}</span>
      </div>

      {/* Simple Form - Essential Fields Only */}
      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">📝 Edit Product Details</h3>
            <p className="text-sm text-gray-600">Update essential product information</p>
            {/* Debug: Show if form is pre-filled */}
            {formData.name && (
              <p className="text-xs text-green-600 mt-1">
                ✅ Form pre-filled with: {formData.name} | {formData.category} | {formData.price}
              </p>
            )}
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="input"
                  required
                >
                  <option value="">Select Category</option>
                  {Object.keys(categories).map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory */}
              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory
                </label>
                <select
                  id="subcategory"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="input"
                  disabled={!formData.category}
                >
                  <option value="">Select Subcategory</option>
                  {formData.category && categories[formData.category]?.map(subcat => (
                    <option key={subcat} value={subcat}>
                      {subcat.charAt(0).toUpperCase() + subcat.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Material */}
              <div>
                <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">
                  Material *
                </label>
                <select
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  className="input"
                  required
                >
                  <option value="">Select Material</option>
                  {materials.map(material => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="₹15,000"
                  required
                />
              </div>

              {/* Original Price */}
              <div>
                <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price
                </label>
                <input
                  type="text"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="₹18,000"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter product description"
                />
              </div>

              {/* Product Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                
                {/* Current Image Display */}
                {currentImage && !imagePreview && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Current Image:</p>
                    <img
                      src={currentImage}
                      alt="Current product"
                      className="h-24 w-24 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">New Image Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-24 w-24 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}

                {/* Upload Input */}
                <div className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <PhotoIcon className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> new image
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              {/* Status Checkboxes */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    id="inStock"
                    name="inStock"
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
                    In Stock
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                    Featured Product
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <Link to="/products" className="btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    🔄 Updating...
                  </>
                ) : (
                  '✅ Update Product'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditProduct