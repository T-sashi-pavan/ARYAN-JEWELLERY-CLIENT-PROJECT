import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  // Basic Product Information
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  
  // Unique identifier matching main website structure
  id: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  
  sku: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    uppercase: true
  },
  
  // Pricing (matching main website format)
  price: {
    type: String,
    required: [true, 'Price is required']
  },
  
  originalPrice: {
    type: String
  },
  
  // Category and Classification (matching main website)
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'bridal', 'women', 'men', 'coins', 'lifestyle', 
      'decorative', 'gift', 'poojaitems', 'livingroom', 'household', 'murthi'
    ]
  },
  
  subcategory: {
    type: String,
    enum: [
      'necklace', 'earrings', 'bangles', 'rings', 'chains', 
      'bracelets', 'nose-rings', 'payal', 'pendants', 
      'gold-coins', 'silver-coins', 'commemorative',
      'casual', 'formal', 'party', 'daily-wear',
      'wall-hangings', 'figurines', 'frames', 'showpieces',
      'gift-sets', 'vouchers', 'combos',
      'idols', 'diyas', 'plates', 'accessories',
      'artifacts', 'decorative-items', 'lighting',
      'utensils', 'containers', 'sets',
      'ganesha', 'krishna', 'shiva', 'lakshmi', 'saraswati'
    ]
  },
  
  // Images - store URLs/paths
  image: {
    type: String,
    required: [true, 'Main image is required']
  },
  
  additionalImages: [{
    type: String
  }],
  
  // Physical Properties
  size: {
    type: String,
    default: ''
  },
  
  material: {
    type: String,
    required: [true, 'Material is required'],
    enum: [
      '925 Sterling Silver',
      '925 Sterling Silver with Gold Plating',
      '925 Sterling Silver with Gemstones',
      '925 Sterling Silver with Pearls',
      'Gold Plated Silver',
      'Antique Silver',
      'Oxidized Silver',
      'Pure Silver'
    ]
  },
  
  // Additional properties for jewelry
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  
  purity: {
    type: String,
    default: ''
  },
  
  gemstones: {
    type: String,
    default: ''
  },
  
  certification: {
    type: String,
    default: ''
  },
  
  // Business fields
  makingCharges: {
    type: Number,
    min: [0, 'Making charges cannot be negative'],
    default: 0
  },
  
  wastagePercentage: {
    type: Number,
    min: [0, 'Wastage percentage cannot be negative'],
    max: [100, 'Wastage percentage cannot exceed 100'],
    default: 0
  },
  
  gst: {
    type: Number,
    min: [0, 'GST cannot be negative'],
    default: 18
  },
  
  discount: {
    type: Number,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100'],
    default: 0
  },
  
  // Description and tags
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Inventory and Status
  inStock: {
    type: Boolean,
    default: true
  },
  
  featured: {
    type: Boolean,
    default: false
  },
  
  quantity: {
    type: Number,
    min: [0, 'Quantity cannot be negative'],
    default: 1
  },
  
  // Technical fields
  barcode: {
    type: String,
    unique: true,
    sparse: true
  },
  
  // SEO and Search
  slug: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  },
  
  searchKeywords: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Analytics
  views: {
    type: Number,
    default: 0
  },
  
  sales: {
    type: Number,
    default: 0
  },
  
  // Timestamps
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ searchKeywords: 1 });
productSchema.index({ featured: 1, isActive: 1 });
productSchema.index({ createdAt: -1 });

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return this.price;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (!this.originalPrice) return 0;
  
  const price = parseInt(this.price.replace(/[₹,]/g, ''));
  const originalPrice = parseInt(this.originalPrice.replace(/[₹,]/g, ''));
  
  return Math.round(((originalPrice - price) / originalPrice) * 100);
});

// Pre-save middleware to generate ID and slug
productSchema.pre('save', function(next) {
  if (!this.id) {
    // Generate ID based on category and timestamp
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 4);
    this.id = `${this.category}-${timestamp}-${randomStr}`;
  }
  
  if (!this.slug && this.name) {
    // Generate unique slug from name
    const baseSlug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
    
    // Add timestamp to ensure uniqueness
    const timestamp = Date.now();
    this.slug = `${baseSlug}-${timestamp}`;
  }
  
  // Add category and subcategory to search keywords
  this.searchKeywords = [
    ...new Set([
      ...this.tags,
      this.category,
      this.subcategory,
      this.material.toLowerCase(),
      ...this.name.toLowerCase().split(' ')
    ].filter(keyword => keyword && keyword.length > 1))
  ];
  
  next();
});

// Static method to get products by category
productSchema.statics.getByCategory = function(category) {
  return this.find({ category, isActive: true }).sort({ featured: -1, createdAt: -1 });
};

// Static method to search products
productSchema.statics.search = function(query, options = {}) {
  const {
    category,
    subcategory,
    minPrice,
    maxPrice,
    material,
    inStock = true,
    featured,
    limit = 20,
    skip = 0,
    sort = { createdAt: -1 }
  } = options;
  
  const filter = { isActive: true };
  
  if (query) {
    filter.$or = [
      { name: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { tags: { $in: [new RegExp(query, 'i')] } },
      { searchKeywords: { $in: [new RegExp(query, 'i')] } }
    ];
  }
  
  if (category) filter.category = category;
  if (subcategory) filter.subcategory = subcategory;
  if (material) filter.material = material;
  if (typeof inStock === 'boolean') filter.inStock = inStock;
  if (typeof featured === 'boolean') filter.featured = featured;
  
  return this.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

// Instance method to update views
productSchema.methods.incrementViews = function() {
  return this.updateOne({ $inc: { views: 1 } });
};

// Instance method to update sales
productSchema.methods.incrementSales = function(quantity = 1) {
  return this.updateOne({ $inc: { sales: quantity } });
};

const Product = mongoose.model('Product', productSchema);

export default Product;