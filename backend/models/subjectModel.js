const db = require('../config/db');

const getAllSubjects = (callback) => {
  const sql = `
    SELECT s.*, c.course_name
    FROM subjects s
    LEFT JOIN courses c ON s.course_id = c.id
    ORDER BY s.year_level ASC, s.subject_name ASC
  `;
  db.query(sql, callback);
};

const addSubject = ({ subject_code, subject_name, units, course_id, year_level }, callback) => {
  const sql = `
    INSERT INTO subjects (subject_code, subject_name, units, course_id, year_level)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [subject_code, subject_name, units, course_id, year_level], callback);
};
// UPDATE subject
const updateSubject = (id, data, callback) => {
   const sql = `UPDATE subjects SET subject_code = ?, subject_name = ?, units = ?, course_id = ?, year_level = ? WHERE id = ?`;
  db.query(sql, [data.subject_code, data.subject_name, data.units, data.course_id, data.year_level, id], callback);
};

// DELETE subject
const deleteSubject = (id, callback) => {
  const sql = `DELETE FROM subjects WHERE id = ?`;
  db.query(sql, [id], callback);
};

module.exports = {
  getAllSubjects,
  addSubject,
  updateSubject,
  deleteSubject
};
