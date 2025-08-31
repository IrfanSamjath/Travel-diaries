const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const postsRoutes = require('./routes/posts');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse application/json
app.use(express.urlencoded({ extended: true })); // Parse form data

// Root route
app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

// Debug route for testing POST body parsing
app.post("/test", (req, res) => {
  console.log("📩 Received POST /test body:", req.body);
  res.json({ received: req.body });
});

// Routes
app.use('/api/posts', postsRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
