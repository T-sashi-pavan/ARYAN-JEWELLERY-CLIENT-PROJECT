import express from 'express';
import { body, query, validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/auth.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All routes require authentication
router.use(authenticateToken);

// Configure multer for temporary file storage (then upload to Cloudinary)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../temp');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'temp-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, JPG, PNG, WEBP) are allowed'));
    }
  }
});

// Helper function to upload image to Cloudinary from file path
const uploadToCloudinary = async (filePath, publicId, options = {}) => {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Default upload options
    const defaultOptions = {
      folder: 'aryan-jewels/products',
      public_id: publicId,
      resource_type: 'image',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto:good' },
        { format: 'auto' } // Auto-optimize format
      ],
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      max_file_size: 10000000, // 10MB max
    };
    
    // Merge with any custom options
    const uploadOptions = { ...defaultOptions, ...options };
    
    console.log('📤 Uploading to Cloudinary:', {
      file: path.basename(filePath),
      folder: uploadOptions.folder,
      size: fs.statSync(filePath).size
    });
    
    const result = await cloudinary.uploader.upload(filePath, uploadOptions);
    
    console.log('✅ Cloudinary upload successful:', {
      url: result.secure_url,
      size: result.bytes,
      format: result.format
    });
    
    // Delete temporary file after upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('🗑️ Temporary file cleaned up');
    }
    
    return result;
  } catch (error) {
    console.error('❌ Cloudinary upload failed:', error.message);
    
    // Clean up temp file even if upload fails
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log('🗑️ Temporary file cleaned up after error');
      } catch (cleanupError) {
        console.error('❌ Failed to cleanup temp file:', cleanupError.message);
      }
    }
    
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

// Helper function to upload image from any local folder to Cloudinary
const uploadLocalImageToCloudinary = async (localImagePath, productName = 'product') => {
  try {
    // Check if file exists
    if (!fs.existsSync(localImagePath)) {
      throw new Error(`Local image file not found: ${localImagePath}`);
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomSuffix = Math.round(Math.random() * 1E9);
    const filename = `${productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${timestamp}-${randomSuffix}`;
    
    console.log('📤 Uploading local image to Cloudinary:', localImagePath);
    
    const result = await cloudinary.uploader.upload(localImagePath, {
      folder: 'aryan-jewels/products',
      public_id: filename,
      resource_type: 'image',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto:good' },
        { format: 'auto' }
      ],
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      max_file_size: 10000000, // 10MB max
    });
    
    console.log('✅ Local image uploaded to Cloudinary:', result.secure_url);
    return result;
    
  } catch (error) {
    console.error('❌ Failed to upload local image:', error.message);
    throw new Error(`Failed to upload image from ${localImagePath}: ${error.message}`);
  }
};

