const express = require("express");
const router = express.Router();
const db = require("../db/database");

router.get("/", (req, res) => {
  db.all("SELECT * FROM plans ORDER BY date ASC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { date, time, activity, created_by } = req.body;
  if (!date || !time || !activity)
    return res.status(400).json({ error: "date, time, and activity are required" });

  db.run(
    "INSERT INTO plans (date, time, activity, created_by) VALUES (?, ?, ?, ?)",
    [date, time, activity, created_by],
    function (err) {          // must be function(), not arrow fn — 'this' gives lastID
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

router.patch("/:id", (req, res) => {
  const { status } = req.body;
  db.run("UPDATE plans SET status = ? WHERE id = ?", [status, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

router.delete("/:id", (req, res) => {
  db.run("DELETE FROM plans WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;