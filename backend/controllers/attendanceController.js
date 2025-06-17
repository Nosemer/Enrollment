const attendanceModel = require('../models/attendanceModel');

// Mark or update attendance
const markAttendance = (req, res) => {
  const { student_id, subject_id, date, status } = req.body;

  if (!student_id || !subject_id || !date || !status) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  attendanceModel.markAttendance({ student_id, subject_id, date, status }, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Attendance marked successfully' });
  });
};

// Get attendance by student
const getAttendanceByStudent = (req, res) => {
  const student_id = req.params.id;

  attendanceModel.getAttendanceByStudent(student_id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
// Delete attendance
const deleteAttendance = (req, res) => {
  const id = req.params.id;
  attendanceModel.deleteAttendance(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Attendance deleted successfully' });
  });
};

// Update attendance
const updateAttendance = (req, res) => {
  const id = req.params.id;
  const { date, status } = req.body;

  attendanceModel.updateAttendance(id, { date, status }, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Attendance updated successfully' });
  });
};

module.exports = {
    markAttendance,
  getAttendanceByStudent,
    deleteAttendance,
    updateAttendance,
};
