const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required on Render
});

// Create tables if they don't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS plans (
    id          SERIAL PRIMARY KEY,
    date        TEXT NOT NULL,
    time        TEXT NOT NULL,
    activity    TEXT NOT NULL,
    status      TEXT DEFAULT 'pending',
    created_by  TEXT,
    created_at  TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS messages (
    id       SERIAL PRIMARY KEY,
    plan_id  INTEGER REFERENCES plans(id) ON DELETE CASCADE,
    sender   TEXT NOT NULL,
    body     TEXT NOT NULL,
    sent_at  TIMESTAMP DEFAULT NOW()
  );
`).then(() => console.log("DB ready"))
  .catch((err) => console.error("DB setup error:", err));

module.exports = pool;