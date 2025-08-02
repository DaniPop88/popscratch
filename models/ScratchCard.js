const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScratchCardSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    ticketCost: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
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

module.exports = mongoose.model('ScratchCard', ScratchCardSchema);