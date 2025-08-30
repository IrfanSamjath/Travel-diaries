const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection Error:", err));
