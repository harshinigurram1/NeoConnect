// backend/routes/caseRoutes.js
const router = require("express").Router();
const Case = require("../models/Case");

// ----------------------
// 1️⃣ Submit a new complaint
// ----------------------
router.post("/", async (req, res) => {
  try {
    const { category, department, location, severity, description, anonymous } = req.body;

    // Generate a simple tracking ID: NEO-YYYY-XXX
    const year = new Date().getFullYear();
    const count = await Case.countDocuments();
    const trackingId = `NEO-${year}-${String(count + 1).padStart(3, "0")}`;

    const newCase = new Case({
      trackingId,
      category,
      department,
      location,
      severity,
      description,
      anonymous,
      status: "New",
    });

    await newCase.save();
    res.json(newCase); // Return saved case
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit case" });
  }
});

// ----------------------
// 2️⃣ Get all cases (Secretariat)
// ----------------------
router.get("/", async (req, res) => {
  try {
    const cases = await Case.find();
    res.json(cases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cases" });
  }
});

// ----------------------
// 3️⃣ Get cases assigned to a specific Case Manager
// ----------------------
router.get("/assigned/:managerId", async (req, res) => {
  try {
    const cases = await Case.find({ assignedTo: req.params.managerId });
    res.json(cases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch assigned cases" });
  }
});

// ----------------------
// 4️⃣ Assign a case to a Case Manager (Secretariat)
// ----------------------
router.put("/:id/assign", async (req, res) => {
  try {
    const caseId = req.params.id;
    const { managerId } = req.body;

    if (!managerId) return res.status(400).json({ message: "Manager ID required" });

    const updatedCase = await Case.findByIdAndUpdate(
      caseId,
      { assignedTo: managerId, status: "Assigned" },
      { new: true }
    );

    res.json(updatedCase);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to assign case" });
  }
});

// ----------------------
// 5️⃣ Update status or add notes (Case Manager)
// ----------------------
router.put("/:id/update", async (req, res) => {
  try {
    const caseId = req.params.id;
    const { status, notes } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (notes) updateData.$push = { notes: notes };
    updateData.respondedAt = Date.now(); // track response for 7-day rule

    const updatedCase = await Case.findByIdAndUpdate(caseId, updateData, { new: true });

    res.json(updatedCase);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update case" });
  }
});

// ----------------------
// 6️⃣ Track complaint by tracking ID
// ----------------------
router.get("/track/:trackingId", async (req, res) => {
  try {
    const { trackingId } = req.params;

    const foundCase = await Case.findOne({ trackingId });

    if (!foundCase) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(foundCase);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch complaint" });
  }
});

module.exports = router;