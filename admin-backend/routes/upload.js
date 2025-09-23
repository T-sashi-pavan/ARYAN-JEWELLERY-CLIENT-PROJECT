import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { authenticateToken } from '../middleware/auth.js';
import {
  uploadMultiple,
  uploadSingle,
  handleMulterError,
  setUploadType,
  deleteFile,
  getFileUrl
} from '../middleware/upload.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All routes require authentication
router.use(authenticateToken);

// @route   POST /api/upload/product-images
// @desc    Upload multiple product images
// @access  Private
router.post('/product-images', 
  setUploadType('product'),
  uploadMultiple('images'),
  handleMulterError,
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No files uploaded'
        });
      }

      // Process uploaded files
      const uploadedImages = req.files.map((file, index) => ({
        url: getFileUrl(req, file.path.replace(/\\/g, '/')),
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        alt: `Product image ${index + 1}`,
        isPrimary: index === 0 // First image is primary by default
      }));

      res.json({
        success: true,
        message: `${uploadedImages.length} image(s) uploaded successfully`,
        data: {
          images: uploadedImages
        }
      });

    } catch (error) {
      console.error('Upload product images error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during upload'
      });
    }
  }
);

// @route   POST /api/upload/single-image
// @desc    Upload single image
// @access  Private
router.post('/single-image',
  setUploadType('product'),
  uploadSingle('image'),
  handleMulterError,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const uploadedImage = {
        url: getFileUrl(req, req.file.path.replace(/\\/g, '/')),
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        alt: req.body.alt || 'Product image',
        isPrimary: req.body.isPrimary === 'true' || false
      };

      res.json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          image: uploadedImage
        }
      });

    } catch (error) {
      console.error('Upload single image error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during upload'
      });
    }
  }
);

// @route   DELETE /api/upload/delete-image/:filename
// @desc    Delete uploaded image
// @access  Private
router.delete('/delete-image/:filename', async (req, res) => {
  try {
    const { filename } = req.params;

    // Validate filename to prevent directory traversal
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid filename'
      });
    }

    // Construct file path
    const filePath = path.join(__dirname, '../uploads/products', filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Delete file
    await deleteFile(filePath);

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during deletion'
    });
  }
});

// @route   GET /api/upload/images
// @desc    Get list of uploaded images
// @access  Private
router.get('/images', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads/products');
    
    if (!fs.existsSync(uploadsDir)) {
      return res.json({
        success: true,
        data: {
          images: []
        }
      });
    }

    // Read directory
    const files = fs.readdirSync(uploadsDir);
    
    // Filter image files and get their info
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const images = files
      .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
      .map(file => {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        
        return {
          filename: file,
          url: getFileUrl(req, `uploads/products/${file}`),
          size: stats.size,
          createdAt: stats.ctime,
          modifiedAt: stats.mtime
        };
      })
      .sort((a, b) => b.createdAt - a.createdAt); // Sort by creation date, newest first

    res.json({
      success: true,
      data: {
        images,
        total: images.length
      }
    });

  } catch (error) {
    console.error('Get images error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/upload/cleanup-unused
// @desc    Clean up unused uploaded files
// @access  Private
router.post('/cleanup-unused', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads/products');
    
    if (!fs.existsSync(uploadsDir)) {
      return res.json({
        success: true,
        message: 'No files to clean up',
        data: { deletedCount: 0 }
      });
    }

    // Get all uploaded files
    const files = fs.readdirSync(uploadsDir);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const imageFiles = files.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    if (imageFiles.length === 0) {
      return res.json({
        success: true,
        message: 'No image files to clean up',
        data: { deletedCount: 0 }
      });
    }

    // This is a simplified cleanup - in a real application, you would:
    // 1. Query the database to find which images are actually being used
    // 2. Compare with files on disk
    // 3. Delete only the unused files
    
    // For now, we'll just return the count of files that could be cleaned
    res.json({
      success: true,
      message: 'Cleanup analysis completed',
      data: {
        totalFiles: imageFiles.length,
        message: 'Manual cleanup required - check which files are actually in use'
      }
    });

  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during cleanup'
    });
  }
});

// @route   GET /api/upload/storage-info
// @desc    Get storage usage information
// @access  Private
router.get('/storage-info', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      return res.json({
        success: true,
        data: {
          totalSize: 0,
          fileCount: 0,
          directories: {}
        }
      });
    }

    // Calculate storage usage
    const calculateDirectorySize = (dirPath) => {
      let totalSize = 0;
      let fileCount = 0;
      
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          const subDirInfo = calculateDirectorySize(itemPath);
          totalSize += subDirInfo.size;
          fileCount += subDirInfo.count;
        } else {
          totalSize += stats.size;
          fileCount++;
        }
      }
      
      return { size: totalSize, count: fileCount };
    };

    const storageInfo = calculateDirectorySize(uploadsDir);

    // Get breakdown by subdirectories
    const directories = {};
    const subdirs = fs.readdirSync(uploadsDir);
    
    for (const subdir of subdirs) {
      const subdirPath = path.join(uploadsDir, subdir);
      const stats = fs.statSync(subdirPath);
      
      if (stats.isDirectory()) {
        directories[subdir] = calculateDirectorySize(subdirPath);
      }
    }

    res.json({
      success: true,
      data: {
        totalSize: storageInfo.size,
        totalSizeMB: (storageInfo.size / (1024 * 1024)).toFixed(2),
        fileCount: storageInfo.count,
        directories
      }
    });

  } catch (error) {
    console.error('Storage info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;