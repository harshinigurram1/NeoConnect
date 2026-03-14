const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema({
  trackingId: String,
  category: String,
  department: String,
  location: String,
  severity: String,
  description: String,
  anonymous: Boolean,
  assignedTo: String, // Case Manager ID
  status: { type: String, default: "New" }, // New, Assigned, In Progress, Pending, Resolved, Escalated
  notes: [String],
  createdAt: { type: Date, default: Date.now },
  respondedAt: Date // For 7-day escalation
});

module.exports = mongoose.model("Case", CaseSchema);