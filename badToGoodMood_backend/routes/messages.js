const express = require("express");
const router = express.Router();
const pool = require("../db/database");

// GET messages for a plan
router.get("/:planId", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM messages WHERE plan_id = $1 ORDER BY sent_at ASC",
      [req.params.planId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a message
router.post("/", async (req, res) => {
  const { plan_id, sender, body } = req.body;
  if (!plan_id || !sender || !body)
    return res.status(400).json({ error: "plan_id, sender, and body are required" });
  try {
    const result = await pool.query(
      "INSERT INTO messages (plan_id, sender, body) VALUES ($1, $2, $3) RETURNING id",
      [plan_id, sender, body]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;