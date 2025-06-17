const express = require('express');
const router = express.Router();
const studentPortalController = require('../controllers/studentPortalController');

// GET /api/student-portal/:id
router.get('/view/:id', studentPortalController.getStudentPortalInfo); // for the student to see their student application and courses and subject
router.get('/status/:id', studentPortalController.getStudentStatus);
module.exports = router;
