const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const upload = require('../middleware/upload');

// Error logging middleware for post creation
function logErrors(err, req, res, next) {
  console.error('Error during post creation:', err);
  next(err);
}

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new post
router.post('/', upload.single('image'), async (req, res) => {
  console.log('POST /api/posts received');
  console.log('Request body:', req.body);
  console.log('Request file:', req.file ? req.file : 'No file uploaded');
  
  // Check for multer errors (file upload errors)
  if (req.fileValidationError) {
    console.error('Multer validation error:', req.fileValidationError);
    return res.status(400).json({ 
      message: req.fileValidationError,
      details: 'File upload validation failed'
    });
  }

  const { title, content } = req.body;
  
  // Validate required fields
  if (!title || !content) {
    console.error('Missing required fields:', { title, content });
    return res.status(400).json({ 
      message: 'Title and content are required',
      details: `Received: title=${title ? 'present' : 'missing'}, content=${content ? 'present' : 'missing'}`
    });
  }

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  console.log('Creating new post with:', { title, content, imageUrl });

  const newPost = new Post({
    title: title.trim(),
    content: content.trim(),
    imageUrl,
    author: req.body.author || 'Anonymous Traveler'
  });

  // Validate the post before saving
  try {
    await newPost.validate();
  } catch (validationError) {
    console.error('Post validation error:', validationError.message);
    console.error('Validation errors:', validationError.errors);
    return res.status(400).json({ 
      message: 'Invalid post data',
      details: validationError.message,
      validationErrors: validationError.errors
    });
  }

  try {
    console.log('Attempting to save post to database...');
    const savedPost = await newPost.save();
    console.log('Post saved successfully:', savedPost._id);
    console.log('Full saved post:', savedPost);
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error saving post:', err.message);
    console.error('Error details:', err);
    console.error('Error stack:', err.stack);
    
    // Check for MongoDB connection errors
    if (err.name === 'MongoNetworkError' || err.name === 'MongoServerSelectionError') {
      return res.status(503).json({ 
        message: 'Database connection error',
        details: 'Cannot connect to database. Please try again later.'
      });
    }
    
    // Check for duplicate key errors or other MongoDB errors
    if (err.code === 11000) {
      return res.status(409).json({ 
        message: 'Duplicate post',
        details: 'A post with similar content already exists.'
      });
    }
    
    res.status(400).json({ 
      message: err.message,
      details: 'Failed to create post. Please check server logs for details.'
    });
  }
});

module.exports = router;