// Helper function to process form data
const processProductData = async (body, file) => {
  const data = { ...body };
  
  // Parse JSON fields
  if (data.tags && typeof data.tags === 'string') {
    try {
      data.tags = JSON.parse(data.tags);
    } catch (e) {
      data.tags = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
  }
  
  // Convert numeric fields (keep price and originalPrice as strings for model compatibility)
  const numberFields = ['weight', 'makingCharges', 'wastagePercentage', 'gst', 'discount', 'quantity'];
  numberFields.forEach(field => {
    if (data[field] !== undefined && data[field] !== '') {
      data[field] = parseFloat(data[field]) || 0;
    }
  });
  
  // Handle price fields as strings (required by model)
  const priceFields = ['price', 'originalPrice'];
  priceFields.forEach(field => {
    if (data[field] !== undefined && data[field] !== '') {
      // Remove any existing ₹ symbol and format consistently
      const cleanPrice = data[field].toString().replace(/[₹,]/g, '');
      const numericPrice = parseFloat(cleanPrice);
      if (!isNaN(numericPrice)) {
        data[field] = `₹${numericPrice}`;
      }
    }
  });
  
  // Convert boolean fields
  const booleanFields = ['inStock', 'featured'];
  booleanFields.forEach(field => {
    if (data[field] !== undefined) {
      data[field] = data[field] === 'true' || data[field] === true;
    }
  });
  
  // Handle unique fields - don't set them if empty to avoid null constraint violations
  if (!data.sku || data.sku.trim() === '') {
    delete data.sku;
  }
  
  // Generate unique SKU if not provided
  if (!data.sku) {
    const timestamp = Date.now();
    const categoryPrefix = data.category ? data.category.substring(0, 3).toUpperCase() : 'PRD';
    const randomSuffix = Math.random().toString(36).substring(2, 5).toUpperCase();
    data.sku = `${categoryPrefix}-${timestamp}-${randomSuffix}`;
  }
  
  // Generate unique slug from product name to avoid null constraint violations
  if (data.name) {
    const baseSlug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Add timestamp to ensure uniqueness
    const timestamp = Date.now();
    data.slug = `${baseSlug}-${timestamp}`;
  }
  
  // Process uploaded image (single image) - Upload to Cloudinary
  console.log('🔍 File validation - File object:', file ? 'exists' : 'missing');
  console.log('🔍 File details:', file ? { 
    fieldname: file.fieldname, 
    originalname: file.originalname, 
    mimetype: file.mimetype,
    size: file.size,
    path: file.path ? 'exists' : 'missing'
  } : 'No file object');
  
  if (file && file.path && fs.existsSync(file.path)) {
    try {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.mimetype)) {
        // Clean up temp file
        fs.unlinkSync(file.path);
        throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
      }
      
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        fs.unlinkSync(file.path);
        throw new Error('File size too large. Maximum size is 10MB.');
      }
      
      const filename = `product-${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const cloudinaryResult = await uploadToCloudinary(file.path, filename);
      data.image = cloudinaryResult.secure_url;
      console.log('✅ Image uploaded to Cloudinary:', data.image);
    } catch (error) {
      console.error('❌ Cloudinary upload error:', error);
      throw error; // Re-throw the original error (with better messaging)
    }
  } else {
    console.log('❌ No valid file found for upload');
    console.log('❌ File validation failed:', {
      fileExists: !!file,
      hasPath: file ? !!file.path : false,
      pathExists: file && file.path ? fs.existsSync(file.path) : false
    });
    throw new Error('Product image is required. Please select a valid image file and try again.');
  }
  
  // Remove any undefined or empty string values to prevent validation issues
  Object.keys(data).forEach(key => {
    if (data[key] === undefined || data[key] === '') {
      delete data[key];
    }
  });
  
  console.log('📝 Processed product data:', {
    name: data.name,
    sku: data.sku,
    image: data.image,
    price: data.price,
    category: data.category
  });
  
  return data;
};

// GET /api/products/stats - Get product statistics (moved before :id route)
router.get('/stats', async (req, res) => {
  try {
    const [
      totalProducts,
      activeProducts,
      featuredProducts,
      outOfStockProducts,
      categoryCounts
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Product.countDocuments({ featured: true, isActive: true }),
      Product.countDocuments({ inStock: false, isActive: true }),
      Product.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    ]);

    res.json({
      success: true,
      data: {
        totalProducts,
        activeProducts,
        featuredProducts,
        outOfStockProducts,
        categoryCounts
      }
    });
  } catch (error) {
    console.error('Error fetching product stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product statistics',
      error: error.message
    });
  }
});

// GET /api/products - Get all products with filtering and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1-100'),
  query('category').optional().isString(),
  query('subcategory').optional().isString(),
  query('search').optional().isString(),
  query('featured').optional().isBoolean(),
  query('inStock').optional().isBoolean(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 10,
      category,
      subcategory,
      search,
      featured,
      inStock,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const filter = { isActive: true };
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    // Apply filters
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (typeof featured === 'boolean') filter.featured = featured;
    if (typeof inStock === 'boolean') filter.inStock = inStock;

    // Apply search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
        { searchKeywords: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Product.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages,
          hasNext: parseInt(page) < totalPages,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// GET /api/products/deleted - Get deleted products
router.get('/deleted', async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const filter = { isActive: false };

    // Apply search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(filter)
      .sort({ updatedAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .lean();

    const totalProducts = await Product.countDocuments(filter);

    const pagination = {
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      hasNextPage: page < Math.ceil(totalProducts / limit),
      hasPrevPage: page > 1
    };

    res.json({
      success: true,
      data: {
        products,
        pagination
      }
    });
  } catch (error) {
    console.error('Error fetching deleted products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch deleted products',
      error: error.message
    });
  }
});

// GET /api/products/:id - Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🔍 Fetching product with ID:', id);
    
    let query;
    if (mongoose.Types.ObjectId.isValid(id)) {
      // If it's a valid ObjectId, search by _id or id field
      query = { 
        $or: [{ _id: id }, { id: id }],
        isActive: true 
      };
    } else {
      // If not a valid ObjectId, only search by id field
      query = { 
        id: id,
        isActive: true 
      };
    }
    
    console.log('🔍 Query:', query);
    
    const product = await Product.findOne(query);

    if (!product) {
      console.log('❌ Product not found');
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log('✅ Product found:', product.name);

    // Increment views
    await product.incrementViews();

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
});

// POST /api/products - Create new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('🔍 CREATE Product Request Details:');
    console.log('📝 Body fields:', Object.keys(req.body));
    console.log('📸 File info:', req.file ? {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    } : 'No file uploaded');
    console.log('🏷️ Product name:', req.body.name);
    console.log('💰 Product price:', req.body.price);
    console.log('📂 Category:', req.body.category);
    
    const productData = await processProductData(req.body, req.file);

    const product = new Product(productData);
    await product.save();

    console.log('✅ Product created successfully:', product.name);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('❌ Error creating product:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    // Clean up uploaded file if product creation fails
    if (req.file && req.file.path) {
      try {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
          console.log('🗑️ Cleaned up uploaded file after error');
        }
      } catch (cleanupError) {
        console.error('❌ Error cleaning up file:', cleanupError.message);
      }
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
        error: error
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`,
        error: error.message
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🔍 Updating product with ID:', id);
    
    let query;
    if (mongoose.Types.ObjectId.isValid(id)) {
      // If it's a valid ObjectId, search by _id or id field
      query = { 
        $or: [{ _id: id }, { id: id }]
      };
    } else {
      // If not a valid ObjectId, only search by id field
      query = { 
        id: id
      };
    }
    
    const product = await Product.findOne(query);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const productData = await processProductData(req.body, req.file);
    
    // If no new image uploaded, keep existing image
    if (!req.file && product.image) {
      productData.image = product.image;
    }
    
    // Update product
    Object.assign(product, productData);
    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    
    // Clean up uploaded file if update fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
});

