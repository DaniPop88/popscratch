const express = require('express');
const router = express.Router();
const User = require('../models/User');
const TicketRequest = require('../models/TicketRequest');
const { checkAuth } = require('../middleware/auth');

// Get user ticket balance
router.get('/balance', checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      tickets: user.tickets || 0
    });
  } catch (error) {
    console.error('Error fetching ticket balance:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Request tickets
router.post('/request', checkAuth, async (req, res) => {
  try {
    const { platform, method } = req.body;
    const userId = req.session.user.id;
    
    if (!platform || !method) {
      return res.status(400).json({
        success: false,
        message: 'Platform and method are required'
      });
    }
    
    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Get method details
    let requestDetails = {};
    let ticketsRequested = 0;
    
    switch(method) {
      case 'recharge':
        const amount = parseInt(req.body.amount || 0);
        requestDetails.amount = amount;
        ticketsRequested = Math.floor(amount / 50); // 1 ticket per R$50
        break;
        
      case 'vip':
        const vipLevel = parseInt(req.body.vipLevel || 1);
        requestDetails.vipLevel = vipLevel;
        // Calculate tickets based on VIP level
        const vipTickets = [2, 3, 5, 8, 12];
        ticketsRequested = vipTickets[vipLevel - 1] || 2;
        break;
        
      case 'betting':
        const bettingAmount = parseInt(req.body.bettingAmount || 0);
        requestDetails.bettingAmount = bettingAmount;
        // Calculate tickets based on betting amount
        if (bettingAmount >= 5000) ticketsRequested = 2;
        else if (bettingAmount >= 2000) ticketsRequested = 2;
        else if (bettingAmount >= 1000) ticketsRequested = 1;
        break;
        
      case 'invite':
        const inviteCount = parseInt(req.body.inviteCount || 0);
        requestDetails.inviteCount = inviteCount;
        // Calculate tickets based on invite count
        if (inviteCount >= 20) ticketsRequested = 8;
        else if (inviteCount >= 10) ticketsRequested = 5;
        else if (inviteCount >= 5) ticketsRequested = 3;
        else if (inviteCount >= 3) ticketsRequested = 2;
        else if (inviteCount >= 1) ticketsRequested = 1;
        break;
        
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid method'
        });
    }
    
    // Create ticket request in database
    const ticketRequest = new TicketRequest({
      user: userId,
      telegramId: user.telegramId,
      platform,
      gameId: req.body.gameId,
      requestType: method,
      requestDetails,
      ticketsRequested,
      status: 'pending',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });
    
    await ticketRequest.save();
    
    res.json({
      success: true,
      message: 'Ticket request submitted successfully',
      ticketsRequested
    });
  } catch (error) {
    console.error('Error requesting tickets:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Play scratch card
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

module.exports = router;
