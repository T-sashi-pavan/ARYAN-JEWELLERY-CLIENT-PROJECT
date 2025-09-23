// Test script to create a sample product
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function loginAndGetToken() {
  try {
    console.log('Attempting login...');
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@aryanjewels.com',
        password: 'admin123'
      }),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    
    if (data.success) {
      return data.data.token;
    } else {
      throw new Error('Login failed: ' + data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

async function createSampleProduct(token) {
  try {
    const form = new FormData();
    
    // Add product data
    form.append('name', 'Test Royal Bridal Necklace');
    form.append('price', '25000');
    form.append('originalPrice', '30000');
    form.append('category', 'bridal');
    form.append('subcategory', 'necklace');
    form.append('material', '925 Sterling Silver');
    form.append('size', 'Complete Set');
    form.append('description', 'Beautiful test bridal necklace created from admin panel');
    form.append('tags', JSON.stringify(['bridal', 'necklace', 'royal', 'silver']));
    form.append('weight', '15.5');
    form.append('purity', '925');
    form.append('makingCharges', '2000');
    form.append('wastagePercentage', '8');
    form.append('gst', '3');
    form.append('inStock', 'true');
    form.append('featured', 'true');
    form.append('sku', 'BRN001');

    // Add a test image
    const sampleImagePath = path.join(__dirname, 'test-image.jpg');
    if (fs.existsSync(sampleImagePath)) {
      form.append('images', fs.createReadStream(sampleImagePath));
    } else {
      console.error('Test image not found at:', sampleImagePath);
      return null;
    }

    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...form.getHeaders()
      },
      body: form
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Product created successfully!');
      console.log('Product ID:', data.data._id);
      console.log('Product Name:', data.data.name);
      console.log('Category:', data.data.category);
      console.log('Price:', data.data.price);
      return data.data;
    } else {
      console.error('❌ Failed to create product:', data.message);
      if (data.errors) {
        console.error('Validation errors:', data.errors);
      }
      return null;
    }
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}

async function testProductCreation() {
  console.log('🚀 Testing product creation...');
  
  const token = await loginAndGetToken();
  if (!token) {
    console.error('❌ Failed to get authentication token');
    return;
  }
  
  console.log('✅ Login successful, token received');
  
  const product = await createSampleProduct(token);
  if (product) {
    console.log('✅ Test completed successfully!');
    
    // Test fetching the product via public API
    console.log('🔍 Testing public API...');
    try {
      const publicResponse = await fetch('http://localhost:5000/api/public/products?category=bridal');
      const publicData = await publicResponse.json();
      
      if (publicData.success && publicData.data.length > 0) {
        console.log('✅ Product visible in public API');
        console.log('Public products count:', publicData.data.length);
      } else {
        console.log('❌ Product not found in public API');
      }
    } catch (error) {
      console.error('Error testing public API:', error);
    }
  } else {
    console.log('❌ Test failed');
  }
}

testProductCreation();