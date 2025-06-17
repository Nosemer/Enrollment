const db = require('../config/db');

const createStudent = (first_name, last_name, email, hashedPassword, profile_id, sex, age, birthday, callback) => {
  const sql = 'INSERT INTO student (first_name, last_name, email, password, profile_id, sex, age, birthday) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [first_name, last_name, email, hashedPassword, profile_id, sex, age, birthday], callback);
};

const findStudentByEmail = (email, callback) => {
  const sql = `
    SELECT s.*, a.status
    FROM student s
    LEFT JOIN applications a ON s.id = a.student_id
    WHERE s.email = ?
  
  `;
  db.query(sql, [email], callback);
};

const getApprovedStudents = (callback) => {
  const sql = `
    SELECT s.*, a.status
    FROM student s
    LEFT JOIN applications a ON s.id = a.student_id
    WHERE a.status = 'approved'
  `;
  db.query(sql, callback);
};

// UPDATE student
const updateStudent = (id, data, callback) => {
  const sql = `UPDATE student SET first_name = ?, last_name = ?, email = ?, profile_id = ?, age = ?, sex = ?, birthday = ? WHERE id = ?`;
  const { first_name, last_name, email, profile_id, age, sex, birthday } = data;
  db.query(sql, [first_name, last_name, email, profile_id, age, sex, birthday, id], callback);
};

// DELETE student
const deleteStudent = (id, callback) => {
  const sql = `DELETE FROM student WHERE id = ?`;
  db.query(sql, [id], callback);
};
module.exports = {
  createStudent,
  findStudentByEmail,
  getApprovedStudents,
  updateStudent,
  deleteStudent
};
