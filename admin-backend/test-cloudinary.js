import cloudinary from './config/cloudinary.js';
import fs from 'fs';

console.log('Testing Cloudinary upload...');

// Test upload function
const testUpload = async () => {
  try {
    // Read a test image
    const imagePath = '../src/ASSETS/bridalCollections/bridal1.jpg';
    console.log('Reading image from:', imagePath);
    
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'aryan-jewels/products',
      public_id: 'test-product-' + Date.now(),
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto:good' }
      ]
    });
    
    console.log('✅ Upload successful!');
    console.log('Image URL:', result.secure_url);
    console.log('Public ID:', result.public_id);
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
};

testUpload();