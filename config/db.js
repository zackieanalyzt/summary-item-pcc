// config/db.js
const mysql = require('mysql2/promise');
const { Pool } = require('pg');
require('dotenv').config();

// MariaDB Connection Pool
const mariadbPool = mysql.createPool({
  host: process.env.MARIADB_HOST,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// PostgreSQL Connection Pool
const pgPool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
});

module.exports = {
  mariadbPool,
  pgPool
};