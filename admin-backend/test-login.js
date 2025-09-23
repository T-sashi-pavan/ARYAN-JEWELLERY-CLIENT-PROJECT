import Admin from './models/Admin.js';
import mongoose from 'mongoose';

async function testLogin() {
  await mongoose.connect('mongodb://localhost:27017/aryan-jewels');
  
  const admin = await Admin.findOne({ email: 'admin@aryanjewels.com' }).select('+password');
  console.log('Admin found:', admin ? 'Yes' : 'No');
  
  if (admin) {
    console.log('Admin email:', admin.email);
    console.log('Admin isActive:', admin.isActive);
    console.log('Admin password exists:', !!admin.password);
    
    // Test password comparison
    const isMatch = await admin.comparePassword('admin123');
    console.log('Password matches:', isMatch);
  }
  
  process.exit(0);
}
testLogin();