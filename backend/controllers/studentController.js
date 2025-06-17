const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const studentModel = require('../models/studentModel');
//const { sendOtpToEmail } = require('../middleware/sendOtp');

//const otpStore = {}; // In-memory OTP store (expires in 5 mins)


const registerStudent = async (req, res) => {
  const { first_name, last_name, email, password, sex, age, birthday } = req.body;
  const profile_id = req.file?.filename; // from uploaded file

  if (!first_name || !last_name || !email || !password || !sex || !age || !birthday || !profile_id)
    return res.status(400).json({ message: 'All fields are required including profile_id file' });

   /* if (req.body.initial) {
    // First step: generate/send OTP
    const otp = await sendOtpToEmail(email);
    otpStore[email] = otp;
    setTimeout(() => delete otpStore[email], 5 * 60 * 1000);
    return res.json({ message: 'OTP sent to your email.' });
  }

  // Second step: OTP verification
    if (otpStore[email] !== submittedOtp)
    return res.status(401).json({ message: 'Invalid or expired OTP' });
  delete otpStore[email]; */
  
  studentModel.findStudentByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    if (results.length > 0)
      return res.status(409).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    studentModel.createStudent(
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
        res.status(201).json({ message: 'Student registered successfully' });
      }
    );
  });
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  studentModel.findStudentByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    if (results.length === 0)
      return res.status(401).json({ message: 'Invalid email or password' });

    const student = results[0];
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { id: student.id, email: student.email, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

     res.json({
      message: 'Login successful',
      token,
      students: {
        id: student.id,
        first_name: student.first_name,
        email: student.email,
        status: student.status,
        avatar: student.profile_id
      },
      role: 'students'
    });
  });
};

// Get student grades
const getApprovedStudents = (req, res) => {
  studentModel.getApprovedStudents((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
// UPDATE student
const updateStudent = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  studentModel.updateStudent(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Student updated successfully' });
  });
};

// DELETE student
const deleteStudent = (req, res) => {
  const id = req.params.id;
  studentModel.deleteStudent(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Student deleted successfully' });
  });
};

module.exports = {
  registerStudent,
  loginStudent,
  getApprovedStudents,
  updateStudent,
  deleteStudent
};
