const express = require('express');
const { completeRecruiterProfile, completeJobSeekerProfile } = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/complete-profile/recruiter', authenticateToken, completeRecruiterProfile);
router.post('/complete-profile/job-seeker', authenticateToken, completeJobSeekerProfile);

module.exports = router;
