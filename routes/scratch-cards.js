const express = require('express');
const router = express.Router();
const ScratchCard = require('../models/ScratchCard');
const Prize = require('../models/Prize');
const ScratchResult = require('../models/ScratchResult');
const User = require('../models/User');
const { checkAuth } = require('../middleware/auth');

// Get all available scratch cards
router.get('/', async (req, res) => {
  try {
    const cards = await ScratchCard.find({ isActive: true });
    res.json({
      success: true,
      cards
    });
  } catch (error) {
    console.error('Error fetching scratch cards:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Play a scratch card
router.post('/play', checkAuth, async (req, res) => {
  try {
    const { cardType, ticketCost } = req.body;
    const userId = req.session.user.id;
    
    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if user has enough tickets
    if (user.tickets < ticketCost) {
      return res.status(400).json({
        success: false,
        message: 'Not enough tickets'
      });
    }
    
    // Get the card to validate
    const card = await ScratchCard.findOne({ type: cardType, isActive: true });
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card type not found or inactive'
      });
    }
    
    // Validate ticket cost matches the card
    if (card.ticketCost !== ticketCost) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ticket cost for this card type'
      });
    }
    
    // Deduct tickets
    user.tickets -= ticketCost;
    await user.save();
    
    res.json({
      success: true,
      message: 'Game started successfully',
      tickets: user.tickets
    });
  } catch (error) {
    console.error('Error starting game:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Record scratch result
router.post('/result', checkAuth, async (req, res) => {
  try {
    const { cardType, won, prizeId } = req.body;
    const userId = req.session.user.id;
    
    // Generate unique code for prize
    const prizeCode = won ? generatePrizeCode() : null;
    
    // Create result record
    const result = new ScratchResult({
      user: userId,
      cardType,
      won,
      prize: won ? prizeId : null,
      prizeCode,
      claimStatus: won ? 'pending' : null
    });
    
    await result.save();
    
    res.json({
      success: true,
      message: 'Result recorded successfully',
      resultId: result._id,
      prizeCode
    });
  } catch (error) {
    console.error('Error recording result:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Helper function to generate a prize code
function generatePrizeCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'PS';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

module.exports = router;
