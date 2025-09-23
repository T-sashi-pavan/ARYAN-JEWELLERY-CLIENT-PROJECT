import express from 'express';
import { body, validationResult } from 'express-validator';
import Admin from '../models/Admin.js';
import { generateToken, authenticateToken, loginRateLimit } from '../middleware/auth.js';
import { generateResetToken, sendPasswordResetEmail } from '../services/emailService.js';

const router = express.Router();

// Validation rules
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters'),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match');
      }
      return true;
    })
];

const updateProfileValidation = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

const forgotPasswordValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
// Completely disable rate limiting for development
router.post('/login', loginValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email }).select('+password');
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is locked (disabled in development)
    if (admin.isLocked && process.env.NODE_ENV === 'production') {
      return res.status(401).json({
        success: false,
        message: 'Account is temporarily locked due to too many failed login attempts'
      });
    }

    // Check if account is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Verify password
    const isMatch = await admin.comparePassword(password);
    
    if (!isMatch) {
      // Skip incrementing failed login attempts in development
      if (process.env.NODE_ENV === 'production') {
        await admin.incLoginAttempts();
      }
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    await admin.resetLoginAttempts();

    // Generate token
    const token = generateToken(admin._id);

    // Remove sensitive data
    const adminData = admin.toJSON();

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        admin: adminData,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current admin profile
// @access  Private
router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        admin: req.admin
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update admin profile
// @access  Private
router.put('/profile', authenticateToken, updateProfileValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email } = req.body;
    
    // Check if email is already taken by another admin
    const existingAdmin = await Admin.findOne({ 
      email: email,
      _id: { $ne: req.admin._id }
    });
    
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Email is already taken by another admin'
      });
    }
    
    // Update admin profile
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.admin._id,
      { 
        name: name,
        email: email,
        updatedAt: new Date()
      },
      { 
        new: true,
        runValidators: true
      }
    ).select('-password');
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        admin: updatedAdmin
      }
    });
    
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/auth/change-password
// @desc    Change admin password
// @access  Private
router.post('/change-password', authenticateToken, changePasswordValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;
    
    // Get admin with password
    const admin = await Admin.findById(req.admin._id).select('+password');
    
    // Verify current password
    const isMatch = await admin.comparePassword(currentPassword);
    
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    // Update password
    admin.password = newPassword;
    await admin.save();
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
    
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout admin (client-side token removal)
// @access  Private
router.post('/logout', authenticateToken, (req, res) => {
  // In a stateless JWT system, logout is handled client-side
  // by removing the token from storage
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// @route   GET /api/auth/verify-token
// @desc    Verify if token is valid
// @access  Private
router.get('/verify-token', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    data: {
      admin: req.admin
    }
  });
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email for authenticated admin
// @access  Private
router.post('/forgot-password', authenticateToken, async (req, res) => {
  try {
    // Get the admin from the token (already authenticated)
    const admin = await Admin.findById(req.admin._id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Check if email service is configured
    if (!process.env.EMAIL_FROM || !process.env.EMAIL_PASSWORD || 
        process.env.EMAIL_PASSWORD === 'your-16-char-app-password') {
      console.log('Email service not configured properly');
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please set up Gmail app password in server settings.'
      });
    }

    // Generate reset token
    const resetToken = generateResetToken();
    
    // Set token and expiration (1 hour from now)
    admin.resetPasswordToken = resetToken;
    admin.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    
    await admin.save();

    // Send password reset email
    const emailResult = await sendPasswordResetEmail(admin.email, admin.name, resetToken);
    
    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send reset email. Please check email configuration or try again later.'
      });
    }
    
    res.json({
      success: true,
      message: `Password reset instructions have been sent to ${admin.email}`
    });
    
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/auth/validate-reset-token/:token
// @desc    Validate password reset token
// @access  Public
router.get('/validate-reset-token/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Reset token is required'
      });
    }

    // Find admin with valid reset token
    const admin = await Admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
        valid: false
      });
    }

    res.json({
      success: true,
      message: 'Reset token is valid',
      valid: true
    });

  } catch (error) {
    console.error('Token validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate reset token',
      valid: false
    });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password using token
// @access  Public
router.post('/reset-password', [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { token, password } = req.body;

    // Find admin with valid reset token
    const admin = await Admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Update password and clear reset token
    admin.password = password; // Will be hashed by the pre-save hook
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    
    await admin.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password'
    });
  }
});

// @route   POST /api/auth/setup
// @desc    Create default admin (for initial setup)
// @access  Public (only works if no admin exists)
router.post('/setup', async (req, res) => {
  try {
    // Check if any admin already exists
    const existingAdmin = await Admin.findOne();
    
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists. Setup not allowed.'
      });
    }
    
    // Create default admin
    const admin = await Admin.createDefaultAdmin();
    
    res.status(201).json({
      success: true,
      message: 'Default admin created successfully',
      data: {
        admin: admin.toJSON()
      }
    });
    
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({
      success: false,
      message: 'Setup failed'
    });
  }
});

export default router;