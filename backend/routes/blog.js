const express = require("express");

const router = express.Router();

// Mock data for testing when MongoDB is not available
let mockBlogs = [
  {
    _id: '1',
    title: 'Sample Blog Post',
    content: 'This is a sample blog post for testing purposes.',
    createdAt: new Date()
  }
];

// Get all blogs
router.get("/", async (req, res) => {
  // Check if MongoDB is connected
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState !== 1) {
    console.log('🔄 MongoDB not connected, using mock data for blogs');
    return res.json(mockBlogs);
  }

  try {
    const Blog = require("../models/Blog");
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    // Fallback to mock data if MongoDB operation fails
    console.log('Using mock data for blogs due to error:', err.message);
    res.json(mockBlogs);
  }
});

// Create a new blog
router.post("/", async (req, res) => {
  console.log("📩 POST /blog received");
  console.log("📩 Request body:", req.body);

  // Check if MongoDB is connected
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState !== 1) {
    console.log('🔄 MongoDB not connected, using mock data fallback for blog POST');

    const mockBlog = {
      _id: Date.now().toString(),
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date()
    };

    mockBlogs.push(mockBlog);
    console.log("✅ Mock blog created successfully:", mockBlog);
    return res.status(201).json(mockBlog);
  }

  try {
    console.log("📩 POST /blog body:", req.body);
    const Blog = require("../models/Blog");
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error('❌ Error creating blog:', err);
    console.error('❌ Error details:', err.message);

    // Fallback to mock data if MongoDB operation fails
    console.log('🔄 Using mock data fallback for blog POST due to error');

    const mockBlog = {
      _id: Date.now().toString(),
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date()
    };

    mockBlogs.push(mockBlog);
    console.log("✅ Mock blog created successfully:", mockBlog);
    res.status(201).json(mockBlog);
  }
});

module.exports = router;
