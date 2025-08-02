const express = require('express');
const router = express.Router();
const Prize = require('../models/Prize');
const ScratchResult = require('../models/ScratchResult');
const { checkAuth } = require('../middleware/auth');

// Get all prizes for current user
router.get('/', checkAuth, async (req, res) => {
  try {
    const userId = req.session.user.id;
    
    // Get user's winning results
    const winningResults = await ScratchResult.find({
      user: userId,
      won: true
    }).populate('prize').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      prizes: winningResults.map(result => ({
        id: result._id,
        name: result.prize.name,
        type: result.prize.type,
        value: result.prize.value,
        cardType: result.cardType,
        platform: result.platform,
        gameId: result.gameId,
        prizeCode: result.prizeCode,
        claimStatus: result.claimStatus,
        createdAt: result.createdAt
      }))
    });
    
  } catch (error) {
    console.error('Error fetching prizes:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get prize details
router.get('/:id', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.user.id;
    
    const result = await ScratchResult.findOne({
      _id: id,
      user: userId,
      won: true
    }).populate('prize');
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Prize not found'
      });
    }
    
    res.json({
      success: true,
      prize: {
        id: result._id,
        name: result.prize.name,
        type: result.prize.type,
        value: result.prize.value,
        cardType: result.cardType,
        platform: result.platform,
        gameId: result.gameId,
        prizeCode: result.prizeCode,
        claimStatus: result.claimStatus,
        createdAt: result.createdAt
      }
    });
    
  } catch (error) {
    console.error('Error fetching prize details:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;