const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    required: true,
    unique: true,
  },
  role_status: {
    type: String,
  },
  updated: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Roles = mongoose.model("Roles", roleSchema);

module.exports = Roles;
