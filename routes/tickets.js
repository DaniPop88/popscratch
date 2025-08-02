const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { checkAuth } = require('../middleware/auth');

// Get user's ticket counts
router.get('/', checkAuth, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if daily tickets need to be reset
    const now = new Date();
    const lastReset = new Date(user.tickets.daily.lastReset);
    const isNewDay = (
      now.getDate() !== lastReset.getDate() ||
      now.getMonth() !== lastReset.getMonth() ||
      now.getFullYear() !== lastReset.getFullYear()
    );
    
    if (isNewDay) {
      // Reset daily tickets
      user.tickets.daily.count = 1;
      user.tickets.daily.lastReset = now;
      await user.save();
    }
    
    res.json({
      success: true,
      tickets: {
        daily: user.tickets.daily.count,
        special: user.tickets.special.count,
        premium: user.tickets.premium.count
      }
    });
    
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Use a ticket
router.post('/use', checkAuth, async (req, res) => {
  try {
    const { ticketType } = req.body;
    
    if (!ticketType || !['daily', 'special', 'premium'].includes(ticketType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ticket type'
      });
    }
    
    const userId = req.session.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if user has tickets of the specified type
    if (user.tickets[ticketType].count <= 0) {
      return res.status(400).json({
        success: false,
        message: `No ${ticketType} tickets available`
      });
    }
    
    // Deduct ticket
    user.tickets[ticketType].count -= 1;
    await user.save();
    
    res.json({
      success: true,
      tickets: {
        daily: user.tickets.daily.count,
        special: user.tickets.special.count,
        premium: user.tickets.premium.count
      },
      message: `${ticketType} ticket used successfully`
    });
    
  } catch (error) {
    console.error('Error using ticket:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;