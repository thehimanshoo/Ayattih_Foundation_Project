const mongoose = require("mongoose");
const practiceSchema = new mongoose.Schema({
  name : {type: String, required: true},
  Class: { type: Number, required: true },
  score: { type: Number, required: true },
  prTodayCorrect: { type: Number, required: true },
  prTodayAttempted: { type: Number, required: true },
  prTopicLevel: { type: Number, required: true },
  prTopicLevelUpScore: { type: Number, required: true },
  hwTotal: { type: String, required: true },
  hwDone: { type: String, required: true },
  created: { type: Date, default: Date.now() },
});

const Practice = mongoose.model("practice", practiceSchema);

module.exports = Practice;