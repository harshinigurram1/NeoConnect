const cron = require("node-cron");
const Case = require("../models/Case");

// Runs daily at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const casesToEscalate = await Case.find({
      status: { $in: ["Assigned", "In Progress"] },
      respondedAt: { $lte: sevenDaysAgo }
    });

    for (let c of casesToEscalate) {
      c.status = "Escalated";
      await c.save();
      console.log(`Case ${c.trackingId} escalated due to 7-day rule.`);
    }
  } catch (err) {
    console.error("Error running escalation job:", err);
  }
});