const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
  userID : {type: String, required: true, unique: true},
  name : {type: String, required: true},
  level: { type: String, required: true },
  result: { type: String, required: true },
  created: { type: Date, default: Date.now() },
});

const Result = mongoose.model("result", resultSchema);

module.exports = Result;
