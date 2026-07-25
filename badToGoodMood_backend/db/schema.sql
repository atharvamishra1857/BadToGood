CREATE TABLE plans (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  date      TEXT NOT NULL,
  time      TEXT NOT NULL,
  activity  TEXT NOT NULL,
  status    TEXT DEFAULT 'pending',
  created_by TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  plan_id    INTEGER REFERENCES plans(id) ON DELETE CASCADE,
  sender     TEXT NOT NULL,
  body       TEXT NOT NULL,
  sent_at    TEXT DEFAULT (datetime('now'))
);