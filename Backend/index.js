const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Import the database connection

const app = express();

// Use CORS middleware with the correct frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // Allow only this origin (your frontend)
  credentials: true // Optional if you are using cookies or authentication tokens
}));

// Body parser middleware
app.use(express.json());

// Your API routes
app.post('/register', (req, res) => {
  const { name,email, password } = req.body; // Assuming these fields are sent in the request body

  // Insert user into the database
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name,email, password], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).send('Error registering user');
    }
    res.status(200).send('Signup successful');
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check user credentials
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.status(500).send('Error logging in');
    }
    if (results.length > 0) {
      res.status(200).send('Signin successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
