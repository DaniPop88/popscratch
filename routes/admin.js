const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Prize = require('../models/Prize');
const ScratchResult = require('../models/ScratchResult');
const { checkAdmin } = require('../middleware/auth');

// All admin routes require admin access
router.use(checkAdmin);

// Get system statistics
router.get('/stats', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const prizeCount = await Prize.countDocuments();
    const resultsCount = await ScratchResult.countDocuments();
    const winCount = await ScratchResult.countDocuments({ won: true });
    
    res.json({
      success: true,
      stats: {
        users: userCount,
        prizes: prizeCount,
        games: resultsCount,
        wins: winCount,
        winRate: resultsCount > 0 ? (winCount / resultsCount * 100).toFixed(2) + '%' : '0%'
      }
    });
    
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      users: users.map(user => ({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        ticketCounts: {
          daily: user.tickets.daily.count,
          special: user.tickets.special.count,
          premium: user.tickets.premium.count
        }
      }))
    });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add tickets to a user
router.post('/users/:userId/tickets', async (req, res) => {
  try {
    const { userId } = req.params;
    const { ticketType, amount } = req.body;
    
    if (!ticketType || !['daily', 'special', 'premium'].includes(ticketType) || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ticket type or amount'
      });
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Add tickets
    user.tickets[ticketType].count += parseInt(amount);
    await user.save();
    
    res.json({
      success: true,
      message: `Added ${amount} ${ticketType} tickets to ${user.username}`
    });
    
  } catch (error) {
    console.error('Error adding tickets:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all prizes
router.get('/prizes', async (req, res) => {
  try {
    const prizes = await Prize.find({}).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      prizes
    });
    
  } catch (error) {
    console.error('Error fetching prizes:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create a new prize
router.post('/prizes', async (req, res) => {
  try {
    const { name, type, value, description, imageUrl, stockCount, odds } = req.body;
    
    const newPrize = new Prize({
      name,
      type,
      value,
      description,
      imageUrl,
      stockCount,
      odds: odds || 0.1
    });
    
    await newPrize.save();
    
    res.status(201).json({
      success: true,
      prize: newPrize
    });
    
  } catch (error) {
    console.error('Error creating prize:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update a prize
router.put('/prizes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const prize = await Prize.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    
    if (!prize) {
      return res.status(404).json({
        success: false,
        message: 'Prize not found'
      });
    }
    
    res.json({
      success: true,
      prize
    });
    
  } catch (error) {
    console.error('Error updating prize:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;