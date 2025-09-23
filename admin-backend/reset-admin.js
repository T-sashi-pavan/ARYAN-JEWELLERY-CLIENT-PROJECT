import Admin from './models/Admin.js';
import mongoose from 'mongoose';

async function resetAdmin() {
  await mongoose.connect('mongodb://localhost:27017/aryan-jewels');
  
  // Reset the admin account
  await Admin.updateOne(
    { email: 'admin@aryanjewels.com' },
    {
      $unset: {
        loginAttempts: 1,
        lockUntil: 1
      }
    }
  );
  
  console.log('Admin account reset - lock removed');
  process.exit(0);
}
resetAdmin();