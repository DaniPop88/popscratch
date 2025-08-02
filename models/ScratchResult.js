const mongoose = require('mongoose');

const scratchResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameId: {
    type: String,
    required: true
  },
  cardType: {
    type: String,
    enum: ['daily', 'special', 'premium'],
    default: 'daily'
  },
  platform: {
    type: String,
    enum: ['web', 'mobile', 'telegram'],
    default: 'web'
  },
  won: {
    type: Boolean,
    default: false
  },
  prize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prize'
  },
  prizeCode: {
    type: String
  },
  claimStatus: {
    type: String,
    enum: ['pending', 'claimed', 'expired'],
    default: 'pending'
  },
  scratchData: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
scratchResultSchema.index({ user: 1, createdAt: -1 });
scratchResultSchema.index({ user: 1, won: 1 });

const ScratchResult = mongoose.model('ScratchResult', scratchResultSchema);

module.exports = ScratchResult;