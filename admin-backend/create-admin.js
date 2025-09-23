// Create admin user for testing
import Admin from './models/Admin.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

async function createAdminUser() {
  try {
    await mongoose.connect('mongodb://localhost:27017/aryan-jewels');
    console.log('Connected to MongoDB');

    // Check if admin user already exists
    const existingUser = await Admin.findOne({ email: 'admin@aryanjewels.com' });
    if (existingUser) {
      console.log('Deleting existing admin user...');
      await Admin.deleteOne({ email: 'admin@aryanjewels.com' });
    }

    // Create admin user
    const adminUser = new Admin({
      name: 'Admin',
      email: 'admin@aryanjewels.com',
      password: 'Admin@123', // This matches the default in the model
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully');
    console.log('Email: admin@aryanjewels.com');
    console.log('Password: Admin@123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();