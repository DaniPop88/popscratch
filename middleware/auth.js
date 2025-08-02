/**
 * Authentication middleware for protecting routes
 */
const User = require('../models/User');

// Middleware to check if user is authenticated
const checkAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }
  
  next();
};

// Middleware to check if user is admin
const checkAdmin = async (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }
  
  try {
    const user = await User.findById(req.session.user.id);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    
    next();
  } catch (error) {
    console.error('Error in admin check:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  checkAuth,
  checkAdmin
};