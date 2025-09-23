// Quick test for admin login
import fetch from 'node-fetch';

async function testLogin() {
  try {
    console.log('Testing login with Admin@123...');
    
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@aryanjewels.com',
        password: 'Admin@123'
      }),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response:', data);
    
    if (data.success) {
      console.log('✅ Login successful with Admin@123');
    } else {
      console.log('❌ Login failed');
      
      // Try with the old password
      console.log('Trying with admin123...');
      const response2 = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@aryanjewels.com',
          password: 'admin123'
        }),
      });
      
      const data2 = await response2.json();
      if (data2.success) {
        console.log('✅ Login successful with admin123');
      } else {
        console.log('❌ Login failed with both passwords');
      }
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

testLogin();