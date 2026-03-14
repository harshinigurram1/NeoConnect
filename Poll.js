const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  votes: { type: [Number], default: [] },
  voters: { type: [String], default: [] },
});

module.exports = mongoose.model("Poll", PollSchema);