import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
const productImagesDir = path.join(uploadDir, 'products');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(productImagesDir)) {
  fs.mkdirSync(productImagesDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = req.uploadType === 'product' ? productImagesDir : uploadDir;
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
    cb(null, fileName);
  }
});

// File filter for images
const imageFilter = (req, file, cb) => {
  // Check file type
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, JPG, PNG, GIF, WebP) are allowed'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
    files: 10 // Maximum 10 files at once
  },
  fileFilter: imageFilter
});

// Error handling middleware for multer
export const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
    }
    
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 10 files allowed.'
      });
    }
    
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected field name for file upload.'
      });
    }
  }
  
  if (error.message === 'Only image files (JPEG, JPG, PNG, GIF, WebP) are allowed') {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  next(error);
};

// Middleware to set upload type
export const setUploadType = (type) => {
  return (req, res, next) => {
    req.uploadType = type;
    next();
  };
};

// Single file upload
export const uploadSingle = (fieldName) => upload.single(fieldName);

// Multiple files upload
export const uploadMultiple = (fieldName, maxCount = 10) => upload.array(fieldName, maxCount);

// Mixed fields upload
export const uploadFields = (fields) => upload.fields(fields);

// Utility function to delete file
export const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        // File doesn't exist is not an error
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Utility function to get file URL
export const getFileUrl = (req, filePath) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const relativePath = filePath.replace(/\\/g, '/'); // Convert Windows paths
  return `${baseUrl}/${relativePath}`;
};

// Utility function to validate image dimensions (optional)
export const validateImageDimensions = async (filePath, minWidth = 100, minHeight = 100, maxWidth = 2000, maxHeight = 2000) => {
  try {
    // You can add image processing library like sharp here if needed
    // For now, we'll just return true
    return true;
  } catch (error) {
    console.error('Image validation error:', error);
    return false;
  }
};

export default upload;