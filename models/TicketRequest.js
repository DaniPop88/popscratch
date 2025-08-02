const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketRequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    telegramId: {
        type: String,
        required: true
    },
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
    },
    requestType: {
        type: String,
        required: true,
        enum: ['recharge', 'vip', 'betting', 'invite']
    },
    requestDetails: {
        // For recharge
        amount: Number,
        
        // For VIP
        vipLevel: Number,
        
        // For betting
        bettingAmount: Number,
        
        // For invite
        inviteCount: Number
    },
    ticketsRequested: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    adminNotes: {
        type: String
    },
    reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    }
});

module.exports = mongoose.model('TicketRequest', TicketRequestSchema);