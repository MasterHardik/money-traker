const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["expense", "earned"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  note: String,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // Include other fields as needed
  entries: [entrySchema], // Embed the entries directly within each user document
});

const Account = mongoose.model("Account", userSchema);

module.exports = Account;
