require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

// SSL path properly resolve karo
const sslPath = path.resolve(__dirname, '../ca3.pem'); // pool.js ke hisaab se ek folder upar

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync(sslPath),
    rejectUnauthorized: true
  }
});

module.exports = pool;
