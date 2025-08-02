const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['cash', 'gift_card', 'physical', 'discount', 'money', 'item', 'other'],
    default: 'other'
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String
  },
  stockCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  odds: {
    type: Number, // Probability of winning this prize (0-1)
    default: 0.1,
    min: 0,
    max: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
prizeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Prize = mongoose.model('Prize', prizeSchema);

module.exports = Prize;