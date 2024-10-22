const mysql = require('mysql2');
require('dotenv').config(); // Ensure environment variables are loaded

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "RecruitAI",
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = connection;
