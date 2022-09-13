const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role_name: {
    type: String,
    reguired: true,
    unique: true,
  },
  role_status: {
    type: String,
  },
  updated: {
    type: Date,
  },
  create: {
    type: Date,
    default: Date.now,
  },
});
const role = mongoose.model("Roles", userSchema);

module.exports = role;
