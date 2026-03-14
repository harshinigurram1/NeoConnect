const router = require("express").Router();
const Poll = require("../models/Poll");

// Create a new poll
router.post("/", async (req, res) => {
  try {
    const { question, options } = req.body;
    const poll = new Poll({
      question,
      options,
      votes: new Array(options.length).fill(0),
    });
    await poll.save();
    res.json(poll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating poll" });
  }
});

// Get the latest poll
router.get("/", async (req, res) => {
  try {
    const poll = await Poll.findOne().sort({ _id: -1 });
    res.json(poll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching poll" });
  }
});

// Vote for an option
router.post("/vote", async (req, res) => {
  try {
    const { pollId, option } = req.body;
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    poll.votes[option] += 1;
    await poll.save();
    res.json(poll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error voting" });
  }
});

module.exports = router;