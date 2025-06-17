const db = require('../config/db');

const getAllCourses = (callback) => {
  db.query('SELECT id AS course_id, course_name FROM courses', callback);
};

const addCourse = (course_name, callback) => {
  db.query('INSERT INTO courses (course_name) VALUES (?)', [course_name], callback);
};

// UPDATE course
const updateCourse = (id, data, callback) => {
  const sql = `UPDATE courses SET course_name = ? WHERE id = ?`;
  db.query(sql, [data.course_name, id], callback);
};

// DELETE course
const deleteCourse = (id, callback) => {
  const sql = `DELETE FROM courses WHERE id = ?`;
  db.query(sql, [id], callback);
};

module.exports = {
  getAllCourses,
  addCourse,
   updateCourse,
  deleteCourse
};
