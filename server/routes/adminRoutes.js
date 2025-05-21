// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/tokenmw');

// Only authenticated admins should access these
router.post('/test', verifyToken, adminController.addTest);
router.put('/test/:id', verifyToken, adminController.updateTest);
router.delete('/test/:id', verifyToken, adminController.deleteTest);

router.post('/test/:testId/mcq', verifyToken, adminController.addMCQ);
router.put('/mcq/:id', verifyToken, adminController.updateMCQ);
router.delete('/mcq/:id', verifyToken, adminController.deleteMCQ);
router.get('/test/:testId/mcqs', verifyToken, adminController.getMcqsForTest);

router.get('/tests', verifyToken, adminController.getAllTestsWithMcqs); // Optional: all tests and MCQs

module.exports = router;

