import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Generate JWT token
export const generateToken = (adminId) => {
  return jwt.sign(
    { adminId, type: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Verify JWT token middleware
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if admin exists and is active
    const admin = await Admin.findById(decoded.adminId).select('-password');
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token - admin not found'
      });
    }
    
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }
    
    if (admin.isLocked) {
      return res.status(401).json({
        success: false,
        message: 'Account is temporarily locked'
      });
    }
    
    // Add admin to request object
    req.admin = admin;
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }
    
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

// Check admin role middleware
export const requireSuperAdmin = (req, res, next) => {
  if (req.admin.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      message: 'Super admin access required'
    });
  }
  next();
};

// Rate limiting for login attempts
export const loginRateLimit = (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  const attempts = new Map();
  
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!attempts.has(ip)) {
      attempts.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const attempt = attempts.get(ip);
    
    if (now > attempt.resetTime) {
      attempts.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    if (attempt.count >= maxAttempts) {
      return res.status(429).json({
        success: false,
        message: 'Too many login attempts. Please try again later.'
      });
    }
    
    attempt.count++;
    next();
  };
};