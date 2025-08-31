const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.warn('⚠️  MongoDB connection failed. Using mock data for testing...');
  }

  // Require postsRouter after connection is established
  const postsRouter = require("./routes/posts");

  // Serve static files from uploads directory
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // Serve static files from client build directory
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Mount posts routes under /api/posts
  app.use('/api/posts', postsRouter);

  // Root route
  app.get("/", (req, res) => {
    res.send("✅ Backend is live 🚀");
  });

  // Health check route (for Render)
  app.get("/healthz", (req, res) => {
    res.status(200).json({ status: "ok", message: "Backend is healthy 🚀" });
  });

  // Test POST route
  app.post("/test", (req, res) => {
    console.log("📩 POST /test:", req.body);
    res.json({ received: req.body });
  });

  const PORT = process.env.PORT || 10000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
};

startServer();
