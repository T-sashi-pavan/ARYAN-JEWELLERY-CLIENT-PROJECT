import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dlujb9uqv',
  api_key: process.env.CLOUDINARY_API_KEY || '647741526875949',
  api_secret: process.env.CLOUDINARY_API_SECRET || '6fsBwWr6oK-U9ObI5rI5KMBm0Uw'
});

export default cloudinary;