const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { checkAuth } = require('../middleware/auth');
const crypto = require('crypto');

// Function to validate Telegram auth data
function validateTelegramAuth(data, botToken) {
  // Check if auth_date is expired (24 hours)
  const authDate = parseInt(data.auth_date);
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime - authDate > 86400) {
    return false; // Auth data expired
  }
  
  // Create a data check string by sorting all fields alphabetically
  const dataCheckString = Object.keys(data)
    .filter(key => key !== 'hash')
    .sort()
    .map(key => `${key}=${data[key]}`)
    .join('\n');
  
  // Create a secret key by hashing the bot token with SHA-256
  const secretKey = crypto
    .createHash('sha256')
    .update(botToken)
    .digest();
  
  // Calculate hash using HMAC-SHA-256
  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');
  
  // Verify that the hash we calculated matches the hash provided by Telegram
  return hash === data.hash;
}

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }
    
    // Create new user
    const newUser = new User({
      username,
      email,
      password
    });
    
    await newUser.save();
    
    // Create session
    req.session.user = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
    };
    
    res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is disabled'
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Update last login
    user.lastLogin = Date.now();
    await user.save();
    
    // Create session
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    
    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Check auth status
router.get('/check', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({
      success: true,
      isAuthenticated: true,
      user: req.session.user
    });
  }
  
  res.json({
    success: true,
    isAuthenticated: false
  });
});

// Telegram auth callback
router.get('/telegram-callback', async (req, res) => {
  try {
    const telegramData = req.query;
    
    // Validate Telegram authentication data
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      console.error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
      return res.redirect('/?login=error&reason=config');
    }
    
    // Validate the data from Telegram
    if (!validateTelegramAuth(telegramData, process.env.TELEGRAM_BOT_TOKEN)) {
      console.error('Telegram auth validation failed');
      return res.redirect('/?login=error&reason=validation');
    }
    
    // Extract user data
    const { id, first_name, last_name, username, photo_url, auth_date } = telegramData;
    
    // Find or create user
    let user = await User.findOne({ telegramId: id });
    
    if (user) {
      // Update existing user
      user.firstName = first_name;
      user.lastName = last_name || '';
      user.username = username || user.username; // Keep existing username if not provided
      user.photoUrl = photo_url || user.photoUrl;
      user.lastLogin = new Date();
      
      await user.save();
    } else {
      // Create new user
      user = new User({
        telegramId: id,
        firstName: first_name,
        lastName: last_name || '',
        username: username || `tg_user_${id}`, // Generate username if not provided
        photoUrl: photo_url || '',
        gameIds: [],
        tickets: 0,
        isActive: true,
        lastLogin: new Date()
      });
      
      await user.save();
    }
    
    // Set user in session
    req.session.user = {
      id: user._id,
      telegramId: user.telegramId,
      firstName: user.firstName,
      username: user.username,
      isAdmin: user.isAdmin || false
    };
    
    // Redirect to dashboard with success
    res.redirect('/?login=success');
    
  } catch (error) {
    console.error('Error in telegram-callback:', error);
    res.redirect('/?login=error&reason=server');
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Logout failed'
      });
    }
    
    res.clearCookie('connect.sid');
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });
});

// Get user profile
router.get('/profile', checkAuth, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        tickets: user.tickets,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
    
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
