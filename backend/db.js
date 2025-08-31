const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

// Enhanced MongoDB connection with options to prevent buffering timeout
const connectDB = async () => {
  if (!uri) {
    console.error('❌ MONGODB_URI environment variable is not set');
    return false;
  }

  try {
    console.log('🔄 Attempting to connect to MongoDB...');

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // Increased timeout for Render
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 5, // Reduced pool size for Render
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      retryWrites: true,
      retryReads: true
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.error("❌ Connection details:", {
      uri: uri.substring(0, 20) + '...', // Don't log full URI for security
      error: error.message
    });
    return false;
  }
};

// Connection event listeners
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('📡 Mongoose disconnected');
});

// Handle application termination
process.on('SIGINT', async () => {
  console.log('📡 Closing MongoDB connection...');
  try {
    await mongoose.connection.close();
    console.log('📡 Mongoose connection closed due to app termination');
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('📡 Closing MongoDB connection...');
  try {
    await mongoose.connection.close();
    console.log('📡 Mongoose connection closed due to app termination');
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
  }
  process.exit(0);
});

// Export connection function for external use
module.exports = connectDB;
