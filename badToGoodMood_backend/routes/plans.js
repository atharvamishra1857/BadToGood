const express = require("express");
const router = express.Router();
const pool = require("../db/database");

// GET all plans
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM plans ORDER BY date ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new plan
router.post("/", async (req, res) => {
  const { date, time, activity, created_by } = req.body;
  if (!date || !time || !activity)
    return res.status(400).json({ error: "date, time, and activity are required" });
  try {
    const result = await pool.query(
      "INSERT INTO plans (date, time, activity, created_by) VALUES ($1, $2, $3, $4) RETURNING id",
      [date, time, activity, created_by]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH status
router.patch("/:id", async (req, res) => {
  const { status } = req.body;
  try {
    await pool.query("UPDATE plans SET status = $1 WHERE id = $2", [status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a plan
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM plans WHERE id = $1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;