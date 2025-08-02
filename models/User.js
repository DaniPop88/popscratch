const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameIDSchema = new Schema({
    platform: {
        type: String,
        required: true,
        enum: [
            'POPBRA', '26BET', 'POP888', 'POPKKK', 'POP678', 
            'POPPG', 'POP555', 'POPLUA', 'POPWB', 'POPBEM', 
            'POPMEL', 'POPCEU', 'POPDEZ', 'POPBOA'
        ]
    },
    gameId: {
        type: String,
        required: true
    }
});

const UserSchema = new Schema({
    telegramId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    photoUrl: {
        type: String
    },
    gameIds: [GameIDSchema],
    tickets: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

// Prevent duplicate gameIds for the same platform
UserSchema.index({ 'gameIds.platform': 1, 'gameIds.gameId': 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);