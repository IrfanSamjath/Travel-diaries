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

// Add /blog routes to redirect to /api/posts for compatibility
app.use('/blog', postsRouter);

// Global error handler to ensure JSON responses for all errors
app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
