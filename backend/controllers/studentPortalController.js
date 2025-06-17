const db = require('../config/db');
const studentPortalModel = require('../models/studentPortalModel');

const getStudentPortalInfo = (req, res) => {
  const studentId = req.params.id;
  if (!studentId) {
    return res.status(400).json({ message: 'Student ID is required' });
  }

  // Step 1: Get student info and application
  studentPortalModel.getStudentInfo(studentId, (err, studentResults) => {
    if (err) return res.status(500).json({ error: err });
    if (studentResults.length === 0) return res.status(404).json({ message: 'Student not found' });

    const student = studentResults[0];

    // Step 2: Get subjects for their course and year_level
    studentPortalModel.getStudentSubjects(student.course_id, student.year_level, (err, subjectResults) => {
      if (err) return res.status(500).json({ error: err });

      // Step 3: Attach subjects to student object
      student.subjects = subjectResults;

      res.status(200).json(student);
    });
  });
};
// Get student status
const getStudentStatus = (req, res) => {
  const student_id = req.params.id;

  studentPortalModel.getStudentStatus(student_id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
module.exports = { getStudentPortalInfo, getStudentStatus };
