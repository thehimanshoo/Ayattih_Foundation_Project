const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.ObjectName, ref: 'User', required: true },
  userID: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, unique: true },
  password: { type: mongoose.Schema.ObjectPassword, ref: 'User', required: true },
  userType: { type: mongoose.Schema.ObjectType, ref: 'User', required: true },
  avatar: { type: String, required: false },
  created: { type: Date, default: Date.now() },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
