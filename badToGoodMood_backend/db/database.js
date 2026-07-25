const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "plans.db"), (err) => {
  if (err) console.error("DB connection error:", err);
  else console.log("Connected to SQLite");
});

db.run(`PRAGMA foreign_keys = ON`);

db.run(`CREATE TABLE IF NOT EXISTS plans (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  date        TEXT NOT NULL,
  time        TEXT NOT NULL,
  activity    TEXT NOT NULL,
  status      TEXT DEFAULT 'pending',
  created_by  TEXT,
  created_at  TEXT DEFAULT (datetime('now'))
)`);

db.run(`CREATE TABLE IF NOT EXISTS messages (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  plan_id  INTEGER REFERENCES plans(id) ON DELETE CASCADE,
  sender   TEXT NOT NULL,
  body     TEXT NOT NULL,
  sent_at  TEXT DEFAULT (datetime('now'))
)`);

module.exports = db;