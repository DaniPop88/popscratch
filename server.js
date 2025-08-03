const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Core middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== PERBAIKAN MIME TYPE DAN STATIC FILES =====

// Debug middleware untuk melihat request path
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});
  
  const cssPath = path.join(__dirname, 'public', 'css', 'style.css');
  res.sendFile(cssPath);
});

// Perbaikan MIME type untuk CSS
app.use('/css', (req, res, next) => {
    res.type('text/css');
    next();
});

// Perbaikan untuk file gambar
app.use('/images', (req, res, next) => {
    const ext = path.extname(req.path).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') {
        res.type('image/jpeg');
    } else if (ext === '.png') {
        res.type('image/png');
    } else if (ext === '.gif') {
        res.type('image/gif');
    }
    next();
});

// Static files - pastikan ini setelah middleware MIME type
app.use(express.static(path.join(__dirname, 'public')));

// Fallback route untuk file static yang tidak ditemukan
app.use('/images', (req, res, next) => {
    console.log(`Image not found: ${req.path}`);
    next();
});

// ===== SESSION CONFIGURATION =====

app.use(session({
    secret: process.env.SESSION_SECRET || 'popscratch-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: process.env.NODE_ENV === 'production'
    }
}));

// ===== ROUTES =====

// API Routes
app.use('/api/auth', authRoutes);

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Status route
app.get('/api', (req, res) => {
    res.json({
        status: 'success',
        message: 'POP Scratch Card API is running - Auth routes added'
    });
});

// ===== ERROR HANDLING =====

// 404 handler
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({
            success: false,
            message: 'API endpoint not found'
        });
    }
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ===== SERVER STARTUP =====

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Public directory: ${path.join(__dirname, 'public')}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
