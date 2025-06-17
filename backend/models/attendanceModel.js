const db = require('../config/db');

// Record or update attendance
const markAttendance = (data, callback) => {
  const { student_id, subject_id, date, status } = data;
  const query = `
    INSERT INTO attendance (student_id, subject_id, date, status)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE status = VALUES(status)
  `;
  db.query(query, [student_id, subject_id, date, status], callback);
};

// Get attendance by student
const getAttendanceByStudent = (student_id, callback) => {
  const query = `
    SELECT a.id, s.subject_name, a.date, a.status
    FROM attendance a
    JOIN subjects s ON a.subject_id = s.id
    WHERE a.student_id = ?
    ORDER BY a.date DESC
  `;
  db.query(query, [student_id], callback);
};
// Delete an attendance record
const deleteAttendance = (id, callback) => {
  const query = 'DELETE FROM attendance WHERE id = ?';
  db.query(query, [id], callback);
};

// Update an attendance record
const updateAttendance = (id, data, callback) => {
  const { date, status } = data;
  const query = `
    UPDATE attendance
    SET date = ?, status = ?
    WHERE id = ?
  `;
  db.query(query, [date, status, id], callback);
};

module.exports = {
      markAttendance,
  getAttendanceByStudent,
    deleteAttendance,
    updateAttendance,

};
