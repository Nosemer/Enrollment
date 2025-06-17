const db = require('../config/db');

const createAdmin = (first_name, last_name, email, hashedPassword, profile_id, sex, age, birthday, callback) => {
  const sql = 'INSERT INTO admins (first_name, last_name, email, password, profile_id, sex, age, birthday) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [first_name, last_name, email, hashedPassword, profile_id, sex, age, birthday], callback);
};

const findAdminByEmail = (email, callback) => {
  const sql = 'SELECT * FROM admins WHERE email = ?';
  db.query(sql, [email], callback);
};
// UPDATE student
const updateAdmin = (id, data, callback) => {
  const sql = `UPDATE admins SET first_name = ?, last_name = ?, email = ?, profile_id = ?, age = ?, sex = ?, birthday = ? WHERE id = ?`;
  const { first_name, last_name, email, profile_id, age, sex, birthday } = data;
  db.query(sql, [first_name, last_name, email, profile_id, age, sex, birthday, id], callback);
};

// DELETE student
const deleteAdmin = (id, callback) => {
  const sql = `DELETE FROM admins WHERE id = ?`;
  db.query(sql, [id], callback);
};
module.exports = {
  createAdmin,
  findAdminByEmail,
  updateAdmin,
  deleteAdmin
};
