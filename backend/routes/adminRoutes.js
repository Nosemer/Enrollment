const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { registerAdmin, loginAdmin, updateAdmin, deleteAdmin} = require('../controllers/adminController');

router.post('/register',upload.single('profile_id'), registerAdmin); // admin register
router.post('/login', loginAdmin); // admin login
router.put('/edit/:id', updateAdmin); // update student information
router.delete('/delete/:id', deleteAdmin); // delete student from the database



module.exports = router;