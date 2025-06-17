const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {registerStudent,loginStudent,updateStudent,deleteStudent,getApprovedStudents} = require('../controllers/studentController');

router.post('/register', upload.single('profile_id'), registerStudent); // for student to register an account http://localhost:5000/api/students/register
router.post('/login', loginStudent); // student login
router.get('/view', getApprovedStudents); // student can view their grades
router.put('/edit/:id', updateStudent); // update student information
router.delete('/delete/:id', deleteStudent); // delete student from the database

module.exports = router;
