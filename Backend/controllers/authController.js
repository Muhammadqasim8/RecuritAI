const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const generateToken = require('../utils/token');

// Register User
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) return reject(error);
        resolve(results.length > 0);
      });
    });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into DB
    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        // Return JWT token
        const token = generateToken(result.insertId);
        res.status(201).json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ message: err.message });

      const user = results[0];
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Return JWT token
      const token = generateToken(user.id);
      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
