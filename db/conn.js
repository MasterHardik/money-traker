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
    process.exit(1); // Exit in case of connection error
  }
};

// Call ConnectDB to initiate the connection
ConnectDB();

// // Define the schema
// const memberSchema = new mongoose.Schema({
//   Members: [
//     {
//       Username: {
//         type: String,
//         required: true,
//       },
//       Password: {
//         type: String,
//         required: true,
//       },
//       Email: {
//         type: String,
//         required: true,
//       },
//       PhoneNumber: {
//         type: String,
//         required: true,
//       },
//       Expense: [
//         {
//           Amount: {
//             type: Number,
//             required: true,
//           },
//           Date: {
//             type: Date,
//             required: true,
//           },
//           Note: {
//             type: String,
//           },
//         },
//       ],
//       Earned: [
//         {
//           Amount: {
//             type: Number,
//             required: true,
//           },
//           Date: {
//             type: Date,
//             required: true,
//           },
//           Note: {
//             type: String,
//           },
//         },
//       ],
//     },
//   ],
// });

// // Pre-save hook to hash passwords
// memberSchema.pre("save", async function (next) {
//   if (this.isModified("Members")) {
//     for (let member of this.Members) {
//       if (member.isModified("Password")) {
//         const hash = await bcrypt.hash(member.Password, 10);
//         member.Password = hash;
//       }
//     }
//   }
//   next();
// });

// // Create the model
// const Account = mongoose.model("Account", memberSchema);

// module.exports = Account; // Export the model if you need to use it in other parts of your application
