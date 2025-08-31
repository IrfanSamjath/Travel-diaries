const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is live 🚀");
});

// Health check route
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
