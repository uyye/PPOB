const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/PPOB",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  idleTimeoutMillis: 500,
});

module.exports = pool;
