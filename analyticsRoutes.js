const router = require("express").Router();
const Case = require("../models/Case");

router.get("/", async (req, res) => {
  try {
    const cases = await Case.find();
    const departmentCounts = {};
    cases.forEach((c) => {
      departmentCounts[c.department] = (departmentCounts[c.department] || 0) + 1;
    });
    res.json({ departmentCounts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Analytics error" });
  }
});

module.exports = router;