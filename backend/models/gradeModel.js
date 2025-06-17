const db = require('../config/db');

// Add or update a grade
const addGrade = (data, callback) => {
  const { student_id, subject_id, grade, school_year} = data;
  const query = `
    INSERT INTO grades (student_id, subject_id, grade, school_year)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [student_id, subject_id, grade, school_year], callback);
};

// Get grades by student
const getGradesByStudent = (student_id, callback) => {
  const query = `
    SELECT 
      g.grade,
      s.subject_code,
      s.subject_name,
      s.semester,
      a.year_level,
      c.course_name
    FROM grades g
    JOIN subjects s ON g.subject_id = s.id
    JOIN courses c ON s.course_id = c.id
    JOIN applications a ON a.student_id = g.student_id  -- join applications for section
    WHERE g.student_id = ?
    ORDER BY a.year_level ASC, s.semester ASC
  `;
  db.query(query, [student_id], callback);
};
// Get grades by student
const getGradesOfStudent = (callback) => {
  const query = `
    SELECT 
      g.grade,
      s.subject_code,
      s.subject_name,
      s.semester,
      a.year_level,
      a.section,
      c.course_name
    FROM grades g
    JOIN subjects s ON g.subject_id = s.id
    JOIN courses c ON s.course_id = c.id
    JOIN applications a ON a.student_id = g.student_id  -- join applications for section
    WHERE g.student_id = ?
    ORDER BY a.year_level ASC, s.semester ASC
  `;
  db.query(query, callback);
};
// Delete a grade by ID
const deleteGrade = (id, callback) => {
  const query = 'DELETE FROM grades WHERE id = ?';
  db.query(query, [id], callback);
};

// Update grade by ID
const updateGrade = (id, data, callback) => {
  const { grade, school_year } = data;
  const query = `
    UPDATE grades
    SET grade = ?, school_year = ?,
    WHERE id = ?
  `;
  db.query(query, [grade, school_year, id], callback);
};


module.exports = {
  addGrade,
  getGradesByStudent,
  getGradesOfStudent,
  updateGrade,
  deleteGrade
};
