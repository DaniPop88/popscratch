/**
 * Logger middleware for tracking user activities
 */
const ActivityLog = require('../models/ActivityLog');

// Middleware to log user activity
const logActivity = async (req, res, next) => {
  // Skip logging for static assets and some endpoints
  if (req.path.startsWith('/api') && 
      !req.path.includes('auth/check') && 
      !req.path.includes('auth/refresh')) {
    
    const userId = req.session && req.session.user ? req.session.user.id : null;
    
    try {
      // Create activity log entry
      await ActivityLog.create({
        user: userId,
        action: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.headers['user-agent']
      });
    } catch (error) {
      console.error('Error logging activity:', error);
      // Don't block the request if logging fails
    }
  }
  
  next();
};

module.exports = {
  logActivity
};