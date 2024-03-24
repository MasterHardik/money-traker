// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5500 || process.env.PORT;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("."));

// Routes
app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname, "/index.html");
});

// POST endpoint for adding an entry
app.post("/add-entry", async (req, res) => {
  const { type, amount, date, note } = req.body;

  try {
    // Assuming the structure includes a field to distinguish between expense and earned
    const newEntry =
      type === "expense"
        ? { Expense: [{ Amount: amount, Date: date, Note: note }] }
        : { Earned: [{ Amount: amount, Date: date, Note: note }] };

    // Create a new Account document (or update an existing one, depending on your app logic)
    const account = new Account(newEntry);

    // Save the document in the database
    await account.save();

    res.status(201).send("Entry added successfully");
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).send("Error adding entry to the database");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} : http://localhost:${PORT}/`);
});
