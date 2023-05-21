const mongoose = require("mongoose");
const superAdminSchema = new mongoose.Schema({
  name : {type: String, required: true},
  userID: { type: String, required: true , unique: true },
  password: { type: String, required: true },
  userType : { type: String, required: true },
  // avatar : { type: Image, required: false },
  created: { type: Date, default: Date.now() },
});

const superAdmin = mongoose.model("superAdmin", superAdminSchema);

module.exports = superAdmin;
