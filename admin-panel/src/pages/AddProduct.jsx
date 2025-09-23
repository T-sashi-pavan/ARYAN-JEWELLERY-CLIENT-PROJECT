import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { productsAPI } from '../services/api'
import toast from 'react-hot-toast'

const AddProduct = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
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
    inStock: true,
    featured: false,
    weight: '',
    purity: '',
    gemstones: '',
    certification: '',
    makingCharges: '',
    wastagePercentage: '',
    gst: '18',
    discount: '',
    sku: '',
    barcode: ''
  })
  
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  // Validation rules
  const validationRules = {
    name: { required: true, minLength: 2, maxLength: 100 },
    price: { required: true, min: 1, max: 10000000 },
    category: { required: true },
    material: { required: true },
    wastagePercentage: { min: 0, max: 100 },
    gst: { min: 0, max: 50 },
    weight: { min: 0, max: 10000 },
    makingCharges: { min: 0, max: 1000000 },
    originalPrice: { min: 0, max: 10000000 },
    discount: { min: 0, max: 100 }
  }

  // Validate individual field
  const validateField = (name, value) => {
    const rules = validationRules[name]
    if (!rules) return null

    if (rules.required && (!value || value.toString().trim() === '')) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rules.minLength} characters`
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must not exceed ${rules.maxLength} characters`
    }

    const numValue = parseFloat(value)
    if (rules.min !== undefined && numValue < rules.min) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rules.min}`
    }

    if (rules.max !== undefined && numValue > rules.max) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must not exceed ${rules.max}`
    }

    return null
  }

  // Categories and subcategories based on the main website structure
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

  // Create product mutation
  const createMutation = useMutation(productsAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('products')
      toast.success('Product created successfully!')
      navigate('/products')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create product')
      setIsSubmitting(false)
    }
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))

    // Real-time validation
    const error = validateField(name, newValue)
    setErrors(prev => ({
      ...prev,
      [name]: error
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
      
      // Clear any existing error
      setErrors(prev => ({
        ...prev,
        image: null
      }))
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Comprehensive client-side validation
      const newErrors = {}

      // Validate all fields
      Object.keys(validationRules).forEach(field => {
        const error = validateField(field, formData[field])
        if (error) newErrors[field] = error
      })

      // Special validations
      if (!image) {
        newErrors.image = 'Product image is required'
      }

      // Check if there are any errors
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        toast.error('Please fix the validation errors before submitting')
        setIsSubmitting(false)
        return
      }

      // Generate SKU if not provided
      let finalFormData = { ...formData }
      if (!finalFormData.sku || finalFormData.sku.trim() === '') {
        const timestamp = Date.now()
        const categoryPrefix = finalFormData.category ? finalFormData.category.substring(0, 3).toUpperCase() : 'PRD'
        const randomSuffix = Math.random().toString(36).substring(2, 5).toUpperCase()
        finalFormData.sku = `${categoryPrefix}-${timestamp}-${randomSuffix}`
        console.log('🏷️ Generated SKU:', finalFormData.sku)
      }

      // Create FormData for file upload
      const data = new FormData()
      
      console.log('🔍 Frontend Debug - Creating FormData:')
      console.log('📸 Image file:', image ? {
        name: image.name,
        size: image.size,
        type: image.type,
        lastModified: image.lastModified
      } : 'No image selected')
      
      // Add all form fields with proper type conversion
      Object.keys(finalFormData).forEach(key => {
        if (key === 'tags') {
          // Convert tags string to array
          const tagsArray = finalFormData[key].split(',').map(tag => tag.trim()).filter(tag => tag)
          data.append(key, JSON.stringify(tagsArray))
        } else if (key === 'price' || key === 'originalPrice') {
          // Format price fields with ₹ symbol for consistency with main website
          if (finalFormData[key] !== '') {
            data.append(key, `₹${parseFloat(finalFormData[key]) || 0}`)
          }
        } else if (['weight', 'makingCharges', 'wastagePercentage', 'gst', 'discount'].includes(key)) {
          // Convert numeric fields to numbers, but only if they have values
          if (finalFormData[key] !== '') {
            data.append(key, parseFloat(finalFormData[key]) || 0)
          }
        } else if (['inStock', 'featured'].includes(key)) {
          // Convert boolean fields
          data.append(key, finalFormData[key])
        } else {
          // String fields - only add if not empty
          if (finalFormData[key] !== '' && finalFormData[key] !== undefined) {
            data.append(key, finalFormData[key])
          }
        }
      })
      
      // Add image (single image with field name 'image')
      if (image) {
        data.append('image', image)
        console.log('✅ Image added to FormData with field name "image"')
      } else {
        console.log('❌ No image to add to FormData')
      }
      
      // Debug: Log FormData contents
      console.log('📦 FormData contents:')
      for (let [key, value] of data.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`)
        } else {
          console.log(`  ${key}: ${value}`)
        }
      }

      await createMutation.mutateAsync(data)
      toast.success('Product created successfully!')
      navigate('/products')
    } catch (error) {
      console.error('Error creating product:', error)
      
      // Handle validation errors from backend
      if (error.response?.data) {
        const errorData = error.response.data
        
        if (errorData.errors && Array.isArray(errorData.errors)) {
          // Multiple validation errors
          errorData.errors.forEach(err => toast.error(err))
        } else if (errorData.message) {
          // Single error message
          toast.error(errorData.message)
        } else if (errorData.error) {
          if (typeof errorData.error === 'string') {
            toast.error(errorData.error)
          } else if (errorData.error.errors) {
            // Handle mongoose validation errors
            const validationErrors = errorData.error.errors
            const firstError = Object.values(validationErrors)[0]
            toast.error(firstError?.message || 'Validation error occurred')
          } else {
            toast.error('Failed to create product')
          }
        } else {
          toast.error('Failed to create product')
        }
      } else {
        toast.error('Failed to create product. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            to="/products"
            className="text-gray-400 hover:text-gray-500"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600">Create a new jewelry product</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Basic Information</h2>
              </div>
              <div className="card-body space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${errors.name ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="Enter product name"
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">SKU</label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className={`form-input ${errors.sku ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="Product SKU"
                    />
                    {errors.sku && (
                      <p className="mt-1 text-sm text-red-600">{errors.sku}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className={`form-input ${errors.description ? 'border-red-300 focus:ring-red-500' : ''}`}
                    placeholder="Product description"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>
                
                <div>
                  <label className="form-label">Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className={`form-input ${errors.tags ? 'border-red-300 focus:ring-red-500' : ''}`}
                    placeholder="e.g., bridal, necklace, traditional, luxury"
                  />
                  {errors.tags && (
                    <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Category & Specifications */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Category & Specifications</h2>
              </div>
              <div className="card-body space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`form-input ${errors.category ? 'border-red-300 focus:ring-red-500' : ''}`}
                      required
                    >
                      <option value="">Select Category</option>
                      {Object.keys(categories).map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Subcategory</label>
                    <select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleInputChange}
                      className={`form-input ${errors.subcategory ? 'border-red-300 focus:ring-red-500' : ''}`}
                      disabled={!formData.category}
                    >
                      <option value="">Select Subcategory</option>
                      {formData.category && categories[formData.category]?.map(subcat => (
                        <option key={subcat} value={subcat}>
                          {subcat.charAt(0).toUpperCase() + subcat.slice(1).replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                    {errors.subcategory && (
                      <p className="mt-1 text-sm text-red-600">{errors.subcategory}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Material *</label>
                    <select
                      name="material"
                      value={formData.material}
                      onChange={handleInputChange}
                      className={`form-input ${errors.material ? 'border-red-300 focus:ring-red-500' : ''}`}
                      required
                    >
                      <option value="">Select Material</option>
                      {materials.map(material => (
                        <option key={material} value={material}>{material}</option>
                      ))}
                    </select>
                    {errors.material && (
                      <p className="mt-1 text-sm text-red-600">{errors.material}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Size</label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className={`form-input ${errors.size ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="e.g., Adjustable, 18 inches, Complete Set"
                    />
                    {errors.size && (
                      <p className="mt-1 text-sm text-red-600">{errors.size}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="form-label">Weight (grams)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className={`form-input ${errors.weight ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="0.00"
                    />
                    {errors.weight && (
                      <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Purity</label>
                    <input
                      type="text"
                      name="purity"
                      value={formData.purity}
                      onChange={handleInputChange}
                      className={`form-input ${errors.purity ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="e.g., 925, 999"
                    />
                    {errors.purity && (
                      <p className="mt-1 text-sm text-red-600">{errors.purity}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Gemstones</label>
                    <input
                      type="text"
                      name="gemstones"
                      value={formData.gemstones}
                      onChange={handleInputChange}
                      className={`form-input ${errors.gemstones ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="e.g., Ruby, Diamond"
                    />
                    {errors.gemstones && (
                      <p className="mt-1 text-sm text-red-600">{errors.gemstones}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Pricing</h2>
              </div>
              <div className="card-body space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Selling Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className={`form-input ${errors.price ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="25000"
                      required
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Original Price (₹)</label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      className={`form-input ${errors.originalPrice ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="30000"
                    />
                    {errors.originalPrice && (
                      <p className="mt-1 text-sm text-red-600">{errors.originalPrice}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="form-label">Making Charges (₹)</label>
                    <input
                      type="number"
                      name="makingCharges"
                      value={formData.makingCharges}
                      onChange={handleInputChange}
                      className={`form-input ${errors.makingCharges ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="2000"
                    />
                    {errors.makingCharges && (
                      <p className="mt-1 text-sm text-red-600">{errors.makingCharges}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Wastage (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      name="wastagePercentage"
                      value={formData.wastagePercentage}
                      onChange={handleInputChange}
                      className={`form-input ${errors.wastagePercentage ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="10"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter percentage (0-100)</p>
                    {errors.wastagePercentage && (
                      <p className="mt-1 text-sm text-red-600">{errors.wastagePercentage}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">GST (%)</label>
                    <input
                      type="number"
                      min="0"
                      name="gst"
                      value={formData.gst}
                      onChange={handleInputChange}
                      className={`form-input ${errors.gst ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="18"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter GST percentage (typically 3, 5, 12, 18, or 28)</p>
                    {errors.gst && (
                      <p className="mt-1 text-sm text-red-600">{errors.gst}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Image */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Product Image *</h2>
                <p className="text-sm text-gray-500">One image is required</p>
              </div>
              <div className="card-body space-y-4">
                <div className="dropzone">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                    id="image"
                  />
                  <label htmlFor="image" className="dropzone-label">
                    <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-primary-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                  </label>
                </div>
                
                {errors.image && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="font-medium">Image Upload Error</p>
                    <p>{errors.image}</p>
                  </div>
                )}
                
                {!image && !errors.image && (
                  <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <p className="font-medium">No image uploaded</p>
                    <p>Please add a product image to continue.</p>
                  </div>
                )}
                
                {imagePreview && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">Image Preview</h4>
                    <div className="relative image-preview max-w-xs">
                      <img src={imagePreview} alt="Product preview" className="w-full h-32 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Status */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Product Status</h2>
              </div>
              <div className="card-body space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
                    In Stock
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                    Featured Product
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting ? 'Creating Product...' : 'Create Product'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProduct