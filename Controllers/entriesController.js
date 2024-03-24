const Account = require("../Models/Account");

// Get entries for a user
exports.getEntries = async (req, res) => {
  const userId = "5f3e3d9f4d2d4a4567890123"; // Example, will authenticated user's ID in production

  try {
    const user = await Account.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res
      .status(500)
      .json({ message: "Error fetching entries from the database" });
  }
};

// Add an entry for a user
exports.addEntry = async (req, res) => {
  const { userId, type, amount, date, note } = req.body;

  try {
    await Account.findByIdAndUpdate(
      userId,
      { $push: { entries: { type, amount, date, note } } },
      { new: true }
    );
    res.status(201).json({ message: "Entry added successfully" });
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).json({ message: "Error adding entry to the database" });
  }
};
