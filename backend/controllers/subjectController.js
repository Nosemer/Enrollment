const subjectModel = require('../models/subjectmodel');

const getAllSubjects = (req, res) => {
  subjectModel.getAllSubjects((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

const addSubject = (req, res) => {
  const { subject_code, subject_name, units, course_id, year_level } = req.body;

  if (!subject_code || !subject_name || !units || !course_id || !year_level) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  subjectModel.addSubject({ subject_code, subject_name, units, course_id, year_level }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Subject added', id: result.insertId });
  });
};
// UPDATE subject
const updateSubject = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  subjectModel.updateSubject(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Subject updated successfully' });
  });
};

// DELETE subject
const deleteSubject = (req, res) => {
  const id = req.params.id;
  subjectModel.deleteSubject(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Subject deleted successfully' });
  });
};

module.exports = {
  getAllSubjects,
  addSubject,
  updateSubject,
  deleteSubject
};
