const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

const registerAdmin = async (req, res) => {
  const { first_name, last_name, email, password, sex, age, birthday } = req.body;
  const profile_id = req.file?.filename; // from uploaded file

  if (!first_name || !last_name || !email || !password || !sex || !age || !birthday || !profile_id)
    return res.status(400).json({ message: 'All fields are required including profile_id file' });

  adminModel.findAdminByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    if (results.length > 0)
      return res.status(409).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    adminModel.createAdmin(
      first_name,
      last_name,
      email,
      hashedPassword,
      profile_id,
      sex,
      age,
      birthday,
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Insert error', error: err });
        res.status(201).json({ message: 'admins registered successfully' });
      }
    );
  });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  adminModel.findAdminByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    if (results.length === 0)
      return res.status(401).json({ message: 'Invalid email or password' });

    const admins = results[0];
    const isMatch = await bcrypt.compare(password, admins.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { id: admins.id, email: admins.email, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      admins: {
        id: admins.id,
        first_name: admins.first_name,
        email: admins.email,
        status: admins.status,
        avatar: admins.profile_id
      },
      role: 'admins'
    });
  });
};
// UPDATE student
const updateAdmin = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  adminModel.updateAdmin(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'admin updated successfully' });
  });
};

// DELETE student
const deleteAdmin = (req, res) => {
  const id = req.params.id;
  adminModel.deleteAdmin(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'admin deleted successfully' });
  });
};

module.exports = {
  registerAdmin,
    loginAdmin,
  updateAdmin,
  deleteAdmin
};
