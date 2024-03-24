require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Account = require("./Models/Account");
const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(bodyParser.json()); // Updated for JSON parsing
app.use(express.static("public"));

const cors = require("cors");
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/add-entry", async (req, res) => {
  const { userId, type, amount, date, note } = req.body;
  try {
    // Use the hardcoded sampleUserId for now
    await Account.findByIdAndUpdate(
      userId,
      { $push: { entries: { type, amount, date, note } } },
      { new: true, upsert: true }
    );
    res.status(201).json({ message: "Entry added successfully" });
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).json({ message: "Error adding entry to the database" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
