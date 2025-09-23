import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/public/products - Get all active products for the main website
router.get('/products', async (req, res) => {
  try {
    const {
      category,
      subcategory,
      search,
      featured,
      limit = 50,
      skip = 0
    } = req.query;

    console.log('Public API Query params:', { category, subcategory, search, featured });

    const filter = { isActive: true, inStock: true };

    // Apply filters
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (featured === 'true' || featured === true) filter.featured = true;

    console.log('MongoDB filter:', filter);

    // Apply search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
        { searchKeywords: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const products = await Product.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .select('-searchKeywords -views -sales -__v')
      .lean();

    console.log(`Found ${products.length} products matching filter`);
    if (products.length > 0) {
      console.log('Sample product:', {
        name: products[0].name,
        category: products[0].category,
        subcategory: products[0].subcategory
      });
    }

    // Transform products to match main website format
    const transformedProducts = products.map(product => {
      // Handle image URL - check if it's already a full URL (Cloudinary) or local path
      let imageUrl = '';
      if (product.image) {
        if (product.image.startsWith('https://') || product.image.startsWith('http://')) {
          // Already a full URL (Cloudinary or external)
          imageUrl = product.image;
        } else if (product.image.startsWith('/uploads/') || product.image.startsWith('/api/')) {
          // Local file path - add server URL
          imageUrl = `http://localhost:5000${product.image}`;
        } else {
          // Assume it's a relative path and add server URL
          imageUrl = `http://localhost:5000/${product.image}`;
        }
      }
      
      return {
        id: product.id || product._id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: imageUrl,
        category: product.category,
        subcategory: product.subcategory,
        size: product.size,
        material: product.material,
        description: product.description,
        tags: product.tags,
        inStock: product.inStock,
        featured: product.featured,
        sku: product.sku,
        slug: product.slug
      };
    });

    res.json({
      success: true,
      data: transformedProducts
    });
  } catch (error) {
    console.error('Error fetching public products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// GET /api/public/products/:id - Get product by ID for the main website
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ 
      $or: [{ _id: req.params.id }, { id: req.params.id }],
      isActive: true 
    }).select('-searchKeywords -__v');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment views
    await product.incrementViews();

    // Transform product to match main website format
    const transformedProduct = {
      id: product.id || product._id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image ? `http://localhost:5000${product.image}` : '',
      category: product.category,
      subcategory: product.subcategory,
      size: product.size,
      material: product.material,
      description: product.description,
      tags: product.tags,
      inStock: product.inStock,
      featured: product.featured,
      weight: product.weight,
      purity: product.purity,
      gemstones: product.gemstones
    };

    res.json({
      success: true,
      data: transformedProduct
    });
  } catch (error) {
    console.error('Error fetching public product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
});

// GET /api/public/categories - Get all categories with product counts
router.get('/categories', async (req, res) => {
  try {
    const categoryCounts = await Product.aggregate([
      { $match: { isActive: true, inStock: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: categoryCounts
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
});

export default router;