const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',    // Replace with your MySQL host (usually 'localhost')
  user: 'root',         // Replace with your MySQL username
  password: '',         // Replace with your MySQL password
  database: 'recruitai' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

module.exports = db;
