const express = require('express');
const router = express.Router();
const upload = require('multer')().none();
const { verifyToken } = require('../config/jwt');

const {
  upsertRecruiterProfile,
  getRecruiterProfile,
  upsertJobSeekerProfile,
  getJobSeekerProfile
} = require('../controllers/profileController');

// Middleware
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

// Recruiter profile routes
router.post('/recruiter/completeprofile', authMiddleware, upload, upsertRecruiterProfile);
router.get('/recruiter/completeprofile', authMiddleware, getRecruiterProfile);

// Job Seeker profile routes
router.post('/jobseeker/completeprofile', authMiddleware, upload, upsertJobSeekerProfile);
router.get('/jobseeker/completeprofile', authMiddleware, getJobSeekerProfile);

module.exports = router;
