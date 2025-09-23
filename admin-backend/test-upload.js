import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testProductUpload() {
    try {
        // First login to get a fresh token
        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@aryanjewels.com',
            password: 'Admin@123'
        });
        
        const token = loginResponse.data.token;
        console.log('✅ Login successful, token received');
        
        // Create form data for product creation
        const form = new FormData();
        const imagePath = path.join(__dirname, '..', 'src', 'ASSETS', 'bridalCollections', 'bridal2.jpg');
        
        // Check if image exists
        if (!fs.existsSync(imagePath)) {
            console.error('❌ Image file not found:', imagePath);
            return;
        }
        
        console.log('📸 Image found:', imagePath);
        
        // Add all form fields
        form.append('name', 'Royal Kundan Bridal Set');
        form.append('category', 'bridal');
        form.append('subcategory', 'necklace');
        form.append('price', '45000');
        form.append('material', '925 Sterling Silver with Gold Plating');
        form.append('description', 'Exquisite kundan work bridal necklace set');
        form.append('image', fs.createReadStream(imagePath));
        
        // Make the request
        const response = await axios.post('http://localhost:5000/api/products/', form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${token}`
            },
            timeout: 30000 // 30 second timeout
        });
        
        console.log('✅ Product created successfully!');
        console.log('Product details:', JSON.stringify(response.data, null, 2));
        
    } catch (error) {
        console.error('❌ Error during test:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

testProductUpload();