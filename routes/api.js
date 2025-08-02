const express = require('express');
const router = express.Router();
const ScratchCard = require('../models/ScratchCard');
const Prize = require('../models/Prize');
const User = require('../models/User');
const ScratchHistory = require('../models/ScratchHistory');

// Get all scratch cards
router.get('/scratch-cards', async (req, res) => {
  try {
    const scratchCards = await ScratchCard.find({ isActive: true });
    res.json(scratchCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get prizes for a specific card type
router.get('/prizes/:cardType', async (req, res) => {
  try {
    const prizes = await Prize.find({ 
      cardType: req.params.cardType,
      isActive: true 
    });
    res.json(prizes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Scratch a card and get a prize
router.post('/scratch', async (req, res) => {
  try {
    const { userId, cardType } = req.body;
    
    // Verify user exists and has enough tickets
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get the card to determine ticket cost
    const card = await ScratchCard.findOne({ type: cardType });
    if (!card) {
      return res.status(404).json({ message: 'Card type not found' });
    }
    
    if (user.tickets < card.ticketCost) {
      return res.status(400).json({ message: 'Not enough tickets' });
    }
    
    // Get available prizes for this card type with their probabilities
    const prizes = await Prize.find({ 
      cardType: cardType,
      isActive: true 
    });
    
    if (prizes.length === 0) {
      return res.status(404).json({ message: 'No prizes available for this card' });
    }
    
    // Algorithm for prize selection based on probability
    // Simple implementation - can be made more sophisticated
    const totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0);
    let random = Math.random() * totalProbability;
    
    let selectedPrize = null;
    for (const prize of prizes) {
      random -= prize.probability;
      if (random <= 0) {
        selectedPrize = prize;
        break;
      }
    }
    
    // Fallback to first prize if no selection (shouldn't happen with proper probabilities)
    if (!selectedPrize) selectedPrize = prizes[0];
    
    // Check daily limits for the prize
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const prizesAwarded = await ScratchHistory.countDocuments({
      prizeId: selectedPrize._id,
      createdAt: { $gte: today }
    });
    
    if (prizesAwarded >= selectedPrize.dailyLimit) {
      // If daily limit reached, select a default prize (usually lowest value)
      selectedPrize = prizes.find(p => p.value === Math.min(...prizes.map(p => p.value)));
    }
    
    // Deduct tickets from user
    user.tickets -= card.ticketCost;
    
    // Award prize to user
    if (selectedPrize.type === 'money') {
      user.balance += selectedPrize.value;
    } else {
      // For physical items, mark as pending for admin approval
      // This could be handled differently based on your requirements
    }
    
    await user.save();
    
    // Record scratch history
    const history = new ScratchHistory({
      userId: user._id,
      cardType: cardType,
      prizeId: selectedPrize._id,
      ticketsUsed: card.ticketCost,
      status: selectedPrize.type === 'money' ? 'completed' : 'pending'
    });
    
    await history.save();
    
    res.json({ 
      prize: selectedPrize,
      userBalance: user.balance,
      userTickets: user.tickets 
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user profile
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      id: user._id,
      telegramId: user.telegramId,
      username: user.username,
      balance: user.balance,
      tickets: user.tickets
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user scratch history
router.get('/history/:userId', async (req, res) => {
  try {
    const history = await ScratchHistory.find({ userId: req.params.userId })
      .populate('prizeId')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;