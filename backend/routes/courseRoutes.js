const express = require('express');
const router = express.Router();
const { getCourses, createCourse, updateCourse, deleteCourse} = require('../controllers/courseController');

router.get('/view', getCourses); // view all courses
router.post('/add', createCourse); // admin can create courses
router.put('/edit/:id', updateCourse); // admin can edit courses
router.delete('/delete/:id', deleteCourse); // admin can delete courses

module.exports = router;
