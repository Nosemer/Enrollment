const gradesModel = require('../models/gradeModel');

// Add or update grade
const addGrade = (req, res) => {
  const { student_id, subject_id, grade, remarks } = req.body;

  if (!student_id || !subject_id || !grade) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  gradesModel.addGrade({ student_id, subject_id, grade, remarks }, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Grade saved successfully' });
  });
};

// Get student grades
const getGradesByStudent = (req, res) => {
  const student_id = req.params.id;

  gradesModel.getGradesByStudent(student_id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

const getGradeOfStudent = (req, res) => {
  gradesModel.getGradesByStudent((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
// Delete a grade
const deleteGrade = (req, res) => {
  const id = req.params.id;
  gradesModel.deleteGrade(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Grade deleted successfully' });
  });
};

// Update a grade
const updateGrade = (req, res) => {
  const id = req.params.id;
  const { grade, remarks } = req.body;

  gradesModel.updateGrade(id, { grade, remarks }, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Grade updated successfully' });
  });
};

module.exports = {
  addGrade,
  getGradesByStudent,
  getGradeOfStudent,
  updateGrade,
  deleteGrade
};
