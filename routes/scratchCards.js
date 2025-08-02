const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Prize = require('../models/Prize');
const ScratchResult = require('../models/ScratchResult');
const ScratchCard = require('../models/ScratchCard');
const { checkAuth } = require('../middleware/auth');
const crypto = require('crypto');

// Tambahkan route publik untuk mendapatkan semua scratch cards
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

// Generate a scratch card
router.post('/generate', checkAuth, async (req, res) => {
  try {
    const { cardType } = req.body;
    const userId = req.session.user.id;
    
    if (!cardType || !['daily', 'special', 'premium'].includes(cardType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid card type'
      });
    }
    
    // Check if user has enough tickets
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (user.tickets[cardType].count <= 0) {
      return res.status(400).json({
        success: false,
        message: `No ${cardType} tickets available`
      });
    }
    
    // Deduct ticket
    user.tickets[cardType].count -= 1;
    await user.save();
    
    // Generate game ID
    const gameId = crypto.randomBytes(16).toString('hex');
    
    // Create scratch card pattern
    const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '🎰', '💰', '💎', '🎁', '🏆'];
    const scratchData = {
      pattern: Array(9).fill().map(() => symbols[Math.floor(Math.random() * symbols.length)]),
      revealed: Array(9).fill(false)
    };
    
    // Determine if user wins
    const activePrizes = await Prize.find({ isActive: true, stockCount: { $gt: 0 } });
    
    if (activePrizes.length === 0) {
      // No prizes available
      const result = new ScratchResult({
        user: userId,
        gameId,
        cardType,
        platform: 'web',
        won: false,
        scratchData
      });
      
      await result.save();
      
      return res.json({
        success: true,
        ticket: {
          id: result._id,
          gameId,
          cardType,
          scratchData,
          won: false
        }
      });
    }
    
    // Calculate win probability based on card type
    let winProbability;
    switch (cardType) {
      case 'daily':
        winProbability = 0.05; // 5% chance
        break;
      case 'special':
        winProbability = 0.15; // 15% chance
        break;
      case 'premium':
        winProbability = 0.30; // 30% chance
        break;
      default:
        winProbability = 0.05;
    }
    
    const isWin = Math.random() < winProbability;
    
    if (!isWin) {
      // No win
      const result = new ScratchResult({
        user: userId,
        gameId,
        cardType,
        platform: 'web',
        won: false,
        scratchData
      });
      
      await result.save();
      
      return res.json({
        success: true,
        ticket: {
          id: result._id,
          gameId,
          cardType,
          scratchData,
          won: false
        }
      });
    }
    
    // User wins, select a prize
    const prizePool = [];
    activePrizes.forEach(prize => {
      // Add prize to pool based on its odds (weighted random selection)
      const weight = Math.floor(prize.odds * 100);
      for (let i = 0; i < weight; i++) {
        prizePool.push(prize);
      }
    });
    
    const selectedPrize = prizePool[Math.floor(Math.random() * prizePool.length)];
    
    // Create winning pattern
    const winningSymbol = '💎';
    
    // Put 3 winning symbols in random positions
    const winPositions = [];
    while (winPositions.length < 3) {
      const pos = Math.floor(Math.random() * 9);
      if (!winPositions.includes(pos)) {
        winPositions.push(pos);
        scratchData.pattern[pos] = winningSymbol;
      }
    }
    
    // Generate prize code
    const prizeCode = crypto.randomBytes(8).toString('hex').toUpperCase();
    
    // Decrease prize stock count
    selectedPrize.stockCount -= 1;
    await selectedPrize.save();
    
    // Create winning result
    const result = new ScratchResult({
      user: userId,
      gameId,
      cardType,
      platform: 'web',
      won: true,
      prize: selectedPrize._id,
      prizeCode,
      claimStatus: 'pending',
      scratchData
    });
    
    await result.save();
    
    res.json({
      success: true,
      ticket: {
        id: result._id,
        gameId,
        cardType,
        scratchData,
        won: true,
        prize: {
          name: selectedPrize.name,
          type: selectedPrize.type,
          value: selectedPrize.value,
          code: prizeCode
        }
      }
    });
    
  } catch (error) {
    console.error('Error generating scratch card:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Reveal a scratch position
router.post('/reveal', checkAuth, async (req, res) => {
  try {
    const { gameId, position } = req.body;
    const userId = req.session.user.id;
    
    if (position < 0 || position > 8) {
      return res.status(400).json({
        success: false,
        message: 'Invalid position'
      });
    }
    
    const result = await ScratchResult.findOne({
      gameId,
      user: userId
    });
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }
    
    // Update scratch data
    result.scratchData.revealed[position] = true;
    await result.save();
    
    res.json({
      success: true,
      position,
      symbol: result.scratchData.pattern[position],
      revealedPositions: result.scratchData.revealed
    });
    
  } catch (error) {
    console.error('Error revealing scratch position:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Complete a scratch card
router.post('/complete', checkAuth, async (req, res) => {
  try {
    const { gameId } = req.body;
    const userId = req.session.user.id;
    
    const result = await ScratchResult.findOne({
      gameId,
      user: userId
    }).populate('prize');
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }
    
    // Mark all positions as revealed
    result.scratchData.revealed = Array(9).fill(true);
    await result.save();
    
    // Return full result
    const response = {
      success: true,
      result: {
        id: result._id,
        gameId: result.gameId,
        cardType: result.cardType,
        won: result.won,
        scratchData: result.scratchData,
        createdAt: result.createdAt
      }
    };
    
    if (result.won && result.prize) {
      response.result.prize = {
        name: result.prize.name,
        type: result.prize.type,
        value: result.prize.value,
        code: result.prizeCode
      };
    }
    
    res.json(response);
    
  } catch (error) {
    console.error('Error completing scratch card:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;