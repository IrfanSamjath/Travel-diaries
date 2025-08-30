const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const postRoutes = require('./routes/posts');

// Load environment variables from .env file in backend directory
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI environment variable is not set.');
  process.exit(1);
}

// Middleware
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // frontend origins
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Travel Diaries API Server',
    endpoints: {
      posts: '/api/posts',
      single_post: '/api/posts/:id',
      uploads: '/uploads/:filename'
    },
    status: 'Server is running'
  });
});

app.use('/api/posts', postRoutes); // API routes

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
