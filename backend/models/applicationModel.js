const db = require('../config/db');

const addApplication = (application, callback) => {
  const { student_id, course_id, year_level, semester, last_school, year_graduated, valid_Id, Birth_certificate, form138, good_moral} = application;
  const sql = 'INSERT INTO applications (student_id, course_id, year_level, semester, last_school, year_graduated, valid_Id, Birth_certificate, form138, good_moral) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    student_id,
    course_id,
    year_level,
    semester,
    last_school,
    year_graduated,
    valid_Id,
    Birth_certificate,
    form138,
    good_moral
  ];

  db.query(sql, values, callback);
};

const getApplications = (callback) => {
  const sql = `
     SELECT 
      a.id AS application_id,
      a.status,
      a.section,
      a.year_level,
      a.semester,
      a.application_date,
      a.last_school,
      a.year_graduated,
      a.valid_Id, 
      a.Birth_certificate, 
      a.form138, 
      a.good_moral,
      s.id AS student_id,
      s.first_name AS student_Firstname,
      s.last_name AS student_lastname,
      s.email,
      c.course_name
    FROM applications a
    JOIN student s ON a.student_id = s.id
    JOIN courses c ON a.course_id = c.id
    ORDER BY a.application_date DESC
  `;
  db.query(sql, callback);
};
const approveApplication = (id, data, callback) => {
  const { status, section } = data;
  const sql = `
    UPDATE applications 
    SET status = ?, section = ? 
    WHERE id = ?
  `;
  db.query(sql, [status, section, id], callback);
};

const updateApplication = (id, { status, section, year_level, semester, course_id, last_school, year_graduated, valid_Id, Birth_certificate, form138, good_moral}, callback) => {
  const sql = `
    UPDATE applications 
    SET status = ?, section = ?, year_level = ?, semester = ?, course_id = ?, last_school = ?, year_graduated, valid_Id = ?, Birth_certificate = ?, form138 = ?, good_moral = ?
    WHERE id = ?
  `;
  db.query(sql, [status, section, year_level, semester, course_id, last_school, year_graduated, valid_Id, Birth_certificate, form138, good_moral, id], callback);
};

module.exports = {
  addApplication,
  getApplications,
  approveApplication,
  updateApplication
};
