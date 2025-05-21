const express = require('express');
const router = express.Router();
const { verifyToken } = require('../config/jwt');
const multer = require('multer');
const upload = require('../middleware/upload');

const {
    register,
    login,
    resetPassword,
    forgotPassword,
    // googleAuth,
    getProfile
} = require('../controllers/authControllers');

function getFullProfilePicUrl(req, filename) {
  if (!filename) return null;
  return `${req.protocol}://${req.get('host')}/profile-pics/${filename}`;
}

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

router.post('/register', upload.single('profile_picture'), register);
router.post('/login',upload.none(), login);
router.get('/profile', authMiddleware, getProfile);
router.post('/forgot-password', forgotPassword);

// POST /reset-password/:token
router.post('/reset-password/:token', resetPassword);

module.exports = router;  