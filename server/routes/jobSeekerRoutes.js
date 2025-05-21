const express = require('express');
const router = express.Router();
const jobSeekerController = require('../controllers/jobSeekerController');
const verifyToken = require('../middleware/tokenmw');

router.get('/tests', verifyToken, jobSeekerController.getAvailableTests);
router.get('/tests/:testId/questions', verifyToken, jobSeekerController.getTestQuestions);
router.post('/submit', verifyToken, jobSeekerController.submitTest);
router.get('/performance', verifyToken, jobSeekerController.getPerformanceSummary);
router.get('/jobs', verifyToken, jobSeekerController.getAllJobs);
router.post('/apply/:jobId', verifyToken, jobSeekerController.applyToJob);
router.get('/applications', verifyToken, jobSeekerController.getMyApplications);
router.get('/results', verifyToken, jobSeekerController.getMyResults);
router.post('/profile', verifyToken, jobSeekerController.completeJobSeekerProfile);

module.exports = router;


