const express = require('express');
const router = express.Router();
const {addGrade, getGradesByStudent, getGradeOfStudent , updateGrade, deleteGrade} = require('../controllers/gradeController');

router.post('/', addGrade); // admin can input students grade
router.get('/view/:id', getGradesByStudent); // student can view their grades
router.get('/view', getGradeOfStudent); // student can view their grades
router.put('/edit/:id', updateGrade); // update students grade
router.delete('/delete/:id', deleteGrade); // delete students grade

module.exports = router;