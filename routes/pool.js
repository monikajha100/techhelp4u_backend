require("dotenv").config();
const fs = require("fs");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port:  process.env.DB_PORT,
  user: process.env.DB_USER ,
  password: process.env.DB_PASS ,
  database: process.env.DB_NAME ,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync(process.env.DB_SSL),  // << ADD THIS
    rejectUnauthorized: true
  }
});

module.exports = pool;