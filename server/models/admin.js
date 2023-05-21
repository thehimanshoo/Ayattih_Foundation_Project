const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  organisationName : {type: String, required: true},
  userType: { type: String, required: true },
  userID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now() },
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
