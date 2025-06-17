const express = require('express');
const router = express.Router();
const { getAllSubjects,
  addSubject,
  updateSubject,
  deleteSubject}= require('../controllers/subjectController');

router.get('/view', getAllSubjects); // admin can view all subjects
router.post('/add', addSubject); // admin can add subjects
router.put('/edit/:id', updateSubject); // admin can update subjects
router.delete('/delete/:id', deleteSubject); // admin can delete subjects

module.exports = router;
