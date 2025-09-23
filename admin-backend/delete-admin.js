import Admin from './models/Admin.js';
import mongoose from 'mongoose';

async function deleteAdmin() {
  await mongoose.connect('mongodb://localhost:27017/aryan-jewels');
  await Admin.deleteOne({ email: 'admin@aryanjewels.com' });
  console.log('Admin user deleted');
  process.exit(0);
}
deleteAdmin();