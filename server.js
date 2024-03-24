require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Account = require("./Models/Account");
require("./db/conn");
const entriesController = require("./Controllers/entriesController");

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(bodyParser.json()); // Updated for JSON parsing
app.use(express.static("public"));

const cors = require("cors");
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Routes using controllers
app.get("/get-entries", entriesController.getEntries);
app.post("/add-entry", entriesController.addEntry);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
