const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  first_name : {type: String, required: true},
  last_name: { type: String, required: true },
  Class : { type: String, required: true },
  section : { type: String, required: true },
  userType : { type: String, required: true },
  userID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar : { type: String, required: false },
  created: { type: Date, default: Date.now() },
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
