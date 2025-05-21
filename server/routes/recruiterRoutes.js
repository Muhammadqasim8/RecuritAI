// routes/recruiterRoutes.js
const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');
const verifyToken = require('../middleware/tokenmw');

// All routes require authenticated recruiter
// router.post('/job', verifyToken, recruiterController.createJob);
// router.get('/jobs', verifyToken, recruiterController.getJobsByRecruiter);
// router.put('/job/:id', verifyToken, recruiterController.updateJob);
// router.delete('/job/:id', verifyToken, recruiterController.deleteJob);
// router.get('/applicants', verifyToken, recruiterController.getApplicants); // All candidate applications
router.get('/talented', verifyToken, recruiterController.getTalentedCandidates);
router.post('/profile', verifyToken,  recruiterController.completeRecruiterProfile);
router.get('/totalcandidates',verifyToken ,  recruiterController.jobSeekerNumber );
router.get('/recommended' , verifyToken , recruiterController.getTalentedCandidates);

module.exports = router;
