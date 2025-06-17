const applicationModel = require('../models/applicationModel');
const db = require('../config/db');

const createApplication = (req, res) => {
  const { student_id, course_id, year_level, last_school, semester, year_graduated} = req.body;
  const files = req.files;

const valid_Id = files?.valid_Id?.[0]?.filename;
const Birth_certificate = files?.Birth_certificate?.[0]?.filename;
const form138 = files?.form138?.[0]?.filename;
const good_moral = files?.good_moral?.[0]?.filename;


  if (!student_id || !course_id || !year_level || !last_school || !semester || !valid_Id || !Birth_certificate || !form138 || !good_moral) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  console.log("BODY", req.body);
  console.log("FILE", req.files);

  const checkQuery = 'SELECT * FROM applications WHERE student_id = ? AND semester = ?';
  db.query(checkQuery, [student_id, semester], (err, results) => {
  if (err) return res.status(500).json({ error: 'Database error' });
   
  if (results.length > 0) {
    return res.status(400).json({ message: 'Student has already applied for this semester' });
  }

  applicationModel.addApplication({ student_id, course_id, year_level, semester, last_school, year_graduated, valid_Id, Birth_certificate, form138, good_moral }, (err, result) => {
    if (err) {
      console.error("MySQL Insert Error:", err); // 🛠 LOG THIS!
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: 'Application submitted', id: result.insertId });

  });
});
};

const getAllApplications = (req, res) => {
  applicationModel.getApplications((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

const approveApplication = (req, res) => {
  const id = req.params.id;
  const { status, section } = req.body;

  if (!status || !section ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  applicationModel.approveApplication(id, { status, section }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Application updated successfully' });
  });
};

const updateApplication = (req, res) => {
  const id = req.params.id;
  const { last_school, valid_Id, Birth_certificate, form138, good_moral } = req.body; 
  if (!last_school || !valid_Id || !Birth_certificate || !form138 || !good_moral) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  applicationModel.updateApplication(id, { last_school, valid_Id, Birth_certificate, form138, good_moral }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Application updated successfully' });
  });
};



module.exports = {
  createApplication,
  getAllApplications,
  approveApplication,
  updateApplication
};
