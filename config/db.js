const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 
    "postgres://postgres:admin@localhost:5432/PPOB",
  ssl: {
    rejectUnauthorized: false,
  },
  idleTimeoutMillis: 500,
});

module.exports = pool;
