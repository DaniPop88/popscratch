const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ScratchResult = require('../models/ScratchResult');
const { checkAuth } = require('../middleware/auth');

// Get user's game IDs
router.get('/game-ids', checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const gameIds = {};
    
    // Convert user's gameIds array to object format expected by frontend
    if (user.gameIds && user.gameIds.length > 0) {
      user.gameIds.forEach(item => {
        gameIds[item.platform] = item.gameId;
      });
    }
    
    res.json({
      success: true,
      gameIds
    });
  } catch (error) {
    console.error('Error fetching game IDs:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Register game ID
router.post('/game-id', checkAuth, async (req, res) => {
  try {
    const { platform, gameId } = req.body;
    
    if (!platform || !gameId) {
      return res.status(400).json({
        success: false,
        message: 'Platform and gameId are required'
      });
    }
    
    const user = await User.findById(req.session.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Initialize gameIds array if it doesn't exist
    if (!user.gameIds) {
      user.gameIds = [];
    }
    
    // Check if platform already exists
    const existingIndex = user.gameIds.findIndex(item => item.platform === platform);
    
    if (existingIndex !== -1) {
      // Update existing platform
      user.gameIds[existingIndex].gameId = gameId;
    } else {
      // Add new platform
      user.gameIds.push({ platform, gameId });
    }
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Game ID saved successfully'
    });
  } catch (error) {
    console.error('Error saving game ID:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get user history
router.get('/history', checkAuth, async (req, res) => {
  try {
    // Get user's scratch results
    const results = await ScratchResult.find({ user: req.session.user.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('prize');
    
    // Format results for the frontend
    const history = results.map(result => ({
      type: 'game',
      cardType: result.cardType,
      prize: result.won ? result.prize?.name : null,
      date: result.createdAt
    }));
    
    res.json({
      success: true,
      history
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      // Return empty array as fallback
      history: [] 
    });
  }
});

// Get user profile
router.get('/profile', checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id)
      .select('-password');
    
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
        telegramId: user.telegramId,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        photoUrl: user.photoUrl,
        tickets: user.tickets,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        gameIds: user.gameIds
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
