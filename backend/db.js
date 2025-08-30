const mongoose = require("mongoose");

const uri = "mongodb+srv://IrfanSamjath:samjathirfan@cluster0.b8rroad.mongodb.net/traveldiaries?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection Error:", err));
