const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ScratchCard = require('./models/ScratchCard');
const Prize = require('./models/Prize');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: true
})
.then(() => console.log('Connected to MongoDB for data setup'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Sample scratch cards
const scratchCards = [
    {
        type: 'A',
        name: 'Kupon Gosok A',
        description: 'Kupon ekonomis hanya dengan 1 tiket',
        ticketCost: 1,
        image: 'card-a.png',
        isActive: true
    },
    {
        type: 'B',
        name: 'Kupon Gosok B',
        description: 'Kupon medium dengan hadiah lebih besar',
        ticketCost: 2,
        image: 'card-b.png',
        isActive: true
    },
    {
        type: 'C',
        name: 'Kupon Gosok C',
        description: 'Kupon premium dengan hadiah terbaik',
        ticketCost: 5,
        image: 'card-c.png',
        isActive: true
    }
];

// Sample prizes for type A
const prizesA = [
    { name: "1 reais", description: "Bonus saldo 1 reais", type: "money", value: 1, cardType: 'A', probability: 20, dailyLimit: 100, isActive: true },
    { name: "2 reais", description: "Bonus saldo 2 reais", type: "money", value: 2, cardType: 'A', probability: 15, dailyLimit: 80, isActive: true },
    { name: "5 reais", description: "Bonus saldo 5 reais", type: "money", value: 5, cardType: 'A', probability: 10, dailyLimit: 50, isActive: true },
    { name: "10 reais", description: "Bonus saldo 10 reais", type: "money", value: 10, cardType: 'A', probability: 5, dailyLimit: 20, isActive: true },
    { name: "PowerBank", description: "PowerBank 10000mAh", type: "item", value: 50, cardType: 'A', probability: 0.5, dailyLimit: 2, isActive: true }
];

// Sample prizes for type B
const prizesB = [
    { name: "5 reais", description: "Bonus saldo 5 reais", type: "money", value: 5, cardType: 'B', probability: 15, dailyLimit: 50, isActive: true },
    { name: "10 reais", description: "Bonus saldo 10 reais", type: "money", value: 10, cardType: 'B', probability: 10, dailyLimit: 30, isActive: true },
    { name: "20 reais", description: "Bonus saldo 20 reais", type: "money", value: 20, cardType: 'B', probability: 5, dailyLimit: 15, isActive: true },
    { name: "50 reais", description: "Bonus saldo 50 reais", type: "money", value: 50, cardType: 'B', probability: 2, dailyLimit: 5, isActive: true },
    { name: "JBL Speaker", description: "JBL Bluetooth Speaker", type: "item", value: 150, cardType: 'B', probability: 0.3, dailyLimit: 1, isActive: true }
];

// Sample prizes for type C
const prizesC = [
    { name: "50 reais", description: "Bonus saldo 50 reais", type: "money", value: 50, cardType: 'C', probability: 10, dailyLimit: 10, isActive: true },
    { name: "100 reais", description: "Bonus saldo 100 reais", type: "money", value: 100, cardType: 'C', probability: 5, dailyLimit: 5, isActive: true },
    { name: "300 reais", description: "Bonus saldo 300 reais", type: "money", value: 300, cardType: 'C', probability: 1, dailyLimit: 2, isActive: true },
    { name: "Smart Watch", description: "Smart Watch premium", type: "item", value: 300, cardType: 'C', probability: 0.8, dailyLimit: 1, isActive: true },
    { name: "iPhone 15", description: "iPhone 15 terbaru", type: "item", value: 1500, cardType: 'C', probability: 0.05, dailyLimit: 1, totalLimit: 1, isActive: true }
];

// Combined prize array
const prizes = [...prizesA, ...prizesB, ...prizesC];

// Function to seed data
async function seedData() {
    try {
        // Clear existing data
        await ScratchCard.deleteMany({});
        await Prize.deleteMany({});
        
        // Insert scratch cards
        await ScratchCard.insertMany(scratchCards);
        console.log('Scratch cards seeded successfully');
        
        // Insert prizes
        await Prize.insertMany(prizes);
        console.log('Prizes seeded successfully');
        
        console.log('All data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

// Run the seed function
seedData();