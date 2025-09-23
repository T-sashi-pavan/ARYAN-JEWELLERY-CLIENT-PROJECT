import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: 'Please provide a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'superadmin']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better performance
adminSchema.index({ email: 1 });

// Virtual for account lock status
adminSchema.virtual('isLocked').get(function() {
  // Always return false in development to disable locking
  return false;
});

// Pre-save middleware to hash password
adminSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
adminSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Instance method to handle failed login attempts
adminSchema.methods.incLoginAttempts = function() {
  // Completely disable login attempt tracking and account locking for development
  console.log('Login attempt recorded but no locking applied (development mode)');
  return Promise.resolve(); // Do nothing, just return a resolved promise
};

// Instance method to reset login attempts
adminSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: {
      loginAttempts: 1,
      lockUntil: 1
    },
    $set: {
      lastLogin: new Date()
    }
  });
};

// Static method to create default admin
adminSchema.statics.createDefaultAdmin = async function() {
  try {
    const existingAdmin = await this.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (!existingAdmin) {
      const defaultAdmin = new this({
        email: process.env.ADMIN_EMAIL || 'admin@aryanjewels.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        name: 'System Administrator',
        role: 'superadmin'
      });
      
      await defaultAdmin.save();
      console.log('✅ Default admin created successfully');
      return defaultAdmin;
    }
    
    return existingAdmin;
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
    throw error;
  }
};

// Remove password from JSON output
adminSchema.methods.toJSON = function() {
  const admin = this.toObject();
  delete admin.password;
  delete admin.loginAttempts;
  delete admin.lockUntil;
  return admin;
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;