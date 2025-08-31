
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

// Import database connection with error handling
let dbConnected = false;
const connectDB = require('./db');

const initializeDatabase = async () => {
  try {
    dbConnected = await connectDB();
    if (dbConnected) {
      console.log('✅ Database connection initialized');
    } else {
      console.log('⚠️ Database connection failed, but server will continue');
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('⚠️ Server will continue without database connection');
  }
};

// Import routes
const postsRoutes = require('./routes/posts');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/posts', postsRoutes);

// Root route for testing
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Backend is running on Render!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: dbConnected ? 'connected' : 'disconnected'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'connected' : 'disconnected',
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Error:', error.message);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 10000;  // Use Render’s PORT

const server = app.listen(PORT, '0.0.0.0', async () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);

  // Initialize database connection after server starts
  await initializeDatabase();
  console.log(`📡 Database: ${dbConnected ? 'connected' : 'disconnected'}`);
});

// Handle server shutdown gracefully
process.on('SIGTERM', () => {
  console.log('📡 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('📡 Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📡 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('📡 Server closed');
    process.exit(0);
  });
});

module.exports = app;
