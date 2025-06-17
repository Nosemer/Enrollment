const express = require('express');
const router = express.Router();
const { deleteAttendance, updateAttendance, markAttendance, getAttendanceByStudent,} = require('../controllers/attendanceController');

router.post('/mark', markAttendance);
router.get('/:id', getAttendanceByStudent);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;