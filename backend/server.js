const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db");

const Blog = require("./models/Blog"); // <-- add this
const postsRouter = require("./routes/posts");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Root
app.get("/", (req, res) => res.send("✅ Backend is live 🚀"));

// Health check route
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend is healthy 🚀" });
});

// Mount posts routes under /api/posts
app.use('/api/posts', postsRouter);

// Get all blogs
app.get("/blog", async (req, res) => {
  try {
    // Check if MongoDB is connected
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      console.log('🔄 MongoDB not connected, using mock data for blogs');
      return res.json([]);
    }

    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.log('Using mock data for blogs due to error:', err.message);
    res.json([]);
  }
});

// Create a blog
app.post("/blog", async (req, res) => {
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

    console.log("✅ Mock blog created successfully:", mockBlog);
    return res.status(201).json(mockBlog);
  }

  try {
    console.log("📩 POST /blog body:", req.body);
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

    console.log("✅ Mock blog created successfully:", mockBlog);
    res.status(500).json({ error: "Could not save blog" }); // Return JSON error response instead of HTML
  }
});

// Global error handler to ensure JSON responses for all errors
app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
