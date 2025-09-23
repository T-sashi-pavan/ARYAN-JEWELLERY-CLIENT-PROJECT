import Admin from './models/Admin.js';
import mongoose from 'mongoose';

async function unlockAdmin() {
  try {
    await mongoose.connect('mongodb://localhost:27017/aryan-jewels');
    console.log('Connected to MongoDB');

    // Completely reset the admin account
    const result = await Admin.updateOne(
      { email: 'admin@aryanjewels.com' },
      {
        $unset: {
          loginAttempts: 1,
          lockUntil: 1
        },
        $set: {
          isActive: true
        }
      }
    );

    if (result.matchedCount > 0) {
      console.log('✅ Admin account unlocked and reset');
      console.log('Login attempts cleared, lock removed');
    } else {
      console.log('❌ Admin account not found');
    }

    // Verify the admin account status
    const admin = await Admin.findOne({ email: 'admin@aryanjewels.com' });
    console.log('Current admin status:');
    console.log('- Email:', admin?.email);
    console.log('- Active:', admin?.isActive);
    console.log('- Login attempts:', admin?.loginAttempts || 0);
    console.log('- Is locked:', admin?.isLocked || false);
    
    process.exit(0);
  } catch (error) {
    console.error('Error unlocking admin:', error);
    process.exit(1);
  }
}

unlockAdmin();