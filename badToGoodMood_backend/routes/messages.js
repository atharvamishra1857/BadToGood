const express = require("express");
const router = express.Router();
const db = require("../db/database");

// GET all messages for a plan
router.get("/:planId", (req, res) => {
  db.all(
    "SELECT * FROM messages WHERE plan_id = ? ORDER BY sent_at ASC",
    [req.params.planId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// POST a message on a plan
router.post("/", (req, res) => {
  const { plan_id, sender, body } = req.body;
  if (!plan_id || !sender || !body)
    return res.status(400).json({ error: "plan_id, sender, and body are required" });

  db.run(
    "INSERT INTO messages (plan_id, sender, body) VALUES (?, ?, ?)",
    [plan_id, sender, body],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

module.exports = router;