// DELETE /api/products/:id - Delete product (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Handle bulk operations
    if (id === 'bulk') {
      return res.status(400).json({
        success: false,
        message: 'Use POST /api/products/bulk-delete for bulk operations'
      });
    }
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Soft delete
    product.isActive = false;
    await product.save();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
});

// POST /api/products/bulk-delete - Bulk delete products
router.post('/bulk-delete', [
  body('ids').isArray({ min: 1 }).withMessage('IDs array is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { ids } = req.body;

    const result = await Product.updateMany(
      { _id: { $in: ids } },
      { isActive: false }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} products deleted successfully`,
      data: { deletedCount: result.modifiedCount }
    });
  } catch (error) {
    console.error('Error bulk deleting products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete products',
      error: error.message
    });
  }
});

// POST /api/products/:id/restore - Restore deleted product
router.post('/:id/restore', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Product is already active'
      });
    }

    // Restore product
    product.isActive = true;
    await product.save();

    res.json({
      success: true,
      message: 'Product restored successfully'
    });
  } catch (error) {
    console.error('Error restoring product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to restore product',
      error: error.message
    });
  }
});

// POST /api/products/bulk-restore - Bulk restore products
router.post('/bulk-restore', [
  body('ids').isArray({ min: 1 }).withMessage('IDs array is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { ids } = req.body;

    const result = await Product.updateMany(
      { _id: { $in: ids }, isActive: false },
      { isActive: true }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} products restored successfully`,
      data: { restoredCount: result.modifiedCount }
    });
  } catch (error) {
    console.error('Error bulk restoring products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to restore products',
      error: error.message
    });
  }
});

// DELETE /api/products/:id/permanent - Permanently delete product
router.delete('/:id/permanent', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete associated images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        if (image.publicId) {
          try {
            await cloudinary.uploader.destroy(image.publicId);
            console.log(`Deleted image from Cloudinary: ${image.publicId}`);
          } catch (cloudinaryError) {
            console.error(`Failed to delete image from Cloudinary: ${image.publicId}`, cloudinaryError);
          }
        }
      }
    }

    // Permanently delete product
    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Product permanently deleted successfully'
    });
  } catch (error) {
    console.error('Error permanently deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to permanently delete product',
      error: error.message
    });
  }
});

// POST /api/products/bulk-permanent-delete - Bulk permanently delete products
router.post('/bulk-permanent-delete', [
  body('ids').isArray({ min: 1 }).withMessage('IDs array is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { ids } = req.body;

    // Get products to delete their images
    const products = await Product.find({ _id: { $in: ids } });
    
    // Delete associated images from Cloudinary
    for (const product of products) {
      if (product.images && product.images.length > 0) {
        for (const image of product.images) {
          if (image.publicId) {
            try {
              await cloudinary.uploader.destroy(image.publicId);
              console.log(`Deleted image from Cloudinary: ${image.publicId}`);
            } catch (cloudinaryError) {
              console.error(`Failed to delete image from Cloudinary: ${image.publicId}`, cloudinaryError);
            }
          }
        }
      }
    }

    // Permanently delete products
    const result = await Product.deleteMany({ _id: { $in: ids } });

    res.json({
      success: true,
      message: `${result.deletedCount} products permanently deleted successfully`,
      data: { deletedCount: result.deletedCount }
    });
  } catch (error) {
    console.error('Error bulk permanently deleting products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to permanently delete products',
      error: error.message
    });
  }
});

export default router;