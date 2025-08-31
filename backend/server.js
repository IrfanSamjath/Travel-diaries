const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Blog = require("./models/Blog"); // <-- add this

const app = express();
app.use(cors());
app.use(express.json());

// Root
app.get("/", (req, res) => res.send("✅ Backend is live 🚀"));

// Get all blogs
app.get("/blog", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a blog
app.post("/blog", async (req, res) => {
  try {
    console.log("📩 Received blog:", req.body);
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("❌ Error saving blog:", err.message);
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
