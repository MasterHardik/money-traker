const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Connect to MongoDB
const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      // Use await here
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Failed to connect to MongoDB:", e);
    process.exit(1);
  }
};
ConnectDB();
