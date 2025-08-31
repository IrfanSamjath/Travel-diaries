const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const upload = require('../middleware/upload');

// Mock data for testing when MongoDB is not available
let mockPosts = [
  {
    _id: '1',
    title: 'Sample Travel Post',
    content: 'This is a sample travel post for testing purposes.',
    author: 'Test Author',
    tags: ['travel', 'sample'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    // Fallback to mock data if MongoDB is not connected
    console.log('Using mock data for posts');
    res.json(mockPosts);
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new post (JSON)
router.post('/json', async (req, res) => {
  try {
    let postData = req.body;

    // Handle tags parsing
    if (typeof postData.tags === 'string') {
      postData.tags = JSON.parse(postData.tags);
    }

    const post = new Post(postData);
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ message: error.message });
  }
});

// Create new post (with file upload)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const postData = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      tags: req.body.tags ? (typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags) : []
    };

    if (req.file) {
      postData.image = `/uploads/${req.file.filename}`;
    }

    const post = new Post(postData);
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update post (JSON)
router.put('/:id/json', async (req, res) => {
  try {
    let postData = req.body;

    // Handle tags parsing
    if (typeof postData.tags === 'string') {
      postData.tags = JSON.parse(postData.tags);
    }

    const post = await Post.findByIdAndUpdate(req.params.id, postData, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update post (with file upload)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const postData = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      tags: req.body.tags ? (typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags) : []
    };

    if (req.file) {
      postData.image = `/uploads/${req.file.filename}`;
    }

    const post = await Post.findByIdAndUpdate(req.params.id, postData, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
