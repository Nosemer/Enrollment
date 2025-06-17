const courseModel = require('../models/courseModel');

const getCourses = (req, res) => {
  courseModel.getAllCourses((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

const createCourse = (req, res) => {
  const { course_name } = req.body;

  if (!course_name) {
    return res.status(400).json({ message: 'Course name is required' });
  }

  courseModel.addCourse(course_name, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Course created', id: result.insertId });
  });
};
// UPDATE course
const updateCourse = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  courseModel.updateCourse(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Course updated successfully' });
  });
};

// DELETE course
const deleteCourse = (req, res) => {
  const id = req.params.id;
  courseModel.deleteCourse(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Course deleted successfully' });
  });
};

module.exports = {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse
};
