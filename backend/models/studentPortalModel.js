const db = require('../config/db');

const getStudentInfo = (studentId, callback) => {
  const sql = `
    SELECT 
      s.id AS student_id,
      s.first_name AS student_firstname,
      s.last_name AS student_lastname,
      s.email,
      s.age,
      s.sex,
      s.birthday,
      a.id AS application_id,
      a.status,
      a.section,
      a.year_level,
      a.application_date,
      a.course_id,
      c.course_name
    FROM student s
    LEFT JOIN applications a ON s.id = a.student_id
    LEFT JOIN courses c ON a.course_id = c.id
    WHERE s.id = ?
  `;
  db.query(sql, [studentId], callback);
};

const getStudentSubjects = (courseId, yearLevel, callback) => {
  const sql = `
    SELECT subject_code, subject_name, units, semester
    FROM subjects 
    WHERE course_id = ? AND year_level = ?
  `;
  db.query(sql, [courseId, yearLevel], callback);
};
//for unapprove student who wants to know their status
const getStudentStatus = (studentId, callback) => {
  const sql = `
    SELECT 
      s.first_name AS firstName,
      s.last_name AS lastName,
      a.status
    FROM student s
    LEFT JOIN applications a ON s.id = a.student_id
    WHERE s.id = ?
  `;
  db.query(sql, [studentId], callback);
};

module.exports = {
  getStudentInfo,
  getStudentSubjects,
  getStudentStatus
};
