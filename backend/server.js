const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
