const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/jwt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

function getFullProfilePicUrl(req, filename) {
  if (!filename) return null;
  return `${req.protocol}://${req.get('host')}/profile-pics/${filename}`;
}


exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const profilePictureFile = req.file;


  if (!email || !password || !name || !role || !profilePictureFile) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const profilePicturePath = profilePictureFile.filename;
    const sql = 'INSERT INTO users (name, email, password, role, profile_pic) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [name, email, hash, role, profilePicturePath], (err, result) => {
      if (err) {
        return res.status(500).json({ 
          error: err.code === 'ER_DUP_ENTRY' 
            ? 'Email already exists' 
            : 'Database error occurred' 
        });
      }

      const userId = result.insertId;

      // Fetch the inserted user to get full info
      db.query('SELECT id, name, email, role FROM users WHERE id = ?', [userId], (selectErr, results) => {
        if (selectErr || results.length === 0) {
          return res.status(500).json({ error: 'User registration succeeded, but failed to fetch user data' });
        }

        const user = results[0];
        const token = generateToken(user.id);

        res.status(201).json({ 
          message: 'User registered successfully',
          token,
         user: { ...user, profilePic: getFullProfilePicUrl(req, profilePicturePath) } });
      });
    });
  } catch (hashError) {
    res.status(500).json({ error: 'Error processing password' });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    
    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = generateToken(user.id);
          user.profile_picture = getFullProfilePicUrl(req, user.profile_pic);

      res.json({ 
        token, 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role,
          pic : user.profile_picture
        } 
      });
    } catch (compareError) {
      res.status(500).json({ message: 'Authentication error' });
    }
  });
};

exports.getProfile = (req, res) => {
  const userId = req.user.id;

  db.query('SELECT id, name, email, role, rank, profile_pic FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    
    const user = results[0];
    user.profile_picture = getFullProfilePicUrl(req, user.profile_pic);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      rank: user.rank,
      profilePic: user.profile_picture
    });
  });
};


// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// const bcrypt = require('bcrypt');
// const db = require('./your-db-connection'); // Replace with your DB connection file

// Create transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use true for port 465 (SSL)
  auth: {
    user: 'sheraazjanjua@gmail.com',         // Your Gmail address
    pass: 'aowhhqcjusetiwee',                // Your App Password (no spaces)
  },
});

// Generate reset URL
function getResetUrl(req, token) {
  return `http://localhost:5173/reset-password/${token}`;
}

// Step 1: Forgot Password
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'No account with that email' });
    }

    const user = results[0];
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // 1 hour

    db.query(
      'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?',
      [token, expiry, user.id],
      (updateErr) => {
        if (updateErr) {
          return res.status(500).json({ message: 'Database error' });
        }

        const resetLink = getResetUrl(req, token);

        const mailOptions = {
          from: '"RecruitAI Support" <sheraazjanjua@gmail.com>',
          to: email,
          subject: 'Reset Your Password',
          text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nThis link is valid for 1 hour.`,
          html: `
            <h3>Password Reset Request</h3>
            <p>You requested a password reset. Click the link below to reset your password. This link is valid for 1 hour.</p>
            <a href="${resetLink}" style="color:blue">${resetLink}</a>
          `,
        };

        transporter.sendMail(mailOptions, (mailErr, info) => {
          if (mailErr) {
            console.error('Email sending error:', mailErr);
            return res.status(500).json({ message: 'Failed to send email' });
          }

          console.log('Email sent:', info.response);
          res.json({ message: 'Password reset email sent successfully' });
        });
      }
    );
  });
};

// Step 2: Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  db.query(
    'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()',
    [token],
    async (err, results) => {
      if (err || results.length === 0) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      const user = results[0];
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      db.query(
        'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
        [hashedPassword, user.id],
        (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ message: 'Error updating password' });
          }

          res.json({ message: 'Password has been reset successfully' });
        }
      );
    }
  );
};
